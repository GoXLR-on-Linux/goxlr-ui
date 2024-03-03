<template>
  <GroupContainer :title="$t('message.effects.gender.title')">
    <RadioSelection :title="$t('message.effects.gender.style')" group="effects_gender_style"
                    :options="getGenderStyles()" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.gender.amount')" :slider-min-value="getSliderValue(true)"
                 :slider-max-value="getSliderValue(false)" :slider-value="getAmountValue()"
                 :store-path="getStorePath('amount')" @value-changed="setAmountValue"/>
  </GroupContainer>
</template>

<script>
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider.vue";
import {websocket} from "@/util/sockets";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";

export default {
  name: "GenderEffect",
  components: {RadioSelection, GroupContainer, SliderInput},

  data() {
    return {
      amount: 0,
    }
  },

  methods: {
    getGenderStyles() {
      return [
        {id: "Narrow", label: this.$t('message.effects.gender.styles.narrow')},
        {id: "Medium", label: this.$t('message.effects.gender.styles.medium')},
        {id: "Wide", label: this.$t('message.effects.gender.styles.wide')},
      ];
    },

    getActiveStyle() {
      return store.getActiveDevice().effects.current.gender.style;
    },

    getSliderValue(isMin) {
      let multiplier = (isMin) ? -1 : 1;
      let style = store.getActiveDevice().effects.current.gender.style;
      switch (style) {
        case "Narrow":
          return 12 * multiplier;
        case "Medium":
          return 25 * multiplier;
        case "Wide":
          return 50 * multiplier;
      }
      return 0;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetGenderStyle": button});
    },

    getAmountValue() {
      return store.getActiveDevice().effects.current.gender.amount;
    },
    setAmountValue(id, value) {
      store.getActiveDevice().effects.current.gender.amount = value;
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
