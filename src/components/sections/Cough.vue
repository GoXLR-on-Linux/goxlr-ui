<template>
    <GroupContainer :title="$t('message.configuration.cough.title')">
      <RadioSelection :title="$t('message.configuration.cough.behaviourTitle')" :options="getButtonBehaviours()"
                      group="cough_button_behaviour" @selection-changed="behaviorPressed" :selected="getCough()" />
      <RadioSelection :title="$t('message.configuration.muteBehaviourTitle')" :options="getMuteBehaviours()"
                      group="cough_mute_behaviour" @selection-changed="setActiveMuteFunction"
                      :selected="getActiveMute()" />
    </GroupContainer>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import { driverMix2, driverPreVOD, driverVOD, firmwareSupportsMix2, isDeviceMini, isStreamNoMusic, isWindowsDriver } from "@/util/util";

export default {
  name: "CoughButtonSettings",
  components: {GroupContainer, RadioSelection},

  data() {
    return {
    }
  },

  methods: {
    getButtonBehaviours() {
      return [
        {id: "hold", label: this.$t('message.configuration.cough.behaviour.hold') },
        {id: "toggle", label: this.$t('message.configuration.cough.behaviour.toggle') }
      ];
    },

    getMuteBehaviours() {
      let behaviours = [];
      behaviours.push({ id: "All", label: this.$t('message.configuration.mute_behaviour.all') });
      behaviours.push({ id: "ToStream", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.getNameForChannel("BroadcastMix") })});

      if (firmwareSupportsMix2()) {
        let channelName = "Stream Mixes 1 + 2";

        if (!isWindowsDriver() || !driverPreVOD()) {
          if (driverVOD()) channelName = "Stream Mix + VOD";

          behaviours.push({ id: "ToStream2", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.getNameForChannel("StreamMix2") })});
          behaviours.push({ id: "ToStreams", label: this.$t('message.configuration.mute_behaviour.base', { channel: channelName })});
        }
      }

      behaviours.push({ id: "ToVoiceChat", label: this.$t('message.configuration.mute_behaviour.base', { channel: "Chat Mic" })});
      behaviours.push({ id: "ToPhones", label: this.$t('message.configuration.mute_behaviour.base', { channel: "Headphones" })});
      behaviours.push({ id: "ToLineOut", label: this.$t('message.configuration.mute_behaviour.base', { channel: "Line Out" })});
      
      return behaviours;
    },

    getCough() {
      return (store.getActiveDevice().cough_button.is_toggle) ? "toggle" : "hold";
    },

    getActiveMute() {
      return store.getActiveDevice().cough_button.mute_type;
    },

    setActiveMuteFunction: function (id) {
      let command = {
        "SetCoughMuteFunction": id
      }
      websocket.send_command(store.getActiveSerial(), command);
    },

    behaviorPressed: function (id) {
      let coughHold = (id === "hold");
      let command = {
        "SetCoughIsHold": coughHold
      }
      websocket.send_command(store.getActiveSerial(), command);
    },

    getNameForChannel(name) {
      if (name === "StreamMix2") {
        let vod = "VOD";
        let mix2 = "Stream Mix 2";

        if (isWindowsDriver() && driverVOD()) return vod;
        return mix2;
      }

      if (name === "BroadcastMix") {
        let streamMix = "Stream Mix";
        let streamMix1 = "Stream Mix 1";

        if (firmwareSupportsMix2()) {
          if (isWindowsDriver() && !driverMix2()) return streamMix;
          return streamMix1;
        }

        return streamMix;
      }
    },
  },
}
</script>

<style scoped>

</style>
