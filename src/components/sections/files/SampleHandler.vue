<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 50px);">
      <hr style="border: 1px solid #2d3230"/>
    </div>
    <div class="openButton" @click="openSamples">
      <font-awesome-icon icon="fa-solid fa-folder"/>
    </div>
  </div>
  <div style="height: 290px">
    <ProfileButton v-for="(name, index) in fileList()" :key="index" :show-check=false :button-id="getValue(name)"
                   :label="name" :is-selected="isSelected(name)" :is-active="false"
                   @button-clicked="setSelected"
                   @button-double-clicked="handleDoubleClick"/>
  </div>
</template>

<script>
import {websocket} from "@/util/sockets";
import {store} from "@/store";
import ProfileButton from "@/components/profiles/ProfileButton";

export default {
  emits: ['sample-clicked'],
  name: "SampleHandler",
  components: {ProfileButton},

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
      if (!store.hasActiveDevice()) {
        return [];
      }

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