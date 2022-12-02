<template>
  <!-- Build the Modal -->
  <ContentBox>
    <ButtonList title="Mic Type">
      <Button label="Dynamic" buttonId="0" :is-active=isMicTypeActive(0) @button-pressed="handleButtonPress"/>
      <Button label="Condenser (+48V)" buttonId="1" :is-active=isMicTypeActive(1) @button-pressed="handleButtonPress"/>
      <Button label="3.5mm" buttonId="2" :is-active=isMicTypeActive(2) @button-pressed="handleButtonPress"/>
    </ButtonList>
    <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 text-suffix="dB"
            :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import Button from "@/components/button_list/Button";
import Slider from "@/components/slider/Slider";
import {store} from "@/store";
import {MicrophoneTypes} from "@/util/mixerMapping";
import {websocket} from "@/util/sockets";

export default {
  name: "SetupModel",
  components: {ContentBox, ButtonList, Button, Slider},

  methods: {
    isMicTypeActive(id) {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return MicrophoneTypes[id] === store.getActiveDevice().mic_status.mic_type
    },

    getGainValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }

      return store.getActiveDevice().mic_status.mic_gains[MicrophoneTypes.indexOf(store.getActiveDevice().mic_status.mic_type)];
    },

    setGain(id, value) {
      let command = {
        "SetMicrophoneGain": [
          store.getActiveDevice().mic_status.mic_type,
          value
        ]
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    handleButtonPress(id) {
      let command = {
        "SetMicrophoneType": MicrophoneTypes[id]
      }

      websocket.send_command(store.getActiveSerial(), command);
    },

    getStorePath() {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return "/mixers/" + store.getActiveSerial() + "/mic_status/mic_gains/" + MicrophoneTypes.indexOf(store.getActiveDevice().mic_status.mic_type);
    }
  }
}
</script>

<style scoped>

</style>