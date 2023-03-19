<template>
  <CenteredContainer>
    <GroupContainer :title="'System'">
      <div class="buttons">
        <div><MicSetupButton /></div>
        <div><SettingsButton /></div>
        <div><AboutButton /></div>
        <div><LicenseButton /></div>
        <div><HelpButton /></div>
      </div>
    </GroupContainer>
  </CenteredContainer>
</template>

<script>
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import LicenseButton from "@/components/sections/system/modals/LicenseButton.vue";
import AboutButton from "@/components/sections/system/modals/AboutButton.vue";
import SettingsButton from "@/components/sections/system/modals/SettingsButton.vue";
import HelpButton from "@/components/sections/system/HelpButton.vue";

export default {
  name: "SystemComponent",
  components: {
    HelpButton,
    SettingsButton,
    AboutButton,
    LicenseButton,
    GroupContainer,
    CenteredContainer,
    MicSetupButton
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
