<template>
  <ContentBox title="Gate">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value=amount />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="Threshold" :slider-min-value=-60 :slider-max-value=0 :text-min-value=-60 :text-max-value=0 text-suffix="dB" :slider-value=threshold />
      <Slider title="Attenuation" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value=attenuation />
      <Slider title="Attack" :slider-min-value=10 :slider-max-value=2000 :text-min-value=10 :text-max-value=2000 text-suffix="ms" :slider-value=attack />
      <Slider title="Release" :slider-min-value=10 :slider-max-value=2000 :text-min-value=10 :text-max-value=2000 text-suffix="ms" :slider-value=release />
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
</template>

<script>
import ContentBox from "../../ContentBox";
import ExpandoBox from "../../util/ExpandoBox";
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {getTimeByName} from "@/util/micMappings";
export default {
  name: "MicGate",
  components: {Slider, ExpandoBox, ContentBox},
  data() {
    return {
      isVisible: false,
      amount: 30,
      threshold: 0,
      attenuation: 10,
      attack: 10,
      release: 10
    }
  },

  created() {
    // eslint-disable-next-line no-unused-vars
    this.waitFor(_ => store.hasActiveDevice() === true).then(
        // eslint-disable-next-line no-unused-vars
        _ => {
          this.threshold = store.getActiveDevice().mic_status.noise_gate.threshold
          this.attack = getTimeByName(store.getActiveDevice().mic_status.noise_gate.attack)
          this.release = getTimeByName(store.getActiveDevice().mic_status.noise_gate.release)
          this.attenuation = store.getActiveDevice().mic_status.noise_gate.attenuation
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

    waitFor(conditionFunction) {
      const poll = resolve => {
        if (conditionFunction()) resolve();
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
      }
      return new Promise(poll);
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
