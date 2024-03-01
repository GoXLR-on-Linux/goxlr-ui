<template>
  <div id="goxlr-visualiser" @wheel="handleScroll" v-html="getGoXLRSvg()" />
</template>

<script>
import {store} from "@/store";
import {EffectLightingPresets, EffectPresets, MuteButtonNamesForFader} from "@/util/mixerMapping";
import {getBaseHTTPAddress, websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";

import GoXLRFull from "@/assets/preview/GoXLR.svg?raw";
import GoXLRMini from "@/assets/preview/GoXLR-Mini.svg?raw";

export default {
  name: "GoXLRVisualiser",
  methods: {
    getGoXLRSvg() {
      return (isDeviceMini()) ? GoXLRMini : GoXLRFull;
    },

    // transforms a HEX string into a colour object.
    transformColour(colour) {
      let r = parseInt(colour.substring(0, 2), 16);
      let g = parseInt(colour.substring(2, 4), 16);
      let b = parseInt(colour.substring(4, 6), 16);
      return { r, g, b};
    },
    // calculate the colour at a given position in a gradient with two points
    calculateGradientColour(startColour, endColour, position) {
      return {
        r: Math.round(startColour.r + (endColour.r - startColour.r) * position),
        g: Math.round(startColour.g + (endColour.g - startColour.g) * position),
        b: Math.round(startColour.b + (endColour.b - startColour.b) * position),
      }
    },
    // gets the modified off-style colour
    getOffStyleColour(state, colour, colour2) {
      switch (state) {
        case "Dimmed":
          return `rgba(${colour.r}, ${colour.g}, ${colour.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colour2.r}, ${colour2.g}, ${colour2.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colour2.r}, ${colour2.g}, ${colour2.b}, 0.4)`;
        default:
          return `rgba(${colour.r}, ${colour.g}, ${colour.b}, 1)`;
      }
    },
    // sets or unsets the .blink class
    setBlinkClass(selector, isBlinking) {
      const elem = document.querySelector(selector);
      if (elem === null) return;

      if (isBlinking) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    // checks if one of the sample buttons is recording
    isSampleRecording(sample) {
      let activeBank = store.getActiveDevice().sampler.active_bank;
      let sampleState = store.getActiveDevice().sampler.banks[activeBank][sample];
      return sampleState.is_recording;
    },

    // Gets the URL of a specified scribble
    getScribbleUrl(fader) {
      if (isDeviceMini()) {
        return ""
      }

      // We need to cheese this slightly, if the user changes the settings, we need to note that
      // they've changed, so we just spam all of the options as query parameters, which will change.
      let scribble = store.getActiveDevice().fader_status[fader].scribble;
      let query = `?i=${scribble.file_name}&b=${scribble.bottom_text}&l=${scribble.left_text}&in=${scribble.inverted}`;
      return getBaseHTTPAddress() + "files/scribble/" + store.getActiveSerial() + "/" + fader + ".png" + query;
    },

    computeAccentColour() {
      return `#${store.getActiveDevice().lighting.simple.Accent.colour_one}`;
    },

    computeMixerFaderPosition(fader) {
      const channel = store.getActiveDevice().fader_status[fader].channel,
          faderPosition = store.getActiveDevice().levels.volumes[channel];

      let height = 110;
      let transform = Math.ceil(height / 255 * faderPosition);
      return `translateY(-${transform}pt)`
    },
    computeMixerLevelColour(fader, level) {
      const channel = store.getActiveDevice().fader_status[fader].channel,
          volume = store.getActiveDevice().levels.volumes[channel],
          colours = store.getActiveDevice().lighting.faders[fader].colours,
          topColour = this.transformColour(colours.colour_one),
          bottomColour = this.transformColour(colours.colour_two),
          indicatorDots = 15,
          offset = 0.25; // required to correctly align fader to indicators.

      const computedLevel = Math.ceil(indicatorDots / 255 * volume + offset);
      switch (store.getActiveDevice().lighting.faders[fader].style) {
        case "GradientMeter": // TODO: implement meter visualization
        case "Gradient":
          if (level >= computedLevel) return `rgb(0,0,0)`;
          // eslint-disable-next-line no-case-declarations
          let gradientColour = this.calculateGradientColour(bottomColour, topColour, level / indicatorDots );
          return `rgb(${gradientColour.r}, ${gradientColour.g}, ${gradientColour.b})`;

        case "TwoColour":
        default:
          if (level >= computedLevel)
            return `rgb(${topColour.r}, ${topColour.g}, ${topColour.b})`;
          else
            return `rgb(${bottomColour.r}, ${bottomColour.g}, ${bottomColour.b})`;
      }

    },
    computeMixerMuteColour(fader) {
      const colours = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[fader]].colours,
          offStyle = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[fader]].off_style,
          state = store.getActiveDevice().fader_status[fader].mute_state,
          colourOne = this.transformColour(colours.colour_one),
          colourTwo = this.transformColour(colours.colour_two);

      if (state !== "Unmuted")
        return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      return this.getOffStyleColour(offStyle, colourOne, colourTwo);
    },
    computeMixerMuteBlinkColour(fader) {
      return '#' + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[fader]].colours.colour_two;
    },
    isMixerMuteBlinking(fader) {
      return store.getActiveDevice().fader_status[fader].mute_state === "MutedToAll";
    },
    computeMixerDisplayColour(display) {
      if (isDeviceMini()) {
        return '#000';
      }
      return '#' + store.getActiveDevice().lighting.simple[`Scribble${display}`].colour_one;
    },

    computeCoughButtonColour() {
      const colours = store.getActiveDevice().lighting.buttons.Cough.colours,
          offStyle = store.getActiveDevice().lighting.buttons.Cough.off_style,
          colourOne = this.transformColour(colours.colour_one),
          colourTwo = this.transformColour(colours.colour_two);

      if ("Unmuted" !== store.getActiveDevice().cough_button.state)
        return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      return this.getOffStyleColour(offStyle, colourOne, colourTwo);
    },
    computeBleepButtonColour() {
      const colours = store.getActiveDevice().lighting.buttons.Bleep.colours,
          isPressed = store.getActiveDevice().button_down.Bleep,
          offStyle = store.getActiveDevice().lighting.buttons.Bleep.off_style,
          colourOne = this.transformColour(colours.colour_one),
          colourTwo = this.transformColour(colours.colour_two);

      if (isPressed) return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      return this.getOffStyleColour(offStyle, colourOne, colourTwo);
    },

    computeEffectButtonColour(effectButtonName, effectStateName) {
      if (isDeviceMini()) {
        return `rgb(0,0,0,1)`;
      }

      const colours = store.getActiveDevice().lighting.buttons[effectButtonName].colours,
          offStyle = store.getActiveDevice().lighting.buttons[effectButtonName].off_style,
          active = (effectStateName) === null ? store.getActiveDevice().effects.is_enabled : store.getActiveDevice().effects.current[effectStateName].is_enabled,
          colourOne = this.transformColour(colours.colour_one),
          colourTwo = this.transformColour(colours.colour_two);

      if (active) return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      return this.getOffStyleColour(offStyle, colourOne, colourTwo);
    },
    computeEffectPresetColour(presetIndex) {
      if (isDeviceMini()) {
        return `rgba(0,0,0,1)`;
      }

      const colours = store.getActiveDevice().lighting.buttons[`EffectSelect${presetIndex}`].colours,
          offStyle = store.getActiveDevice().lighting.buttons[`EffectSelect${presetIndex}`].off_style,
          activePreset = EffectLightingPresets[EffectPresets.indexOf(store.getActiveDevice().effects.active_preset)],
          colourOne = this.transformColour(colours.colour_one),
          colourTwo = this.transformColour(colours.colour_two);

      if (activePreset === `EffectSelect${presetIndex}`)
        return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      return this.getOffStyleColour(offStyle, colourOne, colourTwo);
    },

    computeEncoderRotation(effectName, centerMode = false) {
      if (isDeviceMini()) {
        return `rotate(0deg)`;
      }

      const effectAmount = store.getActiveDevice().effects.current[effectName].amount,
          hardTuneActive = store.getActiveDevice().effects.current.hard_tune.is_enabled,
          transformRotationLimit = 270;

      // basic encoders
      if (!centerMode)
        return `rotate(${Math.ceil(transformRotationLimit / 100 * effectAmount)}deg)`;

      // hard tune is disabled
      if (!hardTuneActive)
        return `rotate(${Math.ceil(transformRotationLimit / 60 * effectAmount)}deg)`;

      switch (Math.sign(effectAmount)) {
        case 1:
          return `rotate(${Math.ceil(transformRotationLimit / 4 * effectAmount)}deg)`;
        case -1:
          return `rotate(-${Math.ceil(transformRotationLimit / 4 * (effectAmount * -1))}deg)`;
        default:
          return `rotate(0deg)`;
      }
    },
    computeEncoderColour(effectName) {
      if (isDeviceMini()) {
        return "#000";
      }

      return `#${store.getActiveDevice().lighting.encoders[effectName].colour_three}`;
    },
    computeEncoderLevelColour(effectEncoderName, effectLightingName, indicatorLevel, centerMode = false) {
      if (isDeviceMini()) {
        return "#000";
      }

      const colours = store.getActiveDevice().lighting.encoders[effectLightingName],
        effectAmount = store.getActiveDevice().effects.current[effectEncoderName].raw_encoder,
        maxLevel = 12;  // the goxlr only has 12 levels as the first one is always on

      // set the maximum effect range
      let effectLevelRange = (centerMode ? 48 : 24);

      if (effectEncoderName === "pitch") {
        const hardTuneActive = store.getActiveDevice().effects.current.hard_tune.is_enabled;
        const encoderStyle = store.getActiveDevice().effects.current[effectEncoderName].style;
        if (hardTuneActive) {
          effectLevelRange = (encoderStyle === "Narrow") ? 2 : 4;
        }
      }

      // very high iq math that is definitely not a workaround
      const currentLevel = (maxLevel / effectLevelRange * effectAmount) + (centerMode ? 0 : 1);
      const normalizedCurrentLevel = currentLevel > 0 ? Math.ceil(currentLevel) : Math.floor(currentLevel);

      if (centerMode) {
        if (normalizedCurrentLevel >= 0 && indicatorLevel >= 0 && normalizedCurrentLevel > indicatorLevel)
          return `#${colours.colour_one}`;
        else if (normalizedCurrentLevel <= 0 && indicatorLevel <= 0 && normalizedCurrentLevel < indicatorLevel)
          return `#${colours.colour_two}`;
        else if (normalizedCurrentLevel === indicatorLevel)
          return `#fff`;
        else
          return `#000`;
      }
      else
      {
        if (normalizedCurrentLevel < indicatorLevel)
          return `#${colours.colour_one}`;
        else if (normalizedCurrentLevel > indicatorLevel)
          return `#${colours.colour_two}`;
        else if (normalizedCurrentLevel === indicatorLevel)
          return `#fff`;
        else
          return `#000`;
      }
    },

    computeSamplerBankColour(bank) {
      if (isDeviceMini()) {
        return `rgb(0,0,0)`;
      }

      const active = store.getActiveDevice().sampler.active_bank === bank,
        colours = store.getActiveDevice().lighting.sampler[`SamplerSelect${bank}`].colours,
        offStyle = store.getActiveDevice().lighting.sampler[`SamplerSelect${bank}`].off_style,
        colourOne = this.transformColour(colours.colour_one),
        colourTwo = this.transformColour(colours.colour_two);

      if (active) return `rgb(${colourOne.r}, ${colourOne.g}, ${colourOne.b})`;

      return this.getOffStyleColour(offStyle, colourOne, colourTwo);
    },
    computeSamplerSampleColour(button) {
      if (isDeviceMini()) {
        return `rgb(0,0,0)`;
      }

      const activeBank = store.getActiveDevice().sampler.active_bank,
          colours = store.getActiveDevice().lighting.sampler[`SamplerSelect${activeBank}`].colours,
          sampleState = store.getActiveDevice().sampler.banks[activeBank][button],
          colourOne = this.transformColour(colours.colour_one),
          colourThree = this.transformColour(colours.colour_three),
          dimMin = 125; // min-brightness if empty colour set to black (aka. disable lighting)

      if (sampleState.samples.length === 0) {
        // set to somewhat gray-ish colour if set to a very dark colour
        if(colourThree.r < dimMin && colourThree.r === colourThree.g && colourThree.g === colourThree.b && colourThree.g === colourThree.b)
          return `rgba(${dimMin}, ${dimMin}, ${dimMin}, 0.4)`
        else
          return `rgba(${colourThree.r}, ${colourThree.g}, ${colourThree.b}, 0.4)`;
      }

      if (sampleState.is_playing || sampleState.is_recording)
        return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 0.4)`;
    },
    computeSamplerBlinkColour(colourState) {
      if (isDeviceMini()) {
        return `rgba(0,0,0,1)`;
      }

      const activeBank = store.getActiveDevice().sampler.active_bank,
          colours = store.getActiveDevice().lighting.sampler[`SamplerSelect${activeBank}`].colours,
          colourOne = this.transformColour(colours.colour_one),
          colourThree = this.transformColour(colours.colour_three),
          dimMin = 125; // min-brightness if empty colour set to black (aka. disable lighting)

      if (colourState === 1) return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;

      // set to somewhat gray-ish colour if set to a very dark colour
      if(colourThree.r < dimMin && colourThree.r === colourThree.g && colourThree.g === colourThree.b && colourThree.g === colourThree.b)
        return `rgba(${dimMin}, ${dimMin}, ${dimMin}, 0.4)`
      else
        return `rgba(${colourThree.r}, ${colourThree.g}, ${colourThree.b}, 0.4)`;
    },
    computeSamplerClearColour(colourState) {
      if (isDeviceMini()) {
        return `rgba(0,0,0,1)`;
      }

      const activeBank = store.getActiveDevice().sampler.active_bank,
          colours = store.getActiveDevice().lighting.sampler[`SamplerSelect${activeBank}`].colours,
          colourOne = this.transformColour(colours.colour_one);

      if (colourState === 1)
        return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 1)`;
      else
        return `rgba(${colourOne.r}, ${colourOne.g}, ${colourOne.b}, 0.4)`;
    },

    faderFromChannel(channel) {
      const channels = {
        "Channel1": "A",
        "Channel2": "B",
        "Channel3": "C",
        "Channel4": "D",
      }

      return channels[channel];
    },

    handleScroll(e) {
      const increase = e.deltaY < 0;
      let isWithinScrollDiv = false;
      let element = e.target;

      // Check what the user is hovering over
      while (element) {
        if (element.id.includes('Channel')) {
          isWithinScrollDiv = true;
          break;
        }
        element = element.parentElement;
      }

      if(isWithinScrollDiv) {
        // Get the current volume and calculate the new one
        const changeAmount = 10;
        const faderName = this.faderFromChannel(element.id);
        const activeDevice = store.getActiveDevice();
        const channelName = activeDevice.fader_status[faderName].channel;
        const currentLevel = activeDevice.levels.volumes[channelName];
        let newValue = increase ? currentLevel + changeAmount : currentLevel - changeAmount;

        // Cap at 0 and 255
        if (newValue > 255) {
          newValue = 255;
        } else if(newValue < 0) {
          newValue = 0;
        }

        // Set the new volume
        return this.setChannelValue(channelName, newValue);
      }
    },

    setChannelValue(channel, volume) {
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
  },
  computed: {
    // variables required for watch
    isTopLeftSampleRecording() { if (isDeviceMini()) {return false;} return this.isSampleRecording("TopLeft"); },
    isTopRightSampleRecording() { if (isDeviceMini()) {return false;}return this.isSampleRecording("TopRight"); },
    isBottomLeftSampleRecording() { if (isDeviceMini()) {return false;}return this.isSampleRecording("BottomLeft"); },
    isBottomRightSampleRecording() { if (isDeviceMini()) {return false;} return this.isSampleRecording("BottomRight"); },
    isClearActive() { if (isDeviceMini()) {return false;} return store.getActiveDevice().sampler.clear_active; },
    isFader1Blinking() { return store.getActiveDevice().fader_status["A"].mute_state === "MutedToAll"; },
    isFader2Blinking() { return store.getActiveDevice().fader_status["B"].mute_state === "MutedToAll"; },
    isFader3Blinking() { return store.getActiveDevice().fader_status["C"].mute_state === "MutedToAll"; },
    isFader4Blinking() { return store.getActiveDevice().fader_status["D"].mute_state === "MutedToAll"; },
    isMuteBlinking() { return store.getActiveDevice().cough_button.state === "MutedToAll"; },

    isDeviceMini() { return store.getActiveDevice().hardware.device_type === "Mini"; },
    muteInactiveColour() { return '#' + store.getActiveDevice().lighting.buttons.Cough.colours.colour_two; },

    getFader1Scribble() { return this.getScribbleUrl("A"); },
    getFader2Scribble() { return this.getScribbleUrl("B"); },
    getFader3Scribble() { return this.getScribbleUrl("C"); },
    getFader4Scribble() { return this.getScribbleUrl("D"); },
  },
  watch: {
    // toggle .blink class if required
    isTopLeftSampleRecording(active) { this.setBlinkClass(".sampler #TopLeft", active); },
    isTopRightSampleRecording(active) { this.setBlinkClass(".sampler #TopRight", active); },
    isBottomLeftSampleRecording(active) { this.setBlinkClass(".sampler #BottomLeft", active); },
    isBottomRightSampleRecording(active) { this.setBlinkClass(".sampler #BottomRight", active); },
    isClearActive(active) { this.setBlinkClass(".sampler #Clear", active); },
    isMuteBlinking(active) { this.setBlinkClass(".cough #Mute", active); },
    isFader1Blinking(active) { this.setBlinkClass("#Channel1 #Mute", active); },
    isFader2Blinking(active) { this.setBlinkClass("#Channel2 #Mute", active); },
    isFader3Blinking(active) { this.setBlinkClass("#Channel3 #Mute", active); },
    isFader4Blinking(active) { this.setBlinkClass("#Channel4 #Mute", active); },

    getFader1Scribble(url) { document.querySelector(".mixer > #Channel1 > .display > #Image").setAttribute("href", this.getScribbleUrl("A")); },
    getFader2Scribble(url) { document.querySelector(".mixer > #Channel2 > .display > #Image").setAttribute("href", this.getScribbleUrl("B")); },
    getFader3Scribble(url) { document.querySelector(".mixer > #Channel3 > .display > #Image").setAttribute("href", this.getScribbleUrl("C")); },
    getFader4Scribble(url) { document.querySelector(".mixer > #Channel4 > .display > #Image").setAttribute("href", this.getScribbleUrl("D")); },
  },
  mounted() {
    if (isDeviceMini()) {
      return;
    }

    // Set the initial display URLs..
    document.querySelector(".mixer > #Channel1 > .display > #Image").setAttribute("href", this.getScribbleUrl("A"));
    document.querySelector(".mixer > #Channel2 > .display > #Image").setAttribute("href", this.getScribbleUrl("B"));
    document.querySelector(".mixer > #Channel3 > .display > #Image").setAttribute("href", this.getScribbleUrl("C"));
    document.querySelector(".mixer > #Channel4 > .display > #Image").setAttribute("href", this.getScribbleUrl("D"));

  }
}
</script>

