<template>
    <GroupContainer :title="$t('message.configuration.cough.title')">
      <RadioSelection :title="$t('message.configuration.cough.behaviourTitle')" :options="getButtonBehaviours()"
                      group="cough_button_behaviour" @selection-changed="behaviorPressed" :selected="getCough()" />
      <RadioSelection :title="$t('message.configuration.muteBehaviourTitle')" :options="getMuteBehaviours()"
                      group="cough_mute_behaviour" @selection-changed="setActiveMuteFunction"
                      :selected="getActiveMute()" />
    </GroupContainer>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  name: "CoughButtonSettings",
  components: {GroupContainer, RadioSelection},

  data() {
    return {
    }
  },

  methods: {
    getButtonBehaviours() {
      return [
        {id: "hold", label: this.$t('message.configuration.cough.behaviour.hold') },
        {id: "toggle", label: this.$t('message.configuration.cough.behaviour.toggle') }
      ];
    },

    getMuteBehaviours() {
      return [
        { id: "All", label: this.$t('message.configuration.mute_behaviour.all') },
        { id: "ToStream", label: this.$t('message.configuration.mute_behaviour.stream') },
        { id: "ToVoiceChat", label: this.$t('message.configuration.mute_behaviour.chatMic') },
        { id: "ToPhones", label: this.$t('message.configuration.mute_behaviour.headphones') },
        { id: "ToLineOut", label: this.$t('message.configuration.mute_behaviour.lineOut') },
      ];
    },

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
