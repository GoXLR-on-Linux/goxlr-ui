<script>
import Mixer from "@/components/sections/lighting/subTabs/Mixer";
import Effects from "@/components/sections/lighting/subTabs/Effects";
import Sampler from "@/components/new/LightingSampler";
import Cough from "@/components/new/LightingCough";
import Global from "@/components/new/LightingGlobal";

import { isDeviceMini } from "@/util/util";

export default {
  name: "LightingTab",
  components: {
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
  <button
    v-for="tab in getTabs()"
    :key="tab"
    :class="['button', { active: currentTab === tab }]"
    @click="currentTab = tab"
  >
    {{ tab }}
  </button>
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
