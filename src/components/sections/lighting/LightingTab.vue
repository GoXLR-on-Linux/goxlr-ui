<script>
import Mixer from "@/components/sections/lighting/LightingMixer";
import Effects from "@/components/sections/lighting/LightingEffects";
import Sampler from "@/components/sections/lighting/LightingSampler";
import CoughBleep from "@/components/sections/lighting/LightingCough";
import Global from "@/components/sections/lighting/LightingGlobal";

import { isDeviceMini } from "@/util/util";

export default {
  name: "LightingTab",
  components: {
    Mixer,
    Effects,
    Sampler,
    CoughBleep,
    Global,
  },

  data() {
    return {
      currentTab: 'Mixer',
      tabs: isDeviceMini() ? ['Mixer', 'CoughBleep', 'Global'] : ['Mixer', 'Effects', 'Sampler', 'CoughBleep', 'Global'],
    }
  },
}
</script>

<template>
  <button
    v-for="tab in tabs"
    :key="tab"
    :class="['button', { active: currentTab === tab }]"
    @click="currentTab = tab"
  >
    {{ tab }}
  </button>
  <component :is="currentTab" />
</template>

<style>
.button {
  min-width: 100px;
  margin: 0 2px;
  padding: 10px 20px;

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
