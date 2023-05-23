<template>
  <div v-for="n in 15" :key="n" style="" class="wrapper">
    <div class="dot" :class="{ top: isTop(n), bottom: !isTop(n) }"></div>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "FaderDots",

  props: {
    fader: {type: String, required: true},
    value: {type: Number, required: true},
  },

  methods: {
    isTop(index) {
      // Ok, work out where in our 15 we should stop rendering based on the percent..
      let stop = 16 - Math.ceil(this.value / 255 * 16);

      return index > stop;
    }
  },

  computed: {
    top() {
      return "#" + store.getActiveDevice().lighting.faders[this.fader].colours.colour_two;
    },

    bottom() {
      return "#" + store.getActiveDevice().lighting.faders[this.fader].colours.colour_one;
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.dot {
  width: 12px;
  height: 6px;
  margin-bottom: 12px;
  background-color: #fff;
}


.dot.top {
  background-color: v-bind(top)
}

.dot.bottom {
  background-color: v-bind(bottom)
}
</style>
