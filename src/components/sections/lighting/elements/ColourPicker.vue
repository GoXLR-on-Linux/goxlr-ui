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

      active: false,
      outside: false,
    }
  },

  props: {
    title: String,
    colorValue: String,
  },

  methods: {
    mouseDown() {
      this.$refs.target.classList.add("active");
      this.active = true;
    },

    mouseOut() {
      this.$refs.target.classList.remove("active");
      this.active = false;

      // Check if the cursor is outside the image...
      if (this.outside) {
        this.hoverContainer.style.left = "-30px";
        this.hoverContainer.style.top = "-30px";
      }
    },

    mouseUp(event) {
      if (!this.active) {
        return;
      }

      this.$refs.target.classList.remove("active");
      this.active = false;

      if (this.outside) {
        this.hoverContainer.style.left = "-30px";
        this.hoverContainer.style.top = "-30px";

        // We need to set the colour released..
        let position = this.getOutsidePosition(event);
        const color = this.color(position[0], position[1]);
        this.updateText(color);
      }
    },

    mouseMoveOutside(event) {
      const hoverContainerCenterOffset = 12

      if (this.active) {
        // mudtsu on discord is entirely responsible for making me do math.

        // Firstly, calculate the central position of the image (top spacer + half height)
        let position = this.getOutsidePosition(event);


        // Shove the dot there.
        this.hoverContainer.style.left = (position[2] - hoverContainerCenterOffset) + "px";
        this.hoverContainer.style.top = (position[3] - hoverContainerCenterOffset) + "px";

        // Update the colour for these coordinates..
        const color = this.color(position[0], position[1])
        this.hoverContainer.style.backgroundColor = color;
      }
    },

    getOutsidePosition(event) {
      let radius = 60;

      let middleY = this.$refs.target.clientHeight / 2;
      let middleX = this.$refs.target.clientWidth / 2;

      // These are the relative X,Y relative to the middle of the image
      let relativeX = (event.pageX - this.$refs.target.offsetLeft - middleX);
      let relativeY = (event.pageY - this.$refs.target.offsetTop - middleY);

      // Get the distance between the middle and our cursor
      let distance = Math.sqrt(Math.pow(relativeX, 2) + Math.pow(relativeY, 2));
      let normalX = relativeX / distance;
      let normalY = relativeY / distance;

      let resultX = (normalX * radius);
      let resultY = (normalY * radius);

      let positionX = this.$refs.target.offsetLeft + middleX + resultX;
      let positionY = this.$refs.target.offsetTop + middleY + resultY;

      return [resultX + radius, resultY + radius, positionX, positionY];
    },

    mouseMove(event) {
      const hoverContainerCenterOffset = 12

      this.hoverContainer.style.left = (event.pageX - hoverContainerCenterOffset) + "px";
      this.hoverContainer.style.top = (event.pageY - hoverContainerCenterOffset) + "px";

      const position = this.position(event)
      const color = this.color(position[0], position[1])
      this.hoverContainer.style.backgroundColor = color;
    },

    mouseLeave() {
      if (!this.active) {
        this.hoverContainer.style.left = "-30px";
        this.hoverContainer.style.top = "-30px";
      }
      this.outside = true;
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
      <div class="colourTarget" ref="target" @mouseleave="mouseOut" @mouseup="mouseUp" @mousemove="mouseMoveOutside">
        <div class="spacer"></div>
        <img src="/wheel.png" ref="circle" draggable="false" @mousedown="mouseDown" @mousemove.stop="mouseMove"
             @mouseleave="mouseLeave" @click="mouseClick"
             role="button" tabindex="0" :aria-label="`${title}, Colour Picker`"/>
        <div class="spacer"></div>
      </div>
      <div class="controls">
        <div class="colourPreview"></div>
        <input type="text" :value="hexString" @keyup="updateColour" :aria-label="title"/>

        <button @click="clearColour" :aria-label="`Clear ${title}`">
          <font-awesome-icon title="Clear" icon="fa-solid fa-xmark"/>
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
  /*flex-grow: 1;*/
  height: 14px;
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

.colourTarget {
  width: 100%;
  text-align: center;
}

</style>
