<template>
  <!-- Build the Modal -->
  <CenteredContainer>
    <ContentContainer>
      <RadioSelection title="Mic Type" group="mic_type" :options="microphone_options" :selected="getActiveMicType()" @selection-changed="handleButtonPress" />

      <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 text-suffix="dB"
              :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />
    </ContentContainer>
  </CenteredContainer>
</template>

<script>
import Slider from "@/components/slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/button_list/RadioSelection.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "SetupModel",
  components: {CenteredContainer, ContentContainer, RadioSelection, Slider},
  data: function() {
    return {
      microphone_options: [
        {id: "Dynamic", label: "Dynamic"},
        {id: "Condenser", label: "Condenser (+48V)"},
        {id: "Jack", label: "3.5mm"}
      ]
    }
  },

  methods: {
    getActiveMicType() {
      return store.getActiveDevice().mic_status.mic_type
    },

    getGainValue() {
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
