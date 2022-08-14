<template>
  <ContentBox title="Pitch">
    <ButtonList title="Style">
      <PushButton label="Narrow" buttonId="Narrow" :is-active="isActiveStyle('Narrow')" @button-pressed="stylePressed"/>
      <PushButton label="Wide" buttonId="Wide" :is-active="isActiveStyle('Wide')" @button-pressed="stylePressed"/>
    </ButtonList>


    <SliderInput title="Amount" :slider-min-value=-24 :slider-max-value=24 :slider-value="getAmountValue()" />
    <SliderInput title="Character" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getCharacterValue()" v-show="is_expanded" />
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
  name: "PitchEffect",
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
      if (!store.hasActiveDevice()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.pitch.style;
    },

    stylePressed(button) {
      console.log(button);
    },

    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.pitch.amount;
    },
    getCharacterValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.pitch.character;
    }
  }
}
</script>

<style scoped>

</style>