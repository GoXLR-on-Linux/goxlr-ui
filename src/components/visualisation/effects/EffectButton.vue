<template>
  <div class="bank">{{ id }}</div>
</template>

<script>
import {store} from "@/store";
import {EffectLightingPresets, EffectPresets} from "@/util/mixerMapping";

export default {
  name: "EffectButton",
  props: {
    id: {type: Number, required: true}
  },

  methods: {
    getName() {
      return "EffectSelect" + this.id;
    }
  },

  computed: {
    bankColour() {

      let active = EffectLightingPresets[EffectPresets.indexOf(store.getActiveDevice().effects.active_preset)];

      // Similar to mute, grab the 'Active' Colour..
      let colour = store.getActiveDevice().lighting.buttons[this.getName()].colours.colour_one;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      let alpha = 1.0;

      let behaviour = store.getActiveDevice().lighting.buttons[this.getName()].off_style;
      if (active !== this.getName()) {
        // Check our behaviour..
        if (behaviour === "Dimmed") {
          alpha = 0.4;
        } else if (behaviour === "Colour2" || behaviour === "DimmedColour2") {
          let colour = store.getActiveDevice().lighting.buttons[this.getName()].colours.colour_two;
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
  margin-left: 4px;
  margin-bottom: 10px;
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

.bank.active {

}
</style>
