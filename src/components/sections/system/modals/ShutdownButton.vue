<template>
  <BigButton id="shutdown_button" ref="button" title="Shutdown" @button-clicked="$refs.aboutModal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-power-off" />
  </BigButton>
  <AccessibleModal ref="shutdownModal" id="shutdown_modal" :show_footer=false>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";

export default {
  name: "ShutdownButton",
  components: {BigButton, AccessibleModal}
}
</script>

<style scoped>

</style>