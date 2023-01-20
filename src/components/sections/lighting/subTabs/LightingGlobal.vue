<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ListSelection from "@/components/new/ListSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import { store } from "@/store";
import { websocket } from "@/util/sockets";

export default {
  name: "LightingGlobal",
  components: {
    ContentContainer,
    GroupContainer,
    ListSelection,
    ColourPicker
},

  data() {
    return {
      options: [
        {
          id: 'Accent',
          label: 'Accent'
        },
        {
          id: 'Global',
          label: 'Global',
          disabled: true
        }
      ],
      selected: 'Accent'
    }
  },

  methods: {
    color() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.simple[this.selected].colour_one;
    },

    onSelectionChange(option) {
      this.selected = option
    },

    onColourChange(value) {
      websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [this.selected, value.substr(1, 6)]});
    },
  }
}
</script>

<template>
  <ContentContainer>
    <GroupContainer title="Areas">
      <ListSelection title="Area" group="lighting_global_areas" :options="this.options" :selected="this.selected" @selection-changed="onSelectionChange"/>
      <ColourPicker title="Colour" :color-value="color()" @colour-changed="onColourChange" />
    </GroupContainer>
  </ContentContainer>
</template>
