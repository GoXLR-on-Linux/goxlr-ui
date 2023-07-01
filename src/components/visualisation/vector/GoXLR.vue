<template>
  <img svg-inline src="@/components/visualisation/vector/svg/GoXLR.svg" alt="GoXLR preview">
</template>

<script>
import {store} from "@/store";
import {EffectLightingPresets, EffectPresets} from "@/util/mixerMapping";

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

    computeAccentColor() {
      return `#${store.getActiveDevice().lighting.simple.Accent.colour_one}`;
    },

    computeFaderPosition(fader) {
      let channel = store.getActiveDevice().fader_status[fader].channel;
      let faderPosition = store.getActiveDevice().levels.volumes[channel];

      let height = 110;
      let transform = Math.ceil(height / 255 * faderPosition);
      return `translateY(-${transform}pt)`
    },

    computeCoughButtonColor() {
      const colors = store.getActiveDevice().lighting.buttons.Cough.colours;
      let colorOne = this.transformColor(colors.colour_one),
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
            isPressed = store.getActiveDevice().button_down.Bleep;
      let colorOne = this.transformColor(colors.colour_one),
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
            active = (effectStateName) === null ? store.getActiveDevice().effects.is_enabled : store.getActiveDevice().effects.current[effectStateName].is_enabled;
      let colorOne = this.transformColor(colors.colour_one),
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
          activePreset = EffectLightingPresets[EffectPresets.indexOf(store.getActiveDevice().effects.active_preset)];
      let colorOne = this.transformColor(colors.colour_one),
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

    computeEncoderRotation(effectName) {
      const effectAmount = store.getActiveDevice().effects.current[effectName].amount,
          transfromRotationLimit = 270;

      return `rotate(${Math.ceil(transfromRotationLimit / 100 * effectAmount)}deg)`;
    },
    computeEncoderColor(effectName) {
      return `#${store.getActiveDevice().lighting.encoders[effectName].colour_three}`;
    },
    computerEncoderLevelColor(effectEncoderName, effectLightingName, indicatorLevel, centerMode = false, affectedByHardTune = false) {
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
    }
  }
}
</script>

<style scoped>
#GoXLR { width: 100%; height: 100%; }
#Logo { color: v-bind("computeAccentColor()"); }

/* fader */
.mixer #Channel1 .rail #Fader { transform: v-bind('computeFaderPosition("A")'); }
.mixer #Channel2 .rail #Fader { transform: v-bind('computeFaderPosition("B")'); }
.mixer #Channel3 .rail #Fader { transform: v-bind('computeFaderPosition("C")'); }
.mixer #Channel4 .rail #Fader { transform: v-bind('computeFaderPosition("D")'); }

/* cough area */
.cough #Mute { color: v-bind('computeCoughButtonColor()'); }
.cough #Bleep { color: v-bind('computeBleepButtonColor()'); }

/* effect area buttons */
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

/* reverb encoder */
.effects .encoders .reverb #Encoder {
  transform: v-bind('computeEncoderRotation("reverb")');
  color: v-bind('computeEncoderColor("Reverb")');
}
.effects .encoders .reverb .level #Level1 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 1)'); }
.effects .encoders .reverb .level #Level2 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 2)'); }
.effects .encoders .reverb .level #Level3 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 3)'); }
.effects .encoders .reverb .level #Level4 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 4)'); }
.effects .encoders .reverb .level #Level5 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 5)'); }
.effects .encoders .reverb .level #Level6 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 6)'); }
.effects .encoders .reverb .level #Level7 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 7)'); }
.effects .encoders .reverb .level #Level8 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 8)'); }
.effects .encoders .reverb .level #Level9 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 9)'); }
.effects .encoders .reverb .level #Level10 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 10)'); }
.effects .encoders .reverb .level #Level11 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 11)'); }
.effects .encoders .reverb .level #Level12 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 12)'); }
.effects .encoders .reverb .level #Level13 { color: v-bind('computerEncoderLevelColor("reverb", "Reverb", 13)'); }

