<script>
import ExpandoBox from "@/components/design/ExpandoBox.vue";

export default {
  name: "ExpandoGroupContainer",
  components: {ExpandoBox},
  props: {
    title: String,
    gap: {type: String, default: "24px"},

    expanded: Boolean,
  }
}
</script>

<template>
  <div class="expando">
    <div class="container">
      <p v-if="title !== ''" class="title">
        {{ title }}
      </p>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <ExpandoBox @expando-clicked="$emit('expando-clicked')" :expanded="expanded"/>
  </div>

</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.expando {
  display: flex;
  flex-direction: row;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: fit-content;
  margin: auto;
  padding: 24px;

  background-color: #2D3230;
}

.title {
  padding: 0 0 10px 0;

  color: #ffffff;
  text-transform: uppercase;
}

.content {
  display: flex;
  flex-direction: row;
  gap: v-bind(gap);

  height: fit-content;
  width: fit-content;
}
</style>
