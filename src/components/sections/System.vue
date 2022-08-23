<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showModal = true">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <font-awesome-icon icon="fa-solid fa-circle-question" />
      </BigButton>
    </a>

  </ContentBox>

  <ModalBox v-if="showModal" @close="showModal = false">
      <template v-slot:title>MIC SETUP</template>
      <SetupModel />
  </ModalBox>
</template>


<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalBox from "@/components/design/modal/ModalBox";
export default {
  name: "SystemComponent",
  components: {ModalBox, SetupModel, BigButton, ContentBox, FontAwesomeIcon},

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