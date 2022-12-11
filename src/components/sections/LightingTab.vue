<template>
  <div style="display: flex">
      <div style="display: flex; height: 370px">
          <LightingSection :is_selected="isActive(0)" @click="sectionClick(0)">Mixer</LightingSection>
          <LightingSection v-show="!isDeviceMini()" :is_selected="isActive(1)" @click="sectionClick(1)">Effects</LightingSection>
          <LightingSection v-show="!isDeviceMini()" :is_selected="isActive(2)" @click="sectionClick(2)">Sampler</LightingSection>
          <LightingSection :is_selected="isActive(3)" @click="sectionClick(3)">Cough / Bleep</LightingSection>
          <LightingSection :is_selected="isActive(4)" @click="sectionClick(4)">Global</LightingSection>
      </div>
    <div>
      <LightingMixer v-show="activeTab === 0"/>
      <LightingEffects v-show="activeTab === 1"/>
      <LightingSampler v-show="activeTab === 2" />
      <LightingCough v-show="activeTab === 3" />
      <LightingGlobal v-show="activeTab === 4" />
    </div>
  </div>
</template>

<script>
import LightingSection from "@/components/sections/lighting/LightingSection";
import LightingMixer from "@/components/sections/lighting/LightingMixer";
import LightingCough from "@/components/sections/lighting/LightingCough";
import LightingGlobal from "@/components/sections/lighting/LightingGlobal";
import LightingEffects from "@/components/sections/lighting/LightingEffects";
import {isDeviceMini} from "@/util/util";
import LightingSampler from "@/components/sections/lighting/LightingSampler";

export default {
  name: "LightingTab",
  components: {LightingSampler, LightingEffects, LightingGlobal, LightingCough, LightingMixer, LightingSection},
  data() {
    return {
      activeTab: 0,
    }
  },

  methods: {
    isActive(id) {
      return this.activeTab === id;
    },

    sectionClick(id) {
      this.activeTab = id;
    },

    isDeviceMini() {
      return isDeviceMini();
    },
  }

}
</script>

<style scoped>

</style>