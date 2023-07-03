<template>
  <div style="width: 70px; display: flex; flex-direction: column; padding: 3px; border: 1px solid #353937" @wheel="handleScroll">
    <div v-if="!isDeviceMini()" class="scribble"></div>
    <div style="display: flex; flex-direction: row">
      <div style="margin-left: 7px; margin-top: 20px;">
        <FaderDots :fader="fader" :value="getFaderValue()" />
      </div>
      <div>
        <FaderSlider :value="getFaderValue()"/>
      </div>
      <div style="margin-top: 20px;">
        <FaderDots :fader="fader" :value="getFaderValue()" />
      </div>
    </div>
    <div>
      <div class="mute" :class="{ blink: isMuteBlink() }">
        <font-awesome-icon icon="fa-solid fa-volume-xmark"/>
      </div>
    </div>
  </div>
</template>

<script>
import FaderDots from "@/components/visualisation/faders/FaderDots.vue";
import FaderSlider from "@/components/visualisation/faders/FaderSlider.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {store} from "@/store";
import {MuteButtonNamesForFader, ScribbleNames} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";

export default {
  name: "VisualisationFader",
  components: {FontAwesomeIcon, FaderSlider, FaderDots},

  props: {
    fader: {type: String, required: true}
  },

  methods: {
    isDeviceMini,
    getFaderValue() {
      // Firstly, we need to get the item assigned to this fader...
      let channel = this.getFaderChanel();

      // Get the current Volume value for that channel..
      return store.getActiveDevice().levels.volumes[channel];
    },

    getFaderChanel() {
      // Get current channel for fader
      return store.getActiveDevice().fader_status[this.fader].channel;
    },

    setFaderValue(volume) {
      // Get current channel for fader
      const channel = this.getFaderChanel();
      let command = undefined;

      // Submit new volume to websocket
      command = {
        "SetVolume": [
          channel,
          volume
        ]
      };
      websocket.send_command(store.getActiveSerial(), command);
      store.getActiveDevice().levels.volumes[channel] = volume;
    },

    isMuteBlink() {
      return store.getActiveDevice().fader_status[this.fader].mute_state === "MutedToAll";
    },

    handleScroll(e) {
      // Watch for scrolling over the fader
      const changeAmount = 10;
      // Detect the direction of scroll
      const increase = e.deltaY < 0;
      // Calculate the new volume
      const currentValue = this.getFaderValue();
      let newValue = increase ? currentValue + changeAmount : currentValue - changeAmount;

      if(newValue > 250) {
        newValue = 250;
      } else if(newValue < 0) {
        newValue = 0;
      }

      // Submit the updated value
      this.setFaderValue(newValue);
    },
  },

  computed: {
    scribbleColour() {
      if (isDeviceMini()) {
        return "#000";
      }

      return "#" + store.getActiveDevice().lighting.simple[ScribbleNames[this.fader]].colour_one;
    },

    muteColour() {
      // This is dependent on mute state and lighting settings, so lets take a look, firstly grab default colour
      let colour = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.fader]].colours.colour_one;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      let alpha = 1.0;


      let state = store.getActiveDevice().fader_status[this.fader].mute_state;
      let behaviour = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.fader]].off_style;
      if (state === "Unmuted") {
        // Check our behaviour..
        if (behaviour === "Dimmed") {
          alpha = 0.4;
        } else if (behaviour === "Colour2" || behaviour === "DimmedColour2") {
          let colour = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.fader]].colours.colour_two;
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

    inactiveColour() {
      let colour = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.fader]].colours.colour_two;
      let red = parseInt(colour.substring(0, 2), 16);
      let green = parseInt(colour.substring(2, 4), 16);
      let blue = parseInt(colour.substring(4, 6), 16);
      return "rgba(" + red + ", " + green + ", " + blue + ", 1)";
    }
  },
}
</script>

<style scoped>
.scribble {
  margin-left: 7px;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 56px;
  height: 32px;
  background-color: v-bind(scribbleColour);
}

.mute {
  margin-top: 20px;
  margin-left: 4px;
  margin-bottom: 7px;
  width: 57px;
  height: 24px;
  background-color: #030303;
  border-radius: 6px;
  border-color: v-bind(muteColour);
  border-width: 2px;
  border-style: solid;
  color: v-bind(muteColour);
  line-height: 26px;
  text-align: center
}

/**
 * This is a little obnoxious, but support blinking between the 'active' muteColour
 * and the inactive colour if the situations requires!
 */
.mute.blink {
  animation: blink-animation 1s infinite;
  -webkit-animation: blink-animation 1s infinite;
}

@keyframes blink-animation {
  0%,49% {
    border-color: v-bind(muteColour);
    color: v-bind(muteColour);
  }
  50%, 100% {
    border-color: v-bind(inactiveColour);
    color: v-bind(inactiveColour);
  }
}

@-webkit-keyframes blink-animation {
  0%,49% {
    border-color: v-bind(muteColour);
    color: v-bind(muteColour);
  }
  50%, 100% {
    border-color: v-bind(inactiveColour);
    color: v-bind(inactiveColour);
  }
}

</style>
