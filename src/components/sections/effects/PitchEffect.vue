<template>
  <ContentBox title="Pitch">
    <ButtonList title="Style">
      <PushButton label="Narrow" buttonId="Narrow" :is-active="isActiveStyle('Narrow')" @button-pressed="stylePressed"/>
      <PushButton label="Wide" buttonId="Wide" :is-active="isActiveStyle('Wide')" @button-pressed="stylePressed"/>
    </ButtonList>


    <SliderInput title="Amount" :value-map="getValueMap()" :slider-value="getAmountValue()" @value-changed="setAmountValue" />
    <SliderInput title="Character" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getCharacterValue()" v-show="is_expanded" @value-changed="setCharacterValue" />
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
import {websocket} from "@/util/sockets";
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
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.pitch.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetPitchStyle": button});
    },

    getValueMap() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return ["0"];
      }

      let hardtune_enabled = store.getActiveDevice().effects.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.pitch.style;
      if (hardtune_enabled) {
        if (pitch_style === "Narrow") {
          return ["-12", "0", "12"];
        } else {
          return ["-24", "-12", "0", "12", "24"];
        }
      }

      let max_value = (pitch_style === "Narrow") ? 12 : 24;
      let map = [];
      for (let i = max_value * -1; i <= max_value; i++) {
        map.push(i.toString());
      }
      return map;
    },

    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      let hardtune_enabled = store.getActiveDevice().effects.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.pitch.style;
      let base_value = store.getActiveDevice().effects.pitch.amount;
      if (hardtune_enabled) {
         if (pitch_style === "Narrow") {
           return base_value + 1;
         } else {
           return base_value + 2;
         }
      }
      if (pitch_style === "Narrow") {
        return (base_value / 2) + 12;
      } else {
        return base_value + 24;
      }
    },

    setAmountValue(id, value) {
      let hardtune_enabled = store.getActiveDevice().effects.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.pitch.style;
      let base_value = value;

      if (hardtune_enabled) {
        if (pitch_style === "Narrow") {
          base_value -= 1;
        } else {
          base_value -= 2;
        }
      } else {
        if (pitch_style === "Narrow") {
          base_value = (base_value * 2) - 24;
        } else {
          base_value -= 24;
        }
      }
      websocket.send_command(store.getActiveSerial(), {"SetPitchAmount": Math.round(base_value)});
    },

    getCharacterValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.pitch.character;
    },
    setCharacterValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetPitchCharacter": value});
    }
  }
}
</script>

<style scoped>

</style>