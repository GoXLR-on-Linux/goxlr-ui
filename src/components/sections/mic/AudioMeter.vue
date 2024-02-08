<script>
import {websocket} from "@/util/sockets";
import {store} from "@/store";

export default {
  name: "AudioMeter",

  props: {
    active: {type: Boolean, required: true},
    fade_below: {type: Number, required: false}
  },

  data() {
    return {
      active_local: false,

      canvas: undefined,
      canvas_size: {
        width: 0,
        height: 0
      },

      minimum_value: -60,

      points: [],
      point_count: 30,

      poll_rate: 100,
      last_paint: 0
    }
  },

  methods: {
    stop: function() {
      this.active_local = false;
    },

    pollData: function () {
      let self = this

      websocket.get_mic_level(store.getActiveSerial()).then((data) => {
        let value = data['MicLevel']
        if (value < this.minimum_value) {
          value = this.minimum_value
        }

        let minimum_value = this.minimum_value * -1
        let y = (value / minimum_value) * -1 * self.canvas_size.height

        self.points.push({
          x: self.canvas_size.width,
          y: y
        })

        while (self.points.length > this.point_count) {
          self.points.shift()
        }

        if (self.active_local) {
          setTimeout(this.pollData, this.poll_rate)
        } else {
          console.log("STOPPED..");
          this.points = []
        }
      })
    },

    draw: function (timestamp) {
      // Work out if we should draw...
      if (!this.active_local || this.points.length === 0) {
        requestAnimationFrame(this.draw)
        return
      }

      // Create a delta since last frame..
      let delta = timestamp - this.last_paint

      // Shift the Canvas...
      this.move_canvas(delta)

      this.draw_peaking()
      this.draw_text("Peaking", -10, 0);

      this.draw_good()
      this.draw_text("Speaking Area", -20, -10);

      this.draw_db_lines()

      // Draw the Points..
      this.canvas.strokeStyle = 'white'

      // Begin the Path..
      let f = 0.3
      let t = 0.6
      let dx1 = 0,
          dy1 = 0

      this.canvas.beginPath()
      this.canvas.moveTo(this.points[0].x, this.points[0].y)

      let previous_point = this.points[0]
      for (let i = 0; i < this.points.length; i++) {
        let dx2 = 0,
            dy2 = 0

        let current_point = this.points[i]
        let next_point = this.points[i + 1]
        if (next_point !== undefined) {
          let m = this.gradient(previous_point, next_point)
          dx2 = (next_point.x - current_point.x) * -f
          dy2 = dx2 * m * t
        }

        this.canvas.bezierCurveTo(
            previous_point.x - dx1,
            previous_point.y - dy1,
            current_point.x + dx2,
            current_point.y + dy2,
            current_point.x,
            current_point.y
        )
        dx1 = dx2
        dy1 = dy2
        previous_point = current_point
      }
      this.canvas.stroke()

      if (this.fade_below !== undefined) {
        this.draw_fade_below();
      }

      // Update the last paint time..
      this.last_paint = timestamp

      // Call back on the next animation frame
      requestAnimationFrame(this.draw)
    },

    draw_peaking: function () {
      this.canvas.fillStyle = 'rgba(255, 0, 0, 0.2)'
      let top = this.get_db_position(-0)
      let bottom = this.get_db_position(-10) - top

      // Find out where -10db is..
      this.canvas.fillRect(0, top, this.canvas_size.width, bottom)
    },

    draw_good: function () {
      this.canvas.fillStyle = 'rgba(0, 255, 0, 0.2)'

      let top = this.get_db_position(-10)
      let bottom = this.get_db_position(-20) - top
      this.canvas.fillRect(0, top, this.canvas_size.width, bottom)
    },

    draw_text: function(text, min, max) {
      this.canvas.fillStyle = '#fff';
      this.canvas.font = "12px LeagueMonoCondensed";
      this.canvas.textBaseline = "middle";

      let top = this.get_db_position(max)
      let bottom = this.get_db_position(min)
      let middle = (bottom - top) / 2

      let position = top + (middle)

      this.canvas.fillText(text, 10, position);
    },

    draw_fade_below: function() {
      this.canvas.fillStyle = 'rgba(0,0,0,0.5)';

      let start = this.get_db_position(this.fade_below);
      this.canvas.fillRect(0, start, this.canvas_size.width, this.canvas_size.height);

      this.canvas.strokeStyle = '#fff';
      this.canvas.beginPath();
      this.canvas.moveTo(0, start);
      this.canvas.lineTo(this.canvas_size.width, start);
      this.canvas.stroke();

    },

    draw_db_lines: function () {
      for (let i = 0; i < 7; i++) {
        let value = i * -10
        let position = this.get_db_position(value)

        this.canvas.strokeStyle = 'rgb(50, 50, 50)'
        this.canvas.beginPath()
        this.canvas.moveTo(0, position)
        this.canvas.lineTo(this.canvas_size.width, position)
        this.canvas.stroke()
      }
    },

    get_db_position: function (dB) {
      let minimum_value = this.minimum_value * -1
      return (dB / minimum_value) * -1 * this.canvas_size.height
    },

    // A simple method which will move the canvas X pixels, dictated by 'speed'
    move_canvas: function (delta) {
      let w = this.canvas_size.width
      let h = this.canvas_size.height

      // Clear the Canvas..
      this.canvas.clearRect(0, 0, w, h)

      // How long it should take a point to move across the screen..
      // 100ms * 30 points = 3 seconds
      let time_to_cross = this.poll_rate * this.point_count

      // How much time has passed based on the delta?
      let frame_movement = (delta / time_to_cross) * w

      this.points.forEach((value) => {
        value.x -= frame_movement
      })
    },

    gradient: function (a, b) {
      return (b.y - a.y) / (b.x - a.x)
    }
  },

  mounted() {
    let canvas = this.$refs['canvas']
    this.canvas_size = {
      width: canvas.width,
      height: canvas.height
    }

    this.canvas = canvas.getContext('2d', { willReadFrequently: true })

    // Ok, configure the canvas..
    this.canvas.strokeStyle = '#00ff00'
    this.canvas.fillStyle = '#00ff00'
    this.canvas.lineWidth = 2

    this.draw()

    if (this.active) {
      this.active_local = true;
      this.pollData();
    }
  },

  watch: {
    active(newValue) {
      console.log("Local Active Starting..");
      this.active_local = newValue;
      if (newValue === true) {
        this.pollData();
      }
    }
  }
}
</script>

<template>
  <div style="width: 420px; overflow: hidden" aria-hidden="true">
        <canvas
            ref="canvas"
            id="canvas"
            width="450"
            height="215"
            style="background-color: rgba(0, 0, 0, 0.2)"
        ></canvas>
  </div>
</template>

<style scoped>

</style>