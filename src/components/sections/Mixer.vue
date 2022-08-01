<template>
  <ContentBox title="Mixer">
    <Slider v-for="item in mixerOrder" :key="item" :id=item :title="channelNamesReadable[item]" :slider-min-value=0
            :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getValue(item)"
            @value-changed="valueChange"
    />
  </ContentBox>

  <ContentBox title="Headphones">
    <Slider v-for="item in headphoneOrder" :key="item" :id=item :title="channelNamesReadable[item]" :slider-min-value=0
            :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getValue(item)"
            @value-changed="valueChange" v-show="(!hpHide.includes(item) || (hpHide.includes(item) && isVisible))"
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
    valueChange(id, volume) {
      let command = undefined;

      command = {
        "SetVolume": [
          ChannelName[id],
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
  }
}
</script>

<style scoped>
</style>
