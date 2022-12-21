<template>
  <!-- Simply Create a Radio Item, and attach a label to it -->
  <input :name=group :id=id type="radio" @change="change" :checked="selected" :disabled="disabled" />
  <label :for=id>{{ text }}</label>
</template>

<script>
export default {
  emits: ["radio-selected"],
  name: "RadioItem",

  props: {
    text: {type: String, required: true},
    id: {type: String, required: true},
    group: {type: String, required: true},

    selected: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },

    padding: {type: String, required: false, default: "8px"}
  },

  methods: {
    change() {
      this.$emit('radio-selected', this.id);
    }
  }
}
</script>

<style scoped>
/*
 We hide the actual Radio Item, but keep it visible enough that the label can still be used
 for navigation.
 */
input[type=radio] {
  position: absolute;
  opacity: 0;
  width: 0;
}


/* We're going to try and make the label look and behave like a legacy 'Button' */
label {
  display: block;
  box-sizing: border-box;

  width: calc(100% - 16px);
  margin: 8px;
  background-color: #3b413f;
  padding: v-bind(padding);
  text-align: left;
  color: #fff;

  cursor: default;
}

input[type="radio"]:checked+label {
  background-color: #59b1b6;
  color: #353937;
}

input[type="radio"]:not(:checked):focus+label {
  background-color: #49514e;
}

input[type="radio"]:disabled+label {
  background-color: #383D3B;
  color: #959796;
}

label:hover {
  background-color: #49514e;
}

</style>