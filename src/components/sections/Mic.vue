<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <MicProfileHandler/>
    </div>
    <MainTabContent :no-left-pad=true>
      <ContentBox>
        <MicSetupButton />
      </ContentBox>
      <Gate/>
      <Equaliser/>
      <Compressor/>
      <MicExtra />
    </MainTabContent>
  </div>
</template>

<script>
import Gate from "./mic/Gate";
import Equaliser from "./mic/Equalizer";
import Compressor from "./mic/Compressor";
import MicExtra from "./mic/MicExtra";
import MainTabContent from "@/components/design/MainTabContent";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler";
import MicSetupButton from "@/components/sections/mic/MicSetupButton";
import ContentBox from "@/components/ContentBox";

export default {
  name: "MicSections",
  components: {ContentBox, MicSetupButton, MicProfileHandler, MainTabContent, MicExtra, Compressor, Equaliser, Gate},
}
</script>

<style scoped>
</style>
