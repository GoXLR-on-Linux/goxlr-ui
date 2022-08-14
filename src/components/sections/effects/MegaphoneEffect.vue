<template>
  <ContentBox title="Megaphone">
    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getAmountValue()" v-show="is_expanded" />
    <SliderInput title="Post Gain" :slider-min-value=0 :slider-max-value=100 text-suffix="dB" :slider-value="getPostGainValue()" v-show="is_expanded" />
  </ContentBox>

  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ExpandoBox from "@/components/design/ExpandoBox";
export default {
  name: "MegaphoneEffect",
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