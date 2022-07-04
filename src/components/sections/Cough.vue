<template>
  <ContentBox title="Cough Button Settings">
    <ButtonList title="Behavior">
      <Button label="Hold" :is-active="!coughBehavior" :button-id="'0'" @button-pressed="behaviorPressed" :is-disabled="true"/>
      <Button label="Toggle" :is-active="coughBehavior" :button-id="'1'" @button-pressed="behaviorPressed"/>
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
import {CoughMuteBehaviours, getMuteIdByName} from "@/util/mixerMapping";
import {invoke} from "@tauri-apps/api";
import {store} from "@/store";

export default {
  name: "CoughButtonSettings",
  components: {ButtonList, ContentBox, Button},

  data() {
    return {
      muteBehaviours: CoughMuteBehaviours,
      activeMuteFunction: 0,
      coughBehavior: true
    }
  },

  created() {
    // eslint-disable-next-line no-unused-vars
    this.waitFor(_ => store.hasActiveDevice() === true).then(
        // eslint-disable-next-line no-unused-vars
        _ => {
          this.activeMuteFunction = getMuteIdByName(store.getActiveDevice().cough_button.mute_type);
          this.coughBehavior = store.getActiveDevice().cough_button.is_toggle;
        }
    );
  },

  methods: {
    isActiveMuteFunction: function (id) {
      return this.activeMuteFunction === id;
    },
    setActiveMuteFunction: function (id) {
      this.activeMuteFunction = id;
      this.updateDevice();
    },
    waitFor(conditionFunction) {
      const poll = resolve => {
        if (conditionFunction()) resolve();
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
      }
      return new Promise(poll);
    },
    behaviorPressed: function (id){
      if (id === '0') { this.coughBehavior = false }
      if (id === '1') { this.coughBehavior = true }
      this.updateDevice();
    },
    updateDevice: function (){
      invoke('set_cough_behaviour', {
        serial: store.getActiveSerial(),
        coughMuteFunction: this.activeMuteFunction
      })
    }

  },

}
</script>

<style scoped>

</style>