<template>
  <GoXLR/>
</template>

<script>
import GoXLR from "@/components/GoXLR.vue";

export default {
  name: 'App',
  components: {
    GoXLR,
  },
}
</script>

<style>
body {
  background-color: #252927;
  padding: 0;
  margin: 0;
}

@font-face {
  src: url('./assets/LeagueMono-NarrowRegular.ttf');
  font-family:'LeagueMonoCondensed';
  font-style: normal;
  font-stretch: 1% 500%; /* Required by Chrome */
}

@font-face {
  src: url('./assets/LeagueMono.ttf');
  font-family:'LeagueMono';
  font-style: normal;
  font-stretch: 1% 500%; /* Required by Chrome */
}

#app {
  font-family: LeagueMonoCondensed, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
  user-select: none;
}
</style>
