<template>
  <div>
    <div class="faders">
      <VisualisationFader fader="A"/>
      <VisualisationFader fader="B"/>
      <VisualisationFader fader="C"/>
      <VisualisationFader fader="D"/>
    </div>
    <div v-if="isDeviceMini()">
      <MuteVisualisationMini />
    </div>
  </div>
</template>

<script>
import VisualisationFader from "@/components/visualisation/faders/FaderGroup.vue";
import {isDeviceMini} from "@/util/util";
import MuteVisualisationMini from "@/components/visualisation/mute/MuteVisualisationMini.vue";

export default {
  name: "FaderVisualisation",
  methods: {isDeviceMini},
  components: {MuteVisualisationMini, VisualisationFader}
}
</script>

<style scoped>

.faders {
  display: flex;
  flex-direction: row
}
</style>
