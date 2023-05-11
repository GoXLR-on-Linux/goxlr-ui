<template>
  <BigButton id="settings_button" ref="button" title="Settings"
    @button-clicked="$refs.modal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-gear" />
  </BigButton>
  <AccessibleModal width="630px" ref="modal" id="about_modal" :show_footer=false>
    <template v-slot:title>Settings (Work in Progress)</template>
    <div style="text-align: left" role=" region" aria-label="settings">
      <div style="padding: 12px">
        <span style="display: inline-block; width: 300px">Mute Button Hold to Mute All Duration: </span>
        <SimpleNumberInput :min-value="0" :max-value="5000" @value-updated="updateHold" :current-text-value="getHold()"
          aria-label="Mute Button Hold to Mute All Duration"
          aria-description="The duration in milliseconds that the mute button must be held to mute all channels" />
      </div>
      <div v-if="!isDeviceMini()" style="padding: 12px">
        <span style="display: inline-block; width: 300px">Sampler Pre-Record Buffer (Requires Restart): </span>
        <SimpleNumberInput :min-value="0" :max-value="30000" @value-updated="updateSamplerPreRecord"
          :current-text-value="getSamplerPreRecord()" aria-label="Sampler Pre-Record Buffer"
          aria-description="The duration in milliseconds that the sampler will record before the button is pressed" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Allow UI Network Access (Required Restart):</span>
        <input type="checkbox" :checked="get_allow_network_access()" @change="set_allow_network_access"
          aria-label="Allow UI Network Access (Required Restart)"
          aria-description="Allow the UI to be accessed from other devices on the network" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Voice Chat Mute All Also Mutes Mic To Chat Mic:</span>
        <input type="checkbox" :checked="get_vcmaammtcm()" @change="set_vcmaammtcm"
          aria-label="Voice Chat Mute All Also Mutes Mic To Chat Mic"
          aria-description="When muting all channels, also mute the mic to chat mic" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Autostart on Login:</span>
        <input type="checkbox" :checked="isAutostart()" @change="setAutoStart" aria-label="Autostart on Login"
          aria-description="Start the GoXLR Utility when the user logs in" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Show Tray Icon (requires restart):</span>
        <input type="checkbox" :checked="isShowIcon()" @change="setShowIcon"
          aria-label="Show Tray Icon (requires restart)"
          aria-description="Show the GoXLR Utility icon in the system tray" />
      </div>
      <div v-if="isTTSAvailable()" style="padding: 12px">
        <span style="display: inline-block; width: 360px">TTS on button press:</span>
        <input type="checkbox" :checked="isTTSEnabled()" @change="setTTSEnabled" aria-label="TTS on button press"
          aria-description="Speak the button status when pressed, either via screen reader or system TTS" />
      </div>
      <div style="padding: 12px" role="group" aria-label="recover defaults">
        Recover Defaults:<br />
        <button style="margin: 3px" @click="recover_defaults('Profiles')">Profiles</button>
        <button style="margin: 3px" @click="recover_defaults('MicProfiles')">Mic Profiles</button>
        <button style="margin: 3px" @click="recover_defaults('Icons')">Icons</button>
        <button style="margin: 3px" @click="recover_defaults('Presets')">Presets</button>
      </div>
      <div style="padding: 12px">
        <button style="background-color: darkred; color: white" @click="shutdown_util()">Shutdown GoXLR Utility</button>
      </div>
    </div>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import SimpleNumberInput from "@/components/design/SimpleNumberInput.vue";
import { store } from "@/store";
import { websocket } from "@/util/sockets";
import { isDeviceMini } from "@/util/util";

export default {
  name: "SettingsButton",
  components: { SimpleNumberInput, BigButton, AccessibleModal },

  methods: {
    isDeviceMini,
    getHold() {
      return store.getActiveDevice().settings.mute_hold_duration;
    },

    updateHold(value) {
      websocket.send_command(store.getActiveSerial(), { "SetMuteHoldDuration": value });
    },

    getSamplerPreRecord() {
      return store.getActiveDevice().sampler.record_buffer;
    },

    updateSamplerPreRecord(millis) {
      websocket.send_command(store.getActiveSerial(), { "SetSamplerPreBufferDuration": millis })
    },

    get_allow_network_access() {
      // I hate this name :D
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.isAllowNetworkAccess();
    },

    set_allow_network_access(event) {
      websocket.set_allow_network_access(event.target.checked);
    },

    get_vcmaammtcm() {
      // I hate this name :D
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().settings.vc_mute_also_mute_cm;
    },

    set_vcmaammtcm(event) {
      websocket.send_command(store.getActiveSerial(), { "SetVCMuteAlsoMuteCM": event.target.checked })
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

    isTTSAvailable() {
      return store.isTTSAvailable();
    },

    isTTSEnabled() {
      return store.isTTSEnabled();
    },

    setTTSEnabled(event) {
      websocket.set_tts_enabled(event.target.checked);
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

<style scoped></style>