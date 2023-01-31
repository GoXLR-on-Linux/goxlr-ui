import {store} from "@/store";

export function isDeviceMini() {
    // Do this here, rather than on created() so it can update if the device changes
    return store.getActiveDevice().hardware.device_type === "Mini";
}
