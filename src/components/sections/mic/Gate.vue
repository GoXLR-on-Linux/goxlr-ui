<template>
  <ExpandoGroupContainer title="Gate" @expando-clicked="toggleAdvanced" :expanded="isAdvanced()">
      <Slider title="Threshold" :id=1 :slider-min-value=-59 :slider-max-value=0 text-suffix="dB"
              :slider-value=getThreshold() @value-changed="setValue" :store-path="getStorePath('threshold')"/>
      <ExpandoBox v-if="!showWaveForm" expand_right="fa-wave-square" @expando-clicked="toggleWaveForm" />
      <AudioMeter ref="audioMeter" v-if="showWaveForm" :active="showWaveForm" :fade_below="getAdjustedThreshold()" />

      <Slider v-show="isAdvanced()" title="Attenuation" :id=2 :slider-min-value=0 :slider-max-value=100 text-suffix="%"
              :slider-value=getAttenuation() @value-changed="setValue" :store-path="getStorePath('attenuation')"/>
      <Slider v-show="isAdvanced()" title="Attack" :id=3 :slider-min-value=10 :slider-max-value=2000 text-suffix="ms"
              :value-map="getGateValueMap()" :slider-value=getAttack() @value-changed="setValue"
              :store-path="getStorePath('attack')"/>
      <Slider v-show="isAdvanced()" title="Release" :id=4 :slider-min-value=10 :slider-max-value=2000 text-suffix="ms"
              :value-map="getGateValueMap()" :slider-value=getRelease() @value-changed="setValue"
              :store-path="getStorePath('release')"/>
  </ExpandoGroupContainer>
</template>

<script>
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";
import ExpandoBox from "@/components/design/ExpandoBox.vue";
import AudioMeter from "@/components/sections/mic/AudioMeter.vue";

export default {
  name: "MicGate",
  components: {AudioMeter, ExpandoBox, ExpandoGroupContainer, Slider },

  data() {
    return {
      updatesPaused: false,
      showWaveForm: false,
      timeout: undefined,
    }
  },

  methods: {
    force_stop_graph() {
      if (this.showWaveForm === true) {
        // Forcefully End the Graph for the Gate..
        this.showWaveForm = false;
        clearTimeout(this.timeout);
      }
    },

    getAmount() {
      return Math.round((this.getThreshold() + 59) / 59 * 100)
    },

    getThreshold() {
      return store.getActiveDevice().mic_status.noise_gate.threshold;
    },

    getAdjustedThreshold() {
      let value = store.getActiveDevice().mic_status.noise_gate.threshold;
      if (value + 13 >= 0) {
        return 0;
      }

      return store.getActiveDevice().mic_status.noise_gate.threshold + 13;
    },
    closeWaveForm() {
      this.showWaveForm = false;
    },

    getAttack() {
      return store.getActiveDevice().mic_status.noise_gate.attack;
    },

    getRelease() {
      return store.getActiveDevice().mic_status.noise_gate.release;
    },

    getAttenuation() {
      return store.getActiveDevice().mic_status.noise_gate.attenuation;
    },

    isAdvanced() {
      return store.getActiveDevice().settings.display.gate === "Advanced";
    },

    toggleAdvanced() {
      let mode = (store.getActiveDevice().settings.display.gate === "Advanced" ? "Simple" : "Advanced");
      websocket.send_command(store.getActiveSerial(), {"SetElementDisplayMode": ["NoiseGate", mode]})
    },

    toggleWaveForm() {
      this.showWaveForm = true;
      this.timeout = setTimeout(this.closeWaveForm, 15000);
    },

    setValue: function (id, value, last) {
      if (this.updatesPaused && !last) {
        return;
      }

      this.updatesPaused = true;
      switch (id) {
        case 0:
          this.commitValue("SetGateThreshold", this.calculateThreshold(value));
          break
        case 1:
          this.commitValue("SetGateThreshold", value);
          if (this.timeout !== undefined) {
            clearTimeout(this.timeout);
          }
          this.timeout = setTimeout(this.closeWaveForm, 15000)
          break
        case 2:
          this.commitValue("SetGateAttenuation", value);
          break
        case 3:
          this.commitValue("SetGateAttack", value);
          break
        case 4:
          this.commitValue("SetGateRelease", value);
          break
      }
    },

    commitValue: function (name, value) {
      let serial = store.getActiveSerial();

      let command = {
        [name]: value
      }
      websocket.send_command(serial, command).then(() => this.updatesPaused = false);

      switch (name) {
        case "SetGateThreshold":
          store.getActiveDevice().mic_status.noise_gate.threshold = value;
          break;
        case "SetGateAttenuation":
          store.getActiveDevice().mic_status.noise_gate.attenuation = value;
          break;
        case "SetGateAttack":
          store.getActiveDevice().mic_status.noise_gate.attack = value;
          break;
        case "SetGateRelease":
          store.getActiveDevice().mic_status.noise_gate.release = value;
          break;
      }
    },

    getGateValueMap: function () {
      return [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
        170, 180, 190, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800,
        850, 900, 950, 1000, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
    },

    calculateThreshold: function (value) {
      return Math.round(value / 100 * 59) - 59;
    },

    getStorePath: function (target) {
      return "/mixers/" + store.getActiveSerial() + "/mic_status/noise_gate/" + target;
    }
  }
}
</script>

<style scoped>
.rowContent {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
