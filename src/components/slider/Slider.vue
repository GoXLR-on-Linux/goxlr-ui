<template>
  <div id="sliderBox">
    <Label v-bind:title="title"/>
    <Range :current-field-value=fieldValue :min-value="getSliderMinValue()" :max-value="getSliderMaxValue()"
           :store-path="storePath" @value-updated="sliderValueUpdated" @mouse-down="setMouseDown"
           @mouse-up="setMouseUp"/>

    <Input :current-text-value="textValue" :min-value="minimumTextValue" :max-value="maximumTextValue"
           :textSuffix="textSuffix"
           :override-value="displayValue()" :editable="isEditable()" @value-updated="inputValueUpdated"
           style="margin-top: 15px"
    />
  </div>
</template>

<script>
/**
 * So, how this works, there are 8 props, but the only properties that are important are related
 * to the 'slider' component as those will be the 'real' values sent to the GoXLR device. The
 * input boxes below them are an 'abstract' representation of the slider state (for example,
 * a percentage) which are all dynamically handled, calculated, and presented based on the general
 * definitions provided.
 */

import Label from "./components/Label";
import Range from "./components/Range";
import Input from "./components/Input";

export default {
  name: "SliderInput",
  components: {Input, Range, Label},

  data() {
    return {
      fieldValue: 0,
      textValue: 0,

      lastValue: 0,
      timer: undefined,
    }
  },

  props: {
    id: {type: Number, default: -1},
    storePath: {type: String, required: true},

    title: {type: String, default: "UNSET"},

    sliderMinValue: Number,
    sliderMaxValue: Number,
    sliderValue: Number,

    textMinValue: Number,
    textMaxValue: Number,
    textSuffix: String,

    valueMap: Array,
  },

  methods: {
    sliderValueUpdated(newValue) {
      this.fieldValue = parseInt(newValue);
      this.calculateTextValue();
    },

    inputValueUpdated(newValue) {
      // Webkit / Blink are interesting in that they wont prevent a user from entering an invalid
      // number, so we use this code to force any entry into our boundries.

      if (newValue > this.textMaxValue) {
        this.textValue = 0;
        this.textValue = this.textMaxValue;
      } else if (newValue < this.textMinValue) {
        this.textValue = this.textMinValue;
      } else {
        this.textValue = newValue;
      }
      this.calculateFieldValue();
    },

    calculateTextValue() {
      let maxTextValue = this.maximumTextValue;
      let minTextValue = this.minimumTextValue;

      if (minTextValue === undefined) {
        minTextValue = this.sliderMinValue;
      }

      if (maxTextValue === undefined) {
        maxTextValue = this.sliderMaxValue;
      }

      // Get the distances between the slider, and text numbers..
      let sliderDistance = this.sliderMaxValue - this.sliderMinValue;
      let textDistance = maxTextValue - minTextValue;

      // Get the position of the slider in the range..
      let position = this.getPosition(parseInt(this.fieldValue), this.sliderMinValue, this.sliderMaxValue);

      // With the position known, we should be able to calculate the 'position' on the text range..
      let input = Math.round((position / sliderDistance) * textDistance);

      // Now set it..
      this.textValue = minTextValue + input;
    },

    calculateFieldValue() {
      let maxTextValue = this.maximumTextValue;
      let minTextValue = this.minimumTextValue;

      if (minTextValue === undefined) {
        minTextValue = this.sliderMinValue;
      }

      if (maxTextValue === undefined) {
        maxTextValue = this.sliderMaxValue;
      }

      // Same as above, although this can probably be abstracted..
      let sliderDistance = this.sliderMaxValue - this.sliderMinValue;
      let textDistance = maxTextValue - minTextValue;

      let position = this.getPosition(parseInt(this.textValue), minTextValue, maxTextValue);

      // With the position known, we should be able to calculate the 'position' on the text range..
      let input = Math.round((position / textDistance) * sliderDistance);
      this.fieldValue = this.sliderMinValue + input;

      this.$emit('value-changed', this.id, this.fieldValue);
    },

    getPosition(find, start, end) {
      // This really shouldn't exist, but I could find a way to get the position of a value between two numbers
      // without some quick iteration..
      for (let i = start, position = 0; i <= end; i++, position++) {
        if (i === find) {
          return position;
        }
      }
    },

    getSliderMinValue() {
      if (this.valueMap === undefined) {
        return this.sliderMinValue;
      }
      return 0;
    },

    getSliderMaxValue() {
      if (this.valueMap === undefined) {
        return this.sliderMaxValue;
      }
      return this.valueMap.length - 1;
    },

    isEditable() {
      return this.valueMap === undefined;
    },

    displayValue() {
      if (this.valueMap === undefined) {
        return undefined;
      }
      return this.valueMap[this.fieldValue];
    },

    setMouseDown() {
      let self = this;
      this.lastValue = this.fieldValue;

      this.timer = setInterval(() => {
        if (self.lastValue !== self.fieldValue) {
          this.$emit('value-changed', self.id, self.fieldValue);
          self.lastValue = self.fieldValue;
        }
      }, 5);
    },

    setMouseUp() {
      clearInterval(this.timer);

      // Emit the latest value..
      this.$emit('value-changed', this.id, this.fieldValue);
    }
  },

  computed: {
    minimumTextValue: function () {
      if (this.textMinValue === undefined) {
        return this.sliderMinValue;
      }
      return this.textMinValue;
    },

    maximumTextValue: function () {
      if (this.textMaxValue === undefined) {
        return this.sliderMaxValue;
      }
      return this.textMaxValue;
    },

    getValue() {
      return this.fieldValue;
    }
  },

  mounted() {
    this.fieldValue = this.sliderValue;
    this.calculateTextValue();
  },

  watch: {
    sliderValue: function () {
      this.fieldValue = this.sliderValue;
      this.calculateTextValue();
    }
  }
}
</script>

<style scoped>
#sliderBox {
  width: 90px;
  background-color: #353937;
}

.range {
  margin-top: 10px;
  margin-bottom: -10px;
  margin-left: 15px;
}
</style>
