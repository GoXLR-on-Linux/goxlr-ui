<template>
  <Tabs v-show="deviceSet" style="width: 480px">
    <Tab name="Profiles" :selected="true">
      <ProfileHandler/>
    </Tab>
    <Tab name="Samples" :left_align="false">
      <SampleHandler/>
    </Tab>
    <Tab name="Presets" :left_align="false">
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

export default {
  name: "FileTabs",
  components: {SampleHandler, PresetHandler, ProfileHandler, Tabs, Tab},

  props: {
    deviceSet: Boolean
  }
}
</script>

<style scoped>

</style>