<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="label" aria-describedby="body" v-click-outside="onClickOutside">
          <div class="modal-header">
            <div id="label" class="title"><slot name="title"></slot></div>
            <button class="close-button" @click="$emit('close')"><font-awesome-icon title="Close" icon="fa-solid fa-xmark" /></button>
          </div>
          <div class="modal-body" id="body">
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
// TODO: I'm recycling IDs here, not ideal..

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  components: {FontAwesomeIcon},
  emits: ['close'],
  name: "ModalBox",

  props: {
    bodyPadding: {type: String, default: "20px"},
    width: {type: String, default: "500px" }
  },

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


  width: v-bind(width);
  margin: 0 auto;
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
  padding: 14px;
  float: right;
  cursor: pointer;
  background-color: transparent;
  color: #fff;
  border: 0;
}

.modal-body {
  background-color: #2d3230;
  color: #fff;
  padding: v-bind(bodyPadding);
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
