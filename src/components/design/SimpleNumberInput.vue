<template>
  <input type="number" v-on:input="update" v-on:blur="reset" v-model="localTextValue" :min="minValue" :max="maxValue" />
</template>

<script>
export default {
  name: "SimpleNumberInput",

  props: {
    minValue: Number,
    maxValue: Number,

    currentTextValue: Number,
  },

  data() {
    return {
      localTextValue: 0,
      lastTextValue: 0,
    }
  },

  methods: {
    update(e) {
      let newValue = e.target.value;

      if (newValue === "") {
        // Cleared box..
        return;
      }

      if (e.target.value > this.maxValue) {
        newValue = this.maxValue;
        this.localTextValue = this.maxValue;
      }

      if (e.target.value < this.minValue) {
        newValue = this.minValue;
        this.localTextValue = this.minValue;
      }

      // Value has changed, emit something upwards..
      this.$emit("value-updated", parseInt(newValue));
    },

    reset(e) {
      let newValue = e.target.value;
      if (newValue === "") {
        e.target.value = this.lastTextValue;
        return;
      }

      if (e.target.value > this.maxValue) {
        newValue = this.maxValue;
        this.localTextValue = this.maxValue;
      }

      if (e.target.value < this.minValue) {
        newValue = this.minValue;
        this.localTextValue = this.minValue;
      }

      // Value has changed, emit something upwards..
      this.$emit("on-blur", parseInt(newValue));
      e.target.value = this.lastTextValue;
    },
  },

  created() {

    this.localTextValue = this.currentTextValue;
  },

  watch: {
    currentTextValue: function(newValue) {
      this.lastTextValue = newValue;
      this.localTextValue = newValue;
    }
  },
}
</script>

<style scoped>

</style>
