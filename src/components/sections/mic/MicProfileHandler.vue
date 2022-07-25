<template>
  <div class="profile-border">
    <div class="title">Mic Profiles</div>
    <div style="height: 235px">
      <SelectorList>
        <ProfileButton v-for="(name, index) in getProfileList()" :key="index" :button-id="name"
                       :label="name" :is-selected="isSelectedProfile(name)" :is-active="isActiveProfile(name)"
                       @button-clicked="handleButtonPress"
                       @button-double-clicked="handleDoubleClick"/>
      </SelectorList>

      <div class="buttonColumns">
        <div class="actionButton">
          <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
        </div>
        <div class="actionButton">
          <font-awesome-icon icon="fa-solid fa-file-circle-plus"/>
        </div>
        <div class="actionButton">
          <font-awesome-icon icon="fa-solid fa-copy"/>
        </div>
        <div class="actionButton">
          <font-awesome-icon icon="fa-solid fa-trash"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectorList from "@/components/button_list/SelectorList";
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
import ProfileButton from "@/components/button_list/ProfileButton";

export default {
  // TODO: This is incredibly close to ProfileSelector, find a way to merge them cleanly.


  name: "MicProfileHandler",
  components: {ProfileButton, SelectorList},

  data() {
    return {
      selectedProfile: "",
    }
  },

  methods: {
    getProfileList() {
      if (!store.hasActiveDevice()) {
        return [];
      }
      return store.getMicProfileFiles().sort();
    },

    isActiveProfile(name) {
      if (!store.hasActiveDevice()) {
        return false;
      }

      return store.getActiveDevice().mic_profile_name === name;
    },

    isSelectedProfile(name) {
      if (!store.hasActiveDevice()) {
        return false;
      }
      return name === this.selectedProfile;
    },

    handleButtonPress(label) {
      this.selectedProfile = label;
    },

    handleDoubleClick(label) {
      let command = {
        "LoadMicProfile": label
      };

      sendHttpCommand(store.getActiveSerial(), command)
          .then(() => {
            store.getActiveDevice().profile_name = label;
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }
}
</script>

<style scoped>
.profile-border {
  border: 1px solid #59b1b6;
  width: 240px;
}

.title {
  background-color: #2d3230;
  color: #fff;
  padding: 20px;
  text-transform: uppercase;
  text-align: center;
}

.buttonColumns {
  display: flex;
  flex-direction: row;
  height: 35px;
  margin: 10px 10px 0 10px;
}

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