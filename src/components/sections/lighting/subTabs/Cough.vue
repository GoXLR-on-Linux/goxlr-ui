<script>
import Container from "@/components/new/Container02";
import ListSelection from "@/components/new/ListSelection";
import ColourPicker from "@/components/new/ColourPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";

export default {
  name: "LightingCough",
  components: {
    Container,
    ListSelection,
    ColourPicker
  },

  data() {
    return {
      buttonOptions: ['Bleep', 'Cough'],
      selectedButtonOption: 'Bleep',
      inactiveOptions: ['Dim Active Colour', 'Inactive Colour', 'Dim Inactive Colour']
    }
  },

  methods: {
    activeColor() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours["colour_one"];
    },

    inactiveColor() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours["colour_two"];
    },

    selectedInactiveOption() {
      if (!store.hasActiveDevice()) {
        return '';
      }
      const state = store.getActiveDevice().lighting.buttons[this.selectedButtonOption].off_style
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
      this.selectedButtonOption = option
    },

    onInactiveSelectionChange(option) {
      let state = this.mapInactiveOption(option)
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.selectedButtonOption, state]});
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
      let active = value.substr(1, 6);
      let inactive = store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours.colour_two;

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedButtonOption, active, inactive]});
    },

    onInactiveColourChange(value) {
      let active = store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours.colour_one;
      let inactive = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [this.selectedButtonOption, active, inactive]});
    }
  }
}
</script>

<template>
  <Container title="Cough/Bleep Buttons">
    <ListSelection title="Buttons" :options="this.buttonOptions" :selected="this.selectedButtonOption" @selection-changed="onButtonSelectionChange"/>
    <ColourPicker title="Active" :color-value="activeColor()" @colour-changed="onActiveColourChange" />
    <ListSelection title="Inactive Options" :options="this.inactiveOptions" :selected="this.selectedInactiveOption()" @selection-changed="onInactiveSelectionChange" :leftMargin="true"/>
    <ColourPicker title="Inactive" :color-value="inactiveColor()" @colour-changed="onInactiveColourChange" />
  </Container>
</template>
