<template>
  <div
    id="goxlr-visualiser"
    @wheel="handleScroll"
    @click="e => handleClick(e, false)"
    @contextmenu.prevent="e => handleClick(e, true)"
    @mouseover="handleHover"
    @moussleave="handleHover"
    v-html="getGoXLRSvg()"
  />
</template>

<script>
import {store} from "@/store";
import {EffectLightingPresets, EffectPresets, MuteButtonNamesForFader} from "@/util/mixerMapping";
import {getBaseHTTPAddress, websocket} from "@/util/sockets";
import {isDeviceMini, isDeviceWhite} from "@/util/util";

import GoXLRFull from "@/assets/preview/GoXLR.svg?raw";
import GoXLRMini from "@/assets/preview/GoXLR-Mini.svg?raw";
import {HighlightArea, mapElementToArea, getActivePresetOrBank} from "@/components/visualisation/VisualiserHelper";

export default {
  name: "GoXLRVisualiser",

  props: {
    highlightedAreas: {type: Array, required: true},
  },

  emits: ["areaClick"],

  data: () => {
    return {
      hoveredArea: null,
      whiteButtonColour: "#3D3D3D",
    }
  },

  methods: {
    getGoXLRSvg() {
      return (isDeviceMini()) ? GoXLRMini : GoXLRFull;
    },

    // emit areaClick event
    handleClick(e, rightClick) {
      const isCaptureElem = e.target.matches("#goxlr-visualiser .capture *")
      if (!isCaptureElem) return;

      let activeEffectPreset = getActivePresetOrBank(true, this.highlightedAreas);
      let activeSampleBank = getActivePresetOrBank(false, this.highlightedAreas);

      let clickedArea = mapElementToArea(e.target, activeEffectPreset, activeSampleBank);
      this.$emit("areaClick", { area: clickedArea, alt: rightClick });
    },

    // highlight hovered area
    handleHover(e) {
      const isCaptureElem = e.target.matches("#goxlr-visualiser .capture *")
      if (!isCaptureElem) return this.hoveredArea = null;

      let activeEffectPreset = getActivePresetOrBank(true, [this.hoveredArea]);
      let activeSampleBank = getActivePresetOrBank(false, [this.hoveredArea]);

      this.hoveredArea = mapElementToArea(e.target, activeEffectPreset, activeSampleBank);
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

    // checks if any preset/bank is currently actively highlighted (needed to handle tab display correctly)
    isAnyPresetSelected() {
      return this.highlightedAreas.some(p =>
          [
            HighlightArea.EFFECTS_PRESET1, HighlightArea.EFFECTS_PRESET2, HighlightArea.EFFECTS_PRESET3,
            HighlightArea.EFFECTS_PRESET4, HighlightArea.EFFECTS_PRESET5, HighlightArea.EFFECTS_PRESET6
          ].some(ep => ep === p)
      );
    },
    isAnySamplerBankSelected() {
      return this.highlightedAreas.some(p =>
          [
            HighlightArea.SAMPLER_BANK_A, HighlightArea.SAMPLER_BANK_B, HighlightArea.SAMPLER_BANK_C
          ].some(ep => ep === p)
      );
    },

    // These occur first in the SVG, so top of the compute section :p
    computeChannelSelected(channel) {
      let fallbackOpacity = this.hoveredArea === HighlightArea[`CHANNEL_${channel}`] ? 0.5 : 0;
      return this.highlightedAreas.some(a => a === HighlightArea[`CHANNEL_${channel}`]) ? 1 : fallbackOpacity;
    },
    computeCoughSelected() {
      let fallbackOpacity = this.hoveredArea === HighlightArea.COUGH ? 0.5 : 0;
      return this.highlightedAreas.some(x => x === HighlightArea.COUGH) ? 1 : fallbackOpacity;
    },
    computePresetSelected(preset, isTab = false) {
      let fallbackOpacity = this.hoveredArea === HighlightArea[`EFFECTS_PRESET${preset}`] ? 0.5 : 0;
      let isThisPresetSelected = this.highlightedAreas.some(x => x === HighlightArea[`EFFECTS_PRESET${preset}`]);

      if (isThisPresetSelected) return 1;
      else if (isTab) return fallbackOpacity;
      else if (!this.isAnyPresetSelected()) return fallbackOpacity;
      else return 0;
    },
    computeSampleSelected(bank, isTab = false) {
      let fallbackOpacity = this.hoveredArea === HighlightArea[`SAMPLER_BANK_${bank}`] ? 0.5 : 0;
      let isThisSampleSelected = this.highlightedAreas.some(x => x === HighlightArea[`SAMPLER_BANK_${bank}`]);

      if (isThisSampleSelected) return 1;
      else if (isTab) return fallbackOpacity;
      else if (!this.isAnySamplerBankSelected()) return fallbackOpacity;
      else return 0;
    },


    computeAccentColour() {
      return `#${store.getActiveDevice().lighting.simple.Accent.colour_one}`;
    },

    getBackPlateColour(index) {
      let black = ["#282828", "#222222", "#040404", "#040404", "#040404"];
      let white = ["#9F9F9F", "#9D9D9D", "#707070", "#555555", "#555555"];

      return isDeviceWhite() ? white[index] : black[index];
    },

    getSelectionOverlayColour() {
      return isDeviceWhite() ? "rgba(0, 0, 0, .1)" : "rgba(255, 255, 255, .15)";
    },

    getSelectionStrokeColour() {
      return isDeviceWhite() ? "rgba(0, 170, 170, .7)" : "rgba(36, 255, 255, .5)";
    },

    computeButtonColour() {
      return isDeviceWhite() ? "#F7F7F7" : "#000000";
    },

    computeBaseplateGradient(part) {
      let black = ["#1d1d1d", "#1d1d1d", "#212121"];
      let white = ["#F1F1F1", "#DFDFDF", "#BABABA"];

      return isDeviceWhite() ? white[part] : black[part];
    },

    computeGenderEncoderBaseGradient(part) {
      let black = ["#373737", "#282828", "#1d1d1d"];
      return isDeviceWhite() ? "transparent" : black[part];
    },

    computeGenderEncoderGradient(part) {
      let black = ["#393939", "#242424", "#181818"];
      let white = ["#C9C9C9", "#EBEBEB", "#ECECEC"];

      return isDeviceWhite() ? white[part] : black[part];
    },

    computeGenderEncoderTopGradient(part) {
      let black = ["#2e2e2e", "#303030"];
      return isDeviceWhite() ? "#ECECEC" : black[part];
    },

    computeGenderEncoderCircleColour() {
      return isDeviceWhite() ? "#ADADAD" : "#000";
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
    computeMixerMuteColourText(fader) {
      if (isDeviceWhite()) {
        return this.whiteButtonColour;
      }
      return this.computeMixerMuteColour(fader);
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

    computeMixerMuteBlinkColourText(fader) {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeMixerMuteBlinkColour(fader)
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
    computeCoughButtonColourText() {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeCoughButtonColour();
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
    computeBleepButtonColourText() {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeBleepButtonColour();
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
    computeEffectButtonColourText(effectButtonName, effectStateName) {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeEffectButtonColour(effectButtonName, effectStateName);
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

    computeEffectPresetColourText(presetIndex) {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeEffectPresetColour(presetIndex);
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
    computeSamplerBankColourText(bank) {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeSamplerBankColour(bank);
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
    computeSamplerClearColourText(colourState) {
      return isDeviceWhite() ? this.whiteButtonColour : this.computeSamplerClearColour(colourState);
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

    isDeviceWhite() { return store.getActiveDevice().hardware.colour_way === "White" },

    muteInactiveColour() {
      return '#' + store.getActiveDevice().lighting.buttons.Cough.colours.colour_two;
    },
    muteInactiveColourText() {
      return isDeviceWhite() ? this.whiteButtonColour : '#' + store.getActiveDevice().lighting.buttons.Cough.colours.colour_two;
    },

    getFader1Scribble() { return this.getScribbleUrl("A"); },
    getFader2Scribble() { return this.getScribbleUrl("B"); },
    getFader3Scribble() { return this.getScribbleUrl("C"); },
    getFader4Scribble() { return this.getScribbleUrl("D"); },

    mixerFaderNames() {
      if (store.getActiveDevice() == undefined) return;

      return {
        "A": store.getActiveDevice().fader_status["A"].channel,
        "B": store.getActiveDevice().fader_status["B"].channel,
        "C": store.getActiveDevice().fader_status["C"].channel,
        "D": store.getActiveDevice().fader_status["D"].channel,
      }
    }
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

    mixerFaderNames(newNames) {
      if (document.querySelector("#goxlr-visualiser #Channel1 text tspan") != null && isDeviceMini()) {
        document.querySelector("#goxlr-visualiser #Channel1 text tspan").innerHTML = store.getActiveDevice().fader_status["A"].channel;
        document.querySelector("#goxlr-visualiser #Channel2 text tspan").innerHTML = store.getActiveDevice().fader_status["B"].channel;
        document.querySelector("#goxlr-visualiser #Channel3 text tspan").innerHTML = store.getActiveDevice().fader_status["C"].channel;
        document.querySelector("#goxlr-visualiser #Channel4 text tspan").innerHTML = store.getActiveDevice().fader_status["D"].channel;
      }
    }
  },
  mounted() {
    if (isDeviceMini()) {
      // set the initial fader names
      document.querySelector("#goxlr-visualiser #Channel1 text tspan").innerHTML = this.mixerFaderNames["A"];
      document.querySelector("#goxlr-visualiser #Channel2 text tspan").innerHTML = this.mixerFaderNames["B"];
      document.querySelector("#goxlr-visualiser #Channel3 text tspan").innerHTML = this.mixerFaderNames["C"];
      document.querySelector("#goxlr-visualiser #Channel4 text tspan").innerHTML = this.mixerFaderNames["D"];
    } else {
      // Set the initial display URLs. (only for Full GoXLR)
      if (isDeviceMini()) return;
      document.querySelector(".mixer > #Channel1 > .display > #Image").setAttribute("href", this.getScribbleUrl("A"));
      document.querySelector(".mixer > #Channel2 > .display > #Image").setAttribute("href", this.getScribbleUrl("B"));
      document.querySelector(".mixer > #Channel3 > .display > #Image").setAttribute("href", this.getScribbleUrl("C"));
      document.querySelector(".mixer > #Channel4 > .display > #Image").setAttribute("href", this.getScribbleUrl("D"));
    }
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

/*#goxlr-visualiser #BaseplateGradient > * {
//  stop-color: #fff;
}*/

/* GoXLR Body */
#goxlr-visualiser #BaseplateGradient :nth-child(1) {
  stop-color: v-bind('computeBaseplateGradient(0)');
}

#goxlr-visualiser #BaseplateGradient :nth-child(2) {
  stop-color: v-bind('computeBaseplateGradient(1)');
}

#goxlr-visualiser #BaseplateGradient :nth-child(3) {
  stop-color: v-bind('computeBaseplateGradient(2)');
}

#goxlr-visualiser #GenderEncoderBaseGradient :nth-child(1) {
  stop-color: v-bind('computeGenderEncoderBaseGradient(0)');
}

#goxlr-visualiser #GenderEncoderBaseGradient :nth-child(2) {
  stop-color: v-bind('computeGenderEncoderBaseGradient(1)');
}

#goxlr-visualiser #GenderEncoderBaseGradient :nth-child(3) {
  stop-color: v-bind('computeGenderEncoderBaseGradient(2)');
}

#goxlr-visualiser #GenderEncoderGradient > :nth-child(1) {
  stop-color: v-bind('computeGenderEncoderGradient(0)');
}
#goxlr-visualiser #GenderEncoderGradient > :nth-child(2) {
  stop-color: v-bind('computeGenderEncoderGradient(1)');
}
#goxlr-visualiser #GenderEncoderGradient > :nth-child(3) {
  stop-color: v-bind('computeGenderEncoderGradient(2)');
}

#goxlr-visualiser #GenderEncoderTopGradient :nth-child(1) {
  stop-color: v-bind('computeGenderEncoderTopGradient(0)');
}

#goxlr-visualiser #GenderEncoderTopGradient :nth-child(2) {
  stop-color: v-bind('computeGenderEncoderTopGradient(1)');
}

#goxlr-visualiser .area .encoders * .base > circle:nth-child(3) {
  fill: v-bind('computeGenderEncoderCircleColour()');
}

