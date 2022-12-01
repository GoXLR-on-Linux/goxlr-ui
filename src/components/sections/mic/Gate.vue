<template>
  <ContentBox title="Gate">
    <div class="rowContent" v-show="!isVisible">
      <Slider title="Amount" :id=0 :slider-min-value=0 :slider-max-value=100 text-suffix="" :slider-value=amount @value-changed="setValue" :store-path="getStorePath('threshold')"/>
    </div>
    <div class="rowContent" v-show="isVisible">
      <Slider title="Threshold" :id=1 :slider-min-value=-59 :slider-max-value=0 text-suffix="dB" :slider-value=threshold @value-changed="setValue" :store-path="getStorePath('threshold')"/>
      <Slider title="Attenuation" :id=2 :slider-min-value=0 :slider-max-value=100 text-suffix="%"  :slider-value=attenuation @value-changed="setValue" :store-path="getStorePath('attenuation')"/>
      <Slider title="Attack" :id=3 :slider-min-value=10 :slider-max-value=2000 text-suffix="ms" :value-map="getGateValueMap()" :slider-value=attack @value-changed="setValue" :store-path="getStorePath('attack')"/>
      <Slider title="Release" :id=4 :slider-min-value=10 :slider-max-value=2000 text-suffix="ms" :value-map="getGateValueMap()" :slider-value=release @value-changed="setValue" :store-path="getStorePath('release')"/>
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
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
  data() {
    return {
      isVisible: false,
      amount: 15,
      threshold: 0,
      attenuation: 10,
      attack: 10,
      release: 10
    }
  },

  created() {
    this.waitFor(() => store.hasActiveDevice() === true).then(() => {
          this.threshold = store.getActiveDevice().mic_status.noise_gate.threshold
          this.attack = store.getActiveDevice().mic_status.noise_gate.attack
          this.release = store.getActiveDevice().mic_status.noise_gate.release
          this.attenuation = store.getActiveDevice().mic_status.noise_gate.attenuation
          this.updateAmount(this.threshold)
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
        else setTimeout(() => poll(resolve), 400);
      }
      return new Promise(poll);
    },

    setValue: function (id, value) {
      switch (id) {
        case 0: {
          this.updateThreshold(value)
          this.commitValue("SetGateThreshold", this.threshold);
        } break
        case 1: {
          this.commitValue("SetGateThreshold", value);
          this.updateAmount(value)
        } break
        case 2: this.commitValue("SetGateAttenuation", value); break
        case 3: this.commitValue("SetGateAttack", value); break
        case 4: this.commitValue("SetGateRelease", value); break
      }
    },

    commitValue: function (name, value){
      let serial = store.getActiveSerial();

      let command = {
        [name]: value
      }
      websocket.send_command(serial, command);
    },

    getGateValueMap: function (){
      return ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "110", "120", "130", "140", "150", "160",
        "170", "180", "190", "200", "250", "300", "350", "400", "450", "500", "550", "600", "650", "700", "750", "800",
        "850", "900", "950", "1000", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000"];
    },

    updateAmount: function (value){
      this.amount = Math.round((value + 59) / 59 * 100);
    },

    updateThreshold: function (value) {
      this.threshold = Math.round(value / 100 * 59) - 59;
    },

    getStorePath: function(target) {
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
