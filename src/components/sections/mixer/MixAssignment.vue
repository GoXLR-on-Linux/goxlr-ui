<template>
  <GroupContainer :title="$t('message.mixer.mixAssignment')" side-padding="12px">
    <div style="display: flex; flex-direction: column; gap: 5px">
      <!-- I'd prefer to v-for these, but the need for a spacer makes it hard -->
      <AssignmentEntry name="Headphones" :display="$t('message.channels.Headphones')"/>
      <div style="height: 20px;"/>
      <AssignmentEntry name="BroadcastMix" :display="$t('message.channels.StreamMix')"/>
      <AssignmentEntry name="LineOut" :display="$t('message.channels.LineOut')"/>
      <AssignmentEntry name="ChatMic" :display="$t('message.channels.ChatMic')"/>
      <AssignmentEntry name="Sampler" :display="$t(getSamplerChannelString())"/>
    </div>
  </GroupContainer>
</template>

<script>
import AssignmentEntry from "@/components/sections/mixer/AssignmentEntry.vue";
import {OutputDevice} from "@/util/mixerMapping";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import {store} from "@/store";
import {isDeviceMini, versionNewerOrEqualTo} from "@/util/util";

export default {
  name: "MixAssignment",
  methods: {
    getSamplerChannelString() {
      let sample = "message.channels.Sampler";
      let vod = "message.channels.VOD";

      if (store.hasActiveDevice()) {
        if (isDeviceMini()) {
          if (versionNewerOrEqualTo(store.getConfig().driver_interface.version, [5,30,0])) {
            return vod;
          }
        }
      }
      return sample;
    },
  },
  computed: {
    OutputDevice() {
      return OutputDevice
    }
  },
  components: {GroupContainer, AssignmentEntry}
}
</script>

<style scoped>

</style>
