<template>
  <ContentBox title="Mixer">
    <Slider v-for="item in mixerOrder" :key=item :id=channelNames.indexOf(item) :title="channelNamesReadable[item]" :slider-min-value=0
            :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getValue(item)"
            :store-path="getStorePath(item)" @value-changed="valueChange"
    />
  </ContentBox>

  <ContentBox title="Headphones">
    <Slider v-for="item in headphoneOrder" :key=item :id=channelNames.indexOf(item) :title="channelNamesReadable[item]" :slider-min-value=0
            :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getValue(item)"
            :store-path="getStorePath(item)" @value-changed="valueChange"
            v-show="(!hpHide.includes(item) || (hpHide.includes(item) && isVisible))"
    />
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible"/>
</template>

<script>
import Slider from "../slider/Slider";
import ContentBox from "../ContentBox";
import ExpandoBox from "../design/ExpandoBox";
import {
  ChannelName,
  ChannelNameReadable,
  HeadphoneMixerHidden,
  HeadphoneMixerOrder,
  MixerOrder
} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "MixerTop",
  components: {ExpandoBox, ContentBox, Slider},

  data() {
    return {
      mixerOrder: MixerOrder,
      headphoneOrder: HeadphoneMixerOrder,
      hpHide: HeadphoneMixerHidden,
      channelNames: ChannelName,
      channelNamesReadable: ChannelNameReadable,

      isVisible: false,
      volumes: [],
    }
  },

  methods: {
    getBaseChannels() {
      let channels = MixerOrder;
      return channels;
    },

    getMicChannels() {
      return ["Headphones", "MicMonitor"];
    },


    valueChange(id, volume) {
      let str_id = this.channelNames[id];
      let command = undefined;

      command = {
        "SetVolume": [
          str_id,
          volume
        ]
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    getValue(id) {
      if (store.hasActiveDevice()) {
        if (id === 11) {
          return store.getActiveDevice().levels.bleep;
        }
        return store.getActiveDevice().levels.volumes[id];
      }
    },

    toggleExpando() {
      this.isVisible = !this.isVisible;
    },

    getStorePath(id) {
      return "/mixers/" + store.getActiveSerial() + "/levels/volumes/" + id;
    },
  }
}
</script>

<style scoped>
</style>
