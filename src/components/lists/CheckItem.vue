<template>
  <div>
    <label ref="label" :class="{ selected: selected, disabled: disabled }">
      <input ref="check" :id=id type="checkbox" @change="change" :value=id :checked="selected" :disabled="disabled"/>{{ text }}
    </label>
  </div>
</template>

<script>
export default {
  emits: ["check-changed"],
  name: "CheckItem",

  props: {
    text: {type: String, required: true},
    id: {type: String, required: true},

    selected: {type: Boolean, required: false, default: false},
    disabled: {type: Boolean, required: false, default: false},

    padding: {type: String, required: false, default: "8px"}
  },

  methods: {
    change() {
      this.$emit('check-changed', this.id, this.isSelected());
    },

    isSelected() {
      if (this.$refs.check === undefined) {
        return false;
      }
      return this.$refs.check.checked;
    },

    focus() {
      this.$refs.label.focus();
    }
  },
}
</script>

<style scoped>
/*
Firefox doesn't support complete hiding of the radio button (it's pretty aggressive with detecting label and button
attachment, so we do some tricks to make it 'seem' hidden, so that the screen reader can treat the radio correctly
while it not being visibly visible!
 */
input[type=checkbox] {
  opacity: 0;
  width: 0;
  border: 0;
  height: 0;
  margin: 0;
}


/* We're going to try and make the label look and behave like a legacy 'Button' */
label {
  display: block;
  box-sizing: border-box;

  width: calc(100% - 12px);
  /*margin: 8px;*/
  margin: auto;
  background-color: #3b413f;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /*
   We sneak the padding 4 pixels to the left, because we can't completely hide the radio button..
   */
  padding: v-bind(padding) v-bind(padding) v-bind(padding) calc(v-bind(padding) - 4px);
  text-align: left;
  color: #fff;
}

label.selected {
  background-color: #59b1b6;
  color: #353937;
}

label:not(.selected):focus-within {
  background-color: #49514e;
}

label:not(.selected):hover {
  background-color: #49514e;
}

label.disabled {
  background-color: #383D3B;
  color: #959796;
}

</style>
