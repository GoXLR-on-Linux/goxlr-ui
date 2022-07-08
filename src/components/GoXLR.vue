<template>

  <div id="main">
    <DeviceSelector :style="{display: !isDeviceSet() ? '' : 'none'}"/>
    <Tabs :style="{display: isDeviceSet() ? '' : 'none'}" style="width: 35%; height: 400px">
      <Tab name="Profiles" :selected="true" style="height: 320px">
        <div class="contentPad">
          <div class="section">
            <Profiles />
          </div>
        </div>
      </Tab>
      <Tab name="Samples" :left_align="false" style="height: 320px">
        <div class="contentPad">
          <div class="section">

          </div>
        </div>
      </Tab>
      <Tab name="Presets" :left_align="false" style="height: 320px">
        <div class="contentPad">
          <div class="section">

          </div>
        </div>
      </Tab>
    </Tabs>
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
import Profiles from "@/components/sections/Profiles";
import {store} from "@/store";
import Cough from "@/components/sections/Cough";
import {websocket} from "@/util/websocket";
import SystemComponent from "@/components/sections/System";

export default {
  name: 'GoXLR',
  components: {SystemComponent, Cough, DeviceSelector, Routing, Tab, Tabs, Mixer, Faders, Mic, Profiles},

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

      if (!store.isPaused()) {
        websocket.get_status().then(data => {
          store.replaceData(data);
        });

        // fetch(`${url_base}/get-devices`)
        //     .then(result => result.text())
        //     .then(data => store.replaceData(data));
      }
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
