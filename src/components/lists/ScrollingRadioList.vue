<script>
import VerticalScrollingContainer from "@/components/containers/VerticalScrollingContainer.vue";
import RadioItem from "@/components/lists/RadioItem.vue";
import DropMenu from "@/components/design/DropMenu.vue";

export default {
  name: "ScrollingRadioList",
  emits: ['selection-changed', 'menu-opened', 'menu-selected'],
  components: {DropMenu, RadioItem, VerticalScrollingContainer},

  props: {
    group: String,
    options: Array,
    selected: String,
    menu: Array,
    menu_id: String,
  },

  methods: {
    select(option) {
      this.$emit('selection-changed', option);
    },

    getUniqueId(name) {
      return this.group + "_" + name;
    },

    getButtonByRef(name) {
      return this.$refs[this.getUniqueId(name)][0];
    },

    menuOpened(event, return_id, item) {
      // Trigger an event so anything upstream can handle the behaviour..
      this.$emit('menu-opened', event, return_id, item);

      // Trigger the menu open.
      this.$refs.contextMenu.showMenu(event, item, return_id, this.container.getMainRef().scrollTop);
    },

    getButtonId(value) {
      return value.toLowerCase().replace(" ", "_").replace("(", "_").replace(")", "_") + "_" + this.menu_id;
    },

    menuOptionClicked(event) {
      // We need to emit this up to whatever is putting us here :)
      this.$emit('menu-selected', event);
    }
  },

  data() {
    return {
      container: undefined,
    }
  },

  mounted() {
    this.container = this.$refs.container;
  }
}
</script>

<template>
  <VerticalScrollingContainer ref="container" role="radiogroup">
    <RadioItem
        v-for="option in options"
        :key="option.id"
        :id="getUniqueId(option.id)"
        :ref="getUniqueId(option.id)"
        :group="group"
        :text="option.label"
        :selected="selected === option.id"
        :disabled="option.disabled"
        @radio-selected="select(option.id)"
    >
      <template v-if="this.menu !== undefined" #right>
        <button :aria-label="`${option.label} Options`" :id="getButtonId(option.id)"
                aria-haspopup="menu" :aria-controls="this.menu_id"
                @click.prevent.stop="menuOpened($event, getButtonId(option.id), option.id)">
          <font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/>
        </button>
      </template>

    </RadioItem>
    <slot></slot>
  </VerticalScrollingContainer>
  <DropMenu
      v-if="this.menu !== undefined"
      :options="this.menu"
      ref="contextMenu"
      @option-clicked="menuOptionClicked"
      :menu_id="this.menu_id"
  />
</template>

<style scoped>
button {
  background-color: transparent;
  border: 0;
  padding: 6px;
  margin: 0;
}

button:focus {
  outline: none;
}
</style>