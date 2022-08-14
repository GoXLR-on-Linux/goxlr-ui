<template>
  <ContentBox title="Reverb">
    <ButtonList title="Style">
      <PushButton label="Library" buttonId="0" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Dark Bloom" buttonId="1" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Music Club" buttonId="2" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Real Plate" buttonId="3" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Chapel" buttonId="4" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Hockey Arena" buttonId="5" :is-active=false @button-pressed="buttonPressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()"/>
    <SliderInput title="Decay" :slider-min-value=0 :slider-max-value=100 :slider-value="getDecayValue()"
                 v-show="is_expanded"/>
    <SliderInput title="Early Level" :slider-min-value=-25 :slider-max-value=0 text-suffix="dB"
                 :slider-value="getEarlyLevelValue()" v-show="is_expanded"/>
    <SliderInput title="Tail Level" :slider-min-value=-25 :slider-max-value=0 text-suffix="dB"
                 :slider-value="getTailLevelValue()" v-show="is_expanded"/>
    <SliderInput title="PreDelay" :slider-min-value=0 :slider-max-value=100 text-suffix="ms"
                 :slider-value="getPreDelayValue()" v-show="is_expanded"/>
    <SliderInput title="Lo Colour" :slider-min-value=-50 :slider-max-value=50 :slider-value="getLowColourValue()"
                 v-show="is_expanded"/>
    <SliderInput title="Hi Colour" :slider-min-value=-50 :slider-max-value=50 :slider-value="getHighColourValue()"
                 v-show="is_expanded"/>
    <SliderInput title="Hi Factor" :slider-min-value=-25 :slider-max-value=25 :slider-value="getHighFactorValue()"
                 v-show="is_expanded"/>
    <SliderInput title="Diffuse" :slider-min-value=-50 :slider-max-value=50 :slider-value="getDiffuseValue()"
                 v-show="is_expanded"/>
    <SliderInput title="ModSpeed" :slider-min-value=-25 :slider-max-value=25 :slider-value="getModSpeedValue()"
                 v-show="is_expanded"/>
    <SliderInput title="ModDepth" :slider-min-value=-25 :slider-max-value=25 :slider-value="getModDepthValue()"
                 v-show="is_expanded"/>

  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>

import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ExpandoBox from "@/components/design/ExpandoBox";

export default {
  name: "ReverbEffect",
  components: {ExpandoBox, PushButton, ButtonList, SliderInput, ContentBox},

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
      console.log("Pressed");
    },

    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.amount;
    },
    getDecayValue() {
      // TODO: Decay needs specials :p

      if (!store.hasActiveDevice()) {
        return 0;
      }
      console.log(store.getActiveDevice().effects.reverb);
      return store.getActiveDevice().effects.reverb.decay;

    },
    getEarlyLevelValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.early_level;
    },
    getTailLevelValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.tail_level;
    },
    getPreDelayValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.pre_delay;
    },
    getLowColourValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.lo_colour;

    },
    getHighColourValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.hi_colour;
    },
    getHighFactorValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.hi_factor;
    },
    getDiffuseValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.diffuse;
    },
    getModSpeedValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.mod_speed;
    },
    getModDepthValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.reverb.mod_depth;
    }
  }
}
</script>

<style scoped>

</style>