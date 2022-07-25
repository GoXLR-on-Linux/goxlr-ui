<template>
  <div style="display: flex">
    <div style="padding: 40px 0px 40px 40px;">
      <MicProfileHandler/>
    </div>
    <MainTabContent>
      <SetupButton/>
      <Gate/>
      <Equaliser/>
      <Compressor/>
      <DeEsser/>
    </MainTabContent>
  </div>
</template>

<script>
import Gate from "./mic/Gate";
import Equaliser from "./mic/Equalizer";
import Compressor from "./mic/Compressor";
import DeEsser from "./mic/DeEsser";
import SetupButton from "@/components/sections/mic/SetupMic";
import MainTabContent from "@/components/design/MainTabContent";
import MicProfileHandler from "@/components/sections/mic/MicProfileHandler";

export default {
  name: "MicSections",
  components: {MicProfileHandler, MainTabContent, SetupButton, DeEsser, Compressor, Equaliser, Gate}
}
</script>

<style scoped>
</style>