<style>
#goxlr-visualiser {
  height: 408px;
}

#goxlr-visualiser #GoXLR { width: 100%; height: 100%; }
#goxlr-visualiser #Logo { color: v-bind("computeAccentColour()"); }

@font-face {
  font-family: "ropa-sans-regular";
  src:url("@/assets/RopaSans-Regular.ttf") format("truetype");
  font-display:auto;font-style:normal;font-weight:400;font-stretch:normal;
}

/* animations */
@keyframes sampler-sample-blink-animation {
  0%, 49% { color: v-bind('computeSamplerBlinkColour(1)'); }
  50%, 100% { color: v-bind('computeSamplerBlinkColour(2)'); }
}
@keyframes sampler-clear-blink-animation {
  0%, 49% { color: v-bind('computeSamplerClearColour(1)'); }
  50%, 100% { color: v-bind('computeSamplerClearColour(2)'); }
}
@keyframes mute-blink-animation {
  0%, 49% { color: v-bind('computeCoughButtonColour()'); }
  50%, 100% { color: v-bind('muteInactiveColour'); }
}
@keyframes fader1-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("A")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("A")'); }
}
@keyframes fader2-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("B")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("B")'); }
}
@keyframes fader3-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("C")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("C")'); }
}
@keyframes fader4-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("D")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("D")'); }
}

