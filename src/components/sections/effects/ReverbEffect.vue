<template>
  <ContentBox title="Reverb">
    <ButtonList title="Style">
      <PushButton label="Library" buttonId="Library" :is-active="isActiveStyle('Library')"
                  @button-pressed="stylePressed"/>
      <PushButton label="Dark Bloom" buttonId="DarkBloom" :is-active="isActiveStyle('DarkBloom')"
                  @button-pressed="stylePressed"/>
      <PushButton label="Music Club" buttonId="MusicClub" :is-active="isActiveStyle('MusicClub')"
                  @button-pressed="stylePressed"/>
      <PushButton label="Real Plate" buttonId="RealPlate" :is-active="isActiveStyle('RealPlate')"
                  @button-pressed="stylePressed"/>
      <PushButton label="Chapel" buttonId="Chapel" :is-active="isActiveStyle('Chapel')" @button-pressed="stylePressed"/>
      <PushButton label="Hockey Arena" buttonId="HockeyArena" :is-active="isActiveStyle('HockeyArena')"
                  @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()"
                 :store-path="getStorePath('amount')" @value-changed="setAmountValue"/>
    <SliderInput title="Decay" :value-map="decay_map" :slider-value="getDecayValue()" text-suffix="ms"
                 :store-path="getStorePath('decay')" v-show="is_expanded" @value-changed="setDecayValue"/>
    <SliderInput title="Early Level" :slider-min-value=-25 :slider-max-value=0 text-suffix="dB"
                 :slider-value="getEarlyLevelValue()" :store-path="getStorePath('early_level')" v-show="is_expanded"
                 @value-changed="setEarlyLevelValue"/>
    <SliderInput title="Tail Level" :slider-min-value=-25 :slider-max-value=0 text-suffix="dB"
                 :slider-value="getTailLevelValue()" :store-path="getStorePath('tail_level')" v-show="is_expanded"
                 @value-changed="setTailLevelValue"/>
    <SliderInput title="PreDelay" :slider-min-value=0 :slider-max-value=100 text-suffix="ms"
                 :slider-value="getPreDelayValue()" :store-path="getStorePath('pre_delay')" v-show="is_expanded"
                 @value-changed="setPreDelayValue"/>
    <SliderInput title="Lo Colour" :slider-min-value=-50 :slider-max-value=50 :slider-value="getLowColourValue()"
                 :store-path="getStorePath('lo_colour')" v-show="is_expanded" @value-changed="setLowColourValue"/>
    <SliderInput title="Hi Colour" :slider-min-value=-50 :slider-max-value=50 :slider-value="getHighColourValue()"
                 :store-path="getStorePath('hi_colour')" v-show="is_expanded" @value-changed="setHighColourValue"/>
    <SliderInput title="Hi Factor" :slider-min-value=-25 :slider-max-value=25 :slider-value="getHighFactorValue()"
                 :store-path="getStorePath('hi_factor')" v-show="is_expanded" @value-changed="setHighFactorValue"/>
    <SliderInput title="Diffuse" :slider-min-value=-50 :slider-max-value=50 :slider-value="getDiffuseValue()"
                 :store-path="getStorePath('diffuse')" v-show="is_expanded" @value-changed="setDiffuseValue"/>
    <SliderInput title="ModSpeed" :slider-min-value=-25 :slider-max-value=25 :slider-value="getModSpeedValue()"
                 :store-path="getStorePath('mod_speed')" v-show="is_expanded" @value-changed="setModSpeedValue"/>
    <SliderInput title="ModDepth" :slider-min-value=-25 :slider-max-value=25 :slider-value="getModDepthValue()"
                 :store-path="getStorePath('mod_depth')" v-show="is_expanded" @value-changed="setModDepthValue"/>

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
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";

export default {
  name: "ReverbEffect",
  components: {ExpandoBox, PushButton, ButtonList, SliderInput, ContentBox},

  data() {
    return {
      decay_map: [],
      is_expanded: false,
    }
  },

  methods: {
    toggleExpando() {
      this.is_expanded = !this.is_expanded;
    },

    isActiveStyle(buttonName) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.current.reverb.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbStyle": button})
    },


    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbAmount": value})
    },

    getDecayValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }

      let decay = store.getActiveDevice().effects.current.reverb.decay;

      // The follow code only really applies for values of less than a second..
      if (decay < 1000) {
        if (this.decay_map.indexOf(decay.toString()) === -1) {
          // Because under windows, the increments are '20ish' the value can bounce between even and odd, whereas
          // here, we hard maintain odd. We'll correct this by subtracting 10 from the value if it doesn't exist
          // in our map.
          decay -= 10;
        }
      }
      return this.decay_map.indexOf(decay.toString());
    },
    setDecayValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbDecay": parseInt(this.decay_map[value])});
    },

    getEarlyLevelValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.early_level;
    },
    setEarlyLevelValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbEarlyLevel": value})
    },

    getTailLevelValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.tail_level;
    },
    setTailLevelValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbTailLevel": value})
    },

    getPreDelayValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.pre_delay;
    },
    setPreDelayValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbPreDelay": value})
    },

    getLowColourValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.lo_colour;
    },
    setLowColourValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbLowColour": value})
    },


    getHighColourValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.hi_colour;
    },
    setHighColourValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbHighColour": value})
    },

    getHighFactorValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.hi_factor;
    },
    setHighFactorValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbHighFactor": value})
    },

    getDiffuseValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.diffuse;
    },
    setDiffuseValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbDiffuse": value})
    },

    getModSpeedValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.mod_speed;
    },
    setModSpeedValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbModSpeed": value})
    },

    getModDepthValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.reverb.mod_depth;
    },
    setModDepthValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbModDepth": value})
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/reverb/" + name;
    },
  },

  created() {
    let map = [];

    let current = 10;
    while (current < 1000) {
      map.push(current.toString());
      current += 20;
    }

    current = 1000;
    while (current <= 20000) {
      map.push(current.toString());
      current += 100;
    }

    this.decay_map = map;
  }
}
</script>

<style scoped>

</style>