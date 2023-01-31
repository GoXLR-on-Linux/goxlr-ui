<template>
  <div v-if='isActive'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    name: {type: String, required: true},
    selected: {type: Boolean, default: false},
  },
  data() {
    return {
      isActive: true
    }
  },

  computed: {
    href() {
      return '#' + this.name.toLowerCase().replace(/ /g, '-');
    }
  },

  mounted() {
    this.isActive = this.selected;
  },

  created() {
    this.$parent.tabs.push(this);
  }
}
</script>

<style scoped>
</style>
