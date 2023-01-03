<template>
  <!-- Build the Modal -->
  <ContentBox>
    <ButtonList title="Mic Type" role="radiogroup">
      <RadioItem ref="Dynamic" id="Dynamic" text="Dynamic" group="mic_type" @radio-selected="handleButtonPress" :selected="isMicTypeActive('Dynamic')" />
      <RadioItem ref="Condenser" id="Condenser" text="Condenser (+48V)" group="mic_type" @radio-selected="handleButtonPress" :selected="isMicTypeActive('Condenser')" />
      <RadioItem ref="Jack" id="Jack" text="3.5mm" group="mic_type" @radio-selected="handleButtonPress" :selected="isMicTypeActive('Jack')" />
    </ButtonList>
    <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 text-suffix="dB"
            :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import RadioItem from "@/components/button_list/RadioItem";
import Slider from "@/components/slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "SetupModel",
  components: {RadioItem, ContentBox, ButtonList, Slider},

  methods: {
    isMicTypeActive(id) {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return id === store.getActiveDevice().mic_status.mic_type
    },

    getGainValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      return store.getActiveDevice().mic_status.mic_gains[store.getActiveDevice().mic_status.mic_type];
    },

    setGain(id, value) {
      let command = {
        "SetMicrophoneGain": [
          store.getActiveDevice().mic_status.mic_type,
          value
        ]
      };
      websocket.send_command(store.getActiveSerial(), command);
      store.getActiveDevice().mic_status.mic_gains[store.getActiveDevice().mic_status.mic_type] = value;
    },

    handleButtonPress(id) {
      let command = {
        "SetMicrophoneType": id
      }

      websocket.send_command(store.getActiveSerial(), command);
    },

    getStorePath() {
      if (!store.hasActiveDevice()) {
        return "";
      }

      return "/mixers/" + store.getActiveSerial() + "/mic_status/mic_gains/" + store.getActiveDevice().mic_status.mic_type;
    },

    focus() {
        this.$refs[store.getActiveDevice().mic_status.mic_type].focus();
    }
  }
}
</script>

<style scoped>

</style>
