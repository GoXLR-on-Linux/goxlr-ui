<template>
  <ContentBox title="Echo">
    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" />
    <SliderInput title="Feedback" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackValue()" />
    <SliderInput title="Tempo" :slider-min-value=45 :slider-max-value=300 text-suffix="BPM" :slider-value="getTempoValue()" />
    <SliderInput title="Delay L" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayLValue()" />
    <SliderInput title="Delay R" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayRValue()" />
    <SliderInput title="Feedback L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackLValue()" />
    <SliderInput title="XFB L to R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBLtoRValue()" />
    <SliderInput title="Feedback R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackRValue()" />
    <SliderInput title="XFB R to L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBRtoLValue()" />
  </ContentBox>
</template>

<script>
import {store} from "@/store";
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";

export default {
  name: "EchoEffect",
  components: {SliderInput, ContentBox},
  methods: {
    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      console.log(store.getActiveDevice().effects.echo);
      return store.getActiveDevice().effects.echo.amount;
    },
    getFeedbackValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.feedback;
    },
    getTempoValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.tempo;
    },
    getDelayLValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.delay_left;
    },
    getDelayRValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.delay_right;
    },
    getFeedbackLValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.feedback_left;
    },
    getFeedbackRValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.feedback_right;
    },
    getXFBLtoRValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.feedback_xfb_l_to_r;
    },
    getXFBRtoLValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.echo.feedback_xfb_r_to_l;
    }
  }

}
</script>

<style scoped>

</style>