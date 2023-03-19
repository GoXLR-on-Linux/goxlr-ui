<template>
  <div>
    <button ref="button" :aria-label="(label === undefined) ? text : label" :class="{ centered: centered, disabled: disabled }">{{text}}</button>
  </div>
</template>

<script>
export default {
  name: "ButtonItem",

  props: {
    text: {type: String, required: true},
    label: { type: String, required: false },
    id: {type: String, required: true},

    disabled: {type: Boolean, required: false, default: false},
    padding: {type: String, required: false, default: "8px"},
    centered: { type: Boolean, required: false, default: false }
  },

  methods: {
    focus() {
      this.$refs.button.focus()
    }
  }
}
</script>

<style scoped>
button {
  display: block;
  box-sizing: border-box;

  border: 0;

  width: calc(100% - 12px);
  margin: auto;
  background-color: #3b413f;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /*
   We sneak the padding 4 pixels to the left, because we can't completely hide the radio button..
   */
  padding: v-bind(padding);
  text-align: left;
  color: #fff;
}

button:focus {
  background-color: #49514e;
  outline: none;
}

button:not(.disabled):hover {
  background-color: #49514e;
}

button.centered {
  text-align: center;
}

button.disabled {
  background-color: #383D3B;
  color: #959796;
}
</style>