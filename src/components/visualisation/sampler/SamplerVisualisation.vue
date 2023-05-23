<template>
  <div style="display: flex; flex-direction: row; border: 1px solid #353937; margin-left: 10px; margin-top: 0; padding-top: 6px; width: 306px">
    <div class="banks">
      <div v-for="x in 3" :key="x">
        <SampleBank :id="x"/>
      </div>
    </div>
    <SamplerButtons/>
  </div>
</template>

<script>

import SamplerButtons from "@/components/visualisation/sampler/SamplerButtons.vue";
import SampleBank from "@/components/visualisation/sampler/SamplerBank.vue";

export default {
  name: "SamplerVisualisation",
  components: {SampleBank, SamplerButtons}
}
</script>

<style scoped>
.banks {
  margin-left: 7px;
  margin-top: 18px;
}
</style>
