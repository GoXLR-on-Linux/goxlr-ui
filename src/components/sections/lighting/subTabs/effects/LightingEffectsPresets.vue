<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {
  EffectLightingPresets,
  EffectPresets,
  LightingInactiveOptions
} from "@/util/mixerMapping";

import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "LightingEffectsPresets",
  components: {
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      effectPresets: EffectLightingPresets,
      activePreset: "EffectSelect1",
      inactiveOptions: LightingInactiveOptions
    }
  },

  methods: {
    presetLabels() {
      let presetLabels = []

      for (const preset of EffectPresets) {
        const label = store.getActiveDevice().effects.preset_names[preset];
        presetLabels.push({id: preset, label: label})
      }

      return presetLabels
    },

    getActivePreset() {
      // This needs to be mapped from the EffectPresets to the EffectLightingPresets..
      return EffectPresets[EffectLightingPresets.indexOf(this.activePreset)];
    },

    activeColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.activePreset].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.activePreset].colours["colour_two"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.buttons[this.activePreset].off_style
    },

    onButtonSelectionChange(id) {
      this.activePreset = EffectLightingPresets[EffectPresets.indexOf(id)];
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.activePreset, id]});
    },

    onActiveColourChange(value) {
      const active = value.substr(1, 6);
      const inactive = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_two;

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.activePreset, active, inactive]});
    },

    onInactiveColourChange(value) {
      const active = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_one;
      const inactive = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.activePreset, active, inactive]});
    },

    applyToAll() {
      let colour_one = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupColours": ["EffectSelector", colour_one, colour_two]});

      let off_style = store.getActiveDevice().lighting.buttons[this.activePreset].off_style;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupOffStyle": ["EffectSelector", off_style]});
    }
  }
}
</script>

<template>
  <GroupContainer title="Preset Buttons">
    <template #right>
      <button class="applyToAll" @click="applyToAll()">Apply to All</button>
    </template>
    <RadioSelection
        title="Preset"
        group="lighting_effects_presets"
        :options="presetLabels()"
        :selected="getActivePreset()"
        @selection-changed="onButtonSelectionChange"
    />
    <ColourPicker
        title="Active"
        :color-value="activeColor()"
        @colour-changed="onActiveColourChange"
    />
    <RadioSelection
        title="Inactive Option"
        group="lighting_effects_preset_inactive_behaviour"
        :options="inactiveOptions"
        :selected="selectedInactiveOption()"
        @selection-changed="onInactiveSelectionChange"
    />
    <ColourPicker
        title="Inactive"
        :color-value="inactiveColor()"
        @colour-changed="onInactiveColourChange"
    />
  </GroupContainer>
</template>

<style scoped>
button {
  border: 0;
  margin: 0;
  padding: 5px 24px;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  font-size: 12px;
  background-color: #3b413f;
}

button:hover {
  background-color: #535c59;
}
</style>