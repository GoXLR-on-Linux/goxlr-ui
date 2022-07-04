<template>

  <div class="button" v-bind:class="{ active: isActive}" @click="setActive">{{ label }}</div>

</template>

<script>

export default {
  name: "ProFile",

  props: {
    buttonId: String,
    label: String,
    isActive: Boolean,
  },

  methods: {
    setActive() {
      this.$emit('button-pressed', this.label);
    }
  },
}
</script>

<style scoped>
.button {
  box-sizing: border-box;
  width: calc(100% - 16px);
  margin: 8px;
  background-color: transparent;
  padding: 8px;
  text-align: left;
  color: #6e7676;

  cursor: default;
}

.button:hover:not(.active) {
  background-color: #49514e;
  color: #fff;
}

.button:first-child {
  margin-top: 0px;
}

.button:last-child {
  margin-bottom: 0px;
}

.active {
  background-color: transparent;
  color: #fff;
}

</style>