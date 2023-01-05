<script>
import Container2 from "@/components/new/Container02";
import Container3 from "@/components/new/Container03";
import ListSelection from "@/components/new/ListSelection";
import ColourPicker from "@/components/new/ColourPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";

export default {
  name: "LightingCough",
  components: {
    Container2,
    Container3,
    ListSelection,
    ColourPicker
  },

  data() {
    return {
      buttonOptions: [
        {
          id: 'Bleep',
          label: 'Bleep'
        }, 
        {
          id: 'Cough',
          label: 'Cough'
        }
      ],
      selectedButtonOption: 'Bleep',
      inactiveOptions: LightingInactiveOptions
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
      if (!store.hasActiveDevice()) { return }

      return store.getActiveDevice().lighting.buttons[this.selectedButtonOption].off_style
    },

    onButtonSelectionChange(id) {
      this.selectedButtonOption = id
    },

    onInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [this.selectedButtonOption, id]});
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
  <Container3>
    <Container2 title="Cough/Bleep Buttons">
      <ListSelection title="Buttons" group="lighting_cough_buttons" :options="this.buttonOptions" :selected="this.selectedButtonOption" @selection-changed="onButtonSelectionChange"/>
      <ColourPicker title="Active" :color-value="activeColor()" @colour-changed="onActiveColourChange" />
      <ListSelection title="Inactive Options" group="lighting_cough_inactive_behaviour" :options="this.inactiveOptions" :selected="this.selectedInactiveOption()" @selection-changed="onInactiveSelectionChange"/>
      <ColourPicker title="Inactive" :color-value="inactiveColor()" @colour-changed="onInactiveColourChange" />
    </Container2>
  </Container3>
</template>
