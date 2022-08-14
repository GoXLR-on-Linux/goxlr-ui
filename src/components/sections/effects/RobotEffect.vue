<template>
  <ContentBox title="Robot">
    <SliderInput title="Low Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB" :slider-value="getLowGainValue()" />
    <SliderInput title="Low Freq" :slider-min-value=0 :slider-max-value=88 text-suffix="Hz" :slider-value="getLowFreqValue()" />
    <SliderInput title="Low Width" :slider-min-value=0 :slider-max-value=32 :slider-value="getLowWidthValue()" />
    <SliderInput title="Mid Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB" :slider-value="getMidGainValue()" />
    <SliderInput title="Mid Freq" :slider-min-value=86 :slider-max-value=184 text-suffix="Hz" :slider-value="getMidFreqValue()" />
    <SliderInput title="Mid Width" :slider-min-value=0 :slider-max-value=32 :slider-value="getMidWidthValue()" />
    <SliderInput title="Hi Gain" :slider-min-value=-12 :slider-max-value=12 text-suffix="dB" :slider-value="getHighGainValue()" />
    <SliderInput title="Hi Freq" :slider-min-value=182 :slider-max-value=240 text-suffix="Hz" :slider-value="getHighFreqValue()" />
    <SliderInput title="Hi Width" :slider-min-value=0 :slider-max-value=32 :slider-value="getHighWidthValue()" />
    <SliderInput title="Waveform" :slider-min-value=0 :slider-max-value=2 :slider-value="getWaveformValue()" />
    <SliderInput title="Pulse Width" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getPulseWidthValue()" />
    <SliderInput title="Threshold" :slider-min-value=-36 :slider-max-value=0 text-suffix="dB" :slider-value="getThresholdValue()" />
    <SliderInput title="Dry Mix" :slider-min-value=-36 :slider-max-value=0 text-suffix="dB" :slider-value="getDryMixValue()" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
export default {
  name: "RobotEffect",
  components: {SliderInput, ContentBox},

  methods: {
    // TODO: Freq and Width need some work, they represent differently in the UI, and are both curves..

    getLowGainValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      console.log(store.getActiveDevice().effects.robot);
      return store.getActiveDevice().effects.robot.low_gain;
    },
    getLowFreqValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.low_freq;
    },
    getLowWidthValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.low_width;
    },
    getMidGainValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.mid_gain;
    },
    getMidFreqValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.mid_freq;
    },
    getMidWidthValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.mid_width;
    },
    getHighGainValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.high_gain;
    },
    getHighFreqValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.high_freq;
    },
    getHighWidthValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.high_width;
    },
    getWaveformValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.waveform;
    },
    getPulseWidthValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.pulse_width;
    },
    getThresholdValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.threshold;
    },
    getDryMixValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.robot.dry_mix;
    },

  }
}
</script>

<style scoped>

</style>