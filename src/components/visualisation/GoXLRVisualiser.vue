<template>
  <div class="base">
<!--    <FaderVisualisation />-->
<!--    <div v-if="!isDeviceMini()" class="right">-->
<!--      <EffectsVisualisation />-->
<!--      <div style="display: flex; flex-direction: row">-->
<!--        <SamplerVisualisation />-->
<!--        <MuteVisualisation />-->
<!--      </div>-->
<!--    </div>-->
    <GoXLR />
  </div>
</template>

<script>
// import FaderVisualisation from "@/components/visualisation/faders/FaderVisualisation.vue";
// import EffectsVisualisation from "@/components/visualisation/effects/EffectsVisualisation.vue";
// import {isDeviceMini} from "@/util/util";
// import SamplerVisualisation from "@/components/visualisation/sampler/SamplerVisualisation.vue";
// import MuteVisualisation from "@/components/visualisation/mute/MuteVisualisation.vue";
import GoXLR from "@/components/visualisation/vector/GoXLR.vue";

export default {
  name: "GoXLRVisualiser",
  // components: {MuteVisualisation, SamplerVisualisation, EffectsVisualisation, FaderVisualisation},
  components: {GoXLR}
}
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: row;
  height: 560px;
  //background-color: #151515
}

.right {
  display: flex;
  flex-direction: column;
}

</style>
