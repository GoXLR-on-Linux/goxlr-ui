<template>
  <ContentBox title="Bank">
    <ButtonList title="Bank">
      <PushButton label="A" :is-active="activeBank === 'A'" @click="activeBank = 'A'"/>
      <PushButton label="B" :is-active="activeBank === 'B'" @click="activeBank = 'B'"/>
      <PushButton label="C" :is-active="activeBank === 'C'" @click="activeBank = 'C'"/>
    </ButtonList>

    <ButtonList title="Button">
      <PushButton label="Top Left" :is-active="activeButton === 'TopLeft'" @click="activeButton = 'TopLeft'"/>
      <PushButton label="Top Right" :is-active="activeButton === 'TopRight'" @click="activeButton = 'TopRight'"/>
      <PushButton label="Bottom Left" :is-active="activeButton === 'BottomLeft'" @click="activeButton = 'BottomLeft'"/>
      <PushButton label="Bottom Right" :is-active="activeButton === 'BottomRight'"
                  @click="activeButton = 'BottomRight'"/>
    </ButtonList>

    <ButtonList title="Function">
      <PushButton label="Play-Next" :is-active="isActiveFunction('PlayNext')" @click="setActiveFunction('PlayNext')"/>
      <PushButton label="Play-Stop" :is-active="isActiveFunction('PlayStop')" @click="setActiveFunction('PlayStop')"/>
      <PushButton label="Play-Fade" :is-active="isActiveFunction('PlayFade')" @click="setActiveFunction('PlayFade')"/>
      <PushButton label="Stop on Release" :is-active="isActiveFunction('StopOnRelease')" @click="setActiveFunction('StopOnRelease')"/>
      <PushButton label="Fade on Release" :is-active="isActiveFunction('FadeOnRelease')" @click="setActiveFunction('FadeOnRelease')"/>
      <PushButton label="Loop" :is-active="isActiveFunction('Loop')" @click="setActiveFunction('Loop')"/>
    </ButtonList>

    <ButtonList title="Play Order">
      <PushButton label="Sequential" :is-active="isActiveOrder('Sequential')" @click="setActiveOrder('Sequential')"/>
      <PushButton label="Random" :is-active="isActiveOrder('Random')" @click="setActiveOrder('Random')"/>
    </ButtonList>
  </ContentBox>
  <ContentBox title="Sampler">
    <ButtonList title="Samples">
      <PushButton v-for="(sample, index) in getSamples()" :key="index" :label="sample"/>
      <PushButton>
        <template #left>
          <div style="text-align: center">+</div>
        </template>
      </PushButton>
    </ButtonList>
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "SamplerTab",
  components: {PushButton, ButtonList, ContentBox},

  data() {
    return {
      activeBank: "A",
      activeButton: "TopLeft",
    }
  },

  methods: {
    isActiveFunction(sampleFunction) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].function === sampleFunction;
    },
    setActiveFunction(sampleFunction) {
      websocket.send_command(store.getActiveSerial(), {"SetSamplerFunction": [this.activeBank, this.activeButton, sampleFunction]});
      store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].function = sampleFunction;
    },

    isActiveOrder(order) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].order === order;
    },
    setActiveOrder(sampleOrder) {
      websocket.send_command(store.getActiveSerial(), {"SetSamplerOrder": [this.activeBank, this.activeButton, sampleOrder]});
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].order = sampleOrder;
    },

    getSamples() {
      if (!store.hasActiveDevice()) {
        return [];
      }
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].samples;
    }
  }

}
</script>

<style scoped>

</style>