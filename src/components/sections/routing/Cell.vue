<template>
  <td @click="clicked" role="checkbox" :aria-description="`Routing from ${input} to ${output}`" :aria-checked="enabled" tabindex="0">
    <font-awesome-icon v-if="enabled" icon="fa-solid fa-circle-check" />
  </td>
</template>

<script>
export default {
  name: "RoutingCell",

  props: {
    input: String,
    output: String,
    enabled: Boolean
  },

  methods: {
    clicked() {
      this.$emit('clicked', this.output, this.input);
    }
  }
}
</script>

<style scoped>
  td {
    text-align: center;
    font-size: 18px;
    color: #59b1b6;
    background-color: #3b413f;
    padding: 0;
    margin: 0;
    position: relative;
  }

  /* Force SVG to center of the Cell */
  td svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }

  td:has(>input[type=checkbox]:focus) {
    background-color: #49514e;
  }

  td:hover {
    background-color: #49514e;
  }
</style>
