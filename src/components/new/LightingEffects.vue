<script>
import Container2 from "@/components/new/Container03";
import Presets from "@/components/new/LightingEffectsPresets";
import Encoders from "@/components/new/LightingEffectsEncoders.vue";
import Effects from "@/components/new/LightingEffectsEffects.vue";

export default {
    name: "LightingEffects",
    components: {
        Container2,
        Presets,
        Encoders,
        Effects
    }
}
</script>

<template>
    <Container2>
        <Presets />
        <Encoders />
        <Effects />
    </Container2>
</template>
