<template>
  <ContentBox title="Equalizer">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider :id=0 title="Bass" :slider-min-value=-9 :slider-max-value=9 text-suffix="" :slider-value=getBassValue()
              :store-path="getAggregateStorePaths(0)" @value-changed=aggregateChanged />
      <Slider :id=1 title="Mid" :slider-min-value=-9 :slider-max-value=9 text-suffix="" :slider-value=getMidValue()
              :store-path="getAggregateStorePaths(1)" @value-changed=aggregateChanged />
      <Slider :id=2 title="Treble" :slider-min-value=-9 :slider-max-value=9 text-suffix=""
              :store-path="getAggregateStorePaths(2)" :slider-value=getTrebleValue()
              @value-changed=aggregateChanged />
    </div>

    <div class="rowContent" :class="{hidden: !isVisible}">
      <Slider v-for="index in this.getElementCount()" :id=index :key=index :slider-min-value=-9
              :slider-max-value=9
              :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value="getValue(index)"
              :title=getTitle(index) :store-path="getStorePath(index)" @value-changed=valueChange />
    </div>

  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible"/>
</template>

<script>
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
import ExpandoBox from "../../design/ExpandoBox";
import {store} from "@/store";
import {EqFreqs, EqMiniFreqs} from "@/util/mixerMapping";
import {websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";

export default {
  name: "MicEqualiser",
  components: {ExpandoBox, Slider, ContentBox},

  data() {
    return {
      isVisible: false,
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

    getElementCount() {
      if (isDeviceMini()) {
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
      if (isDeviceMini()) {
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
      let commandName = (isDeviceMini()) ? "SetEqMiniGain" : "SetEqGain";
      id -= 1;

      let key = (isDeviceMini()) ? EqMiniFreqs[id] : EqFreqs[id];
      this.sendGainCommand(commandName, key, value);
    },

    aggregateChanged(id, newValue) {
      let commandName = (isDeviceMini()) ? "SetEqMiniGain" : "SetEqGain";
      let keyArray = (isDeviceMini()) ? EqMiniFreqs : EqFreqs;
      let index = []

      // TODO: Check these indexes, I think the mini has [0,1], [2,3,4], [5]
      if (id === 0) {
        index = (isDeviceMini()) ? [0, 1] : [0, 1, 2, 3];
      } else if (id === 1) {
        index = (isDeviceMini()) ? [2, 3] : [4, 5, 6];
      } else if (id === 2) {
        index = (isDeviceMini()) ? [4, 5] : [7, 8, 9];
      }

      for (let i of index) {
        this.sendGainCommand(commandName, keyArray[i], newValue);
      }
    },

    sendGainCommand(commandName, key, value) {
      let command = {[commandName]: [key, value]};
      websocket.send_command(store.getActiveSerial(), command);
    },

    getValue(id) {
      id -= 1;

      if (!store.hasActiveDevice()) {
        return 0;
      }
      if (isDeviceMini()) {
        return parseInt(store.getActiveDevice().mic_status.equaliser_mini.gain[EqMiniFreqs[id]]);
      } else {
        return parseInt(store.getActiveDevice().mic_status.equaliser.gain[EqFreqs[id]]);
      }
    },

    getBassValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      let bass = 0;
      if (!isDeviceMini()) {
        let gain = store.getActiveDevice().mic_status.equaliser.gain;
        bass = Math.round((gain[EqFreqs[0]] + gain[EqFreqs[1]] + gain[EqFreqs[2]] + gain[EqFreqs[3]]) / 4)
      } else {
        let gain = store.getActiveDevice().mic_status.equaliser_mini.gain;
        bass = Math.round((gain[EqMiniFreqs[0]] + gain[EqMiniFreqs[1]]) / 2)
      }
      return bass
    },

    getMidValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      let mid = 0;
      if (!isDeviceMini()) {
        let gain = store.getActiveDevice().mic_status.equaliser.gain;
        mid = Math.round((gain[EqFreqs[4]] + gain[EqFreqs[5]] + gain[EqFreqs[6]]) / 3)
      } else {
        let gain = store.getActiveDevice().mic_status.equaliser_mini.gain;
        mid = Math.round((gain[EqMiniFreqs[2]] + gain[EqMiniFreqs[3]]) / 2)
      }
      return mid
    },

    getTrebleValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      let treble = 0;
      if (!isDeviceMini()) {
        let gain = store.getActiveDevice().mic_status.equaliser.gain;
        treble = Math.round((gain[EqFreqs[7]] + gain[EqFreqs[8]] + gain[EqFreqs[9]]) / 3)
      } else {
        let gain = store.getActiveDevice().mic_status.equaliser_mini.gain;
        treble = Math.round((gain[EqMiniFreqs[4]] + gain[EqMiniFreqs[5]]) / 2)
      }
      return treble
    },

    getStorePath(id) {
      if (!store.hasActiveDevice()) {
        return "/";
      }

      id -= 1;
      let path = isDeviceMini() ? "equaliser_mini" : "equaliser";
      let title = isDeviceMini() ? EqMiniFreqs[id] : EqFreqs[id];
      return "/mixers/" + store.getActiveSerial() + "/mic_status/" + path + "/gain/" + title;
    },

    getAggregateStorePaths(id) {
      if (!store.hasActiveDevice()) {
        return "/";
      }

      // This is ugly :(
      if (id === 0) {
        return (isDeviceMini()) ?
            this.getStorePath(1) + ";" + this.getStorePath(2) :
            this.getStorePath(1) + ";" + this.getStorePath(2) + ";" + this.getStorePath(3) + ";" + this.getStorePath(4);
      } else if (id === 1) {
        return (isDeviceMini()) ?
            this.getStorePath(3) + ";" + this.getStorePath(4) :
            this.getStorePath(5) + ";" + this.getStorePath(6) + ";" + this.getStorePath(7);
      } else if (id === 2) {
        return (isDeviceMini()) ?
            this.getStorePath(5) + ";" + this.getStorePath(6) :
            this.getStorePath(8) + ";" + this.getStorePath(9) + ";" + this.getStorePath(10);
      }
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
