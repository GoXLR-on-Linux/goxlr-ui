<template>
  <div class="colourBox">
    <div class="label">{{ title }}</div>

    <input ref="colourInput" type="color" @change="updateText" />
    <input type="text" :value="textValue" @keyup="updateColour" />

  </div>
</template>

<script>
export default {
  name: "ColourBox",

  data() {
    return {
      textValue: "#ff0000",
    }
  },

  props: {
    id: String,
    title: String,
    colourValue: String,
  },

  methods: {
    updateText(event) {
      this.textValue = event.target.value;
      this.$emit('colour-changed', this.id, this.textValue);
    },
    updateColour(event) {
      let value = event.target.value;

      const regex = /^#([a-f0-9]{6})\b$/
      if (value.match(regex)) {
        this.$refs.colourInput.value = value;
        this.$emit('colour-changed', this.id, this.textValue);
      }
    }
  },

  mounted() {
    this.textValue = this.colourValue;
    this.$refs.colourInput.value = this.textValue;
  },

  watch: {
    colourValue: function () {
      this.textValue = this.colourValue;
      this.$refs.colourInput.value = this.textValue;
    }
  }
}
</script>

<style scoped>
.colourBox {
  height: 220px;
  width: 200px;

  margin: 3px;
  background-color: #353937;
}

.colourBox:not(:last-child) {
  margin-right: 20px;
}

.label {
  padding: 10px;
  color: #fff;
  background-color: #3b413f;

  text-transform: uppercase;

  margin-bottom: 8px;
}

input[type=color] {
  background-color: #3b413f;
  color: #59b1b6;
  padding: 10px;
  box-sizing: border-box;

  text-align: center;

  width: 100%;
  height: 50px;

  border:none;
  background-image:none;
  box-shadow: none;
  outline: none;

  cursor: pointer;

  -moz-appearance:textfield;
}

input[type=text] {
  font-family: LeagueMonoCondensed, sans-serif;

  background-color: #3b413f;
  color: #59b1b6;
  padding: 10px;
  box-sizing: border-box;

  text-align: center;

  width: 100%;

  margin-top: 15px;

  border:none;
  background-image:none;
  box-shadow: none;
  outline: none;

  -moz-appearance:textfield;
}

</style>