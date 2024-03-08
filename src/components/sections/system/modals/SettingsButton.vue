<template>
  <BigButton
      v-if="store.getConfig() !== undefined"
      id="settings_button"
      ref="button"
      :title="$t('message.system.settingsButton')"
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
    <template v-slot:title>{{ $t('message.system.settingsButton') }}</template>
    <div style="text-align: left" role="region" aria-label="settings">
      <div style="padding: 12px">
        {{$t('message.system.settings.uiHandler')}}:
        <select @change="setUiHandler" style="margin-right: 15px">
          <option :selected="getActivePath() === null" value="">{{ $t('message.system.settings.uiHandlers.browser') }}</option>
          <option v-if="getAppPath() !== null" :selected="isActivePath()" :value="getAppPath()">{{ $t('message.system.settings.uiHandlers.app') }}</option>
          <option v-if="isCustomPath()" :selected="getActivePath() !== null && !isActivePath()" :value="getActivePath()">{{
              $t('message.system.settings.uiHandlers.custom')
            }}</option>
        </select>
      </div>

      <div style="padding: 12px">
        {{$t('message.system.settings.logLevel')}}:
        <select @change="setLogLevel" style="margin-right: 15px">
          <option :selected="getLogLevel() === 'Off'" value="Off">{{$t('message.system.settings.logLevels.off')}}</option>
          <option :selected="getLogLevel() === 'Error'" value="Error">{{$t('message.system.settings.logLevels.error')}}</option>
          <option :selected="getLogLevel() === 'Warn'" value="Warn">{{$t('message.system.settings.logLevels.warn')}}</option>
          <option :selected="getLogLevel() === 'Info'" value="Info">{{$t('message.system.settings.logLevels.info')}}</option>
          <option :selected="getLogLevel() === 'Debug'" value="Debug">{{$t('message.system.settings.logLevels.debug')}}</option>
          <option :selected="getLogLevel() === 'Trace'" value="Trace">{{$t('message.system.settings.logLevels.trace')}}</option>
        </select>
        <button class="openButton" @click="openLogs">
          <font-awesome-icon icon="fa-solid fa-folder"/>
        </button>
      </div>

      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">{{$t('message.system.settings.allowNetworkAccess')}}:</span>
        <input
            type="checkbox"
            :checked="get_allow_network_access()"
            @change="set_allow_network_access"
            :aria-label="$t('message.system.settings.allowNetworkAccess')"
            aria-description="$t('message.system.settings.allowNetworkAccessAccessibility')"
        />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">{{$t('message.system.settings.autoStart')}}:</span>
        <input
            type="checkbox"
            :checked="isAutostart()"
            @change="setAutoStart"
            :aria-label="$t('message.system.settings.autoStart')"
            :aria-description="$t('message.system.settings.autoStartAccessibility')"
        />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">{{ $t('message.system.settings.showOnLaunch') }}</span>
        <input
            type="checkbox"
            :checked="isShowUi()"
            @change="setShowUi"
            :aria-label="$t('message.system.settings.showOnLaunch')"
            aria-description="$t('message.system.settings.showOnLaunchAccessibility')"
        />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">{{ $t('message.system.settings.showTray') }}:</span>
        <input
            type="checkbox"
            :checked="isShowIcon()"
            @change="setShowIcon"
            :aria-label="$t('message.system.settings.showTray')"
            :aria-description="$t('message.system.settings.showTrayAccessibility')"
        />
      </div>
      <div v-if="isTTSAvailable()" style="padding: 12px">
        <span style="display: inline-block; width: 360px">{{ $t('message.system.settings.ttsOnButton') }}:</span>
        <input
            type="checkbox"
            :checked="isTTSEnabled()"
            @change="setTTSEnabled"
            :aria-label="$t('message.system.settings.ttsOnButton')"
            :aria-description="$t('message.system.settings.ttsOnButtonAccessibility')"
        />
      </div>
      <div style="padding: 12px" role="group" aria-label="recover defaults">
        {{ $t('message.system.settings.recoverDefaults') }}:<br/>
        <button style="margin: 3px" @click="recover_defaults('Profiles')">
          {{ $t('message.system.settings.recoverOptions.profiles') }}
        </button>
        <button style="margin: 3px" @click="recover_defaults('MicProfiles')">
          {{ $t('message.system.settings.recoverOptions.micProfiles') }}
        </button>
        <button style="margin: 3px" @click="recover_defaults('Icons')">
          {{ $t('message.system.settings.recoverOptions.icons') }}
        </button>
        <button style="margin: 3px" @click="recover_defaults('Presets')">
          {{ $t('message.system.settings.recoverOptions.presets') }}
        </button>
      </div>
      <div style="padding: 12px">
        <button
            style="background-color: darkred; color: white"
            @click="shutdown_util()"
        >
          {{ $t('message.system.settings.shutdownUtility') }}
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
  computed: {
    store() {
      return store
    }
  },
  components: {BigButton, AccessibleModal},

  methods: {
    getActivePath() {
      if (store.getConfig() === undefined) {
        return null;
      }
      return store.getConfig().activation.active_path;
    },
    getAppPath() {
      if (store.getConfig() === undefined) {
        return "";
      }
      return store.getConfig().activation.app_path;
    },
    isCustomPath() {
      if (store.getConfig() === undefined) {
        return false;
      }
      let active_path = store.getConfig().activation.active_path;
      return (active_path !== null && !this.isActivePath());
    },
    isActivePath() {
      if (store.getConfig() === undefined || this.getActivePath() === null) {
        return false;
      }
      // Thanks to Windows Case-Insensitive paths :D
      return this.getActivePath().localeCompare(this.getAppPath(), undefined, { sensitivity: 'base' }) === 0;
    },
    setUiHandler(e) {
      let path = e.target.value;
      if (path === "") {
        path = null;
      }
      websocket.send_daemon_command({"SetActivatorPath": path});
    },

    getLogLevel() {
      if (store.getConfig() === undefined) {
        return "Debug";
      }
      return store.getConfig().log_level;
    },

    setLogLevel(event) {
      websocket.send_daemon_command({"SetLogLevel": event.target.value});
    },

    openLogs() {
      websocket.open_path("Logs");
    },

    get_allow_network_access() {
      if (store.getConfig() === undefined) {
        return false;
      }
      return store.getConfig().allow_network_access;
    },

    set_allow_network_access(event) {
      websocket.send_daemon_command({"SetAllowNetworkAccess": event.target.checked});
    },

    isAutostart() {
      if (store.getConfig() === undefined) {
        return false;
      }

      return store.getConfig().autostart_enabled;
    },

    setAutoStart(event) {
      websocket.send_daemon_command({"SetAutoStartEnabled": event.target.checked});
    },

    isShowUi() {
      if (store.getConfig() === undefined) {
        return false;
      }

      return store.getConfig().open_ui_on_launch;
    },

    setShowUi(event) {
       websocket.send_daemon_command({"SetUiLaunchOnLoad": event.target.checked});
    },

    isShowIcon() {
      if (store.getConfig() === undefined) {
        return true;
      }

      return store.getConfig().show_tray_icon;
    },

    setShowIcon(event) {
      websocket.send_daemon_command({"SetShowTrayIcon": event.target.checked});
    },

    isTTSAvailable() {
      if (store.getConfig() === undefined) {
        return false;
      }

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
