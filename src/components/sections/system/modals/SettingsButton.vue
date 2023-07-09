<template>
  <BigButton
      id="settings_button"
      ref="button"
      title="Utility Settings"
      @button-clicked="$refs.modal.openModal(undefined, $refs.button)"
  >
    <font-awesome-icon icon="fa-solid fa-gear"/>
  </BigButton>
  <AccessibleModal
      width="630px"
      ref="modal"
      id="about_modal"
      :show_footer="false"
  >
    <template v-slot:title>Settings (Work in Progress)</template>
    <div style="text-align: left" role="region" aria-label="settings">
      <div style="padding: 12px">
        Log Level (Requires Restart):
        <select @change="setLogLevel" style="margin-right: 15px">
          <option :selected="getLogLevel() === 'Off'" value="Off">Off</option>
          <option :selected="getLogLevel() === 'Error'" value="Error">Error</option>
          <option :selected="getLogLevel() === 'Warn'" value="Warn">Warn</option>
          <option :selected="getLogLevel() === 'Info'" value="Info">Info</option>
          <option :selected="getLogLevel() === 'Debug'" value="Debug">Debug</option>
          <option :selected="getLogLevel() === 'Trace'" value="Trace">Trace</option>
        </select>
        <button class="openButton" @click="openLogs">
          <font-awesome-icon icon="fa-solid fa-folder"/>
        </button>
      </div>

      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px"
        >Allow UI Network Access (Required Restart):</span
        >
        <input
            type="checkbox"
            :checked="get_allow_network_access()"
            @change="set_allow_network_access"
            aria-label="Allow UI Network Access (Required Restart)"
            aria-description="Allow the UI to be accessed from other devices on the network"
        />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px"
        >Autostart on Login:</span
        >
        <input
            type="checkbox"
            :checked="isAutostart()"
            @change="setAutoStart"
            aria-label="Autostart on Login"
            aria-description="Start the GoXLR Utility when the user logs in"
        />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px"
        >Show Tray Icon (requires restart):</span
        >
        <input
            type="checkbox"
            :checked="isShowIcon()"
            @change="setShowIcon"
            aria-label="Show Tray Icon (requires restart)"
            aria-description="Show the GoXLR Utility icon in the system tray"
        />
      </div>
      <div v-if="isTTSAvailable()" style="padding: 12px">
        <span style="display: inline-block; width: 360px"
        >TTS on button press:</span
        >
        <input
            type="checkbox"
            :checked="isTTSEnabled()"
            @change="setTTSEnabled"
            aria-label="TTS on button press"
            aria-description="Speak the button status when pressed, either via screen reader or system TTS"
        />
      </div>
      <div style="padding: 12px" role="group" aria-label="recover defaults">
        Recover Defaults:<br/>
        <button style="margin: 3px" @click="recover_defaults('Profiles')">
          Profiles
        </button>
        <button style="margin: 3px" @click="recover_defaults('MicProfiles')">
          Mic Profiles
        </button>
        <button style="margin: 3px" @click="recover_defaults('Icons')">
          Icons
        </button>
        <button style="margin: 3px" @click="recover_defaults('Presets')">
          Presets
        </button>
      </div>
      <div style="padding: 12px">
        <button
            style="background-color: darkred; color: white"
            @click="shutdown_util()"
        >
          Shutdown GoXLR Utility
        </button>
      </div>
    </div>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "SettingsButton",
  components: {BigButton, AccessibleModal},

  methods: {
    getLogLevel() {
      return store.getConfig().log_level;
    },

    setLogLevel(event) {
      websocket.send_daemon_command({"SetLogLevel": event.target.value});
    },

    openLogs() {
      websocket.open_path("Logs");
    },

    get_allow_network_access() {
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getConfig().allow_network_access;
    },

    set_allow_network_access(event) {
      websocket.send_daemon_command({"SetAllowNetworkAccess": event.target.checked});
    },

    isAutostart() {
      return store.getConfig().autostart_enabled;
    },

    setAutoStart(event) {
      websocket.send_daemon_command({"SetAutoStartEnabled": event.target.checked});
    },

    isShowIcon() {
      return store.getConfig().show_tray_icon;
    },

    setShowIcon(event) {
      websocket.send_daemon_command({"SetShowTrayIcon": event.target.checked});
    },

    isTTSAvailable() {
      return store.getConfig().tts_enabled !== null;
    },

    isTTSEnabled() {
      return store.getConfig().tts_enabled;
    },

    setTTSEnabled(event) {
      websocket.send_daemon_command({"SetTTSEnabled": event.target.checked});
    },

    recover_defaults(type) {
      websocket.send_daemon_command({"RecoverDefaults": type});
    },

    shutdown_util() {
      websocket.send_daemon_command("StopDaemon");
    },
  },
};
</script>

<style scoped>
button.openButton {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin: -4px;
}

.openButton {
  display: inline-block;
  color: #a5a7a6;
  font-size: 14px
}

.openButton:hover {
  color: #fff;
  cursor: pointer;
}
</style>
