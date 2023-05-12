<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import Presets from "@/components/sections/lighting/subTabs/effects/LightingEffectsPresets.vue";
import LightingEffectsEncoders from "@/components/sections/lighting/subTabs/effects/LightingEffectsEncoders.vue";
import LightingEffectsEffects from "@/components/sections/lighting/subTabs/effects/LightingEffectsEffects.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
    name: "LightingEffects",
    components: {
      CenteredContainer,
        ContentContainer,
        Presets,
        LightingEffectsEncoders,
        LightingEffectsEffects
    }
}
</script>

<template>
  <CenteredContainer>
    <ContentContainer style="padding-top: 15px; ; padding-bottom: 20px">
        <Presets />
        <LightingEffectsEncoders />
        <LightingEffectsEffects />
    </ContentContainer>
  </CenteredContainer>
</template>
