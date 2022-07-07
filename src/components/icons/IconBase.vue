<template>
  <div class="container">
    <svg xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         :viewBox="viewBox"
         :aria-labelledby="iconName">
      <title
          :id="iconName"
          lang="en"
      >{{ iconName }} icon</title>
      <g :fill="iconColor">
        <slot />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "IconBase",
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 64
    },
    height: {
      type: [Number, String],
      default: 64
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    viewBox: {
      type: String,
      default : '0 0 64 64'
    }
  },

  created() {
    document.documentElement.style.setProperty('--height', this.height)
    document.documentElement.style.setProperty('--width', this.width)
  }
}
</script>

<style scoped>
:root{
  --height: 64;
  --width: 64;
}

.container{
  height: var(--height);
  width: var(--width);

}
</style>