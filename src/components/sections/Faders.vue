<template>
  <ContentBox title="Faders">
    <ButtonList title="Channel" role="radiogroup">
      <RadioItem id="A" text="Channel 1" group="channel" @radio-selected="channelChanged"
                 :selected="isActiveChannel('A')"/>
      <RadioItem id="B" text="Channel 2" group="channel" @radio-selected="channelChanged"
                 :selected="isActiveChannel('B')"/>
      <RadioItem id="C" text="Channel 3" group="channel" @radio-selected="channelChanged"
                 :selected="isActiveChannel('C')"/>
      <RadioItem id="D" text="Channel 4" group="channel" @radio-selected="channelChanged"
                 :selected="isActiveChannel('D')"/>
    </ButtonList>

    <ButtonList title="Source" role="radiogroup">
      <RadioItem v-for="item in faderOrder" :key=item
                 group="source"
                 :id="item"
                 :text="getSourceLabel(item)"
                 :selected="isActiveSource(item)"
                 @radio-selected="sourceChanged"/>
    </ButtonList>

    <ButtonList title="Mute Behaviour" role="radiogroup">
      <RadioItem v-for="(item, index) in muteFunctions" :key="item"
                 group="fader_mute_behaviour"
                 :id=item
                 :text="getMuteLabel(index)"
                 :selected="isActiveMuteFunction(item)"
                 :disabled="isMuteFunctionDisabled(item)"
                 @radio-selected="muteFunctionChanged" />
    </ButtonList>
  </ContentBox>
</template>

<script>
import ContentBox from "../ContentBox";
import ButtonList from "../button_list/ButtonList";
import {
  ChannelNameReadable,
  FaderOrder,
  MuteFunctionReadable,
  MuteFunction
} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioItem from "@/components/button_list/RadioItem";

export default {
  /**
   * Everything here focuses around the 'Channel' input,
   */

  components: {RadioItem, ContentBox, ButtonList},
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

    channelChanged: function (id) {
      this.activeChannel = id;
    },

    sourceChanged: function (channelName) {
      console.log(channelName);

      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      let command = {
        "SetFader": [fader, channelName]
      }

      websocket.send_command(serial, command);

      // Double check mute function is valid..
      if (this.isMuteFunctionDisabled(this.getActiveMuteFunction())) {
        this.muteFunctionChanged("All")
      }
    },

    muteFunctionChanged(mute_function) {
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

    isActiveChannel(channel) {
      if (store.hasActiveDevice()) {
        return this.activeChannel === channel;
      }
      return false;
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
