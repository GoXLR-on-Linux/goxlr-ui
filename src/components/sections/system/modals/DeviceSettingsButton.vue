<template>
  <BigButton
      id="device_settings_button"
      ref="device_button"
      title="Device Settings"
      @button-clicked="$refs.modal.openModal(undefined, $refs.device_button)"
  >
    <font-awesome-icon icon="fa-solid fa-headphones"/>
  </BigButton>

  <AccessibleModal
      width="630px"
      ref="modal"
      id="about_modal"
      :show_footer="false"
  >
    <template v-slot:title>Device Settings (Work in Progress)</template>
    <div style="text-align: left" role="region" aria-label="Device Settings">
      <div style="padding: 12px">
        <span style="display: inline-block; width: 300px"
        >Mute Button Hold to Mute All Duration:
        </span>
        <SimpleNumberInput
            :min-value="0"
            :max-value="5000"
            @value-updated="updateHold"
            :current-text-value="getHold()"
            aria-label="Mute Button Hold to Mute All Duration"
            aria-description="The duration in milliseconds that the mute button must be held to mute all channels"
        />
      </div>
      <div v-if="!isDeviceMini()" style="padding: 12px">
        <span style="display: inline-block; width: 300px"
        >Sampler Pre-Record Buffer (in seconds):
        </span>
        <SimpleNumberInput
            :min-value="0"
            :max-value="30000"
            :current-text-value="getSamplerPreRecord()"
            aria-label="Sampler Pre-Record Buffer (in seconds)"
            aria-description="The duration in seconds that the sampler will record before the button is pressed"
            @on-blur="updateSamplerPreRecord"
        />
        <!--            @value-updated="updateSamplerPreRecord"-->

      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px"
        >Voice Chat Mute All Also Mutes Mic To Chat Mic:</span
        >
        <input
            type="checkbox"
            :checked="get_vcmaammtcm()"
            @change="set_vcmaammtcm"
            aria-label="Voice Chat Mute All Also Mutes Mic To Chat Mic"
            aria-description="When muting all channels, also mute the mic to chat mic"
        />
      </div>
      <div style="padding: 12px" v-if="!isDeviceMini()">
        <span style="display: inline-block; width: 360px"
        >Enable Mic Monitoring when FX is enabled:</span
        >
        <input
            type="checkbox"
            :checked="get_mic_monitor_with_fx()"
            @change="set_mic_monitor_with_fx"
            aria-label="Enable Mic Monitoring when FX is enabled"
            aria-description="Activates Mic Monitoring when FX is enabled"
        />
      </div>
      <div style="padding: 12px" v-if="!isDeviceMini()">
        <span style="display: inline-block; width: 360px"
        >Lock Fader Positions when Muting to All:</span>
        <input
            type="checkbox"
            :checked="get_locked_faders()"
            @change="set_locked_faders"
            aria-label="Lock Fader Positions when Muting to All"
            aria-description="Prevents the faders from moving down when Mute to All is active"
        />
      </div>
    </div>
  </AccessibleModal>

</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import SimpleNumberInput from "@/components/design/SimpleNumberInput.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import BigButton from "@/components/buttons/BigButton.vue";
import {isDeviceMini} from "@/util/util";

export default {
  name: "DeviceSettingsButton",
  components: {BigButton, SimpleNumberInput, AccessibleModal},

  methods: {
    isDeviceMini,
    getHold() {
      return store.getActiveDevice().settings.mute_hold_duration;
    },

    updateHold(value) {
      websocket.send_command(store.getActiveSerial(), {SetMuteHoldDuration: value});
    },

    getSamplerPreRecord() {
      return Math.ceil(store.getActiveDevice().sampler.record_buffer / 1000);
    },

    updateSamplerPreRecord(seconds) {
      websocket.send_command(store.getActiveSerial(), {"SetSamplerPreBufferDuration": seconds * 1000});
    },

    get_vcmaammtcm() {
      // I hate this name :D
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().settings.vc_mute_also_mute_cm;
    },

    set_vcmaammtcm(event) {
      websocket.send_command(store.getActiveSerial(), {"SetVCMuteAlsoMuteCM": event.target.checked});
    },

    get_mic_monitor_with_fx() {
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().settings.enable_monitor_with_fx;
    },

    set_mic_monitor_with_fx(event) {
      websocket.send_command(store.getActiveSerial(), {"SetMonitorWithFx": event.target.checked});
    },

    get_locked_faders() {
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().settings.lock_faders;
    },

    set_locked_faders(event) {
      websocket.send_command(store.getActiveSerial(), {"SetLockFaders": event.target.checked});
    }
  }
}
</script>

<style scoped>

</style>
