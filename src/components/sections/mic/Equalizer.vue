<template>
  <ContentBox  title="Equalizer">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider :id=10 title="Bass" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9
              text-suffix="" :slider-value=getBassValue() />
      <Slider :id=11 title="Mid" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9
              text-suffix="" :slider-value=getMidValue() />
      <Slider :id=12 title="Treble" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9
              text-suffix="" :slider-value=getTrebleValue() />
    </div>

    <div class="rowContent" :class="{hidden: !isVisible}">
      <Slider v-for="index in this.getElementCount()" :id=index :key=index :slider-min-value=-9
              :slider-max-value=9
              :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value="getValue(index)"
              :title=getTitle(index) @value-changed=valueChange />
    </div>

  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible"/>
</template>

<script>
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
import ExpandoBox from "../../util/ExpandoBox";
import {store} from "@/store";
import {EqFreqs, EqMiniFreqs} from "@/util/mixerMapping";
import {websocket} from "@/util/websocket";

export default {
  name: "MicEqualiser",
  components: {ExpandoBox, Slider, ContentBox},

  data() {
    return {
      isVisible: false,
      //Full = true; Mini = False
      deviceType: true,

      length: Number,


    }
  },

  methods: {
    hideExpanded() {
      return false;
    },

    toggleExpando() {
      this.isVisible = !this.isVisible;
    },

    isDeviceMini() {
      // Do this here, rather than on created() so it can update if the device changes
      if (!store.hasActiveDevice()) {
        return true;
      }
      return store.getActiveDevice().hardware.device_type === "Mini";
    },

    getElementCount() {
      if (this.isDeviceMini()) {
        return EqMiniFreqs.length;
      }
      return EqFreqs.length;
    },

    getTitle(id) {
      // Vue counts from 1 instead of 0 which we need for positioning..
      id -= 1;

      if (!store.hasActiveDevice()) {
        return "";
      }
      // Probably a better way to do this
      let freq = undefined;
      if (this.isDeviceMini()) {
        freq = parseInt(store.getActiveDevice().mic_status.equaliser_mini.frequency[EqMiniFreqs[id]]);
      } else {
        freq = parseInt(store.getActiveDevice().mic_status.equaliser.frequency[EqFreqs[id]]);
      }
      // Turn this frequency into a 'Number'
      if (freq < 1000) {
        return Math.round(freq * 10) / 10 + "Hz";
      } else {
        return Math.round(freq) / 1000 + "Khz";
      }
    },

    valueChange(id, value) {
      id -= 1;

      let commandName = (this.isDeviceMini()) ? "SetEqMiniGain" : "SetEqGain";
      let key = (this.isDeviceMini()) ? EqMiniFreqs[id] : EqFreqs[id];

      // Build the command..
      let command = {
        [commandName]: [
          key,
          value
        ]
      }
      websocket.send_command(store.getActiveSerial(), command);
    },

    getValue(id) {
      id -= 1;

      if (!store.hasActiveDevice()) {
        return 0;
      }
      if (this.isDeviceMini()) {
        return parseInt(store.getActiveDevice().mic_status.equaliser_mini.gain[EqMiniFreqs[id]]);
      } else {
        return parseInt(store.getActiveDevice().mic_status.equaliser.gain[EqFreqs[id]]);
      }
    },

    getBassValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      let gain = store.getActiveDevice().mic_status.equaliser.gain
      let bass = 0;
      if (this.deviceType) {
        bass = Math.round((gain[EqFreqs[0]] + gain[EqFreqs[1]] + gain[EqFreqs[2]] + gain[EqFreqs[3]]) / 4)
      } else {
        bass = Math.round((gain[EqMiniFreqs[0]] + gain[EqMiniFreqs[1]]) / 2)
      }
      return bass
    },

    getMidValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      let gain = store.getActiveDevice().mic_status.equaliser.gain
      let mid = 0;
      if (this.deviceType) {
        mid = Math.round((gain[EqFreqs[4]] + gain[EqFreqs[5]] + gain[EqFreqs[6]]) / 3)
      } else {
        mid = Math.round((gain[EqMiniFreqs[2]] + gain[EqMiniFreqs[3]]) / 2)
      }
      return mid
    },

    getTrebleValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      let gain = store.getActiveDevice().mic_status.equaliser.gain
      let treble = 0;
      if (this.deviceType) {
        treble = Math.round((gain[EqFreqs[7]] + gain[EqFreqs[8]] + gain[EqFreqs[9]]) / 3)
      } else {
        treble = Math.round((gain[EqMiniFreqs[4]] + gain[EqMiniFreqs[5]]) / 3)
      }
      return treble
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
