<template>
  <div class="bank">{{ getBank() }}</div>
</template>

<script>
/**
 * Not gonna lie, this is mostly lifted from EffectButton.vue, their behaviours are pretty much the same, but
 * the data sources are wildly different.. I *DO* need to go through and clean some of this up, because there
 * are simply a lot of places where the behaviours are similar, and centralising them would make life less painful.
 */

import {store} from "@/store";

export default {
  name: "SampleBank",
  props: {
    id: {type: Number, required: true}
  },

  methods: {
    getName() {
      return "SamplerSelect" + this.getBank();
    },

    getBank() {
      if (this.id === 1) return "A";
      if (this.id === 2) return "B";
      if (this.id === 3) return "C";
    }
  },

  computed: {
    bankColour() {
      let active = store.getActiveDevice().sampler.active_bank === this.getBank();

      // Similar to mute, grab the 'Active' Colour..
      let colour = store.getActiveDevice().lighting.sampler[this.getName()].colours.colour_one;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      let alpha = 1.0;


      let behaviour = store.getActiveDevice().lighting.sampler[this.getName()].off_style;
      if (!active) {
        // Check our behaviour..
        if (behaviour === "Dimmed") {
          alpha = 0.4;
        } else if (behaviour === "Colour2" || behaviour === "DimmedColour2") {
          let colour = store.getActiveDevice().lighting.sampler[this.getName()].colours.colour_two;
          red = parseInt(colour.substring(0, 2), 16);
          green = parseInt(colour.substring(2, 4), 16);
          blue = parseInt(colour.substring(4, 6), 16);

          if (behaviour === "DimmedColour2") {
            alpha = 0.4;
          }
        }
      }
      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    }
  }
}
</script>

<style scoped>
.bank {
  padding-top: 3px;
  padding-bottom: 3px;
  margin-left: 4px;
  margin-bottom: 18px;
  margin-top: 4px;
  width: 50px;
  height: 20px;
  line-height: 22px;
  background-color: #030303;
  border-radius: 6px;
  border-color: v-bind(bankColour);
  border-width: 2px;
  border-style: solid;
  color: v-bind(bankColour);
  text-align: center
}
</style>
