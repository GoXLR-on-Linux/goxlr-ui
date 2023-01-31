<script>
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ColorPicker from "@/components/sections/lighting/ColorPicker";

import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {MuteButtonNamesForFader, ScribbleNames} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  name: "LightingMixer",
  components: {
    GroupContainer,
    ContentContainer,
    ColorPicker,
    PushButton,
    ButtonList,
    ContentBox,
  },

  data() {
    return {
      activeChannel: "A",
      textValue: null,
    }
  },

  methods: {
    isDeviceMini,

    isActiveChannel: function (id) {
      return this.activeChannel === id;
    },

    channelPressed(id) {
      console.log(id);
      this.activeChannel = id;
      this.textValue = this.getBottomText();
    },

    styleContains(match) {
      return store.getActiveDevice().lighting.faders[this.activeChannel].style.includes(match);
    },

    toggleGradient() {
      let current = store.getActiveDevice().lighting.faders[this.activeChannel].style;
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
      websocket.send_command(store.getActiveSerial(), {"SetFaderDisplayStyle": [this.activeChannel, newValue]});
    },
    toggleMeter() {
      let current = store.getActiveDevice().lighting.faders[this.activeChannel].style;
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
      websocket.send_command(store.getActiveSerial(), {"SetFaderDisplayStyle": [this.activeChannel, newValue]})
    },

    getTopColour() {
      return "#" + store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
    },

    getBottomColour() {
      return "#" + store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;
    },

    getScreenColour() {
      return "#" + store.getActiveDevice().lighting.simple[ScribbleNames[this.activeChannel]].colour_one;
    },

    getScreenIcons() {
      return store.getIconFiles().sort();
    },

    isActiveIcon(file_name) {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.file_name === file_name;
    },

    setActiveIcon(value) {
      websocket.send_command(store.getActiveSerial(), {"SetScribbleIcon": [this.activeChannel, value]})
    },

    openIcons() {
      websocket.open_path("Icons");
    },

    isShowNumber() {
      if (this.textValue === null) {
        this.textValue = this.getBottomText();
      }

      return store.getActiveDevice().fader_status[this.activeChannel].scribble.left_text !== null;
    },

    toggleShowNumber() {
      let channel = Object.keys(store.getActiveDevice().fader_status).indexOf(this.activeChannel) + 1;
      let value = this.isShowNumber() ? "" : channel.toString();
      websocket.send_command(store.getActiveSerial(), {"SetScribbleNumber": [this.activeChannel, value]})
    },

    isInverted() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.inverted;
    },

    toggleInverted() {
      let value = !this.isInverted();
      websocket.send_command(store.getActiveSerial(), {"SetScribbleInvert": [this.activeChannel, value]})
    },

    getBottomText() {
      let text = store.getActiveDevice().fader_status[this.activeChannel].scribble.bottom_text;
      if (text == null) {
        return "";
      }

      return text;
    },

    updateText(event) {
      store.getActiveDevice().fader_status[this.activeChannel].scribble.bottom_text = event.target.value;
    },

    applyUpdate(event) {
      let value = event.target.value;
      websocket.send_command(store.getActiveSerial(), {"SetScribbleText": [this.activeChannel, value]})
    },

    getMuteActiveColour() {
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
    },

    getMuteInactiveColour() {
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;
    },

    isMuteInactiveState(state) {
      return store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style === state;
    },

    onFaderColourChange(id, value) {
      let top = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
      let bottom = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;

      if (id === "top") {
        top = value.substr(1, 6);
      } else {
        bottom = value.substr(1, 6);
      }
      websocket.send_command(store.getActiveSerial(), {"SetFaderColours": [this.activeChannel, top, bottom]})
    },

    onScreenColourChange(id, value) {
      value = value.substr(1, 6);

      websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [ScribbleNames[this.activeChannel], value]});
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
    }
  }
}
</script>

