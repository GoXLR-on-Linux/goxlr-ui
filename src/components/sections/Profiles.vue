<template>
  <SelectorList>
    <!-- TODO: Consider expanding <PushButton /> to be more versatile -->
    <Profile v-for="(name, index) in getProfileList()" :key="index" :button-id="name"
             :label="name" :is-active="isActiveProfile(name)" @button-pressed="handleButtonPress"/>
  </SelectorList>
</template>

<script>
import Profile from "@/components/button_list/Profile";
import {store} from "@/store";
import SelectorList from "@/components/button_list/SelectorList";
import {websocket} from "@/util/websocket";

export default {
  name: "ProFiles",
  components: {Profile, SelectorList},


  data() {
    return {
      dirContents: [],
      activeProfile: String
    }
  },

  methods: {
    getProfileList() {
      if (!store.hasActiveDevice()) {
        return [];
      }
      return store.getProfileFiles();
    },

    isActiveProfile(name) {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return store.getActiveDevice().profile_name === name;
    },

    handleButtonPress: function (label) {
      let command = {
        "LoadProfile": label
      };

      websocket.send_command(store.getActiveSerial(), command);
      store.getActiveDevice().profile_name = label;
    },
  }
}
</script>

<style scoped>

</style>