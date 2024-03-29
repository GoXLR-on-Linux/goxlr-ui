<template>
  <ExpandoGroupContainer :title="$t('message.effects.echo.title')" :expanded="is_expanded"
                         @expando-clicked="is_expanded = !is_expanded">
    <RadioSelection :title="$t('message.effects.echo.style')" group="effects_echo_style" :options="getEchoStyles()"
                    :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.echo.amount')" :slider-min-value=0 :slider-max-value=100
                 :slider-value="getAmountValue()" :store-path="getStorePath('amount')"
                 @value-changed="setAmountValue" :text-suffix="$t('message.suffixes.percentage')"/>

    <SliderInput :title="$t('message.effects.echo.feedback')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getFeedbackValue()"
                 :store-path="getStorePath('feedback')" v-show="is_expanded" @value-changed="setFeedbackValue"/>

    <SliderInput :title="$t('message.effects.echo.tempo')" :disabled="isTempoDisabled()"
                 :background-colour="getBackgroundColour(isTempoDisabled())"
                 :input-background-colour="getInputBackgroundColour(isTempoDisabled())"
                 :text-colour="getSliderColour(isTempoDisabled())" :range-colour="getSliderColour(isTempoDisabled())"
                 :label-colour="getLabelColour(isTempoDisabled())" :slider-min-value=45 :slider-max-value=300
                 :text-suffix="$t('message.suffixes.beatsPerMinute')" :slider-value="getTempoValue()"
                 :store-path="getStorePath('tempo')" v-show="is_expanded" @value-changed="setTempoValue"/>

    <SliderInput :title="$t('message.effects.echo.delayLeft')" :disabled="isDelayDisabled()"
                 :background-colour="getBackgroundColour(isDelayDisabled())"
                 :input-background-colour="getInputBackgroundColour(isDelayDisabled())"
                 :text-colour="getSliderColour(isDelayDisabled())" :range-colour="getSliderColour(isDelayDisabled())"
                 :label-colour="getLabelColour(isDelayDisabled())" :slider-min-value=0 :slider-max-value=2500
                 :text-suffix="$t('message.suffixes.milliseconds')" :slider-value="getDelayLValue()"
                 :store-path="getStorePath('delay_left')" v-show="is_expanded" @value-changed="setDelayLValue"/>

    <SliderInput :title="$t('message.effects.echo.delayRight')" :disabled="isDelayDisabled()"
                 :background-colour="getBackgroundColour(isDelayDisabled())"
                 :input-background-colour="getInputBackgroundColour(isDelayDisabled())"
                 :text-colour="getSliderColour(isDelayDisabled())" :range-colour="getSliderColour(isDelayDisabled())"
                 :label-colour="getLabelColour(isDelayDisabled())" :slider-min-value=0 :slider-max-value=2500
                 :text-suffix="$t('message.suffixes.milliseconds')" :slider-value="getDelayRValue()"
                 :store-path="getStorePath('delay_right')" v-show="is_expanded" @value-changed="setDelayRValue"/>

    <SliderInput :title="$t('message.effects.echo.feedbackLeft')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getFeedbackLValue()"
                 :store-path="getStorePath('feedback_left')" v-show="is_expanded" @value-changed="setFeedbackLValue"/>

    <SliderInput :title="$t('message.effects.echo.xfbLeftToRight')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getXFBLtoRValue()"
                 :store-path="getStorePath('feedback_xfb_l_to_r')" v-show="is_expanded"
                 @value-changed="setXFBLtoRValue"/>

    <SliderInput :title="$t('message.effects.echo.feedbackRight')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getFeedbackRValue()"
                 :store-path="getStorePath('feedback_right')" v-show="is_expanded" @value-changed="setFeedbackRValue"/>

    <SliderInput :title="$t('message.effects.echo.xfbRightToLeft')" :slider-min-value=0 :slider-max-value=100
                 :text-suffix="$t('message.suffixes.percentage')" :slider-value="getXFBRtoLValue()" v-show="is_expanded"
                 :store-path="getStorePath('feedback_xfb_r_to_l')" @value-changed="setXFBRtoLValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider.vue";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "EchoEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,
    }
  },

  methods: {
    getEchoStyles() {
      return [
        {id: "Quarter", label: this.$t('message.effects.echo.styles.quarter')},
        {id: "Eighth", label: this.$t('message.effects.echo.styles.eighth')},
        {id: "Triplet", label: this.$t('message.effects.echo.styles.triplet')},
        {id: "PingPong", label: this.$t('message.effects.echo.styles.pingPong')},
        {id: "ClassicSlap", label: this.$t('message.effects.echo.styles.classicSlap')},
        {id: "MultiTap", label: this.$t('message.effects.echo.styles.multiTap')}
      ];
    },

    isTempoDisabled() {
      return this.getActiveStyle() === "ClassicSlap";
    },

    isDelayDisabled() {
      return this.getActiveStyle() !== "ClassicSlap";
    },

    getBackgroundColour(disabled) {
      return (disabled) ? "#303533" : "#353937";
    },
    getInputBackgroundColour(disabled) {
      return (disabled) ? "#333937" : "#3b413f";
    },
    getSliderColour(disabled) {
      return (disabled) ? "#3b7679" : "#59b1b6";
    },
    getLabelColour(disabled) {
      return (disabled) ? "#838584" : "#fff";
    },


    getActiveStyle() {
      return store.getActiveDevice().effects.current.echo.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoStyle": button});
    },

    getAmountValue() {
      return store.getActiveDevice().effects.current.echo.amount;
    },
    setAmountValue(id, value) {
      store.getActiveDevice().effects.current.echo.amount = value;
      websocket.send_command(store.getActiveSerial(), {"SetEchoAmount": value});
    },

    getFeedbackValue() {
      return store.getActiveDevice().effects.current.echo.feedback;
    },
    setFeedbackValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoFeedback": value});
    },

    getTempoValue() {
      return store.getActiveDevice().effects.current.echo.tempo;
    },
    setTempoValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoTempo": value});
    },


    getDelayLValue() {
      return store.getActiveDevice().effects.current.echo.delay_left;
    },
    setDelayLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoDelayLeft": value});
    },

    getDelayRValue() {
      return store.getActiveDevice().effects.current.echo.delay_right;
    },
    setDelayRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoDelayRight": value});
    },

    getFeedbackLValue() {
      return store.getActiveDevice().effects.current.echo.feedback_left;
    },
    setFeedbackLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoFeedbackLeft": value});
    },

    getFeedbackRValue() {
      return store.getActiveDevice().effects.current.echo.feedback_right;
    },
    setFeedbackRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoFeedbackRight": value});
    },

    getXFBLtoRValue() {
      return store.getActiveDevice().effects.current.echo.feedback_xfb_l_to_r;
    },
    setXFBLtoRValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoFeedbackXFBLtoR": value});
    },

    getXFBRtoLValue() {
      return store.getActiveDevice().effects.current.echo.feedback_xfb_r_to_l;
    },
    setXFBRtoLValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetEchoFeedbackXFBRtoL": value});
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/echo/" + name;
    },
  }
}
</script>

<style scoped>

</style>
