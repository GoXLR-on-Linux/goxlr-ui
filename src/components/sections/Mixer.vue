<template>
  <!--
    Rather than Copy / Pasting a million sliders, we'll borrow the mixer map from mixerMapping.js, which will simplify
    updates, and allow tweaking without having to change the components here.
   -->
  <ContentBox title="Mixer">
    <Component :is="isSlider(item) ? 'Slider' : 'Spacer'" v-for="item in channelMap.mixer" :key="item.id"
               :id=item.id :title=item.name :slider-min-value=0 :slider-max-value=255 :text-min-value=0
               :text-max-value=100 text-suffix="%" :slider-value="getValue(item.id)" @value-changed="valueChange" />
  </ContentBox>

  <ContentBox title="Headphones">
    <Component :is="isSlider(item) ? 'Slider' : 'Spacer'" v-for="item in channelMap.headphones" :key="item.id"
               :id=item.id :title=item.name :slider-min-value=0 :slider-max-value=255 :text-min-value=0
               :text-max-value=100 text-suffix="%" :slider-value="getValue(item.id)" @value-changed="valueChange"
               :class="{ hidden: (item.hidden && !isVisible) }" />
  </ContentBox>
  <ExpandoBox @expando-clicked="toggleExpando" :expanded="isVisible"/>
</template>

<script>
import Slider from "../slider/Slider";
import ContentBox from "../ContentBox";
import ExpandoBox from "../util/ExpandoBox";
import {MixerMap, MixerType} from "@/util/mixerMapping";
import Spacer from "@/components/slider/Spacer";
import {store} from "@/store";
import {url_base} from "@/main";

export default {
  name: "MixerTop",
  components: {ExpandoBox, ContentBox, Slider, Spacer},

  data() {
    return {
      isVisible: false,
      channelMap: MixerMap,
      volumes: [],
    }
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    valueChange(id, volume) {
      let url = `${url_base}/set-volume/${store.getActiveSerial()}/${id}/${volume}`;
      fetch(url, {method: 'POST'});
    },

    // eslint-disable-next-line no-unused-vars
    getValue(id) {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().volumes[id];
      }
    },

    hideExpanded() {
      return false;
    },

    toggleExpando() {
      this.isVisible = !this.isVisible;
    },

    isSlider(item) {
      return item.type.id === MixerType.SLIDER.id;
    }
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
  display: none;
}
</style>
