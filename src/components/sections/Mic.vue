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
import Gate from "./mic/Gate";
import Equaliser from "./mic/Equalizer";
import Compressor from "./mic/Compressor";
import MicExtra from "./mic/MicExtra";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import ContentBox from "@/components/ContentBox";
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
