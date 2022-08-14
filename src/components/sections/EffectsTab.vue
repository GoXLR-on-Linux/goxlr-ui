<template>
  <MainTabContent>
    <ReverbEffect />
    <EchoEffect />
    <PitchEffect />
    <GenderEffect />
    <MegaphoneEffect />
    <RobotEffect />
    <HardTuneEffect />
  </MainTabContent>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ReverbEffect from "@/components/sections/effects/ReverbEffect";
import EchoEffect from "@/components/sections/effects/EchoEffect";
import PitchEffect from "@/components/sections/effects/PitchEffect";
import GenderEffect from "@/components/sections/effects/GenderEffect";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect";
import RobotEffect from "@/components/sections/effects/RobotEffect";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect";
export default {
  name: "EffectsTab",
  components: {
    HardTuneEffect,
    RobotEffect, MegaphoneEffect, GenderEffect, PitchEffect, EchoEffect, ReverbEffect, MainTabContent}
}
</script>

<style scoped>

</style>