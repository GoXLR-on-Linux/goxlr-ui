<template>
  <ProfileButtonList>
    <ProfileButton v-for="(name, index) in profileList" :key="index" :button-id="name"
                   :label="name" :is-selected="isSelectedProfile(name)" :is-active="isActiveProfile(name)"
                   @button-clicked="handleButtonPress"
                   @button-double-clicked="handleDoubleClick"/>
  </ProfileButtonList>
  <div class="buttonColumns">
    <div class="actionButton" @click="showSaveModal = true">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
    </div>
    <div class="actionButton" @click="showNewModal = true">
      <font-awesome-icon icon="fa-solid fa-file-circle-plus"/>
    </div>
    <div class="actionButton">
      <font-awesome-icon icon="fa-solid fa-copy"/>
    </div>
    <div class="actionButton" :class="{ disabled: isDeleteDisabled() }" @click="shouldShowDeleteModal()">
      <font-awesome-icon icon="fa-solid fa-trash"/>
    </div>
  </div>

  <!-- We have a few modals to potentially use here, this one for hitting the 'save' button.. -->
  <ModalBox v-if="showSaveModal" @close="showSaveModal = false">
    <template v-slot:title>Overwrite Confirmation</template>
    <div class="modal-body">Are you sure you want to overwrite the profile {{activeProfile}}?</div>
    <template v-slot:footer>
      <button class="modal-button" @click="showSaveModal = false; saveActiveProfile()">OK</button>
      <button class="modal-button" @click="showSaveModal = false">Cancel</button>
    </template>
  </ModalBox>

  <ModalBox v-if="showNewModal" @close="showNewModal = false">
    <template v-slot:title>New Profile Source</template>
    <div class="modal-body">Would you like to create a new profile from the default, or current configuration?</div>
    <template v-slot:footer>
      <button class="modal-button" @click="showNewModal = false; showNameModal = true">Default</button>
      <button class="modal-button" @click="showNewModal = false; showNameModal = true">Current</button>
      <button class="modal-button" @click="showNewModal = false">Cancel</button>
    </template>
  </ModalBox>

  <ModalBox v-if="showDeleteModal" @close="showDeleteModal = false">
    <template v-slot:title>Delete Confirmation</template>
    <div class="modal-body">Are you sure you want to delete the profile {{selectedProfile}}?</div>
    <template v-slot:footer>
      <button class="modal-button" @click="showDeleteModal = false">Ok</button>
      <button class="modal-button" @click="showDeleteModal = false">Cancel</button>
    </template>
  </ModalBox>

  <ModalBox v-if="showNameModal" @close="showNameModal = false">
    <template v-slot:title>Enter New Profile Name</template>
    <div class="modal-body">
      <input type="text" />
    </div>
    <template v-slot:footer>
      <button class="modal-button" @click="showNameModal = false">Ok</button>
      <button class="modal-button" @click="showNameModal = false">Cancel</button>
    </template>
  </ModalBox>

</template>

<script>
import ProfileButtonList from "@/components/profiles/ProfileButtonList";
import ProfileButton from "@/components/profiles/ProfileButton";
import ModalBox from "@/components/design/Modal";

export default {
  emits: ['load-profile', 'save-profile'],

  name: "ProfileManager",
  components: {ModalBox, ProfileButton, ProfileButtonList},
  props: {
    activeProfile: String,
    profileList: Array,
  },

  data() {
    return {
      selectedProfile: '',
      showSaveModal: false,
      showNewModal: false,
      showDeleteModal: false,
      showNameModal: false,
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

    saveActiveProfile() {
      this.$emit('save-profile');
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

.modal-button {
  background-color: #353937;
  color: #fff;
  padding: 8px 30px;
  border: none;
  margin: 8px;
  width: 120px;
}

.modal-button:hover {
  background-color: #737775;
}

.modal-body {
  color: #fff;
  padding: 20px;
}
</style>