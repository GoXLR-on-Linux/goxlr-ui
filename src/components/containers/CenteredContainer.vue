<template>
  <div class="centered">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CenteredContainer"
}
</script>

<style scoped>
  .centered {
    margin: auto;
    width: fit-content;
  }
</style>
