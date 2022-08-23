<template>
  <button class="modal-button"><slot /></button>
</template>

<script>
export default {
  name: "ModalButton"
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

.modal-button:hover {
  background-color: #737775;
}
</style>