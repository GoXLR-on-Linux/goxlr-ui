import {reactive} from "vue";

export const store = reactive({
    active: true,
    data: {},
    files: {},
    activeSerial: "",

    setActiveSerial(serial) {
        this.activeSerial = serial;
    },

    getActiveDevice() {
        if (this.activeSerial === "") {
            return undefined;
        }
        return this.data[this.activeSerial];
    },

    hasActiveDevice() {
        return this.activeSerial !== "";
    },

    getActiveSerial() {
        return this.activeSerial;
    },

    getProfileFiles() {
        return this.files.profiles;
    },

    replaceData(newData) {
        if (this.active) {
            // This is a minor fudge for websocket compatibility reasons..
            let json = JSON.parse(newData);

            let root_node;
            let files_node;

            if (json["Status"] !== undefined) {
                root_node = json.Status.mixers;
                files_node = json.Status.files;
            } else {
                root_node = json.mixers;
                files_node = json.files;
            }

            Object.assign(this.data, root_node);
            Object.assign(this.files, files_node);
        }
    },

    pause() {
        this.active = false;
    },

    resume() {
        this.active = true;
    },

    isPaused() {
        return !this.active;
    },

    isReady() {
        return this.data.length === 0;
    },

    getVolume(id) {
        if (this.activeSerial === "") {
            return 0;
        }
        return this.data[this.activeSerial].volumes[id];
    }
});