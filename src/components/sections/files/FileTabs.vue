<template>
  <Tabs v-show="deviceSet" style="width: 480px">
    <Tab name="Profiles" :selected="true">
          <ProfileHandler />
    </Tab>
    <Tab name="Samples" :left_align="false">
    </Tab>
    <Tab name="Presets" :left_align="false">
    </Tab>
  </Tabs>
</template>

<script>
import Tabs from "@/components/tabs/Tabs";
import Tab from "@/components/tabs/Tab";
import ProfileHandler from "@/components/profiles/handlers/ProfileHandler";
export default {
  name: "FileTabs",
  components: {ProfileHandler, Tabs, Tab},

  props: {
    deviceSet: Boolean
  }
}
</script>

<style scoped>

</style>