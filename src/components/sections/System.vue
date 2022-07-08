<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showModal = true">
      <MicIcon />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <HelpIcon />
      </BigButton>
    </a>

  </ContentBox>

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
import BigButton from "@/components/big_buttons/BigButton";
import MicIcon from "@/components/icons/MicIcon";
import HelpIcon from "@/components/icons/HelpIcon";
import Modal from "@/components/util/Modal";
import ButtonList from "@/components/button_list/ButtonList";
import Slider from "@/components/slider/Slider";
import Button from "@/components/button_list/Button";
export default {
  name: "SystemComponent",
  components: {HelpIcon, BigButton, ContentBox, MicIcon, Modal, ButtonList, Slider, Button},

  data() {
    return {
      showModal: false,
      setupTitle: "Mic Setup"
    }
  }

}
</script>

<style scoped>

</style>