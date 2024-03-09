<script>
export default {
  name: "VerticalScrollingContainer",
  props: {
    maxHeight: { type: String, optional: true, default: "inherit" },
    padding: { type: String, required: false, default: "4px" }
  },

  methods: {
    getMainRef() {
      return this.$refs.scrollRef;
    }
  }
}


</script>

<template>
  <div class="scroll" ref="scrollRef">
    <slot></slot>
  </div>
</template>

<style scoped>
.scroll {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;

  margin-top: 8px;
  margin-bottom: 8px;

  padding: 4px;
  box-sizing: border-box;
  width: 100%;

  max-height: v-bind(maxHeight);

  overflow-x: hidden;
  overflow-y: scroll;
}

.scroll::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}
</style>

