<template>
  <div class="colourBox">
    <div class="label">{{ title }}</div>

    <img src="wheel.png" draggable="false" @mousemove.stop="mouseMove" @mouseleave="mouseLeave" @click="mouseClick"/>

    <div class="bottom" style="display: flex">
      <div class="colourRef"></div>
      <div style="text-align: left">
        <input type="text" :value="textValue" @keyup="updateColour"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ColourBox",

  data() {
    return {
      textValue: "#ff0000",
      canvasContext: undefined,
      hoverContainer: undefined,
    }
  },

  props: {
    id: String,
    title: String,
    colourValue: String,
  },

  methods: {

    mouseMove(event) {
      this.hoverContainer.style.left = (event.pageX - 12) + "px";
      this.hoverContainer.style.top = (event.pageY - 12) + "px";
      this.hoverContainer.style.backgroundColor = this.getHoveredColourFromArray(this.getPositionFrom(event));
    },

    mouseLeave() {
      this.hoverContainer.style.left = "-30px";
      this.hoverContainer.style.top = "-30px";
    },

    mouseClick(event) {
      this.updateText(this.getHoveredColourFromArray(this.getPositionFrom(event)));
    },

    getHoveredColourFromArray(position) {
      return this.getHoveredColour(position[0], position[1]);
    },

    getHoveredColour(x, y) {
      let colour = this.canvasContext.getImageData(x, y, 1, 1).data;
      return "#" + ("000000" + this.rgbToHex(colour[0], colour[1], colour[2])).slice(-6).toUpperCase();
    },

    getPositionFrom(event) {
      let rect = event.target.getBoundingClientRect();
      let x = Math.floor(event.clientX - rect.left);
      let y = Math.floor(event.clientY - rect.top);

      return [x, y];
    },

    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    },

    updateText(value) {
      this.textValue = value;
      this.$emit('colour-changed', this.id, this.textValue);
    },
    updateColour(event) {
      let value = event.target.value;

      const regex = /^#([a-fA-Z0-9]{6})\b$/
      if (value.match(regex)) {
        this.updateText(value);
      }
    }
  },

  mounted() {
    this.canvasContext = document.getElementById('wheelCanvas').getContext("2d");
    this.hoverContainer = document.getElementById("colourHover");
    this.textValue = this.colourValue;
  },

  watch: {
    colourValue: function () {
      this.textValue = this.colourValue;
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

.bottom {
  background-color: #3b413f;
  color: #59b1b6;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
}

.colourRef {
  background-color: v-bind(textValue);
  width: 35px;
}

input[type=text] {
  font-family: LeagueMonoCondensed, sans-serif;
  background-color: #3b413f;
  color: #59b1b6;
  box-sizing: border-box;
  text-align: center;

  padding: 10px;
  border: none;
  background-image: none;
  box-shadow: none;
  outline: none;

  -moz-appearance: textfield;
  width: calc(100% - 35px);
}

img {
  border-radius: 50%;
}

img:hover {
  cursor: none;
}

</style>
