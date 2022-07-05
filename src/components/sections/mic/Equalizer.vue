<template>
  <ContentBox title="Equalizer">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Bass" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="Mid" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="Treble" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible || deviceType }">
      <Slider title="90Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="250Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />

      <Slider title="500Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="1KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />

      <Slider title="3Khz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="8KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible || !deviceType}">
      <Slider title="31.5Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="63Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="125Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="250Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />

      <Slider title="500Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="1KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="2KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />

      <Slider title="4KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="8KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="16Khz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
</template>

<script>
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
import ExpandoBox from "../../util/ExpandoBox";
export default {
  name: "MicEqualiser",
  components: {ExpandoBox, Slider, ContentBox},

  data() {
    return {
      isVisible: false,
      //Full = true; Mini = False
      deviceType: true,
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
