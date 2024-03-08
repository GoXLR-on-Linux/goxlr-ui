<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import RangeSelector from "@/components/slider/components/Range.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {isDeviceMini} from "@/util/util";

export default {
  name: "LightingGlobal",
  components: {
    FontAwesomeIcon,
    RangeSelector,
    CenteredContainer,
    ContentContainer,
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      selected: 'Global',
      mod1Value: 0,
      mod2Value: 0,
      lock_updates: false,
    }
  },

  methods: {
    getNodes() {
      return [];
    },

    getAreaOptions() {
      return [
        {
          id: 'Global',
          label: this.$t('message.lighting.global.areas.areas.global'),
        },
        {
          id: 'Accent',
          label: this.$t('message.lighting.global.areas.areas.accent')
        }
      ];
    },

    getAnimationOptions() {
      let animations = [
        {
          id: 'None',
          label: this.$t("message.lighting.global.animations.modes.none"),
        },
        {
          id: 'RetroRainbow',
          label: this.$t("message.lighting.global.animations.modes.rainbowRetro")
        },
        {
          id: 'RainbowBright',
          label: this.$t("message.lighting.global.animations.modes.rainbowBright")
        },
        {
          id: 'RainbowDark',
          label: this.$t("message.lighting.global.animations.modes.rainbowDark")
        },
        {
          id: 'Simple',
          label: this.$t("message.lighting.global.animations.modes.simple")
        },
      ];

      // Apparently Ripple isn't supported on the mini..
      if (!isDeviceMini()) {
        animations.push({
          id: 'Ripple',
          label: this.$t("message.lighting.global.animations.modes.ripple")
        });
      }
      return animations;
    },

    color() {
      return "#" + store.getActiveDevice().lighting.simple[this.selected].colour_one;
    },

    onSelectionChange(option) {
      this.selected = option
    },

    onColourChange(value) {
      if (this.selected === "Accent") {
        websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [this.selected, value.substr(1, 6)]});
      } else {
        websocket.send_command(store.getActiveSerial(), {"SetGlobalColour": value.substr(1, 6)});
      }
    },

    animationSupported() {
      return store.getActiveDevice().lighting.animation.supported;
    },

    animationModeSelected() {
      return store.getActiveDevice().lighting.animation.mode;
    },

    onAnimationModeChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMode": id});
    },

    // Range Helpers
    getRangeColour(enabled) {
      if (enabled) {
        return "#82CFD0";
      }
      return "#3b7679";
    },

    // Mod1 Settings..
    isMod1Enabled() {
      return this.animationModeSelected() !== "None";
    },

    getMod1StorePath() {
      return "/mixers/S201200586CQK/lighting/animation/mod1"
    },

    getMod1Value() {
      return store.getActiveDevice().lighting.animation.mod1;
    },

    setMod1Value(value) {
      value = parseInt(value);
      this.mod1Value = value;
      if (this.lock_updates) {
        return;
      }

      this.lock_updates = true;
      store.getActiveDevice().lighting.animation.mod1 = value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod1": value}).then(() => {
        this.lock_updates = false;
      });
    },

    // Mod2 Settings..
    isMod2Enabled() {
      let mode = this.animationModeSelected();
      return mode === "RainbowBright" || mode === "RainbowDark";
    },

    getMod2StorePath() {
      return "/mixers/S201200586CQK/lighting/animation/mod2"
    },

    getMod2Value() {
      return store.getActiveDevice().lighting.animation.mod2;
    },

    setMod2Value(value) {
      value = parseInt(value);
      this.mod2Value = value;

      if (this.lock_updates) {
        return;
      }

      this.lock_updates = true;
      store.getActiveDevice().lighting.animation.mod2 = value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod2": value}).then(() => {
        this.lock_updates = false;
      });
    },

    mouseUp(id) {
      if (id === "mod1") {
        // Force an update with this value..
        store.getActiveDevice().lighting.animation.mod1 = this.mod1Value;
        websocket.send_command(store.getActiveSerial(), {"SetAnimationMod1": this.mod1Value});
        return;
      }

      store.getActiveDevice().lighting.animation.mod2 = this.mod2Value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod2": this.this.mod2Value});
    },

    // Waterfall Settings..
    isWaterfallEnabled() {
      let mode = this.animationModeSelected();
      return mode !== "None" && mode !== "RetroRainbow";
    },

    isWaterFallActive(type) {
      return store.getActiveDevice().lighting.animation.waterfall_direction === type;
    },

    setWaterfall(mode) {
      if (!this.isWaterfallEnabled()) {
        return;
      }
      websocket.send_command(store.getActiveSerial(), {"SetAnimationWaterfall": mode});
    }

  },
  mounted() {
    this.mod1Value = store.getActiveDevice().lighting.animation.mod1;
    this.mod2Value = store.getActiveDevice().lighting.animation.mod2;
  }
}
</script>

