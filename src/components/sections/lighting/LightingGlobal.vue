<template>
  <MainTabContent :no-left-pad=false>
    <ContentBox title="Areas">
      <ButtonList title="Area">
        <PushButton label="Accent" :is-active="isAccent" @click="isAccent = true" />
        <PushButton label="Global" :is-active="!isAccent" :is-disabled=true />
      </ButtonList>
      <ColourBox title="Colour" :colour-value="getColour()" @colour-changed="onColourChange" />
    </ContentBox>
  </MainTabContent>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ColourBox from "@/components/sections/lighting/ColourBox";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
export default {
  name: "LightingGlobal",
  components: {ColourBox, PushButton, ButtonList, ContentBox, MainTabContent},

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

<style scoped>

</style>