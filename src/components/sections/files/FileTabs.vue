<template>
  <Tabs v-show="deviceSet" style="width: 480px">
    <Tab name="Profiles" :selected="true">
      <ProfileHandler/>
    </Tab>
    <Tab :hidden="isDeviceMini()" name="Samples">
      <SampleHandler/>
    </Tab>
    <Tab :hidden="isDeviceMini()" name="Presets">
      <PresetHandler/>
    </Tab>
  </Tabs>
</template>

<script>
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import ProfileHandler from "@/components/profiles/handlers/ProfileHandler";
import PresetHandler from "@/components/sections/files/PresetHandler";
import SampleHandler from "@/components/sections/files/SampleHandler";
import {isDeviceMini} from "@/util/util";

export default {
  name: "FileTabs",
  methods: {

    isDeviceMini() {
      return isDeviceMini();
    }
  },
  components: {SampleHandler, PresetHandler, ProfileHandler, Tabs, Tab},

  props: {
    deviceSet: Boolean
  }
}
</script>

<style scoped>

</style>
