<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import Presets from "@/components/sections/lighting/subTabs/effects/LightingEffectsPresets.vue";
import LightingEffectsEncoders from "@/components/sections/lighting/subTabs/effects/LightingEffectsEncoders.vue";
import LightingEffectsEffects from "@/components/sections/lighting/subTabs/effects/LightingEffectsEffects.vue";

export default {
  name: "LightingEffects",
  components: {
    ContentContainer,
    Presets,
    LightingEffectsEncoders,
    LightingEffectsEffects,
  },

  methods: {
    getNodes() {
      return [this.$refs.presets.activePreset];
    },
  }
};
</script>

<template>
  <div style="display: flex">
    <ContentContainer style="padding-top: 15px; padding-bottom: 20px">
      <Presets ref="presets" @nav-updated="$emit('nav-updated')" />
      <LightingEffectsEncoders />
      <LightingEffectsEffects />
    </ContentContainer>
  </div>
</template>
