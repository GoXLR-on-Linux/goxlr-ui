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
import {store} from "@/store";
import SelectorList from "@/components/button_list/SelectorList";
import {url_base} from "@/main";

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
    this.getPath()
    // eslint-disable-next-line no-unused-vars
    this.waitFor(_ => store.hasActiveDevice() === true).then(
        // eslint-disable-next-line no-unused-vars
        _ => this.activeProfile = store.getActiveDevice().profile_name
    );
  },

  methods: {
    getPath() {
      // TODO: Reimplement this without tauri..
    },
    handleButtonPress: function (label) {
      this.activeProfile = label;

      let serial = store.getActiveSerial();
      let profile = this.activeProfile;

      let url = `${url_base}/set-profile/${serial}/${profile}`
      fetch(url, { method: 'POST' });
    },

    // TODO: This method appears in multiple places, it should be abstracted..
    waitFor(conditionFunction) {
      const poll = resolve => {
        if (conditionFunction()) resolve();
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
      }
      return new Promise(poll);
    },
  }
}
</script>

<style scoped>

</style>