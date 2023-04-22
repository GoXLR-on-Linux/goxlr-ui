<template>
  <div style="width: 440px; border: 1px solid #59b1b6; padding: 6px; color: #fff">
    Submix Supported: {{ isSubMixSupported() }}<br/>
    Submix Enabled: <input type="checkbox" :checked="isSubMixEnabled()" @change="setSubmixEnabled" /><br/><br/>
    <div v-if="isSubMixEnabled()">
      Inputs:
      <div v-for="submix in inputs" :key="submix" style="display: flex; flex-direction: row; gap: 6px">
        <div style="width: 70px">{{ submix }}</div>
        <div style="width: 255px">
          <input style="width: 250px; height: 10px" type="range" min="0" max="255" :name="submix" @input="setMixVolume" v-on:mousedown="mouseDown" v-on:mouseup="mouseUp" :value="getSubmixInputVolume(submix)"
                 >
        </div>
        <div style="width: 40px">{{ getSubmixInputVolumePercent(submix) }}%</div>
        <div><input type="checkbox" :id="submix" :checked="isSubMixLinked(submix)" @change="setSubmixLinked"/></div>
      </div>
      <br/><br/>
      Output Mixes:
      <div v-for="output in outputs" :key="output" style="display: flex; flex-direction: row; gap: 6px">
        <div style="width: 95px">{{ output }}</div>
        <div style="margin-right: 15px">
          <label for="A">A:</label> <input @change="setDeviceMix" :checked="isOutputA(output)" type="radio" id="A" :name="output" />
        </div>
        <div>
          <label for="B">B:</label> <input @change="setDeviceMix" :checked="!isOutputA(output)" type="radio" id="B" :name="output" />
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";


export default {
  name: "SubmixTest",
  data() {
    return {
      inputs: ["Mic", "LineIn", "Console", "System", "Game", "Chat", "Sample", "Music"],
      outputs: ["Headphones", "BroadcastMix", "ChatMic", "Sampler", "LineOut"]
    }
  },

  methods: {
    isSubMixSupported() {
      return store.getActiveDevice().levels.submix_supported;
    },

    isSubMixEnabled() {
      return store.getActiveDevice().levels.submix !== null;
    },

    getSubmixInput(name) {
      return store.getActiveDevice().levels.submix.inputs[name];
    },

    getSubmixInputVolume(name) {
      return this.getSubmixInput(name).volume;
    },

    getSubmixInputVolumePercent(name) {
      let value = this.getSubmixInputVolume(name);
      return Math.round(value / 255 * 100);
    },

    isSubMixLinked(name) {
      return this.getSubmixInput(name).linked;
    },

    getOutputMix(name) {
      return store.getActiveDevice().levels.submix.outputs[name];
    },

    isOutputA(name) {
      return this.getOutputMix(name) === "A";
    },

    getSubmixConfig() {
      return store.getActiveDevice().levels.submix;
    },

    // Stuff!
    setSubmixEnabled(e) {
      let command = {
        "SetSubMixEnabled": e.target.checked
      };

      websocket.send_command(store.getActiveSerial(), command);
    },

    setSubmixLinked(e) {
      let command = {
        "SetSubMixLinked": [e.target.id, e.target.checked]
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    setDeviceMix(e) {
      let command = {
        "SetSubMixOutputMix": [e.target.name, e.target.id]
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    setMixVolume(e) {
      let command = {
        "SetSubMixVolume": [e.target.name, parseInt(e.target.value)]
      };
      websocket.send_command(store.getActiveSerial(), command);
      store.getActiveDevice().levels.submix.inputs[e.target.name].volume = e.target.value;

      if (this.isSubMixLinked(e.target.name)) {
        let ratio = store.getActiveDevice().levels.submix.inputs[e.target.name].ratio;
        store.getActiveDevice().levels.volumes[e.target.name] = this.calculateMixVolume(e.target.value, ratio);
      }
    },

    mouseDown(e) {
      store.pausePatchPath(this.getMixStorePath(e.target.name));

      if (this.isSubMixLinked(e.target.name)) {
        store.pausePatchPath(this.getMainStorePath(e.target.name));
      }
    },

    mouseUp(e) {
      store.resumePatchPath(this.getMixStorePath(e.target.name));
      if (this.isSubMixLinked(e.target.name)) {
        store.resumePatchPath(this.getMainStorePath(e.target.name));
      }
    },

    calculateMixVolume(value, ratio) {
      let calculated_volume = parseInt(value) / ratio;
      return Math.min(Math.floor(calculated_volume), 255);
    },

    getMixStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/levels/submix/inputs/" + name + "/volume"
    },

    getMainStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/levels/volumes/" + name;
    }
  }
}
</script>

<style scoped>

</style>
