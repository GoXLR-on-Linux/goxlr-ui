<template>
  <div class="contextBox">
    <div class="label">Waveform</div>
    <div class="content">
      <div class="vertical_button" style="text-align: center" v-bind:class="{enabled: (activeSample !== -1)}" @click="playActiveSample()"><font-awesome-icon :icon="getPlaybackButton()"></font-awesome-icon></div>

      <div ref="wrapper" style="position: relative; width: 500px">
        <div class="drag_handle left" style="text-align: center" ref="left" v-bind:class="{enabled: (activeSample !== -1)}" @mousedown.stop="mouseDownLeft">|</div>
        <div class="drag_handle right" ref="right" style="text-align: center" v-bind:class="{enabled: (activeSample !== -1)}" @mousedown.stop="mouseDownRight">|</div>
        <div style="color: white; height: 170px; line-height: 85px; text-align: center">Waveform Coming Soon!<br/>&lt;-- Position Sliders Supported --&gt;</div>
      </div>

      <div class="vertical_button" style="text-align: center" v-bind:class="{enabled: (activeSample !== -1)}" @click="deleteActiveSample()"><font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon></div>
    </div>
  </div>
</template>

<script>
import {websocket} from "@/util/sockets";
import {store} from "@/store";
import {isDeviceMini} from "@/util/util";
export default {
  name: "AudioVisualiser",
  props: {
    activeBank: String,
    activeButton: String,
    activeSample: Number,
  },

  data() {
    return {
      positions: {
        parentOffset: 0,
        parentWidth: 0,

        elementOffset: 0,
        elementWidth: 0,
      },

      movingLeft: false,
      movingRight: false,

      leftPosition: "0px",
      rightPosition: "480px",
    }
  },

  methods: {
    playActiveSample() {
      if (this.activeSample === -1) {
        return;
      }

      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].is_playing) {
        websocket.send_command(store.getActiveSerial(), {"StopSamplePlayback": [this.activeBank, this.activeButton]});
      } else {
        websocket.send_command(store.getActiveSerial(), {"PlaySampleByIndex": [this.activeBank, this.activeButton, this.activeSample]});
      }
    },

    getPlaybackButton() {
      if (!store.hasActiveDevice() || isDeviceMini()) {
        return "fa-solid fa-play";
      }
      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].is_playing) {
        return "fa-solid fa-stop";
      }
      return "fa-solid fa-play";
    },

    deleteActiveSample() {
      if (this.activeSample === -1) {
        return;
      }

      websocket.send_command(store.getActiveSerial(), {"RemoveSampleByIndex": [this.activeBank, this.activeButton, this.activeSample]})
      this.$emit("deselect-sample");
    },

    mouseDownLeft(event) {
      if (this.activeSample === -1) {
        return;
      }

      this.movingLeft = true;
      this.mouseDown(event);
    },

    mouseDownRight(event) {
      if (this.activeSample === -1) {
        return;
      }

      this.movingRight = true;
      this.mouseDown(event);
    },

    mouseDown(event) {
      // Set the X position...
      this.positions.parentOffset = event.target.parentElement.getBoundingClientRect().x;
      this.positions.parentWidth = event.target.parentElement.clientWidth;

      this.positions.elementOffset = event.clientX - event.target.getBoundingClientRect().x;
      this.positions.elementWidth = event.target.clientWidth;

      window.onmousemove = this.mouseMove;
      window.onmouseup = this.mouseUp;
    },

    mouseUp() {
      this.movingLeft = false;
      this.movingRight = false;

      // Disable the Events..
      window.onmousemove = null;
      window.onmouseup = null;

      {
        // Calculate the left Percentage from the Positions...
        let wrapperWidth = this.$refs.wrapper.clientWidth - this.$refs.left.clientWidth;
        let leftPosition = parseInt(this.leftPosition);

        let percentage = 0;
        if (leftPosition > 0) {
          percentage = leftPosition / wrapperWidth * 100;
        }
        websocket.send_command(store.getActiveSerial(), { "SetSampleStartPercent": [this.activeBank, this.activeButton, this.activeSample, percentage] });
      }

      // Now for the Right...
      {
        let wrapperWidth = this.$refs.wrapper.clientWidth - this.$refs.left.clientWidth;
        let rightPosition = parseInt(this.rightPosition);
        let percentage = rightPosition / wrapperWidth * 100;
        websocket.send_command(store.getActiveSerial(), {"SetSampleStopPercent": [this.activeBank, this.activeButton, this.activeSample, percentage]});
      }
    },

    mouseMove(event) {
      event.preventDefault();
      if (this.movingLeft) {
        this.mouseMoveLeft(event);
        return;
      }
      this.mouseMoveRight(event);
    },

    mouseMoveLeft(event) {
      let position = event.clientX - this.positions.parentOffset - this.positions.elementOffset;
      if (position <= 0) {
        position = 0;
      }

      if (position >= this.positions.parentWidth - this.positions.elementWidth - this.positions.elementWidth) {
        position = this.positions.parentWidth - this.positions.elementWidth - this.positions.elementWidth;
      }

      // Check the right side of this box...
      let rightPosition = position + this.positions.elementWidth;
      let rightBar = parseInt(this.rightPosition);

      if (rightPosition > rightBar) {
        this.rightPosition = rightPosition + "px";
      }

      this.leftPosition = position + "px";
    },

    mouseMoveRight(event) {
      let position = event.clientX - this.positions.parentOffset - this.positions.elementOffset;
      if (position <= this.positions.elementWidth) {
        position = this.positions.elementWidth;
      }

      if (position >= this.positions.parentWidth - this.positions.elementWidth) {
        position = this.positions.parentWidth - this.positions.elementWidth;
      }

      let leftPosition = position;
      let leftBarRight = parseInt(this.leftPosition) + this.positions.elementWidth;
      if (leftPosition < leftBarRight) {
        this.leftPosition = position - this.positions.elementWidth + "px";
      }

      this.rightPosition = position + "px";
    },

    resolvePercentages() {
      if (this.activeSample === -1) {
        this.leftPosition = "0px";
        this.rightPosition = "480px";
        return;
      }

      let sample = store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].samples[this.activeSample];
      let start_pct = sample.start_pct;
      let stop_pct = sample.stop_pct;


      let wrapper = this.$refs.wrapper.clientWidth - this.$refs.left.clientWidth - this.$refs.right.clientWidth;
      this.leftPosition = ((start_pct / 100) * wrapper) + "px";
      this.rightPosition = ((stop_pct / 100) * (wrapper + this.$refs.left.clientWidth)) + "px";
    }
  },

  watch: {
    activeSample() {
      this.resolvePercentages();
    },
  },
}
</script>

<style scoped>
.vertical_button {
  height: 170px;
  width: 30px;
  margin-left: 6px;
  margin-right: 6px;
  background-color: #3b413f;

  color: #fff;
  line-height: 170px;
  padding-left: 6px;
  padding-right: 6px;
}

.vertical_button:hover.enabled {
  background-color: #49514e;
}

.drag_handle {
  position: absolute;

  height: 170px;
  width: 20px;

  background-color: #3b413f;
  color: #fff;
  line-height: 170px;
}

.drag_handle.left {
  left: v-bind(leftPosition);
}

.drag_handle.right {
  left: v-bind(rightPosition);
}

.drag_handle:hover.enabled {
  background-color: #49514e;
}

.contextBox {
  height: 220px;
  margin: 3px;
  background-color: #353937;
}

.content {
  height: 170px;

  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.label {
  padding: 10px;
  color: #fff;
  background-color: #3b413f;

  text-transform: uppercase;

  margin-bottom: 8px;
}
</style>
