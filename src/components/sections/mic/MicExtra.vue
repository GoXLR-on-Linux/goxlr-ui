<template>
  <ContentBox title="Extras">
      <Slider v-show="!isDeviceMini()" title="De-Esser" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value="getDeEssValue()" @value-changed="deEssValueChanged" />
      <Slider title="Bleep" :slider-min-value=-34 :slider-max-value=0 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getBleepValue()" @value-changed="bleepValueChanged" />
  </ContentBox>
</template>

<script>
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
export default {
  name: "MicExtra",
  components: {Slider, ContentBox},

  methods: {
    isDeviceMini() {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().hardware.device_type === "Mini";
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
    }
  }
}
</script>

<style scoped>

</style>