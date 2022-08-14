<template>
  <ContentBox title="Pitch">
    <SliderInput title="Amount" :slider-min-value=-24 :slider-max-value=24 :slider-value="getAmountValue()" />
    <SliderInput title="Character" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getCharacterValue()" />
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
export default {
  name: "PitchEffect",
  components: {SliderInput, ContentBox},

  methods: {
    getAmountValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.pitch.amount;
    },
    getCharacterValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.pitch.character;
    }
  }
}
</script>

<style scoped>

</style>