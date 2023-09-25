<script>
export default {
  props: {
    val: {
      type: Number,
      default: 0
    },
    showPeaks: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      peakVal: 0
    }
  },
  computed: {},
  watch: {
    val: function (newVal) {
      let smoothingFactor = 50;
      if (newVal > this.peakVal) {
        this.peakVal = newVal;
      } else {
        this.peakVal = newVal * (1 / smoothingFactor) + this.peakVal * ((smoothingFactor - 1) / smoothingFactor);
      }
    }
  },
  directives: {
    drawMeter: function (canvas, binding) {
      // Lowest value we'll receive from the GoXLR is -72db
      let amp = binding.value.amp / 72 + 1;
      let peak = binding.value.peak / 72 + 1;

      let ctx = canvas.getContext("2d");
      let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

      gradient.addColorStop(0.025, "red");
      gradient.addColorStop(0.1, "orange");
      gradient.addColorStop(0.2, "greenyellow");
      gradient.addColorStop(0.6, "lime");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, canvas.height - (canvas.height * amp), canvas.width, canvas.height * amp);

      // If we push into the red, change the small bar red..
      if (peak >= 0.975) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "greenyellow";
      }
      ctx.fillRect(0, Math.round(canvas.height - (canvas.height * peak)), canvas.width, 1);
    }
  }
}
</script>

<template>
  <span class="vu-meter">
    <canvas width="10" height="220" v-draw-meter="{ amp: val, peak: peakVal }"/>
  </span>
</template>

<style scoped>

</style>
