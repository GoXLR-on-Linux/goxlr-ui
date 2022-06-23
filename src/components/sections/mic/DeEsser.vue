<template>
  <ContentBox title="De-Esser">
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value=0 />
  </ContentBox>
</template>

<script>
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
export default {
  name: "MicDeEsser",
  components: {Slider, ContentBox}
}
</script>

<style scoped>

</style>