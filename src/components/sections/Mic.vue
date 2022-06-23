<template>
  <SetupButton />
  <Gate />
  <Equiliser />
  <Compressor />
  <DeEsser />
</template>

<script>
import Gate from "./mic/Gate";
import Equiliser from "./mic/Equalizer";
import Compressor from "./mic/Compressor";
import DeEsser from "./mic/DeEsser";
import SetupButton from "@/components/sections/mic/SetupMic";
export default {
  name: "MicSections",
  components: {SetupButton, DeEsser, Compressor, Equiliser, Gate}
}
</script>

<style scoped>

</style>
