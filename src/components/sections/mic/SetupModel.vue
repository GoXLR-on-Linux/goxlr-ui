<template>
  <!-- Build the Modal -->
  <CenteredContainer>
    <ContentContainer>
      <ListSelection title="Mic Type" group="mic_type" :options="microphone_options" :selected="getActiveMicType()" @selection-changed="handleButtonPress" />

      <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 text-suffix="dB"
              :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />
    </ContentContainer>
  </CenteredContainer>
</template>

<script>
import Slider from "@/components/slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ListSelection from "@/components/button_list/ListSelection.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "SetupModel",
  components: {CenteredContainer, ContentContainer, ListSelection, Slider},
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
      if (!store.hasActiveDevice()) {
        return "";
      }

      return store.getActiveDevice().mic_status.mic_type
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
