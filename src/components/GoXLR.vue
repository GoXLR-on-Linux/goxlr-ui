<template>

  <div id="main">
    <DeviceSelector v-show="!isDeviceSet()" />

    <FileTabs :device-set="isDeviceSet()" />

    <Tabs v-show="isDeviceSet()">
      <Tab name="Mic">
        <div class="contentPad">
          <div class="section">
            <Mic/>
          </div>
        </div>
      </Tab>
      <Tab name="Mixer" selected>
        <div class="contentPad">
          <div class="section">
            <Faders/>
            <Mixer/>
          </div>
        </div>
      </Tab>
      <Tab name="Cough" :left_align="false">
        <div class="contentPad">
          <div class="section">
            <Cough/>
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
      <Tab name="System" :left_align="false">
        <div class="contentPad">
          <div class="section">
            <SystemComponent />
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
import Cough from "@/components/sections/Cough";
import {websocket} from "@/util/websocket";
import SystemComponent from "@/components/sections/System";
import FileTabs from "@/components/sections/files/FileTabs";

export default {
  name: 'GoXLR',
  components: {FileTabs, SystemComponent, Cough, DeviceSelector, Routing, Tab, Tabs, Mixer, Faders, Mic },

  data() {
    return {
      timer: ''
    }
  },

  methods: {
    updateState() {
      if (!store.isPaused()) {
        websocket.get_status();
      }
    },

    cancelUpdate() {
      clearInterval(this.timer);
    },

    isDeviceSet() {
      return store.hasActiveDevice();
    },
  },

  created() {
    this.timer = setInterval(this.updateState, 250);
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
</style>
