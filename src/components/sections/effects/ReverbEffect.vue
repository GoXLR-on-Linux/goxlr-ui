<template>
  <ExpandoGroupContainer :title="$t('message.effects.reverb.title')" @expando-clicked="is_expanded = !is_expanded"
                         :expanded="is_expanded">
    <RadioSelection :title="$t('message.effects.reverb.style')" group="effects_reverb_style" :options="reverb_style"
                    :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.reverb.amount')" :slider-min-value=0 :slider-max-value=100
                 :slider-value="getAmountValue()" text-suffix="%"
                 :store-path="getStorePath('amount')" @value-changed="setAmountValue"/>
    <SliderInput :title="$t('message.effects.reverb.decay')" :value-map="decay_map" :slider-value="getDecayValue()"
                 :text-suffix="$t('message.suffixes.milliseconds')" :store-path="getStorePath('decay')"
                 v-show="is_expanded" @value-changed="setDecayValue"/>
    <SliderInput :title="$t('message.effects.reverb.earlyLevel')" :slider-min-value=-25 :slider-max-value=0
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getEarlyLevelValue()"
                 :store-path="getStorePath('early_level')" v-show="is_expanded" @value-changed="setEarlyLevelValue"/>
    <SliderInput :title="$t('message.effects.reverb.tailLevel')" :slider-min-value=-25 :slider-max-value=0
                 :text-suffix="$t('message.suffixes.decibels')" :slider-value="getTailLevelValue()"
                 :store-path="getStorePath('tail_level')" v-show="is_expanded" @value-changed="setTailLevelValue"/>
    <SliderInput :title="$t('message.effects.reverb.preDelay')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.milliseconds')" :slider-value="getPreDelayValue()"
                 :store-path="getStorePath('pre_delay')" v-show="is_expanded" @value-changed="setPreDelayValue"/>
    <SliderInput :title="$t('message.effects.reverb.lowColour')" :slider-min-value=-50 :slider-max-value=50
                 :slider-value="getLowColourValue()" :store-path="getStorePath('lo_colour')" v-show="is_expanded"
                 @value-changed="setLowColourValue"/>
    <SliderInput :title="$t('message.effects.reverb.highColour')" :slider-min-value=-50 :slider-max-value=50
                 :slider-value="getHighColourValue()" :store-path="getStorePath('hi_colour')" v-show="is_expanded"
                 @value-changed="setHighColourValue"/>
    <SliderInput :title="$t('message.effects.reverb.highFactor')" :slider-min-value=-25 :slider-max-value=25
                 :slider-value="getHighFactorValue()" :store-path="getStorePath('hi_factor')" v-show="is_expanded"
                 @value-changed="setHighFactorValue"/>
    <SliderInput :title="$t('message.effects.reverb.diffuse')" :slider-min-value=-50 :slider-max-value=50
                 :slider-value="getDiffuseValue()" :store-path="getStorePath('diffuse')" v-show="is_expanded"
                 @value-changed="setDiffuseValue"/>
    <SliderInput :title="$t('message.effects.reverb.modSpeed')" :slider-min-value=-25 :slider-max-value=25
                 :slider-value="getModSpeedValue()" :store-path="getStorePath('mod_speed')" v-show="is_expanded"
                 @value-changed="setModSpeedValue"/>
    <SliderInput :title="$t('message.effects.reverb.modDepth')" :slider-min-value=-25 :slider-max-value=25
                 :slider-value="getModDepthValue()" :store-path="getStorePath('mod_depth')" v-show="is_expanded"
                 @value-changed="setModDepthValue"/>
  </ExpandoGroupContainer>
</template>

<script>

import SliderInput from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "ReverbEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},

  data() {
    return {
      decay_map: [],
      is_expanded: false,

      reverb_style: [
        {id: "Library", label: this.$t('message.effects.reverb.styles.library')},
        {id: "DarkBloom", label: this.$t('message.effects.reverb.styles.darkBloom')},
        {id: "MusicClub", label: this.$t('message.effects.reverb.styles.musicClub')},
        {id: "RealPlate", label: this.$t('message.effects.reverb.styles.realPlate')},
        {id: "Chapel", label: this.$t('message.effects.reverb.styles.chapel')},
        {id: "HockeyArena", label: this.$t('message.effects.reverb.styles.library')}
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.reverb.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbStyle": button})
    },

    getAmountValue() {
      return store.getActiveDevice().effects.current.reverb.amount;
    },
    setAmountValue(id, value) {
      store.getActiveDevice().effects.current.reverb.amount = value;
      websocket.send_command(store.getActiveSerial(), {"SetReverbAmount": value})
    },

    getDecayValue() {
      let decay = store.getActiveDevice().effects.current.reverb.decay;

      // The follow code only really applies for values of less than a second..
      if (decay < 1000) {
        if (this.decay_map.indexOf(decay) === -1) {
          // Because under windows, the increments are '20ish' the value can bounce between even and odd, whereas
          // here, we hard maintain odd. We'll correct this by subtracting 10 from the value if it doesn't exist
          // in our map.
          decay -= 10;
        }
      }
      return this.decay_map.indexOf(decay);
    },
    setDecayValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbDecay": parseInt(this.decay_map[value])});
    },

    getEarlyLevelValue() {
      return store.getActiveDevice().effects.current.reverb.early_level;
    },
    setEarlyLevelValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbEarlyLevel": value})
    },

    getTailLevelValue() {
      return store.getActiveDevice().effects.current.reverb.tail_level;
    },
    setTailLevelValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbTailLevel": value})
    },

    getPreDelayValue() {
      return store.getActiveDevice().effects.current.reverb.pre_delay;
    },
    setPreDelayValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbPreDelay": value})
    },

    getLowColourValue() {
      return store.getActiveDevice().effects.current.reverb.lo_colour;
    },
    setLowColourValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbLowColour": value})
    },


    getHighColourValue() {
      return store.getActiveDevice().effects.current.reverb.hi_colour;
    },
    setHighColourValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbHighColour": value})
    },

    getHighFactorValue() {
      return store.getActiveDevice().effects.current.reverb.hi_factor;
    },
    setHighFactorValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbHighFactor": value})
    },

    getDiffuseValue() {
      return store.getActiveDevice().effects.current.reverb.diffuse;
    },
    setDiffuseValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbDiffuse": value})
    },

    getModSpeedValue() {
      return store.getActiveDevice().effects.current.reverb.mod_speed;
    },
    setModSpeedValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetReverbModSpeed": value})
    },

    getModDepthValue() {
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
      map.push(current);
      current += 20;
    }

    current = 1000;
    while (current <= 20000) {
      map.push(current);
      current += 100;
    }

    this.decay_map = map;
  }
}
</script>

<style scoped>

</style>
