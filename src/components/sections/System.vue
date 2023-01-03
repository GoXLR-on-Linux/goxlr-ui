<template>
  <ContentBox :title="'System'">
    <BigButton :title="'Mic Setup'" @button-clicked="showMicModal = true">
      <font-awesome-icon icon="fa-solid fa-microphone-lines" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <BigButton title="Settings" @button-clicked="showSettingsModal = true">
      <font-awesome-icon icon="fa-solid fa-gear" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <BigButton title="About" @button-clicked="showVersionModal = true">
      <font-awesome-icon icon="fa-solid fa-circle-info" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <BigButton title="License" @button-clicked="showLicenseModal = true">
      <font-awesome-icon icon="fa-solid fa-book-open" />
    </BigButton>
    <div style="margin-right: 30px"></div>
    <a :href="'https://discord.gg/Wbp3UxkX2j'">
      <BigButton :title="'Help'">
        <font-awesome-icon icon="fa-solid fa-circle-question" />
      </BigButton>
    </a>

  </ContentBox>

  <ModalBox v-if="showMicModal" @close="showMicModal = false">
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
  <ModalBox width="680px" v-if="showSettingsModal" @close="showSettingsModal = false">
    <template v-slot:title>Device Settings (Work In Progress)</template>
    <div style="text-align: left">
      <div style="padding: 12px">
        <span style="display: inline-block; width: 300px">Mute Button Hold to Mute All Duration: </span>
        <SimpleNumberInput :min-value="0" :max-value="5000" @value-updated="updateHold" :current-text-value="getHold()" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Voice Chat Mute All Also Mutes Mic To Chat Mic:</span>
        <input type="checkbox" :checked="get_vcmaammtcm()" @change="set_vcmaammtcm" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Autostart on Login:</span>
        <input type="checkbox" :checked="isAutostart()" @change="setAutoStart" />
      </div>
      <div style="padding: 12px">
        <span style="display: inline-block; width: 360px">Show Tray Icon (requires restart):</span>
        <input type="checkbox" :checked="isShowIcon()" @change="setShowIcon" />
      </div>
      <div style="padding: 12px">
        <button style="margin: 3px" @click="recover_defaults('Profiles')">Recover Default Profiles</button>
        <button style="margin: 3px" @click="recover_defaults('Icons')">Recover Default Icons</button>
        <button style="margin: 3px" @click="recover_defaults('Presets')">Recover Default Presets</button>
      </div>
      <div style="padding: 12px">
        <button style="background-color: darkred; color: white" @click="shutdown_util()">Shutdown GoXLR Utility</button>
      </div>
    </div>
  </ModalBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import BigButton from "@/components/big_buttons/BigButton";
import SetupModel from "@/components/sections/mic/SetupModel";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import ModalBox from "@/components/design/modal/ModalBox";
import {store} from "@/store";
import SimpleNumberInput from "@/components/design/SimpleNumberInput";
import {websocket} from "@/util/sockets";
export default {
  name: "SystemComponent",
  components: {SimpleNumberInput, ModalBox, SetupModel, BigButton, ContentBox, FontAwesomeIcon},

  data() {
    return {
      showMicModal: false,
      showVersionModal: false,
      showLicenseModal: false,
      showSettingsModal: false,
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

    getHold() {
      if (!store.hasActiveDevice()) {
        return 0;
      }
      return store.getActiveDevice().settings.mute_hold_duration;
    },

    updateHold(value) {
      websocket.send_command(store.getActiveSerial(),  { "SetMuteHoldDuration": value });
    },

    get_vcmaammtcm() {
      // I hate this name :D
      if (!store.getActiveDevice()) {
        return false;
      }
      return store.getActiveDevice().settings.vc_mute_also_mute_cm;
    },

    set_vcmaammtcm(event) {
      console.log(event);
      websocket.send_command(store.getActiveSerial(), {"SetVCMuteAlsoMuteCM": event.target.checked})
    },

    isAutostart() {
      return store.isAutostartEnabled();
    },

    setAutoStart(event) {
      websocket.set_autostart(event.target.checked);
    },

    isShowIcon() {
      return store.isShowIcon();
    },

    setShowIcon(event) {
      websocket.set_show_icon(event.target.checked);
    },

    recover_defaults(type) {
      websocket.recover_defaults(type);
    },

    shutdown_util() {
      websocket.send_shutdown();
    }
  }
}
</script>

<style scoped>

</style>
