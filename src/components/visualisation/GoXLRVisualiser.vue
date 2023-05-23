<template>
  <div class="base">
    <div class="faders">
      <VisualisationFader fader="A"/>
      <VisualisationFader fader="B"/>
      <VisualisationFader fader="C"/>
      <VisualisationFader fader="D"/>
    </div>
    <!-- Channel Width: 70px -->
    <!-- Img: 56w - 32h -->
    <!--
      Slider Width: 36px
      Colour Size: 12px
      Colour Count: 15

      button: 58x36





    -->
  </div>
</template>

<script>
import VisualisationFader from "@/components/visualisation/VisualisationFader.vue";

export default {
  name: "GoXLRVisualiser",
  components: {VisualisationFader},

}
</script>

<style scoped>
.base {
  width: 800px;
  height: 409px;
  background-color: #151515
}

.faders {
  display: flex;
  flex-direction: row
}
</style>
