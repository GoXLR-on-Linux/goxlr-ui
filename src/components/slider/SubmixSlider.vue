<template>
  <div id="sliderBox">
    <Label v-bind:title="title" :text-colour="getLabelColour()"/>

    <div style="display: flex; flex-direction: row">
      <Range id="A" :current-field-value=fieldAValue :min-value="getSliderMinValue()" :max-value="getSliderMaxValue()"
             :store-path="storePath" @value-updated="sliderValueUpdated" @mouse-down="setMouseDown"
             @mouse-up="setMouseUp" style="margin-left: -12px" :height=115 :transform=-70 :title="getTitle('Ay')"
             :colour="getColour('A')" :reported-value="getTextValue('A')"/>

      <Range id="B" :current-field-value=fieldBValue :min-value="getSliderMinValue()" :max-value="getSliderMaxValue()"
             :store-path="storePath" @value-updated="sliderValueUpdated" @mouse-down="setMouseDown"
             @mouse-up="setMouseUp" style="margin-left: -32px;" :height=115 :transform=-70 :title="getTitle('B')"
             :colour="getColour('B')" :reported-value="getTextValue('B')"/>
    </div>

    <div class="link" style="" @click="toggleSubmixLinked" role="checkbox" aria-description="Link {{title}} Channels"
         :aria-checked="submixLinked" tabindex="0" :style="{ color: getLabelColour() }">
      <div v-if="submixLinked"><font-awesome-icon icon="fa-solid fa-link" /></div>
      <div v-else><font-awesome-icon icon="fa-solid fa-link-slash" /></div>
    </div>
    <div style="display: flex; flex-direction: row; margin-top: 5px">
      <Input id="A" :current-text-value="textAValue" :min-value="minimumTextValue" :max-value="maximumTextValue"
             :textSuffix="textSuffix"
             :override-value="displayValue()" :editable="isEditable()" @value-updated="inputValueUpdated"
             style="width: 60px;" :colour="getColour('A')" :title="getTitle('Ay')"
      />

      <Input id="B" :current-text-value="textBValue" :min-value="minimumTextValue" :max-value="maximumTextValue"
             :textSuffix="textSuffix"
             :override-value="displayValue()" :editable="isEditable()" @value-updated="inputValueUpdated"
             :colour="getColour('B')" style="width: 60px" :title="getTitle('B')"/>

    </div>
  </div>
</template>

<script>
import Input from "@/components/slider/components/Input.vue";
import Range from "@/components/slider/components/Range.vue";
import Label from "@/components/slider/components/Label.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "SubmixSlider",
  components: {FontAwesomeIcon, Input, Range, Label},

  data() {
    return {
      fieldAValue: 0,
      fieldBValue: 0,

      textAValue: 0,
      textBValue: 0,

      lastValue: 0,
      rangeSelected: undefined,
      timer: undefined,
    }
  },

  props: {
    id: {type: Number, default: -1},
    storePath: {type: String, required: true},

    title: {type: String, default: ""},

    sliderMinValue: Number,
    sliderMaxValue: Number,
    sliderAValue: Number,
    sliderBValue: Number,

    submixLinked: Boolean,

    textMinValue: Number,
    textMaxValue: Number,
    textSuffix: String,

    dimmed: {type: Boolean, required: false, default: false},

    valueMap: Array,
  },

  methods: {
    getTitle(id) {
      return this.title + " '" + id + "'";
    },

    getColour(id) {
      if (id === 'A') {
        return (this.dimmed) ? "#3b7679" : "#82CFD0";
      }
      return (this.dimmed) ? "#955218" : "#E07C24";
    },

    getLabelColour() {
      return (this.dimmed) ? "#838584" : "#fff";
    },

    getTextValue(id) {
      if (id === 'A') {
        return this.textAValue + "" + this.textSuffix;
      }
      return this.textBValue + "" + this.textSuffix;
    },

    sliderValueUpdated(newValue, id) {
      if (id === "A") {
        this.fieldAValue = parseInt(newValue);
      } else {
        this.fieldBValue = parseInt(newValue);
      }

      this.calculateTextValue(id);
    },

    inputValueUpdated(newValue, id) {
      // Webkit / Blink are interesting in that they wont prevent a user from entering an invalid
      // number, so we use this code to force any entry into our boundries.

      if (newValue > this.textMaxValue) {
        this.setCurrentTextValue(id, this.textMaxValue);
      } else if (newValue < this.textMinValue) {
        this.setCurrentTextValue(id, this.textMinValue);
      } else {
        this.setCurrentTextValue(id, newValue);
      }
      this.calculateFieldValue(id);
    },

    setCurrentTextValue(id, value) {
      if (id === 'A') {
        this.textAValue = value;
      } else {
        this.textBValue = value;
      }
    },

    calculateTextValue(id) {
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
      let current = (id === "A") ? parseInt(this.fieldAValue) : parseInt(this.fieldBValue);
      let position = this.getPosition(current, this.sliderMinValue, this.sliderMaxValue);

      // With the position known, we should be able to calculate the 'position' on the text range..
      let input = Math.round((position / sliderDistance) * textDistance);

      // Now set it..
      let value = minTextValue + input;

      if (id === "A") {
        this.textAValue = value;
      } else {
        this.textBValue = value;
      }
    },

    calculateFieldValue(id) {
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

      let value = (id === 'A') ? parseInt(this.textAValue) : parseInt(this.textBValue);
      let position = this.getPosition(value, minTextValue, maxTextValue);

      // With the position known, we should be able to calculate the 'position' on the text range..
      let input = Math.round((position / textDistance) * sliderDistance);

      if (id === 'A') {
        this.fieldAValue = this.sliderMinValue + input;
        this.$emit('value-changed', this.id, this.fieldAValue, id);
      } else {
        this.fieldBValue = this.sliderMinValue + input;
        this.$emit('value-changed', this.id, this.fieldBValue, id);
      }
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

    setMouseDown(id) {
      let self = this;
      this.lastValue = (id === 'A') ? this.fieldAValue : this.fieldBValue;
      this.rangeSelected = id;

      this.timer = setInterval(() => {
        let value = (self.rangeSelected === 'A') ? self.fieldAValue : self.fieldBValue;
        if (self.lastValue !== value) {
          this.$emit('value-changed', self.id, value, self.rangeSelected);
          self.lastValue = value;
        }
      }, 5);
    },

    setMouseUp() {
      clearInterval(this.timer);

      // Emit the latest value..
      let value = (this.rangeSelected === 'A') ? this.fieldAValue : this.fieldBValue;
      this.$emit('value-changed', this.id, value, this.rangeSelected);
    },

    toggleSubmixLinked() {
      this.$emit('submix-linked', this.id, !this.submixLinked);
    },

    setSubmixLinked(e) {
      this.$emit('submix-linked', this.id, e.target.checked);
    },
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
  },

  mounted() {
    this.fieldAValue = this.sliderAValue;
    this.fieldBValue = this.sliderBValue;
    this.calculateTextValue("A");
    this.calculateTextValue("B");
  },

  watch: {
    sliderAValue: function () {
      this.fieldAValue = this.sliderAValue;
      this.calculateTextValue("A");
    },
    sliderBValue: function () {
      this.fieldBValue = this.sliderBValue;
      this.calculateTextValue("B");
    }
  }

}
</script>

<style scoped>
#sliderBox {
  width: 120px;
  background-color: #353937;
}

.link {
  color: #fff;
  margin-top: 5px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}
</style>
