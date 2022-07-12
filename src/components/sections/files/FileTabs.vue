<template>
  <Tabs v-show="deviceSet" style="width: 35%; height: 400px">
    <Tab name="Profiles" :selected="true" style="height: 320px">
      <div class="contentPad">
        <div class="section">
          <ProfileSelector />
        </div>
      </div>
    </Tab>
    <Tab name="Samples" :left_align="false" style="height: 320px">
      <div class="contentPad">
        <div class="section">

        </div>
      </div>
    </Tab>
    <Tab name="Presets" :left_align="false" style="height: 320px">
      <div class="contentPad">
        <div class="section">

        </div>
      </div>
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