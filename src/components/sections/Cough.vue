<template>
  <ContentBox title="Cough Button Settings">
    <ButtonList title="Behaviour" role="radiogroup">
      <RadioItem id="hold" text="Hold" group="mute_behaviour" @radio-selected="behaviorPressed" :selected="!isCoughToggle()" />
      <RadioItem id="toggle" text="Toggle" group="mute_behaviour" @radio-selected="behaviorPressed" :selected="isCoughToggle()" />
    </ButtonList>
    <ButtonList title="Mute Behaviour" role="radiogroup">
      <RadioItem v-for="(item, index) in muteBehaviours" :key="item"
                 group="mic_mute_behaviour"
                 :id=item
                 :text="muteBehaviours[index]"
                 :selected="isActiveMuteFunction(index)"
                 @radio-selected="setActiveMuteFunction(index)" />
    </ButtonList>
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import {MuteFunctionReadable, MuteFunction} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioItem from "@/components/button_list/RadioItem";

export default {
  name: "CoughButtonSettings",
  components: {RadioItem, ButtonList, ContentBox},

  data() {
    return {
      muteBehaviours: MuteFunctionReadable,
    }
  },

  methods: {
    isCoughToggle() {
      return (store.hasActiveDevice()) ? store.getActiveDevice().cough_button.is_toggle : false;
    },

    getActiveMute() {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return MuteFunction.indexOf(store.getActiveDevice().cough_button.mute_type);
    },

    isActiveMuteFunction: function (id) {
      return this.getActiveMute() === id;
    },
    setActiveMuteFunction: function (id) {
      this.activeMuteFunction = id;
      this.updateDevice();
    },
    behaviorPressed: function (id) {
      let coughHold = (id === "hold");
      console.log(coughHold);
      let command = {
        "SetCoughIsHold": coughHold
      }
      websocket.send_command(store.getActiveSerial(), command);
    },
    updateDevice: function () {
      let serial = store.getActiveSerial();
      let coughMuteFunction = MuteFunction[this.activeMuteFunction];

      let command = {
        "SetCoughMuteFunction": coughMuteFunction
      }
      websocket.send_command(serial, command);
    }
  },
}
</script>

<style scoped>

</style>
