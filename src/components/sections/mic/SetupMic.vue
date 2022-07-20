<template>
  <ContentBox>
    <BigButton :title="setupTitle" @button-clicked="showModal = true">
      <MicIcon class="center" :view-box="'0 0 47.964 47.965'"/>
    </BigButton>
  </ContentBox>

  <Modal v-if="showModal" @close="showModal = false">
    <template v-slot:title>MIC SETUP</template>
    <SetupModel />
  </Modal>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import Modal from "@/components/design/Modal";
import BigButton from "@/components/big_buttons/BigButton";
import MicIcon from "@/components/icons/MicIcon";
import SetupModel from "@/components/sections/mic/SetupModel";

export default {
  name: "SetupButton",
  components: {BigButton, ContentBox, Modal, MicIcon, SetupModel},

  data() {
    return {
      showModal: false,
      setupTitle: "Mic Setup"
    }
  }
}
</script>

<style scoped>
.center{
  display: block;
  margin: auto;
}
</style>
