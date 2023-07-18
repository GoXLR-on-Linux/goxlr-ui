<template>
  <a href="https://discord.gg/BRBjkkbvmZ" target="_blank">
    <BigButton id="help" :title="'Help'">
      <font-awesome-icon icon="fa-solid fa-circle-question"/>
    </BigButton>
  </a>
</template>

<script>
import BigButton from "@/components/buttons/BigButton.vue";

export default {
  name: "HelpButton",
  components: {BigButton}
}
</script>

<style scoped>

</style>