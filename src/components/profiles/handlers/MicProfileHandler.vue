<template>
  <div class="profile-border">
    <div class="title">
      Mic Profiles
    </div>
    <div style="height: 30px; text-align: right">
      <div style="height: 14px; display: inline-block; width: calc(100% - 50px);">
        <hr style="border: 1px solid #2d3230" />
      </div>
      <div class="openButton" @click="openProfiles">
        <font-awesome-icon icon="fa-solid fa-folder" />
      </div>
    </div>
    <div style="height: 205px">
      <ProfileManager :profile-list="getProfileList()" :active-profile="getActiveProfile()" @new-profile="newProfile"
                      @load-profile="loadProfile" @save-profile="saveProfile" @save-profile-as="saveProfileAs"
                      @delete-profile="deleteProfile"/>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand, websocket} from "@/util/sockets";
import ProfileManager from "@/components/profiles/ProfileManager";

export default {
  name: "MicProfileHandler",
  components: {ProfileManager},

  methods: {
    getProfileList() {
      if (!store.hasActiveDevice()) {
        return [];
      }
      return store.getMicProfileFiles().sort();
    },

    getActiveProfile() {
      if (!store.hasActiveDevice()) {
        return '';
      }
      return store.getActiveDevice().mic_profile_name;
    },

    loadProfile(label) {
      let command = {
        "LoadMicProfile": label
      };

      sendHttpCommand(store.getActiveSerial(), command)
          .catch((error) => {
            console.log(error);
          });
    },

    newProfile(name) {
      sendHttpCommand(store.getActiveSerial(), {"NewMicProfile": name})
    },

    saveProfile() {
      sendHttpCommand(store.getActiveSerial(), {"SaveMicProfile": []});
    },

    saveProfileAs(name) {
      let command = {
        "SaveMicProfileAs": name
      }
      sendHttpCommand(store.getActiveSerial(), command);
    },

    deleteProfile(name) {
      sendHttpCommand(store.getActiveSerial(), { "DeleteMicProfile": name });
    },

    openProfiles() {
      websocket.open_path("MicProfiles");
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

.openButton {
  display: inline-block;
  color: #a5a7a6;
  padding: 10px;
  font-size: 14px
}

.openButton:hover {
  color: #fff;
}
</style>
