<template>
  <button class="expander" @click="handleClick">
    <font-awesome-icon v-if=expanded title="Collapse Section" :icon="'fa-solid ' + expand_left" />
    <font-awesome-icon v-else title="Expand Section" :icon="'fa-solid ' + expand_right" />
  </button>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: "ExpandoBox",
  components: {FontAwesomeIcon},
  props: {
    expanded: {type: Boolean, default: false },
    expand_right: { type: String, required: false, default: 'fa-chevron-right'},
    expand_left: { type: String, required: false, default: 'fa-chevron-left'}
  },

  methods: {
    expandText() {
      if (this.expanded) {
        return "<"
      }
      return ">"
    },
    handleClick() {
      this.$emit("expando-clicked");
    }
  }
}
</script>

<style scoped>
.expander {
  display:inline-flex;
  align-items: center;

  color: #fff;
  vertical-align: middle;
  background-color: #3b413f;
  padding: 15px;

  border: 0;
}

.expander:hover {
  background-color: #49514e;
}
</style>

