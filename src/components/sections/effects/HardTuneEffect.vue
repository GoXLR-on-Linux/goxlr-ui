<template>
  <ExpandoGroupContainer title="Hard Tune" @expando-clicked="is_expanded = !is_expanded" :expanded="is_expanded">
    <RadioSelection title="Style" group="effects_hardtune_style" :options="hard_tune_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" v-show="is_expanded" @value-changed="setAmountValue" />
    <SliderInput title="Rate" :slider-min-value=0 :slider-max-value=100 :slider-value="getRateValue()" :store-path="getStorePath('rate')"  v-show="is_expanded" @value-changed="setRateValue" />
    <SliderInput title="Window" :slider-min-value=0 :slider-max-value=600 :slider-value="getWindowValue()" :store-path="getStorePath('window')" v-show="is_expanded" @value-changed="setWindowValue" />

    <RadioSelection title="Sorce" group="effects_hardtune_source" :options="hard_tune_source" :selected="getActiveSource()" @selection-changed="sourcePressed"/>
  </ExpandoGroupContainer>
</template>

<script>
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "HardTuneEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,

      hard_tune_style: [
        {id: "Natural", label: "Natural"},
        {id: "Medium", label: "Medium"},
        {id: "Hard", label: "Hard"},
      ],

      hard_tune_source: [
        {id: "All", label: "All"},
        {id: "Music", label: "Music"},
        {id: "LineIn", label: "Line In"},
        {id: "System", label: "System"},
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.hard_tune.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneStyle": button });
    },

    getActiveSource() {
      return store.getActiveDevice().effects.current.hard_tune.source;
    },

    sourcePressed(button) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneSource": button });
    },

    getAmountValue() {
      return store.getActiveDevice().effects.current.hard_tune.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneAmount": value });
    },
    getRateValue() {
      return store.getActiveDevice().effects.current.hard_tune.rate;
    },
    setRateValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneRate": value });
    },
    getWindowValue() {
      return store.getActiveDevice().effects.current.hard_tune.window;
    },
    setWindowValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneWindow": value });
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/hard_tune/" + name;
    },
  }
}
</script>

<style scoped>

</style>
