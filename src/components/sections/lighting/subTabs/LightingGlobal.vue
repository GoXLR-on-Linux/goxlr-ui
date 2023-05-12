<script>
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "LightingGlobal",
  components: {
    CenteredContainer,
    ContentContainer,
    GroupContainer,
    RadioSelection,
    ColourPicker
  },

  data() {
    return {
      options: [
        {
          id: 'Global',
          label: 'Global',
        },
        {
          id: 'Accent',
          label: 'Accent'
        }
      ],
      selected: 'Global'
    }
  },

  methods: {
    color() {
      return "#" + store.getActiveDevice().lighting.simple[this.selected].colour_one;
    },

    onSelectionChange(option) {
      this.selected = option
    },

    onColourChange(value) {
      if (this.selected === "Accent") {
        websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [this.selected, value.substr(1, 6)]});
      } else {
        websocket.send_command(store.getActiveSerial(), {"SetGlobalColour": value.substr(1, 6)});
      }
    },
  }
}
</script>

<template>
  <CenteredContainer>
    <ContentContainer>
      <GroupContainer title="Areas">
        <RadioSelection title="Area" group="lighting_global_areas" :options="this.options" :selected="this.selected"
                        @selection-changed="onSelectionChange"/>
        <ColourPicker title="Colour" :color-value="color()" @colour-changed="onColourChange"/>
      </GroupContainer>
    </ContentContainer>
  </CenteredContainer>
</template>
