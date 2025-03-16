<template>
  <div class="progress">
    <label for="progress-bar" v-if="status_message !== undefined && status_position === 'top'" :style="`text-align: ${status_align};`" class="status">
      {{ status_message }}
    </label>
    <div class="progress-bar-inner">
      <div v-if="show_percentage">{{ progress }}%</div>
      <progress id="progress-bar" max="100" :value="progress"></progress>
    </div>
    <label for="progress-bar" v-if="status_message !== undefined && status_position === 'bottom'" :style="`text-align: ${status_align};`" class="status">
      {{ status_message }}
    </label>
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

.progress .progress-bar-inner {
  position: relative;
  margin: 4px 0;
}

.progress .progress-bar-inner progress[value] {
  background-color: #252927;
  color: #59b1b6;
  border: none;
  height: 22px;
  width: 100%;
  margin: 0 0;

  /* Reset the default appearance */
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance: none;

  text-align: center;
}
.progress .progress-bar-inner progress[value]:after {
  color: #fff;
  content: attr(value)'%';
}
.progress .progress-bar-inner div {
  position: absolute;
  width: 100%;
  line-height: 22px;
  display: block;
  text-align: center;
  justify-content: center;
}

.progress .status {
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  align-content: center;
}
</style>