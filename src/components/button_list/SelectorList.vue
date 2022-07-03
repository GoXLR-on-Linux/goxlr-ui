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
  height: 220px;
  width: 200px;

  margin: 3px;
}

.selectorList:not(:last-child) {
  margin-right: 20px;
}

.buttonHolder {
  height: 170px;
  width: 200px;

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