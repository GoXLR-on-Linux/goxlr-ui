<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {getLightingInactiveOptions, LightingInactiveOptions} from "@/util/mixerMapping";

export default {
  name: "LightingEffectsEffects",
  components: {
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      selectedEffect: "EffectMegaphone",
    }
  },

  methods: {
    getLightingInactiveOptions,

    getEffectOptions() {
      return [
        {
          id: 'EffectMegaphone',
          label: this.$t('message.lighting.effects.buttons.effect.megaphone')
        },
        {
          id: 'EffectRobot',
          label: this.$t('message.lighting.effects.buttons.effect.robot')
        },
        {
          id: 'EffectHardTune',
          label: this.$t('message.lighting.effects.buttons.effect.hardTune')
        },
        {
          id: 'EffectFx',
          label: this.$t('message.lighting.effects.buttons.effect.fx')
        }
      ]
    },

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
    },

    applyToAll() {
      let colour_one = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.buttons[this.selectedEffect].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupColours": ["EffectTypes", colour_one, colour_two]});

      let off_style = store.getActiveDevice().lighting.buttons[this.selectedEffect].off_style;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupOffStyle": ["EffectTypes", off_style]});
    }
  }
}
</script>

<template>
  <GroupContainer :title="$t('message.lighting.effects.buttons.title')">
    <template #right>
      <button class="applyToAll" @click="applyToAll()">{{ $t('message.lighting.common.applyToAll') }}</button>
    </template>
    <RadioSelection
        :title="$t('message.lighting.effects.buttons.title')"
        group="lighting_effects_effects"
        :options="getEffectOptions()"
        :selected="selectedEffect"
        @selection-changed="onButtonSelectionChange"
    />
    <ColourPicker
        :title="$t('message.lighting.common.activeColour')"
        :color-value="activeColor()"
        @colour-changed="onActiveColourChange"
    />
    <RadioSelection
        :title="$t('message.lighting.common.inactiveOption')"
        group="lighting_effects_effects_inactive_behaviour"
        :options="getLightingInactiveOptions($t)"
        :selected="selectedInactiveOption()"
        @selection-changed="onInactiveSelectionChange"
    />
    <ColourPicker
        :title="$t('message.lighting.common.inactiveColour')"
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