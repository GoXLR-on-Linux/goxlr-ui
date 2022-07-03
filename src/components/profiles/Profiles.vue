<template>
  <SelectorList title="Profiles">
    <Button v-for="(value, index) in dirContents" :key=value.name :is-active=false :label=value.name :button-id="index.toString()" @button-pressed="console.log('Test')" />
  </SelectorList>
</template>

<script>
import {dataDir, join} from "@tauri-apps/api/path";
import {fs} from "@tauri-apps/api";
import Button from "../button_list/Button";
import SelectorList from "@/components/button_list/SelectorList";
export default {
  name: "ProFiles",
  components: {SelectorList, Button},


  data() {
    return {
      dirContents: this.getPath()
    }
  },

  methods: {
    async getPath() {
      const dataDirPath = await dataDir()
      const path = await join(dataDirPath, "goxlr-utility", "profiles");
      const readDir = await fs.readDir(path);
      return readDir
    },
  }
}
</script>

<style scoped>

</style>