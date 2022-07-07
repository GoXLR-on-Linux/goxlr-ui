/**
 * A class designed to help manage request and responses to the GoXLR Utility via Websockets.
 *
 * TODO: Currently it's not possible to directly bind a response to a request.
 * While the above tends to generally not cause any problems which aren't self-correcting, and only occurs in
 * situations of high traffic (such as spamming the volume changes), it's not impossible that responses arrive
 * out-of-order, and gets dispatched to the wrong promise. For the time being, we are making the (hazardous) assumption
 * that the order of the responses will match the order of the requests
 *
 * Commands are sent via JSON, and are handled by serde on the rear end, this class will include some
 * helper methods for sending commands and handling responses (eg, send_command(serial, command)), but
 * the command structure will need to be understood first.
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
import {ws_base} from "@/main";

// TODO: Error checking and handling!
export class Websocket {
    #connection_promise = [];
    #message_queue = []
    #websocket = undefined;

    connect() {
        this.#websocket = new WebSocket(ws_base);

        let self = this;
        self.#websocket.addEventListener('message', function(event) {
            // Not pretty to look at, but call the resolve() method..
            self.#message_queue.shift()[0](event.data);
        });

        self.#websocket.addEventListener('open', function() {
            self.#connection_promise[0]();
        });

        return new Promise((resolve, reject) => {
            self.#connection_promise[0] = resolve;
            self.#connection_promise[1] = reject;
        });
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
        return this.#generateResponsePromise();
    }

    #generateResponsePromise() {
        // Create a promise, and extract the resolve / reject methods..
        let promiseResolve, promiseReject;
        let promise = new Promise((resolve, reject) => {
            promiseResolve = resolve;
            promiseReject = reject;
        })

        // Store these in the message queue
        this.#message_queue.push([promiseResolve, promiseReject]);
        return promise;
    }
}

export const websocket = new Websocket();