<template>
  <GroupContainer title="Faders">
    <ListSelection title="Channel" group="faders_channel" :options="fader_options" :selected="activeChannel"
                   @selection-changed="channelChanged"/>
    <ListSelection title="Source" group="faders_source" :options="source_options" :selected="getActiveSource()"
                   @selection-changed="sourceChanged"/>
    <ListSelection title="Mute Behaviour" group="faders_mute" :options="getMuteFunctions()"
                   :selected="getActiveMuteFunction()" @selection-changed="muteFunctionChanged"/>
  </GroupContainer>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ListSelection from "@/components/button_list/ListSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  /**
   * Everything here focuses around the 'Channel' input,
   */

  components: {GroupContainer, ListSelection},
  name: "MicFaders",

  data() {
    return {
      activeChannel: "A",

      fader_options: [
        {id: "A", label: "Channel 1"},
        {id: "B", label: "Channel 2"},
        {id: "C", label: "Channel 3"},
        {id: "D", label: "Channel 4"}
      ],

      source_options: [
        {id: "Mic", label: "Mic"},
        {id: "Chat", label: "Voice Chat"},
        {id: "Music", label: "Music"},
        {id: "Game", label: "Game"},
        {id: "Console", label: "Console"},
        {id: "LineIn", label: "Line In"},
        {id: "System", label: "System"},
        {id: "Sample", label: "Sample"},
        {id: "Headphones", label: "Headphones"},
        {id: "LineOut", label: "Line Out"}
      ],

      mute_options: [
        {id: "All", label: "Mute All"},
        {id: "ToStream", label: "Mute to Stream"},
        {id: "ToVoiceChat", label: "Mute to Voice Chat"},
        {id: "ToPhones", label: "Mute to Phones"},
        {id: "ToLineOut", label: "Mute to Line Out"},
      ]
    }
  },

  methods: {
    channelChanged: function (id) {
      this.activeChannel = id;
    },

    sourceChanged: function (channelName) {
      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      let command = {
        "SetFader": [fader, channelName]
      }

      websocket.send_command(serial, command);
      store.getActiveDevice().fader_status[this.activeChannel].channel = channelName;

      if (this.isMuteFunctionDisabled(this.getActiveMuteFunction())) {
        this.muteFunctionChanged("All")
      }
    },

    muteFunctionChanged(mute_function) {
      let serial = store.getActiveSerial();
      let fader = this.activeChannel;

      // Check the make sure this combination is allowed..


      // Build the Command..
      let command = {
        "SetFaderMuteFunction": [
          fader,
          mute_function
        ]
      }

      websocket.send_command(serial, command);
    },

    updateDisabledMuteFunctions(source) {
      for (let mute_option of this.mute_options) {
        if (source === "Chat" && mute_option.id === "ToVoiceChat") {
          mute_option.disabled = true;
          continue;
        }

        if ((source === "Headphones" || source === "LineOut") && (mute_option.id !== "All")) {
          mute_option.disabled = true;
          continue;
        }
        mute_option.disabled = false;
      }
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
      return store.getActiveDevice().fader_status[this.activeChannel].channel;
    },

    getActiveMuteFunction: function () {
      return store.getActiveDevice().fader_status[this.activeChannel].mute_type;
    },

    getMuteFunctions: function () {
      this.updateDisabledMuteFunctions(this.getActiveSource());
      return this.mute_options;
    }
  },
}
</script>

<style scoped>
</style>
