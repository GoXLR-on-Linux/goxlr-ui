<template>
  <ExpandoGroupContainer :title="$t('message.effects.pitch.title')" @expando-clicked="is_expanded = !is_expanded"
                         :expanded="is_expanded">
    <RadioSelection :title="$t('message.effects.pitch.style')" group="effects_pitch_style" :options="pitch_style"
                    :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.pitch.amount')" :value-map="getValueMap()" :slider-value="getAmountValue()"
                 :store-path="getStorePath('amount')" @value-changed="setAmountValue"/>
    <SliderInput :title="$t('message.effects.pitch.character')" :slider-min-value=0 :slider-max-value=100
                 text-suffix="%" :slider-value="getCharacterValue()" :store-path="getStorePath('character')"
                 v-show="is_expanded" @value-changed="setCharacterValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import SliderInput from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "PitchEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,

      pitch_style: [
        {id: "Narrow", label: this.$t('message.effects.pitch.narrow')},
        {id: "Wide", label: this.$t('message.effects.pitch.wide')},
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.pitch.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetPitchStyle": button});
    },

    getValueMap() {
      let hardtune_enabled = store.getActiveDevice().effects.current.hard_tune.is_enabled;
      let pitch_style = store.getActiveDevice().effects.current.pitch.style;
      if (hardtune_enabled) {
        if (pitch_style === "Narrow") {
          return [-12, 0, 12];
        } else {
          return [-24, -12, 0, 12, 24];
        }
      }

      let max_value = (pitch_style === "Narrow") ? 12 : 24;
      let map = [];
      for (let i = max_value * -1; i <= max_value; i++) {
        map.push(i);
      }
      return map;
    },

    getAmountValue() {
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

      store.getActiveDevice().effects.current.pitch.amount = Math.round(base_value);
      websocket.send_command(store.getActiveSerial(), {"SetPitchAmount": Math.round(base_value)});
    },

    getCharacterValue() {
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
