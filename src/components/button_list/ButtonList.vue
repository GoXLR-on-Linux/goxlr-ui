<template>
  <div class="buttonList">
    <div class="label"><slot name="title">{{ title }}</slot></div>
    <div ref="buttonList" class="buttonHolder">
        <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ButtonList",

  props: {
    title: String
  },

  methods: {
    getScrollTop() {
      return this.$refs.buttonList.scrollTop;
    }
  }
}
</script>

<style scoped>
.buttonList {
  height: 220px;
  width: 200px;

  margin: 3px;
  background-color: #353937;
}

.buttonList:not(:last-child) {
  margin-right: 20px;
}

.buttonHolder {
  height: 170px;
  width: 200px;

  box-sizing: border-box;
  overflow-y: auto;
}

.buttonHolder::-webkit-scrollbar {
  width: 3px;
}

.buttonHolder::-webkit-scrollbar-track {
  background-color: transparent;
}

.buttonHolder::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}

.label {
  padding: 10px;
  color: #fff;
  background-color: #3b413f;

  text-transform: uppercase;

  margin-bottom: 8px;
}

</style>
