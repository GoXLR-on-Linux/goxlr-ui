<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";

export default {
    name: "LightingEffectsEffects",
    components: {
        GroupContainer,
        RadioSelection,
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
            return "#" + store.getActiveDevice().lighting.buttons[this.selectedEffect].colours["colour_one"];
        },

        inactiveColor() {
            return "#" + store.getActiveDevice().lighting.buttons[this.selectedEffect].colours["colour_two"];
        },

        selectedInactiveOption() {
            return store.getActiveDevice().lighting.buttons[this.selectedEffect].off_style
        },

        onButtonSelectionChange(id) {
            this.selectedEffect = id
        },

        onInactiveSelectionChange(id) {
            console.log("Here? " + this.selectedEffect);
            websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.selectedEffect, id]});
        },

        onActiveColourChange(value) {
            const active = value.substr(1, 6);
            const inactive = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_two;

            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedEffect, active, inactive]});
        },

        onInactiveColourChange(value) {
            const active = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_one;
            const inactive = value.substr(1, 6);

            websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedEffect, active, inactive]});
        }
    }
}
</script>

<template>
    <GroupContainer title="Effect Buttons">
      <RadioSelection
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
      <RadioSelection
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
