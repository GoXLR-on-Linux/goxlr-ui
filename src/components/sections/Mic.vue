<template>
  <SetupButton />
  <Gate />
  <Equaliser />
  <Compressor />
  <DeEsser />
</template>

<script>
import Gate from "./mic/Gate";
import Equaliser from "./mic/Equalizer";
import Compressor from "./mic/Compressor";
import DeEsser from "./mic/DeEsser";
import SetupButton from "@/components/sections/mic/SetupMic";
export default {
  name: "MicSections",
  components: {SetupButton, DeEsser, Compressor, Equaliser, Gate}
}
</script>

<style scoped>

</style>
