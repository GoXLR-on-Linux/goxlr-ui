<template>
  <div class="expander" @click="handleClick">{{expandText()}}</div>
</template>

<script>
export default {
  name: "ExpandoBox",

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
  padding: 20px;
  line-height: 254px;
  width: 5px;
}

.expander:hover {
  background-color: #49514e;
}
</style>