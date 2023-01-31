import {store} from "@/store";

export function waitFor(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
    }
    return new Promise(poll);
}

export function isDeviceMini() {
    // Do this here, rather than on created() so it can update if the device changes
    if (!store.hasActiveDevice()) {
        return true;
    }
    return store.getActiveDevice().hardware.device_type === "Mini";
}
