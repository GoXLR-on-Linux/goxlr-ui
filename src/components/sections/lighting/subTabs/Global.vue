<script>
import MainTabContent from "@/components/design/MainTabContent";
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ColorPicker from "@/components/sections/lighting/ColorPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";

export default {
  name: "LightingGlobal",
  components: {
    ColorPicker,
    PushButton,
    ButtonList,
    ContentBox,
    MainTabContent,
  },

  data() {
    return {
      isAccent: true,
    }
  },

  methods: {
    getColour() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      let button = (this.isAccent) ? "Accent" : "Global";
      return "#" + store.getActiveDevice().lighting.simple[button].colour_one;
    },

    onColourChange(id, value) {
      let button = (this.isAccent) ? "Accent" : "Global";
      websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [button, value.substr(1, 6)]});
    },
  }
}
</script>

<template>
  <MainTabContent :no-left-pad=false>
    <ContentBox title="Areas">
      <ButtonList title="Area">
        <PushButton label="Accent" :is-active="isAccent" @click="isAccent = true" />
        <PushButton label="Global" :is-active="!isAccent" :is-disabled=true />
      </ButtonList>
      <ColorPicker title="Colour" :color-value="getColour()" @colour-changed="onColourChange" />
    </ContentBox>
  </MainTabContent>
</template>

<style scoped>

</style>