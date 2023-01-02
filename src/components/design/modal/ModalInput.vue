<template>
  <input ref="inputBox" class="text" :value="modelValue" type="text"
         @input="$emit('update:modelValue', $event.target.value)"
         v-on:keyup.enter="$emit('on-enter')"
         :placeholder="placeholder" />
</template>

<script>
export default {
  name: "ModalInput",

  props: {
    modelValue: String,
    placeholder: String,
  },

  methods: {
    focus() {
      this.$refs.inputBox.focus();
    },
  }
}
</script>

<style scoped>
input[type=text] {
  width: calc(100% - 10px);
  background-color: #2B2F2D;
  border: 1px solid #3b413f;
  padding: 5px;
  color: #fff;
}
</style>