#goxlr-visualiser .backplate > :nth-child(1) {
  fill: v-bind('getBackPlateColour(0)') !important;
}

#goxlr-visualiser .backplate > :nth-child(2) {
  fill: v-bind('getBackPlateColour(1)') !important;
}

#goxlr-visualiser .backplate > :nth-child(3) {
  fill: v-bind('getBackPlateColour(2)') !important;
}

#goxlr-visualiser .backplate > :nth-child(4), #goxlr-visualiser .backplate > :nth-child(5) {
  fill: v-bind('getBackPlateColour(3)') !important;
}

/** Mini has a fancy shadow **/
#goxlr-visualiser .backplate > :nth-child(6) {
  fill: v-bind('getBackPlateColour(4)') !important;
}

/** This Grey looks great in Black or White, so I'll leave it for now, should probably update the SVG */
#goxlr-visualiser #Logo > *:not(:nth-child(3)) {
  fill: #7B7B7B !important;
}

#goxlr-visualiser .faceplate #Logo g > * {
  fill: #7B7B7B !important;
}

#goxlr-visualiser .area .mixer * > #Mute > rect,
#goxlr-visualiser .area .effects .buttons * rect,
#goxlr-visualiser .area .effects .presets * rect,
#goxlr-visualiser .area .sampler path,
#goxlr-visualiser .area .sampler g rect,
#goxlr-visualiser .area .cough #Bleep rect
{
  fill: v-bind('computeButtonColour()');
}

