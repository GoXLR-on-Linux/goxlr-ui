<script>
import GroupContainer from "@/components/containers/GroupContainer";
import ContentContainer from "@/components/containers/ContentContainer";
import RadioSelection from "@/components/button_list/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
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
          id: 'A',
          label: 'A'
        },
        {
          id: 'B',
          label: 'B'
        },
        {
          id: 'C',
          label: 'C'
        }
      ],
      selectedButtonOption: 'A',
      inactiveOptions: LightingInactiveOptions
    }
  },

  methods: {
    activeColor() {
      return "#" + store.getActiveDevice().lighting.sampler["SamplerSelect" + this.selectedButtonOption].colours["colour_one"];
    },

    emptyColor() {
      return "#" + store.getActiveDevice().lighting.sampler["SamplerSelect" + this.selectedButtonOption].colours["colour_three"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.sampler["SamplerSelect" + this.selectedButtonOption].colours["colour_two"];
    },

    selectedInactiveOption() {
      return store.getActiveDevice().lighting.sampler["SamplerSelect" + this.selectedButtonOption].off_style
    },

    onButtonSelectionChange(id) {
      this.selectedButtonOption = id
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": ["SampleSelect" + this.selectedButtonOption, id]});
    },

    onActiveColourChange(value) {
      let colour_one = value.substr(1, 6);
      let colour_two = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_two;
      let colour_three = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onEmptyColourChange(value) {
      let colour_one = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_two;
      let colour_three = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onInactiveColourChange(value) {
      let colour_one = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_one;
      let colour_two = value.substr(1, 6);
      let colour_three = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    }
  }
}
</script>

<template>
  <CenteredContainer>
    <ContentContainer>
      <GroupContainer title="Bank">
        <RadioSelection title="Buttons" group="lighting_sampler_buttons" :options="this.buttonOptions" :selected="this.selectedButtonOption" @selection-changed="onButtonSelectionChange"/>
        <ColourPicker title="Active / Loaded" :color-value="activeColor()" @colour-changed="onActiveColourChange" />
        <ColourPicker title="Sample Empty" :color-value="emptyColor()" @colour-changed="onEmptyColourChange" />
        <RadioSelection title="Inactive Bank" group="lighting_sampler_inactive_behaviour" :options="this.inactiveOptions" :selected="this.selectedInactiveOption()" @selection-changed="onInactiveSelectionChange" />
        <ColourPicker title="Inactive Bank" :color-value="inactiveColor()" @colour-changed="onInactiveColourChange" />
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
</template>
