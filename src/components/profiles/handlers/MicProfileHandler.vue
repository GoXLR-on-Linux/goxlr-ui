<template>
  <div class="profile-border">
    <div class="title">Mic Profiles</div>
    <div style="height: 235px">
      <ProfileManager :profile-list="getProfileList()" :active-profile="getActiveProfile()"
                      @load-profile="loadProfile" @save-profile="saveProfile" />
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
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
          .then(() => {
            store.getActiveDevice().profile_name = label;
          })
          .catch((error) => {
            console.log(error);
          });
    },

    saveProfile() {
      console.log("Saving Profile..");
    },
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
</style>