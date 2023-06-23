<template>
  <GroupContainer title="Mix Assignment" side-padding="12px">
    <div style="display: flex; flex-direction: column; gap: 5px">
      <!-- I'd prefer to v-for these, but the need for a spacer makes it hard -->
      <AssignmentEntry name="Headphones" display="Headphones"/>
      <div style="height: 20px;"/>
      <AssignmentEntry name="BroadcastMix" display="Stream Mix"/>
      <AssignmentEntry name="LineOut" display="Line Out"/>
      <AssignmentEntry name="ChatMic" display="Chat Mic"/>
      <AssignmentEntry name="Sampler" display="Sampler"/>
    </div>
  </GroupContainer>
</template>

<script>
import AssignmentEntry from "@/components/sections/mixer/AssignmentEntry.vue";
import {OutputDevice} from "@/util/mixerMapping";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  name: "MixAssignment",
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