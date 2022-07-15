<template>
  <div class="selectorList">
    <div class="buttonHolder">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectorList"
}
</script>

<style scoped>
.selectorList {
  background: transparent;
  margin: 3px;
}

.selectorList:not(:last-child) {
  margin-right: 20px;
}

.buttonHolder {
  box-sizing: border-box;
  overflow-y: auto;
}

.buttonHolder::-webkit-scrollbar {
  width: 3px;
}

.buttonHolder::-webkit-scrollbar-track {
  background-color: transparent;
}

.buttonHolder::-webkit-scrollbar-thumb {
  border-radius: 3px;
}

</style>