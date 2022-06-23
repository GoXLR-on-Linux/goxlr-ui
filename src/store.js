import {reactive} from "vue";

export const store = reactive({
    data: {},
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

    replaceData(newData) {
        Object.assign(this.data, JSON.parse(newData).mixers);
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