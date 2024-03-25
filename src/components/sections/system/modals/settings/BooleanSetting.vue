<script>
export default {
  emits: ['change'],

  name: "BooleanSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
  },

  methods: {
    onChange() {
      this.$emit('change', !this.enabled);
    },
  }
}
</script>

<template>
  <div class="setting" @click="onChange">
    <div class="label">{{ label }}</div>
    <div class="input" @click="onChange" role="checkbox" :aria-valuenow="enabled" :aria-label="label"
         :aria-description="description" :aria-checked="enabled" @keydown.space="onChange" @keydown.enter="onChange"
         tabindex="0">
      <font-awesome-icon v-if="enabled" icon="fa-solid fa-square-check"/>
      <font-awesome-icon v-else icon="fa-solid fa-square"/>
    </div>
  </div>
</template>

<style scoped>
.setting {
  cursor: pointer;
  display: flex;
  height: 20px;
  padding: 10px;
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
  font-size: 20px;
  margin: auto;
}
</style>