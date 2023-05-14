<script>
export default {
  name: "GroupContainer",
  props: {
    label: String,
    title: String,
    level: {
      type: Number,
      default: 2
    },
    role: {
      type: String,
      default: "region"
    }
  },

  data() {
    return {
      observer: null,
      width: 0,
    }
  },

  mounted() {
    this.observer = new ResizeObserver(() => {
      if (this.$refs.right !== null) {
        this.width = this.$refs.right.clientWidth;
      }
    });
    this.observer.observe(this.$refs.right);
  },

  computed: {
    rightWidth() {
      if (this.width === 0) {
        return "0";
      }
      return this.width + 2 + "px";
    }
  }
}
</script>

<template>
  <div class="container" :role="role" :aria-label="label || title || ''">
    <div style="width: 100%">
      <div v-if="title !== ''" class="title" role="heading" :aria-level="level">
        {{ title }}
      </div>
      <div ref="right" class="right">
        <slot name="right"></slot>
      </div>
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8px 24px 24px;

  background-color: #2D3230;
}

.title {
  display: inline-block;
  width: calc(100% - (v-bind(rightWidth) * 2));

  padding: 16px 0 10px;
  margin-left: v-bind(rightWidth);

  color: #ffffff;
  text-align: center;
  text-transform: uppercase;
}

.content {
  display: flex;
  flex-direction: row;
  gap: 6px;

  height: fit-content;
  width: fit-content;
}

.right {
  display: inline-block;
}
</style>
