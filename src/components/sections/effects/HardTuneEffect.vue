<template>
  <ContentBox title="Hard Tune">
    <SliderInput title="Amount" :slider-min-value=0 :slider-max-value=100 :slider-value="getAmountValue()" v-show="is_expanded" />
    <SliderInput title="Rate" :slider-min-value=0 :slider-max-value=100 :slider-value="getRateValue()" v-show="is_expanded" />
    <SliderInput title="Window" :slider-min-value=0 :slider-max-value=600 :slider-value="getWindowValue()" v-show="is_expanded" />

  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="is_expanded"/>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import SliderInput from "@/components/slider/Slider";
import {store} from "@/store";
import ExpandoBox from "@/components/design/ExpandoBox";
export default {
  name: "HardTuneEffect",
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
      return store.getActiveDevice().effects.hard_tune.amount;
    },
    getRateValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.hard_tune.rate;
    },
    getWindowValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().effects.hard_tune.window;
    },
  }
}
</script>

<style scoped>

</style>