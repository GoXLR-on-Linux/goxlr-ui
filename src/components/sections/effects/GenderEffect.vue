<template>
  <ContentBox title="Gender">
    <SliderInput title="Amount" :slider-min-value=-50 :slider-max-value=50 :slider-value="getAmountValue()" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import {store} from "@/store";
import SliderInput from "@/components/slider/Slider";
export default {
  name: "GenderEffect",
  components: {SliderInput, ContentBox},

  methods: {
    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.gender.amount;
    },
  }
}
</script>

<style scoped>

</style>