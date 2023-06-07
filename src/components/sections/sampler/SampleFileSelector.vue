<template>
  <ScrollingRadioList
      ref="sampleList"
      v-if="getSampleList().length > 0"
      :max_height="max_height"
      :padding="padding"
      :background="background"
      group="sample_list"
      :options="getSampleList()"
      :selected="getSelectedSample()"
      @selection-changed="selectSample"
  />
  <span v-else>
      There are currently no samples in the samples folder. Copy some over so
      they can be selected here!
  </span>
</template>

<script>
import ScrollingRadioList from "@/components/lists/ScrollingRadioList.vue";
import {store} from "@/store";
import {getBaseHTTPAddress} from "@/util/sockets";

export default {
  name: "SampleFileSelector",
  components: {ScrollingRadioList},

  props: {
    max_height: {type: String, optional: true, default: "inherit"},
    padding: {type: String, required: false, default: "8px"},
    background: {type: String, required: false, default: "#3b413f"},
    group: {type: String, required: true}
  },

  data() {
    return {
      current_path: [],
      selectedSample: undefined,

      audio_player: undefined,
      audio_playing: false,
    }
  },

  methods: {
    getSampleList() {
      let samples = [];
      let directories = [];
      let files = [];

      let paths = this.getSamplePaths();
      let descend_path = [...this.current_path];

      if (descend_path.length > 0) {
        samples.push({
          id: "*" + descend_path[descend_path.length - 1],
          icon: "turn-up",
          label: "Parent Directory"
        });
      }

      while (descend_path.length > 0) {
        let next = descend_path.shift();

        for (let path of paths) {
          if (typeof path == 'object') {
            let name = Object.keys(path)[0];

            if (name === next) {
              paths = path[name];
              break;
            }
          }
        }
      }

      for (let path of paths) {
        if (typeof path == 'object') {
          // Objects in the array will only ever have one child, which is the name of the path.
          directories.push(Object.keys(path)[0]);
        } else {
          files.push(path);
        }
      }

      for (let directory of directories.sort()) {
        samples.push({
          id: "+" + directory,
          icon: "fa-solid fa-folder",
          label: directory
        });
      }

      for (let file of files.sort()) {
        samples.push({
          id: "-" + file,
          icon: "fa-solid fa-music",
          label: file
        });
      }
      return samples;
    },

    getSamplePaths() {
      if (store.getSampleFiles() === undefined) {
        return {};
      }

      return Object.keys(store.getSampleFiles()).reduce(function (acc, value) {
        value = value.replace(/\\/g, '/');

        let fields = value.split("/");
        let currentDirectory = acc;

        fields.forEach(function (element, index) {
          if (index !== fields.length - 1) {
            // We're not at the end yet, look for a subdir..
            let subDirectory = currentDirectory.filter(function (field) {
              return typeof field == 'object' && field[element];
            })[0];

            // Couldn't find an existing SubDirectory, create it..
            if (!subDirectory) {
              subDirectory = Object.create(null);
              subDirectory[element] = [];
              currentDirectory.push(subDirectory);
            }
            currentDirectory = subDirectory[element];
          } else {
            currentDirectory.push(element);
          }
        });

        return acc;
      }, []);
    },

    selectSample(sample) {
      let sampleArr = sample.split("");
      let prefix = sampleArr.shift();
      sample = sampleArr.join("");

      this.stopPlayback();
      if (prefix === "*") {
        this.current_path.pop();

        this.$nextTick(() => {
          this.$refs.sampleList.getFirstButtonRef().focus();
        });
      }
      if (prefix === "+") {
        this.selectedSample = undefined;
        this.current_path.push(sample);

        this.$nextTick(() => {
          this.$refs.sampleList.getFirstButtonRef().focus();
        });
      }
      if (prefix === "-") {
        this.selectedSample = prefix + sample;
        this.audio_player.src = this.getSampleUrl();

        // Changing the src will stop playback, but wont trigger the stop events.
        this.audio_playing = false;
      }
    },

    getSelectedSample() {
      return this.selectedSample;
    },

    getSelectedSampleName() {
      if (this.selectedSample === undefined) {
        return undefined;
      }

      return this.selectedSample.substring(1);
    },

    stopPlayback() {
      if (this.isAudioPlaying()) {
        this.audio_player.pause();
      }
    },

    toggleAudio() {
      if (!this.isAudioPlaying()) {
        this.audio_player.play();
      } else {
        this.audio_player.pause();
      }
    },

    isAudioPlaying() {
      return this.audio_playing;
    },

    getSampleUrl() {
      if (this.selectedSample === undefined) {
        return undefined;
      }

      let name = this.selectedSample.substring(1);
      let url = getBaseHTTPAddress();
      url = url + "files/samples/" + name;

      return url;
    },
  },

  mounted() {
    this.audio_player = new Audio();
    this.audio_player.onpause = () => {
      this.audio_playing = false;
      this.audio_player.currentTime = 0;
    };
    this.audio_player.onplay = () => {
      this.audio_playing = true;
    }
    this.audio_player.onended = () => {
      this.audio_playing = false;
      this.audio_player.currentTime = 0;
    }
  },
}
</script>

<style scoped>

</style>
