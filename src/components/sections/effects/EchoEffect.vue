<template>
  <ExpandoGroupContainer title="Echo" :expanded="is_expanded" @expando-clicked="is_expanded = !is_expanded">
    <RadioSelection title="Style" group="effects_echo_style" :options="echo_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" @value-changed="setAmountValue" text-suffix="%" />
    <SliderInput title="Feedback" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackValue()" :store-path="getStorePath('feedback')" v-show="is_expanded" @value-changed="setFeedbackValue" />
    <SliderInput title="Tempo" :slider-min-value=45 :slider-max-value=300 text-suffix="BPM" :slider-value="getTempoValue()" :store-path="getStorePath('tempo')" v-show="is_expanded" @value-changed="setTempoValue"/>
    <SliderInput title="Delay L" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayLValue()" :store-path="getStorePath('delay_left')" v-show="is_expanded" @value-changed="setDelayLValue"/>
    <SliderInput title="Delay R" :slider-min-value=0 :slider-max-value=2500 text-suffix="ms" :slider-value="getDelayRValue()" :store-path="getStorePath('delay_right')" v-show="is_expanded" @value-changed="setDelayRValue"/>
    <SliderInput title="Feedback L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackLValue()" :store-path="getStorePath('feedback_left')" v-show="is_expanded" @value-changed="setFeedbackLValue"/>
    <SliderInput title="XFB L to R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBLtoRValue()" :store-path="getStorePath('feedback_xfb_l_to_r')" v-show="is_expanded" @value-changed="setXFBLtoRValue"/>
    <SliderInput title="Feedback R" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getFeedbackRValue()" :store-path="getStorePath('feedback_right')" v-show="is_expanded" @value-changed="setFeedbackRValue"/>
    <SliderInput title="XFB R to L" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getXFBRtoLValue()" v-show="is_expanded" :store-path="getStorePath('feedback_xfb_r_to_l')" @value-changed="setXFBRtoLValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "EchoEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,

      echo_style: [
        {id: "Quarter", label: "Quarter"},
        {id: "Eighth", label: "Eighth"},
        {id: "Triplet", label: "Triplet"},
        {id: "PingPong", label: "Ping Pong"},
        {id: "ClassicSlap", label: "Classic Slap"},
        {id: "MultiTap", label: "MultiTap"}
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.echo.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoStyle": button });
    },

    getAmountValue() {
      return store.getActiveDevice().effects.current.echo.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoAmount": value });
    },

    getFeedbackValue() {
      return store.getActiveDevice().effects.current.echo.feedback;
    },
    setFeedbackValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedback": value });
    },

    getTempoValue() {
      return store.getActiveDevice().effects.current.echo.tempo;
    },
    setTempoValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoTempo": value });
    },


    getDelayLValue() {
      return store.getActiveDevice().effects.current.echo.delay_left;
    },
    setDelayLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoDelayLeft": value });
    },

    getDelayRValue() {
      return store.getActiveDevice().effects.current.echo.delay_right;
    },
    setDelayRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoDelayRight": value });
    },

    getFeedbackLValue() {
      return store.getActiveDevice().effects.current.echo.feedback_left;
    },
    setFeedbackLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackLeft": value });
    },

    getFeedbackRValue() {
      return store.getActiveDevice().effects.current.echo.feedback_right;
    },
    setFeedbackRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackRight": value });
    },

    getXFBLtoRValue() {
      return store.getActiveDevice().effects.current.echo.feedback_xfb_l_to_r;
    },
    setXFBLtoRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetEchoFeedbackXFBLtoR": value });
    },

    getXFBRtoLValue() {
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
