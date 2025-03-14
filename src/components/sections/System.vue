<template>
  <CenteredContainer>
    <GroupContainer :title="$t('message.system.title')">
      <div class="buttons">
        <div><MicSetupButton /></div>
        <div v-if="store.getDeviceCount() > 1"><SwitchDeviceButton /></div>
        <div><FirmwareUpdateButton /></div>
        <div><ShutdownButton /></div>
        <div><DeviceSettingsButton /></div>
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
import ShutdownButton from "@/components/sections/system/modals/PowerButton.vue";
import DeviceSettingsButton from "@/components/sections/system/modals/DeviceSettingsButton.vue";
import SwitchDeviceButton from "@/components/sections/system/modals/SwitchDeviceButton.vue";
import {store} from "@/store";
import FirmwareUpdateButton from "@/components/sections/system/modals/FirmwareUpdateButton.vue";

export default {
  name: "SystemComponent",
  computed: {
    store() {
      return store
    }
  },
  components: {
    FirmwareUpdateButton,
    SwitchDeviceButton,
    DeviceSettingsButton,
    ShutdownButton,
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
