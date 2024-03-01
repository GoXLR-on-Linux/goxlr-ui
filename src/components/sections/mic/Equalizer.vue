<template>
  <ExpandoGroupContainer title="Equalizer" @expando-clicked="toggleAdvanced()" :expanded="isAdvanced()">
    <template #right>
      <div v-show="isAdvanced()" style="margin-bottom: 8px;">
        <button class="reset" @click="resetEqValues()">RESET</button>

        <label for="eq_fine">Enable Fine Tune</label><input type="checkbox" id="eq_fine" ref="fine_tune"
                                                            :checked="fineTuneEnabled()" @change="setFineTuneEnabled">
      </div>
    </template>
    <Slider v-show="!isAdvanced()" :id=0 title="Bass" :slider-min-value=-9 :slider-max-value=9 text-suffix=""
            :slider-value=getBassValue() :store-path="getAggregateStorePaths(0)"
            :background-colour="getBackgroundColour(1)"
            :input-background-colour="getInputBackgroundColour(1)"
            :range-background-colour="getRangeBackgroundColour(1)"
            @value-changed="aggregateChanged"/>
    <Slider v-show="!isAdvanced()" :id=1 title="Mid" :slider-min-value=-9 :slider-max-value=9 text-suffix=""
            :slider-value=getMidValue() :store-path="getAggregateStorePaths(1)"
            :background-colour="getBackgroundColour(5)"
            :input-background-colour="getInputBackgroundColour(5)"
            :range-background-colour="getRangeBackgroundColour(5)"
            @value-changed="aggregateChanged"/>
    <Slider v-show="!isAdvanced()" :id=2 title="Treble" :slider-min-value=-9 :slider-max-value=9 text-suffix=""
            :store-path="getAggregateStorePaths(2)" :slider-value=getTrebleValue()
            :background-colour="getBackgroundColour(9)"
            :input-background-colour="getInputBackgroundColour(9)"
            :range-background-colour="getRangeBackgroundColour(9)"
            @value-changed="aggregateChanged"
    />


    <Slider v-show="isAdvanced()" v-for="index in this.getElementCount()" :id=index :key=index :slider-min-value=-9
            :slider-max-value=9 :text-min-value=-9 :text-max-value=9 text-suffix="" :slider-value="getGainValue(index)"
            :title=getTitle(index) :store-path="getStorePath(index)" :background-colour="getBackgroundColour(index)"
            :input-background-colour="getInputBackgroundColour(index)"
            :range-background-colour="getRangeBackgroundColour(index)"
            @value-changed="valueChange"
            :range-height=getSliderHeight() :range-transform=getSliderTransform()
    >
      <template v-if="fineTuneEnabled()" #header>
        <FineTuneHeader :title="getTitle(index)" :minValue="getMinEqValue(index)" :maxValue="getMaxEqValue(index)"
                        :current-value="getCurrentEqValue(index)"
                        :range-background-colour="getRangeBackgroundColour(index)"
                        @value-changed="freqValueChanged" :store-path="getStoreFreqPath(index)" :id="index"
                        :step="getStep(index)" :title-suffix="getFrequencySuffix(index)" :background-colour="getBackgroundColour(index)"
        />
      </template>
    </Slider>

  </ExpandoGroupContainer>
</template>

<script>
import Slider from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {EqFreqs, EqMiniFreqs} from "@/util/mixerMapping";
import {websocket} from "@/util/sockets";
import {isDeviceMini, roundToStep} from "@/util/util";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";
import FineTuneHeader from "@/components/sections/mic/FineTuneHeader.vue";

