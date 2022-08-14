<template>
  <MainTabContent>
    <ReverbEffect />
  </MainTabContent>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ReverbEffect from "@/components/sections/effects/ReverbEffect";
export default {
  name: "EffectsTab",
  components: {ReverbEffect, MainTabContent}
}
</script>

<style scoped>

</style>