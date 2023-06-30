<template>
  <div class="wrapper">
  <div class="buttonList">
    <div>
      <div class="label">Select Device</div>
      <div v-if="!isConnected()">
        <div class="no-device">Unable to connect to the GoXLR Utility.<br /><br /> Please ensure the utility is running and
        refresh this page.</div>
      </div>
      <div v-else>
        <div class="buttonHolder" v-if="deviceCount > 0">
          <Button v-for="(device, key) in getMixers()" :key=key :button-id=key :is-active=false
                  :label="getLabel2(key, device)" @button-pressed="setDevice(key)"/>
        </div>
        <div v-else class="no-device">No GoXLR Devices Found</div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>

import Button from "@/components/buttons/Button.vue";
import {store} from "@/store";

export default {
  name: "DeviceSelector",
  components: {Button},
  data() {
    return {
      devices: [],
    }
  },

  computed: {
    deviceCount() {
      return store.getDeviceCount();
    }
  },

  watch: {
    // This code probably isn't needed, but is for when a GoXLR suddenly appears in the data.
    deviceCount(newCount, oldCount) {
      if (newCount === 1 && oldCount === 0) {
        store.setActiveSerial(Object.keys(this.getMixers())[0]);
      }
    }
  },

  methods: {
    isConnected() {
      return store.isConnected();
    },

    getMixers() {
      return store.status.mixers;
    },

    setDevice(serial) {
      store.setActiveSerial(serial);
    },

    getLabel2(serial, device) {
      return "[" + serial + "] GoXLR " + device.hardware.device_type + " connected to USB bus " + device.hardware.usb_device.bus_number + " address " + device.hardware.usb_device.address;
    },
  },

  created() {
    if (this.deviceCount === 1) {
      console.log("Setting Device..");
      store.setActiveSerial(Object.keys(this.getMixers())[0]);
    }
  }
}
</script>

<style scoped>
.wrapper {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonList {
  height: 220px;
  width: 700px;
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
  width: 680px;
  padding: 10px;
  color: #fff;
  background-color: #3b413f;

  text-transform: uppercase;

  margin-bottom: 8px;
}

.no-device {
  color: #fff;
}

</style>