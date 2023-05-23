<template>
  <div style="position: relative; margin-left: 25px; margin-right: 25px">
    <div class="top-left" :class="{ blink: isRecording('TopLeft') }">
      <div class="button_main"/>
      <div class="button_horizontal"/>
      <div class="button_vertical"/>
    </div>
    <div class="top-right" :class="{ blink: isRecording('TopRight') }">
      <div class="button_horizontal"/>
      <div class="button_main"/>
      <div class="button_vertical"/>
    </div>
    <div class="bottom-left" :class="{ blink: isRecording('BottomLeft') }">
      <div class="button_horizontal"/>
      <div class="button_main"/>
      <div class="button_vertical"/>
    </div>
    <div class="bottom-right" :class="{ blink: isRecording('BottomRight') }">
    <div class="button_horizontal"/>
    <div class="button_main"/>
    <div class="button_vertical"/>
  </div>
  <div class="clear-button" :class="{ blink: isClearActive() }">Clear</div>
  </div>
</template>

<script>/**
 * It should be noted, all the sizes and positions here were carefully calculated based on the dimensions
 * of the actual buttons on the GoXLR. For the top Left button:
 *
 * Top: 30mm; Left: 23mm; Bottom: 17mm; Right Lower: 10mm; Right Upper: 13mm; Mid: 13mm
 *
 * The Clear Button was measured as 25mm x 15mm
 *
 * These millimeter values were then multiplied by 3 to give useful pixel values.
 *
 * A wrapper with the button name is created, and the three parts of the button (Main, Horizontal Spike, Vertical Spike)
 * are then positioned absolutely inside it, and styled to match the design of the button.
 *
 * These buttons are then wrapped inside another div, and positioned correctly to match their position on the GoXLR.
 *
 */
import {store} from "@/store";

export default {
  name: "SamplerButtons",

  methods: {
    getActiveName() {
      return "SamplerSelect" + store.getActiveDevice().sampler.active_bank;
    },

    getColour(button) {
      let active_bank = store.getActiveDevice().sampler.active_bank;
      let baseColour = store.getActiveDevice().lighting.sampler[this.getActiveName()].colours;
      let sampleState = store.getActiveDevice().sampler.banks[active_bank][button];

      if (sampleState.samples.length === 0 && !sampleState.is_recording) {
        let alpha = 0.4;
        if (baseColour.colour_three === "000000") {
          // In the case of black, we should keep the alpha strong
          alpha = 1.0;
        }

        return this.hexToRGBA(baseColour.colour_three, alpha);
      }

      let alpha = 0.4;
      if (sampleState.is_playing || sampleState.is_recording) {
        alpha = 1.0;
      }

      return this.hexToRGBA(baseColour.colour_one, alpha)
    },

    getBlinkColour() {
      let baseColour = store.getActiveDevice().lighting.sampler[this.getActiveName()].colours;
      return this.hexToRGBA(baseColour.colour_three, 1.0);
    },

    getBlinkColour2() {
      let baseColour = store.getActiveDevice().lighting.sampler[this.getActiveName()].colours;
      return this.hexToRGBA(baseColour.colour_one, 1.0);
    },

    isRecording(button) {
      let active_bank = store.getActiveDevice().sampler.active_bank;
      let sampleState = store.getActiveDevice().sampler.banks[active_bank][button];
      return sampleState.is_recording;
    },


    isClearActive() {
      return store.getActiveDevice().sampler.clear_active;
    },

    hexToRGBA(hex, alpha) {
      let red = parseInt(hex.substring(0, 2), 16);
      let green = parseInt(hex.substring(2, 4), 16);
      let blue = parseInt(hex.substring(4, 6), 16);

      return "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
    }
  },


  computed: {
    topLeftColour() {
      return this.getColour("TopLeft");
    },

    topRightColour() {
      return this.getColour("TopRight");
    },

    bottomLeftColour() {
      return this.getColour("BottomLeft");
    },

    bottomRightColour() {
      return this.getColour("BottomRight");
    },

    sampleBlinkColour() {
      return this.getBlinkColour();
    },

    sampleBlinkSecond() {
      return this.getBlinkColour2();
    },

    clearColour() {
      let baseColour = store.getActiveDevice().lighting.sampler[this.getActiveName()].colours;

      let alpha = 0.4;
      if (store.getActiveDevice().sampler.clear_active) {
        alpha = 1.0;
      }

      return this.hexToRGBA(baseColour.colour_one, alpha);
    },

    clearBlinkColour() {
      let baseColour = store.getActiveDevice().lighting.sampler[this.getActiveName()].colours;
      return this.hexToRGBA(baseColour.colour_three, 1.0);
    }
  }
}
</script>

