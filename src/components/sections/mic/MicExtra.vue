<template>
  <GroupContainer title="Extras">
      <Slider v-show="!isDeviceMini()" title="De-Esser" :slider-min-value=0 :slider-max-value=100 text-suffix="%" :slider-value="getDeEssValue()" :store-path="getStorePath('deess')" @value-changed="deEssValueChanged" />
      <Slider title="Bleep" :text-min-value=0 :text-max-value=100 :slider-min-value=-36 :slider-max-value=0 text-suffix="%" :slider-value="getBleepValue()" :store-path="getStorePath('bleep')" @value-changed="bleepValueChanged" />
  </GroupContainer>
</template>

<script>
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import GroupContainer from "@/components/containers/GroupContainer.vue";
export default {
  name: "MicExtra",
  components: {GroupContainer, Slider},


  methods: {
    isDeviceMini() {
      return isDeviceMini();
    },

    getDeEssValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().levels.deess;
    },

    deEssValueChanged(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetDeeser": value });
    },

    getBleepValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().levels.bleep;
    },

    bleepValueChanged(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetSwearButtonVolume": value });
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/levels/" + name;
    }
  }
}
</script>

<style scoped>

</style>