#goxlr-visualiser .area .cough #Mute :nth-child(1) {
  fill: v-bind('computeButtonColour()');
}

#goxlr-visualiser .selection * rect, #goxlr-visualiser .selection path {
  fill: v-bind('getSelectionOverlayColour()') !important;
  stroke: v-bind('getSelectionStrokeColour()') !important;
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
@keyframes sampler-clear-blink-animation-text {
  0%, 49% { color: v-bind('computeSamplerClearColourText(1)'); }
  50%, 100% { color: v-bind('computeSamplerClearColourText(2)'); }
}
@keyframes mute-blink-animation {
  0%, 49% { color: v-bind('computeCoughButtonColour()'); }
  50%, 100% { color: v-bind('muteInactiveColour'); }
}
@keyframes mute-blink-animation-text {
  0%, 49% { color: v-bind('computeCoughButtonColourText()'); }
  50%, 100% { color: v-bind('muteInactiveColourText'); }
}
@keyframes fader1-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("A")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("A")'); }
}
@keyframes fader1-mute-blink-animation-text {
  0%, 49% { color: v-bind('computeMixerMuteColourText("A")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColourText("A")'); }
}
@keyframes fader2-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("B")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("B")'); }
}
@keyframes fader2-mute-blink-animation-text {
  0%, 49% { color: v-bind('computeMixerMuteColourText("B")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColourText("B")'); }
}
@keyframes fader3-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("C")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("C")'); }
}
@keyframes fader3-mute-blink-animation-text {
  0%, 49% { color: v-bind('computeMixerMuteColourText("C")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColourText("C")'); }
}
@keyframes fader4-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColour("D")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColour("D")'); }
}
@keyframes fader4-mute-blink-animation-text {
  0%, 49% { color: v-bind('computeMixerMuteColourText("D")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColourText("D")'); }
}

