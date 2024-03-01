<script>
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {LightingInactiveOptions} from "@/util/mixerMapping";

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
      buttonOptions: [
        {
          id: 'SamplerSelectA',
          label: 'A'
        },
        {
          id: 'SamplerSelectB',
          label: 'B'
        },
        {
          id: 'SamplerSelectC',
          label: 'C'
        }
      ],
      selectedButtonOption: 'SamplerSelectA',
      inactiveOptions: LightingInactiveOptions
    }
  },

  methods: {
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

      for (let encoder in this.buttonOptions) {
        let id = this.buttonOptions[encoder].id;
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
      <GroupContainer title="Bank">
        <template #right>
          <button class="applyToAll" @click="applyToAll()">Apply to All</button>
        </template>
        <RadioSelection title="Buttons" group="lighting_sampler_buttons" :options="this.buttonOptions"
                        :selected="this.selectedButtonOption" @selection-changed="onButtonSelectionChange"/>
        <ColourPicker title="Active / Loaded" :color-value="activeColor()" @colour-changed="onActiveColourChange"/>
        <ColourPicker title="Sample Empty" :color-value="emptyColor()" @colour-changed="onEmptyColourChange"/>
        <RadioSelection title="Inactive Bank" group="lighting_sampler_inactive_behaviour"
                        :options="this.inactiveOptions" :selected="this.selectedInactiveOption()"
                        @selection-changed="onInactiveSelectionChange"/>
        <ColourPicker title="Inactive Bank" :color-value="inactiveColor()" @colour-changed="onInactiveColourChange"/>
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