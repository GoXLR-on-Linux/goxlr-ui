<template>
  <div style="display: flex">
    <div style="display: flex; height: 370px; padding-right: 40px">
      <LightingSection :is_selected="isActive(0)" @click="sectionClick(0)">Mixer</LightingSection>
      <LightingSection :is_selected="isActive(1)" @click="sectionClick(1)">Cough / Bleep</LightingSection>
      <LightingSection :is_selected="isActive(2)" @click="sectionClick(2)">Global</LightingSection>
    </div>
    <div>
      <LightingMixer v-show="activeTab === 0"/>
      <LightingCough v-show="activeTab === 1"/>
      <LightingGlobal v-show="activeTab === 2" />
    </div>
  </div>
</template>

<script>
import LightingSection from "@/components/sections/lighting/LightingSection";
import LightingMixer from "@/components/sections/lighting/LightingMixer";
import LightingCough from "@/components/sections/lighting/LightingCough";
import LightingGlobal from "@/components/sections/lighting/LightingGlobal";

export default {
  name: "LightingTab",
  components: {LightingGlobal, LightingCough, LightingMixer, LightingSection},
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
    }
  }

}
</script>

<style scoped>

</style>