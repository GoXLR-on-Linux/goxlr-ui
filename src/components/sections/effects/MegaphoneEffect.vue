<template>
  <ContentBox title="Megaphone">
    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getAmountValue()" />
    <SliderInput title="Post Gain" :slider-min-value=0 :slider-max-value=100 text-suffix="dB" :slider-value="getPostGainValue()" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
export default {
  name: "MegaphoneEffect",
  components: {SliderInput, ContentBox},

  methods: {
    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.megaphone.amount;
    },
    getPostGainValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.megaphone.post_gain;
    },

  }
}
</script>

<style scoped>

</style>