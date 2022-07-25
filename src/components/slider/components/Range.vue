<template>
  <div class="rotation-wrapper">
    <div class="rotation">
      <input id="slider" type="range" v-bind:style="getCurrentStyle" v-model="localFieldValue" v-bind:min="minValue"
             v-bind:max="maxValue" v-on:input="update" v-on:mousedown="stopUpdates" v-on:mouseup="resumeUpdates"/>
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
  },

  methods: {
    stopUpdates() {
      store.pause();
    },

    resumeUpdates() {
      store.resume();
    },

    update(e) {
      // Value has changed, emit something upwards..
      this.$emit("value-updated", e.target.value)
    }
  },

  watch: {
    currentFieldValue: function (newValue) {
      this.localFieldValue = newValue;
    }
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
        background: 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + width + '%, #252927 ' + width + '%, #252927 100%)'
      }
    }
  },
}
</script>

<style scoped>
#slider {
  background: linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #252927 50%, #252927 100%);
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
  background: #82CFD0;
  -webkit-appearance: none;
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 7px;
  background: #82CFD0;
  border: 0;
}

.rotation {
  transform: rotate(-90deg) translate(-85px);
  z-index: -1;
}

.rotation-wrapper {
  height: 130px;
}
</style>