/* cough area */
#goxlr-visualiser .cough #Mute { color: v-bind('computeCoughButtonColour()'); }
#goxlr-visualiser .cough #Mute.blink { animation: mute-blink-animation 1s infinite; }
#goxlr-visualiser .cough #Bleep { color: v-bind('computeBleepButtonColour()'); }

/* selection overlay */
/* TODO: disabled due to missing implementation */
.selection { display: none; }

/* effects area: buttons */
#goxlr-visualiser .effects .buttons #Megaphone { color: v-bind('computeEffectButtonColour("EffectMegaphone", "megaphone")'); }
#goxlr-visualiser .effects .buttons #Robot { color: v-bind('computeEffectButtonColour("EffectRobot", "robot")'); }
#goxlr-visualiser .effects .buttons #HardTune { color: v-bind('computeEffectButtonColour("EffectHardTune", "hard_tune")'); }
#goxlr-visualiser .effects .buttons #FX { color: v-bind('computeEffectButtonColour("EffectFx", null)'); }
#goxlr-visualiser .effects .presets #Preset1 { color: v-bind('computeEffectPresetColour(1)'); }
#goxlr-visualiser .effects .presets #Preset2 { color: v-bind('computeEffectPresetColour(2)'); }
#goxlr-visualiser .effects .presets #Preset3 { color: v-bind('computeEffectPresetColour(3)'); }
#goxlr-visualiser .effects .presets #Preset4 { color: v-bind('computeEffectPresetColour(4)'); }
#goxlr-visualiser .effects .presets #Preset5 { color: v-bind('computeEffectPresetColour(5)'); }
#goxlr-visualiser .effects .presets #Preset6 { color: v-bind('computeEffectPresetColour(6)'); }

