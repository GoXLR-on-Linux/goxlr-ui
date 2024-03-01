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
          <GoXLRVisualiser :active-display="active" />
        </div>
      </div>

      <div style="height: 25px; background-color: #3b413f"/>
      <h1 class="sr-only">Device Settings</h1>
      <Tabs ref="device-tabs" @on-change="onTabChange" label="Device Settings">
        <Tab id="mic" name="Mic">
          <Mic/>
        </Tab>
        <Tab id="mixer" name="Mixer" selected>
          <ContentContainer>
            <Mixer/>
          </ContentContainer>
        </Tab>
        <Tab id="configuration" name="Configuration">
          <ContentContainer>
            <CenteredContainer>
              <Faders ref="faders" @on-fader-channel-change="onFaderChannelChange"/>
              <Cough/>
            </CenteredContainer>
          </ContentContainer>
        </Tab>
        <Tab id="effects" v-if="!isDeviceMini()" name="Effects">
          <EffectsTab ref="effects" @on-effect-preset-change="onEffectPresetChange" />
        </Tab>
        <Tab id="sampler" v-if="!isDeviceMini()" name="Sampler">
          <ContentContainer>
            <SamplerTab ref="sampler" @on-sample-bank-change="onSampleBankChange" />
          </ContentContainer>
        </Tab>
        <Tab id="lighting" name="Lighting">
          <LightingTab ref="lighting" @on-lighting-changed="onLightingDataChange" />
        </Tab>
        <Tab id="routing" name="Routing">
          <ContentContainer>
            <Routing/>
          </ContentContainer>
        </Tab>
        <Tab id="system" name="System">
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
import A11yNotifications from "./A11yNotifications.vue";
import Faders from "./sections/Faders.vue";
import Mixer from "./sections/Mixer.vue";
import Tabs from "@/components/tabs/Tabs.vue";
import Tab from "@/components/tabs/Tab.vue";
import Routing from "@/components/sections/Routing.vue";
import Mic from "@/components/sections/Mic.vue";
import DeviceSelector from "@/components/sections/DeviceSelector.vue";
import {store} from "@/store";
import Cough from "@/components/sections/Cough.vue";
import {runWebsocket} from "@/util/sockets";
import SystemComponent from "@/components/sections/System.vue";
import FileTabs from "@/components/sections/files/FileTabs.vue";
import EffectsTab from "@/components/sections/EffectsTab.vue";
import {isDeviceMini} from "@/util/util";
import LightingTab from "@/components/sections/lighting/LightingTab.vue";
import SamplerTab from "@/components/sections/SamplerTab.vue";
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

  data() {
    return {
      active: [],
    }
  },

  methods: {
    isDeviceMini,

    isDeviceSet() {
      return store.hasActiveDevice() && store.isConnected();
    },

    onTabChange(tab) {
      let id = tab.id;
      if (id === "configuration") {
        this.active = [id, "cough", this.$refs.faders.activeChannel];
      } else if (id === "effects") {
        // This one comes initially from the store...
        this.active = [id, this.$refs.effects.getActivePreset()];
      } else if (id === "sampler") {
        this.active = [id, this.$refs.sampler.activeBank];
      } else if (id === "lighting") {
        this.active = [id].concat(this.$refs.lighting.getNodes());
      } else {
        this.active = [id];
      }
    },

    onFaderChannelChange(activeChannel) {
      this.active[2] = activeChannel;
    },

    onEffectPresetChange(activePreset) {
      console.log(activePreset);
      this.active[1] = activePreset;
    },

    onSampleBankChange(activeBank) {
      this.active[1] = activeBank;
    },

    onLightingDataChange() {
      this.active = ["lighting"].concat(this.$refs.lighting.getNodes());
      console.log(this.active);
    }
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
}

#main {
  width: 100%;
  font-size: 10pt;
}
</style>
