<template>

  <div id="main">
    <DeviceSelector :style="{display: !isDeviceSet() ? '' : 'none'}"/>
    <Tabs :style="{display: isDeviceSet() ? '' : 'none'}">
      <Tab name="Mic">
        <div class="contentPad">
          <div class="section">
            <Mic/>
          </div>
        </div>
      </Tab>
      <Tab name="Mixer" :selected="true">
        <div class="contentPad">
          <div class="section">
            <Faders/>
            <Mixer/>
          </div>
        </div>
      </Tab>
      <Tab name="Router" :left_align="false">
        <div class="contentPad">
          <div class="section">
            <Routing/>
          </div>
        </div>
      </Tab>
    </Tabs>
  </div>

</template>

<script>

import Faders from "./sections/Faders"
import Mixer from "./sections/Mixer";
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import Routing from "@/components/sections/Routing";
import Mic from "@/components/sections/Mic";
import DeviceSelector from "@/components/sections/DeviceSelector";
import {store} from "@/store";
import {invoke} from "@tauri-apps/api";

export default {
  name: 'GoXLR',
  components: {DeviceSelector, Routing, Tab, Tabs, Mixer, Faders, Mic},

  data() {
    return {
      device_set: false,
      timer: ''
    }
  },

  watch: {
    device_set(newValue, oldValue) {
      if (oldValue === false && newValue === true) {
        // Set the timer to automatically pull the profile settings
        this.timer = setInterval(this.updateState, 250);
      }
    }
  },

  methods: {
    updateState() {
      invoke('get_profiles').then(function (result) {
        store.replaceData(result);
      });
    },

    cancelUpdate() {
      clearInterval(this.timer);
    },

    isDeviceSet() {
      this.device_set = store.hasActiveDevice();
      return store.hasActiveDevice();
    },
  },

  beforeUnmount() {
    this.cancelUpdate();
  }

}
</script>

<style scoped>
#main {
  width: 100%;
  font-size: 10pt;
}

.contentPad {
  display: inline-block;
  padding: 40px;
  text-align: center;
}

.section {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.hidden {
  display: none;
}
</style>
