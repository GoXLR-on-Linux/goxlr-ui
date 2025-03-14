<template>
  <BigButton id="firmware_update_button" ref="firmware_update_button"
             :title="compareCurrentFirmwareToLatest() > 0 ? $t('message.system.firmwareUpdateButtonDowngrade') : $t('message.system.firmwareUpdateButton')"
              @button-clicked="$refs.firmware_update_modal.openModal(undefined, $refs.firmware_update_button)">
    <font-awesome-icon icon="fa-solid fa-download" />
  </BigButton>
  <AccessibleModal id="firmware_update_modal" ref="firmware_update_modal" width="560px" :show_footer=false>
    <template v-slot:title>
      {{compareCurrentFirmwareToLatest() > 0
        ? $t('message.system.firmwareUpdateButtonDowngrade')
        : $t('message.system.firmwareUpdateButton')}}
    </template>

    <!-- Step 1: Confirmation  -->
    <div v-if="!isFlashing">
      <p v-if="compareCurrentFirmwareToLatest() < 0">
        {{ $t('message.system.firmwareUpdate.newVersionAvailable', { latestVersion: getLatestFirmwareVersion() }) }}
        <br>
        {{ $t('message.system.firmwareUpdate.updateQuestion') }}
      </p>
      <p v-else-if="compareCurrentFirmwareToLatest() > 0">
        {{ $t('message.system.firmwareUpdate.currentVersionIsNewer', {currentVersion: getCurrentFirmwareVersion(), latestVersion: getLatestFirmwareVersion() }) }}
        <br>
        {{ $t('message.system.firmwareUpdate.downgradeQuestion') }}
      </p>
      <p v-else>
        {{ $t('message.system.firmwareUpdate.currentIsUpToDate', { latestVersion: getLatestFirmwareVersion() }) }}
      </p>

      <button @click="testFlash">Flash now!</button>
    </div>

    <!-- Step 2: Flashing  -->
    <div v-else>
      <p>Flashing firmware...</p>

      <button @click="RunFirmwareUpdate">RunFirmwareUpdate(serial, null, false)</button> <br>
      <button @click="ContinueFirmwareUpdate">ContinueFirmwareUpdate(serial)</button> <br>
      <button @click="ClearFirmwareState">ClearFirmwareState(serial)</button> <br>

    </div>
    <textarea type="text" :value="firmwareStatus"></textarea> <br>
  </AccessibleModal>
</template>

<script>
import {store} from "@/store";
import {driverPreVOD, firmwareSupportsMix2, isDeviceMini, versionNewerOrEqualTo} from "@/util/util";
import {websocket} from "@/util/sockets";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import GoXLR from "@/components/GoXLR.vue";

export default {
  name: "FirmwareUpdateButton",
  components: {BigButton, AccessibleModal},

  data() {
    return {
      setupTitle: "Update Firmware",
      isFlashing: false
    }
  },

  computed: {
    firmwareStatus: function() {
      if (store.status === undefined)
        return "{}";
      return JSON.stringify(store.status.firmware, null, 2);
    }
  },

  methods: {
    // checks if the current firmware is older (-1), equal (0) or newer (1) than the latest firmware
    compareCurrentFirmwareToLatest() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined)
        return 0;

      const latestVersion = isDeviceMini()
        ? store.getConfig().latest_firmware.Mini.version
        : store.getConfig().latest_firmware.Full.version;
      const currentVersion = store.getActiveDevice().hardware.versions.firmware;

      if (!versionNewerOrEqualTo(currentVersion, latestVersion))
        return -1; // current firmware is older

      return latestVersion.join('.') === currentVersion.join('.')
          ? 0 // current firmware is equal
          : 1; // current firmware is newer
    },

    getLatestFirmwareVersion() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined)
        return false;

      const latestVersion = isDeviceMini()
          ? store.getConfig().latest_firmware.Mini.version
          : store.getConfig().latest_firmware.Full.version;
      return latestVersion.join('.');
    },

    getCurrentFirmwareVersion() {
      if (store.getActiveDevice() === undefined)
        return false;

      return store.getActiveDevice().hardware.versions.firmware.join('.');
    },




    test(a) {
      // open modal
      if (store.getConfig() === undefined) return "{}\n{}";

      if (a===1)
        return JSON.stringify(store.getConfig(), null, 2)
      else if (a===2)
        return JSON.stringify(store.getActiveDevice(), null, 2)
      else if (a===3)
        return JSON.stringify(store.getConfig().firmware, null, 2)
      else
        return "Unknown";
    },

    testFlash() {
      this.isFlashing = true;
    },

    RunFirmwareUpdate() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined){
        console.log("Nope!")
        return 0;
      }

      this.$refs.firmware_update_modal.closeModal();

      console.log({"RunFirmwareUpdate": [store.getActiveDevice().hardware.serial_number, null, false]})
      websocket.run_firmware_update(store.getActiveDevice().hardware.serial_number, null, false);
    },

    ContinueFirmwareUpdate() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined){
        console.log("Nope!")
        return 0;
      }

      console.log({"ContinueFirmwareUpdate": store.getActiveDevice().hardware.serial_number})
      websocket.continue_firmware_update(store.getActiveDevice().hardware.serial_number);
    },

    ClearFirmwareState() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined){
        console.log("Nope!")
        return 0;
      }

      console.log({"ClearFirmwareState": store.getActiveDevice().hardware.serial_number})
      websocket.clear_firmware_state(store.getActiveDevice().hardware.serial_number);
    }
  }
}
</script>

<style scoped>

</style>