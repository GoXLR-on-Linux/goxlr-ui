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
};
</script>

<template>
  <div style="display: flex">
    <ContentContainer style="padding-top: 15px; padding-bottom: 20px">
      <Presets />
      <LightingEffectsEncoders />
      <LightingEffectsEffects />
    </ContentContainer>
  </div>
</template>
