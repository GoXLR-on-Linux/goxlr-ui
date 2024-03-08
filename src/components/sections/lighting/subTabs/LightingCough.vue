<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {getLightingInactiveOptions, LightingInactiveOptions} from "@/util/mixerMapping";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "LightingCough",
  components: {
    CenteredContainer,
    ContentContainer,
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      selectedButtonOption: 'Bleep',
    }
  },

  methods: {
    getLightingInactiveOptions,
    getButtonOptions() {
      return [
        {
          id: 'Bleep',
          label: this.$t('message.lighting.cough.buttons.bleep'),
        },
        {
          id: 'Cough',
          label: this.$t('message.lighting.cough.buttons.cough')
        }
      ];
    },

    getNodes() {
      return [];
    },

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
    <ContentContainer style="padding-top: 15px; padding-bottom: 20px">
      <GroupContainer :title="$t('message.lighting.cough.title')">
        <RadioSelection :title="$t('message.lighting.cough.buttonsTitle')" group="lighting_cough_buttons"
                        :options="getButtonOptions()" :selected="this.selectedButtonOption"
                        @selection-changed="onButtonSelectionChange"/>
        <ColourPicker :title="$t('message.lighting.common.activeColour')" :color-value="activeColor()"
                      @colour-changed="onActiveColourChange"/>
        <RadioSelection :title="$t('message.lighting.common.inactiveOption')"
                        group="lighting_cough_inactive_behaviour"
                        :options="getLightingInactiveOptions($t)" :selected="this.selectedInactiveOption()"
                        @selection-changed="onInactiveSelectionChange"/>
        <ColourPicker :title="$t('message.lighting.common.inactiveColour')" :color-value="inactiveColor()"
                      @colour-changed="onInactiveColourChange"/>
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
</template>
