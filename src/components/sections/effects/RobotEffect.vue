<template>
  <ContentBox title="Robot">
    <ButtonList title="Style">
      <PushButton label="Robot 1" buttonId="Robot1" :is-active="isActiveStyle('Robot1')"
                  @button-pressed="stylePressed"/>
      <PushButton label="Robot 2" buttonId="Robot2" :is-active="isActiveStyle('Robot2')"
                  @button-pressed="stylePressed"/>
      <PushButton label="Robot 3" buttonId="Robot3" :is-active="isActiveStyle('Robot3')"
                  @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Low Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB"
                 :slider-value="getLowGainValue()" v-show="is_expanded"/>
    <SliderInput title="Low Freq" :value-map="getLowFreqValueMap()" text-suffix="Hz"
                 :slider-value="getLowFreqValue()" v-show="is_expanded"/>
    <SliderInput title="Low Width" :slider-value="getLowWidthValue()" :value-map="getWidthValueMap()"
                 v-show="is_expanded"/>
    <SliderInput title="Mid Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB"
                 :slider-value="getMidGainValue()" v-show="is_expanded"/>
    <SliderInput title="Mid Freq" :value-map="getMidFreqValueMap()" text-suffix="Hz"
                 :slider-value="getMidFreqValue()" v-show="is_expanded"/>
    <SliderInput title="Mid Width" :slider-value="getMidWidthValue()" :value-map="getWidthValueMap()"
                 v-show="is_expanded"/>
    <SliderInput title="Hi Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB"
                 :slider-value="getHighGainValue()" v-show="is_expanded"/>
    <SliderInput title="Hi Freq" :value-map="getHighFreqValueMap()" text-suffix="Hz"
                 :slider-value="getHighFreqValue()" v-show="is_expanded"/>
    <SliderInput title="Hi Width" :slider-value="getHighWidthValue()" :value-map="getWidthValueMap()"
                 v-show="is_expanded"/>
    <SliderInput title="Waveform" :slider-min-value=0 :slider-max-value=2 :slider-value="getWaveformValue()"
                 v-show="is_expanded"/>
    <SliderInput title="Pulse Width" :slider-min-value=0 :slider-max-value=100 text-suffix="%"
                 :slider-value="getPulseWidthValue()" v-show="is_expanded"/>
    <SliderInput title="Threshold" :slider-min-value=-36 :slider-max-value=0 text-suffix="dB"
                 :slider-value="getThresholdValue()" v-show="is_expanded"/>
    <SliderInput title="Dry Mix" :slider-min-value=-36 :slider-max-value=0 text-suffix="dB"
                 :slider-value="getDryMixValue()" v-show="is_expanded"/>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ExpandoBox from "@/components/design/ExpandoBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import {isDeviceMini} from "@/util/util";

export default {
  name: "RobotEffect",
  components: {PushButton, ButtonList, ExpandoBox, SliderInput, ContentBox},

  data() {
    return {
      is_expanded: false,
    }
  },

  methods: {
    toggleExpando() {
      this.is_expanded = !this.is_expanded;
    },

    stylePressed(button) {
      console.log(button);
    },

    isActiveStyle(buttonName) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.robot.style;
    },

    // TODO: Freq and Width need some work, they represent differently in the UI, and are both curves..
    getLowGainValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.low_gain;
    },
    getLowFreqValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      console.log(store.getActiveDevice().effects.robot.low_freq);
      return store.getActiveDevice().effects.robot.low_freq;
    },
    getLowWidthValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.low_width;
    },
    getMidGainValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.mid_gain;
    },
    getMidFreqValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.mid_freq;
    },
    getMidWidthValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.mid_width;
    },
    getHighGainValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.high_gain;
    },
    getHighFreqValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.high_freq;
    },
    getHighWidthValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.high_width;
    },
    getWaveformValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.waveform;
    },
    getPulseWidthValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.pulse_width;
    },
    getThresholdValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.threshold;
    },
    getDryMixValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.dry_mix;
    },

    // This is a calculated curve, but I've struggled to find a pattern that matches these values. 0.10 and 10.00
    // are assumed start and end points, there's nothing to corroborate them in the UI.
    getWidthValueMap() {
      return ["0.10", "0.11", "0.12", "0.14", "0.18", "0.22", "0.25", "0.28", "0.31", "0.35", "0.40", "0.46", "0.54",
        "0.63", "0.74", "0.87", "1.00", "1.18", "1.36", "1.56", "1.79", "2.04", "2.34", "2.68", "3.09", "3.58", "4.16",
        "4.84", "5.64", "6.57", "7.61", "8.77", "10.00"];
    },

    // Ok, these are *REALLY* obviously a curve from bottom to top, but I've not been able to work out the specifics,
    // so I'll define hard from the GoXLR Windows UI.

    // TODO: Double check this on windows, the Range is 0 -> 88, but the UI only exposes 84 values..
    getLowFreqValueMap() {
      return ["20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36",
        "37", "38", "39", "40", "41", "42", "44", "45", "46", "48", "49", "50", "52", "53", "55", "57", "58", "60",
        "62", "63", "65", "67", "69", "71", "73", "76", "78", "80", "82", "85", "87", "90", "92", "95", "98", "101", "104",
        "107", "110", "113", "116", "120", "123", "127", "131", "135", "138", "143", "147", "151", "155", "160", "165",
        "170", "174", "180", "185", "190", "196", "202", "207", "214", "220", "226", "233", "240", "247", "254",
      ];
    },

    // TODO: Same for This (95 Values)
    getMidFreqValueMap() {
      return ["240", "247", "254", "261", "269", "277", "285", "293", "302", "311", "320", "329", "339", "349", "359",
        "370", "381", "392", "403", "415", "427", "440", "453", "466", "479", "494", "508", "523", "538", "554", "570",
        "587", "604", "622", "640", "659", "678", "698", "718", "739", "761", "783", "806", "830", "854", "879", "905",
        "932", "959", "987", "1016", "1046", "1076", "1108", "1140", "1174", "1208", "1244", "1280", "1308", "1356",
        "1396", "1437", "1479", "1522", "1567", "1613", "1660", "1709", "1759", "1810", "1863", "1918", "1974", "2032",
        "2091", "2216", "2281", "2348", "2416", "2387", "2560", "2635", "2712", "2792", "2874", "3044", "3134", "3320",
        "3417", "3517", "3620", "3726", "3836", "4064"
      ];
    },


    // TODO: And apparently this (59 Values)
    getHighFreqValueMap() {
      return ["3836", "3948", "4064", "4183", "4305", "4432", "4561", "4695", "4833", "4974", "5120", "5270", "5424",
        "5583", "5747", "5915", "6089", "6267", "6451", "6640", "6834", "7035", "7241", "7453", "7617", "7896",
        "8127", "8366", "8611", "8863", "9123", "9390", "9665", "9948", "10240", "10540", "10849", "11167", "11494",
        "11831", "12177", "12534", "12902", "13280", "13996", "14069", "14482", "14906", "15343", "15792", "16255",
        "16731", "17222", "17726", "18246", "18780", "19331", "19897", "20480" ];
    },

  }
}
</script>

<style scoped>

</style>