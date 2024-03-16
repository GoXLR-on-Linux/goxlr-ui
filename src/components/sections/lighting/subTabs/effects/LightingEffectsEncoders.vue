<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {LightingInactiveOptions} from "@/util/mixerMapping";

export default {
  name: "LightingEffectsEncoders",
  components: {
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      selectedEncoder: "Reverb",
      inactiveOptions: LightingInactiveOptions
    }
  },

  methods: {
    getEncoderOptions() {
      return [
        {
          id: 'Reverb',
          label: this.$t('message.lighting.effects.encoders.encoders.reverb')
        },
        {
          id: 'Echo',
          label: this.$t('message.lighting.effects.encoders.encoders.echo')
        },
        {
          id: 'Pitch',
          label: this.$t('message.lighting.effects.encoders.encoders.pitch')
        },
        {
          id: 'Gender',
          label: this.$t('message.lighting.effects.encoders.encoders.gender')
        },
      ];
    },

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
    },

    applyToAll() {
      const encoder = store.getActiveDevice().lighting.encoders[this.selectedEncoder];
      const rightColour = encoder.colour_one;
      const leftColour = encoder.colour_two;
      const knobColour = encoder.colour_three;

      for (let encoder in this.getEncoderOptions()) {
        let id = this.getEncoderOptions()[encoder].id;
        websocket.send_command(store.getActiveSerial(), {"SetEncoderColour": [id, rightColour, leftColour, knobColour]});
      }
    }
  }
}
</script>

<template>
  <GroupContainer :title="$t('message.lighting.effects.encoders.title')">
    <template #right>
      <button class="applyToAll" @click="applyToAll()">{{ $t('message.lighting.common.applyToAll') }}</button>
    </template>
    <RadioSelection
        :title="$t('message.lighting.effects.encoders.title')"
        group="lighting_effects_encoders"
        :options="this.getEncoderOptions()"
        :selected="this.selectedEncoder"
        @selection-changed="onButtonSelectionChange"
    />
    <ColourPicker
        :title="$t('message.lighting.effects.encoders.leftColour')"
        :color-value="leftColour()"
        @colour-changed="onLeftColourChange"
    />
    <ColourPicker
        :title="$t('message.lighting.effects.encoders.rightColour')"
        :color-value="rightColour()"
        @colour-changed="onRightColourChange"
    />
    <ColourPicker
        :title="$t('message.lighting.effects.encoders.knobColour')"
        :color-value="knobColour()"
        @colour-changed="onKnobColourChange"
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