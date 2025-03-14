<template>
  <div class="progress">
    <div v-if="status_message !== undefined && status_position === 'top'" :style="`text-align: ${status_align};`" class="status">
      {{ status_message }}
    </div>
    <div class="indicator">
      <div class="progress-bar" :style="`width: ${progress}%;`"></div>
      <div class="progress-bar-inner">
        {{ show_percentage ? progress + "%" : "" }}
      </div>
    </div>
    <div v-if="status_message !== undefined && status_position === 'bottom'" :style="`text-align: ${status_align};`" class="status">
      {{ status_message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",

  props: {
    progress: {type: Number, default: 0},
    show_percentage: {type: Boolean, default: true},
    status_message: {type: String, default: undefined},
    status_align: {type: String, default: "center"},
    status_position: {type: String, default: "top"},
  },
}
</script>

<style scoped>
.progress {
  margin: 23px 0;
}

.progress .indicator {
  background-color: #252927;
  color: #fff;
  height: 22px;
  margin: 4px 0;
}

.progress .indicator .progress-bar {
  display: block;
  background-color: #59b1b6;
  top: 0;
  left: 0;
  height: 100%;
}

.progress .indicator .progress-bar-inner {
  position: sticky;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  align-content: center;
  transform: translateY(-100%);
}

.progress .status {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  align-content: center;
}
</style>