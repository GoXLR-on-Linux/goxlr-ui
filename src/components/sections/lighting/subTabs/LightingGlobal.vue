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
      options: [
        {
          id: 'Global',
          label: 'Global',
        },
        {
          id: 'Accent',
          label: 'Accent'
        }
      ],
      animation_mode_options: [
        {
          id: 'None',
          label: 'None',
        },
        {
          id: 'RetroRainbow',
          label: 'Rainbow Retro'
        },
        {
          id: 'RainbowBright',
          label: 'Rainbow Bright'
        },
        {
          id: 'RainbowDark',
          label: 'Rainbow Dark'
        },
        {
          id: 'Simple',
          label: 'Simple'
        },
        {
          id: 'Ripple',
          label: 'Ripple'
        }
      ],

      selected: 'Global',
      mod1Value: 0,
      mod2Value: 0,
    }
  },

  methods: {
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

    // Mod1 Settings..
    getMod1StorePath() {
      return "/mixers/S201200586CQK/lighting/animation/mod1"
    },

    getMod1Value() {
      return store.getActiveDevice().lighting.animation.mod1;
    },

    setMod1Value(value) {
      value = parseInt(value);

      store.getActiveDevice().lighting.animation.mod1 = value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod1": value});
    },

    getMod2StorePath() {
      return "/mixers/S201200586CQK/lighting/animation/mod2"
    },

    getMod2Value() {
      return store.getActiveDevice().lighting.animation.mod2;
    },

    setMod2Value(value) {
      value = parseInt(value);

      store.getActiveDevice().lighting.animation.mod2 = value;
      websocket.send_command(store.getActiveSerial(), {"SetAnimationMod2": value});
    },

    isWaterFallActive(type) {
      return store.getActiveDevice().lighting.animation.waterfall_direction === type;
    },

    setWaterfall(mode) {
      console.log(mode);
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
      <GroupContainer title="Areas">
        <RadioSelection title="Area" group="lighting_global_areas" :options="this.options" :selected="this.selected"
                        @selection-changed="onSelectionChange"/>
        <ColourPicker title="Colour" :color-value="color()" @colour-changed="onColourChange"/>
      </GroupContainer>
      <GroupContainer v-if="animationSupported()" title="Animations">
        <RadioSelection title="Animation Mode" group="lighting_animation" :options="this.animation_mode_options"
                        :selected="this.animationModeSelected()" @selection-changed="onAnimationModeChange"/>

        <div style="text-align: center; color: #fff; padding-left: 8px">
          <div style="margin-bottom: 10px">GRADIENT MOD 1</div>
          <RangeSelector
              :store-path=getMod1StorePath()
              :current-field-value=mod1Value
              @value-updated="setMod1Value"
              :needs-rotation="false" :height=180
          />
          <div style="margin-top: 12px; margin-bottom: 20px; color: #82CFD0">{{ getMod1Value() }}</div>

          <div style="margin-bottom: 10px">GRADIENT MOD 2</div>
          <RangeSelector
              :store-path=getMod2StorePath()
              :current-field-value=mod2Value
              @value-updated="setMod2Value"
              :needs-rotation="false" :height=180
          />
          <div style="margin-top: 12px; color: #82CFD0">{{ getMod2Value() }}</div>

          <div style="margin-top: 10px">
            <div style="margin-bottom: 5px">WATERFALL SETTINGS</div>
            <div class="waterfall" :class="{ active: isWaterFallActive('Up') }" @click="setWaterfall('Up')">
              <font-awesome-icon icon="fa-solid fa-up-long"/>
            </div>
            <div class="waterfall" :class="{ active: isWaterFallActive('Down') }" @click="setWaterfall('Down')">
              <font-awesome-icon icon="fa-solid fa-down-long"/>
            </div>
            <div class="wf-button">
              <button style="width: 100%" :class="{ active: isWaterFallActive('Off')}" @click="setWaterfall('Off')">
                Off
              </button>
            </div>
          </div>
        </div>
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
</template>

<style scoped>
.waterfall {
  cursor: pointer;
  display: inline-block;
  width: 50%;
  font-size: 40px
}

.waterfall.active {
  color: #59B1B6;
}

.waterfall:not(.active) {
  color: #447475;
}

.wf-button > button {
  border: none;
  width: 100%;
  font-size: 12px;
  background-color: #447475;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  padding: 3px;
}

.wf-button > button.active {
  background-color: #59B1B6;
}

</style>