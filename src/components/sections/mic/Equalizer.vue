<template>
  <ContentBox  title="Equalizer">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider :id=100 title="Bass" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9
              text-suffix="" :slider-value=getBassValue() @value-changed=valueChange />
      <Slider :id=110 title="Mid" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9
              text-suffix="" :slider-value=getMidValue() @value-changed=valueChange />
      <Slider :id=120 title="Treble" :slider-min-value=-9 :slider-max-value=9 :text-min-value=-9 :text-max-value=9
              text-suffix="" :slider-value=getTrebleValue() @value-changed=valueChange />
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
      let commandName = (this.isDeviceMini()) ? "SetEqMiniGain" : "SetEqGain";
      //Check if Bass-Slider was moved and move all Bass sliders to this value (behaviour copied from the original app)
      if (id === 100){
        if (this.isDeviceMini()){
          for (let i = 0; i < 2; i++){
            let key = EqMiniFreqs[i];
            let command = {
              [commandName]: [
                key,
                value
              ]
            }
            websocket.send_command(store.getActiveSerial(), command)
          }
        } else {
          for (let i = 0; i < 4; i++){
            let key = EqFreqs[i];
            let command = {
              [commandName]: [
                key,
                value
              ]
            }
            websocket.send_command(store.getActiveSerial(), command)
          }
        }
        return
      }
      //Check if Mid-Slider was moved and move all Bass sliders to this value (behaviour copied from the original app)
      if (id === 110){
        if (this.isDeviceMini()){
          for (let i = 2; i < 4; i++){
            let key = EqMiniFreqs[i];
            let command = {
              [commandName]: [
                key,
                value
              ]
            }
            websocket.send_command(store.getActiveSerial(), command)
          }
        } else {
          for (let i = 4; i < 7; i++){
            let key = EqFreqs[i];
            let command = {
              [commandName]: [
                key,
                value
              ]
            }
            websocket.send_command(store.getActiveSerial(), command)
          }
        }
        return
      }
      //Check if Treble-Slider was moved and move all Bass sliders to this value (behaviour copied from the original app)
      if (id === 120){
        if (this.isDeviceMini()){
          for (let i = 4; i < 6; i++){
            let key = EqMiniFreqs[i];
            let command = {
              [commandName]: [
                key,
                value
              ]
            }
            websocket.send_command(store.getActiveSerial(), command)
          }
        } else {
          for (let i = 7; i < 10; i++){
            let key = EqFreqs[i];
            let command = {
              [commandName]: [
                key,
                value
              ]
            }
            websocket.send_command(store.getActiveSerial(), command)
          }
        }
        return
      }
      id -= 1;

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
