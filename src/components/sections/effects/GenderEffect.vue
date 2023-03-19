<template>
  <GroupContainer title="Gender">
    <RadioSelection title="Style" group="effects_gender_style" :options="gender_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :slider-min-value="getSliderValue(true)" :slider-max-value="getSliderValue(false)" :slider-value="getAmountValue()" :store-path="getStorePath('amount')" @value-changed="setAmountValue" />
  </GroupContainer>
</template>

<script>
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider";
import {websocket} from "@/util/sockets";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";

export default {
  name: "GenderEffect",
  components: {RadioSelection, GroupContainer, SliderInput},

  data() {
    return {
      amount: 0,

      gender_style: [
        {id: "Narrow", label: "Narrow"},
        {id: "Medium", label: "Medium"},
        {id: "Wide", label: "Wide"},
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.gender.style;
    },

    getSliderValue(isMin) {
      let multiplier = (isMin)? -1 : 1;
      let style = store.getActiveDevice().effects.current.gender.style;
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
      return store.getActiveDevice().effects.current.gender.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetGenderAmount": value});
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/gender/" + name;
    },
  },
}
</script>

<style scoped>

</style>
