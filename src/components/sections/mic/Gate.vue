<template>
  <ContentBox title="Gate">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value=30 />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="Threshold" :slider-min-value=-60 :slider-max-value=0 :text-min-value=-60 :text-max-value=0 text-suffix="dB" :slider-value=0 />
      <Slider title="Attenuation" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value=10 />
      <Slider title="Attack" :slider-min-value=10 :slider-max-value=2000 :text-min-value=10 :text-max-value=2000 text-suffix="ms" :slider-value=10 />
      <Slider title="Release" :slider-min-value=10 :slider-max-value=2000 :text-min-value=10 :text-max-value=2000 text-suffix="ms" :slider-value=10 />
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
</template>

<script>
import ContentBox from "../../ContentBox";
import ExpandoBox from "../../util/ExpandoBox";
import Slider from "../../slider/Slider";
export default {
  name: "MicGate",
  components: {Slider, ExpandoBox, ContentBox},
  data() {
    return {
      isVisible: false,
    }
  },

  methods: {
    hideExpanded() {
      return false;
    },

    toggleExpando() {
      this.isVisible = !this.isVisible;
    }
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
  display: none !important;
}

.rowContent {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
