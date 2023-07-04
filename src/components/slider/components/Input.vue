<template>
  <div>
    <!--    <div v-if="!editable" class="sliderInput">-->
    <!--      <input type="text" v-on:blur="reset" :value="displayValue()" :min="minValue" :max="maxValue"-->
    <!--             :disabled="!editable" :aria-label="title" :aria-description="title" :aria-valuetext="getDisplayValue()"/>-->
    <!--      <div class="suffix"><span class="filler">{{ displayValue() }}</span><span v-html="getSuffix()"></span></div>-->
    <!--    </div>-->
    <div class="sliderInput">
      <input type="number" v-on:input="update" v-on:focus="focus" v-on:blur="reset" v-model="localTextValue"
             :min="minValue"
             :max="maxValue" :aria-label="title" :aria-description="title"
             :aria-valuetext="getDisplayValue()"/>
      <div class="suffix"><span class="filler">{{ displayValue() }}</span><span v-html="getSuffix()"></span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextInput",
  emits: ["value-updated"],

  data() {
    return {
      localTextValue: 0,
      lastTextValue: 0,

      focused: false,
    }
  },

  props: {
    id: {type: String, required: false, default: ""},
    editable: Boolean,
    currentTextValue: [Number, String],
    allowFloat: {type: Boolean, default: false},

    // Handlers for ValueMap..
    currentFieldValue: Number,
    valueMap: Array,

    // Handlers for Non ValueMaps..
    minValue: {type: Number, default: 0},
    maxValue: {type: Number, default: 100},

    // Display Related Settings
    textSuffix: {type: String, default: ""},
    colour: {type: String, required: false, default: '#59b1b6'},
    backgroundColour: {type: String, required: false, default: '#3b413f'},
    title: {type: String, required: false, default: ''},
  },

  methods: {

    getSuffix() {
      let output = "";
      for (let i = 0; i < this.textSuffix.length; i++) {
        output += "&nbsp;";
      }
      return output + this.textSuffix;
    },

    getDisplayValue() {
      return this.localTextValue + this.textSuffix;
    },

    update(e) {
      let newValue = e.target.value;

      if (newValue === "-" || newValue === "") {
        // Cleared box, or starting negative value..
        return;
      }

      if (this.valueMap !== undefined) {
        // We need to find the closest index which matches this value...
        let base = undefined;
        for (let i = 0; i < this.valueMap.length; i++) {
          if (this.valueMap[i] >= newValue) {
            // Ok, it's between this value and the previous..
            base = i;
            break;
          }
        }

        let result = 0;
        if (base === undefined) {
          // We got to the end of the loop, and this value was higher!
          result = this.valueMap.length - 1;
        } else if (base === 0) {
          // The first value higher was at the base of the list, do nothing.
          result = 0;
        } else if (this.valueMap[base] === newValue) {
          result = base;
        } else {
          let lower = this.valueMap[base - 1];
          let upper = this.valueMap[base];

          // Calculate which value this is nearest to..
          let middle = (upper - lower) / 2;
          let ours = newValue - lower;

          result = (ours < middle) ? base - 1 : base;
        }
        this.$emit("value-updated", result, this.id);
        return;
      }

      if (e.target.value > this.maxValue || e.target.value < this.minValue) {
        // We're outside the range of this input, don't trigger an event until either
        // blur, or we're inside.
        return;

      }

      // Value has changed, emit something upwards..
      let value = (this.allowFloat) ? parseFloat(newValue) : parseInt(newValue);
      this.$emit("value-updated", value, this.id);
    },

    focus() {
      this.focused = true;
    },

    reset(e) {
      this.focused = false;

      let newValue = e.target.value;
      if (!this.isNumber(newValue)) {
        this.localTextValue = this.lastTextValue;
        return;
      }

      if (e.target.value < this.minValue) {
        this.localTextValue = this.minValue;
        this.$emit("value-updated", this.minValue, this.id);
        return;
      }

      if (e.target.value > this.maxValue) {
        this.localTextValue = this.maxValue;
        this.$emit("value-updated", this.maxValue, this.id);
      }
    },

    isNumber(str) {
      // This isn't perfect, but will catch *MOST* cases where values aren't numbers..
      if (typeof str != "string") {
        return false;
      }
      return !isNaN(str) && !isNaN(parseFloat(str));
    },

    displayValue() {
      if (this.valueMap !== undefined) {
        return this.valueMap[this.currentFieldValue];
      }
      return this.localTextValue;
    },
  },

  watch: {
    currentFieldValue: function () {
      if (this.focused) {
        return;
      }

      if (this.valueMap !== undefined) {
        this.localTextValue = this.displayValue();
      }
    },

    currentTextValue: function (newValue) {
      if (this.focused) {
        return;
      }

      if (this.valueMap === undefined) {
        this.localTextValue = newValue;
        this.lastTextValue = newValue;
      } else {
        this.localTextValue = this.displayValue();
      }
    }
  },
}
</script>

<style scoped>

.sliderInput {
  position: relative;
}

/*
 * The key is to 'overlay' the suffix perfectly on top of the input box, then disable all mouse interactions
 * with it so mouse clicks go through. We can then render the suffix above it making it look in-line.
 */
.sliderInput .suffix {
  position: absolute;
  left: 0;
  top: 0;

  color: v-bind(colour);

  /* Prevent Mouse interactions */
  user-select: none;
  pointer-events: none;

  box-sizing: border-box;

  text-align: center;
  padding: 10px;
  width: 100%;
}

.sliderInput .suffix .filler {
  color: rgba(0, 0, 0, 0);
}

.sliderInput input[type=number], .sliderInput input[type=text] {
  font-family: LeagueMonoCondensed, sans-serif;

  background-color: v-bind(backgroundColour);
  color: v-bind(colour);
  padding: 10px;
  box-sizing: border-box;

  text-align: center;

  width: 100%;

  border: none;
  background-image: none;
  box-shadow: none;
  outline: none;

  -moz-appearance: textfield;
}

.sliderInput input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
