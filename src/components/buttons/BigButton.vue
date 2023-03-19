<template>
  <button ref="button" role="button" :aria-labelledby="`button_title_${id}`" class="content" @click="clicked">
    <div class="img-section">
      <slot/>
    </div>
    <div class="iconTitle"><span :id="`button_title_${id}`" class="filler">{{ title }}</span></div>
  </button>
</template>

<script>
export default {
  name: "BigButton",

  props: {
    id: { type: String, required: true },
    title: String,
  },

  methods: {
    clicked: function (){
      this.$emit("button-clicked")
    },
    focus: function() {
      this.$refs.button.focus();
    }
  }
}
</script>

<style scoped>

button.content {
  width: 130px;
  height: 170px;
  background: #252927;
  border: 0;
  margin: 0;
  padding: 0;
}

button .img-section {
  text-align: center;
  height: 130px;
  font-size: 80px;
  color: #8C8F8E;

  display: flex;
  justify-content: center;
  align-items: center;

  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
}

button:hover {
  cursor: pointer;
}

button:hover .img-section {
  color: #fff;
  background-color: #49514E;
}

button .iconTitle {
  height: 40px;
  line-height: 40px;
  background-color: #353937;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  text-align: center;
}
button:hover .iconTitle {
  background-color: #6E7170;
}



</style>
