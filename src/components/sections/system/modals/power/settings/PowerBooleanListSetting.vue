<script>
export default {
  emits: ['check-change', 'select-change'],

  name: "PowerBooleanListSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    enabled: {type: Boolean, required: true},
    options: {type: Array, required: true},
    value: {required: true},
  },

  data() {
    return {
      checked: false,
      selected: undefined,
    }
  },

  methods: {
    selectedValue() {
      return this.$refs.selection.value;
    },

    onCheckChange() {
      this.checked = !this.checked;
      this.$emit('check-change', !this.enabled);
    },

    onSelectChange(e) {
      this.selected = e.target.value;
      this.$emit('select-change', e.target.value);
    },
  },

  mounted() {
    this.checked = this.enabled;
    this.selected = this.value;
  },

  watch: {
    enabled(newValue) {
      this.checked = newValue;
    },

    value(newValue) {
      if (newValue !== undefined) {
        this.selected = newValue;
      }
    }
  }
}
</script>

<template>
  <div class="setting">
    <div class="input" @click="onCheckChange" role="checkbox" :aria-valuenow="checked" :aria-label="label"
         :aria-description="description" :aria-checked="checked" @keydown.space="onCheckChange"
         tabindex="0">
      <font-awesome-icon v-if="checked" icon="fa-solid fa-square-check"/>
      <font-awesome-icon v-else icon="fa-solid fa-square"/>
    </div>
    <div class="label" @click="onCheckChange">{{ label }}</div>

    <div class="input">
      <select ref="selection" @change="onSelectChange">
        <option v-for="option of options" :key="option.key" :value="option.key" :selected="option.key === selected">
          {{ option.value }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.setting {
  cursor: pointer;
  display: flex;
  gap: 5px;
  height: 18px;
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