<template>
  <div>
    <BigButton id="shutdown_button" ref="button" :title="$t('message.system.powerButton')"
               @button-clicked="$refs.shutdownModal.openModal(undefined, $refs.button)">
      <font-awesome-icon icon="fa-solid fa-power-off"/>
    </BigButton>
    <AccessibleModal ref="shutdownModal" width="630px" id="shutdown_modal" :show_footer=false>
      <template v-slot:title>{{ $t('message.system.powerButton') }}</template>
      <PowerShutdown :title="$t('message.system.power.shutdownTitle')" :is_sleep="false" />
      <PowerShutdown :title="$t('message.system.power.sleepTitle')" :is_sleep="true" />
      <PowerWake/>
    </AccessibleModal>
  </div>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import PowerShutdown from "@/components/sections/system/modals/power/PowerShutdown.vue";
import PowerWake from "@/components/sections/system/modals/power/PowerWake.vue";


export default {
  name: "ShutdownButton",
  components: {PowerWake, PowerShutdown, BigButton, AccessibleModal},

  methods: {}
}
</script>

<style scoped>

</style>