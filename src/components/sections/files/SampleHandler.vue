<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 50px);">
      <hr style="border: 1px solid #2d3230"/>
    </div>
    <div class="openButton" @click="openSamples">
      <font-awesome-icon icon="fa-solid fa-folder"/>
    </div>
  </div>
  <div style="height: 340px; overflow-y: scroll">
    <SampleFileSelector background="transparent" padding="6px" group="sample_list"/>
  </div>
</template>

<script>
import {websocket} from "@/util/sockets";
import {store} from "@/store";
import SampleFileSelector from "@/components/sections/sampler/SampleFileSelector.vue";

export default {
  emits: ['sample-clicked'],
  name: "SampleHandler",
  components: {SampleFileSelector},

  data: function () {
    return {
      selected: '',
    }
  },

  methods: {
    openSamples() {
      websocket.open_path("Samples");
    },

    fileList() {
      // We need to do work here :D
      return Object.keys(store.getSampleFiles()).sort();
    },

    isSelected(label) {
      return this.selected === label;
    },

    setSelected(label) {
      this.selected = label;
    },

    getValue(label) {
      return store.getSampleFiles()[label];
    },

    // eslint-disable-next-line no-unused-vars
    handleDoubleClick(value) {
      console.log(value);
      this.$emit("sample-clicked", value);
    },
  }
}
</script>

<style scoped>
.openButton {
  display: inline-block;
  color: #a5a7a6;
  padding: 10px;
  font-size: 14px
}

.openButton:hover {
  color: #fff;
}
</style>
