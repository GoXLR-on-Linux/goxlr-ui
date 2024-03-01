<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <MicProfileHandler />
    </div>
    <ContentContainer :no-left-pad="true">
      <ContentBox>
        <MicSetupButton @mic-setup-open="mic_open" />
      </ContentBox>
      <Gate ref="gate" />
      <Equaliser/>
      <Compressor/>
      <MicExtra />
    </ContentContainer>
  </div>
</template>

<script>
import Gate from "./mic/Gate.vue";
import Equaliser from "./mic/Equalizer.vue";
import Compressor from "./mic/Compressor.vue";
import MicExtra from "./mic/MicExtra.vue";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler.vue";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import ContentBox from "@/components/ContentBox.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";

export default {
  name: "MicSections",
  components: {
    ContentContainer,
    ContentBox, MicSetupButton, MicProfileHandler, MicExtra, Compressor, Equaliser, Gate},

  methods: {
    mic_open: function() {
      this.$refs.gate.force_stop_graph();
    }
  }
}
</script>

<style scoped>
</style>
