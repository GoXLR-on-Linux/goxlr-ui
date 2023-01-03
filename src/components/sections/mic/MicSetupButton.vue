<template>
  <BigButton :title="setupTitle" @button-clicked="$refs.micSetupModal.openModal($refs.setup)">
    <font-awesome-icon icon="fa-solid fa-microphone-lines" />
  </BigButton>
  <AccessibleModal ref="micSetupModal" id="mic_setup" body-padding="0px" :show_footer=false>
    <template v-slot:title>MIC SETUP</template>
    <SetupModel ref="setup" />
  </AccessibleModal>
</template>

<script>
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import AccessibleModal from "@/components/design/modal/AccessibleModal";

export default {
  name: "MicSetupButton",
  components: {AccessibleModal, BigButton, SetupModel},

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
