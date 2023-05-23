<template>
  <div class="base">
    <FaderVisualisation />
    <div v-if="!isDeviceMini()" class="right">
      <EffectsVisualisation />
    </div>
  </div>
</template>

<script>
import FaderVisualisation from "@/components/visualisation/faders/FaderVisualisation.vue";
import EffectsVisualisation from "@/components/visualisation/effects/EffectsVisualisation.vue";
import {isDeviceMini} from "@/util/util";

export default {
  name: "GoXLRVisualiser",
  methods: {isDeviceMini},
  components: {EffectsVisualisation, FaderVisualisation},

}
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: row;

  height: 409px;
  background-color: #151515
}

.right {
  display: flex;
  flex-direction: column;
}

</style>
