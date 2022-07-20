<template>
  <Tabs v-show="deviceSet" style="width: 480px">
    <Tab name="Profiles" :selected="true">
          <ProfileSelector />
    </Tab>
    <Tab name="Samples" :left_align="false">
    </Tab>
    <Tab name="Presets" :left_align="false">
    </Tab>
  </Tabs>
</template>

<script>
import ProfileSelector from "@/components/sections/files/ProfileSelector";
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
export default {
  name: "FileTabs",
  components: {ProfileSelector, Tabs, Tab},

  props: {
    deviceSet: Boolean
  }
}
</script>

<style scoped>

</style>