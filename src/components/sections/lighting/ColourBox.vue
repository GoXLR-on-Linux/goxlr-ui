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
    },
    clearColour() {
      this.updateText("#000000");
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

<template>
  <div class="colourBox">
    <div class="label">{{ title }}</div>

    <img src="wheel.png" draggable="false" @mousemove.stop="mouseMove" @mouseleave="mouseLeave" @click="mouseClick"/>

    <div class="bottom">
      <div class="colourRef"></div>
      <input type="text" :value="textValue" @keyup="updateColour"/>
      <button class="clearColour" @click="clearColour"><font-awesome-icon title="Clear" icon="fa-solid fa-xmark" /></button>
    </div>

  </div>
</template>

<style scoped>
.colourBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 220px;
  width: 200px;

  margin: 3px;
  background-color: #353937;
}

.colourBox:not(:last-child) {
  margin-right: 20px;
}

.label {
  width: 100%;
  padding: 10px 0;

  color: #fff;
  background-color: #3b413f;
  text-transform: uppercase;
}

.bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 35px;
  width: 100%;

  background-color: #3b413f;
  color: #59b1b6;
}

.colourRef {
  height: 100%;
  width: 35px;

  background-color: v-bind(textValue);
}

.clearColour {
  height: 100%;
  width: 35px;
  
  /** Remove default button styling */
  background-color: transparent;
  color: #fff;
  border: 0;
  cursor: pointer;
}

input[type=text] {
  width: 6em;

  font-family: LeagueMonoCondensed, sans-serif;

  /** Remove default input styling */
  background-color: #3b413f;
  color: #59b1b6;
  text-align: center;
  border: none;
  background-image: none;
  box-shadow: none;
  outline: none; 

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
