<script>
export default {
  name: "ContentContainer",
  props: {
    noLeftPad: Boolean,
  }
}
</script>

<template>
  <div class="container" :class="{ contentPadNoLeft: noLeftPad }">
    <slot></slot>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: row;
  gap: 15px;

  padding: 40px;

  overflow-x: scroll;
  overflow-y: hidden;
}

.container::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.container::-webkit-scrollbar-track {
  background-color: transparent;
}

.container::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}

.contentPadNoLeft {
  padding-left: 0;
}
</style>
