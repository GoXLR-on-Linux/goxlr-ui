<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showModal = true">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <BigButton title="About" @button-clicked="showVersionModal = true">
      <font-awesome-icon icon="fa-solid fa-circle-question" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <font-awesome-icon icon="fa-solid fa-circle-question" />
      </BigButton>
    </a>

  </ContentBox>

  <ModalBox v-if="showMicModal" @close="showModal = false">
      <template v-slot:title>MIC SETUP</template>
      <SetupModel />
  </ModalBox>

  <ModalBox v-if="showVersionModal" @close="showVersionModal = false">
    <template v-slot:title>About GoXLR</template>
    <div style="text-align: left">
      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">Serial</div>
        <div>{{getSerial()}}</div>
      </div>

      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">Utility Version</div>
        <div>{{getUtilityVersion()}}</div>
      </div>

      <div>
        <div style="font-size: 16px; font-weight: bold">Hardware Version</div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">Firmware: </span>
          <span>{{getFirmwareVersion()}}</span>
        </div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">Dice: </span>
          <span>{{getDice()}}</span>
        </div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">FPGA: </span>
          <span>{{getFPGACount()}}</span>
        </div>
      </div>
    </div>
    <template v-slot:footer>&nbsp;</template>
  </ModalBox>
</template>


<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalBox from "@/components/design/modal/ModalBox";
import {store} from "@/store";
export default {
  name: "SystemComponent",
  components: {ModalBox, SetupModel, BigButton, ContentBox, FontAwesomeIcon},

  data() {
    return {
      showMicModal: false,
      showVersionModal: false,
      setupTitle: "Mic Setup"
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