/* cough area */
#goxlr-visualiser .cough #Mute { color: v-bind('computeCoughButtonColour()'); }
#goxlr-visualiser .cough #Mute.blink { animation: mute-blink-animation 1s infinite; }
#goxlr-visualiser .cough #Mute :nth-child(2) { color: v-bind('computeCoughButtonColourText()'); }
#goxlr-visualiser .cough #Mute.blink :nth-child(2) { animation: mute-blink-animation-text 1s infinite; }

#goxlr-visualiser .cough #Bleep { color: v-bind('computeBleepButtonColour()'); }
#goxlr-visualiser .cough #Bleep text { color: v-bind('computeBleepButtonColourText()'); }

/* selection overlay */
#goxlr-visualiser .selection .channels * { opacity: 0; }
#goxlr-visualiser .selection .channels #Channel1 { opacity: v-bind('computeChannelSelected("A")'); }
#goxlr-visualiser .selection .channels #Channel2 { opacity: v-bind('computeChannelSelected("B")'); }
#goxlr-visualiser .selection .channels #Channel3 { opacity: v-bind('computeChannelSelected("C")'); }
#goxlr-visualiser .selection .channels #Channel4 { opacity: v-bind('computeChannelSelected("D")'); }

#goxlr-visualiser .selection #Cough { opacity: 0; }
#goxlr-visualiser .selection #Cough { opacity: v-bind('computeCoughSelected()'); }

