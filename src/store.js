import {reactive} from "vue";

export const store = reactive({
    active: true,
    data: {},
    files: {},
    activeSerial: "",

    getDeviceCount() {
        return Object.keys(this.data).length;
    },

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

    getMicProfileFiles() {
        return this.files.mic_profiles;
    },

    getPresetFiles() {
        return this.files.presets;
    },

    replaceData(json) {
        if (this.active) {
            Object.assign(this.data, json.Status.mixers);
            Object.assign(this.files, json.Status.files);
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