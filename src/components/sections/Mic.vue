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
      <DeEsser v-show="!isDeviceMini()"/>
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
import {store} from "@/store";
import MicProfileHandler from "@/components/profiles/handlers/MicProfileHandler";

export default {
  name: "MicSections",
  components: {MicProfileHandler, MainTabContent, SetupButton, DeEsser, Compressor, Equaliser, Gate},

  methods: {
    isDeviceMini() {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().hardware.device_type === "Mini";
    }
  }
}
</script>

<style scoped>
</style>
