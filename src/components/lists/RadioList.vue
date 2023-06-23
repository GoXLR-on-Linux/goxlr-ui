<script>
import RadioItem from "@/components/lists/RadioItem.vue";
import DropMenu from "@/components/design/DropMenu.vue";

export default {
  name: "RadioList",
  emits: ['selection-changed', 'menu-opened', 'menu-selected'],
  components: { DropMenu, RadioItem },

  props: {
    label: { type: String, default: "" },
    group: String,
    options: Array,
    selected: String,
    menu: Array,
    menu_id: String,

    scrollTop: { type: Function, optional: true, default: () => { return 0; } },
    padding: {type: String, required: false, default: "8px"},
    background: {type: String, required: false, default: "#3b413f" },
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

    getFirstButtonRef() {
      return this.$refs[this.getUniqueId(this.options[0].id)][0];
    },

    menuOpened(event, return_id, item) {
      // Trigger an event so anything upstream can handle the behaviour..
      this.$emit('menu-opened', event, return_id, item);

      // Trigger the menu open.
      this.$refs.contextMenu.showMenu(event, item, return_id, this.scrollTop());
    },

    getButtonId(value) {
      return value.toLowerCase().replace(" ", "_").replace("(", "_").replace(")", "_") + "_" + this.menu_id;
    },

    menuOptionClicked(event) {
      // We need to emit this up to whatever is putting us here :)
      this.$emit('menu-selected', event);
    },
  },
}
</script>

<template>
  <div>
    <div class="list" role="radiogroup" :aria-label="label">
      <RadioItem v-for="option in options" :key="option.id" :id="getUniqueId(option.id)" :ref="getUniqueId(option.id)"
        :group="group" :text="option.label" :selected="selected === option.id" :disabled="option.disabled"
        @radio-selected="select(option.id)" :icon="option.icon" :background="background" :padding="padding">
        <template v-if="this.menu !== undefined" #right>
          <button :aria-label="`${option.label} Options`" :id="getButtonId(option.id)" aria-haspopup="menu"
            :aria-controls="this.menu_id" @click.prevent.stop="menuOpened($event, getButtonId(option.id), option.id)">
            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" />
          </button>
        </template>
      </RadioItem>
      <slot></slot>
    </div>
    <DropMenu v-if="this.menu !== undefined" :options="this.menu" ref="contextMenu" @option-clicked="menuOptionClicked"
      :menu_id="this.menu_id" />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;

  box-sizing: border-box;
  width: 100%;
}


button {
  background-color: transparent;
  border: 0;
  padding: 6px;
  margin: 0;

  cursor: pointer;
}

button:focus {
  outline: none;
}
</style>
