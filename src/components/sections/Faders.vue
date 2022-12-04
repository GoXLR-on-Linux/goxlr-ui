<template>
  <ContentBox title="Faders">
    <ButtonList title="Channel">
      <Button label="Channel 1" buttonId="0" :is-active="isActiveChannel('A')" @button-pressed="channelPressed"/>
      <Button label="Channel 2" buttonId="1" :is-active="isActiveChannel('B')" @button-pressed="channelPressed"/>
      <Button label="Channel 3" buttonId="2" :is-active="isActiveChannel('C')" @button-pressed="channelPressed"/>
      <Button label="Channel 4" buttonId="3" :is-active="isActiveChannel('D')" @button-pressed="channelPressed"/>
    </ButtonList>

    <ButtonList title="Source">
      <Button v-for="item in faderOrder" :key=item :label=getSourceLabel(item) :buttonId=getChannelName(item)
              :is-active=isActiveSource(getChannelName(item)) @button-pressed="sourcePressed"/>
    </ButtonList>

    <ButtonList title="Mute Behaviour">
      <Button v-for="(item, index) in muteFunctions" :key=item :label=getMuteLabel(index) :buttonId=item
              :is-active=isActiveMuteFunction(item) :is-disabled=isMuteFunctionDisabled(item)
              @button-pressed="setMuteFunction"/>
    </ButtonList>
  </ContentBox>
</template>

<script>
import ContentBox from "../ContentBox";
import ButtonList from "../button_list/ButtonList";
import Button from "../button_list/Button";
import {
  ChannelName, ChannelNameReadable,
  FaderOrder,
  MuteFunctionReadable,
  MuteFunction
} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  /**
   * Everything here focuses around the 'Channel' input,
   */

  components: {ContentBox, ButtonList, Button},
  name: "MicFaders",

  data() {
    return {
      faderOrder: FaderOrder,
      muteFunctions: MuteFunction,

      activeChannel: "A",
    }
  },

  methods: {
    getSourceLabel(id) {
      return ChannelNameReadable[id];
    },

    getMuteLabel(id) {
      return MuteFunctionReadable[id];
    },

    getChannelName(id) {
      return ChannelName[id];
    },

    channelPressed: function (id) {
      this.activeChannel = id;
    },

    sourcePressed: function (channelName) {
      let self = this;

      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      let command = {
        "SetFader": [fader, channelName]
      }

      websocket.send_command(serial, command);

      // Double check mute function is valid..
      if (self.isMuteFunctionDisabled(self.getActiveMuteFunction())) {
        self.setMuteFunction("All")
      }
    },

    setMuteFunction: function (mute_function) {
      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      // Build the Command..
      let command = {
        "SetFaderMuteFunction": [
          fader,
          mute_function
        ]
      }

      websocket.send_command(serial, command);
    },

    isActiveChannel: function (id) {
      return this.activeChannel === id;
    },

    isActiveSource: function (source) {
      if (store.hasActiveDevice()) {
        return this.getActiveSource() === source;
      }

      return false;
    },

    isActiveMuteFunction: function (id) {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().fader_status[this.activeChannel].mute_type === id;
      }
      return false;
    },

    isMuteFunctionDisabled: function (muteFunction) {
      // According to the GoXLR UI, The Voice Chat mute button can't mute to voice chat..
      if (this.getActiveSource() === "Chat") {
        if (muteFunction === "ToVoiceChat") {
          return true;
        }
      }

      // The Headphone and Line Out channels can only mute to 'All'.
      if (this.getActiveSource() === "Headphones" || this.getActiveSource() === "LineOut") {
        if (muteFunction !== "All") {
          return true;
        }
      }
    },

    getActiveSource: function () {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().fader_status[this.activeChannel].channel;
      }
      return 0;
    },

    getActiveMuteFunction: function () {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().fader_status[this.activeChannel].mute_type;
      }
      return 0;
    }
  },
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
