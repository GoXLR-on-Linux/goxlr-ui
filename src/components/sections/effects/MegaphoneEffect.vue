<template>
  <GroupContainer title="Megaphone" gap="3px">
    <ListSelection title="Style" group="effects_megaphone_style" :options="megaphone_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="%"
                 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" v-show="is_expanded" @value-changed="setAmountValue"/>
    <SliderInput title="Post Gain" :slider-min-value=-20 :slider-max-value=20 text-suffix="dB"
                 :slider-value="getPostGainValue()" :store-path="getStorePath('post_gain')" v-show="is_expanded" @value-changed="setPostGainValue"/>
  </GroupContainer>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ExpandoBox from "@/components/design/ExpandoBox";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";
import ListSelection from "@/components/button_list/ListSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  name: "MegaphoneEffect",
  components: {GroupContainer, ListSelection, ExpandoBox, SliderInput},
  data() {
    return {
      is_expanded: false,

      megaphone_style: [
        {id: "Megaphone", label: "Megaphone"},
        {id: "Radio", label: "Radio"},
        {id: "OnThePhone", label: "On The Phone"},
        {id: "Overdrive", label: "Overdrive"},
        {id: "BuzzCutt", label: "Buzz Cutt"},
        {id: "Tweed", label: "Tweed"},
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
      return store.getActiveDevice().effects.current.megaphone.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphoneStyle": button});
    },

    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.current.megaphone.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphoneAmount": value});
    },

    getPostGainValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
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
