<script>
export default {
  emits: ['change'],

  name: "ListSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    options: {type: Array, required: true},
    value: {type: String, required: true},
  },

  methods: {
    onChange(e) {
      this.$emit('change', e.target.value);
    },
  }
}
</script>

<template>
  <div class="setting">
    <span class="label">{{ label }}</span>
    <div class="input">
      <select @change="onChange">
        <option v-for="option of options" :key="option.key" :value="option.key" :selected="option.key === value">
          {{ option.value }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.setting {
  display: flex;
  height: 20px;
  padding: 10px;
  color: #ccc;
}

.setting:focus-within {
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

.input select {
  text-align: right;
  border: 0;
  background-color: transparent;
  font-family: LeagueMonoCondensed, sans-serif;
  color: #CCCCCC;
}

.input select:hover {
  color: #fff;
  cursor: pointer;
}
</style>