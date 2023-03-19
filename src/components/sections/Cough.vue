<template>
  <CenteredContainer>
    <GroupContainer title="Cough Button Settings">
      <RadioSelection title="Button Behaviour" :options="button_behaviour" group="cough_button_behaviour" @selection-changed="behaviorPressed" :selected="getCough()" />
      <RadioSelection title="Mute Behaviour" :options="mute_behaviour" group="cough_mute_behaviour" @selection-changed="setActiveMuteFunction" :selected="getActiveMute()" />
    </GroupContainer>
  </CenteredContainer>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "CoughButtonSettings",
  components: {CenteredContainer, GroupContainer, RadioSelection},

  data() {
    return {
      button_behaviour: [
        {id: "hold", label: "Hold"},
        {id: "toggle", label: "Toggle"}
      ],

      mute_behaviour: [
        {id: "All", label: "Mute All"},
        {id: "ToStream", label: "Mute to Stream"},
        {id: "ToVoiceChat", label: "Mute to Voice Chat"},
        {id: "ToPhones", label: "Mute to Phones"},
        {id: "ToLineOut", label: "Mute to Line Out"},
      ]
    }
  },

  methods: {
    getCough() {
      return (store.getActiveDevice().cough_button.is_toggle) ? "toggle" : "hold";
    },

    getActiveMute() {
      return store.getActiveDevice().cough_button.mute_type;
    },

    setActiveMuteFunction: function (id) {
      let command = {
        "SetCoughMuteFunction": id
      }
      websocket.send_command(store.getActiveSerial(), command);
    },

    behaviorPressed: function (id) {
      let coughHold = (id === "hold");
      let command = {
        "SetCoughIsHold": coughHold
      }
      websocket.send_command(store.getActiveSerial(), command);
    },
  },
}
</script>

<style scoped>

</style>
