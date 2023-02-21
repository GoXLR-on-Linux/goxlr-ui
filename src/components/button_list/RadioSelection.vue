<script>
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import RadioItem from "@/components/button_list/RadioItem.vue";
import VerticalScrollingContainer from "@/components/containers/VerticalScrollingContainer.vue";

export default {
  name: "RadioSelection",
  emits: ['selection-changed'],
  components: {
    VerticalScrollingContainer,
    RadioItem,
    WidgetContainer
  },

  props: {
    title: String,
    group: String,
    options: Array,
    selected: String
  },

  methods: {
    select(option) {
      this.$emit('selection-changed', option);
    },

    getUniqueId(name) {
      return this.group + "_" + name;
    }
  }
}
</script>

<template>
  <WidgetContainer role="radiogroup">
    <template #title><slot name="title">{{ title }}</slot></template>
    <VerticalScrollingContainer>
      <RadioItem
          v-for="option in options"
          :key="option.id"
          :id="getUniqueId(option.id)"
          :group="group"
          :text="option.label"
          :selected="selected === option.id"
          :disabled="option.disabled"
          @radio-selected="select(option.id)"
      />
      <slot></slot>
    </VerticalScrollingContainer>
  </WidgetContainer>
</template>

<style scoped>
</style>
