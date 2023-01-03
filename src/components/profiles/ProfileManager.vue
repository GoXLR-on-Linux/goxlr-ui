<template xmlns:slot="http://www.w3.org/1999/html">
  <ProfileButtonList ref="buttonList">
    <ProfileButton v-for="(name, index) in profileList" :key="index" :button-id="name"
                   :label="name" :is-selected="isSelectedProfile(name)" :is-active="isActiveProfile(name)"
                   @button-clicked="handleButtonPress"
                   @button-double-clicked="handleDoubleClick"
    >
      <template #right v-if="menuList.length > 0">
        <button :ref="getButtonId(name)" :aria-label="`${name} Options`" :id="getButtonId(name)" aria-haspopup="menu" aria-controls="profile_menu" class="menu" @click.prevent.stop="menuPressed($event, getButtonId(name), name)">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
        </button>
      </template>
    </ProfileButton>
  </ProfileButtonList>
  <div class="buttonColumns">
    <button ref="save" :title="`Save Profile ${selectedProfile}`" class="actionButton" @click="$refs.saveModal.openModal($refs.focusOk, $refs.save)">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
    </button>
    <button ref="new" title="Create new Profile" class="actionButton" @click="$refs.newModal.openModal($refs.focusDefault, $refs.new)">
      <font-awesome-icon icon="fa-solid fa-file-circle-plus"/>
    </button>
  </div>

  <DropMenu
      :options="menuList"
      ref="contextMenu"
      @option-clicked="optionClicked"
      menu_id="profile_menu"
  >
  </DropMenu>

  <AccessibleModal ref="saveModal" id="saveProfile" :show_close=false>
    <template v-slot:title>Overwrite Confirmation</template>
    <template v-slot:default>Are you sure you want to overwrite the profile {{ activeProfile }}?</template>
    <template v-slot:footer>
      <ModalButton ref="focusOk" @click="saveActiveProfile(); $refs.saveModal.closeModal()">OK</ModalButton>
      <ModalButton @click="$refs.saveModal.closeModal()">Cancel</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="newModal" id="newProfile">
    <template v-slot:title>New Profile Source</template>
    <template v-slot:default>
      Would you like to create a new profile from the default, or current configuration?
    </template>
    <template v-slot:footer>
      <ModalButton ref="focusDefault" @click="createNewProfile = true; $refs.newModal.closeModal(); $refs.nameModal.openModal($refs.newName, $refs.new)">Default</ModalButton>
      <ModalButton @click="createNewProfile = false; $refs.newModal.closeModal(); $refs.nameModal.openModal($refs.newName, $refs.new)">Current</ModalButton>
      <ModalButton @click="$refs.newModal.closeModal()">Cancel</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="nameModal" id="nameProfile">
    <template v-slot:title>Enter New Profile Name</template>
    <template v-slot:default>
      <ModalInput ref="newName" v-model="newProfileName" placeholder="Profile Name" @on-enter="$refs.nameModal.closeModal(); newProfile(); newProfileName = ''"/>
    </template>
    <template v-slot:footer>
      <ModalButton @click="$refs.nameModal.closeModal(); newProfile(); newProfileName = ''">Ok</ModalButton>
      <ModalButton @click="$refs.nameModal.closeModal(); newProfileName = ''">Cancel</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import ProfileButtonList from "@/components/profiles/ProfileButtonList";
import ProfileButton from "@/components/profiles/ProfileButton";
import ModalButton from "@/components/design/modal/ModalButton";
import ModalInput from "@/components/design/modal/ModalInput";
import DropMenu from "@/components/design/DropMenu";
import AccessibleModal from "@/components/design/modal/AccessibleModal";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  emits: ['new-profile', 'load-profile', 'save-profile', 'save-profile-as', 'delete-profile', 'menu-item-pressed'],

  name: "ProfileManager",
  components: {FontAwesomeIcon, AccessibleModal, DropMenu, ModalInput, ModalButton, ProfileButton, ProfileButtonList},
  props: {
    activeProfile: String,
    profileList: Array,
    menuList: { type: Array, default: () => ([]) },
  },

  data() {
    return {
      selectedProfile: '',
      showSaveModal: false,
      showNewModal: false,
      showDeleteModal: false,
      showNameModal: false,

      createNewProfile: false,
      newProfileName: ''
    }
  },

  methods: {
    isActiveProfile(label) {
      return label === this.activeProfile;
    },

    isSelectedProfile(label) {
      return label === this.selectedProfile;
    },

    isDeleteDisabled() {
      return (this.activeProfile === this.selectedProfile) || (this.selectedProfile === '');
    },

    handleButtonPress(label) {
      this.selectedProfile = label;
    },

    handleDoubleClick(label) {
      this.$emit("load-profile", label);
    },

    shouldShowDeleteModal() {
      if (!this.isDeleteDisabled()) {
        this.showDeleteModal = true;
      }
    },

    getButtonId(profile_name) {
      return profile_name.toLowerCase().replace(" ", "_").replace("(", "_").replace(")", "_") + "_profile_button";
    },

    displayNameModal() {
      this.showNameModal = true;
      this.$nextTick(() => {
        this.$refs.newName.focusInput();
      })
    },

    newProfile() {
      if (this.newProfileName === "") {
        return;
      }

      if (this.createNewProfile) {
        this.$emit('new-profile', this.newProfileName);
      } else {
        this.$emit('save-profile-as', this.newProfileName);
      }

      this.newProfileName = "";
    },

    copyProfile() {
      // Per the Windows UI, copies the current settings into a new profile based on the name of the selected
      // profile (It's a little counter-intuitive!)
      let name = this.selectedProfile;

      for (let i = 0; i < 10; i++) {
        if (this.profileNameExists(name)) {
          name = name + "_copy";
        } else {
          break;
        }
      }

      this.$emit('save-profile-as', name);
    },

    profileNameExists(name) {
      for (let check of this.profileList) {
        console.log(check);
        if (check === name) {
          return true;
        }
      }
      return false;
    },

    saveActiveProfile() {
      this.$emit('save-profile');
    },

    deleteSelectedProfile() {
      this.$emit('delete-profile', this.selectedProfile);
    },

    menuPressed(event, return_id, item) {
      this.handleButtonPress(item);
      this.$refs.contextMenu.showMenu(event, item, return_id, this.$refs.buttonList.$refs.selectorList.scrollTop);
    },

    optionClicked(event) {
      this.$emit('menu-item-pressed', event);
    },

    getMenuButton() {
      return this.$refs.menuButton;
    }
  }
}
</script>

<style scoped>

.buttonColumns {
  display: flex;
  flex-direction: row;
  height: 35px;
  margin: 10px 10px 0 10px;
}

.actionButton {
  color: #a5a7a6;
  background-color: #353937;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  line-height: 40px;
}

/*.actionButton.disabled {*/
/*  background-color: #2B2F2D;*/
/*}*/

.actionButton.disabled:hover {
  background-color: #2B2F2D;
}

.actionButton:first-child {
  margin-left: 0;
}

.actionButton:last-child {
  margin-right: 0;
}

.actionButton:hover {
  background-color: #49514e;
}

.actionButton:disabled {
  background-color: #2B2F2D;
}

.menu {
  padding-left: 4px;
  padding-right: 4px;
}

.menu:hover {
  cursor: pointer;
}

button {
  background-color: transparent;
  color: #fff;
  border: 0;
  padding: 0;
  margin: 0;
}

button:focus {
  background-color: #49514e;
}

button:focus {
  outline: none;
}


</style>