#goxlr-visualiser .selection .presets * * { opacity: 0; }
#goxlr-visualiser .selection .presets #Preset1 .tab { opacity: v-bind('computePresetSelected("1", true)'); }
#goxlr-visualiser .selection .presets #Preset1 .body { opacity: v-bind('computePresetSelected("1", false)'); }
#goxlr-visualiser .selection .presets #Preset2 .tab { opacity: v-bind('computePresetSelected("2", true)'); }
#goxlr-visualiser .selection .presets #Preset2 .body { opacity: v-bind('computePresetSelected("2", false)'); }
#goxlr-visualiser .selection .presets #Preset3 .tab { opacity: v-bind('computePresetSelected("3", true)'); }
#goxlr-visualiser .selection .presets #Preset3 .body { opacity: v-bind('computePresetSelected("3", false)'); }
#goxlr-visualiser .selection .presets #Preset4 .tab { opacity: v-bind('computePresetSelected("4", true)'); }
#goxlr-visualiser .selection .presets #Preset4 .body { opacity: v-bind('computePresetSelected("4", false)'); }
#goxlr-visualiser .selection .presets #Preset5 .tab { opacity: v-bind('computePresetSelected("5", true)'); }
#goxlr-visualiser .selection .presets #Preset5 .body { opacity: v-bind('computePresetSelected("5", false)'); }
#goxlr-visualiser .selection .presets #Preset6 .tab { opacity: v-bind('computePresetSelected("6", true)'); }
#goxlr-visualiser .selection .presets #Preset6 .body { opacity: v-bind('computePresetSelected("6", false)'); }

#goxlr-visualiser .selection .sampler * * { opacity: 0; }
#goxlr-visualiser .selection .sampler #BankA .tab { opacity: v-bind('computeSampleSelected("A", true)'); }
#goxlr-visualiser .selection .sampler #BankA .body { opacity: v-bind('computeSampleSelected("A", false)'); }
#goxlr-visualiser .selection .sampler #BankB .tab { opacity: v-bind('computeSampleSelected("B", true)'); }
#goxlr-visualiser .selection .sampler #BankB .body { opacity: v-bind('computeSampleSelected("B", false)'); }
#goxlr-visualiser .selection .sampler #BankC .tab { opacity: v-bind('computeSampleSelected("C", true)'); }
#goxlr-visualiser .selection .sampler #BankC .body { opacity: v-bind('computeSampleSelected("C", false)'); }

/* effects area: buttons */
#goxlr-visualiser .effects .buttons #Megaphone { color: v-bind('computeEffectButtonColour("EffectMegaphone", "megaphone")'); }
#goxlr-visualiser .effects .buttons #Megaphone text { color: v-bind('computeEffectButtonColourText("EffectMegaphone", "megaphone")'); }
#goxlr-visualiser .effects .buttons #Robot { color: v-bind('computeEffectButtonColour("EffectRobot", "robot")'); }
#goxlr-visualiser .effects .buttons #Robot text { color: v-bind('computeEffectButtonColourText("EffectRobot", "robot")'); }
#goxlr-visualiser .effects .buttons #HardTune { color: v-bind('computeEffectButtonColour("EffectHardTune", "hard_tune")'); }
#goxlr-visualiser .effects .buttons #HardTune text { color: v-bind('computeEffectButtonColourText("EffectHardTune", "hard_tune")'); }
#goxlr-visualiser .effects .buttons #FX { color: v-bind('computeEffectButtonColour("EffectFx", null)'); }
#goxlr-visualiser .effects .buttons #FX text { color: v-bind('computeEffectButtonColourText("EffectFx", null)'); }

