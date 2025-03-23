<template>
  <div>
    <BigButton id="switch_device" title="Switch Device" @button-clicked="switchDevice">
      <font-awesome-icon icon="fa-solid fa-repeat"/>
    </BigButton>
  </div>
</template>

<script>
import BigButton from "@/components/buttons/BigButton.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {store} from "@/store";

export default {
  name: "SwitchDeviceButton",
  components: {FontAwesomeIcon, BigButton},

  data() {
    return {
      showModal: false,
      setupTitle: "Mic Setup"
    }
  },

  methods: {
    switchDevice() {
      store.setActiveSerial("");
    }
  }
}
</script>

<style scoped>
</style>
