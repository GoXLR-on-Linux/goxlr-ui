<script>
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import RadioItem from "@/components/button_list/RadioItem.vue";

export default {
  name: "ListSelection",
  emits: ['selection-changed'],
  components: {
    RadioItem,
    WidgetContainer
  },

  props: {
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
    <div class="scroll">
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
    </div>
  </WidgetContainer>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.scroll {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;

  margin-top: 8px;
  margin-bottom: 8px;

  padding: 4px;
  box-sizing: border-box;
  width: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
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
