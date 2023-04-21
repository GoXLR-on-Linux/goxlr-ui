<template>
  <div class="rotation-wrapper">
    <div class="rotation">
      <input id="slider" type="range" v-bind:style="getCurrentStyle" v-bind:min="minValue"
             v-bind:max="maxValue" v-bind:value="localFieldValue" v-on:input="update"
             v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" v-on:keydown="mouseDown" v-on:keyup="mouseUp"/>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "RangeSelector",

  data() {
    return {
      localFieldValue: 0,
    }
  },

  props: {
    height: {type: Number, required: false, default: 130},
    transform: {type: Number, required: false, default: -85},

    minValue: {type: Number, default: 0},
    maxValue: {type: Number, default: 100},
    currentFieldValue: Number,

    storePath: {type: String, required: true},
    id: {type: String, required: false, default: ""},

    colour: {type: String, required: false, default: "#82CFD0"},
    backgroundColour: {type: String, required: false, default: '#252927'}
  },

  methods: {
    mouseDown() {
      store.pausePatchPath(this.storePath);
      store.pause();
      this.$emit("mouse-down", this.id)
    },

    mouseUp() {
      this.$emit("mouse-up", this.id)
      store.resumePatchPath(this.storePath);
      store.resume();
    },

    update(e) {
      // Value has changed, emit something upwards..
      this.$emit("value-updated", e.target.value, this.id)
    }
  },

  watch: {
    currentFieldValue: function (newValue) {
      this.localFieldValue = newValue;
    },
  },


  computed: {
    getCurrentStyle() {
      // This code essentially adjusts the background position to keep it below the 'thumb'..
      let distance = this.maxValue - this.minValue;
      let position = 0;
      for (let i = this.minValue; i <= this.maxValue; i++, position++) {
        if (i === parseInt(this.localFieldValue)) {
          break;
        }
      }

      let width = (position / distance) * 100;

      return {
        background: 'linear-gradient(to right, ' + this.colour + '  0%, ' + this.colour + ' ' + width + '%, ' + this.backgroundColour + ' ' + width + '%, ' + this.backgroundColour + ' 100%)'
      }
    },
    heightString: {
      get() {
        return this.height + "px";
      },
    },
    transformString: {
      get() {
        return this.transform + "px";
      }
    }
  },
}
</script>

<style scoped>
#slider {
  background: linear-gradient(to right, v-bind(colour) 0%, v-bind(colour) 50%, v-bind(backgroundColour) 50%, v-bind(backgroundColour) 100%);

  border-radius: 2px;
  height: 3px;
  width: v-bind(heightString);
  outline: none;
  transition: background 450ms ease-in;
  -webkit-appearance: none;

  display: block;
}

input[type='range']::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background: v-bind(colour);
  -webkit-appearance: none;
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 7px;
  background: v-bind(colour);
  border: 0;
}

.rotation {
  transform: rotate(-90deg) translate(v-bind(transformString));
  z-index: -1;
}

.rotation-wrapper {
  height: v-bind(heightString);
  width: 90px;
}
</style>
