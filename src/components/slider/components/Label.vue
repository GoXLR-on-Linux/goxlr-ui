<template>
  <div id="labelText">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: "SliderLabel",

  props: {
    title: String
  }
}
</script>

<style scoped>
  #labelText {
    padding: 10px 0px;
    color: #fff;

    height: 18px;
    font-size: 10pt;

    text-transform: uppercase;
    font-stretch: condensed;
  }
</style>