<template>
  <ContentBox title="Echo">
    <ButtonList title="Style">
      <PushButton label="Quarter" buttonId="0" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Eighth" buttonId="1" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Triplet" buttonId="2" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Ping Pong" buttonId="3" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Classic Slap" buttonId="4" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="MultiTap" buttonId="5" :is-active=false @button-pressed="buttonPressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" />
    <SliderInput title="Feedback" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackValue()" v-show="is_expanded" />
    <SliderInput title="Tempo" :slider-min-value=45 :slider-max-value=300 text-suffix="BPM" :slider-value="getTempoValue()" v-show="is_expanded" />
    <SliderInput title="Delay L" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayLValue()" v-show="is_expanded" />
    <SliderInput title="Delay R" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayRValue()" v-show="is_expanded" />
    <SliderInput title="Feedback L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackLValue()" v-show="is_expanded" />
    <SliderInput title="XFB L to R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBLtoRValue()" v-show="is_expanded" />
    <SliderInput title="Feedback R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackRValue()" v-show="is_expanded" />
    <SliderInput title="XFB R to L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBRtoLValue()" v-show="is_expanded" />
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import {store} from "@/store";
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import ExpandoBox from "@/components/design/ExpandoBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";

export default {
  name: "EchoEffect",
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

    buttonPressed() {
      console.log("Button Pressed");
    },

    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
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