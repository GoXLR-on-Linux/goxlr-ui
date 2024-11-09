<template>
  <GroupContainer :title="$t('message.mixer.mixAssignment')" side-padding="12px">
    <div style="display: flex; flex-direction: column; gap: 4px">
      <!-- I'd prefer to v-for these, but the need for a spacer makes it hard -->
      <AssignmentEntry height="50px" name="Headphones" :display="$t('message.channels.Headphones')" />
      <div style="height: 8px;" />
      <AssignmentEntry name="BroadcastMix" :display="$t(getChannelString('BroadcastMix'))" />
      <AssignmentEntry name="StreamMix2" v-if="showChannel('StreamMix2')" :display="$t('message.channels.StreamMix2')" />
      <AssignmentEntry name="Sampler" v-if="showChannel('Sampler')" :display="$t(getChannelString('Sampler'))" />
      <AssignmentEntry name="LineOut" :display="$t('message.channels.LineOut')" />
      <AssignmentEntry name="ChatMic" :display="$t('message.channels.ChatMic')" />
      </div>
  </GroupContainer>
</template>

<script>
import AssignmentEntry from "@/components/sections/mixer/AssignmentEntry.vue";
import { OutputDevice } from "@/util/mixerMapping";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import { store } from "@/store";
import { driverMix2, firmwareSupportsMix2, isDeviceMini, isStreamNoMusic, isWindowsDriver, versionNewerOrEqualTo } from "@/util/util";

export default {
  name: "MixAssignment",
  methods: {
    getChannelString(name) {
      if (name == "Sampler") {
        let sample = "message.channels.Sampler";
        let vod = "message.channels.VOD";
        let mix2 = "message.channels.StreamMix2"

        if (store.hasActiveDevice()) {
          if (isDeviceMini() && isWindowsDriver()) {
            if (driverMix2()) {
              return mix2;
            }

            if (versionNewerOrEqualTo(store.getConfig().driver_interface.version, [5,30,0])) {
              return vod;
            }
          }
        }
        return sample;
      }
      if (name == "BroadcastMix") {
        let streamMix = "message.channels.StreamMix";
        let streamMix1 = "message.channels.StreamMix1";

        if (isWindowsDriver() && driverMix2()) {
          return streamMix1;
        }
        return streamMix;
      }
    },

    getBoxSize() {
      var size = 30;
      if (!this.showChannel("Sampler")) {
        size += 15;
      }
      if (!this.showChannel("StreamMix2")) {
        size += 15;
      }
    },

    showChannel(name) {
      if (!firmwareSupportsMix2() && name == "StreamMix2") {
        // Remove the Stream Mix 2 option if the device doesn't support it..
        return false;
      }

      if (isDeviceMini() && firmwareSupportsMix2() && name == "Sampler") {
        // Hide the Sampler channel if we're a mini with Mix2..
        return false;
      }
      
      // The Mix A / B assignment is potentially defined by the regular StreamMix
      if (isDeviceMini() && isStreamNoMusic()) {
        return false
      }

      return true;
    }
  },
  computed: {
    OutputDevice() {
      return OutputDevice
    }
  },
  components: { GroupContainer, AssignmentEntry }
}
</script>

<style scoped></style>
