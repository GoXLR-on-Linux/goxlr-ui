<template>
  <ContentBox title="Cough Button Settings">
    <ButtonList title="Behavior">
      <Button label="Hold" :is-active="!isCoughToggle()" :button-id="'0'" @button-pressed="behaviorPressed"/>
      <Button label="Toggle" :is-active="isCoughToggle()" :button-id="'1'" @button-pressed="behaviorPressed"/>
    </ButtonList>
    <ButtonList title="Mute Option">
      <Button v-for="(item, index) in muteBehaviours" :key=index :label="item.toString()"
              :is-active="isActiveMuteFunction(index)"
              @button-pressed="setActiveMuteFunction(index)" :buttonId="index.toString()"/>
    </ButtonList>
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import Button from "@/components/button_list/Button";
import {MuteBehaviours, MuteFunction} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "CoughButtonSettings",
  components: {ButtonList, ContentBox, Button},

  data() {
    return {
      muteBehaviours: MuteBehaviours,
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
      let coughHold = (parseInt(id) === 0);
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
      store.getActiveDevice().cough_button.mute_type = coughMuteFunction;
    }
  },
}
</script>

<style scoped>

</style>