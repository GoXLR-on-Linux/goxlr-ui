<script>
import MainTabContent from "@/components/design/MainTabContent";
import ContentBox from "@/components/ContentBox";
import ButtonList from "@/components/button_list/ButtonList";
import PushButton from "@/components/button_list/Button";
import ColourBox from "@/components/sections/lighting/ColourBox";

import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { isDeviceMini } from "@/util/util";

export default {
  name: "LightingSampler",
  components: {
    ColourBox,
    PushButton,
    ButtonList,
    ContentBox,
    MainTabContent,
  },

  data() {
    return {
      activeBank: "SamplerSelectA",
    }
  },

  methods: {
    isInactiveState(state) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return store.getActiveDevice().lighting.sampler[this.activeBank].off_style === state;
    },
    setInactiveState(state) {
      websocket.send_command(store.getActiveSerial(), {"SetSampleOffStyle": [this.activeBank, state]});
    },

    getColour(element) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "#000000";
      }
      return "#" + store.getActiveDevice().lighting.sampler[this.activeBank].colours[element];
    },

    onColourChange(id, value) {
      // As always, fetch the colours..
      let colour_one = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_two;
      let colour_three = store.getActiveDevice().lighting.sampler[this.activeBank].colours.colour_three;

      if (id === "colour_one") {
        colour_one = value.substr(1, 6);
      } else if (id === "colour_two") {
        colour_two = value.substr(1, 6);
      } else if (id === "colour_three") {
        colour_three = value.substr(1, 6);
      }

      websocket.send_command(store.getActiveSerial(), {"SetSampleColour": [this.activeBank, colour_one, colour_two, colour_three]})

      console.log("Changing " + id + " to " + value);
    }
  }
}
</script>

<template>
  <MainTabContent :no-left-pad=false>
    <ContentBox title="Bank">
      <ButtonList title="Buttons">
        <PushButton label="A" :is-active="activeBank === 'SamplerSelectA'" @click="activeBank = 'SamplerSelectA'"/>
        <PushButton label="B" :is-active="activeBank === 'SamplerSelectB'" @click="activeBank = 'SamplerSelectB'"/>
        <PushButton label="C" :is-active="activeBank === 'SamplerSelectC'" @click="activeBank = 'SamplerSelectC'"/>
      </ButtonList>
      <ColourBox id="colour_one" title="Active / Loaded" :colour-value="getColour('colour_one')"
                 @colour-changed="onColourChange"/>
      <ColourBox id="colour_three" title="Sample Empty" :colour-value="getColour('colour_three')"
                 @colour-changed="onColourChange"/>
      <ButtonList title="Inactive Bank">
        <PushButton label="Dim Active Colour" :is-active="isInactiveState('Dimmed')"
                    @click="setInactiveState('Dimmed')"/>
        <PushButton label="Inactive Colour" :is-active="isInactiveState('Colour2')"
                    @click="setInactiveState('Colour2')"/>
        <PushButton label="Dim Inactive Colour" :is-active="isInactiveState('DimmedColour2')"
                    @click="setInactiveState('DimmedColour2')"/>
      </ButtonList>
      <ColourBox id="colour_two" title="Inactive Bank" :colour-value="getColour('colour_two')"
                 @colour-changed="onColourChange"/>
    </ContentBox>
  </MainTabContent>
</template>

<style>

</style>