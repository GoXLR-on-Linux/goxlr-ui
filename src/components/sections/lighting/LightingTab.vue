<script>
import Mixer from "@/components/sections/lighting/subTabs/LightingMixer.vue";
import Effects from "@/components/sections/lighting/subTabs/LightingEffects.vue";
import Sampler from "@/components/sections/lighting/subTabs/LightingSampler.vue";
import Cough from "@/components/sections/lighting/subTabs/LightingCough.vue";
import Global from "@/components/sections/lighting/subTabs/LightingGlobal.vue";

import {isDeviceMini} from "@/util/util";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import {shallowRef} from "vue";
import {HighlightArea} from "@/components/visualisation/VisualiserHelper";

// We need to shallowRef these to avoid overheads..
const LightingMixer = shallowRef(Mixer);
const LightingEffects = shallowRef(Effects);
const LightingSampler = shallowRef(Sampler);
const LightingCough = shallowRef(Cough);
const LightingGlobal = shallowRef(Global);


export default {
  emits: ["on-lighting-changed"],

  name: "LightingTab",
  components: {
    CenteredContainer,
    LightingMixer,
    LightingEffects,
    LightingSampler,
    LightingCough,
    LightingGlobal,
  },

  data() {
    return {
      tabs: [
        {
          id: "global",
          type: LightingGlobal,
          display: "message.navigation.lightingGlobal",
        },
        {
          id: "mixer",
          type: LightingMixer,
          display: "message.navigation.lightingMixer",
        },
        {
          id: "effects",
          type: LightingEffects,
          display: "message.navigation.lightingEffects",
        },
        {
          id: "sampler",
          type: LightingSampler,
          display: "message.navigation.lightingSampler",
        },
        {
          id: "cough",
          type: LightingCough,
          display: "message.navigation.lightingCough",
        },
      ],

      currentTab: {
        id: "global",
        type: LightingGlobal,
        display: "message.navigation.lightingGlobal",
      },
    }
  },

  methods: {
    activateArea(area) {
      console.log(area);

      switch (area) {
        case HighlightArea.COUGH: {
          this.loadCoughTab();
          break;
        }
        case HighlightArea.CHANNEL_A:
          this.loadFaderTab("A");
          break;
        case HighlightArea.CHANNEL_B:
          this.loadFaderTab("B");
          break;
        case HighlightArea.CHANNEL_C:
          this.loadFaderTab("C");
          break;
        case HighlightArea.CHANNEL_D: {
          this.loadFaderTab("D");
          break;
        }
        case HighlightArea.SAMPLER_BANK_A: {
          this.loadSampleBank("SamplerSelectA");
          break;
        }
        case HighlightArea.SAMPLER_BANK_B: {
          this.loadSampleBank("SamplerSelectB");
          break;
        }
        case HighlightArea.SAMPLER_BANK_C: {
          this.loadSampleBank("SamplerSelectC");
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
    },

    loadCoughTab() {
        this.setTab(this.getTabById("cough"));
    },

    loadFaderTab(channel) {
      this.setTab(this.getTabById("mixer"));
        this.$nextTick(() => {
          this.$refs.component.onChannelSelectionChange(channel);
        });
    },

    loadSampleBank(bank) {
      this.setTab(this.getTabById("sampler"))
      this.$nextTick(() => {
        this.$refs.component.onButtonSelectionChange(bank);
      })
    },

    loadEffectsTab(preset) {
      this.setTab(this.getTabById("effects"));
      this.$nextTick(() => {
        this.$refs.component.setActivePreset(preset);
      });
    },

    getTabById(id) {
      return this.tabs.find((tab) => tab.id === id);
    },

    getTabs() {
      return isDeviceMini() ? [this.getTabById("global"), this.getTabById("mixer"), this.getTabById("cough")] : this.tabs;
    },
    onTabKeydown(event) {
      const tabs = this.getTabs();
      const activeTab = this.currentTab;
      const activeTabIndex = tabs.indexOf(activeTab);
      let nextTab;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextTab = tabs[(activeTabIndex + 1) % tabs.length];
        //explanation: if activeTabIndex is 0, then 0+1 % 3 = 1, so nextTab is tabs[1]
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextTab =
            tabs[(activeTabIndex - 1 + tabs.length) % tabs.length];
        //explanation: if activeTabIndex is 0, then 0-1+3 % 3 = 2, so nextTab is tabs[2]
      } else if (event.key === "Home") {
        nextTab = tabs[0];
      } else if (event.key === "End") {
        nextTab = tabs[tabs.length - 1];
      }

      if (nextTab) {
        this.setTab(nextTab);

        //we need a ref on the button element to focus it
        this.$refs[nextTab.id][0].focus();
      }
    },
    setTab(tab) {
      this.currentTab = tab;
      this.$nextTick(() => this.$emit("on-lighting-changed"));
    },
    navUpdated() {
      this.$nextTick(() => this.$emit("on-lighting-changed"));
    },
    getNodes() {
      return [this.currentTab.id].concat(this.$refs.component.getNodes());
    }
  },

  mounted() {
    this.currentTab = this.getTabById("global");
  }
}
</script>

<template>
  <CenteredContainer class="sections" role="tablist" :aria-label="$t('message.navigation.accessibilityLightingSection')">
    <button v-for="tab in getTabs()" :key="tab.id" :class="['button', { active: currentTab === tab }]"
            @click="setTab(tab)" role="tab" :aria-selected="currentTab === tab" :aria-controls="tab.id"
            :tabindex="currentTab === tab ? 0 : -1" :ref="tab.id" @keydown="onTabKeydown">
      {{ $t(tab.display) }}
    </button>
  </CenteredContainer>
  <component @nav-updated="navUpdated" ref="component" :is="currentTab.type" role="tabpanel" :aria-label="currentTab.display"/>
</template>

<style scoped>

.sections > button:first-child {
  border-radius: 5px 0 0 5px;
}

.sections > button:last-child {
  border-radius: 0 5px 5px 0;
}

.sections {
  gap: 2px;
}

.button {
  min-width: 100px;
  padding: 6px 6px;
  width: fit-content;

  margin-top: 15px;

  color: #ffffff;
  background-color: #353937;
  border: none;
  cursor: pointer;
}

.button:not(.active):hover {
  background-color: #49514e;
}

.button.active {
  color: #2b2f2d;
  background-color: #59b1b6;
}
</style>
