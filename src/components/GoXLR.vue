<template>

  <div id="main">
    <DeviceSelector v-if="!isDeviceSet()"/>

    <template v-if="isDeviceSet()">
      <FileTabs :device-set="isDeviceSet()"/>

      <div style="height: 25px; background-color: #3b413f"/>

      <Tabs>
        <Tab name="Mic">
            <Mic/>
        </Tab>
        <Tab name="Mixer" selected>
            <ContentContainer>
              <Faders/>
              <Mixer/>
            </ContentContainer>
        </Tab>
        <Tab name="Effects" :hidden="isDeviceMini()">
          <EffectsTab />
        </Tab>
        <Tab name="Sampler" :hidden="isDeviceMini()">
          <ContentContainer>
            <SamplerTab />
          </ContentContainer>
        </Tab>
        <Tab name="Cough">
          <ContentContainer>
            <Cough/>
          </ContentContainer>
        </Tab>
        <Tab name="Lighting">
            <LightingTab />
        </Tab>
        <Tab name="Routing">
          <ContentContainer>
            <Routing/>
          </ContentContainer>
        </Tab>
        <Tab name="System">
          <ContentContainer>
            <SystemComponent/>
          </ContentContainer>
        </Tab>
      </Tabs>
    </template>
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
import {websocket} from "@/util/sockets";
import SystemComponent from "@/components/sections/System";
import FileTabs from "@/components/sections/files/FileTabs";
import EffectsTab from "@/components/sections/EffectsTab";
import {isDeviceMini} from "@/util/util";
import LightingTab from "@/components/sections/lighting/LightingTab";
import SamplerTab from "@/components/sections/SamplerTab";
import ContentContainer from "@/components/containers/ContentContainer.vue";

export default {
  name: 'GoXLR',
  components: {
    ContentContainer,
    SamplerTab,
    LightingTab,
    EffectsTab,
    FileTabs,
    SystemComponent,
    Cough,
    DeviceSelector,
    Routing,
    Tab,
    Tabs,
    Mixer,
    Faders,
    Mic
  },

  methods: {
    isDeviceMini,

    isDeviceSet() {
      return (store.hasActiveDevice() && store.isConnected());
    },
  },

  created() {
    websocket.get_status().then((data) => {
      store.replaceData(data);
    });
  },
}
</script>

<style scoped>
#main {
  width: 100%;
  font-size: 10pt;
}
</style>
