<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ListSelection from "@/components/button_list/ListSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { LightingInactiveOptions } from "@/util/mixerMapping";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "LightingCough",
  components: {
    CenteredContainer,
    ContentContainer,
    GroupContainer,
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
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours["colour_one"];
    },

    inactiveColor() {
      return "#" + store.getActiveDevice().lighting.buttons[this.selectedButtonOption].colours["colour_two"];
    },

    selectedInactiveOption() {
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
  <CenteredContainer>
    <ContentContainer>
      <GroupContainer title="Cough/Bleep Buttons">
        <ListSelection title="Buttons" group="lighting_cough_buttons" :options="this.buttonOptions" :selected="this.selectedButtonOption" @selection-changed="onButtonSelectionChange"/>
        <ColourPicker title="Active" :color-value="activeColor()" @colour-changed="onActiveColourChange" />
        <ListSelection title="Inactive Options" group="lighting_cough_inactive_behaviour" :options="this.inactiveOptions" :selected="this.selectedInactiveOption()" @selection-changed="onInactiveSelectionChange"/>
        <ColourPicker title="Inactive" :color-value="inactiveColor()" @colour-changed="onInactiveColourChange" />
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
</template>
