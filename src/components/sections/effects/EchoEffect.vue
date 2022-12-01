<template>
  <ContentBox title="Echo">
    <ButtonList title="Style">
      <PushButton label="Quarter" buttonId="Quarter" :is-active="isActiveStyle('Quarter')" @button-pressed="stylePressed"/>
      <PushButton label="Eighth" buttonId="Eighth" :is-active="isActiveStyle('Eighth')" @button-pressed="stylePressed"/>
      <PushButton label="Triplet" buttonId="Triplet" :is-active="isActiveStyle('Triplet')" @button-pressed="stylePressed"/>
      <PushButton label="Ping Pong" buttonId="PingPong" :is-active="isActiveStyle('PingPong')" @button-pressed="stylePressed"/>
      <PushButton label="Classic Slap" buttonId="ClassicSlap" :is-active="isActiveStyle('ClassicSlap')" @button-pressed="stylePressed"/>
      <PushButton label="MultiTap" buttonId="MultiTap" :is-active="isActiveStyle('MultiTap')" @button-pressed="stylePressed"/>
    </ButtonList>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" @value-changed="setAmountValue" />
    <SliderInput title="Feedback" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackValue()" :store-path="getStorePath('feedback')" v-show="is_expanded" @value-changed="setFeedbackValue" />
    <SliderInput title="Tempo" :slider-min-value=45 :slider-max-value=300 text-suffix="BPM" :slider-value="getTempoValue()" :store-path="getStorePath('tempo')" v-show="is_expanded" @value-changed="setTempoValue"/>
    <SliderInput title="Delay L" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayLValue()" :store-path="getStorePath('delay_left')" v-show="is_expanded" @value-changed="setDelayLValue"/>
    <SliderInput title="Delay R" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayRValue()" :store-path="getStorePath('delay_right')" v-show="is_expanded" @value-changed="setDelayRValue"/>
    <SliderInput title="Feedback L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackLValue()" :store-path="getStorePath('feedback_left')" v-show="is_expanded" @value-changed="setFeedbackLValue"/>
    <SliderInput title="XFB L to R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBLtoRValue()" :store-path="getStorePath('feedback_xfb_l_to_r')" v-show="is_expanded" @value-changed="setXFBLtoRValue"/>
    <SliderInput title="Feedback R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackRValue()" :store-path="getStorePath('feedback_right')" v-show="is_expanded" @value-changed="setFeedbackRValue"/>
    <SliderInput title="XFB R to L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBRtoLValue()" v-show="is_expanded" :store-path="getStorePath('feedback_xfb_r_to_l')" @value-changed="setXFBRtoLValue"/>
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import {store} from "@/store";
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import ExpandoBox from "@/components/design/ExpandoBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";

export default {
  name: "EchoEffect",
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
      return buttonName === store.getActiveDevice().effects.current.echo.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoStyle": button });
    },

    getAmountValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoAmount": value });
    },

    getFeedbackValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.feedback;
    },
    setFeedbackValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedback": value });
    },

    getTempoValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.tempo;
    },
    setTempoValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoTempo": value });
    },


    getDelayLValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.delay_left;
    },
    setDelayLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoDelayLeft": value });
    },

    getDelayRValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.delay_right;
    },
    setDelayRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoDelayRight": value });
    },

    getFeedbackLValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.feedback_left;
    },
    setFeedbackLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackLeft": value });
    },

    getFeedbackRValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.feedback_right;
    },
    setFeedbackRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackRight": value });
    },

    getXFBLtoRValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.feedback_xfb_l_to_r;
    },
    setXFBLtoRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackXFBLtoR": value });
    },

    getXFBRtoLValue() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return 0;
      }
      return store.getActiveDevice().effects.current.echo.feedback_xfb_r_to_l;
    },
    setXFBRtoLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackXFBRtoL": value });
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/echo/" + name;
    },
  }
}
</script>

<style scoped>

</style>