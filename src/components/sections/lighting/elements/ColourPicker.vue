<script>
import WidgetContainer from "@/components/containers/WidgetContainer.vue";

export default {
  name: "ColourPicker",
  components: {
    WidgetContainer
  },

  data() {
    return {
      hexString: "#000000",
      canvasContext: undefined,
      hoverContainer: undefined,
    }
  },

  props: {
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
      this.$emit('colour-changed', this.hexString);
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
  <WidgetContainer :title="title">
    <slot>
      <div class="spacer"></div>
      <img src="wheel.png" draggable="false" @mousemove.stop="mouseMove" @mouseleave="mouseLeave" @click="mouseClick"
        role="button" tabindex="0" :aria-label="`${title}, Colour Picker`" />
      <div class="spacer"></div>
      <div class="controls">
        <div class="colourPreview"></div>

        <input type="text" :value="hexString" @keyup="updateColour" :aria-label="title" />

        <button @click="clearColour" :aria-label="`Clear ${title}`">
          <font-awesome-icon title="Clear" icon="fa-solid fa-xmark" />
        </button>
      </div>
    </slot>
  </WidgetContainer>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.spacer {
  flex-grow: 1;
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

.colourPreview {
  height: 100%;
  width: 35px;

  background-color: v-bind(hexString);
}

button {
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
  text-align: center;

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
