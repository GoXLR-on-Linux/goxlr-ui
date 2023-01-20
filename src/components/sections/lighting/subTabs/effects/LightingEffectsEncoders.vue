<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ListSelection from "@/components/button_list/ListSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import { store } from "@/store";
import { isDeviceMini } from "@/util/util";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";

export default {
    name: "LightingEffectsEncoders",
    components: {
        GroupContainer,
        ListSelection,
        ColourPicker
    },

    data() {
        return {
            encoderOptions: [
                {
                    id: 'Reverb',
                    label: 'Reverb'
                },
                {
                    id: 'Echo',
                    label: 'Echo'
                },
                {
                    id: 'Pitch',
                    label: 'Pitch'
                },
                {
                    id: 'Gender',
                    label: 'Gender'
                },
            ],
            selectedEncoder: "Reverb",
            inactiveOptions: LightingInactiveOptions
        }
    },

    methods: {
        leftColour() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_two"]
        },

        rightColour() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_one"]
        },

        knobColour() {
            if (!store.hasActiveDevice() || isDeviceMini()) {
                return "#000000";
            }
            return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_three"]
        },

        onButtonSelectionChange(id) {
            this.selectedEncoder = id
        },

        onLeftColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

            const leftColour = value.substr(1, 6);
            const rightColour = encoder.colour_one;
            const knobColour = encoder.colour_three;

            websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
        },

        onRightColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

            const leftColour = encoder.colour_two;
            const rightColour = value.substr(1, 6);
            const knobColour = encoder.colour_three;

            websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
        },

        onKnobColourChange(value) {
            if (!store.hasActiveDevice() || isDeviceMini()) { return }

            const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

            const leftColour = encoder.colour_two;
            const rightColour = encoder.colour_one;
            const knobColour = value.substr(1, 6);

            websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
        }
    }
}
</script>

<template>
    <GroupContainer title="Encoders">
      <ListSelection
        title="Encoder"
        group="lighting_effects_encoders"
        :options="this.encoderOptions"
        :selected="this.selectedEncoder"
        @selection-changed="onButtonSelectionChange"
      />
      <ColourPicker
        title="Left Colour"
        :color-value="leftColour()"
        @colour-changed="onLeftColourChange"
      />
      <ColourPicker
        title="Right Colour"
        :color-value="rightColour()"
        @colour-changed="onRightColourChange"
      />
      <ColourPicker
        title="Knob Colour"
        :color-value="knobColour()"
        @colour-changed="onKnobColourChange"
      />
    </GroupContainer>
</template>
