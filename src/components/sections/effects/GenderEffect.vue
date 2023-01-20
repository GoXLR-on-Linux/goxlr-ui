<template>
  <GroupContainer title="Gender" gap="3px">
    <ListSelection title="Style" group="effects_gender_style" :options="gender_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :slider-min-value="getSliderValue(true)" :slider-max-value="getSliderValue(false)" :slider-value="getAmountValue()" :store-path="getStorePath('amount')" @value-changed="setAmountValue" />
  </GroupContainer>
</template>

<script>
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ListSelection from "@/components/button_list/ListSelection.vue";

export default {
  name: "GenderEffect",
  components: {ListSelection, GroupContainer, SliderInput},

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
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "";
      }
      return store.getActiveDevice().effects.current.gender.style;
    },

    getSliderValue(isMin) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
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
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
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
