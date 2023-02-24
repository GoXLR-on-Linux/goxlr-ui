<template>
  <div class="wrapper">
    <label ref="label" :class="{ selected: this.selected, disabled: this.disabled }">
      <input ref="check" :name=group :id=id type="radio" @change="change" :value=id :checked="selected"
             :disabled="disabled"/>{{ text }}
    </label>
    <div ref="right_ref" class="right_side" :class="{ selected: this.selected, disabled: this.disabled }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["radio-selected"],
  name: "RadioItem",

  props: {
    text: {type: String, required: true},
    id: {type: String, required: true},
    group: {type: String, required: true},

    selected: {type: Boolean, required: false, default: false},
    disabled: {type: Boolean, required: false, default: false},

    padding: {type: String, required: false, default: "8px"}
  },

  data: function () {
    return {
      local_selected: false,
    }
  },

  methods: {
    change() {
      this.$emit('radio-selected', this.id);
    },

    isSelected() {
      if (this.$refs.check === undefined) {
        console.log("No Ref.");
        return false;
      }
      return this.selected;
    },

    focus() {
      this.$refs.label.focus();
    }
  },

  computed: {
    right_width: function () {
      return this.$refs.right_ref.clientWidth + "px";
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
}

/*
Firefox doesn't support complete hiding of the radio button (it's pretty aggressive with detecting label and button
attachment, so we do some tricks to make it 'seem' hidden, so that the screen reader can treat the radio correctly
while it not being visibly visible!
 */
input[type=radio] {
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

  width: calc(100% - 12px - v-bind(right_width));
  margin: auto 0 auto auto;
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

.right_side {
  background-color: #3b413f;
  margin-right: auto;
  padding-top: v-bind(padding);
  padding-bottom: v-bind(padding);
  padding-right: 8px;

  color: #fff;
}

.right_side.selected {
  background-color: #59b1b6;
  color: #353937;
}

label.selected {
  background-color: #59b1b6;
  color: #353937;
}

label:not(.selected):focus-within {
  background-color: #49514e;
}

label:not(.selected):hover, label:not(.selected):hover + div {
  background-color: #49514e;
}

label.disabled, label.disabled + div {
  background-color: #383D3B;
  color: #959796;
}

</style>
