<script>
import MainTabContent from "@/components/design/MainTabContent";
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ColorPicker from "@/components/sections/lighting/ColorPicker";

import { store } from "@/store";
import { websocket } from "@/util/sockets";

export default {
  name: "LightingCough",
  components: {
    ColorPicker,
    PushButton,
    ButtonList,
    ContentBox,
    MainTabContent
  },

  data() {
    return {
      isCough: false
    }
  },

  methods: {
    setCough(isCough) {
      this.isCough = isCough;
    },

    isMuteInactiveState(state) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      let button = (this.isCough) ? "Cough" : "Bleep";
      return store.getActiveDevice().lighting.buttons[button].off_style === state;
    },

    setMuteInactiveState(state) {
      let button = (this.isCough) ? "Cough" : "Bleep";
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [button, state]});
    },

    getColour(active) {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      let button = (this.isCough) ? "Cough" : "Bleep";
      let colour = (active) ? "colour_one" : "colour_two";
      return "#" + store.getActiveDevice().lighting.buttons[button].colours[colour];
    },

    onColourChange(id, value) {
      let button = (this.isCough) ? "Cough" : "Bleep";
      let active = store.getActiveDevice().lighting.buttons[button].colours.colour_one;
      let inactive = store.getActiveDevice().lighting.buttons[button].colours.colour_two;

      if (id === "active") {
        active = value.substr(1, 6);
      } else {
        inactive = value.substr(1, 6);
      }

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [button, active, inactive]});
    }
  }
}
</script>

<template>
  <MainTabContent :no-left-pad=false>
    <ContentBox title="Cough/Bleep Buttons">
      <ButtonList title="Buttons">
        <PushButton label="Bleep" :is-active="!isCough" @click="setCough(false)"/>
        <PushButton label="Cough" :is-active="isCough" @click="setCough(true)"/>
      </ButtonList>
      <ColorPicker id="active" title="Active" :color-value="getColour(true)" @colour-changed="onColourChange"/>
      <ButtonList title="Inactive Option">
        <PushButton label="Dim Active Colour" :is-active="isMuteInactiveState('Dimmed')"
                    @click="setMuteInactiveState('Dimmed')"/>
        <PushButton label="Inactive Colour" :is-active="isMuteInactiveState('Colour2')"
                    @click="setMuteInactiveState('Colour2')"/>
        <PushButton label="Dim Inactive Colour" :is-active="isMuteInactiveState('DimmedColour2')"
                    @click="setMuteInactiveState('DimmedColour2')"/>
      </ButtonList>
      <ColorPicker id="inactive" title="Inactive" :color-value="getColour(false)" @colour-changed="onColourChange"/>
    </ContentBox>
  </MainTabContent>
</template>

<style scoped>

</style>