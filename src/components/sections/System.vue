<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showModal = true">
      <MicIcon />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <HelpIcon />
      </BigButton>
    </a>

  </ContentBox>

  <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:title>MIC SETUP</template>
      <SetupModel />
  </Modal>
</template>


<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import MicIcon from "@/components/icons/MicIcon";
import HelpIcon from "@/components/icons/HelpIcon";
import Modal from "@/components/util/Modal";
import SetupModel from "@/components/sections/mic/SetupModel";
export default {
  name: "SystemComponent",
  components: {SetupModel, HelpIcon, BigButton, ContentBox, MicIcon, Modal},

  data() {
    return {
      showModal: false,
      setupTitle: "Mic Setup"
    }
  },
}
</script>

<style scoped>

</style>