<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <GroupContainer title="Preset">
        <RadioSelection
            title="Group"
            group="lighting_mixer_icon_select"
            :options="getEffectOptions()"
            :selected="getSelectedEffectOption()"
            :menu="menu_options"
            menu_id="profile_buttons"
            @menu-opened="menuOpened"
            @menu-selected="optionClicked"
            @selection-changed="onEffectSelectionChange"
        />
      </GroupContainer>

      <AccessibleModal ref="renamePresetModal" id="renameEffect" :show_close="false">
        <template v-slot:title>Enter New Preset Name</template>
        <template v-slot:default>
          <ModalInput ref="newName" v-model="newPresetName" placeholder="New Preset Name" @on-enter="$refs.renamePresetModal.closeModal(); renamePreset(); this.newPresetName = ''"/>
        </template>
        <template v-slot:footer>
          <ModalButton ref="focusOk" @click="renamePreset(); $refs.renamePresetModal.closeModal(); this.newPresetName = ''">OK</ModalButton>
          <ModalButton @click="$refs.renamePresetModal.closeModal(); this.newPresetName = ''">Cancel</ModalButton>
        </template>
      </AccessibleModal>

    </div>
    <ContentContainer :no-left-pad="true">
      <ReverbEffect/>
      <EchoEffect/>
      <PitchEffect/>
      <GenderEffect/>
      <MegaphoneEffect/>
      <RobotEffect/>
      <HardTuneEffect/>
    </ContentContainer>
  </div>
</template>

<script>
import ReverbEffect from "@/components/sections/effects/ReverbEffect";
import EchoEffect from "@/components/sections/effects/EchoEffect";
import PitchEffect from "@/components/sections/effects/PitchEffect";
import GenderEffect from "@/components/sections/effects/GenderEffect";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect";
import RobotEffect from "@/components/sections/effects/RobotEffect";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect";
import {EffectPresets} from "@/util/mixerMapping";
import {store} from "@/store";
import {sendHttpCommand, websocket} from "@/util/sockets";
import ModalButton from "@/components/design/modal/ModalButton";
import ModalInput from "@/components/design/modal/ModalInput";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";

export default {
  name: "EffectsTab",
  components: {
    AccessibleModal,
    GroupContainer,
    RadioSelection,
    ContentContainer,
    ModalInput,
    ModalButton,
    HardTuneEffect,
    RobotEffect, MegaphoneEffect, GenderEffect, PitchEffect, EchoEffect, ReverbEffect,
  },

  data() {
    return {
      effectPresets: EffectPresets,
      showRenameModal: false,
      newPresetName: '',

      // This will need to be generated per-button..
      menu_options: [{name: 'Rename', slug: 'rename'}, {name: 'Save to Library', slug: 'save'}],
    };
  },

  methods: {
    getEffectOptions() {
      // We need to build the list from existing effects..
      let effects = [];
      for (let i = 0; i < this.effectPresets.length; i++) {
        effects.push({
          id: this.effectPresets[i],
          label: this.getLabel(i, this.effectPresets[i]),
        })
      }

      return effects;
    },

    onEffectSelectionChange(id) {
      if (!this.isActive(id)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": id});
      }
    },

    getSelectedEffectOption() {
      return store.getActiveDevice().effects.active_preset;
    },

    getButtonId(preset_name) {
      return preset_name.toLowerCase().replace(" ", "_").replace("(", "_").replace(")", "_") + "_profile_button";
    },

    getLabel(id, key) {
      return (id + 1).toString() + ": " + store.getActiveDevice().effects.preset_names[key];
    },

    isActive(key) {
      return store.getActiveDevice().effects.active_preset === key;
    },

    buttonPressed(id) {
      if (!this.isActive(id)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": id});
      }
    },

    menuOpened(event, return_id, item) {
      if (!this.isActive(item)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": item});
      }
    },

    menuPressed(event, return_id, item) {
      // If this wasn't on the active profile, load the selected one..
      if (!this.isActive(item)) {
        websocket.send_command(store.getActiveSerial(), {"SetActiveEffectPreset": item});
      }
      this.$refs.contextMenu.showMenu(event, item, return_id, this.$refs.buttonList.getScrollTop());
    },

    renamePreset() {
      if (this.newPresetName === undefined || this.newPresetName === "") {
        return;
      }

      let command = {"RenameActivePreset": this.newPresetName}

      sendHttpCommand(store.getActiveSerial(), command);
      this.newPresetName = "";
    },

    saveActivePreset() {
      sendHttpCommand(store.getActiveSerial(), {"SaveActivePreset": []})
          .catch((error) => {
            console.log(error);
          });
    },

    optionClicked(event) {
      if (event.option.slug === "rename") {
        let element = document.getElementById(event.return_id);
        this.$refs.renamePresetModal.openModal(this.$refs.newName, element);
      }

      if (event.option.slug === "save") {
        this.saveActivePreset();
      }
    }
  }
}
</script>

<style scoped>
button {
  background-color: transparent;
  color: #fff;
  border: 0;
  padding: 0;
  margin: 0;
}

button:focus {
  outline: none;
}
</style>
