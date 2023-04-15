<template>
  <div class="rotation-wrapper">
    <div class="rotation">
      <input id="slider" type="range" v-bind:style="getCurrentStyle" v-bind:min="minValue"
             v-bind:max="maxValue" v-bind:value="localFieldValue" v-on:input="update"
             v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" v-on:keydown="mouseDown" v-on:keyup="mouseUp" />
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
    minValue: {type: Number, default: 0},
    maxValue: {type: Number, default: 100},
    currentFieldValue: Number,

    storePath: { type: String, required: true },
    id: {type: String, required: false, default: ""},

    colour: { type: String, required: false, default: "#82CFD0"}
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
        background: 'linear-gradient(to right, ' + this.colour + '  0%, ' + this.colour + ' ' + width + '%, #252927 ' + width + '%, #252927 100%)'
      }
    }
  },
}
</script>

<style scoped>
#slider {
  background: linear-gradient(to right, v-bind(colour) 0%, v-bind(colour) 50%, #252927 50%, #252927 100%);
  border: none;

  border-radius: 2px;
  height: 3px;
  width: 130px;
  outline: none;
  transition: background 450ms ease-in;
  -webkit-appearance: none;

  display: block;
}

input[type='range']::-webkit-slider-thumb  {
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
  transform: rotate(-90deg) translate(-85px);
  z-index: -1;
}

.rotation-wrapper {
  height: 130px;
  width: 90px;
}
</style>
