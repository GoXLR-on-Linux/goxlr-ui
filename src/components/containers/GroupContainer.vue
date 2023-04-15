<script>
export default {
  name: "GroupContainer",
  props: {
    title: String,
  },

  computed: {
    rightWidth: {
      get() {
        return this.$refs.right.clientWidth + "px";
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div style="width: 100%">
      <div v-if="title !== ''" class="title">
        {{ title }}
      </div>
      <div ref="right" class="right">
        <slot  name="right"></slot>
      </div>
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 24px;

  background-color: #2D3230;
}

.title {
  display: inline-block;
  width: calc(100% - (v-bind(rightWidth) * 2));

  padding: 0 0 10px 0;
  margin-left: v-bind(rightWidth);

  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 6px;

  height: fit-content;
  width: fit-content;
}

.right {
  display: inline-block;
}
</style>
