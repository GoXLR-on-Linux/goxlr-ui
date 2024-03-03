<template>
  <VerticalScrollingContainer :max-height="maxHeight" v-if="showSamples()">
    <div v-if="getDirectoryList().length > 0">
      <p class="title screenreader-only" role="heading">{{$t('message.sampler.samples.sampleSelector.directories')}}</p>
      <div class="buttons">
        <ButtonItem v-for="(directory, index) in getDirectoryList()" v-bind:key="index" :id="directory.id"
                    text="" @on-click="selectDirectory" ref="button" :background="background">
          <font-awesome-icon v-if="directory.icon !== undefined" :icon="directory.icon"/>
          {{ directory.label }}
        </ButtonItem>
      </div>
    </div>

    <div v-if="getSampleList().length > 0">
      <p class="title screenreader-only" role="heading">{{$t('message.sampler.samples.sampleSelector.samples')}}</p>
      <RadioList
          ref="sampleList"
          :padding="padding"
          :background="background"
          :group="`${this.prefix}_sample_list`"
          :options="getSampleList()"
          :selected="getSelectedSample()"
          @selection-changed="selectSample"
      />
    </div>
  </VerticalScrollingContainer>

  <span v-else>
    {{ $t('message.sampler.samples.sampleSelector.noSamples') }}
  </span>
</template>

<script>
import {store} from "@/store";
import {getBaseHTTPAddress} from "@/util/sockets";
import VerticalScrollingContainer from "@/components/containers/VerticalScrollingContainer.vue";
import ButtonItem from "@/components/lists/ButtonItem.vue";
import RadioList from "@/components/lists/RadioList.vue";

export default {
  name: "SampleFileSelector",
  components: {RadioList, ButtonItem, VerticalScrollingContainer},

  props: {
    prefix: { type: String, optional: false },
    maxHeight: {type: String, optional: true, default: "inherit"},
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
    showSamples() {
      return this.getSampleList().length > 0 || this.getDirectoryList().length > 0;
    },


    getDirectoryList() {
      let samples = [];
      if (this.current_path.length > 0) {
        samples.push({
          id: this.prefix + '*',
          icon: "turn-up",
          label: this.$t('message.sampler.samples.sampleSelector.parentDirectory')
        });
      }

      for (let directory of this.getFileList(true).sort(Intl.Collator().compare)) {
        samples.push({
          id: this.prefix + directory,
          icon: "fa-solid fa-folder",
          label: directory
        });
      }
      return samples;
    },

    getSampleList() {
      let samples = [];
      for (let file of this.getFileList(false).sort(Intl.Collator().compare)) {
        samples.push({
          id: this.prefix + file,
          icon: "fa-solid fa-music",
          label: file
        });
      }

      // Return the list :)
      return samples;
    },

    getFileList(directories) {
      let directory = this.getCurrentDirectory();

      // Get a full list of files
      let files = [];
      for (let file of directory) {
        if (directories && typeof file == 'object') {
          files.push(Object.keys(file)[0]);
        }
        if (!directories && typeof file != 'object') {
          files.push(file);
        }
      }

      // Return the list :)
      return files;
    },

    getCurrentDirectory() {
      // Start at the 'Top' level of the structure..
      let level = this.getSamplePaths();

      // Firstly, we need to iterate through our structure to the correct place..
      let descend_path = [...this.current_path];
      while (descend_path.length > 0) {

        // Grab the first element of the path and remove it from the list..
        let next = descend_path.shift();

        // Iterate through all the parts at this layer of the structure, try
        // to locate the object containing this paths data..
        for (let path of level) {

          // Is this a directory?
          if (typeof path == 'object') {
            // Get the Directory Name...
            let dirName = Object.keys(path)[0];

            // Is it the directory we're looking for?
            if (dirName === next) {
              // Place this as the new 'Top' level
              level = path[dirName];

              // Break the loop, we good.
              break;
            }
          }
        }
      }

      return level;
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

    focus() {
      if (this.getDirectoryList().length > 0) {
        this.$refs.button[0].focus();
        return;
      }

      if (this.getSampleList().length > 0) {
        this.$refs.sampleList.getFirstButtonRef().focus()
      }
    },

    selectDirectory(id) {
      this.stopPlayback();
      this.selectedSample = undefined;

      id = id.substring(this.prefix.length);

      if (id === "*") {
        this.current_path.pop();
      } else {
        this.current_path.push(id);
      }

      this.$nextTick(() => {
        if (this.getDirectoryList().length > 0) {
          this.focus();
        }
      });
    },

    selectSample(sample) {
      this.stopPlayback();
      this.selectedSample = sample.substring(this.prefix.length);
      this.audio_player.src = this.getSampleUrl();

      // Changing the src will stop playback, but wont trigger the stop events.
      this.audio_playing = false;
    },

    getSelectedSample() {
      if (this.selectedSample === undefined) {
        return undefined;
      }
      return this.prefix + this.selectedSample;
    },

    getSelectedSampleName() {
      if (this.selectedSample === undefined) {
        return undefined;
      }

      return this.selectedSample;
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

      let url = getBaseHTTPAddress();
      url = url + "files/samples/" + this.selectedSample;

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
.buttons {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}
</style>
