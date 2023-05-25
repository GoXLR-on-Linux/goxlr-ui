<template>
  <div class="profile-border">
    <div class="title">
      Mic Profiles
    </div>
    <div style="height: 30px; text-align: right">
      <div style="height: 14px; display: inline-block; width: calc(100% - 50px);">
        <hr style="border: 1px solid #2d3230" />
      </div>
      <button aria-label="Open Mic Profile Directory" class="openButton" @click="openProfiles">
        <font-awesome-icon icon="fa-solid fa-folder" />
      </button>
    </div>
    <div style="height: 205px">
      <ProfileManager ref="manager" :profile-list="getProfileList()" :active-profile="getActiveProfile()"
                      :menu-list="menuList"
                      @new-profile="newProfile" @load-profile="loadProfile" @save-profile="saveProfile"
                      @save-profile-as="saveProfileAs" @menu-item-pressed="menuItemPressed" />
    </div>

    <AccessibleModal ref="deleteMicModal" id="delMicProfile">
      <template v-slot:title>Delete Confirmation</template>
      <template v-slot:default>Are you sure you want to delete the microphone profile {{ selectedProfile }}?</template>
      <template v-slot:footer>
        <ModalButton @click="$refs.deleteMicModal.closeModal(); deleteProfile(this.selectedProfile)">Ok</ModalButton>
        <ModalButton ref="focusDelDefault" @click="$refs.deleteMicModal.closeModal()">Cancel</ModalButton>
      </template>
    </AccessibleModal>

    <AccessibleModal ref="noDelete" id="delMicProfile">
      <template v-slot:title>Unable to Delete</template>
      <template v-slot:default>It is not possible to delete the current active microphone profile.</template>
    </AccessibleModal>
  </div>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand, websocket} from "@/util/sockets";
import ProfileManager from "@/components/profiles/ProfileManager";
import AccessibleModal from "@/components/design/modal/AccessibleModal";
import ModalButton from "@/components/design/modal/ModalButton";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "MicProfileHandler",
  components: {FontAwesomeIcon, ModalButton, AccessibleModal, ProfileManager},

  data() {
    return {
      menuList: [
        {name: 'Load Profile', slug: 'load'},
        {name: 'Delete Profile', slug: 'delete'}
      ],

      selectedProfile: '',
    }
  },

  methods: {
    getProfileList() {
      return store.getMicProfileFiles().sort();
    },

    getActiveProfile() {
      return store.getActiveDevice().mic_profile_name;
    },

    menuItemPressed(event) {
      if (event.option.slug === "load") {
        this.loadProfile(event.item);
      }

      if (event.option.slug === "delete") {
        if (event.item === this.getActiveProfile()) {
          this.$refs.noDelete.openModal(this.$refs.focusDelDefault, this.$refs.manager.$refs[this.$refs.manager.getButtonId(event.item)][0]);
        } else {
          this.selectedProfile = event.item;
          this.$refs.deleteMicModal.openModal(this.$refs.focusDelDefault, this.$refs.manager.$refs[this.$refs.manager.getButtonId(event.item)][0]);
        }
      }
    },

    loadProfile(label) {
      let command = {
        "LoadMicProfile": [label, true]
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
  font-size: 14px;

  border: 0;
  margin: 0;
  background-color: transparent;
}

.openButton:hover {
  color: #fff;
}
</style>
