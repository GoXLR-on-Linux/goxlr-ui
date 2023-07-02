<template>
  <img svg-inline src="@/components/visualisation/vector/svg/GoXLR.svg" alt="GoXLR preview">
</template>

<script>
import {store} from "@/store";
import {EffectLightingPresets, EffectPresets, MuteButtonNamesForFader} from "@/util/mixerMapping";

console.log(store.getActiveDevice())
export default {
  name: "GoXLR",

  methods: {
    transformColor(color) {
      let r = parseInt(color.substring(0, 2), 16);
      let g = parseInt(color.substring(2, 4), 16);
      let b = parseInt(color.substring(4, 6), 16);
      return { r, g, b};
    },
    calculateGradientColor(startColor, endColor, position) {
      return {
        r: Math.round(startColor.r + (endColor.r - startColor.r) * position),
        g: Math.round(startColor.g + (endColor.g - startColor.g) * position),
        b: Math.round(startColor.b + (endColor.b - startColor.b) * position),
      }
    },

    computeAccentColor() {
      return `#${store.getActiveDevice().lighting.simple.Accent.colour_one}`;
    },

    computeMixerFaderPosition(fader) {
      const channel = store.getActiveDevice().fader_status[fader].channel,
          faderPosition = store.getActiveDevice().levels.volumes[channel];

      let height = 110;
      let transform = Math.ceil(height / 255 * faderPosition);
      return `translateY(-${transform}pt)`
    },
    computeMixerLevelColor(fader, level) {
      const channel = store.getActiveDevice().fader_status[fader].channel,
          volume = store.getActiveDevice().levels.volumes[channel],
          colors = store.getActiveDevice().lighting.faders[fader].colours,
          topColor = this.transformColor(colors.colour_one),
          bottomColor = this.transformColor(colors.colour_two),
          indicatorDots = 15,
          offset = 0.25; // required to correctly align fader to indicators.

      const computedLevel = Math.ceil(indicatorDots / 255 * volume + offset);
      switch (store.getActiveDevice().lighting.faders[fader].style) {
        case "GradientMeter": // TODO: implement meter visualization
        case "Gradient":
          if (level >= computedLevel) return `rgb(0,0,0)`;
          // eslint-disable-next-line no-case-declarations
          let gradientColor = this.calculateGradientColor(bottomColor, topColor, level / indicatorDots );
          return `rgb(${gradientColor.r}, ${gradientColor.g}, ${gradientColor.b})`;

        case "TwoColour":
        default:
          if (level >= computedLevel)
            return `rgb(${topColor.r}, ${topColor.g}, ${topColor.b})`;
          else
            return `rgb(${bottomColor.r}, ${bottomColor.g}, ${bottomColor.b})`;
      }

    },
    computeMixerMuteColor(fader) {
      const colors = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[fader]].colours,
          state = store.getActiveDevice().fader_status[fader].mute_state,
          colorOne = this.transformColor(colors.colour_one),
          colorTwo = this.transformColor(colors.colour_two);

      if (state !== "Unmuted")
        return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      switch (store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[fader]].off_style) {
        case "Dimmed":
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 0.4)`;
        default:
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      }
    },
    computeMixerMuteBlinkColor(fader) {
      const colors = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[fader]].colours;
      return '#' + colors.colour_two
    },
    isMixerMuteBlinking(fader) {
      store.getActiveDevice().fader_status[fader].mute_state === "MutedToAll";
    },
    computeMixerDisplayColor(display) {
      return '#' + store.getActiveDevice().lighting.simple[`Scribble${display}`].colour_one;
    },

    computeCoughButtonColor() {
      const colors = store.getActiveDevice().lighting.buttons.Cough.colours,
          colorOne = this.transformColor(colors.colour_one),
          colorTwo = this.transformColor(colors.colour_two);

      if ("Unmuted" !== store.getActiveDevice().cough_button.state)
        return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      switch (store.getActiveDevice().lighting.buttons.Cough.off_style) {
        case "Dimmed":
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 0.4)`;
        default:
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      }

      // TODO: can be simplified
    },

    computeBleepButtonColor() {
      const colors = store.getActiveDevice().lighting.buttons.Bleep.colours,
            isPressed = store.getActiveDevice().button_down.Bleep,
          colorOne = this.transformColor(colors.colour_one),
          colorTwo = this.transformColor(colors.colour_two);

      if (isPressed) return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      switch (store.getActiveDevice().lighting.buttons.Bleep.off_style) {
        case "Dimmed":
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 0.4)`;
        default:
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      }
    },

    computeEffectButtonColor(effectButtonName, effectStateName) {
      const colors = store.getActiveDevice().lighting.buttons[effectButtonName].colours,
          offStyle = store.getActiveDevice().lighting.buttons[effectButtonName].off_style,
          active = (effectStateName) === null ? store.getActiveDevice().effects.is_enabled : store.getActiveDevice().effects.current[effectStateName].is_enabled,
          colorOne = this.transformColor(colors.colour_one),
          colorTwo = this.transformColor(colors.colour_two);

      if (active) return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      switch (offStyle) {
        case "Dimmed":
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 0.4)`;
        default:
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      }
    },
    computeEffectPresetColor(presetIndex) {
      const colors = store.getActiveDevice().lighting.buttons[`EffectSelect${presetIndex}`].colours,
          offStyle = store.getActiveDevice().lighting.buttons[`EffectSelect${presetIndex}`].off_style,
          activePreset = EffectLightingPresets[EffectPresets.indexOf(store.getActiveDevice().effects.active_preset)],
          colorOne = this.transformColor(colors.colour_one),
          colorTwo = this.transformColor(colors.colour_two);

      if (activePreset === `EffectSelect${presetIndex}`)
        return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      switch (offStyle) {
        case "Dimmed":
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 0.4)`;
        default:
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      }
    },

    computeEncoderRotation(effectName, centerMode = false) {
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
    computeEncoderColor(effectName) {
      return `#${store.getActiveDevice().lighting.encoders[effectName].colour_three}`;
    },
    computeEncoderLevelColor(effectEncoderName, effectLightingName, indicatorLevel, centerMode = false, affectedByHardTune = false) {
      const colors = store.getActiveDevice().lighting.encoders[effectLightingName],
        effectAmount = store.getActiveDevice().effects.current[effectEncoderName].amount,
        hardTuneActive = store.getActiveDevice().effects.current.hard_tune.is_enabled,
        maxEffectLevel = (centerMode ? 50 : 100),
        maxLevel = 12;  // the goxlr only has 12 levels as the first one is always on

      // very high iq math that is definitely not a workaround
      const rawCurrentLevel = (maxLevel / maxEffectLevel * effectAmount) + (centerMode ? 0 : 1);
      const currentLevel = (affectedByHardTune && hardTuneActive) ? (maxLevel / 2) * (rawCurrentLevel * 2) : rawCurrentLevel;
      const normalizedCurrentLevel = currentLevel > 0 ? Math.ceil(currentLevel) : Math.floor(currentLevel);

      if (centerMode) {
        if (normalizedCurrentLevel >= 0 && indicatorLevel >= 0 && normalizedCurrentLevel > indicatorLevel)
          return `#${colors.colour_one}`;
        else if (normalizedCurrentLevel <= 0 && indicatorLevel <= 0 && normalizedCurrentLevel < indicatorLevel)
          return `#${colors.colour_two}`;
        else if (normalizedCurrentLevel === indicatorLevel)
          return `#fff`;
        else
          return `#000`;
      }
      else
      {
        if (normalizedCurrentLevel < indicatorLevel)
          return `#${colors.colour_one}`;
        else if (normalizedCurrentLevel > indicatorLevel)
          return `#${colors.colour_two}`;
        else if (normalizedCurrentLevel === indicatorLevel)
          return `#fff`;
        else
          return `#000`;
      }
    },

    computeSamplerBankColor(bank) {
      const active = store.getActiveDevice().sampler.active_bank === bank,
        colors = store.getActiveDevice().lighting.sampler[`SamplerSelect${bank}`].colours,
        offStyle = store.getActiveDevice().lighting.sampler[`SamplerSelect${bank}`].off_style,
        colorOne = this.transformColor(colors.colour_one),
        colorTwo = this.transformColor(colors.colour_two);

      if (active) return `rgb(${colorOne.r}, ${colorOne.g}, ${colorOne.b})`;

      switch (offStyle) {
        case "Dimmed":
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
        case "Colour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 1)`;
        case "DimmedColour2":
          return `rgba(${colorTwo.r}, ${colorTwo.g}, ${colorTwo.b}, 0.4)`;
        default:
          return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      }
    },
    computeSamplerSampleColor(button) {
      const activeBank = store.getActiveDevice().sampler.active_bank,
          colors = store.getActiveDevice().lighting.sampler[`SamplerSelect${activeBank}`].colours,
          sampleState = store.getActiveDevice().sampler.banks[activeBank][button],
          colorOne = this.transformColor(colors.colour_one),
          colorThree = this.transformColor(colors.colour_three),
          dimMin = 125; // min-brightness if empty color set to black (aka. disable lighting)

      if (sampleState.samples.length === 0) {
        // set to somewhat gray-ish color if set to a very dark color
        if(colorThree.r < dimMin && colorThree.r === colorThree.g && colorThree.g === colorThree.b && colorThree.g === colorThree.b)
          return `rgba(${dimMin}, ${dimMin}, ${dimMin}, 0.4)`
        else
          return `rgba(${colorThree.r}, ${colorThree.g}, ${colorThree.b}, 0.4)`;
      }

      if (sampleState.is_playing || sampleState.is_recording)
        return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
    },
    computeSamplerBlinkColor(colorState) {
      const activeBank = store.getActiveDevice().sampler.active_bank,
          colors = store.getActiveDevice().lighting.sampler[`SamplerSelect${activeBank}`].colours,
          colorOne = this.transformColor(colors.colour_one),
          colorThree = this.transformColor(colors.colour_three),
          dimMin = 125; // min-brightness if empty color set to black (aka. disable lighting)

      if (colorState === 1) return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;

      // set to somewhat gray-ish color if set to a very dark color
      if(colorThree.r < dimMin && colorThree.r === colorThree.g && colorThree.g === colorThree.b && colorThree.g === colorThree.b)
        return `rgba(${dimMin}, ${dimMin}, ${dimMin}, 0.4)`
      else
        return `rgba(${colorThree.r}, ${colorThree.g}, ${colorThree.b}, 0.4)`;
    },
    computeSamplerClearColor(colorState) {
      const activeBank = store.getActiveDevice().sampler.active_bank,
          colors = store.getActiveDevice().lighting.sampler[`SamplerSelect${activeBank}`].colours,
          colorOne = this.transformColor(colors.colour_one);

      if (colorState === 1)
        return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 1)`;
      else
        return `rgba(${colorOne.r}, ${colorOne.g}, ${colorOne.b}, 0.4)`;
    }
  },
  computed: {
    isTopLeftSampleRecording() {
      let activeBank = store.getActiveDevice().sampler.active_bank;
      let sampleState = store.getActiveDevice().sampler.banks[activeBank]["TopLeft"];
      return sampleState.is_recording;
    },
    isTopRightSampleRecording() {
      let activeBank = store.getActiveDevice().sampler.active_bank;
      let sampleState = store.getActiveDevice().sampler.banks[activeBank]["TopRight"];
      return sampleState.is_recording;
    },
    isBottomLeftSampleRecording() {
      let activeBank = store.getActiveDevice().sampler.active_bank;
      let sampleState = store.getActiveDevice().sampler.banks[activeBank]["BottomLeft"];
      return sampleState.is_recording;
    },
    isBottomRightSampleRecording() {
      let activeBank = store.getActiveDevice().sampler.active_bank;
      let sampleState = store.getActiveDevice().sampler.banks[activeBank]["BottomRight"];
      return sampleState.is_recording;
    },
    isClearActive() {
      return store.getActiveDevice().sampler.clear_active;
    },
    isFader1Blinking() {
      return store.getActiveDevice().fader_status["A"].mute_state === "MutedToAll";
    },
    isFader2Blinking() {
      return store.getActiveDevice().fader_status["B"].mute_state === "MutedToAll";
    },
    isFader3Blinking() {
      return store.getActiveDevice().fader_status["C"].mute_state === "MutedToAll";
    },
    isFader4Blinking() {
      return store.getActiveDevice().fader_status["D"].mute_state === "MutedToAll";
    },
    isMuteBlinking() {
      return store.getActiveDevice().cough_button.state === "MutedToAll";
    },
    muteInactiveColor() {
      return '#' + store.getActiveDevice().lighting.buttons.Cough.colours.colour_two;
    }
  },
  watch: {
    // TODO: implement error handling if query fails (mini svg is missing some features)
    isTopLeftSampleRecording(active) {
      const elem = document.querySelector(".sampler #TopLeft");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isTopRightSampleRecording(active) {
      const elem = document.querySelector(".sampler #TopRight");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isBottomLeftSampleRecording(active) {
      const elem = document.querySelector(".sampler #BottomLeft");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isBottomRightSampleRecording(active) {
      const elem = document.querySelector(".sampler #BottomRight");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isClearActive(active) {
      const elem = document.querySelector(".sampler #Clear");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isMuteBlinking(active) {
      const elem = document.querySelector(".cough #Mute");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isFader1Blinking(active) {
      const elem = document.querySelector("#Channel1 #Mute");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isFader2Blinking(active) {
      const elem = document.querySelector("#Channel2 #Mute");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isFader3Blinking(active) {
      const elem = document.querySelector("#Channel3 #Mute");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    },
    isFader4Blinking(active) {
      const elem = document.querySelector("#Channel4 #Mute");
      if (active) elem.classList.add("blink");
      else elem.classList.remove("blink");
    }
  }
}
</script>

<style scoped>
#GoXLR { width: 100%; height: 100%; }
#Logo { color: v-bind("computeAccentColor()"); }

/* animations */
@keyframes sampler-sample-blink-animation {
  0%, 49% { color: v-bind('computeSamplerBlinkColor(1)'); }
  50%, 100% { color: v-bind('computeSamplerBlinkColor(2)'); }
}
@keyframes sampler-clear-blink-animation {
  0%, 49% { color: v-bind('computeSamplerClearColor(1)'); }
  50%, 100% { color: v-bind('computeSamplerClearColor(2)'); }
}
@keyframes mute-blink-animation {
  0%, 49% { color: v-bind('computeCoughButtonColor()'); }
  50%, 100% { color: v-bind('muteInactiveColor'); }
}
@keyframes fader1-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColor("A")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColor("A")'); }
}
@keyframes fader2-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColor("B")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColor("B")'); }
}
@keyframes fader3-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColor("C")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColor("C")'); }
}
@keyframes fader4-mute-blink-animation {
  0%, 49% { color: v-bind('computeMixerMuteColor("D")'); }
  50%, 100% { color: v-bind('computeMixerMuteBlinkColor("D")'); }
}

/* cough area */
.cough #Mute { color: v-bind('computeCoughButtonColor()'); }
.cough #Mute.blink { animation: mute-blink-animation 1s infinite; }
.cough #Bleep { color: v-bind('computeBleepButtonColor()'); }
/* TODO: animation */

/* effects area: buttons */
.effects .buttons #Megaphone { color: v-bind('computeEffectButtonColor("EffectMegaphone", "megaphone")'); }
.effects .buttons #Robot { color: v-bind('computeEffectButtonColor("EffectRobot", "robot")'); }
.effects .buttons #HardTune { color: v-bind('computeEffectButtonColor("EffectHardTune", "hard_tune")'); }
.effects .buttons #FX { color: v-bind('computeEffectButtonColor("EffectFx", null)'); }
.effects .presets #Preset1 { color: v-bind('computeEffectPresetColor(1)'); }
.effects .presets #Preset2 { color: v-bind('computeEffectPresetColor(2)'); }
.effects .presets #Preset3 { color: v-bind('computeEffectPresetColor(3)'); }
.effects .presets #Preset4 { color: v-bind('computeEffectPresetColor(4)'); }
.effects .presets #Preset5 { color: v-bind('computeEffectPresetColor(5)'); }
.effects .presets #Preset6 { color: v-bind('computeEffectPresetColor(6)'); }

/* effects area: reverb encoder */
.effects .encoders .reverb #Encoder {
  transform: v-bind('computeEncoderRotation("reverb")');
  color: v-bind('computeEncoderColor("Reverb")');
}
.effects .encoders .reverb .level #Level1 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 1)'); }
.effects .encoders .reverb .level #Level2 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 2)'); }
.effects .encoders .reverb .level #Level3 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 3)'); }
.effects .encoders .reverb .level #Level4 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 4)'); }
.effects .encoders .reverb .level #Level5 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 5)'); }
.effects .encoders .reverb .level #Level6 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 6)'); }
.effects .encoders .reverb .level #Level7 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 7)'); }
.effects .encoders .reverb .level #Level8 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 8)'); }
.effects .encoders .reverb .level #Level9 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 9)'); }
.effects .encoders .reverb .level #Level10 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 10)'); }
.effects .encoders .reverb .level #Level11 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 11)'); }
.effects .encoders .reverb .level #Level12 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 12)'); }
.effects .encoders .reverb .level #Level13 { color: v-bind('computeEncoderLevelColor("reverb", "Reverb", 13)'); }

/* effects area: pitch encoder */
.effects .encoders .pitch #Encoder {
  transform: v-bind('computeEncoderRotation("pitch", true)');
  color: v-bind('computeEncoderColor("Pitch")');
}
.effects .encoders .pitch .level #Level1 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", -6, true, true)'); }
.effects .encoders .pitch .level #Level2 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", -5, true, true)'); }
.effects .encoders .pitch .level #Level3 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", -4, true, true)'); }
.effects .encoders .pitch .level #Level4 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", -3, true, true)'); }
.effects .encoders .pitch .level #Level5 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", -2, true, true)'); }
.effects .encoders .pitch .level #Level6 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", -1, true, true)'); }
.effects .encoders .pitch .level #Level7 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 0, true, true)'); }
.effects .encoders .pitch .level #Level8 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 1, true, true)'); }
.effects .encoders .pitch .level #Level9 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 2, true, true)'); }
.effects .encoders .pitch .level #Level10 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 3, true, true)'); }
.effects .encoders .pitch .level #Level11 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 4, true, true)'); }
.effects .encoders .pitch .level #Level12 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 5, true, true)'); }
.effects .encoders .pitch .level #Level13 { color: v-bind('computeEncoderLevelColor("pitch", "Pitch", 6, true, true)'); }

/* effects area: echo encoder */
.effects .encoders .echo #Encoder {
  transform: v-bind('computeEncoderRotation("echo")');
  color: v-bind('computeEncoderColor("Echo")');
}
.effects .encoders .echo .level #Level1 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 1)'); }
.effects .encoders .echo .level #Level2 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 2)'); }
.effects .encoders .echo .level #Level3 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 3)'); }
.effects .encoders .echo .level #Level4 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 4)'); }
.effects .encoders .echo .level #Level5 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 5)'); }
.effects .encoders .echo .level #Level6 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 6)'); }
.effects .encoders .echo .level #Level7 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 7)'); }
.effects .encoders .echo .level #Level8 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 8)'); }
.effects .encoders .echo .level #Level9 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 9)'); }
.effects .encoders .echo .level #Level10 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 10)'); }
.effects .encoders .echo .level #Level11 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 11)'); }
.effects .encoders .echo .level #Level12 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 12)'); }
.effects .encoders .echo .level #Level13 { color: v-bind('computeEncoderLevelColor("echo", "Echo", 13)'); }

/* effects area: gender encoder */
.effects .encoders .gender #Encoder {
  transform: v-bind('computeEncoderRotation("gender", true)');
  color: v-bind('computeEncoderColor("Gender")');
}
.effects .encoders .gender .level #Level1 { color: v-bind('computeEncoderLevelColor("gender", "Gender", -6, true)'); }
.effects .encoders .gender .level #Level2 { color: v-bind('computeEncoderLevelColor("gender", "Gender", -5, true)'); }
.effects .encoders .gender .level #Level3 { color: v-bind('computeEncoderLevelColor("gender", "Gender", -4, true)'); }
.effects .encoders .gender .level #Level4 { color: v-bind('computeEncoderLevelColor("gender", "Gender", -3, true)'); }
.effects .encoders .gender .level #Level5 { color: v-bind('computeEncoderLevelColor("gender", "Gender", -2, true)'); }
.effects .encoders .gender .level #Level6 { color: v-bind('computeEncoderLevelColor("gender", "Gender", -1, true)'); }
.effects .encoders .gender .level #Level7 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 0, true)'); }
.effects .encoders .gender .level #Level8 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 1, true)'); }
.effects .encoders .gender .level #Level9 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 2, true)'); }
.effects .encoders .gender .level #Level10 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 3, true)'); }
.effects .encoders .gender .level #Level11 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 4, true)'); }
.effects .encoders .gender .level #Level12 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 5, true)'); }
.effects .encoders .gender .level #Level13 { color: v-bind('computeEncoderLevelColor("gender", "Gender", 6, true)'); }

/* sampler area: buttons */
.sampler #BankA { color: v-bind('computeSamplerBankColor("A")'); }
.sampler #BankB { color: v-bind('computeSamplerBankColor("B")'); }
.sampler #BankC { color: v-bind('computeSamplerBankColor("C")'); }
.sampler #Clear { color: v-bind('computeSamplerClearColor(2)'); }
.sampler #Clear.blink { animation: sampler-clear-blink-animation 1s infinite; }
.sampler #TopLeft { color: v-bind('computeSamplerSampleColor("TopLeft")'); }
.sampler #TopLeft.blink { animation: sampler-sample-blink-animation 1s infinite; }
.sampler #TopRight { color: v-bind('computeSamplerSampleColor("TopRight")'); }
.sampler #TopRight.blink { animation: sampler-sample-blink-animation 1s infinite; }
.sampler #BottomLeft { color: v-bind('computeSamplerSampleColor("BottomLeft")'); }
.sampler #BottomLeft.blink { animation: sampler-sample-blink-animation 1s infinite; }
.sampler #BottomRight { color: v-bind('computeSamplerSampleColor("BottomRight")'); }
.sampler #BottomRight.blink { animation: sampler-sample-blink-animation 1s infinite; }

/* mixer area: fader */
#Channel1 .rail #Fader { transform: v-bind('computeMixerFaderPosition("A")'); }
#Channel2 .rail #Fader { transform: v-bind('computeMixerFaderPosition("B")'); }
#Channel3 .rail #Fader { transform: v-bind('computeMixerFaderPosition("C")'); }
#Channel4 .rail #Fader { transform: v-bind('computeMixerFaderPosition("D")'); }

/* mixer area: mute buttons */
#Channel1 #Mute { color: v-bind('computeMixerMuteColor("A")'); }
#Channel1 #Mute.blink { animation: fader1-mute-blink-animation 1s infinite; }
#Channel2 #Mute { color: v-bind('computeMixerMuteColor("B")'); }
#Channel2 #Mute.blink { animation: fader2-mute-blink-animation 1s infinite; }
#Channel3 #Mute { color: v-bind('computeMixerMuteColor("C")'); }
#Channel3 #Mute.blink { animation: fader3-mute-blink-animation 1s infinite; }
#Channel4 #Mute { color: v-bind('computeMixerMuteColor("D")'); }
#Channel4 #Mute.blink { animation: fader4-mute-blink-animation 1s infinite; }

/* mixer area: fader 1 */
#Channel1 .display text { display: none; } /* disabled because of missing implementation */
#Channel1 .display image { display: none; }
#Channel1 .display #Backlight { color: v-bind('computeMixerDisplayColor(1)'); }
#Channel1 .level #Level1 { color: v-bind('computeMixerLevelColor("A", 1)'); }
#Channel1 .level #Level2 { color: v-bind('computeMixerLevelColor("A", 2)'); }
#Channel1 .level #Level3 { color: v-bind('computeMixerLevelColor("A", 3)'); }
#Channel1 .level #Level4 { color: v-bind('computeMixerLevelColor("A", 4)'); }
#Channel1 .level #Level5 { color: v-bind('computeMixerLevelColor("A", 5)'); }
#Channel1 .level #Level6 { color: v-bind('computeMixerLevelColor("A", 6)'); }
#Channel1 .level #Level7 { color: v-bind('computeMixerLevelColor("A", 7)'); }
#Channel1 .level #Level8 { color: v-bind('computeMixerLevelColor("A", 8)'); }
#Channel1 .level #Level9 { color: v-bind('computeMixerLevelColor("A", 9)'); }
#Channel1 .level #Level10 { color: v-bind('computeMixerLevelColor("A", 10)'); }
#Channel1 .level #Level11 { color: v-bind('computeMixerLevelColor("A", 11)'); }
#Channel1 .level #Level12 { color: v-bind('computeMixerLevelColor("A", 12)'); }
#Channel1 .level #Level13 { color: v-bind('computeMixerLevelColor("A", 13)'); }
#Channel1 .level #Level14 { color: v-bind('computeMixerLevelColor("A", 14)'); }
#Channel1 .level #Level15 { color: v-bind('computeMixerLevelColor("A", 15)'); }

/* mixer area: fader 2 */
#Channel2 .display text { display: none; } /* disabled because of missing implementation */
#Channel2 .display image { display: none; }
#Channel2 .display #Backlight { color: v-bind('computeMixerDisplayColor(2)'); }
#Channel2 .level #Level1 { color: v-bind('computeMixerLevelColor("B", 1)'); }
#Channel2 .level #Level2 { color: v-bind('computeMixerLevelColor("B", 2)'); }
#Channel2 .level #Level3 { color: v-bind('computeMixerLevelColor("B", 3)'); }
#Channel2 .level #Level4 { color: v-bind('computeMixerLevelColor("B", 4)'); }
#Channel2 .level #Level5 { color: v-bind('computeMixerLevelColor("B", 5)'); }
#Channel2 .level #Level6 { color: v-bind('computeMixerLevelColor("B", 6)'); }
#Channel2 .level #Level7 { color: v-bind('computeMixerLevelColor("B", 7)'); }
#Channel2 .level #Level8 { color: v-bind('computeMixerLevelColor("B", 8)'); }
#Channel2 .level #Level9 { color: v-bind('computeMixerLevelColor("B", 9)'); }
#Channel2 .level #Level10 { color: v-bind('computeMixerLevelColor("B", 10)'); }
#Channel2 .level #Level11 { color: v-bind('computeMixerLevelColor("B", 11)'); }
#Channel2 .level #Level12 { color: v-bind('computeMixerLevelColor("B", 12)'); }
#Channel2 .level #Level13 { color: v-bind('computeMixerLevelColor("B", 13)'); }
#Channel2 .level #Level14 { color: v-bind('computeMixerLevelColor("B", 14)'); }
#Channel2 .level #Level15 { color: v-bind('computeMixerLevelColor("B", 15)'); }

/* mixer area: fader 3 */
#Channel3 .display text { display: none; } /* disabled because of missing implementation */
#Channel3 .display image { display: none; }
#Channel3 .display #Backlight { color: v-bind('computeMixerDisplayColor(3)'); }
#Channel3 .level #Level1 { color: v-bind('computeMixerLevelColor("C", 1)'); }
#Channel3 .level #Level2 { color: v-bind('computeMixerLevelColor("C", 2)'); }
#Channel3 .level #Level3 { color: v-bind('computeMixerLevelColor("C", 3)'); }
#Channel3 .level #Level4 { color: v-bind('computeMixerLevelColor("C", 4)'); }
#Channel3 .level #Level5 { color: v-bind('computeMixerLevelColor("C", 5)'); }
#Channel3 .level #Level6 { color: v-bind('computeMixerLevelColor("C", 6)'); }
#Channel3 .level #Level7 { color: v-bind('computeMixerLevelColor("C", 7)'); }
#Channel3 .level #Level8 { color: v-bind('computeMixerLevelColor("C", 8)'); }
#Channel3 .level #Level9 { color: v-bind('computeMixerLevelColor("C", 9)'); }
#Channel3 .level #Level10 { color: v-bind('computeMixerLevelColor("C", 10)'); }
#Channel3 .level #Level11 { color: v-bind('computeMixerLevelColor("C", 11)'); }
#Channel3 .level #Level12 { color: v-bind('computeMixerLevelColor("C", 12)'); }
#Channel3 .level #Level13 { color: v-bind('computeMixerLevelColor("C", 13)'); }
#Channel3 .level #Level14 { color: v-bind('computeMixerLevelColor("C", 14)'); }
#Channel3 .level #Level15 { color: v-bind('computeMixerLevelColor("C", 15)'); }

/* mixer area: fader 4 */
#Channel4 .display text { display: none; } /* disabled because of missing implementation */
#Channel4 .display image { display: none; }
#Channel4 .display #Backlight { color: v-bind('computeMixerDisplayColor(4)'); }
#Channel4 .level #Level1 { color: v-bind('computeMixerLevelColor("D", 1)'); }
#Channel4 .level #Level2 { color: v-bind('computeMixerLevelColor("D", 2)'); }
#Channel4 .level #Level3 { color: v-bind('computeMixerLevelColor("D", 3)'); }
#Channel4 .level #Level4 { color: v-bind('computeMixerLevelColor("D", 4)'); }
#Channel4 .level #Level5 { color: v-bind('computeMixerLevelColor("D", 5)'); }
#Channel4 .level #Level6 { color: v-bind('computeMixerLevelColor("D", 6)'); }
#Channel4 .level #Level7 { color: v-bind('computeMixerLevelColor("D", 7)'); }
#Channel4 .level #Level8 { color: v-bind('computeMixerLevelColor("D", 8)'); }
#Channel4 .level #Level9 { color: v-bind('computeMixerLevelColor("D", 9)'); }
#Channel4 .level #Level10 { color: v-bind('computeMixerLevelColor("D", 10)'); }
#Channel4 .level #Level11 { color: v-bind('computeMixerLevelColor("D", 11)'); }
#Channel4 .level #Level12 { color: v-bind('computeMixerLevelColor("D", 12)'); }
#Channel4 .level #Level13 { color: v-bind('computeMixerLevelColor("D", 13)'); }
#Channel4 .level #Level14 { color: v-bind('computeMixerLevelColor("D", 14)'); }
#Channel4 .level #Level15 { color: v-bind('computeMixerLevelColor("D", 15)'); }
</style>