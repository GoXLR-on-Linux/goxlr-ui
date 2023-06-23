<script>
import VerticalScrollingContainer from "@/components/containers/VerticalScrollingContainer.vue";
import RadioList from "@/components/lists/RadioList.vue";

export default {
  name: "ScrollingRadioList",
  components: {RadioList, VerticalScrollingContainer},

  props: {
    maxHeight: { type: String, optional: true, default: "inherit" },
  },

  methods: {
    getScrollTop() {
      if (this.container !== undefined) {
        return this.container.getMainRef().scrollTop;
      }
      return 0;
    },
  },

  data() {
    return {
      container: undefined,
    }
  },

  mounted() {
    this.container = this.$refs.container;
  },

}
</script>

<template>
  <VerticalScrollingContainer ref="container" :max-height="maxHeight">
    <RadioList v-bind="$attrs" :scroll-top="getScrollTop">
      <slot></slot>
    </RadioList>
  </VerticalScrollingContainer>
</template>
