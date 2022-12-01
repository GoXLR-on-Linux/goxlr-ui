<template>
  <ContentBox title="Hard Tune">
    <ButtonList title="Style">
      <PushButton label="Natural" buttonId="Natural" :is-active="isActiveStyle('Natural')" @button-pressed="stylePressed"/>
      <PushButton label="Medium" buttonId="Medium" :is-active="isActiveStyle('Medium')" @button-pressed="stylePressed"/>
      <PushButton label="Hard" buttonId="Hard" :is-active="isActiveStyle('Hard')" @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" v-show="is_expanded" @value-changed="setAmountValue" />
    <SliderInput title="Rate" :slider-min-value=0 :slider-max-value=100 :slider-value="getRateValue()" :store-path="getStorePath('rate')"  v-show="is_expanded" @value-changed="setRateValue" />
    <SliderInput title="Window" :slider-min-value=0 :slider-max-value=600 :slider-value="getWindowValue()" :store-path="getStorePath('window')" v-show="is_expanded" @value-changed="setWindowValue" />

    <ButtonList title="Hardtune Source">
      <PushButton label="All" buttonId="All" :is-active="isActiveSource('All')" @button-pressed="sourcePressed"/>
      <PushButton label="Music" buttonId="Music" :is-active="isActiveSource('Music')" @button-pressed="sourcePressed"/>
      <PushButton label="Line In" buttonId="LineIn" :is-active="isActiveSource('LineIn')" @button-pressed="sourcePressed"/>
      <PushButton label="System" buttonId="System" :is-active="isActiveSource('System')" @button-pressed="sourcePressed"/>
    </ButtonList>

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
  name: "HardTuneEffect",
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
      return buttonName === store.getActiveDevice().effects.current.hard_tune.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneStyle": button });
    },


    isActiveSource(buttonName) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return buttonName === store.getActiveDevice().effects.current.hard_tune.source;
    },

    sourcePressed(button) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneSource": button });
    },

    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.hard_tune.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneAmount": value });
    },
    getRateValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.hard_tune.rate;
    },
    setRateValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetHardTuneRate": value });
    },
    getWindowValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
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