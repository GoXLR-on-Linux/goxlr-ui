<template>
  <ContentBox>
    <BigButton :title="setupTitle" @button-clicked="showModal = true">
      <MicIcon class="center" :view-box="'0 0 47.964 47.965'"/>
    </BigButton>
  </ContentBox>

  <!-- Build the Modal -->
  <Modal v-if="showModal" @close="showModal = false">
    <template v-slot:title>MIC SETUP</template>

    <ContentBox>
      <ButtonList title="Mic Type">
        <Button label="Dynamic" buttonId="0" :is-active="false" />
        <Button label="Condenser (+48V)" buttonId="1" :is-active="true" />
        <Button label="3.5mm" buttonId="2" :is-active="false" />
      </ButtonList>
      <Slider title="Gain" :slider-min-value=0 :slider-max-value=72 :text-min-value=0 :text-max-value=72 text-suffix="dB" :slider-value=0 />


    </ContentBox>
  </Modal>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import Modal from "@/components/util/Modal";
import ButtonList from "@/components/button_list/ButtonList";
import Button from "@/components/button_list/Button";
import Slider from "@/components/slider/Slider";
import BigButton from "@/components/big_buttons/BigButton";
import MicIcon from "@/components/icons/MicIcon";

export default {
  name: "SetupButton",
  components: {BigButton, Slider, Button, ButtonList, ContentBox, Modal, MicIcon},

  data() {
    return {
      showModal: false,
      setupTitle: "Mic Setup"
    }
  }
}
</script>

<style scoped>
.center{
  display: block;
  margin: auto;
}
</style>
