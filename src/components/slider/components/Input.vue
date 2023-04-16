<template>
  <div>
    <div v-if="!editable" class="sliderInput">
      <input type="text" v-on:blur="reset" :value="displayValue()" :min="minValue" :max="maxValue"
             :disabled="!editable"/>
      <div class="suffix"><span class="filler">{{ displayValue() }}</span><span v-html="getSuffix()"></span></div>
    </div>
    <div v-if="editable" class="sliderInput">
      <input type="number" v-on:input="update" v-on:blur="reset" v-model="localTextValue" :min="minValue"
             :max="maxValue" :disabled="!editable"/>
      <div class="suffix"><span class="filler">{{ localTextValue }}</span><span v-html="getSuffix()"></span></div>
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
      lastTextValue: 0
    }
  },

  props: {
    id: { type: String, required: false, default: "" },
    editable: Boolean,
    currentTextValue: Number,
    overrideValue: String,
    minValue: {type: Number, default: 0},
    maxValue: {type: Number, default: 100},
    textSuffix: {type: String, default: ""},
    colour: {type: String, required: false, default: '#59b1b6'}
  },

  methods: {
    getSuffix() {
      let output = "";
      for (let i = 0; i < this.textSuffix.length; i++) {
        output += "&nbsp;";
      }
      return output + this.textSuffix;
    },

    update(e) {
      let newValue = e.target.value;

      if (newValue === "-" || newValue === "") {
        // Cleared box, or starting negative value..
        return;
      }

      if (e.target.value > this.maxValue) {
        newValue = this.maxValue;
        this.localTextValue = this.maxValue;
      }

      if (e.target.value < this.minValue) {
        newValue = this.minValue;
        this.localTextValue = this.minValue;
      }

      // Value has changed, emit something upwards..
      this.$emit("value-updated", parseInt(newValue), this.id);
    },

    reset(e) {
      e.target.value = this.lastTextValue;
    },

    displayValue() {
      if (this.overrideValue !== undefined) {
        return this.overrideValue;
      }
      return this.localTextValue;
    },
  },

  watch: {
    currentTextValue: function (newValue) {
      this.localTextValue = newValue;
      this.lastTextValue = newValue;
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

  background-color: #3b413f;
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
