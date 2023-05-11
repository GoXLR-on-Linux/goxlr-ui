<script>
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import VerticalScrollingContainer from "@/components/containers/VerticalScrollingContainer.vue";
import CheckItem from "@/components/lists/CheckItem.vue";

export default {
  name: "CheckSelection",
  emits: ['selection-changed'],
  components: {
    CheckItem,
    VerticalScrollingContainer,
    WidgetContainer
  },

  props: {
    title: String,
    group: String,
    options: Array,
  },

  methods: {
    change(option, value) {
      this.$emit('selection-changed', option, value);
    },

    getUniqueId(name) {
      return name;
    }
  }
}
</script>

<template>
  <WidgetContainer role="group" :aria-label="title" :title="title">
    <VerticalScrollingContainer>
      <CheckItem v-for="option in options" :key="option.id" :id="option.id" :group="group" :text="option.label"
        :selected="option.selected" :disabled="option.disabled" @check-changed="change" />
      <slot></slot>
    </VerticalScrollingContainer>
  </WidgetContainer>
</template>

<style scoped></style>
