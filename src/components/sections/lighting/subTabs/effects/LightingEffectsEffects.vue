<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ListSelection from "@/components/button_list/ListSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import { store } from "@/store";
import { isDeviceMini } from "@/util/util";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";

export default {
    name: "LightingEffectsEffects",
    components: {
        GroupContainer,
        ListSelection,
        ColourPicker
    },

    data() {
        return {
            effectOptions: [
                {
                    id: 'EffectMegaphone',
                    label: 'Megaphone'
                },
                {
                    id: 'EffectRobot',
                    label: 'Robot'
                },
                {
                    id: 'EffectHardTune',
                    label: 'Hardtune'
                },
                {
                    id: 'EffectFx',
                    label: 'Fx'
                }
            ],
            selectedEffect: "EffectMegaphone",
            inactiveOptions: LightingInactiveOptions
        }
    },

    methods: {
        activeColor() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.buttons[this.selectedEffect].colours["colour_one"];
        },

        inactiveColor() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.buttons[this.selectedEffect].colours["colour_two"];
        },

        selectedInactiveOption() {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }
            return store.getActiveDevice().lighting.buttons[this.selectedEffect].off_style
        },

        onButtonSelectionChange(id) {
            this.selectedEffect = id
        },

        onInactiveSelectionChange(id) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            console.log("Here? " + this.selectedEffect);
            websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.selectedEffect, id]});
        },

        onActiveColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const active = value.substr(1, 6);
            const inactive = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_two;

            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedEffect, active, inactive]});
        },

        onInactiveColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const active = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_one;
            const inactive = value.substr(1, 6);

            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedEffect, active, inactive]});
        }
    }
}
</script>

<template>
    <GroupContainer title="Effect Buttons">
      <ListSelection
        title="Effect"
        group="lighting_effects_effects"
        :options="effectOptions"
        :selected="selectedEffect"
        @selection-changed="onButtonSelectionChange"
      />
      <ColourPicker
        title="Active"
        :color-value="activeColor()"
        @colour-changed="onActiveColourChange"
      />
      <ListSelection
        title="Inactive Option"
        group="lighting_effects_effects_inactive_behaviour"
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
