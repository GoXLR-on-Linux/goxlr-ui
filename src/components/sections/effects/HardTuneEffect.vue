<template>
  <ContentBox title="Hard Tune">
    <ButtonList title="Style">
      <PushButton label="Natural" buttonId="0" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Medium" buttonId="1" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Hard" buttonId="2" :is-active=false @button-pressed="buttonPressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" v-show="is_expanded" />
    <SliderInput title="Rate" :slider-min-value=0 :slider-max-value=100 :slider-value="getRateValue()" v-show="is_expanded" />
    <SliderInput title="Window" :slider-min-value=0 :slider-max-value=600 :slider-value="getWindowValue()" v-show="is_expanded" />

    <ButtonList title="Hardtune Source">
      <PushButton label="All" buttonId="0" :is-active=false @button-pressed="sourcePressed"/>
      <PushButton label="Music" buttonId="1" :is-active=false @button-pressed="sourcePressed"/>
      <PushButton label="Line In" buttonId="2" :is-active=false @button-pressed="sourcePressed"/>
      <PushButton label="System" buttonId="3" :is-active=false @button-pressed="sourcePressed"/>
    </ButtonList>

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
  name: "HardTuneEffect",
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

    sourcePressed() {
      console.log("Source Pressed");
    },

    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.hard_tune.amount;
    },
    getRateValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.hard_tune.rate;
    },
    getWindowValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.hard_tune.window;
    },
  }
}
</script>

<style scoped>

</style>