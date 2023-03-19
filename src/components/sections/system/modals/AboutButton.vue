<template>
  <BigButton id="about_button" ref="button" :title="aboutTitle" @button-clicked="$refs.aboutModal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-circle-info" />
  </BigButton>
  <AccessibleModal ref="aboutModal" id="about_modal" :show_footer=false>
    <template v-slot:title>About GoXLR</template>
    <div style="text-align: left">
      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">Serial</div>
        <div>{{ getSerial() }}</div>
      </div>

      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">Utility Version</div>
        <div>{{ getUtilityVersion() }}</div>
      </div>

      <div>
        <div style="font-size: 16px; font-weight: bold">Hardware Version</div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">Firmware: </span>
          <span>{{ getFirmwareVersion() }}</span>
        </div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">Dice: </span>
          <span>{{ getDice() }}</span>
        </div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">FPGA: </span>
          <span>{{ getFPGACount() }}</span>
        </div>
      </div>
    </div>
  </AccessibleModal>
</template>

<script>
import BigButton from "@/components/big_buttons/BigButton.vue";
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

    getFirmwareVersion() {
      let version = store.getActiveDevice().hardware.versions.firmware;
      return version[0] + "." + version[1] + "." + version[2] + "." + version[3];
    },

    getDice() {
      let version = store.getActiveDevice().hardware.versions.dice;
      return version[0] + "." + version[1] + "." + version[2] + "." + version[3];
    },

    getFPGACount() {
      return store.getActiveDevice().hardware.versions.fpga_count;
    },
  }
}
</script>

<style scoped>

</style>