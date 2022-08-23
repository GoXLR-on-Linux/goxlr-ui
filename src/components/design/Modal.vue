<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-click-outside="onClickOutside">

          <div class="modal-header">
            <div class="title"><slot name="title"></slot></div>
            <div class="close-button" @click="$emit('close')">X</div>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ['close'],
  name: "ModalBox",

  methods: {
    onClickOutside() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  border: 1px solid #000;


  width: 500px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  text-transform: uppercase;
  font-family: LeagueMono, sans-serif;
  background-color: #3b413f;
  text-align: center;
  color: #fff;
  overflow: hidden;
}

.modal-header .title {
  padding: 15px;
  float: left;
  display: block;
  clear: both;
}

.modal-header .close-button {
  padding: 15px;
  float: right;
  cursor: pointer;
}

.modal-body {
  background-color: #2d3230;
}

.modal-footer {
  background-color: #2d3230;
  text-align: right;
  padding-right: 10px;
  padding-bottom: 10px;
}

.modal-footer button {
  background-color: #353937;
  color: #fff;
  padding: 8px 30px;
  border: none;
}

.modal-footer button:hover {
  background-color: #737775;
}

</style>
