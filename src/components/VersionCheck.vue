<template>
  <div v-if="outdated()" class="outdated">Your GoXLR Utility is out of date, if you're not about to stream, please <a :href="release_path">click here</a> to grab the update.</div>
  <div v-else style="margin-top: 20px;"></div>
</template>

<script>
import {store} from "@/store";

export default {
  name: "VersionCheck",

  data: function () {
    return {
      version: undefined,
      release_path: "#",
    }
  },

  methods: {
    getLatest() {
      fetch(this.getPath())
          .then(response => {
            if (response.status !== 200) {
              console.log("Error Received from Github, Ignoring..");
              return undefined;
            }
            return response.json()
          })
          .then(data => {
            if (data === undefined) {
              return;
            }
            fetch(data[0].url)
                .then(response => response.json())
                .then(data => {
                  this.version = data.tag_name.substring(1);
                  this.release_path = data.html_url;
                })
          });
    },

    outdated() {
      if (store.daemonVersion() === undefined) {
        return false;
      }
      return this.isOutdated(store.daemonVersion());
    },

    getPath() {
      return "https://api.github.com/repos/GoXLR-on-Linux/goxlr-utility/releases";
    },

    isOutdated(util_version) {
      if (this.version === undefined) {
        // If we can't map the current version, assume they match to avoid bugging the user.
        return false;
      }

      let util = util_version.split(".");
      let version = this.version.split(".");

      // This isn't perfect, but it doesn't need to be. If the util is reporting a different version from github, there
      // has likely been an update, we'll deal with edge cases separately..

      if (util[0] !== version[0]) {
        return true;
      }

      if (util[1] !== version[1]) {
        return true;
      }

      return util[2] !== version[2];
    }
  },

  mounted() {
    this.getLatest();
  }
}
</script>

<style scoped>
 .outdated {
   border: 0 solid #ff0000;
   border-bottom-width: 1px;
   background-color: rgba(255, 0, 0, 0.2);
   text-align: center;
   color: #fff;
   margin-bottom: 8px;
   padding: 3px;

 }
</style>