<style scoped>
.button_main {
  position: absolute;
  width: 51px;
  height: 39px;
  box-sizing: border-box;
}

.button_horizontal {
  position: absolute;
  width: 39px;
  height: 39px;
  box-sizing: border-box;
}

.button_vertical {
  position: absolute;
  width: 51px;
  height: 30px;
  box-sizing: border-box;
}

.top-left {
  position: absolute;
  top: 10px;
  left: 10px;
}

.top-left > div {
  border: 2px solid v-bind(topLeftColour);
}

.top-left.blink > div {
  animation: sample-blink-animation 1s infinite;
}

.top-left .button_main {
  border-radius: 6px 0 0 0;
  border-bottom: none;
  border-right: none;
  left: 0;
  top: 0;
}

.top-left .button_horizontal {
  border-radius: 0 6px 6px 0;
  border-left: none;
  left: 51px;
  top: 0;
}

.top-left .button_vertical {
  border-radius: 0 0 6px 6px;
  border-top: none;
  left: 0;
  top: 39px;
}

.top-left.blink {
  animation: sample-blink-animation 1s infinite;
}

.top-right {
  position: absolute;
  top: 10px;
  left: 110px;
}

.top-right > div {
  border: 2px solid v-bind(topRightColour);
}

.top-right.blink > div {
  animation: sample-blink-animation 1s infinite;
}

.top-right .button_main {
  border-radius: 0 6px 0 0;
  border-bottom: none;
  border-left: none;
  left: 39px;
  top: 0;
}

.top-right .button_horizontal {
  border-radius: 6px 0 0 6px;
  border-right: none;
  left: 0;
  top: 0;
}

.top-right .button_vertical {
  border-radius: 0 0 6px 6px;
  border-top: none;
  left: 39px;
  top: 39px;
}



.bottom-left {
  position: absolute;
  top: 89px;
  left: 10px;
}

.bottom-left > div {
  border: 2px solid v-bind(bottomLeftColour);
}

.bottom-left.blink > div {
  animation: sample-blink-animation 1s infinite;
}

.bottom-left .button_main {
  border-radius: 0 0 0 6px;
  border-top: none;
  border-right: none;
  left: 0;
  top: 30px;
}

.bottom-left .button_horizontal {
  border-radius: 0 6px 6px 0;
  border-left: none;
  left: 51px;
  top: 30px;
}

.bottom-left .button_vertical {
  border-radius: 6px 6px 0 0;
  border-bottom: none;
  left: 0;
  top: 0;
}

.bottom-right {
  position: absolute;
  top: 89px;
  left: 110px;
}

.bottom-right > div {
  border: 2px solid v-bind(bottomRightColour);
}

.bottom-right.blink > div {
  animation: sample-blink-animation 1s infinite;
}

.bottom-right .button_main {
  border-radius: 0 0 6px 0;
  border-top: none;
  border-left: none;
  left: 39px;
  top: 30px;
}

.bottom-right .button_horizontal {
  border-radius: 6px 0 0 6px;
  border-right: none;
  left: 0;
  top: 30px;
}

.bottom-right .button_vertical {
  border-radius: 6px 6px 0 0;
  border-bottom: none;
  left: 39px;
  top: 0;
}



.clear-button {
  position: absolute;
  top: 56px;
  left: 70px;


  margin-bottom: 10px;
  margin-top: 4px;
  width: 60px;
  padding: 14px 4px;
  background-color: #030303;
  border-radius: 6px;
  border-color: v-bind(clearColour);
  border-width: 2px;
  border-style: solid;
  color: v-bind(clearColour);
  text-align: center
}

.clear-button.blink {
  animation: blink-animation 1s infinite;
}

@keyframes blink-animation {
  0%, 49% {
    border-color: v-bind(clearColour);
    color: v-bind(clearColour);
  }
  50%, 100% {
    border-color: v-bind(clearBlinkColour);
    color: v-bind(clearBlinkColour);
  }
}

@keyframes sample-blink-animation {
  0%, 49% {
    border-color: v-bind(sampleBlinkColour);
    color: v-bind(sampleBlinkColour);
  }
  50%, 100% {
    border-color: v-bind(sampleBlinkSecond);
    color: v-bind(sampleBlinkSecond);
  }
}


</style>
