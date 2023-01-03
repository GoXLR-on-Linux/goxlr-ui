<template>
  <ContentBox>
    <BigButton :title="setupTitle" @button-clicked="$refs.micSetupModal.openModal($refs.setup)">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
  </ContentBox>

  <AccessibleModal ref="micSetupModal" id="mic_setup" body-padding="0px" :show_footer=false>
    <template v-slot:title>MIC SETUP</template>
    <SetupModel ref="setup" />
  </AccessibleModal>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import AccessibleModal from "@/components/design/modal/AccessibleModal";

export default {
  name: "SetupButton",
  components: {AccessibleModal, BigButton, ContentBox, SetupModel},

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
