<template>
  <ProfileButtonList ref="buttonList">
    <ProfileButton v-for="(name, index) in profileList" :key="index" :button-id="name"
                   :label="name" :is-selected="isSelectedProfile(name)" :is-active="isActiveProfile(name)"
                   @button-clicked="handleButtonPress"
                   @button-double-clicked="handleDoubleClick"
    >
      <template #right v-if="menuList.length > 0">
        <button :ref="getButtonId(name)"
                :aria-label="$t('message.profileManager.accessibilityDropMenuTitle', { profileName: name })"
                :id="getButtonId(name)" aria-haspopup="menu" aria-controls="profile_menu" class="menu"
                @click.prevent.stop="menuPressed($event, getButtonId(name), name)">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
        </button>
      </template>
    </ProfileButton>
  </ProfileButtonList>
  <div class="buttonColumns">
    <button ref="save" :title="$t('message.profileManager.saveProfileName', {profileName: activeProfile} )"
            class="actionButton" @click="$refs.saveModal.openModal($refs.focusOk, $refs.save)">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
    </button>
    <button ref="new" :title="$t('message.profileManager.createProfile')" class="actionButton"
            @click="$refs.newModal.openModal($refs.focusDefault, $refs.new)">
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
    <template v-slot:title>{{$t('message.profileManager.overwriteTitle')}}</template>
    <template v-slot:default>{{ $t('message.profileManager.overwriteQuestion', { activeProfile: activeProfile }) }}</template>
    <template v-slot:footer>
      <ModalButton ref="focusOk" @click="saveActiveProfile(); $refs.saveModal.closeModal()">{{ $t('message.profileManager.overwriteYes') }}</ModalButton>
      <ModalButton @click="$refs.saveModal.closeModal()">{{ $t('message.profileManager.overwriteNo') }}</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="newModal" id="newProfile">
    <template v-slot:title>{{$t('message.profileManager.newTitle')}}</template>
    <template v-slot:default>
      {{$t('message.profileManager.newQuestion')}}
    </template>
    <template v-slot:footer>
      <ModalButton ref="focusDefault" @click="createNewProfile = true; $refs.newModal.closeModal(); $refs.nameModal.openModal($refs.newName, $refs.new)">{{$t('message.profileManager.newDefaultButton')}}</ModalButton>
      <ModalButton @click="createNewProfile = false; $refs.newModal.closeModal(); $refs.nameModal.openModal($refs.newName, $refs.new)">{{$t('message.profileManager.newCurrentButton')}}</ModalButton>
      <ModalButton @click="$refs.newModal.closeModal()">{{$t('message.profileManager.newCancelButton')}}</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="nameModal" id="nameProfile">
    <template v-slot:title>{{$t('message.profileManager.newNameTitle')}}</template>
    <template v-slot:default>
      <ModalInput ref="newName" v-model="newProfileName" :placeholder="$t('message.profileManager.newNamePlaceHolder')" @on-enter="$refs.nameModal.closeModal(); newProfile(); newProfileName = ''"/>
    </template>
    <template v-slot:footer>
      <ModalButton @click="$refs.nameModal.closeModal(); newProfile(); newProfileName = ''">{{$t('message.profileManager.newNameOk')}}</ModalButton>
      <ModalButton @click="$refs.nameModal.closeModal(); newProfileName = ''">{{$t('message.profileManager.newNameCancel')}}</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import ProfileButtonList from "@/components/profiles/ProfileButtonList.vue";
import ProfileButton from "@/components/profiles/ProfileButton.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import ModalInput from "@/components/design/modal/ModalInput.vue";
import DropMenu from "@/components/design/DropMenu.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  emits: ['new-profile', 'load-profile', 'save-profile', 'save-profile-as', 'menu-item-pressed'],

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

    getButtonId(profile_name) {
      return profile_name.toLowerCase().replace(" ", "_").replace("(", "_").replace(")", "_") + "_profile_button";
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
      this.createNewProfile = false;
    },

    saveActiveProfile() {
      this.$emit('save-profile');
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
