<template>
  <WidgetContainer style="width: fit-content;" max_width="fit-content">
    <template v-slot:title>{{ $t('message.sampler.samples.waveform.title') }}</template>
    <div
        class="content"
        role="group"
        :aria-label="$t('message.sampler.samples.waveform.text', {sample: sampleName})"
    >
      <button
          class="vertical_button"
          :aria-label="getPlaybackLabel()"
          style="text-align: center"
          @click="playActiveSample()"
          :disabled="activeSample === -1"
      >
        <font-awesome-icon :icon="getPlaybackButton()"></font-awesome-icon>
      </button>

      <div
          ref="wrapper"
          style="position: relative; width: 500px; background-color: #252927"
          role="group"
          :aria-label="$t('message.sampler.samples.waveform.title')"
      >
        <div class="cover cover_left"></div>
        <div class="cover cover_right"></div>
        <div
            class="drag_handle left"
            ref="left"
            v-bind:class="{ enabled: activeSample !== -1 }"
            @mousedown.stop="mouseDownLeft"
            @keydown="keyDown"
            role="slider"
            :aria-label="$t('message.sampler.samples.waveform.sampleStart')"
            :aria-disabled="activeSample === -1"
            tabindex="0"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="+leftPercentage.toFixed(2)"
            :aria-valuetext="`${+leftPercentage.toFixed(2)}` + $t('message.suffixes.percentage')"
        >
          |
        </div>
        <div
            class="drag_handle right"
            ref="right"
            v-bind:class="{ enabled: activeSample !== -1 }"
            @keydown="keyDown"
            @mousedown.stop="mouseDownRight"
            role="slider"
            :aria-label="$t('message.sampler.samples.waveform.sampleEnd')"
            tabindex="0"
            :aria-disabled="activeSample === -1"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-valuenow="+rightPercentage.toFixed(2)"
            :aria-valuetext="`${+rightPercentage.toFixed(2)}` + $t('message.suffixes.percentage')"
        >
          |
        </div>
        <div id="waveform" class="waveform"></div>
      </div>

      <button
          class="vertical_button"
          aria-label="Remove Sample"
          style="text-align: center"
          @click="deleteActiveSample()"
          :disabled="activeSample === -1"
      >
        <font-awesome-icon icon="fa-solid fa-trash"></font-awesome-icon>
      </button>
    </div>
  </WidgetContainer>
</template>

<script>
import {websocket, getBaseHTTPAddress} from "@/util/sockets";
import {store} from "@/store";
import WidgetContainer from "@/components/containers/WidgetContainer.vue";
import WaveSurfer from "wavesurfer.js/dist/wavesurfer";

