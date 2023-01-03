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
    <ProfileManager ref="manager" :profile-list="getProfileList()" :active-profile="getActiveProfile()" :menu-list="menuList" @new-profile="newProfile"
                    @load-profile="loadProfile" @save-profile="saveProfile" @save-profile-as="saveProfileAs" @menu-item-pressed="menuItemPressed"
                    @delete-profile="deleteProfile"/>
  </div>

  <AccessibleModal ref="deleteModal" id="delProfile">
    <template v-slot:title>Delete Confirmation</template>
    <template v-slot:default>Are you sure you want to delete the profile {{ selectedProfile }}?</template>
    <template v-slot:footer>
      <ModalButton @click="$refs.deleteModal.closeModal(); deleteProfile(this.selectedProfile)">Ok</ModalButton>
      <ModalButton ref="focusDelDefault" @click="$refs.deleteModal.closeModal()">Cancel</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="noDelete" id="delProfile">
    <template v-slot:title>Unable to Delete</template>
    <template v-slot:default>It is not possible to delete the current active profile.</template>
  </AccessibleModal>

</template>

<script>
import {store} from "@/store";
import {sendHttpCommand, websocket} from "@/util/sockets";
import ProfileManager from "@/components/profiles/ProfileManager";
import AccessibleModal from "@/components/design/modal/AccessibleModal";
import ModalButton from "@/components/design/modal/ModalButton";

export default {
  name: "ProfileHandler",
  components: {ModalButton, AccessibleModal, ProfileManager},

  data() {
    return {
      menuList: [
        {name: 'Load Profile', slug: 'load'},
        {name: 'Load Colours Only', slug: 'colours'},
        {name: 'Delete Profile', slug: 'delete'}
      ],

      selectedProfile: '',
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

      if (event.option.slug === "delete") {
        if (event.item === this.getActiveProfile()) {
          this.$refs.noDelete.openModal(this.$refs.focusDelDefault, this.$refs.manager.$refs[this.$refs.manager.getButtonId(event.item)][0]);
        } else {
          this.selectedProfile = event.item;
          this.$refs.deleteModal.openModal(this.$refs.focusDelDefault, this.$refs.manager.$refs[this.$refs.manager.getButtonId(event.item)][0]);
        }
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
