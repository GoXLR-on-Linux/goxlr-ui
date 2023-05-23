<template>
  <div class="faders">
    <VisualisationFader fader="A"/>
    <VisualisationFader fader="B"/>
    <VisualisationFader fader="C"/>
    <VisualisationFader fader="D"/>
  </div>
</template>

<script>
import VisualisationFader from "@/components/visualisation/faders/FaderGroup.vue";

export default {
  name: "FaderVisualisation",
  components: {VisualisationFader}
}
</script>

<style scoped>

.faders {
  display: flex;
  flex-direction: row
}
</style>
