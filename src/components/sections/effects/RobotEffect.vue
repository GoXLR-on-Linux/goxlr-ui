<template>
  <ContentBox title="Robot">
    <ButtonList title="Style">
      <PushButton label="Robot 1" buttonId="Robot1" :is-active="isActiveStyle('Robot1')" @button-pressed="stylePressed"/>
      <PushButton label="Robot 2" buttonId="Robot2" :is-active="isActiveStyle('Robot2')" @button-pressed="stylePressed"/>
      <PushButton label="Robot 3" buttonId="Robot3" :is-active="isActiveStyle('Robot3')" @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Low Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB"
                 :slider-value="getLowGainValue()" v-show="is_expanded"/>
    <SliderInput title="Low Freq" :slider-min-value=0 :slider-max-value=88 text-suffix="Hz"
                 :slider-value="getLowFreqValue()" v-show="is_expanded"/>
    <SliderInput title="Low Width" :slider-min-value=0 :slider-max-value=32 :slider-value="getLowWidthValue()" v-show="is_expanded"/>
    <SliderInput title="Mid Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB"
                 :slider-value="getMidGainValue()" v-show="is_expanded"/>
    <SliderInput title="Mid Freq" :slider-min-value=86 :slider-max-value=184 text-suffix="Hz"
                 :slider-value="getMidFreqValue()" v-show="is_expanded"/>
    <SliderInput title="Mid Width" :slider-min-value=0 :slider-max-value=32 :slider-value="getMidWidthValue()" v-show="is_expanded" />
    <SliderInput title="Hi Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB"
                 :slider-value="getHighGainValue()" v-show="is_expanded"/>
    <SliderInput title="Hi Freq" :slider-min-value=182 :slider-max-value=240 text-suffix="Hz"
                 :slider-value="getHighFreqValue()" v-show="is_expanded"/>
    <SliderInput title="Hi Width" :slider-min-value=0 :slider-max-value=32 :slider-value="getHighWidthValue()" v-show="is_expanded"/>
    <SliderInput title="Waveform" :slider-min-value=0 :slider-max-value=2 :slider-value="getWaveformValue()" v-show="is_expanded"/>
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

  }
}
</script>

<style scoped>

</style>