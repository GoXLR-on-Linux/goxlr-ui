<template>
  <BigButton id="about_button" ref="button" :title="$t('message.system.aboutButton')"
             @button-clicked="$refs.aboutModal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-circle-info"/>
  </BigButton>
  <AccessibleModal ref="aboutModal" id="about_modal" :show_footer=false>
    <template v-slot:title>{{ $t('message.system.aboutButton') }}</template>
    <div style="text-align: left">
      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">{{ $t('message.system.about.serial') }}</div>
        <div>{{ getSerial() }}</div>
      </div>

      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">{{ $t('message.system.about.utilityVersion') }}</div>
        <div>{{ getUtilityVersion() }}</div>
      </div>

      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">{{ $t('message.system.about.driverVersion') }}</div>
        <div>{{ getDriverVersion() }}</div>
      </div>

      <div>
        <div style="font-size: 16px; font-weight: bold">{{ $t('message.system.about.hardwareVersion') }}</div>
        <div>
          <span
              style="display: inline-block; width: 80px; font-weight: bold">{{
              $t('message.system.about.firmware')
            }}: </span>
          <span>{{ getFirmwareVersion() }}</span>
        </div>
        <div>
          <span
              style="display: inline-block; width: 80px; font-weight: bold">{{ $t('message.system.about.dice') }}: </span>
          <span>{{ getDice() }}</span>
        </div>
        <div>
          <span
              style="display: inline-block; width: 80px; font-weight: bold">{{ $t('message.system.about.fpga') }}:</span>
          <span>{{ getFPGACount() }}</span>
        </div>
      </div>
    </div>
  </AccessibleModal>
</template>

<script>
import BigButton from "@/components/buttons/BigButton.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import {store} from "@/store";

export default {
  name: "AboutButton",
  components: {AccessibleModal, BigButton},

  data() {
    return {
      showModal: false,
      aboutTitle: "About"
    }
  },

  methods: {
    getSerial() {
      return store.getActiveSerial();
    },

    getUtilityVersion() {
      return store.getVersion();
    },

    getDriverVersion() {
      let version = this.buildVersionString(store.getConfig().driver_interface.version);
      let int = store.getConfig().driver_interface.interface;

      let output = "";
      if (int === "TUSB") {
        output += "TC-Helicon Driver (";
      } else {
        output += "libUSB (";
      }

      output += version;
      output += ")";

      return output;
    },

    getFirmwareVersion() {
      return this.buildVersionString(store.getActiveDevice().hardware.versions.firmware);
    },

    getDice() {
      return this.buildVersionString(store.getActiveDevice().hardware.versions.dice);
    },

    getFPGACount() {
      return store.getActiveDevice().hardware.versions.fpga_count;
    },

    buildVersionString(version) {
      let output = "";
      for (let i =0; i < version.length; i++) {
        if (version[i] == null) {
          return output;
        }
        if (output !== "") {
          output = output + "."
        }
        output = output + version[i];
      }
      return output;
    },
  }
}
</script>

<style scoped>

</style>
