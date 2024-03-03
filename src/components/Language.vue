<script>
export default {
  name: "Language",
}
</script>

<template>
  <!--  <select v-model="$root.$i18n.locale">-->
  <select  v-model="$i18n.locale">
    <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}</option>
  </select>
</template>

<style scoped>

</style>