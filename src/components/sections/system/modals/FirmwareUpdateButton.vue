<template>
  <BigButton id="firmware_update_button" ref="firmware_update_button"
             :title="compareCurrentFirmwareToLatest() > 0 ? $t('message.system.firmwareUpdateButtonDowngrade') : $t('message.system.firmwareUpdateButton')"
              @button-clicked="handleButtonClick"
  >
    <font-awesome-icon icon="fa-solid fa-download" />
  </BigButton>
  <AccessibleModal id="firmware_update_modal" ref="firmware_update_modal" width="560px" :show_footer=false>
    <template v-slot:title>
      {{compareCurrentFirmwareToLatest() > 0
        ? $t('message.system.firmwareUpdateButtonDowngrade')
        : $t('message.system.firmwareUpdateButton')}}
    </template>

    <p class="firmwareWarning">
      {{ $t('message.system.firmwareUpdate.warning') }}

      <a
          href="https://github.com/GoXLR-on-Linux/goxlr-utility/wiki/Firmware-Updating"
          target="_blank"
      >{{ $t('message.system.firmwareUpdate.warningInfo') }}</a>
    </p>


    <p v-if="customFirmware">
      {{ $t('message.system.firmwareUpdate.customFirmware') }}
    </p>
    <p v-else-if="compareCurrentFirmwareToLatest() < 0">
      {{ $t('message.system.firmwareUpdate.newVersionAvailable', { latestVersion: getLatestFirmwareVersion() }) }}
    </p>
    <p v-else-if="compareCurrentFirmwareToLatest() > 0">
      {{ $t('message.system.firmwareUpdate.currentVersionIsNewer', {currentVersion: getCurrentFirmwareVersion(), latestVersion: getLatestFirmwareVersion() }) }}
      <br>
      {{ $t('message.system.firmwareUpdate.downgradeQuestion') }}
    </p>
    <p v-else>
      {{ $t('message.system.firmwareUpdate.currentIsUpToDate', { latestVersion: getLatestFirmwareVersion() }) }}
    </p>

    <div class="modalButtonBox">
      <button @click="startFirmwareUpdate">{{$t('message.modalButtons.continue')}}</button>
      <button class="cancel" @click="$refs.firmware_update_modal.closeModal()">{{$t('message.modalButtons.cancel')}}</button>
    </div>
  </AccessibleModal>
</template>

<script>
import {store} from "@/store";
import {isDeviceMini, versionNewerOrEqualTo} from "@/util/util";
import {uploadFirmwareBlob, websocket} from "@/util/sockets";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";

export default {
  name: "FirmwareUpdateButton",
  components: {BigButton, AccessibleModal},

  data() {
    return {
      setupTitle: "Update Firmware",
      customFirmware: true,
    }
  },

  methods: {
    handleButtonClick(e) {
      this.customFirmware = e.shiftKey && e.ctrlKey;
      this.$refs.firmware_update_modal.openModal(undefined, this.$refs.firmware_update_button)
    },

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

    startFirmwareUpdate() {
      if (store.getConfig() === undefined || store.getActiveDevice() === undefined)
        return false;

      if (this.customFirmware) {
        // custom firmware upload
        this.selectFirmwareFile()
            .then(result => {
              this.$refs.firmware_update_modal.closeModal();
              uploadFirmwareBlob(result, store.getActiveDevice().hardware.serial_number);
            })
            .catch(() => this.$refs.firmware_update_modal.closeModal());
      }
      else
      {
        // normal firmware update
        this.$refs.firmware_update_modal.closeModal();
        websocket.run_firmware_update(store.getActiveDevice().hardware.serial_number, null, true);
      }
    },

    selectFirmwareFile() {
      return new Promise((resolve, reject) => {
        const filePickerDialog = document.createElement('input');
        filePickerDialog.type = 'file';
        filePickerDialog.accept = '.bin';
        filePickerDialog.oncancel = () => reject("Operation cancelled by user");
        filePickerDialog.onchange = () => {
          // read the file as an ArrayBuffer
          const reader = new FileReader();
          reader.onloadend = event =>
              resolve(new Blob([event.target.result], { type: "application/octet-stream" }));
          reader.readAsArrayBuffer(filePickerDialog.files[0])
        }
        filePickerDialog.click();
      });
    },
  }
}
</script>

<style scoped>
.modalButtonBox {
  display: flex;
  flex-direction: row;
  justify-content: right;
  gap: 5px;

  button {
    padding: 5px;
    color: #ccc;
    border: 1px solid #CCCCCC;
    background-color: transparent;
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
      color: #fff;
      border-color: #fff;
    }

    &.cancel {
      border-color: #c00;

      &:hover {
        border-color: #ff0000;
      }
    }
  }
}

.firmwareWarning {
  padding: 10px;
  border-left: 5px solid rgba(204, 0, 0, 0.5);
  background: rgba(204, 0, 0, 0.1);

  a {
    color: #fff;

    &:hover {
      color: #59b1b6;
    }
  }
}

p {
  white-space: pre-line;
}
</style>