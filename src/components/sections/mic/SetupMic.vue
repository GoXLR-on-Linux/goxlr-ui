<template>
  <ContentBox>
    <BigButton :title="setupTitle" @button-clicked="showModal = true">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
  </ContentBox>

  <ModalBox body-padding="0px" v-if="showModal" @close="showModal = false">
    <template v-slot:title>MIC SETUP</template>
    <SetupModel />
  </ModalBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import ModalBox from "@/components/design/modal/ModalBox";

export default {
  name: "SetupButton",
  components: {ModalBox, BigButton, ContentBox, SetupModel},

  data() {
    return {
      showModal: false,
      setupTitle: "Mic Setup"
    }
  }
}
</script>

<style scoped>
</style>
