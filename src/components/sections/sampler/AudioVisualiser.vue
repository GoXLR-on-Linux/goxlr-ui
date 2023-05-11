<template>
  <WidgetContainer style="width: fit-content">
    <template v-slot:title>Waveform</template>
    <div class="content" role="group" :aria-label="`Waveform for ${sampleName}`">
      <button class="vertical_button" :aria-label="getPlaybackLabel()" style="text-align: center"
        v-bind:class="{ enabled: (activeSample !== -1) }" @click="playActiveSample()"><font-awesome-icon
          :icon="getPlaybackButton()"></font-awesome-icon></button>

      <div ref="wrapper" style="position: relative; width: 500px; background-color: #252927">
        <div class="drag_handle left" style="text-align: center" ref="left"
          v-bind:class="{ enabled: (activeSample !== -1) }" @mousedown.stop="mouseDownLeft">|</div>
        <div class="drag_handle right" ref="right" style="text-align: center"
          v-bind:class="{ enabled: (activeSample !== -1) }" @mousedown.stop="mouseDownRight">|</div>
        <div id="waveform" class="waveform"></div>
      </div>

      <button class="vertical_button" aria-label="Remove Sample" style="text-align: center"
        v-bind:class="{ enabled: (activeSample !== -1) }" @click="deleteActiveSample()"><font-awesome-icon
          icon="fa-solid fa-trash"></font-awesome-icon></button>
    </div>
  </WidgetContainer>
</template>

<script>
import { websocket, getBaseHTTPAddress } from "@/util/sockets";
import { store } from "@/store";
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import WaveSurfer from "wavesurfer.js/dist/wavesurfer";


export default {
  name: "AudioVisualiser",
  components: { WidgetContainer },
  props: {
    activeBank: String,
    activeButton: String,
    activeSample: Number,
    sampleName: String,
    samplePath: String,
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

      wavesurfer: undefined,
    }
  },

  methods: {
    playActiveSample() {
      if (this.activeSample === -1) {
        return;
      }

      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].is_playing) {
        websocket.send_command(store.getActiveSerial(), { "StopSamplePlayback": [this.activeBank, this.activeButton] });
      } else {
        websocket.send_command(store.getActiveSerial(), { "PlaySampleByIndex": [this.activeBank, this.activeButton, this.activeSample] });
      }
    },

    getPlaybackButton() {
      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].is_playing) {
        return "fa-solid fa-stop";
      }
      return "fa-solid fa-play";
    },

    getPlaybackLabel() {
      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].is_playing) {
        return "Stop Playback";
      }
      return "Playback Sample";
    },

    deleteActiveSample() {
      if (this.activeSample === -1) {
        return;
      }

      websocket.send_command(store.getActiveSerial(), { "RemoveSampleByIndex": [this.activeBank, this.activeButton, this.activeSample] })
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

        console.log(leftPosition);
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
        websocket.send_command(store.getActiveSerial(), { "SetSampleStopPercent": [this.activeBank, this.activeButton, this.activeSample, percentage] });
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

  mounted() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      height: 173 / 2,
      interact: false,
      splitChannels: true,
      hideScrollbar: true,
      waveColor: "#d7d7d7",
      cursorWidth: 0,
      progressColor: "#d7d7d7",
    });
  },

  watch: {
    activeSample() {
      this.resolvePercentages();
    },

    sampleName() {
      if (this.sampleName === "") {
        this.wavesurfer.empty();
        return;
      }

      let url = getBaseHTTPAddress();
      url = url + "files/samples/" + this.sampleName;

      this.wavesurfer.load(url)
      console.log("Sample name Changed! " + this.sampleName);
    }
  },
}
</script>

<style scoped>
.vertical_button {
  height: 100%;
  width: 30px;
  margin-left: 6px;
  margin-right: 6px;
  background-color: #3b413f;

  color: #fff;
  line-height: 170px;
  padding-left: 6px;
  padding-right: 6px;

  border: 0;
}

.vertical_button:hover.enabled {
  background-color: #49514e;
}

.vertical_button:not(.enabled) {
  background-color: #2B2F2D;
}

.drag_handle {
  position: absolute;

  height: 100%;
  width: 20px;

  background-color: #3b413f;
  color: #fff;
  line-height: 170px;

  z-index: 3;
}

.drag_handle:not(.enabled) {
  background-color: #2B2F2D;
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

.waveform {
  margin-left: 20px;
  margin-right: 20px;
  color: white;
  height: 173px;
  z-index: 0;
  background-color: #252927;
}

.content {
  height: 100%;
  padding-top: 6px;
  padding-bottom: 6px;

  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
