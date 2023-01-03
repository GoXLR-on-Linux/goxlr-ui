<script>
import Mixer from "@/components/sections/lighting/subTabs/Mixer";
import Effects from "@/components/sections/lighting/subTabs/Effects";
import Sampler from "@/components/sections/lighting/subTabs/Sampler";
import Cough from "@/components/sections/lighting/subTabs/Cough";
import Global from "@/components/sections/lighting/subTabs/Global";

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
      tabs: isDeviceMini() ? ['Mixer', 'Cough', 'Global'] : ['Mixer', 'Effects', 'Sampler', 'Cough', 'Global'],
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
