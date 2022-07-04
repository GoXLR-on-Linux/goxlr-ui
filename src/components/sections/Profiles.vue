<template>
  <SelectorList>
    <Profile v-for="value in dirContents" :button-id="value.name" :key="value"
             :label="value.name.toString().replace('.goxlr', '').replace('Profile', '')"
             :is-active="value.name.toString().replace('.goxlr', '').replace('Profile', '') === activeProfile"
             @button-pressed="handleButtonPress"/>
  </SelectorList>
</template>

<script>
import Profile from "@/components/button_list/Profile";
import {dataDir, join} from "@tauri-apps/api/path";
import {fs, invoke} from "@tauri-apps/api";
import {store} from "@/store";
import SelectorList from "@/components/button_list/SelectorList";

export default {
  name: "ProFiles",
  components: {Profile, SelectorList},


  data() {
    return {
      dirContents: [],
      activeProfile: String
    }
  },

  created() {
    console.log(this.dirContents)
    this.getPath()
    // eslint-disable-next-line no-unused-vars
    this.waitFor(_ => store.hasActiveDevice() === true).then(
        // eslint-disable-next-line no-unused-vars
        _ => this.activeProfile = store.getActiveDevice().profile_name
    );
    console.log(this.dirContents)
  },

  methods: {
    async getPath() {
      const dataDirPath = dataDir();
      const path = join(await dataDirPath, "goxlr-utility", "profiles");
      this.dirContents = [];
      fs.readDir(await path).then(value => {
        value.forEach(value1 => {
          if (!value1.name.toString().includes(".goxlrProfile")) {
            if (value1.name.toString().includes(".goxlr")){
              this.dirContents.push(value1)
            }
          }
        });
      }).catch(error => {
        console.log(error);
      });

    },
    handleButtonPress: function (label) {
      this.activeProfile = label;
      //let rust know
      invoke('set_profile', {
        serial: store.getActiveSerial(),
        profileName: this.activeProfile
      })
      this.getPath()
    },
    waitFor(conditionFunction) {
      const poll = resolve => {
        if (conditionFunction()) resolve();
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
      }
      return new Promise(poll);
    }
  }
}
</script>

<style scoped>

</style>