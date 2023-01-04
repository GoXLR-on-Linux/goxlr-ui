<script>
import Container from "@/components/new/Container02";
import ListSelection from "@/components/new/ListSelection";
import ColourPicker from "@/components/new/ColourPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";

export default {
  name: "LightingGlobal",
  components: {
    Container,
    ListSelection,
    ColourPicker
  },

  data() {
    return {
      options: ['Accent', 'Global'],
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
    <Container title="Areas">
      <ListSelection title="Area" group="Area" :options="this.options" :selected="this.selected" @selection-changed="onSelectionChange"/>
      <ColourPicker title="Colour" :color-value="color()" @colour-changed="onColourChange" />
    </Container>
</template>

<style scoped>

</style>