<template>
  <div class="button" :class="{ selected: isSelected }" @click="handleClick">
    <span v-show="showCheck" style="width: 20px; display: inline-block; color: #59b1b6">
      <font-awesome-icon v-show="isActive" icon="fa-solid fa-check" />
    </span>
    <span>{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",

  props: {
    buttonId: String,
    label: String,
    isActive: Boolean,
    isSelected: Boolean,

    showCheck: {type: Boolean, default: true}
  },

  data() {
    return {
      timeout: null,
    }
  },

  methods: {
    handleClick() {
      let self = this;
      if (!this.timeout) {
        // Emit the first click regardless..
        self.$emit('button-clicked', self.buttonId);

        this.timeout = setTimeout(() => {
          self.timeout = null;
        }, 350);
      } else {
        clearTimeout(this.timeout);
        this.timeout = null;
        this.$emit('button-double-clicked', this.buttonId);
      }
    },
  },
}
</script>

<style scoped>
.button {
  box-sizing: border-box;
  width: calc(100% - 16px);
  margin-left: 8px;
  padding: 12px;
  text-align: left;
  color: #fff;

  cursor: default;
}

.selected {
  background-color: #2d3230;
  font-weight: bold;
}

.button:first-child {
  margin-top: 0px;
}

.button:last-child {
  margin-bottom: 0px;
}


</style>
