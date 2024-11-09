import { store } from "@/store";

export function isDeviceMini() {
    // Do this here, rather than on created() so it can update if the device changes
    return store.getActiveDevice().hardware.device_type === "Mini";
}

export function isDeviceWhite() {
    return store.getActiveDevice().hardware.colour_way === "White";
}

export function roundToStep(value, step) {
    step || (step = 1.0);
    let inverse = 1.0 / step;
    return Math.round(value * inverse) / inverse;
}

export function firmwareSupportsMix2() {
    if (isDeviceMini()) {
        return versionNewerOrEqualTo(store.getActiveDevice().hardware.versions.firmware, [1,3,0,0]);
    }
    return versionNewerOrEqualTo(store.getActiveDevice().hardware.versions.firmware, [1,5,0,0]);
}

export function isWindowsDriver() {
    return (store.getConfig().driver_interface.interface === "TUSB");
}

export function driverPreVOD() {
    return isWindowsDriver() && !versionNewerOrEqualTo(store.getConfig().driver_interface.version, [5, 13, 0]);
}

export function driverVOD() {
    return isWindowsDriver() && !driverPreVOD() && !driverMix2();
}

export function driverMix2() {
    return isWindowsDriver() && versionNewerOrEqualTo(store.getConfig().driver_interface.version, [5, 68, 0]);
}

export function versionNewerOrEqualTo(version, comparison) {
    // VersionNumber on the rust side requires the first two fields to be set.
    if (version[0] > comparison[0]) {
        return true;
    }
    if (version[0] < comparison[0]) {
        return false;
    }

    if (version[1] > comparison[1]) {
        return true;
    }
    if (version[1] < comparison[1]) {
        return false;
    }

    if (version[2] !== null) {
        if (comparison[2] !== null) {
            if (version[2] > comparison[2]) {
                return true;
            }
            if (version[2] < comparison[2]) {
                return false;
            }
        } else {
            return true;
        }
    } else if (comparison[2] !== null) {
        return false;
    }

    if (version[3] !== null) {
        if (comparison[3] !== null) {
            if (version[3] >= comparison[3]) {
                return true;
            }
        } else {
            return true;
        }
    }

    // If we get here, everything has matched.
    return true;
}
