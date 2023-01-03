<script>
export default {
  name: "ColorPicker",

  data() {
    return {
      hexString: "#000000",
      canvasContext: undefined,
      hoverContainer: undefined,
    }
  },

  props: {
    id: String,
    title: String,
    colorValue: String,
  },

  methods: {

    mouseMove(event) {
      const hoverContainerCenterOffset = 12

      this.hoverContainer.style.left = (event.pageX - hoverContainerCenterOffset) + "px";
      this.hoverContainer.style.top = (event.pageY - hoverContainerCenterOffset) + "px";

      const position = this.position(event)
      const color = this.color(position[0], position[1])
      this.hoverContainer.style.backgroundColor = color;
    },

    mouseLeave() {
      this.hoverContainer.style.left = "-30px";
      this.hoverContainer.style.top = "-30px";
    },

    mouseClick(event) {
      const position = this.position(event)
      const color = this.color(position[0], position[1])
      this.updateText(color);
    },

    position(event) {
      let rect = event.target.getBoundingClientRect();
      let x = Math.floor(event.clientX - rect.left);
      let y = Math.floor(event.clientY - rect.top);

      return [x, y];
    },

    color(x, y) {
      let color = this.canvasContext.getImageData(x, y, 1, 1).data;
      return "#" + ("000000" + this.hexColor(color[0], color[1], color[2])).slice(-6).toUpperCase();
    },

    hexColor(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    },

    updateText(value) {
      this.hexString = value;
      this.$emit('colour-changed', this.id, this.hexString);
    },

    updateColour(event) {
      let value = event.target.value;

      const regex = /^#([a-fA-Z0-9]{6})\b$/
      if (value.match(regex)) {
        this.updateText(value);
      }
    },

    clearColour() {
      this.updateText("#000000");
    }
  },

  mounted() {
    this.canvasContext = document.getElementById('wheelCanvas').getContext("2d");
    this.hoverContainer = document.getElementById("colourHover");
    this.hexString = this.colorValue;
  },

  watch: {
    colorValue: function () {
      this.hexString = this.colorValue;
    }
  }
}
</script>

<template>
  <div class="colorPicker">
    <div class="title">
      {{ title }}
    </div>

    <img src="wheel.png" draggable="false" @mousemove.stop="mouseMove" @mouseleave="mouseLeave" @click="mouseClick" />

    <div class="controls">
      <div class="colorPreview"></div>

      <input type="text" :value="hexString" @keyup="updateColour"/>

      <button class="clearButton" @click="clearColour">
        <font-awesome-icon title="Clear" icon="fa-solid fa-xmark" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.colorPicker {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 220px;
  width: 200px;

  margin: 3px;
  background-color: #353937;
}

.colorPicker:not(:last-child) {
  margin-right: 20px;
}

.title {
  width: 100%;
  padding: 10px 0;

  color: #ffffff;
  background-color: #3b413f;
  text-transform: uppercase;
}

.controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 35px;
  width: 100%;

  background-color: #3b413f;
  color: #59b1b6;
}

.colorPreview {
  height: 100%;
  width: 35px;

  background-color: v-bind(hexString);
}

.clearButton {
  height: 100%;
  width: 35px;
  
  color: #ffffff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

input[type=text] {
  width: 6em;

  color: #59b1b6;
  background-color: #3b413f;
  border: none;
  font-family: LeagueMonoCondensed, sans-serif;

  -moz-appearance: textfield;
}

img {
  height: 120px;
  width: 120px;
  border-radius: 50%;
}

img:hover {
  cursor: none;
}

</style>
