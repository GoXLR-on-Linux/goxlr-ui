<template>
  <!-- Build the Modal -->
  <CenteredContainer>
    <ContentContainer>
      <RadioSelection ref="selection" title="Mic Type" group="mic_type" :options="getMicrophoneOptions()" :selected="getActiveMicType()" @selection-changed="handleButtonPress" />

      <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 text-suffix="dB"
              :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />

      <AudioMeter :active="polling" />
    </ContentContainer>
  </CenteredContainer>
</template>

<script>
import Slider from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import {isDeviceMini} from "@/util/util";
import AudioMeter from "@/components/sections/mic/AudioMeter.vue";

export default {
  name: "SetupModel",
  components: {AudioMeter, CenteredContainer, ContentContainer, RadioSelection, Slider},
  data: function() {
    return {
      microphone_options: [
        {id: "Dynamic", label: "XLR Microphone"},
        {id: "Condenser", label: "XLR + Phantom (+48v)"},
        {id: "Jack", label: "3.5mm"}
      ],

      polling: false,
      current_value: -72,
    }
  },

  methods: {
    getMicrophoneOptions() {
      let voltage = "48";
      if (isDeviceMini()) {
        voltage = "24";
      }

      return [
        {id: "Dynamic", label: "XLR Microphone"},
        {id: "Condenser", label: "XLR + Phantom (+"+ voltage + "V)"},
        {id: "Jack", label: "3.5mm"}
      ];
    },

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
      let activeType = store.getActiveDevice().mic_status.mic_type;
      let button = this.$refs.selection.getButtonByRef(activeType);
      button.focus();
    },

    opened() {
      this.polling = true;
    },
    closed() {
      this.polling = false;
    }
  },
}
</script>

<style scoped>

</style>
