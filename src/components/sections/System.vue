<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showModal = true">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <BigButton title="About" @button-clicked="showVersionModal = true">
      <font-awesome-icon icon="fa-solid fa-circle-question" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <BigButton title="License" @button-clicked="showLicenseModal = true">
      <font-awesome-icon icon="fa-solid fa-circle-question" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <font-awesome-icon icon="fa-solid fa-circle-question" />
      </BigButton>
    </a>

  </ContentBox>

  <ModalBox v-if="showMicModal" @close="showModal = false">
      <template v-slot:title>MIC SETUP</template>
      <SetupModel />
  </ModalBox>

  <ModalBox v-if="showVersionModal" @close="showVersionModal = false">
    <template v-slot:title>About GoXLR</template>
    <div style="text-align: left">
      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">Serial</div>
        <div>{{getSerial()}}</div>
      </div>

      <div style="margin-bottom: 20px">
        <div style="font-size: 16px; font-weight: bold">Utility Version</div>
        <div>{{getUtilityVersion()}}</div>
      </div>

      <div>
        <div style="font-size: 16px; font-weight: bold">Hardware Version</div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">Firmware: </span>
          <span>{{getFirmwareVersion()}}</span>
        </div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">Dice: </span>
          <span>{{getDice()}}</span>
        </div>
        <div>
          <span style="display: inline-block; width: 80px; font-weight: bold">FPGA: </span>
          <span>{{getFPGACount()}}</span>
        </div>
      </div>
    </div>
    <template v-slot:footer>&nbsp;</template>
  </ModalBox>

  <ModalBox width="680px" v-if="showLicenseModal" @close="showLicenseModal = false">
    <template v-slot:title>Licenses</template>
    <textarea style="width: 630px; height: 710px; background-color: #2B2F2D; color: #fff; border: 1px solid #000; resize: none" disabled>Copyright (c) 2022 Nathan Adams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

-----------------------------------------------------------------------------------

Copyright 2022 Music Tribe Brands CA Ltd.

This code and documentation contain information and intellectual property that
is owned by MUSIC TRIBE. Permission is hereby granted to any person obtaining a
copy of this software and associated documentation files to use the information
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and to permit persons to whom the software
and documentation is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</textarea>
    <template v-slot:footer>&nbsp;</template>
  </ModalBox>
</template>


<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalBox from "@/components/design/modal/ModalBox";
import {store} from "@/store";
export default {
  name: "SystemComponent",
  components: {ModalBox, SetupModel, BigButton, ContentBox, FontAwesomeIcon},

  data() {
    return {
      showMicModal: false,
      showVersionModal: false,
      showLicenseModal: false,
      setupTitle: "Mic Setup"
    }
  },

  methods: {
    getSerial() {
      return store.getActiveSerial();
    },

    getUtilityVersion() {
      return store.getVersion();
    },

    getFirmwareVersion() {
      let version = store.getActiveDevice().hardware.versions.firmware;
      return version[0] + "." + version[1] + "." + version[2] + "." + version[3];
    },

    getDice() {
      let version = store.getActiveDevice().hardware.versions.dice;
      return version[0] + "." + version[1] + "." + version[2] + "." + version[3];
    },

    getFPGACount() {
      return store.getActiveDevice().hardware.versions.fpga_count;
    },
  }
}
</script>

<style scoped>

</style>