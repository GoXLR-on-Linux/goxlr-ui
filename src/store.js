import {reactive} from "vue";
import {applyOperation} from "fast-json-patch";


export const store = reactive({
    have_device: false,
    active: true,
    activeSerial: "",

    pausedPaths: [],

    // Set a 'base' status struct..
    status: {
        "mixers": {},
        "files": {}
    },

    getVersion() {
        return this.status.daemon_version;
    },

    getDeviceCount() {
        return Object.keys(this.status.mixers).length;
    },

    setActiveSerial(serial) {
        this.activeSerial = serial;
    },

    getActiveDevice() {
        if (this.activeSerial === "") {
            return undefined;
        }
        return this.status.mixers[this.activeSerial];
    },

    hasActiveDevice() {
        return this.activeSerial !== "";
    },

    getActiveSerial() {
        return this.activeSerial;
    },

    getProfileFiles() {
        return this.status.files.profiles;
    },

    getMicProfileFiles() {
        return this.status.files.mic_profiles;
    },

    getPresetFiles() {
        return this.status.files.presets;
    },

    getSampleFiles() {
        return this.status.files.samples;
    },

    getIconFiles() {
        return this.status.files.icons;
    },

    replaceData(json) {
        if (this.active) {
            Object.assign(this.status, json.Status);
            this.have_device = true;
        }
    },

    pausePatchPath(path) {
        if (path === undefined) {
            console.error("Attempted to Stop Patches for Undefined!");
            return;
        }
        let paths = path.split(";");
        for (path of paths) {
            console.log("Pausing Path: " + path);
            this.pausedPaths.push(path);
        }
    },

    resumePatchPath(path) {
        let paths = path.split(";");
        for (path of paths) {
            let index = this.pausedPaths.indexOf(path);
            if (index !== -1) {
                // We don't care about key organisation, just that the entry is gone!
                delete this.pausedPaths[index];
            }
        }
    },

    // eslint-disable-next-line no-unused-vars
    patchData(json) {
        if (this.have_device) {
            for (let patch of json.Patch) {
                if (this.pausedPaths.includes(patch.path)) {
                    console.log("Ignoring Patch on " + patch.path);
                    continue;
                }

                applyOperation(this.status, patch, true, true, false);
            }
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
});