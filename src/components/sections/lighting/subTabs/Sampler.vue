<script>
import Container from "@/components/new/Container02";
import ListSelection from "@/components/new/ListSelection";
import ColourPicker from "@/components/new/ColourPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { isDeviceMini } from "@/util/util";

export default {
  name: "LightingSampler",
  components: {
    Container,
    ListSelection,
    ColourPicker
  },

  data() {
    return {
      buttonOptions: ['A', 'B', 'C'],
      selectedButtonOption: 'A',
      inactiveOptions: ['Dim Active Colour', 'Inactive Colour', 'Dim Inactive Colour']
    }
  },

  methods: {
    activeColor() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.sampler["SampleSelect" + this.selectedButtonOption].colours["colour_one"];
    },

    emptyColor() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.sampler["SampleSelect" + this.selectedButtonOption].colours["colour_three"];
    },

    inactiveColor() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.sampler["SampleSelect" + this.selectedButtonOption].colours["colour_two"];
    },

    selectedInactiveOption() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return '';
      }
      const state = store.getActiveDevice().lighting.sampler["SampleSelect" + this.selectedButtonOption].off_style
      return this.mapState(state)
    },

    mapState(state) {
      switch (state) {
        case 'Dimmed':
          return this.inactiveOptions[0];
        case 'Colour2':
          return this.inactiveOptions[1];
        case 'DimmedColour2':
          return this.inactiveOptions[2];
        default:
          return '';
      }
    },

    onButtonSelectionChange(option) {
      if (isDeviceMini()) { return }

      this.selectedButtonOption = option
    },

    onInactiveSelectionChange(option) {
      if (isDeviceMini()) { return }

      let state = this.mapInactiveOption(option)
      websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": ["SampleSelect" + this.selectedButtonOption, state]});
    },

    mapInactiveOption(option) {
      switch (option) {
          case this.inactiveOptions[0]:
            return 'Dimmed';
          case this.inactiveOptions[1]:
            return 'Colour2';
          case this.inactiveOptions[2]:
            return 'DimmedColour2';
          default:
            return
        }
    },

    onActiveColourChange(value) {
      if (isDeviceMini()) { return }

      let colour_one = value.substr(1, 6);
      let colour_two = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_two;
      let colour_three = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onEmptyColourChange(value) {
      if (isDeviceMini()) { return }

      let colour_one = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_two;
      let colour_three = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    },

    onInactiveColourChange(value) {
      if (isDeviceMini()) { return }

      let colour_one = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_one;
      let colour_two = value.substr(1, 6);
      let colour_three = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_three;

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.selectedButtonOption, colour_one, colour_two, colour_three]})
    }
  }
}
</script>

<template>
  <Container title="Bank">
    <ListSelection title="Buttons" :options="this.buttonOptions" :selected="this.selectedButtonOption" @selection-changed="onButtonSelectionChange"/>
    <ColourPicker title="Active / Loaded" :color-value="activeColor()" @colour-changed="onActiveColourChange" />
    <ColourPicker title="Sample Empty" :color-value="emptyColor()" @colour-changed="onEmptyColourChange" />
    <ListSelection title="Inactive Bank" :options="this.inactiveOptions" :selected="this.selectedInactiveOption()" @selection-changed="onInactiveSelectionChange" :leftMargin="true"/>
    <ColourPicker title="Inactive Bank" :color-value="inactiveColor()" @colour-changed="onInactiveColourChange" />
  </Container>
</template>