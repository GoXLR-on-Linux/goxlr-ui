<template>
  <div style="height: 30px; text-align: right">
    <div style="height: 14px; display: inline-block; width: calc(100% - 50px);">
      <hr style="border: 1px solid #2d3230" />
    </div>
    <div class="openButton" @click="openProfiles">
      <font-awesome-icon icon="fa-solid fa-folder" />
    </div>
  </div>
  <div style="height: 290px">
    <ProfileButton v-for="(name, index) in fileList()" :key="index" :show-check=false :button-id="name"
                   :label="getLabel(name)" :is-selected="isSelected(name)" :is-active="false"
                   @button-clicked="setSelected"
                   @button-double-clicked="handleDoubleClick"/>
  </div>
</template>

<script>
import {sendHttpCommand, websocket} from "@/util/sockets";
import {store} from "@/store";
import ProfileButton from "@/components/profiles/ProfileButton";

export default {
  name: "PresetHandler",
  components: {ProfileButton},

  data: function() {
    return {
      selected: '',
    }
  },

  methods: {
    openProfiles() {
      websocket.open_path("Presets");
    },

    fileList() {
      return store.getPresetFiles().sort();
    },

    getLabel(name) {
      return name.replace("_", " ");
    },

    isSelected(label) {
      return this.selected === label;
    },

    setSelected(label) {
      this.selected = label;
    },

    handleDoubleClick(label) {
      sendHttpCommand(store.getActiveSerial(),{ "LoadEffectPreset": label })
          .catch((error) => {
            console.log(error);
          });

      console.log("Loading: " + label);
    }
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