/* effects area: reverb encoder */
#goxlr-visualiser .effects .encoders .reverb #Encoder {
  transform: v-bind('computeEncoderRotation("reverb")');
  color: v-bind('computeEncoderColour("Reverb")');
}
#goxlr-visualiser .effects .encoders .reverb .level #Level1 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 1)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level2 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 2)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level3 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 3)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level4 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 4)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level5 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 5)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level6 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 6)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level7 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 7)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level8 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 8)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level9 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 9)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level10 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 10)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level11 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 11)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level12 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 12)'); }
#goxlr-visualiser .effects .encoders .reverb .level #Level13 { color: v-bind('computeEncoderLevelColour("reverb", "Reverb", 13)'); }

/* effects area: pitch encoder */
#goxlr-visualiser .effects .encoders .pitch #Encoder {
  transform: v-bind('computeEncoderRotation("pitch", true)');
  color: v-bind('computeEncoderColour("Pitch")');
}
#goxlr-visualiser .effects .encoders .pitch .level #Level1 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", -6, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level2 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", -5, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level3 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", -4, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level4 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", -3, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level5 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", -2, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level6 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", -1, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level7 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 0, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level8 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 1, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level9 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 2, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level10 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 3, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level11 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 4, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level12 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 5, true, true)'); }
#goxlr-visualiser .effects .encoders .pitch .level #Level13 { color: v-bind('computeEncoderLevelColour("pitch", "Pitch", 6, true, true)'); }

