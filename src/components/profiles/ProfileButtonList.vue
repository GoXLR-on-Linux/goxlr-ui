<template>
  <div ref="selectorList" class="selectorList">
    <div class="buttonHolder">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileButtonList"
}
</script>

<style scoped>
.selectorList {
  background: transparent;
  height: calc(100% - 55px);
  overflow-y: scroll;
}

.buttonHolder {
  margin-top: 10px;
  box-sizing: border-box;
}

.selectorList::-webkit-scrollbar {
  width: 3px;
}

.selectorList::-webkit-scrollbar-track {
  background-color: transparent;
}

.selectorList::-webkit-scrollbar-thumb {
  background-color: #dfdfdf;
  border-radius: 3px;
}
</style>