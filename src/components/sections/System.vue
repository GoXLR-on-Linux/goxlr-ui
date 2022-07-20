<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showModal = true">
      <font-awesome-icon icon="fa-solid fa-microphone" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <font-awesome-icon icon="fa-solid fa-circle-question" />
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
import Modal from "@/components/design/Modal";
import SetupModel from "@/components/sections/mic/SetupModel";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: "SystemComponent",
  components: {SetupModel, BigButton, ContentBox, FontAwesomeIcon, Modal},

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