export default {
  name: "AudioVisualiser",
  components: {WidgetContainer},
  props: {
    activeBank: String,
    activeButton: String,
    activeSample: Number,
    sampleName: String,
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

      leftPosition: 0,
      rightPosition: 480,
      leftPercentage: 0,
      rightPercentage: 100,
      stepper: 10,

      wavesurfer: undefined,
    };
  },

  methods: {
    playActiveSample() {
      if (this.activeSample === -1) {
        return;
      }

      if (
          store.getActiveDevice().sampler.banks[this.activeBank][
              this.activeButton
              ].is_playing
      ) {
        websocket.send_command(store.getActiveSerial(), {
          StopSamplePlayback: [this.activeBank, this.activeButton],
        });
      } else {
        websocket.send_command(store.getActiveSerial(), {
          PlaySampleByIndex: [
            this.activeBank,
            this.activeButton,
            this.activeSample,
          ],
        });
      }
    },

    getPlaybackButton() {
      if (
          store.getActiveDevice().sampler.banks[this.activeBank][
              this.activeButton
              ].is_playing
      ) {
        return "fa-solid fa-stop";
      }
      return "fa-solid fa-play";
    },

    getPlaybackLabel() {
      if (
          store.getActiveDevice().sampler.banks[this.activeBank][
              this.activeButton
              ].is_playing
      ) {
        return this.$t('message.sampler.samples.waveform.stopSample');
      }
      return this.$t('message.sampler.samples.waveform.playbackSample');
    },

    deleteActiveSample() {
      if (this.activeSample === -1) {
        return;
      }

      websocket.send_command(store.getActiveSerial(), {
        RemoveSampleByIndex: [
          this.activeBank,
          this.activeButton,
          this.activeSample,
        ],
      });
      store.setAccessibilityNotification(
          "polite",
          $t('message.sampler.samples.waveform.sampleDeleted', {
            sampleName: this.sampleName,
            activeButton: this.activeButton,
            bank: this.activeBank
          })
      );
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
      this.positions.parentOffset =
          event.target.parentElement.getBoundingClientRect().x;
      this.positions.parentWidth = event.target.parentElement.clientWidth;

      this.positions.elementOffset =
          event.clientX - event.target.getBoundingClientRect().x;
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
        let wrapperWidth =
            this.$refs.wrapper.clientWidth -
            this.$refs.left.clientWidth -
            this.$refs.right.clientWidth;
        this.leftPercentage = 0;
        if (this.leftPosition > 0) {
          this.leftPercentage = (this.leftPosition / wrapperWidth) * 100;
        }
        websocket.send_command(store.getActiveSerial(), {
          SetSampleStartPercent: [
            this.activeBank,
            this.activeButton,
            this.activeSample,
            this.leftPercentage,
          ],
        });
      }

      // Now for the Right...
      {
        let wrapperWidth =
            this.$refs.wrapper.clientWidth -
            this.$refs.left.clientWidth -
            this.$refs.right.clientWidth;
        let rightPosition = this.rightPosition - this.$refs.left.clientWidth;
        this.rightPercentage = (rightPosition / wrapperWidth) * 100;
        websocket.send_command(store.getActiveSerial(), {
          SetSampleStopPercent: [
            this.activeBank,
            this.activeButton,
            this.activeSample,
            this.rightPercentage,
          ],
        });
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
      let position =
          event.clientX -
          this.positions.parentOffset -
          this.positions.elementOffset;
      if (position <= 0) {
        position = 0;
      }

      if (
          position >=
          this.positions.parentWidth -
          this.positions.elementWidth -
          this.positions.elementWidth
      ) {
        position =
            this.positions.parentWidth -
            this.positions.elementWidth -
            this.positions.elementWidth;
      }

      // Check the right side of this box...
      let rightPosition = position + this.positions.elementWidth;
      let rightBar = this.rightPosition;

      if (rightPosition > rightBar) {
        this.rightPosition = Math.round(rightPosition);
      }

      this.leftPosition = Math.round(position);
    },

    mouseMoveRight(event) {
      let position =
          event.clientX -
          this.positions.parentOffset -
          this.positions.elementOffset;
      if (position <= this.positions.elementWidth) {
        position = this.positions.elementWidth;
      }

      if (
          position >=
          this.positions.parentWidth - this.positions.elementWidth
      ) {
        position = this.positions.parentWidth - this.positions.elementWidth;
      }

      let leftPosition = position;
      let leftBarRight = this.leftPosition + this.positions.elementWidth;
      if (leftPosition < leftBarRight) {
        this.leftPosition = position - this.positions.elementWidth;
      }

      this.rightPosition = Math.round(position);
    },

    resolvePercentages() {
      if (this.activeSample === -1) {
        this.leftPosition = 0;
        this.rightPosition = 480;
        return;
      }

      let sample =
          store.getActiveDevice().sampler.banks[this.activeBank][
              this.activeButton
              ].samples[this.activeSample];
      let start_pct = sample.start_pct;
      let stop_pct = sample.stop_pct;

      // This gives us the size of the 'usable' sample (500px)
      let wrapper = this.$refs.wrapper.clientWidth;

      // We need to focus on the 'Right' side of the left handle, so pull this down so the max left value is correct (460px)
      let audio = wrapper - this.$refs.left.clientWidth - this.$refs.right.clientWidth;
      this.leftPercentage = start_pct;

      if (this.leftPercentage > 100) {
        console.log("Something is wrong with the left value max.. Correcting!");
        // Something's gone wrong, and a percentage is higher than it should be, Reset.
        this.leftPercentage = 100;
        this.leftPosition = 0;
        this.mouseUp();
      }

      if (this.leftPercentage < 0) {
        console.log("Something is wrong with the left value min.. Correcting!");
        this.leftPercentage = 0;
        this.leftPosition = audio;
        this.mouseUp();
      }

      // We need the right side of the left handle to be correct, so our left is simply the percentage
      // in the audio section.
      this.leftPosition = Math.round((start_pct / 100) * audio);

      // For the right side, we need to focus on the *LEFT* side..
      this.rightPercentage = stop_pct;

      // For the right handle, we need our percentage position in the audio, then we need to add the
      // width of the left handle to get the correct position.
      this.rightPosition = Math.round((stop_pct / 100) * audio);
      this.rightPosition += this.$refs.left.clientWidth;

      if (this.rightPercentage > 100) {
        // Something's gone wrong, and a percentage is higher than it should be, Reset.
        console.log(
            "Something is wrong with the right value max.. Correcting!"
        );
        this.rightPercentage = 100;
        this.rightPosition = audio + this.$refs.left.clientWidth;
        this.mouseUp();
      }

      if (this.rightPercentage < 0) {
        console.log(
            "Something is wrong with the right value min.. Correcting!"
        );
        this.rightPercentage = 0;
        this.rightPosition = this.$refs.left.clientWidth;
        this.mouseUp();
      }
    },
    keyDown(event) {
      if (this.activeSample === -1) {
        return;
      }
      //space bar is responsible for toggling playback of the sample
      if (event.keyCode === 32) {
        event.preventDefault();
        this.playActiveSample();
        return;
      }
      //store the active slider by ref
      let activeSlider = event.target;
      //valid steppers are used to controll the step size, which will be done via ctrl+pageup/pagedown
      let validSteppers = [1, 3, 5, 7, 10, 15, 20, 30, 50, 100];
      //for left arrow, move the slider left by the step size. If the slider is the right one, move the left slider's position if they will collide
      if (event.keyCode === 37) {
        event.preventDefault();
        if (activeSlider === this.$refs.left) {
          let newPosition = this.leftPosition - this.stepper;
          if (newPosition < 0) {
            newPosition = 0;
          }
          if (newPosition > this.rightPosition - this.$refs.left.clientWidth) {
            newPosition = this.rightPosition - this.$refs.left.clientWidth;
          }
          this.leftPosition = newPosition;
        } else {
          let newPosition = this.rightPosition - this.stepper;
          if (newPosition < this.leftPosition + this.$refs.left.clientWidth) {
            newPosition = this.leftPosition + this.$refs.left.clientWidth;
          }
          if (
              newPosition >
              this.$refs.wrapper.clientWidth - this.$refs.right.clientWidth
          ) {
            newPosition =
                this.$refs.wrapper.clientWidth - this.$refs.right.clientWidth;
          }
          this.rightPosition = newPosition;
        }
        //call mouseUp to send the new position to the device
        this.mouseUp();
        return;
      }
      //same operation for right arrow
      if (event.keyCode === 39) {
        event.preventDefault();
        if (activeSlider === this.$refs.left) {
          let newPosition = this.leftPosition + this.stepper;
          if (newPosition > this.rightPosition - this.$refs.left.clientWidth) {
            newPosition = this.rightPosition - this.$refs.left.clientWidth;
          }
          if (
              newPosition >
              this.$refs.wrapper.clientWidth - this.$refs.left.clientWidth
          ) {
            newPosition =
                this.$refs.wrapper.clientWidth - this.$refs.left.clientWidth;
          }
          this.leftPosition = newPosition;
        } else {
          let newPosition = this.rightPosition + this.stepper;
          if (
              newPosition >
              this.$refs.wrapper.clientWidth - this.$refs.right.clientWidth
          ) {
            newPosition =
                this.$refs.wrapper.clientWidth - this.$refs.right.clientWidth;
          }
          if (newPosition < this.leftPosition + this.$refs.left.clientWidth) {
            newPosition = this.leftPosition + this.$refs.left.clientWidth;
          }
          this.rightPosition = newPosition;
        }
        this.mouseUp();
        return;
      }
      //home and end, check colisions and move the slider to the left or right edge
      if (event.keyCode === 36) {
        event.preventDefault();
        if (activeSlider === this.$refs.left) {
          this.leftPosition = 0;
        } else {
          this.rightPosition = this.leftPosition + this.$refs.left.clientWidth;
        }
        this.mouseUp();
        return;
      }
      if (event.keyCode === 35) {
        event.preventDefault();
        if (activeSlider === this.$refs.left) {
          this.leftPosition = this.rightPosition - this.$refs.left.clientWidth;
        } else {
          this.rightPosition =
              this.$refs.wrapper.clientWidth - this.$refs.right.clientWidth;
        }
        this.mouseUp();
        return;
      }
      //pageup/ pagedown, change the step size
      if (event.keyCode === 33) {
        event.preventDefault();
        let index = validSteppers.indexOf(this.stepper);
        if (index > 0) {
          this.stepper = validSteppers[index - 1];
        }
        store.setAccessibilityNotification(
            "polite",
            $t('message.sampler.samples.waveform.zoomLevel', {level: this.stepper})
        );
        return;
      }
      if (event.keyCode === 34) {
        event.preventDefault();
        let index = validSteppers.indexOf(this.stepper);
        if (index < validSteppers.length - 1) {
          this.stepper = validSteppers[index + 1];
        }
        store.setAccessibilityNotification(
            "polite",
            $t('message.sampler.samples.waveform.zoomLevel', {level: this.stepper})
        );
      }
    },
  },

  mounted() {
    this.wavesurfer = WaveSurfer.create({
      container: "#waveform",
      height: 173 / 2,
      interact: false,
      splitChannels: true,
      hideScrollbar: true,
      waveColor: "#d7d7d7",
      cursorWidth: 0,
      progressColor: "#d7d7d7",
    });
  },

  computed: {
    left_handle_left() {
      return this.leftPosition + "px";
    },

    right_handle_left() {
      return this.rightPosition + "px";
    },

    cover_right_width() {
      return (
          this.$refs.wrapper.clientWidth -
          this.rightPosition -
          this.$refs.right.clientWidth +
          "px"
      );
    },

    cover_right_left() {
      return this.rightPosition + this.$refs.right.clientWidth + "px";
    },
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

      this.wavesurfer.load(url);
    },
  },
};
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

.vertical_button:hover:not(:disabled) {
  background-color: #49514e;
}

.vertical_button:disabled {
  background-color: #2b2f2d;
}

.drag_handle {
  position: absolute;

  height: 100%;
  width: 20px;

  background-color: #3b413f;
  color: #fff;
  line-height: 170px;

  text-align: center;

  z-index: 3;
}

.drag_handle:not(.enabled) {
  background-color: #2b2f2d;
}

.drag_handle.left {
  left: v-bind(left_handle_left);
}

.drag_handle.right {
  left: v-bind(right_handle_left);
}

.drag_handle:hover.enabled {
  background-color: #49514e;
}

.cover {
  position: absolute;
  background-color: rgb(45, 50, 48, 0.9);
  height: 173px;
  z-index: 3;
}

.cover_left {
  left: 0;
  width: v-bind(left_handle_left);
}

.cover_right {
  left: v-bind(cover_right_left);
  width: v-bind(cover_right_width);
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
