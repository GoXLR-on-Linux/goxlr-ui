<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";

export default {
    name: "LightingEffectsEncoders",
    components: {
        GroupContainer,
        RadioSelection,
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
            return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_two"]
        },

        rightColour() {
            return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_one"]
        },

        knobColour() {
            return "#" + store.getActiveDevice().lighting.encoders[this.selectedEncoder]["colour_three"]
        },

        onButtonSelectionChange(id) {
            this.selectedEncoder = id
        },

        onLeftColourChange(value) {
            const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

            const leftColour = value.substr(1, 6);
            const rightColour = encoder.colour_one;
            const knobColour = encoder.colour_three;

            websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
        },

        onRightColourChange(value) {
            const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];

            const leftColour = encoder.colour_two;
            const rightColour = value.substr(1, 6);
            const knobColour = encoder.colour_three;

            websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [this.selectedEncoder, rightColour, leftColour, knobColour]})
        },

        onKnobColourChange(value) {
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
      <RadioSelection
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
