<template>
  <ContentBox title="Megaphone">
    <ButtonList title="Style">
      <PushButton label="Megaphone" buttonId="Megaphone" :is-active="isActiveStyle('Megaphone')" @button-pressed="stylePressed"/>
      <PushButton label="Radio" buttonId="Radio" :is-active="isActiveStyle('Radio')" @button-pressed="stylePressed"/>
      <PushButton label="On the Phone" buttonId="OnThePhone" :is-active="isActiveStyle('OnThePhone')" @button-pressed="stylePressed"/>
      <PushButton label="Overdrive" buttonId="Overdrive" :is-active="isActiveStyle('Overdrive')" @button-pressed="stylePressed"/>
      <PushButton label="Buzz Cutt" buttonId="BuzzCutt" :is-active="isActiveStyle('BuzzCut')" @button-pressed="stylePressed"/>
      <PushButton label="Tweed" buttonId="Tweed" :is-active="isActiveStyle('Tweed')" @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getAmountValue()" v-show="is_expanded" />
    <SliderInput title="Post Gain" :slider-min-value=-20 :slider-max-value=20 text-suffix="dB" :slider-value="getPostGainValue()" v-show="is_expanded" />
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
  name: "MegaphoneEffect",
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

    isActiveStyle(buttonName) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.megaphone.style;
    },

    stylePressed(button) {
      console.log(button);
    },

    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.megaphone.amount;
    },
    getPostGainValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.megaphone.post_gain;
    },

  }
}
</script>

<style scoped>

</style>