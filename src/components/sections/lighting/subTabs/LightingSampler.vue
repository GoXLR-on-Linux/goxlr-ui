<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {getLightingInactiveOptions, LightingInactiveOptions} from "@/util/mixerMapping";

export default {
  emits: ["nav-updated"],
  name: "LightingSampler",
  components: {
    CenteredContainer,
    ContentContainer,
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      selectedButtonOption: 'SamplerSelectA',
    }
  },

  methods: {
    getLightingInactiveOptions,
    getButtonOptions() {
      return [
        {
          id: 'SamplerSelectA',
          label: this.$t('message.lighting.sampler.buttons.a')
        },
        {
          id: 'SamplerSelectB',
          label: this.$t('message.lighting.sampler.buttons.b')
        },
        {
          id: 'SamplerSelectC',
          label: this.$t('message.lighting.sampler.buttons.c')
        }
      ];
    },

    getNodes() {
      return [this.selectedButtonOption];
    },

    activeColor() {
      return "#" + store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours["colour_two"];
    },

    emptyColor() {
      return "#" + store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours["colour_three"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.sampler[this.selectedButtonOption].off_style
    },

    onButtonSelectionChange(id) {
      this.selectedButtonOption = id
      this.$emit("nav-updated");
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": [this.selectedButtonOption, id]});
    },

    onActiveColourChange(value) {
      let colour_one = value.substr(1, 6);
      let colour_two = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_two;
      let colour_three = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onEmptyColourChange(value) {
      let colour_one = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_two;
      let colour_three = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onInactiveColourChange(value) {
      let colour_one = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_one;
      let colour_two = value.substr(1, 6);
      let colour_three = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    applyToAll() {
      const bank = store.getActiveDevice().lighting.sampler[this.selectedButtonOption].colours;
      const activeColour = bank.colour_one;
      const inactiveColour = bank.colour_two;
      const emptyColour = bank.colour_three;

      const off_style = this.selectedInactiveOption();
      const buttonOptions = this.getButtonOptions();

      for (let option in buttonOptions) {
        let id = buttonOptions[option].id;
        websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [id, activeColour, inactiveColour, emptyColour]});
        websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": [id, off_style]});
      }
    }
  }
}
</script>

<template>
  <CenteredContainer>
    <ContentContainer style="padding-top: 15px; ; padding-bottom: 20px">
      <GroupContainer :title="$t('message.lighting.sampler.title')">
        <template #right>
          <button class="applyToAll" @click="applyToAll()">{{ $t('message.lighting.common.applyToAll') }}</button>
        </template>
        <RadioSelection :title="$t('message.lighting.sampler.buttonsTitle')" group="lighting_sampler_buttons"
                        :options="getButtonOptions()" :selected="this.selectedButtonOption"
                        @selection-changed="onButtonSelectionChange"/>
        <ColourPicker :title="$t('message.lighting.sampler.active')" :color-value="activeColor()"
                      @colour-changed="onActiveColourChange"/>
        <ColourPicker :title="$t('message.lighting.sampler.empty')" :color-value="emptyColor()"
                      @colour-changed="onEmptyColourChange"/>
        <RadioSelection :title="$t('message.lighting.sampler.inactive')"
                        group="lighting_sampler_inactive_behaviour" :options="getLightingInactiveOptions($t)"
                        :selected="this.selectedInactiveOption()"
                        @selection-changed="onInactiveSelectionChange"/>
        <ColourPicker :title="$t('message.lighting.sampler.inactive')" :color-value="inactiveColor()"
                      @colour-changed="onInactiveColourChange"/>
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
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