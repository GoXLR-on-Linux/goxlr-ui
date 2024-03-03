<template>
  <GroupContainer :title="$t('message.sampler.bankTitle')">
    <RadioSelection
        :title="$t('message.sampler.banks.bankTitle')"
        group="sampler_bank"
        :options="bank_options"
        :selected="activeBank"
        @selection-changed="setActiveBank"
    />
    <RadioSelection
        :title="$t('message.sampler.banks.buttonTitle')"
        group="sampler_button"
        :options="button_options"
        :selected="activeButton"
        @selection-changed="setActiveButton"
        :label="$t('message.sampler.banks.buttonLabel', {activeBank: activeBank})"
    />
    <RadioSelection
        :title="$t('message.sampler.banks.functionTitle')"
        group="sampler_function"
        :options="function_options"
        :selected="getActiveFunction()"
        @selection-changed="setActiveFunction"
        :label="$t('message.sampler.banks.functionLabel', {activeButton: activeButton, activeBank: activeBank})"
    />
    <RadioSelection
        :title="$t('message.sampler.banks.playOrderTitle')"
        group="sampler_order"
        :options="order_options"
        :selected="getActiveOrder()"
        @selection-changed="setActiveOrder"
        :label="$t('message.sampler.banks.playOrderLabel', {activeButton: activeButton, activeBank: activeBank})"
    />
  </GroupContainer>
  <GroupContainer :title="$t('message.sampler.samplesTitle')">
    <RadioSelection
        :title="$t('message.sampler.samples.samplesTitle')"
        group="sampler_samples"
        :options="getSampleOptions()"
        :selected="activeSample"
        @selection-changed="setActiveSample"
        :label="$t('message.sampler.samples.samplesLabel', { activeButton: activeButton, activeBank: activeBank })"
    >
      <ButtonItem
          id="add_sample"
          ref="add_sample_button"
          :label="$t('message.sampler.samples.addSampleLabel')"
          :text="$t('message.sampler.samples.addSample')"
          :centered="true"
          @click="this.$refs.add_sample_modal.openModal($refs.sample_selector, $refs.add_sample_button);"
      >+
      </ButtonItem>
    </RadioSelection>
    <Slider :title="$t('message.sampler.samples.gain')" :id=0 :slider-min-value=0 :slider-max-value=200
            :text-suffix="$t('message.suffixes.percentage')" :slider-value=getSampleVolume() @value-changed="setVolume"
            :store-path="getStorePath()" :disabled="isVolumeDisabled()" @blur="commitValue"
    />


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
          :aria-label="$t('message.sampler.samples.accessibilityOpenSamplesDirectory')"
      >
        <font-awesome-icon icon="fa-solid fa-folder"/>
      </button>
    </template>

    <SampleFileSelector ref="sample_selector" max-height="300px" group="add_sample_list" prefix="add_sample_"/>

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
          >{{$t('message.sampler.samples.sampleSelector.addButton')}}
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
    <template v-slot:title>{{$t('message.sampler.samples.addSampleWaitTitle')}}</template>
    <div tabindex="0">
      {{$t('message.sampler.samples.addSampleAnalysing')}}<br/>
      {{$t('message.sampler.samples.addSampleProgress', {progress: sampleProgress})}}
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
    <template v-slot:title>{{$t('message.sampler.samples.errorTitle')}}</template>
    <div tabindex="0">
      {{$t('message.sampler.samples.errorText')}}<br/><br/>
      {{ error }}
    </div>
  </AccessibleModal>
</template>

<script>
import {store} from "@/store";
import AudioVisualiser from "@/components/sections/sampler/AudioVisualiser.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import ButtonItem from "@/components/lists/ButtonItem.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import {websocket} from "@/util/sockets";
import SampleFileSelector from "@/components/sections/sampler/SampleFileSelector.vue";
import Slider from "@/components/slider/Slider.vue";

export default {
  emits: ["on-sample-bank-change"],

  name: "SamplerTab",
  components: {
    Slider,
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
        {id: "A", label: this.$t('message.sampler.banks.bank.a')},
        {id: "B", label: this.$t('message.sampler.banks.bank.b')},
        {id: "C", label: this.$t('message.sampler.banks.bank.c')},
      ],

      button_options: [
        {id: "TopLeft", label: this.$t('message.sampler.banks.buttons.topLeft')},
        {id: "TopRight", label: this.$t('message.sampler.banks.buttons.topRight')},
        {id: "BottomLeft", label: this.$t('message.sampler.banks.buttons.bottomLeft')},
        {id: "BottomRight", label: this.$t('message.sampler.banks.buttons.bottomRight')},
      ],

      function_options: [
        {id: "PlayNext", label: this.$t('message.sampler.banks.functions.playNext')},
        {id: "PlayStop", label: this.$t('message.sampler.banks.functions.playStop')},
        {id: "PlayFade", label: this.$t('message.sampler.banks.functions.playFade')},
        {id: "StopOnRelease", label: this.$t('message.sampler.banks.functions.stopOnRelease')},
        {id: "FadeOnRelease", label: this.$t('message.sampler.banks.functions.fadeOnRelease')},
        {id: "Loop", label: "Loop"},
      ],

      order_options: [
        {id: "Sequential", label: this.$t('message.sampler.banks.playOrders.sequential')},
        {id: "Random", label: this.$t('message.sampler.banks.playOrders.random')},
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

      this.$emit("on-sample-bank-change", bank);
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

      // If a sample button is cleared, the active sample disappears, we need to return nothing..
      if (store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].samples[id] === undefined) {
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

    getSampleVolume() {
      if (this.activeSample !== "-1") {
        let sample_name = this.getActiveSampleName(this.activeSample);

        // eslint-disable-next-line no-unused-vars
        for (let [key, sample] of Object.entries(store.getSampleFiles())) {
          if (sample.name === sample_name) {
            return sample.gain_pct;
          }
        }
      }
      // Not found, or not selected, either way, hit the default.
      return 100;
    },

    setVolume(id, volume) {
      // Get the Selected Sample Name..
      let sample_name = this.getActiveSampleName(this.activeSample);

      websocket.send_daemon_command({
        "SetSampleGainPct": [sample_name, volume]
      })
    },
    getStorePath() {
      return "";
    },
    commitValue() {
      websocket.send_daemon_command("ApplySampleChange");
    },

    isVolumeDisabled() {
      if (this.activeSample === '-1') {
        return true;
      }

      if (store.getActiveDevice().sampler.banks[this.activeBank][
          this.activeButton
          ].is_playing) {
        return true;
      }
      return false;

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
        store.setAccessibilityNotification(
            "polite",
            this.$t('message.sampler.samples.accessibilityAnalysing')
        );
      }

      if (oldValue !== null && newValue !== null && this.$refs.add_sample_wait !== undefined && !this.$refs.add_sample_wait.isOpen()) {
        // User has opened the page while something was processing? Throw open the modal.
        this.$refs.add_sample_wait.openModal(undefined, this.$refs.add_sample_button);
        store.setAccessibilityNotification(
            "polite",
            this.$t('message.sampler.samples.accessibilityAnalysing')
        );
      }

      // If we're going from a Value to null, close the dialog..
      if ((oldValue !== null && newValue == null) && this.$refs.add_sample_wait.isOpen()) {
        this.$refs.add_sample_wait.closeModal();

        store.setAccessibilityNotification(
            "polite",
            this.$t('message.sampler.accessibilityAdded', {
              name: name,
              activeButton: this.activeButton,
              activeBank: this.activeBank
            })
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
