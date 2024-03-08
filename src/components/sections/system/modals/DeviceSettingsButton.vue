<template>
  <BigButton
      id="device_settings_button"
      ref="device_button"
      :title="$t('message.system.deviceButton')"
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
    <template v-slot:title>{{ $t('message.system.deviceButton') }}</template>
    <div style="text-align: left" role="region" :aria-label="$t('message.system.deviceButton')">
      <div style="padding: 12px">
        <span style="display: inline-block; width: 300px">{{ $t('message.system.device.holdDuration') }}:</span>
        <SimpleNumberInput
            :min-value="0"
            :max-value="5000"
            @value-updated="updateHold"
            :current-text-value="getHold()"
            :aria-label="$t('message.system.device.holdDuration')"
            :aria-description="$t('message.system.device.holdDurationAccessibility')"
        />
      </div>
      <div v-if="!isDeviceMini()" style="padding: 12px">
        <span style="display: inline-block; width: 300px">{{ $t('message.system.device.sampleBuffer') }}:</span>
        <SimpleNumberInput
            :min-value="0"
            :max-value="30000"
            :current-text-value="getSamplerPreRecord()"
            :aria-label="$t('message.system.device.sampleBuffer')"
            :aria-description="$t('message.system.device.sampleBufferAccessibility')"
            @on-blur="updateSamplerPreRecord"
        />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">{{ $t('message.system.device.voiceDeafen') }}:</span>
        <input
            type="checkbox"
            :checked="get_vcmaammtcm()"
            @change="set_vcmaammtcm"
            :aria-label="$t('message.system.device.voiceDeafen')"
            :aria-description="$t('message.system.device.voiceDeafenAccessibility')"
        />
      </div>
      <div style="padding: 12px" v-if="!isDeviceMini()">
        <span style="display: inline-block; width: 360px">{{ $t('message.system.device.monitorWithFx') }}:</span>
        <input
            type="checkbox"
            :checked="get_mic_monitor_with_fx()"
            @change="set_mic_monitor_with_fx"
            :aria-label="$t('message.system.device.monitorWithFx')"
            :aria-description="$t('message.system.device.monitorWithFxAccessibility')"
        />
      </div>
      <div style="padding: 12px" v-if="!isDeviceMini()">
        <span style="display: inline-block; width: 360px">{{ $t('message.system.device.lockFaders') }}:</span>
        <input
            type="checkbox"
            :checked="get_locked_faders()"
            @change="set_locked_faders"
            :aria-label="$t('message.system.device.lockFaders')"
            :aria-description="$t('message.system.device.lockFadersAccessibility')"
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
