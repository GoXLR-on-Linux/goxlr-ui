<template>
  <div style="margin-top: 10px">
    <!-- Buttons are buttons are buttons. -->
    <SelectorList>
      <PushButton v-for="(name, index) in getProfileList()" :key="index" :button-id="name"
                  :label="name" :is-active="isActiveProfile(name)" @button-pressed="handleButtonPress"/>
    </SelectorList>
  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
import PushButton from "@/components/button_list/Button";
import SelectorList from "@/components/button_list/SelectorList";

export default {
  name: "ProfileSelector",
  components: {SelectorList, PushButton},


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
      return store.getProfileFiles().sort();
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

      sendHttpCommand(store.getActiveSerial(), command)
          .then(() => {
            store.getActiveDevice().profile_name = label;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>
</style>