<template>
  <div style="display: flex">
    <ContentContainer style="padding: 0px">

      <GroupContainer title="Faders">
        <ButtonList title="Channel">
          <PushButton label="Channel 1" buttonId="A" :is-active="isActiveChannel('A')" @button-pressed="channelPressed"/>
          <PushButton label="Channel 2" buttonId="B" :is-active="isActiveChannel('B')" @button-pressed="channelPressed"/>
          <PushButton label="Channel 3" buttonId="C" :is-active="isActiveChannel('C')" @button-pressed="channelPressed"/>
          <PushButton label="Channel 4" buttonId="D" :is-active="isActiveChannel('D')" @button-pressed="channelPressed"/>
        </ButtonList>
      </GroupContainer>

    </ContentContainer>
    <ContentContainer :no-left-pad=true>
      <ContentBox title="Fader">
        <ButtonList title="Style">
          <PushButton label="Gradient" :is-active="styleContains('Gradient')" @button-pressed="toggleGradient"/>
          <PushButton label="Meter" :is-active="styleContains('Meter')" @button-pressed="toggleMeter"/>
        </ButtonList>
        <ColorPicker title="Bottom Colour" id="bottom" :color-value="getBottomColour()"
                   @colour-changed="onFaderColourChange"/>
        <ColorPicker title="Top Colour" id="top" :color-value="getTopColour()" @colour-changed="onFaderColourChange"/>
      </ContentBox>

      <ContentBox v-show="!isDeviceMini()" title="Screen">
        <ColorPicker title="Background Colour" :color-value="getScreenColour()" @colour-changed="onScreenColourChange"/>
        <ButtonList title="Icon">
          <template #title>
            ICONS
            <span class="openButton" @click="openIcons">
              <font-awesome-icon icon="fa-solid fa-folder" />
            </span>
          </template>
          <template #default>
            <PushButton label="-- NONE --" button-id="" :is-active="isActiveIcon(null)"
                        @button-pressed="setActiveIcon"/>
            <PushButton v-for="item in getScreenIcons()" :key=item :label=item :buttonId=item
                        :is-active=isActiveIcon(item) @button-pressed="setActiveIcon"/>
          </template>
        </ButtonList>

        <ButtonList title="Options">
          <PushButton label="Show Number" :is-active="isShowNumber()" @button-pressed="toggleShowNumber"/>
          <PushButton label="Invert Display" :is-active="isInverted()" @button-pressed="toggleInverted"/>
          <hr/>
          <div style="color: #fff; text-align: left; padding-left: 10px; margin-top: 25px;">Text:</div>
          <input type="text" v-model="textValue" @blur="applyUpdate"
                 v-on:keyup.enter="applyUpdate"/>
        </ButtonList>

      </ContentBox>

      <ContentBox title="Mute">
        <ColorPicker id="active" title="Active" :color-value="getMuteActiveColour()"
                   @colour-changed="onButtonColourChange"/>
        <ButtonList title="Inactive Option">
          <PushButton label="Dim Active Colour" :is-active="isMuteInactiveState('Dimmed')"
                      @click="setMuteInactiveState('Dimmed')"/>
          <PushButton label="Inactive Colour" :is-active="isMuteInactiveState('Colour2')"
                      @click="setMuteInactiveState('Colour2')"/>
          <PushButton label="Dim Inactive Colour" :is-active="isMuteInactiveState('DimmedColour2')"
                      @click="setMuteInactiveState('DimmedColour2')"/>
        </ButtonList>
        <ColorPicker id="inactive" title="Inactive" :color-value="getMuteInactiveColour()"
                   @colour-changed="onButtonColourChange"/>
      </ContentBox>
    </ContentContainer>

  </div>
</template>

<style scoped>
input[type=text] {
  font-family: LeagueMonoCondensed, sans-serif;
  background-color: #3b413f;
  color: #59b1b6;
  box-sizing: border-box;
  text-align: center;

  padding: 10px;
  border: none;
  background-image: none;
  box-shadow: none;
  outline: none;

  -moz-appearance: textfield;
}

.openButton {
  display: inline-block;
  color: #a5a7a6;
  font-size: 14px
}

.openButton:hover {
  color: #fff;
  cursor: pointer;
}
</style>

