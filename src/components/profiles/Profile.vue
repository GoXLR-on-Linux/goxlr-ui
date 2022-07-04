<template>

  <div><Button :label="text"></Button></div>

</template>

<script>
import Button from "@/components/button_list/Button";
export default {
  name: "ProFile",
  components: {Button},

  props: {
    text: String
  }
}
</script>

<style scoped>

</style>