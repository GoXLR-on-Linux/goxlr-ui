<template>
  <div class="labelText">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "SliderLabel",

  props: {
    title: String,
    textColour: { type: String, required: false, default: "#fff" },
  }
}
</script>

<style scoped>
  .labelText {
    padding: 10px 4px;
    color: v-bind(textColour);

    height: 18px;
    font-size: 10pt;

    text-transform: uppercase;
    text-align: center;
    font-stretch: condensed;
    white-space: nowrap;
  }
</style>
