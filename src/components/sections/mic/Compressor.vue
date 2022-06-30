<template>
  <ContentBox title="Compressor">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value=0 />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="Threshold" :slider-min-value=-40 :slider-max-value=0 :text-min-value=-40 :text-max-value=0 text-suffix="dB" :slider-value=0 />
      <Slider title="Ratio" :slider-min-value=1 :slider-max-value=64 :text-min-value=1 :text-max-value=64 text-suffix=":1" :value-map="ratioValues()" :slider-value=0 />
      <Slider title="Attack" :slider-min-value=0 :slider-max-value=40 :text-min-value=0 :text-max-value=40 text-suffix="ms" :value-map="attackValues()" :slider-value=0 />
      <Slider title="Release" :slider-min-value=0 :slider-max-value=3000 :text-min-value=0 :text-max-value=3000 text-suffix="ms" :value-map="releaseValues()" :slider-value=0 />
      <Slider title="Make-up Gain" :slider-min-value=0 :slider-max-value=24 :text-min-value=0 :text-max-value=24 text-suffix="dB" :slider-value=0 />
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
    ratioValues() {
      return ["1", "1.1", "1.2", "1.4", "1.6", "1.8", "2", "2.5", "3.2", "4", "5.6", "8", "16", "32", "64"];
    },

    attackValues() {
      return ["0.001", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12",
        "14", "16", "18", "20", "23", "26", "30", "35", "40"];
    },

    releaseValues() {
      return ["0", "15", "25", "35", "45", "55", "65", "75", "85",
        "100", "115", "140", "170", "230", "340", "680", "1000", "1500", "2000", "3000"];
    },


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
