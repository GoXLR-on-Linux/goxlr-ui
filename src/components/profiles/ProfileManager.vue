<template>
  <ProfileButtonList>
    <ProfileButton v-for="(name, index) in profileList" :key="index" :button-id="name"
                   :label="name" :is-selected="isSelectedProfile(name)" :is-active="isActiveProfile(name)"
                   @button-clicked="handleButtonPress"
                   @button-double-clicked="handleDoubleClick"/>
  </ProfileButtonList>

  <div class="buttonColumns">
    <div class="actionButton">
      <font-awesome-icon icon="fa-solid fa-floppy-disk"/>
    </div>
    <div class="actionButton">
      <font-awesome-icon icon="fa-solid fa-file-circle-plus"/>
    </div>
    <div class="actionButton">
      <font-awesome-icon icon="fa-solid fa-copy"/>
    </div>
    <div class="actionButton">
      <font-awesome-icon icon="fa-solid fa-trash"/>
    </div>
  </div>
</template>

<script>
import ProfileButtonList from "@/components/profiles/ProfileButtonList";
import ProfileButton from "@/components/profiles/ProfileButton";

export default {
  name: "ProfileManager",
  components: {ProfileButton, ProfileButtonList},
  props: {
    activeProfile: String,
    profileList: Array,
  },

  data() {
    return {
      selectedProfile: '',
    }
  },

  methods: {
    isActiveProfile(label) {
      return label === this.activeProfile;
    },

    isSelectedProfile(label) {
      return label === this.selectedProfile;
    },

    handleButtonPress(label) {
      this.selectedProfile = label;
    },

    handleDoubleClick(label) {
      this.$emit("load-profile", label);
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

.actionButton:first-child {
  margin-left: 0;
}

.actionButton:last-child {
  margin-right: 0px;
}

.actionButton:hover {
  background-color: #49514e;
}
</style>