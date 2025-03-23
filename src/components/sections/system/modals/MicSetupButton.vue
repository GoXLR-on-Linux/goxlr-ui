<template>
  <div>
    <BigButton id="mic_setup" ref="mic_setup_button" :title="$t('message.microphone.setup.button')" @click="openModal">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
    <AccessibleModal width="820px" ref="micSetupModal" id="mic_setup" body-padding="0px" :show_footer=false @modal-close="closeModal">
      <template v-slot:title>{{ $t('message.microphone.setup.title') }}</template>
      <SetupModel ref="setup" />
    </AccessibleModal>
  </div>
</template>

<script>
import BigButton from "@/components/buttons/BigButton.vue";
import SetupModel from "@/components/sections/mic/SetupModel.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  emits: ["mic-setup-open"],
  name: "MicSetupButton",
  components: {FontAwesomeIcon, AccessibleModal, BigButton, SetupModel},

  data() {
    return {
      showModal: false,
    }
  },

  methods: {
    openModal() {
      this.$emit('mic-setup-open');

      this.$refs.micSetupModal.openModal(this.$refs.setup, this.$refs.mic_setup_button);
      this.$refs.setup.opened();
    },

    closeModal() {
      this.$refs.setup.closed();
    }
  }
}
</script>

<style scoped>
</style>
