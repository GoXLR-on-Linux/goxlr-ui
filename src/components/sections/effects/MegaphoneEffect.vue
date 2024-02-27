<template>
  <ExpandoGroupContainer title="Megaphone" @expando-clicked="is_expanded = !is_expanded" :expanded="is_expanded">
    <RadioSelection title="Style" group="effects_megaphone_style" :options="megaphone_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="%"
                 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" v-show="is_expanded" @value-changed="setAmountValue"/>
    <SliderInput title="Post Gain" :slider-min-value=-20 :slider-max-value=20 text-suffix="dB"
                 :slider-value="getPostGainValue()" :store-path="getStorePath('post_gain')" v-show="is_expanded" @value-changed="setPostGainValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import SliderInput from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "MegaphoneEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,

      megaphone_style: [
        {id: "Megaphone", label: "Megaphone"},
        {id: "Radio", label: "Radio"},
        {id: "OnThePhone", label: "On The Phone"},
        {id: "Overdrive", label: "Overdrive"},
        {id: "BuzzCutt", label: "Buzz Cutt"},
        {id: "Tweed", label: "Tweed"}
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.megaphone.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphoneStyle": button});
    },

    getAmountValue() {
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.current.megaphone.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphoneAmount": value});
    },

    getPostGainValue() {
      return store.getActiveDevice().effects.current.megaphone.post_gain;
    },
    setPostGainValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphonePostGain": value});
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/megaphone/" + name;
    },

  }
}
</script>

<style scoped>

</style>
