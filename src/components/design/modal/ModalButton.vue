<template>
  <button ref="button" class="modal-button" :class="{ enabled: enabled }" :disabled="!enabled"><slot /></button>
</template>

<script>
export default {
  name: "ModalButton",

  props: {
    enabled: { type: Boolean, default: true }
  },

  methods: {
    focus() {
      this.$refs.button.focus();
    }
  }
}
</script>

<style scoped>
.modal-button {
  background-color: #353937;
  color: #fff;
  padding: 8px 30px;
  border: none;
  margin: 8px;
  width: 120px;
}

.modal-button:disabled {
  background-color: #2B2F2D;
}

.modal-button:not(:disabled):hover, .modal-button:not(:disabled):focus {
  background-color: #737775;
}
</style>
