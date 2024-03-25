<script>
export default {
  emits: ['check-change'],

  name: "PowerBooleanSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
  },

  data() {
    return {
      checked: false,
    }
  },

  methods: {
    onCheckChange() {
      this.checked = !this.checked;
      this.$emit('check-change', !this.enabled);
    },
  },

  watch: {
    enabled(newValue) {
      this.checked = newValue;
    }
  }
}
</script>

<template>
  <div class="setting" @click="onCheckChange">
    <div class="input" role="checkbox" :aria-valuenow="checked" :aria-label="label"
         :aria-description="description" :aria-checked="checked" @keydown.space="onCheckChange" @keydown.enter="onCheckChange"
         tabindex="0">
      <font-awesome-icon v-if="checked" icon="fa-solid fa-square-check"/>
      <font-awesome-icon v-else icon="fa-solid fa-square"/>
    </div>
    <div class="label">{{ label }}</div>
  </div>
</template>

<style scoped>
.setting {
  cursor: pointer;
  display: flex;
  gap: 5px;
  height: 16px;
  padding: 5px;
  color: #ccc;
}

.setting:focus-within {
  color: #fff;
}

.setting:hover {
  cursor: pointer;
  color: #fff;
}

.label {
  margin: auto;
  width: 100%;
}

.input {
  max-width: fit-content;
  font-size: 16px;
  margin: auto;
}
</style>