<template>
  <div style="display: flex; flex-direction: row; border: 1px solid #353937; margin-left: 10px;">
    <div class="banks">
      <div v-for="x in 6" :key="x">
        <EffectButton :id="x"/>
      </div>
    </div>
    <div style="text-align: center; margin-left: 20px">
      <div>
        <div style="display: flex; flex-direction: row; gap: 35px ">
          <div style="display: flex; flex-direction: column">
            <div style="width: 75px; height: 75px; background-color: #2f2f2f; margin: 8px"></div>
            <div>Reverb</div>
          </div>
          <div style="display: flex; flex-direction: column">
            <div style="width: 75px; height: 75px; background-color: #2f2f2f; margin: 8px"></div>
            <div>Pitch</div>
          </div>
        </div>
        <div style="display: flex; flex-direction: row; gap: 35px">
          <div style="display: flex; flex-direction: column">
            <div style="width: 75px; height: 75px; background-color: #2f2f2f; margin: 8px"></div>
            <div>Echo</div>
          </div>
          <div style="display: flex; flex-direction: column">
            <div style="width: 75px; height: 75px; background-color: #2f2f2f; margin: 8px"></div>
            <div>Gender</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right_button megaphone">Megaphone</div>
      <div class="right_button robot">Robot</div>
      <div class="right_button hardtune">HardTune</div>
      <div class="right_button fx">Fx</div>
    </div>
  </div>
</template>

<script>


import EffectButton from "@/components/visualisation/effects/EffectButton.vue";
import {store} from "@/store";

export default {
  name: "EffectsVisualisation",
  components: {EffectButton},

  methods: {
    getColour(colour1, colour2, off_style, active) {
      // This is dependent on mute state and lighting settings, so lets take a look, firstly grab default colour
      let colour = colour1;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      let alpha = 1.0;

      if (!active) {
        // Check our behaviour..
        if (off_style === "Dimmed") {
          alpha = 0.4;
        } else if (off_style === "Colour2" || off_style === "DimmedColour2") {
          let colour = colour2;
          red = parseInt(colour.substring(0, 2), 16);
          green = parseInt(colour.substring(2, 4), 16);
          blue = parseInt(colour.substring(4, 6), 16);

          if (off_style === "DimmedColour2") {
            alpha = 0.4;
          }
        }
      }
      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    }
  },

  computed: {
    /** TODO: Tidy this up, this code is appearing everywhere :p */
    megaphoneColour() {
      let colours = store.getActiveDevice().lighting.buttons.EffectMegaphone.colours;
      let off_style = store.getActiveDevice().lighting.buttons.EffectMegaphone.off_style;
      let active = store.getActiveDevice().effects.current.megaphone.is_enabled;

      return this.getColour(colours.colour_one, colours.colour_two, off_style, active);
    },
    robotColour() {
      let colours = store.getActiveDevice().lighting.buttons.EffectRobot.colours;
      let off_style = store.getActiveDevice().lighting.buttons.EffectRobot.off_style;
      let active = store.getActiveDevice().effects.current.robot.is_enabled;

      return this.getColour(colours.colour_one, colours.colour_two, off_style, active);
    },
    hardtuneColour() {
      let colours = store.getActiveDevice().lighting.buttons.EffectHardTune.colours;
      let off_style = store.getActiveDevice().lighting.buttons.EffectHardTune.off_style;
      let active = store.getActiveDevice().effects.current.hard_tune.is_enabled;

      return this.getColour(colours.colour_one, colours.colour_two, off_style, active);
    },
    fxColour() {
      let colours = store.getActiveDevice().lighting.buttons.EffectFx.colours;
      let off_style = store.getActiveDevice().lighting.buttons.EffectFx.off_style;
      let active = store.getActiveDevice().effects.is_enabled;

      return this.getColour(colours.colour_one, colours.colour_two, off_style, active);
    }
  }
}
</script>

<style scoped>
.banks {
  margin-left: 7px;
  margin-top: 6px;
}

.right {
  margin-top: 3px;
  margin-left: 20px;
  margin-right: 10px;
}

.right_button {
  margin-bottom: 10px;
  margin-top: 4px;
  width: 100px;
  padding: 10px 4px;
  background-color: #030303;
  border-radius: 6px;
  border-color: v-bind(bankColour);
  border-width: 2px;
  border-style: solid;
  color: v-bind(bankColour);
  text-align: center
}

.right_button.fx {
  padding-top: 17px;
  padding-bottom: 17px;

  border-color: v-bind(fxColour);
  color: v-bind(fxColour);
}

.right_button.megaphone {
  border-color: v-bind(megaphoneColour);
  color: v-bind(megaphoneColour);
}

.right_button.robot {
  border-color: v-bind(robotColour);
  color: v-bind(robotColour);
}

.right_button.hardtune {
  border-color: v-bind(hardtuneColour);
  color: v-bind(hardtuneColour);
}

</style>
