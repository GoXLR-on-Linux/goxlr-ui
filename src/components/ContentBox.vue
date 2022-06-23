<template>
  <div class="content">
    <div class="contentTitle">{{ title }}</div>
    <div class="contentBody">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentBox",

  props: {
    title: String,
  }
}
</script>

<style scoped>

.content:not(:first-child) {
  /* Left / Right margins should be handled by the parent.. */
  margin-left: 15px;
}

.content {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background-color: #2d3230;
  padding: 20px;
}

.contentTitle {
  color: #fff;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.contentBody {
  display: inline-flex;
  flex-direction: row;
}
</style>