<template>
  <ContentBox title="Compressor">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <!--TODO("Add method to calculate amount.")-->
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="" :slider-value=0 store-path="/" />
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="Threshold" :id=0 :slider-min-value=-40 :slider-max-value=0 text-suffix="dB" :slider-value="getThresholdValue()" :store-path="getStorePath('threshold')" @value-changed="setValue" />
      <Slider title="Ratio" :id=1 :slider-min-value=1 :slider-max-value=64 text-suffix=":1" :value-map="ratioValueMap()" :slider-value="getRatioValue()" :store-path="getStorePath('ratio')" @value-changed="setValue" />
      <Slider title="Attack" :id=2 :slider-min-value=0 :slider-max-value=40 text-suffix="ms" :value-map="attackValueMap()" :slider-value="getAttackValue()" :store-path="getStorePath('attack')" @value-changed="setValue" />
      <Slider title="Release" :id=3 :slider-min-value=0 :slider-max-value=3000 text-suffix="ms" :value-map="releaseValueMap()" :slider-value="getReleaseValue()" :store-path="getStorePath('release')" @value-changed="setValue" />
      <Slider title="Make-up Gain" :id=4 :slider-min-value=0 :slider-max-value=24 text-suffix="dB" :slider-value="getGainValue()" :store-path="getStorePath('makeup_gain')" @value-changed="setValue" />
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
</template>

<script>
import ExpandoBox from "../../design/ExpandoBox";
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "MicCompressor",
  components: {Slider, ContentBox, ExpandoBox},

  data() {
    return {
      isVisible: true,
    }
  },

  methods: {
    setValue(id, value) {
      switch (id) {
        case 0: this.commitValue("SetCompressorThreshold", value); break;
        case 1: this.commitValue("SetCompressorRatio", value); break;
        case 2: this.commitValue("SetCompressorAttack", value); break;
        case 3: this.commitValue("SetCompressorReleaseTime", value); break;
        case 4: this.commitValue("SetCompressorMakeupGain", value); break;
      }
    },

    commitValue(name, value) {
      let serial = store.getActiveSerial();

      let command = {
        [name]: value
      }
      websocket.send_command(serial, command);
    },

    getThresholdValue() {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().mic_status.compressor.threshold;
      }
    },

    ratioValueMap() {
      return ["1", "1.1", "1.2", "1.4", "1.6", "1.8", "2", "2.5", "3.2", "4", "5.6", "8", "16", "32", "64"];
    },

    getRatioValue() {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().mic_status.compressor.ratio;
      }
    },

    attackValueMap() {
      return ["0.001", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12",
        "14", "16", "18", "20", "23", "26", "30", "35", "40"];
    },

    getAttackValue() {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().mic_status.compressor.attack;
      }
    },

    releaseValueMap() {
      return ["0", "15", "25", "35", "45", "55", "65", "75", "85",
        "100", "115", "140", "170", "230", "340", "680", "1000", "1500", "2000", "3000"];
    },

    getReleaseValue() {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().mic_status.compressor.release;
      }
    },

    getGainValue() {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().mic_status.compressor.makeup_gain;
      }
    },

    hideExpanded() {
      return false;
    },

    toggleExpando() {
      //this.isVisible = !this.isVisible;
      // TODO: Until compressor calcs are available, disable this..
    },

    getStorePath: function(target) {
      return "/mixers/" + store.getActiveSerial() + "/mic_status/compressor/" + target;
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
