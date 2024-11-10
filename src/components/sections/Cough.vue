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

      // This one is going to depend on the Firmware AND the driver..
      let channelName = "";
      if (isDeviceMini()) {
        if (isWindowsDriver()) {
          if (driverPreVOD()) {
            channelName = "Stream Mix + Sampler";
          } else if (driverVOD()) {
            channelName = "Stream Mix + VOD";
          } else if (driverMix2()) {
            channelName = "Stream Mixes 1 + 2";
          }
        } else {
          // On the Mini on Linux, until we can get UCM Fixed, it'll always be Stream Mix + Sample, the daemon
          // will internally do the firmware handling of this.
          channelName = "Stream Mix + Sampler";
        }
      } else {
        if (isWindowsDriver()) {
          if (firmwareSupportsMix2()) {
            if (driverMix2()) channelName = "Stream Mixes 1 + 2"
            if (driverVOD()) channelName = "Stream Mix + VOD"
          } else {
            if (driverMix2()) { channelName = "Stream Mix 1 + Sampler" }
            if (driverVOD()) { channelName = "Stream Mix + Sampler" }
            if (driverPreVOD()) { channelName = "Stream Mix + Sampler" };
          }
        } else {
          // Realistically, we don't know, base it on the firmware..
          if (firmwareSupportsMix2()) {
            channelName = "Stream Mixes 1 + 2";
          } else {
            channelName = "Stream Mix + Sampler";
          }
        }
      }

      // On the Mini, we should always display Mute to Mix 2 regardless of versioning, unless it's bound to Stream Mix 1..
      if (isDeviceMini()) {
        if (!isStreamNoMusic()) {
          behaviours.push({ id: "ToStream2", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.getNameForChannel("StreamMix2") })});
        }
      } else {
        // On the full device, it's dependant on what's actually available..
        behaviours.push({ id: "ToStream2", label: this.$t('message.configuration.mute_behaviour.base', { channel: this.getNameForChannel("StreamMix2") })});
      }

      if (!(isDeviceMini() && isStreamNoMusic()) && channelName !== "") {
        behaviours.push({ id: "ToStreams", label: this.$t('message.configuration.mute_behaviour.base', { channel: channelName })});
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
      let sample = "Sampler";
      let vod = "VOD";
      let mix2 = "Stream Mix 2";

      if (name == "Sampler" || name == "StreamMix2") {
        if (store.hasActiveDevice()) {
          if (isWindowsDriver()) {
            if (driverMix2()) {
              if (isDeviceMini() || firmwareSupportsMix2()) {
                return mix2;
              }
            }

            if (driverVOD()) {
              if (isDeviceMini()) return vod;
              if (name === "StreamMix2" && firmwareSupportsMix2()) return vod;
            }
          }
          return sample;
        }
      }

      if (name == "BroadcastMix") {
        let streamMix = "Stream Mix";
        let streamMix1 = "Stream Mix 1";

        if (isWindowsDriver()) {
          if (driverMix2()) {
            return streamMix1;
          }
        }
        return streamMix;
      }
    },
  },
}
</script>

<style scoped>

</style>