export default {
  name: "MicEqualiser",
  components: {FineTuneHeader, ExpandoGroupContainer, Slider},

  data() {
    return {
      length: Number,
    }
  },

  methods: {
    getSliderHeight() {
      if (this.fineTuneEnabled()) {
        return 100;
      }
      return undefined;
    },

    getSliderTransform() {
      if (this.fineTuneEnabled()) {
        return -55
      }
      return undefined;
    },

    isAdvanced() {
      return store.getActiveDevice().settings.display.equaliser === "Advanced";
    },

    toggleAdvanced() {
      let mode = (store.getActiveDevice().settings.display.equaliser === "Advanced" ? "Simple" : "Advanced");
      websocket.send_command(store.getActiveSerial(), {"SetElementDisplayMode": ["Equaliser", mode]})
    },

    getElementCount() {
      if (isDeviceMini()) {
        return EqMiniFreqs.length;
      }
      return EqFreqs.length;
    },

    getBackgroundColour(index) {
      if (isDeviceMini()) {
        if (index < 3) {
          return "#252927";
        }

        if (index < 5) {
          return "#353937";
        }

        return "#3b413f";
      }

      if (index < 5) {
        return "#252927";
      }
      if (index < 8) {
        return "#353937";
      }

      return "#3b413f";
    },

    getInputBackgroundColour(index) {
      if (isDeviceMini()) {
        if (index < 3) {
          return "#353937";
        }

        if (index < 5) {
          return "#3b413f";
        }

        return "#535c59";
      }

      if (index < 5) {
        return "#353937";
      }
      if (index < 8) {
        return "#3b413f";
      }

      return "#535c59";
    },

    getRangeBackgroundColour(index) {
      if (isDeviceMini()) {
        if (index < 3) {
          return "#353937";
        }
        return "#252927";
      }

      if (index < 5) {
        return "#353937";
      }
      return "#252927";
    },

    getMinEqValue(index) {
      if (isDeviceMini()) {
        switch (index) {
          case 1:
            return 30;
          case 2:
            return 100;
          case 3:
            return 310;
          case 4:
            return 800;
          case 5:
            return 2600;
          case 6:
            return 5100;
        }
      } else {
        let min = 30;
        if (index !== 1) {
          min = Math.floor(store.getActiveDevice().mic_status.equaliser.frequency[EqFreqs[index - 2]]);
        }
        switch (index) {
          case 1:
            return Math.max(30, min);
          case 2:
            return Math.max(30, min);
          case 3:
            return Math.max(30, min);
          case 4:
            return Math.max(30, min);
          case 5:
            return Math.max(300, min);
          case 6:
            return Math.max(300, min);
          case 7:
            return Math.max(300, min);
          case 8:
            return Math.max(2000, min);
          case 9:
            return Math.max(2000, min);
          case 10:
            return Math.max(2000, min);
        }
      }
      return 0;
    },

    getMaxEqValue(index) {
      if (isDeviceMini()) {
        switch (index) {
          case 1:
            return 90;
          case 2:
            return 300;
          case 3:
            return 800;
          case 4:
            return 2500;
          case 5:
            return 5000;
          case 6:
            return 18000;
        }
      } else {
        let max = 18000;
        if (index !== EqFreqs.length) {
          max = Math.floor(store.getActiveDevice().mic_status.equaliser.frequency[EqFreqs[index]]);
        }
        switch (index) {
          case 1:
            return Math.min(300, max);
          case 2:
            return Math.min(300, max);
          case 3:
            return Math.min(300, max);
          case 4:
            return Math.min(300, max);
          case 5:
            return Math.min(2000, max);
          case 6:
            return Math.min(2000, max);
          case 7:
            return Math.min(2000, max);
          case 8:
            return Math.min(18000, max);
          case 9:
            return Math.min(18000, max);
          case 10:
            return max;
        }
      }
      return 0;
    },

    getStep(index) {
      if (index < 5) {
        return 0.5;
      }
      return 100;
    },

    freqValueChanged(id, value) {
      let commandName = (isDeviceMini()) ? "SetEqMiniFreq" : "SetEqFreq";
      id -= 1;

      let key = (isDeviceMini()) ? EqMiniFreqs[id] : EqFreqs[id];
      this.sendFreqCommand(commandName, key, value);
    },

    getCurrentEqValue(index) {
      if (isDeviceMini()) {
        return Math.floor(store.getActiveDevice().mic_status.equaliser_mini.frequency[EqMiniFreqs[index - 1]]);
      } else {
        let value = parseFloat(store.getActiveDevice().mic_status.equaliser.frequency[EqFreqs[index - 1]]);
        return roundToStep(value, this.getStep(index));
      }
    },

    fineTuneEnabled() {
      return store.getActiveDevice().settings.display.equaliser_fine === "Advanced";
    },

    setFineTuneEnabled(e) {
      let mode = (e.target.checked) ? "Advanced" : "Simple";
      let command = {
        "SetElementDisplayMode": ["EqFineTune", mode]
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    getTitle(id) {
      let value = this.getCurrentEqValue(id);

      if (isDeviceMini()) {
        return (id < 3) ? value + "Hz" : value + "Khz";
      } else {
        if (!this.fineTuneEnabled()) {
          // In the official app, when fine tune isn't enabled, the values are 'sanitised' a bit so that things
          // like 0.5KHz become 500Hz, and decimals are removed when not needed. We'll do the same.
          return (value < 1000) ? Math.round(value * 10) / 10 + "Hz" : Math.round(value) / 1000 + "Khz";
        }
        return (id < 5) ? value.toFixed(1) + "Hz" : (value / 1000).toFixed(1) + "KHz";
      }
    },

    getFrequencySuffix(index) {
      return (index < 5) ? "Hz" : "KHz";
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

      // We might be updating a slider from another slider, so we need to force store the change, as
      // we disable patching while the slider is active.
      if (isDeviceMini()) {
        store.getActiveDevice().mic_status.equaliser_mini.gain[key] = value;
      } else {
        store.getActiveDevice().mic_status.equaliser.gain[key] = value;
      }
    },

    sendFreqCommand(commandName, key, value) {
      let command = {[commandName]: [key, value]};
      websocket.send_command(store.getActiveSerial(), command);

      // We might be updating a slider from another slider, so we need to force store the change, as
      // we disable patching while the slider is active.
      if (isDeviceMini()) {
        store.getActiveDevice().mic_status.equaliser_mini.frequency[key] = value;
      } else {
        store.getActiveDevice().mic_status.equaliser.frequency[key] = value;
      }
    },

    getGainValue(id) {
      id -= 1;

      if (isDeviceMini()) {
        return parseInt(store.getActiveDevice().mic_status.equaliser_mini.gain[EqMiniFreqs[id]]);
      } else {
        // Depeding on the id, we need to round this off to the nearest 0.5..
        return parseInt(store.getActiveDevice().mic_status.equaliser.gain[EqFreqs[id]]);
      }
    },

    getBassValue() {
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

    getStoreFreqPath(id) {
      id -= 1;
      let path = isDeviceMini() ? "equaliser_mini" : "equaliser";
      let title = isDeviceMini() ? EqMiniFreqs[id] : EqFreqs[id];
      return "/mixers/" + store.getActiveSerial() + "/mic_status/" + path + "/frequency/" + title;
    },

    getStorePath(id) {
      id -= 1;
      let path = isDeviceMini() ? "equaliser_mini" : "equaliser";
      let title = isDeviceMini() ? EqMiniFreqs[id] : EqFreqs[id];
      return "/mixers/" + store.getActiveSerial() + "/mic_status/" + path + "/gain/" + title;
    },

    getAggregateStorePaths(id) {
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
    },

    resetEqValues() {
      // Lots of commands here, I could move this to the Util, but not sure yet!
      if (isDeviceMini()) {
        websocket.send_command(store.getActiveSerial(), {"SetEqMiniFreq": ["Equalizer90Hz", 90]});
        websocket.send_command(store.getActiveSerial(), {"SetEqMiniFreq": ["Equalizer250Hz", 250]});
        websocket.send_command(store.getActiveSerial(), {"SetEqMiniFreq": ["Equalizer500Hz", 500]});
        websocket.send_command(store.getActiveSerial(), {"SetEqMiniFreq": ["Equalizer1KHz", 1000]});
        websocket.send_command(store.getActiveSerial(), {"SetEqMiniFreq": ["Equalizer3KHz", 3000]});
        websocket.send_command(store.getActiveSerial(), {"SetEqMiniFreq": ["Equalizer8KHz", 8000]});

        // Next part is easy..
        for (let value of EqMiniFreqs) {
          websocket.send_command(store.getActiveSerial(), {"SetEqMiniGain": [value, 0]});
        }
      } else {
        // Full has more buttons :(
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer31Hz", 31.5]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer63Hz", 63]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer125Hz", 125]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer250Hz", 250]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer500Hz", 500]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer1KHz", 1000]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer2KHz", 2000]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer4KHz", 4000]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer8KHz", 8000]});
        websocket.send_command(store.getActiveSerial(), {"SetEqFreq": ["Equalizer16KHz", 16000]});

        for (let value of EqFreqs) {
          websocket.send_command(store.getActiveSerial(), {"SetEqGain": [value, 0]});
        }
      }


    }

  }
}
</script>

<style scoped>
label {
  color: #fff;
  font-size: 10px;
  font-family: sans-serif;
}

.reset {
  border: 0;
  margin: 0 30px 0 0;
  padding: 5px 24px;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  background-color: #3b413f;
}

.reset:hover {
  background-color: #535c59;
}
</style>
