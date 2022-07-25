<template>
  <div style="height: 320px">
    <ProfileManager :profile-list="getProfileList()" :active-profile="getActiveProfile()"
                    @load-profile="loadProfile" @save-profile="saveProfile" />
  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand} from "@/util/sockets";
import ProfileManager from "@/components/profiles/ProfileManager";

export default {
  name: "ProfileHandler",
  components: {ProfileManager},

  methods: {
    getProfileList() {
      if (!store.hasActiveDevice()) {
        return [];
      }
      return store.getProfileFiles().sort();
    },

    getActiveProfile() {
      if (!store.hasActiveDevice()) {
        return '';
      }
      return store.getActiveDevice().profile_name;
    },

    loadProfile: function (label) {
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

    saveProfile() {
      console.log("Saving Main Profile..");
    }
  }
}
</script>

<style scoped>
</style>