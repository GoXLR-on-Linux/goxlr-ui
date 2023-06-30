<template>
  <ExpandoGroupContainer title="Compressor" @expando-clicked="toggleAdvanced()" :expanded="isAdvanced()">
    <Slider v-show="!isAdvanced()" title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix=""
            :slider-value="getAmount()" @value-changed="updateAmount" :store-path="getAmountStorePath()"/>

    <Slider v-show="isAdvanced()" title="Threshold" :id=0 :slider-min-value=-40 :slider-max-value=0 text-suffix="dB"
            :slider-value="getThresholdValue()" :store-path="getStorePath('threshold')" @value-changed="setValue"/>
    <Slider v-show="isAdvanced()" title="Ratio" :id=1 :slider-min-value=1 :slider-max-value=64 text-suffix=":1"
            :value-map="ratioValueMap()"
            :slider-value="getRatioValue()" :store-path="getStorePath('ratio')" @value-changed="setValue"/>
    <Slider v-show="isAdvanced()" title="Attack" :id=2 :slider-min-value=0 :slider-max-value=40 text-suffix="ms"
            :value-map="attackValueMap()" :slider-value="getAttackValue()" :store-path="getStorePath('attack')"
            @value-changed="setValue"/>
    <Slider v-show="isAdvanced()" title="Release" :id=3 :slider-min-value=0 :slider-max-value=3000 text-suffix="ms"
            :value-map="releaseValueMap()" :slider-value="getReleaseValue()" :store-path="getStorePath('release')"
            @value-changed="setValue"/>
    <Slider v-show="isAdvanced()" title="Make-up Gain" :id=4 :slider-min-value=0 :slider-max-value=24 text-suffix="dB"
            :slider-value="getGainValue()" :store-path="getStorePath('makeup_gain')" @value-changed="setValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "MicCompressor",
  components: {ExpandoGroupContainer, Slider},

  data() {
    return {
      updatesPaused: false,
    }
  },

  methods: {
    isAdvanced() {
      return store.getActiveDevice().settings.display.compressor === "Advanced";
    },

    toggleAdvanced() {
      let mode = (store.getActiveDevice().settings.display.compressor === "Advanced" ? "Simple" : "Advanced");
      websocket.send_command(store.getActiveSerial(), {"SetElementDisplayMode": ["Compressor", mode]})
    },

    setValue(id, value, last) {
      if (this.updatesPaused && !last) {
        return;
      }

      this.updatesPaused = true;
      switch (id) {
        case 0: {
          this.commitValue("SetCompressorThreshold", value);
          store.getActiveDevice().mic_status.compressor.threshold = value;
          break;
        }
        case 1: {
          this.commitValue("SetCompressorRatio", value);
          store.getActiveDevice().mic_status.compressor.ratio = value;
          break;
        }
        case 2: {
          this.commitValue("SetCompressorAttack", value);
          store.getActiveDevice().mic_status.compressor.attack = value;
          break;
        }
        case 3: {
          this.commitValue("SetCompressorReleaseTime", value);
          store.getActiveDevice().mic_status.compressor.release = value;
          break;
        }
        case 4: {
          this.commitValue("SetCompressorMakeupGain", value);
          store.getActiveDevice().mic_status.compressor.makeup_gain = value;
          break;
        }
      }
    },

    commitValue(name, value) {
      let serial = store.getActiveSerial();

      let command = {
        [name]: value
      }
      websocket.send_command(serial, command).then(() => this.updatesPaused = false);
    },

    getThresholdValue() {
      return store.getActiveDevice().mic_status.compressor.threshold;
    },

    getAmount() {
      // Get the Threshold Value..
      let threshold = this.getThresholdValue();
      let value = 100 - Math.round((threshold + 40) / 40 * 100);
      return value;
    },

    updateAmount(id, value) {
      // Need to do the reverse of threshold, firstly, convert to a 'percent' of Threshold, then make it negative...
      // This doesn't exactly match windows, because Windows uses a stepping of 5, and we don't :p
      let threshold = Math.round((value / 100) * 40) * -1;

      // Makeup Gain when in 'Simple' mode updated like this (Thanks Kenny!).. Note this can go to -6!
      let makeup_gain = Math.round(-6 + threshold * -3 / 4);
      if (value === 0) {
        makeup_gain = 0;
      }
      this.setValue(0, threshold);
      this.setValue(4, makeup_gain);
    },

    ratioValueMap() {
      return [1, 1.1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3.2, 4, 5.6, 8, 16, 32, 64];
    },

    getRatioValue() {
      return store.getActiveDevice().mic_status.compressor.ratio;
    },

    attackValueMap() {
      return [0.001, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12,
        14, 16, 18, 20, 23, 26, 30, 35, 40];
    },

    getAttackValue() {
      return store.getActiveDevice().mic_status.compressor.attack;
    },

    releaseValueMap() {
      return [0, 15, 25, 35, 45, 55, 65, 75, 85,
        100, 115, 140, 170, 230, 340, 680, 1000, 1500, 2000, 3000];
    },

    getReleaseValue() {
      return store.getActiveDevice().mic_status.compressor.release;
    },

    getGainValue() {
      let value = store.getActiveDevice().mic_status.compressor.makeup_gain;
      if (value < 0) {
        return 0;
      }
      return value;
    },

    getAmountStorePath: function () {
      // When editing 'Amount', we need to pause both threshold and makeup_gain...
      let path = "/mixers/" + store.getActiveSerial() + "/mic_status/compressor/threshold";
      path += ";"
      path += "/mixers/" + store.getActiveSerial() + "/mic_status/compressor/makeup_gain"

      return path;
    },

    getStorePath: function (target) {
      return "/mixers/" + store.getActiveSerial() + "/mic_status/compressor/" + target;
    }
  }
}
</script>

<style scoped>
</style>
