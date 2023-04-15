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

    display: flex;
    flex-direction: row;
    gap: 15px;
  }
</style>
