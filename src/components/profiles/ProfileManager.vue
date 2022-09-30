<template>
  <ProfileButtonList ref="buttonList">
    <ProfileButton v-for="(name, index) in profileList" :key="index" :button-id="name"
                   :label="name" :is-selected="isSelectedProfile(name)" :is-active="isActiveProfile(name)"
                   @button-clicked="handleButtonPress"
                   @button-double-clicked="handleDoubleClick">
      <template #right v-if="menuList.length > 0">
        <div class="menu" @click.prevent.stop="menuPressed($event, name)">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
        </div>
      </template>
    </ProfileButton>
  </ProfileButtonList>
  <div class="buttonColumns">
    <div class="actionButton" @click="showSaveModal = true">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
    </div>
    <div class="actionButton" @click="showNewModal = true">
      <font-awesome-icon icon="fa-solid fa-file-circle-plus"/>
    </div>
    <div class="actionButton" :class="{ disabled: selectedProfile === '' }" @click="copyProfile()">
      <font-awesome-icon icon="fa-solid fa-copy"/>
    </div>
    <div class="actionButton" :class="{ disabled: isDeleteDisabled() }" @click="shouldShowDeleteModal()">
      <font-awesome-icon icon="fa-solid fa-trash"/>
    </div>
  </div>

  <DropMenu
      :options="menuList"
      ref="contextMenu"
      @option-clicked="optionClicked"
  >
  </DropMenu>

  <!-- We have a few modals to potentially use here, this one for hitting the 'save' button.. -->
  <ModalBox v-if="showSaveModal" @close="showSaveModal = false">
    <template v-slot:title>Overwrite Confirmation</template>
    <template v-slot:default>Are you sure you want to overwrite the profile {{ activeProfile }}?</template>
    <template v-slot:footer>
      <ModalButton @click="showSaveModal = false; saveActiveProfile()">OK</ModalButton>
      <ModalButton @click="showSaveModal = false">Cancel</ModalButton>
    </template>
  </ModalBox>

  <ModalBox v-if="showNewModal" @close="showNewModal = false">
    <template v-slot:title>New Profile Source</template>
    <template v-slot:default>
      Would you like to create a new profile from the default, or current configuration?
    </template>
    <template v-slot:footer>
      <ModalButton @click="showNewModal = false; createNewProfile = true; displayNameModal()">Default</ModalButton>
      <ModalButton @click="showNewModal = false; createNewProfile = false; displayNameModal()">Current</ModalButton>
      <ModalButton @click="showNewModal = false">Cancel</ModalButton>
    </template>
  </ModalBox>

  <ModalBox v-if="showDeleteModal" @close="showDeleteModal = false">
    <template v-slot:title>Delete Confirmation</template>
    <template v-slot:default>Are you sure you want to delete the profile {{ selectedProfile }}?</template>
    <template v-slot:footer>
      <ModalButton @click="showDeleteModal = false; deleteSelectedProfile()">Ok</ModalButton>
      <ModalButton @click="showDeleteModal = false">Cancel</ModalButton>
    </template>
  </ModalBox>

  <ModalBox v-if="showNameModal" @close="showNameModal = false">
    <template v-slot:title>Enter New Profile Name</template>
    <template v-slot:default>
      <ModalInput ref="newName" v-model="newProfileName" placeholder="Profile Name"
                  @on-enter="showNameModal = false; newProfile()"/>
    </template>
    <template v-slot:footer>
      <ModalButton @click="showNameModal = false; newProfile()">Ok</ModalButton>
      <ModalButton @click="showNameModal = false; newProfileName = ''">Cancel</ModalButton>
    </template>
  </ModalBox>
</template>

<script>
import ProfileButtonList from "@/components/profiles/ProfileButtonList";
import ProfileButton from "@/components/profiles/ProfileButton";
import ModalBox from "@/components/design/modal/ModalBox";
import ModalButton from "@/components/design/modal/ModalButton";
import ModalInput from "@/components/design/modal/ModalInput";
import DropMenu from "@/components/design/DropMenu";

export default {
  emits: ['new-profile', 'load-profile', 'save-profile', 'save-profile-as', 'delete-profile', 'menu-item-pressed'],

  name: "ProfileManager",
  components: {DropMenu, ModalInput, ModalButton, ModalBox, ProfileButton, ProfileButtonList},
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

    menuPressed(event, item) {
      this.handleButtonPress(item);
      this.$refs.contextMenu.showMenu(event, item, this.$refs.buttonList.$refs.selectorList.scrollTop);
    },

    optionClicked(event) {
      this.$emit('menu-item-pressed', event);
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

.actionButton.disabled {
  background-color: #2B2F2D;
}

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

.menu {
  padding-left: 4px;
  padding-right: 4px;

}

.menu:hover {
  cursor: pointer;
}
</style>