<template>
  <div id="main">
    <DeviceSelector v-if="!isDeviceSet()"/>
    <template v-if="isDeviceSet()">
      <h1 class="screenreader-only"> {{ $t('message.navigation.accessibilityProfileSection') }}</h1>
      <div style="display: flex; flex-direction: row; column-gap: 30px">
        <div>
          <FileTabs/>
        </div>
        <div aria-hidden="true" style="margin: auto; width: 100%">
          <GoXLRVisualiser :highlighted-areas="this.visualiserHighlightAreas" @area-click="onAreaClicked"/>
        </div>
      </div>

      <div style="height: 25px; background-color: #3b413f"/>
      <h1 class="sr-only">{{ $t('message.navigation.accessibilityDeviceSection') }}</h1>
      <Tabs ref="device-tabs" @on-change="onTabChange" :label="$t('message.navigation.accessibilityDeviceSection')">
        <Tab id="mic" :name="$t('message.navigation.microphone')">
          <Mic/>
        </Tab>
        <Tab id="mixer" :name="$t('message.navigation.mixer')" selected>
          <ContentContainer>
            <Mixer/>
          </ContentContainer>
        </Tab>
        <Tab id="configuration" :name="$t('message.navigation.configuration')">
          <ContentContainer>
            <CenteredContainer>
              <Faders ref="faders" @on-fader-channel-change="onFaderChannelChange"/>
              <Cough/>
            </CenteredContainer>
          </ContentContainer>
        </Tab>
        <Tab id="effects" v-if="!isDeviceMini()" :name="$t('message.navigation.effects')">
          <EffectsTab ref="effects" @on-effect-preset-change="onEffectPresetChange"/>
        </Tab>
        <Tab id="sampler" v-if="!isDeviceMini()" :name="$t('message.navigation.sampler')">
          <ContentContainer>
            <SamplerTab ref="sampler" @on-sample-bank-change="onSampleBankChange"/>
          </ContentContainer>
        </Tab>
        <Tab id="lighting" :name="$t('message.navigation.lighting')">
          <LightingTab ref="lighting" @on-lighting-changed="onLightingDataChange"/>
        </Tab>
        <Tab id="routing" :name="$t('message.navigation.routing')">
          <ContentContainer>
            <Routing/>
          </ContentContainer>
        </Tab>
        <Tab id="system" :name="$t('message.navigation.system')">
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
import {HighlightArea} from "@/components/visualisation/VisualiserHelper";

export default {
  name: "GoXLR",
  computed: {
    HighlightArea() {
      return HighlightArea
    }
  },
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
      visualiserHighlightAreas: [],
    }
  },

  methods: {
    isDeviceMini,

    isDeviceSet() {
      let ready = store.hasActiveDevice() && store.isConnected();
      if (ready) {
        this.$i18n.locale = "en";
      }

      return ready;
    },

    onTabChange(tab) {
      let id = tab.id;
      if (id === "configuration") {
        this.visualiserHighlightAreas = [
          HighlightArea.COUGH,
          HighlightArea.CHANNEL_A
        ];
      } else if (id === "effects") {
        // This one comes initially from the store...
        this.visualiserHighlightAreas = [
          HighlightArea[`EFFECTS_PRESET${this.$refs.effects.getActivePreset().slice(-1)}`]
        ];
      } else if (id === "sampler") {
        this.visualiserHighlightAreas = [
          HighlightArea[`SAMPLER_BANK_${this.$refs.sampler.activeBank}`]
        ];
      } else {
        this.visualiserHighlightAreas = []
      }
    },

    onFaderChannelChange(activeChannel) {
      this.visualiserHighlightAreas[this.visualiserHighlightAreas.length - 1] = HighlightArea[`CHANNEL_${activeChannel}`];
    },

    onEffectPresetChange(activePreset) {
      this.visualiserHighlightAreas = [HighlightArea[`EFFECTS_PRESET${activePreset.slice(-1)}`]];
    },

    onSampleBankChange(activeBank) {
      this.visualiserHighlightAreas = [HighlightArea[`SAMPLER_BANK_${activeBank}`]];
    },

    onLightingDataChange() {
      let lightingData = this.$refs.lighting.getNodes();

      // mixer channels
      if (lightingData[0] === "mixer")
        this.visualiserHighlightAreas = [HighlightArea[`CHANNEL_${lightingData[1]}`]];

      // effect presets
      else if (lightingData[0] === "effects")
        this.visualiserHighlightAreas = [HighlightArea[`EFFECTS_PRESET${lightingData[1].slice(-1)}`]];

      // sampler banks
      else if (lightingData[0] === "sampler")
        this.visualiserHighlightAreas = [HighlightArea[`SAMPLER_BANK_${lightingData[1].slice(-1)}`]];

      // cough
      else if (lightingData[0] === "cough")
        this.visualiserHighlightAreas = [HighlightArea.COUGH];

      // nothing
      else this.visualiserHighlightAreas = [];
    },

    onAreaClicked(area) {
      switch (area.area) {
        case HighlightArea.COUGH: {
          this.loadConfigurationTab();
          break;
        }
        case HighlightArea.CHANNEL_A:
          this.loadConfigurationTab("A");
          break;
        case HighlightArea.CHANNEL_B:
          this.loadConfigurationTab("B");
          break;
        case HighlightArea.CHANNEL_C:
          this.loadConfigurationTab("C");
          break;
        case HighlightArea.CHANNEL_D: {
          this.loadConfigurationTab("D");
          break;
        }
        case HighlightArea.SAMPLER_BANK_A: {
          this.loadSampleBank("A");
          break;
        }
        case HighlightArea.SAMPLER_BANK_B: {
          this.loadSampleBank("B");
          break;
        }
        case HighlightArea.SAMPLER_BANK_C: {
          this.loadSampleBank("C");
          break;
        }
        case HighlightArea.EFFECTS_PRESET1: {
          this.loadEffectsTab("Preset1");
          break;
        }
        case HighlightArea.EFFECTS_PRESET2: {
          this.loadEffectsTab("Preset2");
          break;
        }
        case HighlightArea.EFFECTS_PRESET3: {
          this.loadEffectsTab("Preset3");
          break;
        }
        case HighlightArea.EFFECTS_PRESET4: {
          this.loadEffectsTab("Preset4");
          break;
        }
        case HighlightArea.EFFECTS_PRESET5: {
          this.loadEffectsTab("Preset5");
          break;
        }
        case HighlightArea.EFFECTS_PRESET6: {
          this.loadEffectsTab("Preset6");
          break;
        }
      }

      console.log(area);
    },

    loadConfigurationTab(channel = undefined) {
      this.$refs['device-tabs'].selectTabById("configuration");
      if (channel !== undefined) {
        this.$nextTick(() => {
          this.$refs.faders.channelChanged(channel);
        });
      }
    },

    loadSampleBank(bank) {
      this.$refs['device-tabs'].selectTabById("sampler");
      this.$nextTick(() => {
        this.$refs.sampler.setActiveBank(bank);
      })
    },

    loadEffectsTab(preset) {
      this.$refs['device-tabs'].selectTabById("effects");
      this.$nextTick(() => {
        this.$refs.effects.onEffectSelectionChange(preset);
      });
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
