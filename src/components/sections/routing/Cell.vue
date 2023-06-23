<template>
  <td>
    <div @click="clicked" role="checkbox" :aria-valuenow="enabled" :aria-label="`Routing from ${input} to ${output}`"
         :aria-checked="enabled" tabindex="0" :class="{ disabled: cellDisabled }" :aria-disabled="cellDisabled">
      <font-awesome-icon v-if="enabled" icon="fa-solid fa-circle-check"/>
    </div>
  </td>
</template>

<script>
export default {
  name: "RoutingCell",

  props: {
    input: String,
    output: String,
    enabled: Boolean,
    orange: {type: Boolean, required: false, default: false},
    cellDisabled: {type: Boolean, required: false, default: false}
  },

  computed: {
    textColour() {
      if (this.orange) {
        return "#CC7224";
      }
      return "#59b1b6";
    }
  },

  methods: {
    clicked() {
      if (!this.cellDisabled) {
        this.$emit('clicked', this.output, this.input);
      }
    }
  }
}
</script>

<style scoped>
td {
  padding: 0;
}

div {
  text-align: center;
  font-size: 18px;
  color: v-bind(textColour);
  background-color: #3b413f;
  margin: 0;
  position: relative;
  height: 26px;
}

div.disabled {
  background-color: #353B39;
}

div.disabled:hover {
  background-color: #353B39;
}

/* Force SVG to center of the Cell */
div svg {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
}

div:has(>input[type=checkbox]:focus) {
  background-color: #49514e;
}

div:hover {
  background-color: #49514e;
}
</style>
