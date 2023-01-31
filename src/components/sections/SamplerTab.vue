<template>
  <GroupContainer title="Bank">
    <ListSelection title="Bank" group="sampler_bank" :options="bank_options" :selected="activeBank" @selection-changed="setActiveBank" />
    <ListSelection title="Button" group="sampler_button" :options="button_options" :selected="activeButton" @selection-changed="setActiveButton" />
    <ListSelection title="Function" group="sampler_function" :options="function_options" :selected="getActiveFunction()" @selection-changed="setActiveFunction" />
    <ListSelection title="Play Order" group="sampler_order" :options="order_options" :selected="getActiveOrder()" @selection-changed="setActiveOrder" />
  </GroupContainer>
  <GroupContainer title="Sampler">
    <ListSelection title="Samples" group="sampler_samples" :options="getSampleOptions()" :selected="activeSample" @selection-changed="setActiveSample">
            <PushButton @click="showAddModal = true">
              <template #left>
                <div style="text-align: center">+</div>
              </template>
            </PushButton>
    </ListSelection>

    <AudioVisualiser :active-bank="activeBank" :active-button="activeButton" :active-sample="parseInt(activeSample)" @deselect-sample="activeSample = '-1'" />
  </GroupContainer>

  <ModalBox v-if="showAddModal" @close="showAddModal = false">
    <template v-slot:title>Add Sample (Double Click) - WIP</template>
    <div style="overflow: auto; height: 230px">
      <SampleHandler @sample-clicked="addSample"/>
    </div>
    <template #footer>&nbsp;</template>
  </ModalBox>

  <ModalBox v-if="waitModal">
    <template v-slot:title>Add Sample</template>
      <div>Please wait, sample being analysed.<br />
        This process may take a couple of minutes.<br />
      Your GoXLR <b>WILL</b> be Unresponsive during this time.</div>
    <template #footer>&nbsp;</template>
  </ModalBox>
</template>

<script>
import {store} from "@/store";
import {sendHttpCommand, websocket} from "@/util/sockets";
import AudioVisualiser from "@/components/sections/sampler/AudioVisualiser";
import SampleHandler from "@/components/sections/files/SampleHandler";
import ModalBox from "@/components/design/modal/ModalBox";
import ListSelection from "@/components/button_list/ListSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import PushButton from "@/components/button_list/Button.vue";

export default {
  name: "SamplerTab",
  components: {
    PushButton,
    GroupContainer,
    ListSelection, ModalBox, SampleHandler, AudioVisualiser},

  data() {
    return {
      activeBank: "A",
      activeButton: "TopLeft",
      activeSample: "-1",

      showAddModal: false,
      waitModal: false,


      bank_options: [
        {id: "A", label: "A"},
        {id: "B", label: "B"},
        {id: "C", label: "C"}
      ],

      button_options: [
        {id: "TopLeft", label: "Top Left"},
        {id: "TopRight", label: "Top Right"},
        {id: "BottomLeft", label: "Bottom Left"},
        {id: "BottomRight", label: "Bottom Right"}
      ],

      function_options: [
        {id: "PlayNext", label: "Play-Next"},
        {id: "PlayStop", label: "Play-Stop"},
        {id: "PlayFade", label: "Play-Fade"},
        {id: "StopOnRelease", label: "Stop on Release"},
        {id: "FadeOnRelease", label: "Fade on Release"},
        {id: "Loop", label: "Loop"}
      ],

      order_options: [
        {id: "Sequential", label: "Sequential"},
        {id: "Random", label: "Random"}
      ]
    }
  },

  methods: {
    getSampleOptions() {
       let samples = [];
       this.getSamples().forEach((sample, index) => {
         samples.push({id: index.toString(), label: sample.name});
       });
       return samples;
    },

    setActiveBank(bank) {
      this.activeBank = bank;
      this.activeSample = -1;
    },

    setActiveButton(button) {
      this.activeButton = button;
      this.activeSample = -1;
    },


    getActiveFunction() {
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].function;
    },
    setActiveFunction(sampleFunction) {
      websocket.send_command(store.getActiveSerial(), {"SetSamplerFunction": [this.activeBank, this.activeButton, sampleFunction]});
    },
    getActiveOrder() {
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].order;
    },
    setActiveOrder(sampleOrder) {
      websocket.send_command(store.getActiveSerial(), {"SetSamplerOrder": [this.activeBank, this.activeButton, sampleOrder]});
    },

    getSamples() {
      return store.getActiveDevice().sampler.banks[this.activeBank][this.activeButton].samples;
    },
    setActiveSample(id) {
      this.activeSample = id;
    },

    addSample(name) {
      this.waitModal = true;
      this.showAddModal = false;
      store.pause();

      this.$nextTick(() => {
        sendHttpCommand(store.getActiveSerial(), {"AddSample": [this.activeBank, this.activeButton, name]}).then(() => {
          this.waitModal = false;
          store.resume();
        });
      })
    }
  }
}
</script>

<style scoped>

</style>
