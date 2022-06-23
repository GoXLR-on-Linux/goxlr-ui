<template>
  <div class="buttonList">
    <div>
      <div class="label">Select Device</div>
      <div class="buttonHolder">
        <Button v-for="(device, key) in getMixers()" :key=key :button-id=key :is-active=false
                :label="getLabel2(key, device)" @button-pressed="setDevice(key)"/>
      </div>
    </div>
  </div>
</template>

<script>

import Button from "@/components/button_list/Button";
import {store} from "@/store";

export default {
  name: "DeviceSelector",
  components: {Button},
  data() {
    return {
      devices: [],
    }
  },

  methods: {
    getMixers() {
      return store.data;
    },

    setDevice(serial) {
      store.setActiveSerial(serial);
    },

    getLabel2(serial, device) {
      return "[" + serial + "] GoXLR " + device.hardware.device_type + " connected to USB bus " + device.hardware.usb_device.bus_number + " address " + device.hardware.usb_device.address;
    },
  },
}
</script>

<style scoped>
.buttonList {
  height: 220px;
  width: 700px;
  display: inline-flex;
  margin: 3px;
  background-color: #353937;
}

.buttonList:not(:last-child) {
  margin-right: 20px;
}

.buttonHolder {
  height: 170px;
  width: 700px;

  box-sizing: border-box;

  overflow-y: auto;

}

.buttonHolder::-webkit-scrollbar {
  width: 3px;
}

.buttonHolder::-webkit-scrollbar-track {
  background-color: transparent;
}

.buttonHolder::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}

.label {
  padding: 10px;
  color: #fff;
  background-color: #3b413f;

  text-transform: uppercase;

  margin-bottom: 8px;
}

</style>