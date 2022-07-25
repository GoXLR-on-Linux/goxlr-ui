<template>
  <div class="scroll">
    <div class="contentPad" :class="{ contentPadNoLeft: noLeftPad }">
      <div class="section">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTabContent",

  props: {
    noLeftPad: Boolean,
  }
}
</script>

<style scoped>
.scroll {
  overflow-x: scroll;
  overflow-y: hidden;
  height: 370px;
}

.contentPad {
  display: inline-block;
  padding: 40px;
  text-align: center;
}

.contentPadNoLeft {
  padding-left: 0px;
}

.section {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.scroll::-webkit-scrollbar {
  height: 6px;
  width: 6px;
}

.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}

</style>