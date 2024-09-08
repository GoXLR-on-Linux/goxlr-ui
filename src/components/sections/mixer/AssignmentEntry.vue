<template>
  <div class="assignment">
    <div style="flex-grow: 1">
      <div role="radio" class="button" @click="setMixMonitor" :class="{ highlight: isMixMonitored() }"
           :aria-label="`Monitor ${display}`" :aria-description="`Listen to ${display} in Headphones`"
           :aria-checked="isMixMonitored()">
        <div class="icon" :class="{ faded: !isMixMonitored() }">
          <font-awesome-icon icon="fa-solid fa-headphones"/>
        </div>
        <div class="text">{{ display }}</div>
      </div>
    </div>
    <div role="radiogroup">
      <div class="box">
        <div>
          <label :for="getRadioId('A')" class="label MixA"
                 :class="{ selected: isDeviceMix('A') }">{{ $t('message.mixer.channelA') }}</label>
          <input class="screenreader-only" type="radio" :id="getRadioId('A')" @change="setDeviceMix"
                 :checked="isDeviceMix('A')" :name="name" value="A" :aria-label="$t('message.mixer.channelA')"/>
        </div>
        <div>
          <label :for="getRadioId('B')" class="label MixB"
                 :class="{ selected: isDeviceMix('B') }">{{ $t('message.mixer.channelB') }}</label>
          <input class="screenreader-only" type="radio" :id="getRadioId('B')" @change="setDeviceMix"
                 :checked="isDeviceMix('B')" :name="name" value="B" :aria-label="$t('message.mixer.channelB')"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "AssignmentEntry",
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

    getRadioId(type) {
      return type + this.name;
    },

    setDeviceMix(e) {
      let command = {
        "SetSubMixOutputMix": [this.name, e.target.value]
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
.assignment {
  display: flex;
  flex-direction: row;
  gap: 5px;
  width: 100%;
}

.button {
  display: flex;
  flex-direction: row;
  text-align: left;
  padding: 4px 6px;

  min-width: 150px;
  height: 34px;

  box-sizing: border-box;
  border: none;
  background-color: #3b413f;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  white-space: nowrap;
}

.button.highlight {
  border: 1px solid #59b1b6;
}

.button .icon {
  padding-right: 6px;
  font-size: 22px;
}

.button .icon.faded {
  color: #838584;
  box-sizing: border-box;
}

.button .text {
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  margin: auto;
  text-align: center;
  box-sizing: border-box;
}

.box {
  display: flex;
  background-color: #2A2D2C;
  flex-direction: row;
  padding: 4px;
  border-radius: 3px;
}

.label {
  color: #fff;
  padding: 6px 16px;
  display: block;
  border-radius: 3px;
}

.selected {
  color: #2A2D2C;
}

.selected.MixA {
  background-color: #59b1b6;
}

.selected.MixB {
  background-color: #CC7224;
}


</style>