<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <ContentBox title="Preset">
        <ButtonList title="Group">
          <PushButton v-for="(value, id) in effectPresets" :key="id" :button-id="value" :label="getLabel(id, value)"
                      :is-active="isActive(value)" @button-pressed="buttonPressed"/>
        </ButtonList>
      </ContentBox>
    </div>
    <MainTabContent :no-left-pad="true">
      <ReverbEffect/>
      <EchoEffect/>
      <PitchEffect/>
      <GenderEffect/>
      <MegaphoneEffect/>
      <RobotEffect/>
      <HardTuneEffect/>
    </MainTabContent>
  </div>
</template>

<script>
import MainTabContent from "@/components/design/MainTabContent";
import ReverbEffect from "@/components/sections/effects/ReverbEffect";
import EchoEffect from "@/components/sections/effects/EchoEffect";
import PitchEffect from "@/components/sections/effects/PitchEffect";
import GenderEffect from "@/components/sections/effects/GenderEffect";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect";
import RobotEffect from "@/components/sections/effects/RobotEffect";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect";
import ContentBox from "@/components/ContentBox";
import PushButton from "@/components/button_list/Button";
import ButtonList from "@/components/button_list/ButtonList";
import {EffectPresets} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "EffectsTab",
  components: {
    ButtonList,
    PushButton,
    ContentBox,
    HardTuneEffect,
    RobotEffect, MegaphoneEffect, GenderEffect, PitchEffect, EchoEffect, ReverbEffect, MainTabContent
  },

  data() {
    return {
      effectPresets: EffectPresets,
    };
  },

  methods: {
    getLabel(id, key) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "";
      }
      return (id + 1).toString() + ": " + store.getActiveDevice().effects.preset_names[key];
    },

    isActive(key) {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return false;
      }
      return store.getActiveDevice().effects.active_preset === key;
    },

    buttonPressed(id) {
      websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": id});
    }
  }
}
</script>

<style scoped>

</style>