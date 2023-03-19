<template>
  <CenteredContainer>
    <GroupContainer :title="'System'">
      <div class="buttons">
        <div><MicSetupButton /></div>
        <div><SettingsButton /></div>
        <div><AboutButton /></div>
        <div><LicenseButton /></div>

      </div>

      <MicSetupButton/>
      <div style="margin-right: 30px"></div>
      <BigButton id="settings" title="Settings" @button-clicked="showSettingsModal = true">
        <font-awesome-icon icon="fa-solid fa-gear"/>
      </BigButton>
      <div style="margin-right: 30px"></div>
      <AboutButton/>
      <div style="margin-right: 30px"></div>
      <LicenseButton/>
      <div style="margin-right: 30px"></div>
      <a :href="'https://discord.gg/Wbp3UxkX2j'">
        <BigButton id="help" :title="'Help'">
          <font-awesome-icon icon="fa-solid fa-circle-question"/>
        </BigButton>
      </a>
    </GroupContainer>
  </CenteredContainer>
</template>

<script>
import BigButton from "@/components/big_buttons/BigButton";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import LicenseButton from "@/components/sections/system/modals/LicenseButton.vue";
import AboutButton from "@/components/sections/system/modals/AboutButton.vue";
import SettingsButton from "@/components/sections/system/modals/SettingsButton.vue";

export default {
  name: "SystemComponent",
  components: {
    SettingsButton,
    AboutButton,
    LicenseButton,
    GroupContainer,
    CenteredContainer,
    MicSetupButton, BigButton, FontAwesomeIcon
  },
}
</script>

<style scoped>
.buttons {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>
