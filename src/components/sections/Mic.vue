<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <MicProfileHandler/>
    </div>
    <MainTabContent :no-left-pad=true>
      <SetupButton/>
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
import SetupButton from "@/components/sections/mic/SetupMic";
import MainTabContent from "@/components/design/MainTabContent";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler";

export default {
  name: "MicSections",
  components: {MicProfileHandler, MainTabContent, SetupButton, MicExtra, Compressor, Equaliser, Gate},
}
</script>

<style scoped>
</style>
