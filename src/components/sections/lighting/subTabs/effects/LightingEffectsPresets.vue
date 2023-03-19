<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {
  EffectLightingPresets,
  EffectPresets,
  LightingInactiveOptions,
} from "@/util/mixerMapping";

import { store } from "@/store";
import { websocket } from "@/util/sockets";

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
                presetLabels.push({ id: preset, label: label })
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

            console.log("Preset Inactive");
            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.activePreset, active, inactive]});
        }
    }
}
</script>

<template>
    <GroupContainer title="Preset Buttons">
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
