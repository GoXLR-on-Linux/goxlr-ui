<template>
  <GroupContainer :title="$t('message.microphone.extras.title')">
      <Slider v-if="!isDeviceMini()" :title="$t('message.microphone.extras.deEsser')" :slider-min-value=0
              :slider-max-value=100 :text-suffix="$t('message.suffixes.percentage')"
              :slider-value="getDeEssValue()" :store-path="getStorePath('deess')"
              @value-changed="deEssValueChanged" />
      <Slider :title="$t('message.microphone.extras.bleep')" :text-min-value=0 :text-max-value=100
              :slider-min-value=-36 :slider-max-value=0 :text-suffix="$t('message.suffixes.percentage')"
              :slider-value="getBleepValue()" :store-path="getStorePath('bleep')"
              @value-changed="bleepValueChanged" />
  </GroupContainer>
</template>

<script>
import Slider from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {isDeviceMini} from "@/util/util";
import GroupContainer from "@/components/containers/GroupContainer.vue";
export default {
  name: "MicExtra",
  components: {GroupContainer, Slider},


  methods: {
    isDeviceMini,

    getDeEssValue() {
      return store.getActiveDevice().levels.deess;
    },

    deEssValueChanged(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetDeeser": value });
      store.getActiveDevice().levels.deess = value;
    },

    getBleepValue() {
      return store.getActiveDevice().levels.bleep;
    },

    bleepValueChanged(id, value) {
      websocket.send_command(store.getActiveSerial(), { "SetSwearButtonVolume": value });
      store.getActiveDevice().levels.bleep = value;
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/levels/" + name;
    }
  }
}
</script>

<style scoped>

</style>
