<script>
import ExpandoBox from "@/components/design/ExpandoBox.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";

export default {
  name: "ExpandoGroupContainer",
  components: {GroupContainer, ExpandoBox},
  props: {
    title: String,
    expanded: Boolean,
  }
}
</script>

<template>
  <div class="expando">
    <GroupContainer :title="title">
      <slot></slot>
    </GroupContainer>
    <ExpandoBox @expando-clicked="$emit('expando-clicked')" :expanded="expanded"/>
  </div>

</template>

<style scoped>
.expando {
  display: flex;
  flex-direction: row;
}
</style>
