<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <MicProfileHandler />
    </div>
    <ContentContainer :no-left-pad="true">
      <ContentBox>
        <MicSetupButton />
      </ContentBox>
      <Gate/>
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
import MicSetupButton from "@/components/sections/mic/MicSetupButton";
import ContentBox from "@/components/ContentBox";
import ContentContainer from "@/components/containers/ContentContainer.vue";

export default {
  name: "MicSections",
  components: {
    ContentContainer,
    ContentBox, MicSetupButton, MicProfileHandler, MicExtra, Compressor, Equaliser, Gate},
}
</script>

<style scoped>
</style>
