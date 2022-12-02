<template>
  <MainTabContent :no-left-pad=false>
    <ContentBox title="Preset Buttons">
      <ButtonList title="Preset">
        <PushButton v-for="(value, id) in effectPresets" :key="id" :button-id="value"
                    :is-active="activePreset === value" :label="getLabel(id, value)" @click="activePreset = value"/>
      </ButtonList>
      <ColourBox id="active" title="Active" :colour-value="getColour(true)" @colour-changed="onColourChange"/>
      <ButtonList title="Inactive Option">
        <PushButton label="Dim Active Colour" :is-active="isPresetMuteInactiveState('Dimmed')"
                    @click="setPresetMuteInactiveState('Dimmed')"/>
        <PushButton label="Inactive Colour" :is-active="isPresetMuteInactiveState('Colour2')"
                    @click="setPresetMuteInactiveState('Colour2')"/>
        <PushButton label="Dim Inactive Colour" :is-active="isPresetMuteInactiveState('DimmedColour2')"
                    @click="setPresetMuteInactiveState('DimmedColour2')"/>
      </ButtonList>
      <ColourBox id="inactive" title="Inactive" :colour-value="getColour(false)" @colour-changed="onColourChange"/>
    </ContentBox>

    <ContentBox title="Encoders">
      <ButtonList title="Encoder">
        <PushButton v-for="(value, id) in encoderLighting" :key="id" :button-id="value"
                    :is-active="activeEncoder === value" :label="value" @click="activeEncoder = value"/>
      </ButtonList>
      <ColourBox id="colour_two" title="Left Colour" :colour-value="getEncoderColour('colour_two')"
                 @colour-changed="onEncoderColourChange"/>
      <ColourBox id="colour_one" title="Right Colour" :colour-value="getEncoderColour('colour_one')"
                 @colour-changed="onEncoderColourChange"/>
      <ColourBox id="colour_three" title="Knob Colour" :colour-value="getEncoderColour('colour_three')"
                 @colour-changed="onEncoderColourChange"/>
    </ContentBox>

    <ContentBox title="Effect Buttons">
      <ButtonList title="Effect">
        <PushButton v-for="(value, id) in effectButtons" :key="id" :button-id="value"
                    :is-active="activeEffect === value" :label="effectButtonLabels[id]"
                    @click="activeEffect = value"></PushButton>
      </ButtonList>
      <ColourBox id="active" title="Active" :colour-value="getEffectColour(true)" @colour-changed="onEffectColourChange"/>
      <ButtonList title="Inactive Option">
        <PushButton label="Dim Active Colour" :is-active="isEffectMuteInactiveState('Dimmed')"
                    @click="setEffectMuteInactiveState('Dimmed')"/>
        <PushButton label="Inactive Colour" :is-active="isEffectMuteInactiveState('Colour2')"
                    @click="setEffectMuteInactiveState('Colour2')"/>
        <PushButton label="Dim Inactive Colour" :is-active="isEffectMuteInactiveState('DimmedColour2')"
                    @click="setEffectMuteInactiveState('DimmedColour2')"/>
      </ButtonList>
      <ColourBox id="inactive" title="Inactive" :colour-value="getEffectColour(false)"
                 @colour-changed="onEffectColourChange"/>

    </ContentBox>

  </MainTabContent>
</template>

<script>
/**
 * This file can *ABSOLUTELY* be trimmed down somewhat, initial revision will be a bit messy though, just to
 * get it working :p
 */

import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import {
  EffectButtons,
  EffectButtonText, EffectLightingPresets, EffectPresets,
  EncoderLighting
} from "@/util/mixerMapping";
import {store} from "@/store";
import {isDeviceMini} from "@/util/util";
import {websocket} from "@/util/sockets";
import ColourBox from "@/components/sections/lighting/ColourBox";
import MainTabContent from "@/components/design/MainTabContent";

export default {
  name: "LightingEffects",
  components: {MainTabContent, ColourBox, PushButton, ButtonList, ContentBox},

  data() {
    return {
      effectPresets: EffectLightingPresets,
      encoderLighting: EncoderLighting,
      effectButtons: EffectButtons,
      effectButtonLabels: EffectButtonText,
      activePreset: "EffectSelect1",
      activeEncoder: "Reverb",
      activeEffect: "EffectMegaphone",
    };
  },

  methods: {
    getLabel(id, key) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "";
      }
      let preset = EffectPresets[EffectLightingPresets.indexOf(key)]
      return (id + 1).toString() + ": " + store.getActiveDevice().effects.preset_names[preset];
    },

    isPresetMuteInactiveState(state) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return store.getActiveDevice().lighting.buttons[this.activeEffect].off_style === state;
    },

    isEffectMuteInactiveState(state) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return store.getActiveDevice().lighting.buttons[this.activeEffect].off_style === state;
    },

    setPresetMuteInactiveState(state) {
      let button = this.activePreset;

      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [button, state]});
    },

    setEffectMuteInactiveState(state) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.activeEffect, state]});
    },

    getColour(active) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      let button = this.activePreset;
      let colour = (active) ? "colour_one" : "colour_two";
      return "#" + store.getActiveDevice().lighting.buttons[button].colours[colour];
    },

    getEncoderColour(colour) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.encoders[this.activeEncoder][colour];
    },

    getEffectColour(active) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      let colour = (active) ? "colour_one" : "colour_two";
      return "#" + store.getActiveDevice().lighting.buttons[this.activeEffect].colours[colour];
    },

    onColourChange(id, value) {
      let button = this.activePreset;
      let active = store.getActiveDevice().lighting.buttons[button].colours.colour_one;
      let inactive = store.getActiveDevice().lighting.buttons[button].colours.colour_two;

      if (id === "active") {
        active = value.substr(1, 6);
      } else {
        inactive = value.substr(1, 6);
      }

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [button, active, inactive]});
    },

    // eslint-disable-next-line no-unused-vars
    onEncoderColourChange(id, value) {
      let encoder = store.getActiveDevice().lighting.encoders[this.activeEncoder];
      let colour_one = encoder.colour_one;
      let colour_two = encoder.colour_two;
      let colour_three = encoder.colour_three;

      if (id === "colour_one") {
        colour_one = value.substr(1, 6);
      } else if (id === "colour_two") {
        colour_two = value.substr(1, 6)
      } else {
        colour_three = value.substr(1, 6);
      }

      websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.activeEncoder, colour_one, colour_two, colour_three]})
    },

    onEffectColourChange(id, value) {
      let button = this.activeEffect;
      let active = store.getActiveDevice().lighting.buttons[button].colours.colour_one;
      let inactive = store.getActiveDevice().lighting.buttons[button].colours.colour_two;

      if (id === "active") {
        active = value.substr(1, 6);
      } else {
        inactive = value.substr(1, 6);
      }

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [button, active, inactive]});
    },
  }
}
</script>

<style scoped>

</style>