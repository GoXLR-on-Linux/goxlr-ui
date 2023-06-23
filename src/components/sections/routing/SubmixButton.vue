<template>
  <th class="button" :class="{ highlight: isMixMonitored() }">
      <div role="button" class="icon" :class="{ faded: !isMixMonitored() }" @click="setMixMonitor">
        <font-awesome-icon icon="fa-solid fa-headphones"/>
      </div>
      <div class="text">{{ display }}</div>
      <div class="highlight" :class="[ isDeviceMix('A') ? 'mixA' : 'mixB' ]">{{ getOutputMix() }}</div>
  </th>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "SubmixButton",

  props: {
    display: String,
    name: String,
  },

  methods: {
    isMixMonitored() {
      return store.getActiveDevice().levels.output_monitor === this.name;
    },

    setMixMonitor() {
      let command = {
        "SetMonitorMix": this.name
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    isDeviceMix(mix) {
      return this.getOutputMix(this.name) === mix;
    },
    getOutputMix() {
      return store.getActiveDevice().levels.submix.outputs[this.name];
    },
  }
}
</script>

<style scoped>
.button {
  display: flex;
  flex-direction: row;
  padding: 0;

  width: 180px;
  height: 26px;

  box-sizing: border-box;
  border: none;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
}

.button.highlight {
  border: 1px solid #59b1b6;
}

.button .icon {
  margin-left: 5px;
  padding: 2px 6px 2px 2px;
  font-size: 20px;
}

.button .icon.faded {
  color: #838584;
  box-sizing: border-box;
}

.button .text {
  margin: auto;
  text-align: center;
  box-sizing: border-box;
  padding: 6px;
}

.button .highlight {
  margin: 4px 5px 4px 4px;
  padding: 3px 8px;
  border-radius: 4px;

  color: #2A2D2C;
}

.button .highlight.mixA {
  background-color: #59b1b6;
}

.button .highlight.mixB {
  background-color: #CC7224;
}
</style>