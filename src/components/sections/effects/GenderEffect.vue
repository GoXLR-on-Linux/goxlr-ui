<template>
  <ContentBox title="Gender">
    <ButtonList title="Style">
      <PushButton label="Narrow" buttonId="Narrow" :is-active="isActiveStyle('Narrow')" @button-pressed="stylePressed"/>
      <PushButton label="Medium" buttonId="Medium" :is-active="isActiveStyle('Medium')" @button-pressed="stylePressed"/>
      <PushButton label="Wide" buttonId="Wide" :is-active="isActiveStyle('Wide')" @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value="getSliderValue(true)" :slider-max-value="getSliderValue(false)" :slider-value="getAmountValue()" @value-changed="setAmountValue" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";
export default {
  name: "GenderEffect",
  components: {PushButton, ButtonList, SliderInput, ContentBox},

  data() {
    return {
      amount: 0,
    }
  },

  methods: {
    isActiveStyle(buttonName) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.gender.style;
    },

    getSliderValue(isMin) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      let multiplier = (isMin)? -1 : 1;
      let style = store.getActiveDevice().effects.gender.style;
      switch (style) {
        case "Narrow": return 12 * multiplier;
        case "Medium": return 25 * multiplier;
        case "Wide": return 50 * multiplier;
      }
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetGenderStyle": button});
      console.log(button);
    },

    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.gender.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetGenderAmount": value});
    }

  },
}
</script>

<style scoped>

</style>