<template>
  <CenteredContainer>
    <ContentContainer style="padding-top: 15px; padding-bottom: 20px">
      <GroupContainer :title="$t('message.lighting.global.areas.title')">
        <RadioSelection :title="$t('message.lighting.global.areas.area')" group="lighting_global_areas" :options="getAreaOptions()" :selected="this.selected"
                        @selection-changed="onSelectionChange"/>
        <ColourPicker :title="$t('message.lighting.common.colour')" :color-value="color()"
                      @colour-changed="onColourChange"/>
      </GroupContainer>
      <GroupContainer v-if="animationSupported()" :title="$t('message.lighting.global.animations.title')">
        <RadioSelection :title="$t('message.lighting.global.animations.mode')" group="lighting_animation"
                        :options="getAnimationOptions()" :selected="this.animationModeSelected()"
                        @selection-changed="onAnimationModeChange"/>

        <div style="text-align: center; color: #fff; padding-left: 8px">
          <div class="title" :class="{ disabled: !isMod1Enabled()}">
            {{ $t('message.lighting.global.animations.mod1') }}
          </div>
          <RangeSelector
              id="mod1"
              :store-path=getMod1StorePath()
              :current-field-value=mod1Value
              @value-updated="setMod1Value"
              :needs-rotation="false" :height=180
              :disabled="!isMod1Enabled()"
              :colour="getRangeColour(isMod1Enabled())"
              @mouse-up="mouseUp"

          />
          <div class="modValue" :class="{ disabled: !isMod1Enabled()}">{{ getMod1Value() }}</div>

          <div class="title" :class="{ disabled: !isMod2Enabled()}">
            {{ $t('message.lighting.global.animations.mod2') }}
          </div>
          <RangeSelector
              id="mod2"
              :store-path=getMod2StorePath()
              :current-field-value=mod2Value
              @value-updated="setMod2Value"
              :needs-rotation="false" :height=180
              :disabled="!isMod2Enabled()"
              :colour="getRangeColour(isMod2Enabled())"
              @mouse-up="mouseUp"
          />
          <div class="modValue" :class="{ disabled: !isMod2Enabled()}">{{ getMod2Value() }}</div>

          <div>
            <div class="title" :class="{ disabled: !isWaterfallEnabled()}">
              {{ $t('message.lighting.global.animations.waterfall') }}
            </div>
            <div class="waterfall" :class="{ active: isWaterFallActive('Up'), disabled: !isWaterfallEnabled() }"
                 @click="setWaterfall('Up')">
              <font-awesome-icon icon="fa-solid fa-up-long"/>
            </div>
            <div class="waterfall" :class="{ active: isWaterFallActive('Down'), disabled: !isWaterfallEnabled() }"
                 @click="setWaterfall('Down')">
              <font-awesome-icon icon="fa-solid fa-down-long"/>
            </div>
            <div class="wf-button" :class="{ disabled: !isWaterfallEnabled() }">
              <button :class="{ active: isWaterFallActive('Off') }" style="width: 100%" @click="setWaterfall('Off')"
                      :disabled="!isWaterfallEnabled()">
                {{ $t('message.lighting.global.animations.waterfallOff') }}
              </button>
            </div>
          </div>
        </div>
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
</template>

<style scoped>
.title {
  margin-bottom: 10px;
  margin-top: 1px;
  text-transform: uppercase;
}

.title.disabled {
  color: #818483;
}

.modValue {
  margin-top: 12px;
  margin-bottom: 12px;
  color: #82CFD0;
}

.modValue.disabled {
  color: #3C6061;
}

.waterfall {
  cursor: pointer;
  display: inline-block;
  width: 50%;
  font-size: 40px
}

.waterfall.active {
  color: #59B1B6;

}

.waterfall.active.disabled {
  cursor: initial;
  color: #427273;
}

.waterfall:not(.active) {
  color: #447475;
}

.waterfall:not(.active).disabled {
  cursor: initial;
  color: #385352;
}

.wf-button > button {
  border: none;
  width: 100%;
  font-size: 12px;
  background-color: #447475;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  padding: 3px;
  cursor: pointer;
}

.wf-button > button.active {
  background-color: #59B1B6;
}

.wf-button > button:disabled {
  cursor: initial;
  background-color: #385352;
}

.wf-button > button.active:disabled {
  cursor: initial;
  color: #427273;
}


</style>
