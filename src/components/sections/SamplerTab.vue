<template>
  <GroupContainer title="Bank">
    <RadioSelection
        title="Bank"
        group="sampler_bank"
        :options="bank_options"
        :selected="activeBank"
        @selection-changed="setActiveBank"
    />
    <RadioSelection
        title="Button"
        group="sampler_button"
        :options="button_options"
        :selected="activeButton"
        @selection-changed="setActiveButton"
        :label="'Button for bank ' + activeBank"
    />
    <RadioSelection
        title="Function"
        group="sampler_function"
        :options="function_options"
        :selected="getActiveFunction()"
        @selection-changed="setActiveFunction"
        :label="`Function for ${activeButton} button in bank ${activeBank}`"
    />
    <RadioSelection
        title="Play Order"
        group="sampler_order"
        :options="order_options"
        :selected="getActiveOrder()"
        @selection-changed="setActiveOrder"
        :label="`Play Order for ${activeButton} button in bank ${activeBank}`"
    />
  </GroupContainer>
  <GroupContainer title="Sampler">
    <RadioSelection
        title="Samples"
        group="sampler_samples"
        :options="getSampleOptions()"
        :selected="activeSample"
        @selection-changed="setActiveSample"
        :label="`Sample for ${activeButton} button in bank ${activeBank}`"
    >
      <ButtonItem
          id="add_sample"
          ref="add_sample_button"
          text="+"
          label="Add Sample"
          :centered="true"
          @click="
          $refs.add_sample_modal.openModal(undefined, $refs.add_sample_button)
        "
      />
    </RadioSelection>

    <AudioVisualiser
        :active-bank="activeBank"
        :active-button="activeButton"
        :active-sample="parseInt(activeSample)"
        @deselect-sample="activeSample = '-1'"
        :sample-name="getActiveSampleName(activeSample)"
    />
  </GroupContainer>

  <AccessibleModal
      ref="add_sample_modal"
      id="add_sample"
      :show_footer="true"
      @modal-close="stopPlayback(); selectedAddSample = undefined"
  >
    <template v-slot:title>
      <span>Add Sample</span>
      <button
          class="openButton"
          @click="openSamples"
          aria-label="Open Samples Directory"
      >
        <font-awesome-icon icon="fa-solid fa-folder"/>
      </button>
    </template>
    <ScrollingRadioList
        v-if="getSampleList().length > 0"
        max_height="300px"
        group="sample_list"
        :options="getSampleList()"
        :selected="getSelectedAddSample()"
        @selection-changed="selectAddSample"
    />
    <span v-else>
      There are currently no samples in the samples folder. Copy some over so
      they can be selected here!
    </span>
    <template v-slot:footer>
      <div style="display: flex; flex-direction: row">
        <div style="width: 50%; text-align: left; padding-left: 10px;">
          <ModalButton
              style="width: 50px; padding: 8px 2px"
              ref="err"
              class="modal-default-button"
              :enabled="selectedAddSample !== undefined"
              @click="toggleAudio"
          >
            <font-awesome-icon :icon="getPlaybackButton()"></font-awesome-icon>
          </ModalButton>
        </div>
        <div style="text-align: right; width: 50%">
          <ModalButton
              ref="ok"
              class="modal-default-button"
              :enabled="selectedAddSample !== undefined"
              @click="addSample"
          >Add
          </ModalButton>
        </div>
      </div>
    </template>
  </AccessibleModal>

  <AccessibleModal
      ref="add_sample_wait"
      id="add_sample_wait"
      :show_footer="false"
      :show_close="false"
      :prevent_esc="true"
  >
    <template v-slot:title>Please wait, analysing sample.</template>
    <div tabindex="0">
      Please wait, sample being analysed.<br/>
      This process may take a couple of minutes.<br/>
      Your GoXLR <b>WILL</b> be Unresponsive during this time.
    </div>
  </AccessibleModal>
</template>

<script>
import {store} from "@/store";
import AudioVisualiser from "@/components/sections/sampler/AudioVisualiser";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ButtonItem from "@/components/lists/ButtonItem.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ScrollingRadioList from "@/components/lists/ScrollingRadioList.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import {getBaseHTTPAddress, websocket} from "@/util/sockets";

