<template>
  <ContentBox title="Gender">
    <ButtonList title="Style">
      <PushButton label="Narrow" buttonId="Narrow" :is-active="isActiveStyle('Narrow')" @button-pressed="stylePressed"/>
      <PushButton label="Medium" buttonId="Medium" :is-active="isActiveStyle('Medium')" @button-pressed="stylePressed"/>
      <PushButton label="Wide" buttonId="Wide" :is-active="isActiveStyle('Wide')" @button-pressed="stylePressed"/>
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
    isActiveStyle(buttonName) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.gender.style;
    },

    stylePressed(button) {
      console.log(button);
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