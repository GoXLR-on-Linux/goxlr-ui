<script>
import Mixer from "@/components/sections/lighting/subTabs/LightingMixer.vue";
import Effects from "@/components/sections/lighting/subTabs/LightingEffects.vue";
import Sampler from "@/components/sections/lighting/subTabs/LightingSampler.vue";
import Cough from "@/components/sections/lighting/subTabs/LightingCough.vue";
import Global from "@/components/sections/lighting/subTabs/LightingGlobal.vue";

import { isDeviceMini } from "@/util/util";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "LightingTab",
  components: {
    CenteredContainer,
    Mixer,
    Effects,
    Sampler,
    Cough,
    Global,
  },

  data() {
    return {
      currentTab: 'Mixer',
    }
  },

  methods: {
    getTabs() {
      return isDeviceMini() ? ['Mixer', 'Cough', 'Global'] : ['Mixer', 'Effects', 'Sampler', 'Cough', 'Global']
    }
  }
}
</script>

<template>
  <CenteredContainer>
    <button
      v-for="tab in getTabs()"
      :key="tab"
      :class="['button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
  </CenteredContainer>
  <component :is="currentTab" />
</template>

<style scoped>
.button {
  min-width: 100px;
  margin: 0 2px;
  padding: 10px 20px;

  /** Tmporary top margin, removed after higher level tab refactoring */
  margin-top: 40px;

  color: #ffffff;
  background-color: #2b2f2d;
  border: none;
  cursor: pointer;
}

.button.active {
  color: #2b2f2d;
  background-color: #59b1b6;
}
</style>
