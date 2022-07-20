<template>
  <div class="content" @click="clicked">
    <div class="img-section">
      <slot/>
    </div>
    <div class="iconTitle"><span class="filler">{{ title }}</span></div>
  </div>
</template>

<script>
export default {
  name: "BigButton",

  props: {
    title: String,
  },

  methods: {
    clicked: function (){
      this.$emit("button-clicked")
    }
  }

}
</script>

<style scoped>

.content{
  display: inline-flex;
  flex-direction: column;
  flex-wrap: nowrap;
  background: #252927;
  padding: 15px;
  align-items: center;
}

.img-section{
  display: inline-flex;
  flex-direction: row;
  font-size: 80px;
  color: #6e7676;
}


.iconTitle{
  background-color: #2d3230;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
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