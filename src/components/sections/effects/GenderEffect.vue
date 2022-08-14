<template>
  <ContentBox title="Gender">
    <ButtonList title="Style">
      <PushButton label="Narrow" buttonId="0" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Medium" buttonId="1" :is-active=false @button-pressed="buttonPressed"/>
      <PushButton label="Wide" buttonId="2" :is-active=false @button-pressed="buttonPressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=-50 :slider-max-value=50 :slider-value="getAmountValue()" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
export default {
  name: "GenderEffect",
  components: {PushButton, ButtonList, SliderInput, ContentBox},

  methods: {
    buttonPressed() {
      console.log("Button Pressed");
    },

    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.gender.amount;
    },
  }
}
</script>

<style scoped>

</style>