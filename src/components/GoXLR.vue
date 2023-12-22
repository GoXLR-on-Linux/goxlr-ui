<template>
  <div id="main">
    <DeviceSelector v-if="!isDeviceSet()"/>
    <template v-if="isDeviceSet()">
      <h1 class="screenreader-only">Profiles and Files</h1>
      <div style="display: flex; flex-direction: row; column-gap: 30px">
        <div>
          <FileTabs/>
        </div>
        <div aria-hidden="true" style="margin: auto; width: 100%">
          <GoXLRVisualiser/>
        </div>
      </div>

      <div style="height: 25px; background-color: #3b413f"/>
      <h1 class="sr-only">Device Settings</h1>
      <Tabs ref="device-tabs" label="Device Settings">
        <Tab name="Mic">
          <Mic/>
        </Tab>
        <Tab name="Mixer" selected>
          <ContentContainer>
            <Mixer/>
          </ContentContainer>
        </Tab>
        <Tab name="Configuration">
          <ContentContainer>
            <CenteredContainer>
              <Faders ref="faders"/>
              <Cough/>
            </CenteredContainer>
          </ContentContainer>
        </Tab>
        <Tab v-if="!isDeviceMini()" name="Effects">
          <EffectsTab/>
        </Tab>
        <Tab v-if="!isDeviceMini()" name="Sampler">
          <ContentContainer>
            <SamplerTab/>
          </ContentContainer>
        </Tab>
        <Tab name="Lighting">
          <LightingTab/>
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
    <VersionCheck/>
    <A11yNotifications/>
  </div>
</template>

<script>
import A11yNotifications from "./A11yNotifications";
import Faders from "./sections/Faders";
import Mixer from "./sections/Mixer";
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import Routing from "@/components/sections/Routing";
import Mic from "@/components/sections/Mic";
import DeviceSelector from "@/components/sections/DeviceSelector";
import {store} from "@/store";
import Cough from "@/components/sections/Cough";
import {runWebsocket} from "@/util/sockets";
import SystemComponent from "@/components/sections/System";
import FileTabs from "@/components/sections/files/FileTabs";
import EffectsTab from "@/components/sections/EffectsTab";
import {isDeviceMini} from "@/util/util";
import LightingTab from "@/components/sections/lighting/LightingTab";
import SamplerTab from "@/components/sections/SamplerTab";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import GoXLRVisualiser from "@/components/visualisation/GoXLRVisualiser.vue";
import VersionCheck from "@/components/VersionCheck.vue";

export default {
  name: "GoXLR",
  components: {
    VersionCheck,
    GoXLRVisualiser,
    A11yNotifications,
    CenteredContainer,
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
    Mic,
  },

  methods: {
    isDeviceMini,

    isDeviceSet() {
      return store.hasActiveDevice() && store.isConnected();
    },
  },

  created() {
    runWebsocket();
  },
};
</script>

<style>
.screenreader-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;

  /**
    position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
   */
}

#main {
  width: 100%;
  font-size: 10pt;
}
</style>
