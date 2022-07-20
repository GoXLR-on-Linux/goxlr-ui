<template>
    <!-- Buttons are buttons are buttons. -->
  <div style="height: 320px">
    <SelectorList>
      <PushButton v-for="(name, index) in getProfileList()" :key="index" :button-id="name"
                  :label="name" :is-active="isActiveProfile(name)" @button-pressed="handleButtonPress"/>
    </SelectorList>
    <div style="display: flex; flex-direction: row; height: 35px; margin-left: 10px; margin-right: 10px; margin-top: 10px">
      <div class="actionButton"><font-awesome-icon icon="fa-solid fa-floppy-disk" /></div>
      <div class="actionButton"><font-awesome-icon icon="fa-solid fa-file-circle-plus" /></div>
      <div class="actionButton"><font-awesome-icon icon="fa-solid fa-copy" /></div>
      <div class="actionButton"><font-awesome-icon icon="fa-solid fa-trash" /></div>
    </div>

  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
import PushButton from "@/components/button_list/Button";
import SelectorList from "@/components/button_list/SelectorList";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ProfileSelector",
  components: {SelectorList, PushButton, FontAwesomeIcon},


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

.actionButton {
  /* TODO: Temporary Colour */
  color: #8e9999;
  background-color: #353937;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  line-height: 40px;
}

.actionButton:first-child {
  margin-left: 0;
}

.actionButton:last-child {
  margin-right: 0px;
}

.actionButton:hover {
  background-color: #49514e;
}
</style>