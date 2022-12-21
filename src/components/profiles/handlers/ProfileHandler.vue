<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 50px);">
      <hr style="border: 1px solid #2d3230" />
    </div>
    <div aria-label="Open Profile Directory" class="openButton" @click="openProfiles">
      <font-awesome-icon icon="fa-solid fa-folder" />
    </div>
  </div>
  <div style="height: 290px">
    <ProfileManager :profile-list="getProfileList()" :active-profile="getActiveProfile()" :menu-list="menuList" @new-profile="newProfile"
                    @load-profile="loadProfile" @save-profile="saveProfile" @save-profile-as="saveProfileAs" @menu-item-pressed="menuItemPressed"
                    @delete-profile="deleteProfile"/>
  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand, websocket} from "@/util/sockets";
import ProfileManager from "@/components/profiles/ProfileManager";

export default {
  name: "ProfileHandler",
  components: {ProfileManager},

  data() {
    return {
      menuList: [
        {name: 'Load Profile', slug: 'load'},
        {name: 'Load Colours Only', slug: 'colours'}
      ]
    }
  },

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

    menuItemPressed(event) {
      if (event.option.slug === "colours") {
        this.loadProfileColours(event.item);
      }

      if (event.option.slug === "load") {
        this.loadProfile(event.item);
      }
    },

    loadProfile: function (label) {
      let command = {
        "LoadProfile": label
      };

      sendHttpCommand(store.getActiveSerial(), command)
          .catch((error) => {
            console.log(error);
          });
    },

    loadProfileColours: function(label) {
      sendHttpCommand(store.getActiveSerial(), { "LoadProfileColours": label });
    },

    newProfile(name) {
      sendHttpCommand(store.getActiveSerial(), {"NewProfile": name})
    },

    saveProfile() {
      console.log("Saving Main Profile..");
      sendHttpCommand(store.getActiveSerial(), {"SaveProfile": []});
    },

    saveProfileAs(name) {
      console.log(name);
      let command = {
        "SaveProfileAs": name
      }
      sendHttpCommand(store.getActiveSerial(), command);
    },

    deleteProfile(name) {
      sendHttpCommand(store.getActiveSerial(), {"DeleteProfile": name});
    },

    openProfiles() {
      websocket.open_path("Profiles");
    }
  }
}
</script>

<style scoped>
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
