<template>
  <ContentBox title="Gate">
    <div class="rowContent" v-show="!isAdvanced()">
      <Slider title="Amount" :id=0 :slider-min-value=0 :slider-max-value=100 text-suffix="" :slider-value=getAmount()
              @value-changed="setValue" :store-path="getStorePath('threshold')"/>
    </div>
    <div class="rowContent" v-show="isAdvanced()">
      <Slider title="Threshold" :id=1 :slider-min-value=-59 :slider-max-value=0 text-suffix="dB"
              :slider-value=getThreshold() @value-changed="setValue" :store-path="getStorePath('threshold')"/>
      <Slider title="Attenuation" :id=2 :slider-min-value=0 :slider-max-value=100 text-suffix="%"
              :slider-value=getAttenuation() @value-changed="setValue" :store-path="getStorePath('attenuation')"/>
      <Slider title="Attack" :id=3 :slider-min-value=10 :slider-max-value=2000 text-suffix="ms"
              :value-map="getGateValueMap()" :slider-value=getAttack() @value-changed="setValue"
              :store-path="getStorePath('attack')"/>
      <Slider title="Release" :id=4 :slider-min-value=10 :slider-max-value=2000 text-suffix="ms"
              :value-map="getGateValueMap()" :slider-value=getRelease() @value-changed="setValue"
              :store-path="getStorePath('release')"/>
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleAdvanced" :expanded="isAdvanced()"/>
</template>

<script>
import ContentBox from "../../ContentBox";
import ExpandoBox from "../../design/ExpandoBox";
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "MicGate",
  components: {Slider, ExpandoBox, ContentBox},

  methods: {
    getAmount() {
      return Math.round((this.getThreshold() + 59) / 59 * 100)
    },

    getThreshold() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().mic_status.noise_gate.threshold;
    },

    getAttack() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().mic_status.noise_gate.attack;
    },

    getRelease() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().mic_status.noise_gate.release;
    },

    getAttenuation() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      return store.getActiveDevice().mic_status.noise_gate.attenuation;
    },

    isAdvanced() {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return store.getActiveDevice().settings.display.gate === "Advanced";
    },

    toggleAdvanced() {
      let mode = (store.getActiveDevice().settings.display.gate === "Advanced" ? "Simple" : "Advanced");
      websocket.send_command(store.getActiveSerial(), {"SetElementDisplayMode": ["NoiseGate", mode]})
    },

    setValue: function (id, value) {
      switch (id) {
        case 0:
          this.commitValue("SetGateThreshold", this.calculateThreshold(value));
          break
        case 1:
          this.commitValue("SetGateThreshold", value);
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
      websocket.send_command(serial, command);

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
      return ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160",
        "170", "180", "190", "200", "250", "300", "350", "400", "450", "500", "550", "600", "650", "700", "750", "800",
        "850", "900", "950", "1000", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000"];
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
