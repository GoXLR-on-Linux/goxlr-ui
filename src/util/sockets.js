/**
 * A class designed to help manage request and responses to the GoXLR Utility via Websockets and HTTP.
 *
 * A lot of commands do not require responses as they're 'fire and forget', the only response that could possibly
 * be returned is an error which means that something has likely gone *SERIOUSLY* wrong, and we should abandon
 * all hope. As such, the daemon doesn't provide a response for most requests, and will only send errors, and
 * responses to GetStatus up the pipe to us, which we simply handle here. If you absolutely require a response from
 * a request (eg, profile management), send it as a standard command, and not a websocket command.
 *
 * Commands are sent via JSON, and are handled by serde on the rear end, this class will include some
 * helper methods for sending commands but the command structure will need to be understood first.
 *
 * Commands are documented in ipc/src/lib.rs under the GoXLRCommand enum, as an example, the Command to
 * change a volume level is defined as:
 * SetVolume(ChannelName, u8)
 *
 * Following the ChannelName to types/src/lib.rs, we get a list of channel names in the enum. Unless otherwise
 * stated by a #[repr] macro (See CompressorRatio), Serde expects these to be sent as Strings. Values to a
 * command are expected to be sent as an array of values. Using the above, SetVolume can be represented in JSON as:
 * { "SetVolume": ["Chat", 145] }
 *
 * If there is only one parameter for a command, an array isn't required.
 *
 * Extra Technical Stuff (not needed for most people), Obviously a command requires a serial, and the actual message
 * sent to the Daemon is a Command object, in this case, the same rules as above apply. Command is defined as:
 * Command(String, GoXLRCommand)
 *
 * With String being the serial. So expanding out the above, you end up with JSON that looks like:
 * {"Command": ["serial", { "SetVolume": ["Chat", 145]}]}
 *
 * The websocket class will abstract away the need to build a complete message.
 */
import {store} from "@/store";

// TODO: Error checking and handling!
export class Websocket {
    #connection_promise = [];
    #message_queue = []
    #websocket = undefined;

    connect() {
        this.#websocket = new WebSocket(getWebsocketAddress());

        let self = this;
        self.#websocket.addEventListener('message', function(event) {
            // A message can be one of two things, either a DaemonStatus, or an error..
            let json = JSON.parse(event.data);
            if (json["Status"] !== undefined) {
                store.replaceData(json);
            } else {
                console.log("Received Error from Websocket: " + event.data);
            }
        });

        self.#websocket.addEventListener('open', function() {
            self.#connection_promise[0]();
        });

        return new Promise((resolve, reject) => {
            self.#connection_promise[0] = resolve;
            self.#connection_promise[1] = reject;
        });
    }

    // Forces the daemon to re-read file directories..
    invalidate_caches() {
        return this.#sendRequest("InvalidateCaches");
    }

    get_status() {
        return this.#sendRequest("GetStatus");
    }

    send_command(serial, command) {
        let request = {
            "Command": [
                serial,
                command
            ]
        }
        return this.#sendRequest(request);
    }

    #sendRequest(request) {
        this.#websocket.send(JSON.stringify(request));
    }
}
export const websocket = new Websocket();

/*
 * This function simply sends a command via HTTP and returns a promise of a response.
 *
 * The GoXLR Daemon simply handles a DaemonRequest and returns a DaemonResponse, it doesn't do anything special for
 * errors, so we'll handle fulfill or reject here based on what comes back.
 */
export function sendHttpCommand(serial, command) {
    // eslint-disable-next-line no-unused-vars
    let cmd_resolve, cmd_reject;

    let request = {
        "Command": [
            serial,
            command
        ]
    }

    fetch(getHTTPAddress(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    })
        .then(response => response.json())
        .then(data => {
            if (data["Error"] !== undefined) {
                cmd_reject(data["Error"]);
            }
            cmd_resolve();
        })
        .catch((error) => {
            cmd_reject("HTTP Error: " + error);
        });

    return new Promise((resolve, reject) => {
        cmd_resolve = resolve;
        cmd_reject = reject;
    });
}

/*
This is here to calculate the address. The dev environment is always on a different port to the daemon, so
we need to bounce requests across to the default port of the daemon. If we're running in production, we need
to convert the HTTP request to a websocket request on the same port (this can be changed), so work it out here.
 */
function getWebsocketAddress() {
    if (process.env.NODE_ENV === "development") {
        return "ws://localhost:14564/api/websocket";
    }
    return "ws://" + window.location.host + "/api/websocket";
}

// Same as above, except for HTTP request...
function getHTTPAddress() {
    if (process.env.NODE_ENV === "development") {
        return "http://localhost:14564/api/command";
    }
    return "/api/command";
}