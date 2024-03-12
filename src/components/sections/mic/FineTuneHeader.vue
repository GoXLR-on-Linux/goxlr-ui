<template>
  <div style="margin-bottom: 8px;">
    <TextInput
        :min-value=getTextMinValue()
        :max-value=getTextMaxValue()
        :allow-float=true

        :current-text-value=getTextValue()
        :current-field-value=fieldValue
        :background-colour="backgroundColour"
        colour="#fff"
        :text-suffix="titleSuffix"
        @value-updated="inputValueUpdated"
    />
  </div>
  <div style="margin-bottom: 22px">
    <RangeSelector
        :store-path=storePath
        :min-value=minValue
        :max-value=maxValue
        :current-field-value="fieldValue"
        :background-colour="rangeBackgroundColour"

        :step="step"

        @value-updated="sliderValueUpdated"
        @mouse-down="setMouseDown"
        @mouse-up="setMouseUp"

        :needs-rotation="false" :height=80
        style="margin-left: 4px;"/>
  </div>
</template>

<script>
import RangeSelector from "@/components/slider/components/Range.vue";
import TextInput from "@/components/slider/components/Input.vue";
import {roundToStep} from "@/util/util";

export default {
  emits: ["value-changed"],

  name: "FineTuneHeader",
  components: {TextInput, RangeSelector},

  props: {
    id: {type: Number, required: true, default: -1},
    title: {type: String, required: true, default: "UNKNOWN"},
    titleSuffix: {type: String, required: true},

    colour: {type: String, required: false, default: "#82CFD0"},
    backgroundColour: {type: String, required: false, default: '#252927'},
    rangeBackgroundColour: {type: String, required: false, default: '#252927'},

    step: {type: Number, required: false, default: 1},

    storePath: {type: String, required: true},

    minValue: {type: Number, required: true},
    maxValue: {type: Number, required: true},

    currentValue: {type: Number, required: true},
  },

  data() {
    return {
      fieldValue: 0,
    }
  },

  methods: {
    sliderValueUpdated(newValue) {
      this.fieldValue = parseFloat(newValue);
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
    },

    getTextValue() {
      if (this.titleSuffix === this.$t('message.suffixes.kilohertz')) {
        return (this.fieldValue / 1000).toFixed(1);
      }
      return this.fieldValue.toFixed(1);
    },

    getTextMinValue() {
      if (this.titleSuffix === this.$t('message.suffixes.kilohertz')) {
        return (this.minValue / 1000);
      } else {
        return this.minValue;
      }
    },

    getTextMaxValue() {
      if (this.titleSuffix === this.$t('message.suffixes.kilohertz')) {
        return (this.maxValue / 1000);
      } else {
        return this.maxValue;
      }
    },


    inputValueUpdated(newValue) {
      let final = newValue;
      // Oddly enough, we're going to handle this here, rather than push up as it's some specialised code, firstly,
      // do we need to 'explode' the value?
      if (this.titleSuffix === "KHz") {
        final = parseFloat(newValue) * 1000;
      }

      // We need to round the final value to the nearest 'step'..
      final = roundToStep(final, this.step);

      this.fieldValue = final;
      this.$emit('value-changed', this.id, final);
    }
  },


  mounted() {
    this.fieldValue = this.currentValue;
  },

  watch: {
    currentValue: function () {
      this.fieldValue = this.currentValue;
    }
  }
}
</script>

<style scoped>
</style>
