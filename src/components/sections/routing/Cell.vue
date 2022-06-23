<template>
  <td @click="clicked" :class="{ enabled: enabled }"></td>
</template>

<script>
export default {
  name: "RoutingCell",

  props: {
    input: Number,
    output: Number,
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
    background-color: #3b413f;
  }

  td:hover {
    background-color: #49514e;
  }

  td.enabled {
    background-color: #006F19;
  }

  td.enabled:hover {
    background-color: #00A11A;
  }
</style>