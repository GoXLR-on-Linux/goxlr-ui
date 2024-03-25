<script>
export default {
  emits: ['change'],

  name: "NumberSetting",
  props: {
    label: {type: String, required: true},
    description: {type: String, required: true},
    value: {type: Number, required: true},

    suffix: {type: String, required: false, default: ""},

    min: {type: Number, required: true},
    max: {type: Number, required: true}
  },

  methods: {
    onChange(e) {
      let value = parseInt(e.target.value);
      if (isNaN(value)) {
        return;
      }
      if (value === this.value) {
        return;
      }

      if (value < this.min) {
        value = this.min;
      }
      if (value > this.max) {
        value = this.max;
      }

      this.$emit('change', value);
    },

    validate(e) {
      let allowedKeys = [
          "ArrowRight",
          "ArrowLeft",
          "Enter",
          "Backspace",
          "Delete"
      ];

      // Check whether the Key is a Number..
      if ((isNaN(e.key) || e.key === null) && !allowedKeys.includes(e.key)) {
          e.preventDefault();
          return false;
      }

      return true;
    },

    getElementId() {
      return this.label.toLocaleLowerCase()
          .replaceAll(" ", "_")
          .replaceAll("(", "_")
          .replaceAll(")", "_");
    }
  }
}
</script>

<template>
  <div class="setting">
    <label :for="getElementId()" class="label">{{ label }}</label>
    <div class="input">
      <input :id="getElementId()" type="number" :value="value" :aria-label="label" :aria-description="description"
             @blur="onChange" @keydown="validate"/>
      <span>{{ suffix }}</span>
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
  white-space: nowrap;
  margin: auto;

  border: 1px solid #ccc;
  padding: 2px;
  width: 70px;

  text-align: right;
}

.input:hover {
  color: #fff;
  border-color: #fff;
}

.input input {
  margin: auto;
  text-align: right;
  outline: none;
  background-color: transparent;
  font-family: LeagueMonoCondensed, sans-serif;
  color: #ccc;
  border: 0;
  -moz-appearance: textfield;
  width: 40px;
}

.input input:focus {
  color: #fff;
}

.input:focus-within {
  border: 1px solid #fff;
  color: #fff;
}

.input input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>