/* effects area: echo encoder */
#goxlr-visualiser .effects .encoders .echo #Encoder {
  transform: v-bind('computeEncoderRotation("echo")');
  color: v-bind('computeEncoderColour("Echo")');
}
#goxlr-visualiser .effects .encoders .echo .level #Level1 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 1)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level2 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 2)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level3 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 3)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level4 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 4)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level5 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 5)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level6 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 6)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level7 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 7)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level8 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 8)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level9 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 9)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level10 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 10)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level11 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 11)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level12 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 12)'); }
#goxlr-visualiser .effects .encoders .echo .level #Level13 { color: v-bind('computeEncoderLevelColour("echo", "Echo", 13)'); }

/* effects area: gender encoder */
#goxlr-visualiser .effects .encoders .gender #Encoder {
  transform: v-bind('computeEncoderRotation("gender", true)');
  color: v-bind('computeEncoderColour("Gender")');
}
#goxlr-visualiser .effects .encoders .gender .level #Level1 { color: v-bind('computeEncoderLevelColour("gender", "Gender", -6, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level2 { color: v-bind('computeEncoderLevelColour("gender", "Gender", -5, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level3 { color: v-bind('computeEncoderLevelColour("gender", "Gender", -4, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level4 { color: v-bind('computeEncoderLevelColour("gender", "Gender", -3, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level5 { color: v-bind('computeEncoderLevelColour("gender", "Gender", -2, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level6 { color: v-bind('computeEncoderLevelColour("gender", "Gender", -1, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level7 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 0, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level8 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 1, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level9 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 2, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level10 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 3, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level11 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 4, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level12 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 5, true)'); }
#goxlr-visualiser .effects .encoders .gender .level #Level13 { color: v-bind('computeEncoderLevelColour("gender", "Gender", 6, true)'); }

