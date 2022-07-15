<template>
  <ContentBox title="Gate">
    <div class="rowContent" :class="{ hidden: isVisible }">
      <Slider title="Amount" :id=0 :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value=amount :value-map="getAmountValueMap()" @value-changed="setValue"/>
    </div>
    <div class="rowContent" :class="{ hidden: !isVisible }">
      <Slider title="Threshold" :id=1 :slider-min-value=-60 :slider-max-value=0 :text-min-value=-60 :text-max-value=0 text-suffix="dB" :slider-value=threshold @value-changed="setValue"/>
      <Slider title="Attenuation" :id=2 :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="%"  :slider-value=attenuation @value-changed="setValue"/>
      <Slider title="Attack" :id=3 :slider-min-value=10 :slider-max-value=2000 :text-min-value=10 :text-max-value=2000 text-suffix="ms" :value-map="getGateValueMap()" :slider-value=attack @value-changed="setValue"/>
      <Slider title="Release" :id=4 :slider-min-value=10 :slider-max-value=2000 :text-min-value=10 :text-max-value=2000 text-suffix="ms" :value-map="getGateValueMap()" :slider-value=release @value-changed="setValue"/>
    </div>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible" />
</template>

<script>
import ContentBox from "../../ContentBox";
import ExpandoBox from "../../util/ExpandoBox";
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
    // eslint-disable-next-line no-unused-vars
    this.waitFor(_ => store.hasActiveDevice() === true).then(
        // eslint-disable-next-line no-unused-vars
        _ => {
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
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
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
      let localAmount = 2 * Math.round(((value+60)*(5/3)) / 2);
      this.amount = this.getAmountValueMap().indexOf(localAmount.toString());
    },

    updateThreshold: function (value) {
      this.threshold = parseInt((((value * 2) / (5/3)) - 60).toFixed());
    },

    getAmountValueMap: function (){
      return ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18",
        "20", "22", "24", "26", "28", "30", "32", "34", "36", "38",
        "40", "42", "44", "46", "48", "50", "52", "54", "56", "58",
        "60", "62", "64", "66", "68", "70", "72", "74", "76", "78",
        "80", "82", "84", "86", "88", "90", "92", "94", "96", "98", "100"]
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
