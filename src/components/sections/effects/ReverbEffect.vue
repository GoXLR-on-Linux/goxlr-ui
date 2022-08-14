<template>
  <ContentBox title="Reverb">
    <ButtonList title="Style">
      <PushButton label="Library" buttonId="Library" :is-active="isActiveStyle('Library')" @button-pressed="stylePressed"/>
      <PushButton label="Dark Bloom" buttonId="DarkBloom" :is-active="isActiveStyle('DarkBloom')" @button-pressed="stylePressed"/>
      <PushButton label="Music Club" buttonId="MusicClub" :is-active="isActiveStyle('MusicClub')" @button-pressed="stylePressed"/>
      <PushButton label="Real Plate" buttonId="RealPlate" :is-active="isActiveStyle('RealPlate')" @button-pressed="stylePressed"/>
      <PushButton label="Chapel" buttonId="Chapel" :is-active="isActiveStyle('Chapel')" @button-pressed="stylePressed"/>
      <PushButton label="Hockey Arena" buttonId="HockeyArena" :is-active="isActiveStyle('HockeyArena')" @button-pressed="stylePressed"/>
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

    isActiveStyle(buttonName) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.reverb.style;
    },

    stylePressed(button) {
      console.log(button);
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