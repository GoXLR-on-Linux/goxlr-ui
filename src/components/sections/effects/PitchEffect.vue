<template>
  <GroupContainer title="Pitch" gap="3px">
    <ListSelection title="Style" group="effects_pitch_style" :options="pitch_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :value-map="getValueMap()" :slider-value="getAmountValue()" :store-path="getStorePath('amount')" @value-changed="setAmountValue" />
    <SliderInput title="Character" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getCharacterValue()" :store-path="getStorePath('character')" v-show="is_expanded" @value-changed="setCharacterValue" />
  </GroupContainer>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ExpandoBox from "@/components/design/ExpandoBox";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ListSelection from "@/components/button_list/ListSelection.vue";

export default {
  name: "PitchEffect",
  components: {ListSelection, GroupContainer, ExpandoBox, SliderInput},
  data() {
    return {
      is_expanded: false,

      pitch_style: [
        {id: "Narrow", label: "Narrow"},
        {id: "Wide", label: "Wide"},
      ],
    }
  },

  methods: {
    toggleExpando() {
      this.is_expanded = !this.is_expanded;
    },

    getActiveStyle() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "";
      }
      return store.getActiveDevice().effects.current.pitch.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetPitchStyle": button});
    },

    getValueMap() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return ["0"];
      }

      let hardtune_enabled = store.getActiveDevice().effects.current.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.current.pitch.style;
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
      let hardtune_enabled = store.getActiveDevice().effects.current.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.current.pitch.style;
      let base_value = store.getActiveDevice().effects.current.pitch.amount;
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
      let hardtune_enabled = store.getActiveDevice().effects.current.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.current.pitch.style;
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
      return store.getActiveDevice().effects.current.pitch.character;
    },
    setCharacterValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetPitchCharacter": value});
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/pitch/" + name;
    },
  }
}
</script>

<style scoped>

</style>
