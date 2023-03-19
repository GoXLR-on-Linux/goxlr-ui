<template>
  <CenteredContainer>
    <GroupContainer :title="'System'">
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

  <ModalBox width="680px" v-if="showSettingsModal" @close="showSettingsModal = false">
    <template v-slot:title>Device Settings (Work In Progress)</template>
    <div style="text-align: left">
      <div style="padding: 12px">
        <span style="display: inline-block; width: 300px">Mute Button Hold to Mute All Duration: </span>
        <SimpleNumberInput :min-value="0" :max-value="5000" @value-updated="updateHold"
                           :current-text-value="getHold()"/>
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Voice Chat Mute All Also Mutes Mic To Chat Mic:</span>
        <input type="checkbox" :checked="get_vcmaammtcm()" @change="set_vcmaammtcm"/>
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Autostart on Login:</span>
        <input type="checkbox" :checked="isAutostart()" @change="setAutoStart"/>
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Show Tray Icon (requires restart):</span>
        <input type="checkbox" :checked="isShowIcon()" @change="setShowIcon"/>
      </div>
      <div style="padding: 12px">
        Recover Defaults:<br/>
        <button style="margin: 3px" @click="recover_defaults('Profiles')">Profiles</button>
        <button style="margin: 3px" @click="recover_defaults('MicProfiles')">Mic Profiles</button>
        <button style="margin: 3px" @click="recover_defaults('Icons')">Icons</button>
        <button style="margin: 3px" @click="recover_defaults('Presets')">Presets</button>
      </div>
      <div style="padding: 12px">
        <button style="background-color: darkred; color: white" @click="shutdown_util()">Shutdown GoXLR Utility</button>
      </div>
    </div>
  </ModalBox>
</template>

<script>
import BigButton from "@/components/big_buttons/BigButton";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalBox from "@/components/design/modal/ModalBox";
import {store} from "@/store";
import SimpleNumberInput from "@/components/design/SimpleNumberInput";
import {websocket} from "@/util/sockets";
import MicSetupButton from "@/components/sections/system/modals/MicSetupButton.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import LicenseButton from "@/components/sections/system/modals/LicenseButton.vue";
import AboutButton from "@/components/sections/system/modals/AboutButton.vue";

export default {
  name: "SystemComponent",
  components: {
    AboutButton,
    LicenseButton,
    GroupContainer,
    CenteredContainer,
    MicSetupButton, SimpleNumberInput, ModalBox, BigButton, FontAwesomeIcon
  },

  data() {
    return {
      showVersionModal: false,
      showLicenseModal: false,
      showSettingsModal: false,
      setupTitle: "Mic Setup"
    }
  },

  methods: {

    getHold() {
      return store.getActiveDevice().settings.mute_hold_duration;
    },

    updateHold(value) {
      websocket.send_command(store.getActiveSerial(), {"SetMuteHoldDuration": value});
    },

    get_vcmaammtcm() {
      // I hate this name :D
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().settings.vc_mute_also_mute_cm;
    },

    set_vcmaammtcm(event) {
      console.log(event);
      websocket.send_command(store.getActiveSerial(), {"SetVCMuteAlsoMuteCM": event.target.checked})
    },

    isAutostart() {
      return store.isAutostartEnabled();
    },

    setAutoStart(event) {
      websocket.set_autostart(event.target.checked);
    },

    isShowIcon() {
      return store.isShowIcon();
    },

    setShowIcon(event) {
      websocket.set_show_icon(event.target.checked);
    },

    recover_defaults(type) {
      websocket.recover_defaults(type);
    },

    shutdown_util() {
      websocket.send_shutdown();
    }
  }
}
</script>

<style scoped>

</style>
