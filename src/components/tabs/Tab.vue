<template>
  <div :class="{ leftAlign: left_align }" v-show='isActive'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    name: {type: String, required: true},
    selected: {type: Boolean, default: false},
    left_align: {type: Boolean, default: true},
    hidden: {type: Boolean, default: false}
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
div.leftAlign {
  text-align: left;
}
</style>