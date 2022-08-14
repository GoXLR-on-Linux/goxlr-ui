<template>
  <ContentBox title="Megaphone">
    <ButtonList title="Style">
      <PushButton label="Megaphone" buttonId="0" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Radio" buttonId="1" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="On the Phone" buttonId="2" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Overdrive" buttonId="3" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Buzz Cutt" buttonId="4" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Tweed" buttonId="5" :is-active=false @button-pressed="buttonPressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getAmountValue()" v-show="is_expanded" />
    <SliderInput title="Post Gain" :slider-min-value=0 :slider-max-value=100 text-suffix="dB" :slider-value="getPostGainValue()" v-show="is_expanded" />
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

    buttonPressed() {
      console.log("Button Pressed.");
    },

    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.megaphone.amount;
    },
    getPostGainValue() {
      if (!store.hasActiveDevice()) {
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