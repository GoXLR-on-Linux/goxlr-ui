<script>
import Container2 from "@/components/new/Container02";
import ListSelection from "@/components/new/ListSelection";
import ColourPicker from "@/components/new/ColourPicker";

import {
  EffectLightingPresets,
  EffectPresets,
  LightingInactiveOptions,
} from "@/util/mixerMapping";

import { store } from "@/store";
import { isDeviceMini } from "@/util/util";
import { websocket } from "@/util/sockets";

export default {
    name: "LightingEffectsPresets",
    components: {
        Container2,
        ListSelection,
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
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return;
            }

            let presetLabels = []

            for (const preset of EffectPresets) {
                const label = store.getActiveDevice().effects.preset_names[preset];
                presetLabels.push({ id: preset, label: label })
            }

            return presetLabels
        },

        isActivePreset() {
          // This needs to be mapped from the EffectPresets to the EffectLightingPresets..
          return EffectPresets[EffectLightingPresets.indexOf(this.activePreset)];
        },

        activeColor() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.buttons[this.activePreset].colours["colour_one"];
        },

        inactiveColor() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.buttons[this.activePreset].colours["colour_two"];
        },

        selectedInactiveOption() {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            return store.getActiveDevice().lighting.buttons[this.activePreset].off_style
        },

        onButtonSelectionChange(id) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            this.activePreset = id
        },

        onInactiveSelectionChange(id) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.activePreset, id]});
        },

        onActiveColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const active = value.substr(1, 6);
            const inactive = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_two;

            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedButtonOption, active, inactive]});
        },

        onInactiveColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const active = store.getActiveDevice().lighting.buttons[this.activePreset].colours.colour_one;
            const inactive = value.substr(1, 6);

            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedButtonOption, active, inactive]});
        }
    }
}
</script>

<template>
    <Container2 title="Preset Buttons">
      <ListSelection
        title="Preset"
        group="lighting_effects_presets"
        :options="presetLabels()"
        :selected="isActivePreset()"
        @selection-changed="onButtonSelectionChange"
      />
      <ColourPicker
        title="Active"
        :color-value="activeColor()"
        @colour-changed="onActiveColourChange"
      />
      <ListSelection
        title="Inactive Option"
        group="lighting_effects_preset_inactive_behaviour"
        :options="this.inactiveOptions"
        :selected="this.selectedInactiveOption()"
        @selection-changed="onInactiveSelectionChange"
      />
      <ColourPicker
        title="Inactive"
        :color-value="inactiveColor()"
        @colour-changed="onInactiveColourChange"
      />
    </Container2>
</template>
