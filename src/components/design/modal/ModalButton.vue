<template>
  <button ref="button" class="modal-button"><slot /></button>
</template>

<script>
export default {
  name: "ModalButton",

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

.modal-button:hover, .modal-button:focus {
  background-color: #737775;
}
</style>
