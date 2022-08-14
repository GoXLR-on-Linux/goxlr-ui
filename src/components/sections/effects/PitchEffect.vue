<template>
  <ContentBox title="Pitch">
    <SliderInput title="Amount" :slider-min-value=-24 :slider-max-value=24 :slider-value="getAmountValue()" />
    <SliderInput title="Character" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getCharacterValue()" v-show="is_expanded" />
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ExpandoBox from "@/components/design/ExpandoBox";
export default {
  name: "PitchEffect",
  components: {ExpandoBox, SliderInput, ContentBox},
  data() {
    return {
      is_expanded: false,
    }
  },

  methods: {
    toggleExpando() {
      this.is_expanded = !this.is_expanded;
    },

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