<script>
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import ScrollingRadioList from "@/components/lists/ScrollingRadioList.vue";

export default {
  name: "RadioSelection",
  emits: ['selection-changed', 'menu-opened', 'menu-selected'],
  components: {
    ScrollingRadioList,
    WidgetContainer
  },

  props: {
    title: String,
    group: String,
    options: Array,
    selected: String,
    menu: Array,
    menu_id: String,
  },

  methods: {
    // We basically need to propagate these from child to parent
    getButtonByRef(name) {
      return this.$refs.list.getButtonByRef(name);
    },

    select(option) {
      this.$emit('selection-changed', option);
    },

    menuOpened(event, return_id, item) {
      // Trigger an event so anything upstream can handle the behaviour..
      this.$emit('menu-opened', event, return_id, item);
    },

    menuOptionClicked(event) {
      // We need to emit this up to whatever is putting us here :)
      this.$emit('menu-selected', event);
    }
  },
}
</script>

<template>
  <WidgetContainer>
    <template #title>
      <slot name="title">{{ title }}</slot>
    </template>
    <ScrollingRadioList ref="list" :group="group" :options="options" :selected="selected" :menu="menu"
                        :menu_id="menu_id" @selection-changed="select" @menu-opened="menuOpened"
                        @menu-selected="menuOptionClicked"><slot>{{}}</slot></ScrollingRadioList>
  </WidgetContainer>
</template>

<style scoped>
</style>