/* pitch encoder */
.effects .encoders .pitch #Encoder {
  transform: v-bind('computeEncoderRotation("pitch")');
  color: v-bind('computeEncoderColor("Pitch")');
}
.effects .encoders .pitch .level #Level1 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", -6, true, true)'); }
.effects .encoders .pitch .level #Level2 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", -5, true, true)'); }
.effects .encoders .pitch .level #Level3 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", -4, true, true)'); }
.effects .encoders .pitch .level #Level4 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", -3, true, true)'); }
.effects .encoders .pitch .level #Level5 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", -2, true, true)'); }
.effects .encoders .pitch .level #Level6 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", -1, true, true)'); }
.effects .encoders .pitch .level #Level7 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 0, true, true)'); }
.effects .encoders .pitch .level #Level8 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 1, true, true)'); }
.effects .encoders .pitch .level #Level9 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 2, true, true)'); }
.effects .encoders .pitch .level #Level10 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 3, true, true)'); }
.effects .encoders .pitch .level #Level11 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 4, true, true)'); }
.effects .encoders .pitch .level #Level12 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 5, true, true)'); }
.effects .encoders .pitch .level #Level13 { color: v-bind('computerEncoderLevelColor("pitch", "Pitch", 6, true, true)'); }

/* echo encoder */
.effects .encoders .echo #Encoder {
  transform: v-bind('computeEncoderRotation("echo")');
  color: v-bind('computeEncoderColor("Echo")');
}
.effects .encoders .echo .level #Level1 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 1)'); }
.effects .encoders .echo .level #Level2 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 2)'); }
.effects .encoders .echo .level #Level3 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 3)'); }
.effects .encoders .echo .level #Level4 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 4)'); }
.effects .encoders .echo .level #Level5 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 5)'); }
.effects .encoders .echo .level #Level6 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 6)'); }
.effects .encoders .echo .level #Level7 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 7)'); }
.effects .encoders .echo .level #Level8 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 8)'); }
.effects .encoders .echo .level #Level9 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 9)'); }
.effects .encoders .echo .level #Level10 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 10)'); }
.effects .encoders .echo .level #Level11 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 11)'); }
.effects .encoders .echo .level #Level12 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 12)'); }
.effects .encoders .echo .level #Level13 { color: v-bind('computerEncoderLevelColor("echo", "Echo", 13)'); }

/* gender encoder */
.effects .encoders .gender #Encoder {
  transform: v-bind('computeEncoderRotation("gender")');
  color: v-bind('computeEncoderColor("Gender")');
}
.effects .encoders .gender .level #Level1 { color: v-bind('computerEncoderLevelColor("gender", "Gender", -6, true)'); }
.effects .encoders .gender .level #Level2 { color: v-bind('computerEncoderLevelColor("gender", "Gender", -5, true)'); }
.effects .encoders .gender .level #Level3 { color: v-bind('computerEncoderLevelColor("gender", "Gender", -4, true)'); }
.effects .encoders .gender .level #Level4 { color: v-bind('computerEncoderLevelColor("gender", "Gender", -3, true)'); }
.effects .encoders .gender .level #Level5 { color: v-bind('computerEncoderLevelColor("gender", "Gender", -2, true)'); }
.effects .encoders .gender .level #Level6 { color: v-bind('computerEncoderLevelColor("gender", "Gender", -1, true)'); }
.effects .encoders .gender .level #Level7 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 0, true)'); }
.effects .encoders .gender .level #Level8 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 1, true)'); }
.effects .encoders .gender .level #Level9 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 2, true)'); }
.effects .encoders .gender .level #Level10 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 3, true)'); }
.effects .encoders .gender .level #Level11 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 4, true)'); }
.effects .encoders .gender .level #Level12 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 5, true)'); }
.effects .encoders .gender .level #Level13 { color: v-bind('computerEncoderLevelColor("gender", "Gender", 6, true)'); }

</style>