<template>
  <ExpandoGroupContainer :title="$t('message.effects.robot.title')" @expando-clicked="is_expanded = !is_expanded"
                         :expanded="is_expanded">
    <RadioSelection title="Style" group="effects_robot_style" :options="getRobotStyles()" :selected="getActiveStyle()"
                    @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.robot.lowGain')" :slider-min-value=-12 :slider-max-value=12
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getLowGainValue()"
                 :store-path="getStorePath('low_gain')" v-show="is_expanded" @value-changed="setLowGainValue"/>
    <SliderInput :title="$t('message.effects.robot.lowFrequency')" :value-map="getLowFreqValueMap()" text-suffix="Hz"
                 :slider-value="getLowFreqValue()" :store-path="getStorePath('low_freq')" v-show="is_expanded"
                 @value-changed="setLowFreqValue"/>
    <SliderInput :title="$t('message.effects.robot.lowWidth')" :slider-value="getLowWidthValue()"
                 :value-map="getWidthValueMap()" :store-path="getStorePath('low_width')" v-show="is_expanded"
                 @value-changed="setLowWidthValue"/>
    <SliderInput :title="$t('message.effects.robot.midGain')" :slider-min-value=-12 :slider-max-value=12
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getMidGainValue()"
                 :store-path="getStorePath('mid_gain')" v-show="is_expanded" @value-changed="setMidGainValue"/>
    <SliderInput :title="$t('message.effects.robot.midFrequency')" :value-map="getMidFreqValueMap()"
                 :text-suffix="$t('message.suffixes.hertz')" :slider-value="getMidFreqValue()"
                 :store-path="getStorePath('mid_freq')" v-show="is_expanded" @value-changed="setMidFreqValue"/>
    <SliderInput :title="$t('message.effects.robot.midWidth')" :slider-value="getMidWidthValue()"
                 :value-map="getWidthValueMap()" :store-path="getStorePath('mid_width')" v-show="is_expanded"
                 @value-changed="setMidWidthValue"/>
    <SliderInput :title="$t('message.effects.robot.highGain')" :slider-min-value=-12 :slider-max-value=12
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getHighGainValue()"
                 :store-path="getStorePath('hi_gain')" v-show="is_expanded" @value-changed="setHighGainValue"/>
    <SliderInput :title="$t('message.effects.robot.highFrequency')" :value-map="getHighFreqValueMap()"
                 :text-suffix="$t('message.suffixes.hertz')" :slider-value="getHighFreqValue()"
                 :store-path="getStorePath('hi_freq')" v-show="is_expanded" @value-changed="setHighFreqValue"/>
    <SliderInput :title="$t('message.effects.robot.highWidth')" :slider-value="getHighWidthValue()"
                 :value-map="getWidthValueMap()" :store-path="getStorePath('hi_width')" v-show="is_expanded"
                 @value-changed="setHighWidthValue"/>
    <SliderInput :title="$t('message.effects.robot.waveform')" :slider-min-value=0 :slider-max-value=2
                 :slider-value="getWaveformValue()" :store-path="getStorePath('waveform')" v-show="is_expanded"
                 @value-changed="setWaveformValue"/>
    <SliderInput :title="$t('message.effects.robot.pulseWidth')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getPulseWidthValue()"
                 :store-path="getStorePath('pulse_width')" v-show="is_expanded" @value-changed="setPulseWidthValue"/>
    <SliderInput :title="$t('message.effects.robot.threshold')" :slider-min-value=-36 :slider-max-value=0
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getThresholdValue()"
                 :store-path="getStorePath('threshold')" v-show="is_expanded" @value-changed="setThresholdValue"/>
    <SliderInput :title="$t('message.effects.robot.dryMix')" :slider-min-value=-36 :slider-max-value=0
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getDryMixValue()"
                 :store-path="getStorePath('dry_mix')" v-show="is_expanded" @value-changed="setDryMixValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import SliderInput from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "RobotEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},

  data() {
    return {
      is_expanded: false,
    }
  },

  methods: {
    getRobotStyles() {
      return [
        {id: "Robot1", label: this.$t('message.effects.robot.styles.robot1')},
        {id: "Robot2", label: this.$t('message.effects.robot.styles.robot2')},
        {id: "Robot3", label: this.$t('message.effects.robot.styles.robot3')},
      ];
    },

    getActiveStyle() {
      return store.getActiveDevice().effects.current.robot.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotStyle": button});
    },


    // TODO: Freq and Width need some work, they represent differently in the UI, and are both curves..
    getLowGainValue() {
      return store.getActiveDevice().effects.current.robot.low_gain;
    },
    setLowGainValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotGain": ["Low", value]});
    },

    getLowFreqValue() {
      // We need to correctly calculate Low Frequency, this is crazy, but it's how the GoXLR expects
      // values on the low end. This is likely due to rounding errors on the low curve...
      let freq = store.getActiveDevice().effects.current.robot.low_freq;
      let map = this.getLowFreqValueMap();
      if (freq > map.length) {
        return map.length - 1;
      }

      if (freq === 0) {
        return 0;
      } else if (freq === 1 || freq === 2) {
        return 3
      } else if (freq === 3) {
        return 7
      } else {
        return freq + 4;
      }
    },
    setLowFreqValue(id, value) {
      let sent_value;
      if (value === 0) {
        sent_value = 0;
      } else if (value === 1) {
        sent_value = 3;
      } else if (value === 2) {
        sent_value = 3;
      } else if (value === 3) {
        sent_value = 7;
      } else {
        sent_value = value + 4;
      }

      // With the above, we need to prevent overflowing the actual map..
      let map = this.getLowFreqValueMap();
      if (sent_value > map.length) {
        sent_value = map.length - 1;
      }

      websocket.send_command(store.getActiveSerial(), {"SetRobotFreq": ["Low", sent_value]});
    },

    getLowWidthValue() {
      return store.getActiveDevice().effects.current.robot.low_width;
    },
    setLowWidthValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotWidth": ["Low", value]});
    },

    getMidGainValue() {
      return store.getActiveDevice().effects.current.robot.mid_gain;
    },
    setMidGainValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotGain": ["Medium", value]});
    },

    getMidFreqValue() {
      return store.getActiveDevice().effects.current.robot.mid_freq - 86;
    },
    setMidFreqValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotFreq": ["Medium", value + 86]});
    },

    getMidWidthValue() {
      return store.getActiveDevice().effects.current.robot.mid_width;
    },
    setMidWidthValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotWidth": ["Medium", value]});
    },


    getHighGainValue() {
      return store.getActiveDevice().effects.current.robot.high_gain;
    },
    setHighGainValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotGain": ["High", value]});
    },

    getHighFreqValue() {
      return store.getActiveDevice().effects.current.robot.high_freq - 182;
    },
    setHighFreqValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotFreq": ["High", value + 182]});
    },

    getHighWidthValue() {
      return store.getActiveDevice().effects.current.robot.high_width;
    },
    setHighWidthValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotWidth": ["High", value]});
    },

    getWaveformValue() {
      return store.getActiveDevice().effects.current.robot.waveform;
    },
    setWaveformValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotWaveform": value});
    },

    getPulseWidthValue() {
      return store.getActiveDevice().effects.current.robot.pulse_width;
    },
    setPulseWidthValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotPulseWidth": value});
    },

    getThresholdValue() {
      return store.getActiveDevice().effects.current.robot.threshold;
    },
    setThresholdValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotThreshold": value});
    },

    getDryMixValue() {
      return store.getActiveDevice().effects.current.robot.dry_mix;
    },
    setDryMixValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetRobotDryMix": value});
    },

    // This is a calculated curve, but I've struggled to find a pattern that matches these values. 0.10 and 10.00
    // are assumed start and end points, there's nothing to corroborate them in the UI.
    getWidthValueMap() {
      return [0.10, 0.11, 0.12, 0.14, 0.18, 0.22, 0.25, 0.28, 0.31, 0.35, 0.40, 0.46, 0.54,
        0.63, 0.74, 0.87, 1.00, 1.18, 1.36, 1.56, 1.79, 2.04, 2.34, 2.68, 3.09, 3.58, 4.16,
        4.84, 5.64, 6.57, 7.61, 8.77, 10.00];
    },

    // Ok, these are *REALLY* obviously a curve from bottom to top, but I've not been able to work out the specifics,
    // so I'll define hard from the GoXLR Windows UI.
    getLowFreqValueMap() {
      return [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        37, 38, 39, 40, 41, 42, 44, 45, 46, 48, 49, 50, 52, 53, 55, 57, 58, 60,
        62, 63, 65, 67, 69, 71, 73, 76, 78, 80, 82, 85, 87, 90, 92, 95, 98, 101, 104,
        107, 110, 113, 116, 120, 123, 127, 131, 135, 138, 143, 147, 151, 155, 160, 165,
        170, 174, 180, 185, 190, 196, 202, 207, 214, 220, 226, 233, 240, 247, 254,
      ];
    },

    getMidFreqValueMap() {
      return [240, 247, 254, 261, 269, 277, 285, 293, 302, 311, 320, 329, 339, 349, 359,
        370, 381, 392, 403, 415, 427, 440, 453, 466, 479, 494, 508, 523, 538, 554, 570,
        587, 604, 622, 640, 659, 678, 698, 718, 739, 761, 783, 806, 830, 854, 879, 905,
        932, 959, 987, 1016, 1046, 1076, 1108, 1140, 1174, 1208, 1244, 1280, 1318, 1356,
        1396, 1437, 1479, 1522, 1567, 1613, 1660, 1709, 1759, 1810, 1863, 1918, 1974, 2032,
        2091, 2153, 2216, 2281, 2348, 2416, 2487, 2560, 2635, 2712, 2792, 2874, 2958, 3044,
        3134, 3225, 3320, 3417, 3517, 3620, 3726, 3836, 3948, 4064
      ];
    },


    getHighFreqValueMap() {
      return [3836, 3948, 4064, 4183, 4305, 4432, 4561, 4695, 4833, 4974, 5120, 5270, 5424,
        5583, 5747, 5915, 6089, 6267, 6451, 6640, 6834, 7035, 7241, 7453, 7617, 7896,
        8127, 8366, 8611, 8863, 9123, 9390, 9665, 9948, 10240, 10540, 10849, 11167, 11494,
        11831, 12177, 12534, 12902, 13280, 13996, 14069, 14482, 14906, 15343, 15792, 16255,
        16731, 17222, 17726, 18246, 18780, 19331, 19897, 20480];
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/robot/" + name;
    },

  }
}
</script>

<style scoped>

</style>