/* sampler area: buttons */
#goxlr-visualiser .sampler #BankA { color: v-bind('computeSamplerBankColour("A")'); }
#goxlr-visualiser .sampler #BankB { color: v-bind('computeSamplerBankColour("B")'); }
#goxlr-visualiser .sampler #BankC { color: v-bind('computeSamplerBankColour("C")'); }
#goxlr-visualiser .sampler #Clear { color: v-bind('computeSamplerClearColour(2)'); }
#goxlr-visualiser .sampler #Clear.blink { animation: sampler-clear-blink-animation 1s infinite; }
#goxlr-visualiser .sampler #TopLeft { color: v-bind('computeSamplerSampleColour("TopLeft")'); }
#goxlr-visualiser .sampler #TopLeft.blink { animation: sampler-sample-blink-animation 1s infinite; }
#goxlr-visualiser .sampler #TopRight { color: v-bind('computeSamplerSampleColour("TopRight")'); }
#goxlr-visualiser .sampler #TopRight.blink { animation: sampler-sample-blink-animation 1s infinite; }
#goxlr-visualiser .sampler #BottomLeft { color: v-bind('computeSamplerSampleColour("BottomLeft")'); }
#goxlr-visualiser .sampler #BottomLeft.blink { animation: sampler-sample-blink-animation 1s infinite; }
#goxlr-visualiser .sampler #BottomRight { color: v-bind('computeSamplerSampleColour("BottomRight")'); }
#goxlr-visualiser .sampler #BottomRight.blink { animation: sampler-sample-blink-animation 1s infinite; }

/* mixer area: fader */
#goxlr-visualiser #Channel1 .rail #Fader { transform: v-bind('computeMixerFaderPosition("A")'); }
#goxlr-visualiser #Channel2 .rail #Fader { transform: v-bind('computeMixerFaderPosition("B")'); }
#goxlr-visualiser #Channel3 .rail #Fader { transform: v-bind('computeMixerFaderPosition("C")'); }
#goxlr-visualiser #Channel4 .rail #Fader { transform: v-bind('computeMixerFaderPosition("D")'); }

