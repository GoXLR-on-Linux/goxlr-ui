<template>
  <div style="position: relative; width: 32px">
    <div class="fader"></div>
    <div class="bar"></div>
  </div>
</template>

<script>
export default {
  name: "FaderSlider",

  props: {
    value: { type: Number, required: false, default: 255}
  },

  computed: {
    top() {
      let bottom = 260;

      let position = Math.ceil(bottom - (bottom / 255 * this.value));
      return position + "px";
    }
  }
}
</script>

<style scoped>
.bar {
  position: absolute;
  width: 10px;
  height: 260px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #2b2f2d;
  margin-left: 11px;
  z-index: 1;
}

.fader {
  position: absolute;
  margin-left: 6px;
  width: 20px;
  height: 40px;
  top: v-bind(top);
  background-color: #5b5b5b;
  z-index: 2;
}
</style>
