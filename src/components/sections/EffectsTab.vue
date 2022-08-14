<template>
  <MainTabContent>
    <ReverbEffect />
    <EchoEffect />
  </MainTabContent>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ReverbEffect from "@/components/sections/effects/ReverbEffect";
import EchoEffect from "@/components/sections/effects/EchoEffect";
export default {
  name: "EffectsTab",
  components: {EchoEffect, ReverbEffect, MainTabContent}
}
</script>

<style scoped>

</style>