#goxlr-visualiser .effects .presets #Preset1 { color: v-bind('computeEffectPresetColour(1)'); }
#goxlr-visualiser .effects .presets #Preset1 text { color: v-bind('computeEffectPresetColourText(1)'); }
#goxlr-visualiser .effects .presets #Preset2 { color: v-bind('computeEffectPresetColour(2)'); }
#goxlr-visualiser .effects .presets #Preset2 text { color: v-bind('computeEffectPresetColourText(2)'); }
#goxlr-visualiser .effects .presets #Preset3 { color: v-bind('computeEffectPresetColour(3)'); }
#goxlr-visualiser .effects .presets #Preset3 text { color: v-bind('computeEffectPresetColourText(3)'); }
#goxlr-visualiser .effects .presets #Preset4 { color: v-bind('computeEffectPresetColour(4)'); }
#goxlr-visualiser .effects .presets #Preset4 text { color: v-bind('computeEffectPresetColourText(4)'); }
#goxlr-visualiser .effects .presets #Preset5 { color: v-bind('computeEffectPresetColour(5)'); }
#goxlr-visualiser .effects .presets #Preset5 text { color: v-bind('computeEffectPresetColourText(5)'); }
#goxlr-visualiser .effects .presets #Preset6 { color: v-bind('computeEffectPresetColour(6)'); }
#goxlr-visualiser .effects .presets #Preset6 text { color: v-bind('computeEffectPresetColourText(6)'); }

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
#goxlr-visualiser .sampler #BankA text { color: v-bind('computeSamplerBankColourText("A")'); }
#goxlr-visualiser .sampler #BankB { color: v-bind('computeSamplerBankColour("B")'); }
#goxlr-visualiser .sampler #BankB text { color: v-bind('computeSamplerBankColourText("B")'); }
#goxlr-visualiser .sampler #BankC { color: v-bind('computeSamplerBankColour("C")'); }
#goxlr-visualiser .sampler #BankC text { color: v-bind('computeSamplerBankColourText("C")'); }
#goxlr-visualiser .sampler #Clear { color: v-bind('computeSamplerClearColour(2)'); }
#goxlr-visualiser .sampler #Clear.blink { animation: sampler-clear-blink-animation 1s infinite; }
#goxlr-visualiser .sampler #Clear text { color: v-bind('computeSamplerClearColourText(2)'); }
#goxlr-visualiser .sampler #Clear.blink text { animation: sampler-clear-blink-animation-text 1s infinite; }
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
#goxlr-visualiser #Channel1 #Mute path { color: v-bind('computeMixerMuteColourText("A")'); }
#goxlr-visualiser #Channel1 #Mute.blink path { animation: fader1-mute-blink-animation-text 1s infinite; }
#goxlr-visualiser #Channel2 #Mute { color: v-bind('computeMixerMuteColour("B")'); }
#goxlr-visualiser #Channel2 #Mute.blink { animation: fader2-mute-blink-animation 1s infinite; }
#goxlr-visualiser #Channel2 #Mute path { color: v-bind('computeMixerMuteColourText("B")'); }
#goxlr-visualiser #Channel2 #Mute.blink path { animation: fader2-mute-blink-animation-text 1s infinite; }
#goxlr-visualiser #Channel3 #Mute { color: v-bind('computeMixerMuteColour("C")'); }
#goxlr-visualiser #Channel3 #Mute.blink { animation: fader3-mute-blink-animation 1s infinite; }
#goxlr-visualiser #Channel3 #Mute path { color: v-bind('computeMixerMuteColourText("C")'); }
#goxlr-visualiser #Channel3 #Mute.blink path { animation: fader3-mute-blink-animation-text 1s infinite; }
#goxlr-visualiser #Channel4 #Mute { color: v-bind('computeMixerMuteColour("D")'); }
#goxlr-visualiser #Channel4 #Mute.blink { animation: fader4-mute-blink-animation 1s infinite; }
#goxlr-visualiser #Channel4 #Mute path { color: v-bind('computeMixerMuteColourText("D")'); }
#goxlr-visualiser #Channel4 #Mute.blink path { animation: fader4-mute-blink-animation-text 1s infinite; }

/* mixer area: fader 1 */
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