/* mixer area: mute buttons */
#goxlr-visualiser #Channel1 #Mute { color: v-bind('computeMixerMuteColour("A")'); }
#goxlr-visualiser #Channel1 #Mute.blink { animation: fader1-mute-blink-animation 1s infinite; }
#goxlr-visualiser #Channel2 #Mute { color: v-bind('computeMixerMuteColour("B")'); }
#goxlr-visualiser #Channel2 #Mute.blink { animation: fader2-mute-blink-animation 1s infinite; }
#goxlr-visualiser #Channel3 #Mute { color: v-bind('computeMixerMuteColour("C")'); }
#goxlr-visualiser #Channel3 #Mute.blink { animation: fader3-mute-blink-animation 1s infinite; }
#goxlr-visualiser #Channel4 #Mute { color: v-bind('computeMixerMuteColour("D")'); }
#goxlr-visualiser #Channel4 #Mute.blink { animation: fader4-mute-blink-animation 1s infinite; }

/* mixer area: fader 1 */
#goxlr-visualiser #Channel1 .display text { display: none; } /* disabled because of missing implementation */
//#goxlr-visualiser #Channel1 .display image { display: none; }
#goxlr-visualiser #Channel1 .display #Backlight { color: v-bind('computeMixerDisplayColour(1)'); }
#goxlr-visualiser #Channel1 .level #Level1 { color: v-bind('computeMixerLevelColour("A", 1)'); }
#goxlr-visualiser #Channel1 .level #Level2 { color: v-bind('computeMixerLevelColour("A", 2)'); }
#goxlr-visualiser #Channel1 .level #Level3 { color: v-bind('computeMixerLevelColour("A", 3)'); }
#goxlr-visualiser #Channel1 .level #Level4 { color: v-bind('computeMixerLevelColour("A", 4)'); }
#goxlr-visualiser #Channel1 .level #Level5 { color: v-bind('computeMixerLevelColour("A", 5)'); }
#goxlr-visualiser #Channel1 .level #Level6 { color: v-bind('computeMixerLevelColour("A", 6)'); }
#goxlr-visualiser #Channel1 .level #Level7 { color: v-bind('computeMixerLevelColour("A", 7)'); }
#goxlr-visualiser #Channel1 .level #Level8 { color: v-bind('computeMixerLevelColour("A", 8)'); }
#goxlr-visualiser #Channel1 .level #Level9 { color: v-bind('computeMixerLevelColour("A", 9)'); }
#goxlr-visualiser #Channel1 .level #Level10 { color: v-bind('computeMixerLevelColour("A", 10)'); }
#goxlr-visualiser #Channel1 .level #Level11 { color: v-bind('computeMixerLevelColour("A", 11)'); }
#goxlr-visualiser #Channel1 .level #Level12 { color: v-bind('computeMixerLevelColour("A", 12)'); }
#goxlr-visualiser #Channel1 .level #Level13 { color: v-bind('computeMixerLevelColour("A", 13)'); }
#goxlr-visualiser #Channel1 .level #Level14 { color: v-bind('computeMixerLevelColour("A", 14)'); }
#goxlr-visualiser #Channel1 .level #Level15 { color: v-bind('computeMixerLevelColour("A", 15)'); }

  /* mixer area: fader 2 */
#goxlr-visualiser #Channel2 .display text { display: none; } /* disabled because of missing implementation */
//#goxlr-visualiser #Channel2 .display image { display: none; }
#goxlr-visualiser #Channel2 .display #Backlight { color: v-bind('computeMixerDisplayColour(2)'); }
#goxlr-visualiser #Channel2 .level #Level1 { color: v-bind('computeMixerLevelColour("B", 1)'); }
#goxlr-visualiser #Channel2 .level #Level2 { color: v-bind('computeMixerLevelColour("B", 2)'); }
#goxlr-visualiser #Channel2 .level #Level3 { color: v-bind('computeMixerLevelColour("B", 3)'); }
#goxlr-visualiser #Channel2 .level #Level4 { color: v-bind('computeMixerLevelColour("B", 4)'); }
#goxlr-visualiser #Channel2 .level #Level5 { color: v-bind('computeMixerLevelColour("B", 5)'); }
#goxlr-visualiser #Channel2 .level #Level6 { color: v-bind('computeMixerLevelColour("B", 6)'); }
#goxlr-visualiser #Channel2 .level #Level7 { color: v-bind('computeMixerLevelColour("B", 7)'); }
#goxlr-visualiser #Channel2 .level #Level8 { color: v-bind('computeMixerLevelColour("B", 8)'); }
#goxlr-visualiser #Channel2 .level #Level9 { color: v-bind('computeMixerLevelColour("B", 9)'); }
#goxlr-visualiser #Channel2 .level #Level10 { color: v-bind('computeMixerLevelColour("B", 10)'); }
#goxlr-visualiser #Channel2 .level #Level11 { color: v-bind('computeMixerLevelColour("B", 11)'); }
#goxlr-visualiser #Channel2 .level #Level12 { color: v-bind('computeMixerLevelColour("B", 12)'); }
#goxlr-visualiser #Channel2 .level #Level13 { color: v-bind('computeMixerLevelColour("B", 13)'); }
#goxlr-visualiser #Channel2 .level #Level14 { color: v-bind('computeMixerLevelColour("B", 14)'); }
#goxlr-visualiser #Channel2 .level #Level15 { color: v-bind('computeMixerLevelColour("B", 15)'); }

