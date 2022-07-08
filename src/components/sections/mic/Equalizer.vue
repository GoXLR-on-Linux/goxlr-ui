<template>
  <ContentBox  title="Equalizer">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Bass" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="Mid" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="Treble" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
    </div>
    <div v-if="this.device_type === 'Mini'" class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="90Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="250Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />

      <Slider title="500Hz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="1KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />

      <Slider title="3Khz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
      <Slider title="8KHz" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value=0 />
    </div>
    <div v-else class="rowContent" :class="{ hidden: !isVisible }">
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
import {store} from "@/store";
import {waitFor} from "@/util/util";
export default {
  name: "MicEqualiser",
  components: {ExpandoBox, Slider, ContentBox},

  data() {
    return {
      isVisible: false,
      device_type: undefined,
    }
  },

  created() {
    waitFor(() => store.hasActiveDevice() === true).then(
        () => {
          this.device_type = store.getActiveDevice().hardware.device_type;
          console.log(this.device_type);
        }
    );
  },

  methods: {
    hideExpanded() {
      return false;
    },

    toggleExpando() {
      this.isVisible = !this.isVisible;
    },
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
