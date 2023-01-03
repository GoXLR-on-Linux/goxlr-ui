<template>
  <button class="expander" @click="handleClick">
    <font-awesome-icon v-if=expanded title="Collapse Section" icon="fa-solid fa-chevron-left" />
    <font-awesome-icon v-else title="Expand Section" icon="fa-solid fa-chevron-right" />
  </button>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
  name: "ExpandoBox",
  components: {FontAwesomeIcon},
  props: {
    expanded: {type: Boolean, default: false },
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
  flex-direction: column;
  flex-wrap: nowrap;
  color: #fff;
  vertical-align: middle;
  background-color: #3b413f;
  padding: 15px;

  border: 0;
  margin: 0;
}

.expander:hover {
  background-color: #49514e;
}
</style>