export default {
  name: "SamplerTab",
  components: {
    ModalButton,
    ScrollingRadioList,
    AccessibleModal,
    ButtonItem,
    GroupContainer,
    RadioSelection,
    AudioVisualiser,
  },

  data() {
    return {
      activeBank: "A",
      activeButton: "TopLeft",
      activeSample: "-1",

      selectedAddSample: undefined,

      showAddModal: false,
      waitModal: false,

      audio_player: undefined,
      audio_playing: false,

      bank_options: [
        {id: "A", label: "A"},
        {id: "B", label: "B"},
        {id: "C", label: "C"},
      ],

      button_options: [
        {id: "TopLeft", label: "Top Left"},
        {id: "TopRight", label: "Top Right"},
        {id: "BottomLeft", label: "Bottom Left"},
        {id: "BottomRight", label: "Bottom Right"},
      ],

      function_options: [
        {id: "PlayNext", label: "Play-Next"},
        {id: "PlayStop", label: "Play-Stop"},
        {id: "PlayFade", label: "Play-Fade"},
        {id: "StopOnRelease", label: "Stop on Release"},
        {id: "FadeOnRelease", label: "Fade on Release"},
        {id: "Loop", label: "Loop"},
      ],

      order_options: [
        {id: "Sequential", label: "Sequential"},
        {id: "Random", label: "Random"},
      ],
    };
  },

  methods: {
    openSamples() {
      websocket.open_path("Samples");
    },

    getSampleOptions() {
      let samples = [];
      this.getSamples().forEach((sample, index) => {
        samples.push({id: index.toString(), label: sample.name});
      });
      return samples;
    },

    setActiveBank(bank) {
      this.activeBank = bank;
      this.activeSample = "-1";
    },

    setActiveButton(button) {
      this.activeButton = button;
      this.activeSample = "-1";
    },

    getActiveFunction() {
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].function;
    },
    setActiveFunction(sampleFunction) {
      websocket.send_command(store.getActiveSerial(), {
        SetSamplerFunction: [
          this.activeBank,
          this.activeButton,
          sampleFunction,
        ],
      });
    },
    getActiveOrder() {
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].order;
    },
    setActiveOrder(sampleOrder) {
      websocket.send_command(store.getActiveSerial(), {
        SetSamplerOrder: [this.activeBank, this.activeButton, sampleOrder],
      });
    },

    getSamples() {
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].samples;
    },

    getSampleList() {
      console.log(this.getPaths());

      let samples = [];
      for (let sample of Object.keys(store.getSampleFiles()).sort()) {
        samples.push({
          id: sample,
          label: sample,
        });
      }
      return samples;
    },

    selectAddSample(sample) {
      this.selectedAddSample = sample;
      this.audio_player.src = this.getSampleUrl();
    },

    getSelectedAddSample() {
      return this.selectedAddSample;
    },

    setActiveSample(id) {
      this.activeSample = id;
    },

    addSample() {
      let name = store.getSampleFiles()[this.getSelectedAddSample()];

      // If we're adding a sample, we need to drop the return focus...
      this.$refs.add_sample_modal.returnFocus = undefined;
      this.$refs.add_sample_modal.closeModal();

      this.$refs.add_sample_wait.openModal(
          undefined,
          this.$refs.add_sample_button
      );
      store.setAccessibilityNotification(
          "polite",
          "Please wait, analysing sample. This process may take a couple of minutes. Your GoXLR WILL be Unresponsive during this time."
      );
      store.pause();

      this.$nextTick(() => {
        websocket
            .send_command(store.getActiveSerial(), {
              AddSample: [this.activeBank, this.activeButton, name],
            })
            .then(() => {
              this.$refs.add_sample_wait.closeModal();
              store.resume();
              store.setAccessibilityNotification(
                  "polite",
                  `Sample ${name} added to ${this.activeButton} button in bank ${this.activeBank}.`
              );
            });
      });
    },
    getActiveSampleName: function (id) {
      if (id === "-1") {
        return "";
      }
      return store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].samples[id].name;
    },

    getSampleUrl() {
      if (this.selectedAddSample === undefined) {
        return undefined;
      }

      let name = store.getSampleFiles()[this.selectedAddSample];
      let url = getBaseHTTPAddress();
      url = url + "files/samples/" + name;

      return url;
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

    getPlaybackButton() {
      if (this.audio_playing) {
        return "fa-solid fa-stop";
      }
      return "fa-solid fa-play";
    },

    isAudioPlaying() {
      return this.audio_playing;
    },

    getPaths() {
      if (store.getSampleFiles() === undefined) {
        return {};
      }

      return Object.keys(store.getSampleFiles()).reduce(function (acc, value) {
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
  }
};
</script>

<style scoped>
button {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin-left: 5px;
}

.openButton {
  display: inline-block;
  color: #a5a7a6;
  font-size: 14px;
}

.openButton:hover {
  color: #fff;
  cursor: pointer;
}
</style>
