<template>
  <ul>
    <Profile v-for="value in dirContents" :key="value.name" :text="value.name"></Profile>
  </ul>
  <!--<SelectorList title="Profiles">

    <Button v-for="(value, index) in dirContents" :key=value.name :is-active=false :label=value.name :button-id="index.toString()" @button-pressed="console.log('Test')" />
  </SelectorList>-->
</template>

<script>
import Profile from "@/components/profiles/Profile";
import {dataDir, join} from "@tauri-apps/api/path";
import {fs} from "@tauri-apps/api";
export default {
  name: "ProFiles",
  components: {Profile},


  data() {
    return {
      dirContents: []
    }
  },

  created() {
    console.log(this.dirContents)
    this.getPath()
    console.log(this.dirContents)
  },

  methods: {
    async getPath() {
      const dataDirPath = dataDir();
      const path = join(await dataDirPath, "goxlr-utility", "profiles");
      fs.readDir(await path).then(value => {
        value.forEach( value1 =>
            this.dirContents.push(value1)
        );
      }).catch(error => {
        console.log(error);
      });

    },
  }
}
</script>

<style scoped>

</style>