<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <ContentBox title="Faders">
        <ButtonList title="Channel">
          <PushButton label="Channel 1" buttonId="0" :is-active="isActiveChannel(0)" @button-pressed="channelPressed"/>
          <PushButton label="Channel 2" buttonId="1" :is-active="isActiveChannel(1)" @button-pressed="channelPressed"/>
          <PushButton label="Channel 3" buttonId="2" :is-active="isActiveChannel(2)" @button-pressed="channelPressed"/>
          <PushButton label="Channel 4" buttonId="3" :is-active="isActiveChannel(3)" @button-pressed="channelPressed"/>
        </ButtonList>
      </ContentBox>
    </div>
    <MainTabContent :no-left-pad=true>
      <ContentBox title="Fader">
        <ButtonList title="Style">
          <PushButton label="Gradient" :is-active="styleContains('Gradient')" @button-pressed="toggleGradient"/>
          <PushButton label="Meter" :is-active="styleContains('Meter')" @button-pressed="toggleMeter"/>
        </ButtonList>
        <ColourBox title="Bottom Colour" id="bottom" :colour-value="getBottomColour()"
                   @colour-changed="onFaderColourChange"/>
        <ColourBox title="Top Colour" id="top" :colour-value="getTopColour()" @colour-changed="onFaderColourChange"/>
      </ContentBox>

      <ContentBox v-show="!isDeviceMini()" title="Screen">
        <ColourBox title="Background Colour" :colour-value="getScreenColour()" @colour-changed="onScreenColourChange" />
      </ContentBox>

      <ContentBox title="Mute">
        <ColourBox id="active" title="Active" :colour-value="getMuteActiveColour()"
                   @colour-changed="onButtonColourChange"/>
        <ButtonList title="Inactive Option">
          <PushButton label="Dim Active Colour" :is-active="isMuteInactiveState('Dimmed')"
                      @click="setMuteInactiveState('Dimmed')"/>
          <PushButton label="Inactive Colour" :is-active="isMuteInactiveState('Colour2')"
                      @click="setMuteInactiveState('Colour2')"/>
          <PushButton label="Dim Inactive Colour" :is-active="isMuteInactiveState('DimmedColour2')"
                      @click="setMuteInactiveState('DimmedColour2')"/>
        </ButtonList>
        <ColourBox id="inactive" title="Inactive" :colour-value="getMuteInactiveColour()"
                   @colour-changed="onButtonColourChange"/>
      </ContentBox>
    </MainTabContent>

  </div>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ColourBox from "@/components/sections/lighting/ColourBox";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {FaderName, MuteButtonNamesForFader, ScribbleNames} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";

export default {
  name: "LightingMixer",
  components: {ColourBox, PushButton, ButtonList, ContentBox, MainTabContent},

  data() {
    return {
      activeChannel: 0,
    }
  },

  methods: {
    isDeviceMini() {
      return isDeviceMini();
    },

    isActiveChannel: function (id) {
      return this.activeChannel === id;
    },

    channelPressed(id) {
      this.activeChannel = parseInt(id);
    },

    styleContains(match) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].style.includes(match);
    },

    toggleGradient() {
      let current = store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].style;
      let newValue = "";

      switch (current) {
        case "TwoColour":
          newValue = "Gradient";
          break;
        case "Gradient":
          newValue = "TwoColour";
          break;
        case "Meter":
          newValue = "GradientMeter";
          break;
        default:
          newValue = "Meter";
          break;
      }
      websocket.send_command(store.getActiveSerial(), {"SetFaderDisplayStyle": [FaderName[this.activeChannel], newValue]});
      store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].style = newValue;
    },
    toggleMeter() {
      let current = store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].style;
      let newValue = "";

      switch (current) {
        case "TwoColour":
          newValue = "Meter";
          break;
        case "Gradient":
          newValue = "GradientMeter";
          break;
        case "Meter":
          newValue = "TwoColour";
          break;
        default:
          newValue = "Gradient";
          break;
      }
      websocket.send_command(store.getActiveSerial(), {"SetFaderDisplayStyle": [FaderName[this.activeChannel], newValue]})
      store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].style = newValue;
    },

    getTopColour() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }

      return "#" + store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].colours.colour_one;
    },

    getBottomColour() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].colours.colour_two;
    },

    getScreenColour() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.simple[ScribbleNames[this.activeChannel]].colour_one;
    },

    getMuteActiveColour() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
    },

    getMuteInactiveColour() {
      if (!store.hasActiveDevice()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;
    },

    isMuteInactiveState(state) {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style === state;
    },

    onFaderColourChange(id, value) {
      let top = store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].colours.colour_one;
      let bottom = store.getActiveDevice().lighting.faders[FaderName[this.activeChannel]].colours.colour_two;

      if (id === "top") {
        top = value.substr(1, 6);
      } else {
        bottom = value.substr(1, 6);
      }
      websocket.send_command(store.getActiveSerial(), {"SetFaderColours": [FaderName[this.activeChannel], top, bottom]})
    },

    onScreenColourChange(id, value) {
      value = value.substr(1,6);

      websocket.send_command(store.getActiveSerial(), { "SetSimpleColour": [ScribbleNames[this.activeChannel], value]});
    },

    onButtonColourChange(id, value) {
      let active = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
      let inactive = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;

      if (id === "active") {
        active = value.substr(1, 6);
      } else {
        inactive = value.substr(1, 6);
      }

      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [MuteButtonNamesForFader[this.activeChannel], active, inactive]});
    },

    setMuteInactiveState(state) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [MuteButtonNamesForFader[this.activeChannel], state]});
      return store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style = state;
    }
  }
}
</script>

<style scoped>

</style>