<template>
  <div class="rotated" :class="{ 'active': this.is_selected }"><slot /></div>
</template>

<script>
export default {
  name: "LightingSection",

  props: {
    label: String,
    is_selected: Boolean,
  }
}
</script>

<style scoped>
.rotated {
  padding: 15px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-right: 2px;
  background-color: #2B2F2D;
  color: #fff;
}

.rotated.active {
  background-color: #59b1b6;
}
</style>