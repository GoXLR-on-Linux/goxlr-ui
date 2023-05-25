<template>
  <div style="display: flex; border: 1px solid #353937; flex-basis: fit-content;">
    <div class="input-button bleep">!@#$?*</div>
    <div class="input-button mute" :class="{ blink: isMuteBlink() }">
      <font-awesome-icon icon="fa-solid fa-microphone-slash"/>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "MuteVisualisationMini",

  methods: {
    // More duplication :(
    getBleepColour() {
      let is_pressed = store.getActiveDevice().button_down.Bleep;

      // This is dependent on mute state and lighting settings, so lets take a look, firstly grab default colour
      let colour = store.getActiveDevice().lighting.buttons.Bleep.colours.colour_one;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      let alpha = 1.0;

      let behaviour = store.getActiveDevice().lighting.buttons.Bleep.off_style;
      if (!is_pressed) {
        // Check our behaviour..
        if (behaviour === "Dimmed") {
          alpha = 0.4;
        } else if (behaviour === "Colour2" || behaviour === "DimmedColour2") {
          let colour = store.getActiveDevice().lighting.buttons.Bleep.colours.colour_two;
          red = parseInt(colour.substring(0, 2), 16);
          green = parseInt(colour.substring(2, 4), 16);
          blue = parseInt(colour.substring(4, 6), 16);

          if (behaviour === "DimmedColour2") {
            alpha = 0.4;
          }
        }
      }
      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    },

    getMuteColour() {
      // Again, some more copypasta, this time from FaderGroup..
      let colour = store.getActiveDevice().lighting.buttons.Cough.colours;
      let red = parseInt(colour.colour_one.substring(0, 2), 16);
      let green = parseInt(colour.colour_one.substring(2, 4), 16);
      let blue = parseInt(colour.colour_one.substring(4, 6), 16);
      let alpha = 1.0;


      let state = store.getActiveDevice().cough_button.state;
      let behaviour = store.getActiveDevice().lighting.buttons.Cough.off_style;
      if (state === "Unmuted") {
        // Check our behaviour..
        if (behaviour === "Dimmed") {
          alpha = 0.4;
        } else if (behaviour === "Colour2" || behaviour === "DimmedColour2") {
          let colour = colour.colour_two;
          red = parseInt(colour.substring(0, 2), 16);
          green = parseInt(colour.substring(2, 4), 16);
          blue = parseInt(colour.substring(4, 6), 16);

          if (behaviour === "DimmedColour2") {
            alpha = 0.4;
          }
        }
      }
      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    },

    isMuteBlink() {
      return store.getActiveDevice().cough_button.state === "MutedToAll";
    }
  },

  computed: {
    bleepButton() {
      return this.getBleepColour();
    },

    muteButton() {
      return this.getMuteColour();
    },

    inactiveColour() {
      let colour = store.getActiveDevice().lighting.buttons.Cough.colours.colour_two;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      return "rgba(" + red + ", " + green + ", " + blue + ", 1)";
    }
  }
}
</script>

<style scoped>
.input-button {
  margin: 14px calc(25% - 30px);
  width: 57px;
  height: 24px;
  background-color: #030303;
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  line-height: 26px;
  text-align: center
}

.input-button.bleep {
  border-color: v-bind(bleepButton);
  color: v-bind(bleepButton);
}

.input-button.mute {
  border-color: v-bind(muteButton);
  color: v-bind(muteButton);
}

.input-button.mute.blink {
  animation: blink-animation 1s infinite;
  -webkit-animation: blink-animation 1s infinite;
}

@keyframes blink-animation {
  0%,49% {
    border-color: v-bind(muteButton);
    color: v-bind(muteButton);
  }
  50%, 100% {
    border-color: v-bind(inactiveColour);
    color: v-bind(inactiveColour);
  }
}

@-webkit-keyframes blink-animation {
  0%,49% {
    border-color: v-bind(muteButton);
    color: v-bind(muteButton);
  }
  50%, 100% {
    border-color: v-bind(inactiveColour);
    color: v-bind(inactiveColour);
  }
}
</style>
