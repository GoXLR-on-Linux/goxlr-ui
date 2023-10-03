<template>
  <!-- Build the Modal -->
  <CenteredContainer>
    <ContentContainer>
      <RadioSelection ref="selection" title="Mic Type" group="mic_type" :options="microphone_options" :selected="getActiveMicType()" @selection-changed="handleButtonPress" />

      <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 text-suffix="dB"
              :slider-value=getGainValue() :store-path="getStorePath()" @value-changed="setGain" />

      <vu-meter :val="current_value" :show-peaks="true" style="height: 220px" />
    </ContentContainer>
  </CenteredContainer>
</template>

<script>
import Slider from "@/components/slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import VuMeter from "@/components/sections/mic/vu-meter.vue";
import {isDeviceMini} from "@/util/util";

export default {
  name: "SetupModel",
  components: {VuMeter, CenteredContainer, ContentContainer, RadioSelection, Slider},
  data: function() {
    return {
      microphone_options: [
        {id: "Dynamic", label: "Dynamic"},
        {id: "Condenser", label: "Condenser (+48V)"},
        {id: "Jack", label: "3.5mm"}
      ],

      polling: false,
      current_value: -72,
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
      let activeType = store.getActiveDevice().mic_status.mic_type;
      let button = this.$refs.selection.getButtonByRef(activeType);
      button.focus();
    },

    poll() {
      websocket.get_mic_level(store.getActiveSerial()).then((data) => {
        if (this.polling) {
          this.current_value = data['MicLevel'];

          // Realistically a mini should be able to handle 10ms, but due to it being a generally slower
          // device, we bump it to 20 just to try and keep things happier.
          setTimeout(this.poll, isDeviceMini() ? 20 : 10);
        }
      });
    },

    opened() {
      this.polling = true;
      this.poll();
      console.log("Opened..");
    },
    closed() {
      this.polling = false;
      console.log("Closed..");
    }
  },
}
</script>

<style scoped>

</style>
