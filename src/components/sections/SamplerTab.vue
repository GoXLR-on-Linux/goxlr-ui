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
      @modal-close="stopAudio()"
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

    <SampleFileSelector ref="sample_selector" max_height="300px" group="add_sample_list"/>

    <template v-slot:footer>
      <div style="display: flex; flex-direction: row">
        <div style="width: 50%; text-align: left; padding-left: 10px;">
          <ModalButton
              style="width: 50px; padding: 8px 2px"
              ref="err"
              class="modal-default-button"
              :enabled="hasSelectedSample()"
              @click="toggleAudio"
          >
            <font-awesome-icon :icon="getPlaybackButton()"></font-awesome-icon>
          </ModalButton>
        </div>
        <div style="text-align: right; width: 50%">
          <ModalButton
              ref="ok"
              class="modal-default-button"
              :enabled="hasSelectedSample()"
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
      Please wait while the sample is being analysed.<br/>
      Progress: {{ sampleProgress }}%
    </div>
  </AccessibleModal>

  <AccessibleModal
      ref="add_sample_error"
      id="add_sample_error"
      :show_footer="true"
      :show_close="true"
      :prevent_esc="false"
      @modal-close="clearErrors()"
  >
    <template v-slot:title>Error adding Sample</template>
    <div tabindex="0">
      An error occurred while adding the sample to the bank:<br/><br/>
      {{ error }}
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
import ModalButton from "@/components/design/modal/ModalButton.vue";
import {websocket} from "@/util/sockets";
import SampleFileSelector from "@/components/sections/sampler/SampleFileSelector.vue";

export default {
  name: "SamplerTab",
  components: {
    SampleFileSelector,

    ModalButton,
    AccessibleModal,
    ButtonItem,
    GroupContainer,
    RadioSelection,
    AudioVisualiser,
  },

  data() {
    return {
      last_error: undefined,

      activeBank: "A",
      activeButton: "TopLeft",
      activeSample: "-1",

      showAddModal: false,
      waitModal: false,

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

    hasSelectedSample() {
      // This may not have been mounted when this is first called, so fail-safe.
      if (this.$refs.sample_selector === undefined) {
        return false;
      }

      return this.$refs.sample_selector.getSelectedSampleName() !== undefined;
    },

    setActiveSample(id) {
      this.activeSample = id;
    },

    addSample() {
      let name = this.$refs.sample_selector.getSelectedSampleName();

      // If we're adding a sample, we need to drop the return focus...
      this.$refs.add_sample_modal.returnFocus = undefined;
      this.$refs.add_sample_modal.closeModal();

      // this.$refs.add_sample_wait.openModal(
      //     undefined,
      //     this.$refs.add_sample_button
      // );
      // store.setAccessibilityNotification(
      //     "polite",
      //     "Please wait, analysing sample. This process may take a couple of minutes. Your GoXLR WILL be Unresponsive during this time."
      // );
      // store.pause();

      websocket.send_command(store.getActiveSerial(), {
        AddSample: [this.activeBank, this.activeButton, name],
      }).catch(error => {
        this.last_error = error.Error;
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

    stopAudio() {
      this.$refs.sample_selector.stopPlayback();
    },

    toggleAudio() {
      this.$refs.sample_selector.toggleAudio();
    },

    getPlaybackButton() {
      // Again, fail safe..
      if (this.$refs.sample_selector === undefined) {
        return "play";
      }

      if (this.$refs.sample_selector.isAudioPlaying()) {
        return "stop";
      }
      return "play";
    },

    clearErrors() {
      if (this.last_error !== undefined) {
        this.last_error = undefined;
      }

      if (store.getActiveDevice().sampler.processing_state.last_error !== null) {
        websocket.send_command(store.getActiveSerial(), {
          ClearSampleProcessError: []
        });
      }
    },
  },

  computed: {
    hasError() {
      if (this.last_error !== undefined) {
        return true;
      }
      return store.getActiveDevice().sampler.processing_state.last_error !== null;
    },

    error() {
      if (this.last_error !== undefined) {
        return this.last_error;
      }
      if (store.getActiveDevice().sampler.processing_state.last_error !== null) {
        return store.getActiveDevice().sampler.processing_state.last_error;
      }

      return "Error occurred handing Errors O_o";
    },

    sampleProgress() {
      return store.getActiveDevice().sampler.processing_state.progress;
    }
  },

  watch: {
    sampleProgress(newValue, oldValue) {
      // If we're going from null to not null, open the dialog..
      if ((oldValue === null) && (newValue !== null)) {
        // We need to open the Progress Dialog..
        this.$refs.add_sample_wait.openModal(undefined, this.$refs.add_sample_button);
      }

      // If we're going from a Value to null, close the dialog..
      if ((oldValue !== null && newValue == null)) {
        this.$refs.add_sample_wait.closeModal();

        store.setAccessibilityNotification(
            "polite",
            `Sample ${name} added to ${this.activeButton} button in bank ${this.activeBank}.`
        );
      }
    },

    hasError: {
      handler(newValue) {
        if (this.$refs.add_sample_error === undefined && newValue === true) {
          // We've picked up a cached error of some description, clear it.
          websocket.send_command(store.getActiveSerial(), {
            ClearSampleProcessError: []
          });

          return;
        }
        if (newValue === true) {
          this.$refs.add_sample_error.openModal(undefined, this.$refs.add_sample_button);
        }
      },
      immediate: true
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
