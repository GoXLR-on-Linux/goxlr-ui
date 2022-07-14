<template>
  <ContentBox title="De-Esser">
      <Slider title="Amount" :slider-min-value=0 :slider-max-value=100 :text-min-value=0 :text-max-value=100 text-suffix="" :slider-value="getValue()" @value-changed="valueChanged" />
  </ContentBox>
</template>

<script>
import ContentBox from "../../ContentBox";
import Slider from "../../slider/Slider";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
export default {
  name: "MicDeEsser",
  components: {Slider, ContentBox},

  methods: {
    getValue() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().levels.deess;
    },

    valueChanged(id, value) {
      let command = { "SetDeeser": value };
      websocket.send_command(store.getActiveSerial(), command);
    }
  }
}
</script>

<style scoped>

</style>