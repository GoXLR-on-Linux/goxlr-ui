<template>
  <div class="header">{{ title }}</div>
  <div>
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

export default {
  emits: ["value-changed"],

  name: "FineTuneHeader",
  components: {RangeSelector},

  props: {
    id: {type: Number, required: true, default: -1},
    title: {type: String, required: true, default: "UNKNOWN"},

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
.header {
  padding: 10px 0;
  color: #fff;

  height: 10px;
  font-size: 10pt;

  text-transform: uppercase;
  text-align: center;
  font-stretch: condensed;
}

</style>
