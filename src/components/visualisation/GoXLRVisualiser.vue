<template>
  <div class="base">
    <FaderVisualisation />
    <div v-if="!isDeviceMini()" class="right">
      <EffectsVisualisation />
      <div style="display: flex; flex-direction: row">
        <SamplerVisualisation />
        <MuteVisualisation />
      </div>
    </div>
  </div>
</template>

<script>
import FaderVisualisation from "@/components/visualisation/faders/FaderVisualisation.vue";
import EffectsVisualisation from "@/components/visualisation/effects/EffectsVisualisation.vue";
import {isDeviceMini} from "@/util/util";
import SamplerVisualisation from "@/components/visualisation/sampler/SamplerVisualisation.vue";
import MuteVisualisation from "@/components/visualisation/mute/MuteVisualisation.vue";

export default {
  name: "GoXLRVisualiser",
  components: {MuteVisualisation, SamplerVisualisation, EffectsVisualisation, FaderVisualisation},

  props: {
    refs: {type: Function, default: () => ({})},
  },

  methods: {
    isDeviceMini,

    principle() {
      /**
       * This is currently unused principle code giving an example of how to 'descend' into a tab change
       * its settings, it should be possible to navigate to any part of the UI using this method, so long
       * as the refs are correctly setup. I'm not going to follow this further yet until we have the SVGs
       * tied in, instead of the current HTML method.
       */

      this.refs()["device-tabs"].selectTab({name: "Configuration"});

      // Let the tab change render..
      this.$nextTick(() => {
        // Set the active fader channel
        this.refs()["faders"].activeChannel = "B";
      })
    },

  },


}
</script>

<style scoped>
.base {
  display: flex;
  flex-direction: row;

  height: 409px;
  background-color: #151515
}

.right {
  display: flex;
  flex-direction: column;
}

</style>
