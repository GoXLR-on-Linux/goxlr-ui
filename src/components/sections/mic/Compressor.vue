<template>
  <ContentBox title="Compressor">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value=0 />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="Threshold" :slider-min-value=-40 :slider-max-value=0 :text-min-value=-40 :text-max-value=0 text-suffix="dB" :slider-value=0 />
      <Slider title="Ratio" :slider-min-value=1 :slider-max-value=64 :text-min-value=1 :text-max-value=64 text-suffix=":1" :slider-value=1 />
      <Slider title="Attack" :slider-min-value=0 :slider-max-value=40 :text-min-value=0 :text-max-value=40 text-suffix="" :slider-value=0 />
      <Slider title="Release" :slider-min-value=0 :slider-max-value=3000 :text-min-value=0 :text-max-value=3000 text-suffix="" :slider-value=0 />
      <Slider title="Make-up Gain" :slider-min-value=0 :slider-max-value=24 :text-min-value=0 :text-max-value=4 text-suffix="dB" :slider-value=0 />
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
</template>

<script>
import ExpandoBox from "../../util/ExpandoBox";
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
export default {
  name: "MicCompressor",
  components: {Slider, ContentBox, ExpandoBox},

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