/* mixer area: fader 3 */
#goxlr-visualiser #Channel3 .display text { display: none; } /* disabled because of missing implementation */
//#goxlr-visualiser #Channel3 .display image { display: none; }
#goxlr-visualiser #Channel3 .display #Backlight { color: v-bind('computeMixerDisplayColour(3)'); }
#goxlr-visualiser #Channel3 .level #Level1 { color: v-bind('computeMixerLevelColour("C", 1)'); }
#goxlr-visualiser #Channel3 .level #Level2 { color: v-bind('computeMixerLevelColour("C", 2)'); }
#goxlr-visualiser #Channel3 .level #Level3 { color: v-bind('computeMixerLevelColour("C", 3)'); }
#goxlr-visualiser #Channel3 .level #Level4 { color: v-bind('computeMixerLevelColour("C", 4)'); }
#goxlr-visualiser #Channel3 .level #Level5 { color: v-bind('computeMixerLevelColour("C", 5)'); }
#goxlr-visualiser #Channel3 .level #Level6 { color: v-bind('computeMixerLevelColour("C", 6)'); }
#goxlr-visualiser #Channel3 .level #Level7 { color: v-bind('computeMixerLevelColour("C", 7)'); }
#goxlr-visualiser #Channel3 .level #Level8 { color: v-bind('computeMixerLevelColour("C", 8)'); }
#goxlr-visualiser #Channel3 .level #Level9 { color: v-bind('computeMixerLevelColour("C", 9)'); }
#goxlr-visualiser #Channel3 .level #Level10 { color: v-bind('computeMixerLevelColour("C", 10)'); }
#goxlr-visualiser #Channel3 .level #Level11 { color: v-bind('computeMixerLevelColour("C", 11)'); }
#goxlr-visualiser #Channel3 .level #Level12 { color: v-bind('computeMixerLevelColour("C", 12)'); }
#goxlr-visualiser #Channel3 .level #Level13 { color: v-bind('computeMixerLevelColour("C", 13)'); }
#goxlr-visualiser #Channel3 .level #Level14 { color: v-bind('computeMixerLevelColour("C", 14)'); }
#goxlr-visualiser #Channel3 .level #Level15 { color: v-bind('computeMixerLevelColour("C", 15)'); }

/* mixer area: fader 4 */
#goxlr-visualiser #Channel4 .display text { display: none; } /* disabled because of missing implementation */
//#goxlr-visualiser #Channel4 .display image { display: none; }
#goxlr-visualiser #Channel4 .display #Backlight { color: v-bind('computeMixerDisplayColour(4)'); }
#goxlr-visualiser #Channel4 .level #Level1 { color: v-bind('computeMixerLevelColour("D", 1)'); }
#goxlr-visualiser #Channel4 .level #Level2 { color: v-bind('computeMixerLevelColour("D", 2)'); }
#goxlr-visualiser #Channel4 .level #Level3 { color: v-bind('computeMixerLevelColour("D", 3)'); }
#goxlr-visualiser #Channel4 .level #Level4 { color: v-bind('computeMixerLevelColour("D", 4)'); }
#goxlr-visualiser #Channel4 .level #Level5 { color: v-bind('computeMixerLevelColour("D", 5)'); }
#goxlr-visualiser #Channel4 .level #Level6 { color: v-bind('computeMixerLevelColour("D", 6)'); }
#goxlr-visualiser #Channel4 .level #Level7 { color: v-bind('computeMixerLevelColour("D", 7)'); }
#goxlr-visualiser #Channel4 .level #Level8 { color: v-bind('computeMixerLevelColour("D", 8)'); }
#goxlr-visualiser #Channel4 .level #Level9 { color: v-bind('computeMixerLevelColour("D", 9)'); }
#goxlr-visualiser #Channel4 .level #Level10 { color: v-bind('computeMixerLevelColour("D", 10)'); }
#goxlr-visualiser #Channel4 .level #Level11 { color: v-bind('computeMixerLevelColour("D", 11)'); }
#goxlr-visualiser #Channel4 .level #Level12 { color: v-bind('computeMixerLevelColour("D", 12)'); }
#goxlr-visualiser #Channel4 .level #Level13 { color: v-bind('computeMixerLevelColour("D", 13)'); }
#goxlr-visualiser #Channel4 .level #Level14 { color: v-bind('computeMixerLevelColour("D", 14)'); }
#goxlr-visualiser #Channel4 .level #Level15 { color: v-bind('computeMixerLevelColour("D", 15)'); }
</style>
