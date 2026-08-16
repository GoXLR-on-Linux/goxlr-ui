<template>
  <div class="button" style="display: flex" :class="{ selected: isSelected }" tabindex="0"
       @click="handleClick" @keydown="handleKeyDown">
    <div class="left_side">
      <span v-show="showCheck" style="width: 20px; display: inline-block; color: #59b1b6">
        <font-awesome-icon :title="$t('message.common.activeProfile')" v-show="isActive" icon="fa-solid fa-check"/>
      </span>
      <span>{{ label }}</span>
    </div>
    <div ref="right" class="right_side">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileButton",
  emits: ['button-clicked', 'button-double-clicked', 'button-delete-pressed'],

  props: {
    buttonId: String,
    label: String,
    isActive: Boolean,
    isSelected: Boolean,

    showCheck: {type: Boolean, default: true},
    padding: {type: String, required: false, default: "8px"},
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

    handleKeyDown(event) {
      // Checked by hand, Vue's .delete modifier also catches Backspace, which is a nasty way to lose a
      // profile..
      if (event.key === "Enter") {
        event.preventDefault();
        this.$emit('button-clicked', this.buttonId);
        this.$emit('button-double-clicked', this.buttonId);
      }

      if (event.key === "Delete") {
        event.preventDefault();
        this.$emit('button-delete-pressed', this.buttonId);
      }
    },
  },

  computed: {
    right_width: function () {
      return this.$refs.right.clientWidth + "px";
    }
  }

}
</script>

<style scoped>
.button {
  box-sizing: border-box;
  width: calc(100% - 16px);
  margin-left: 8px;
  margin-right: 8px;
  padding: v-bind(padding);
  text-align: left;
  color: #fff;

  cursor: default;
}

.selected {
  background-color: #2d3230;
  font-weight: bold;
}

.button:focus-visible {
  outline: 1px solid #59b1b6;
  outline-offset: -1px;
}

.button:first-child {
  margin-top: 0;
}

.button:last-child {
  margin-bottom: 0;
}

.left_side {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - v-bind(right_width));
}

.right_side {
}


</style>
