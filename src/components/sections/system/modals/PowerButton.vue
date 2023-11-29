<template>
  <BigButton id="shutdown_button" ref="button" title="Power Actions"
             @button-clicked="$refs.shutdownModal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-power-off"/>
  </BigButton>
  <AccessibleModal ref="shutdownModal" width="630px" id="shutdown_modal" :show_footer=false>
    <template v-slot:title>Power Actions</template>
    <PowerShutdown title="Shutdown Actions" :is_sleep=false />
    <PowerShutdown title="Sleep Actions" :is_sleep=true />
    <PowerWake />
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import PowerShutdown from "@/components/sections/system/modals/power/PowerShutdown.vue";
import PowerWake from "@/components/sections/system/modals/power/PowerWake.vue";


export default {
  name: "ShutdownButton",
  components: {PowerWake, PowerShutdown, BigButton, AccessibleModal},

  methods: {
  }
}
</script>

<style scoped>

</style>