<template>
  <div style="display: flex">
    <div style="padding: 40px 20px 40px 40px;">
      <GroupContainer title="Preset">
        <RadioSelection
            title="Group"
            group="preset_select"
            :options="getEffectOptions()"
            :selected="getSelectedEffectOption()"
            :menu="menu_options"
            menu_id="preset_buttons"
            @menu-opened="menuOpened"
            @menu-selected="optionClicked"
            @selection-changed="onEffectSelectionChange"
        />
      </GroupContainer>
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

  <!-- Modals -->
  <AccessibleModal ref="renamePresetModal" id="renameEffect" :show_close="false">
    <template v-slot:title>Enter New Preset Name</template>
    <template v-slot:default>
      <ModalInput ref="newName" v-model="newPresetName" placeholder="New Preset Name" @on-enter="renamePreset();"/>
    </template>
    <template v-slot:footer>
      <ModalButton ref="focusOk" @click="renamePreset();">OK</ModalButton>
      <ModalButton @click="$refs.renamePresetModal.closeModal(); this.newPresetName = ''">Cancel</ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal
      ref="select_preset_modal"
      id="select_preset"
      :show_footer="true"
  >
    <template v-slot:title>
      <span>Load Preset</span>
      <button
          class="openButton"
          @click="openPresets"
          aria-label="Open Presets Directory"
      >
        <font-awesome-icon icon="fa-solid fa-folder"/>
      </button>
    </template>
    <ScrollingRadioList
        v-if="getPresetList().length > 0"
        max_height="300px"
        group="preset_list"
        :options="getPresetList()"
        :selected="getSelectedPreset()"
        @selection-changed="selectPreset"
    />
    <span v-else>
      There are currently no presets in the library, save or copy some for them to appear here.
    </span>
    <template v-slot:footer>
      <ModalButton
          ref="ok" class="modal-default-button" :enabled="selectedPreset !== undefined"
          @click="confirmPresetLoad()">Ok
      </ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="override_preset_modal" id="override_preset" :show_close="false">
    <template v-slot:title>Confirm Preset Load</template>
    <template v-slot:default>
      Loading this preset will replace any unsaved changes on this effects bank, would you like to proceed?
    </template>
    <template v-slot:footer>
      <ModalButton ref="confirmFocusOk" @click="loadPreset()">OK</ModalButton>
      <ModalButton @click="this.selectedPreset = undefined; $refs.override_preset_modal.closeModal();">Cancel
      </ModalButton>
    </template>
  </AccessibleModal>

  <AccessibleModal ref="overwrite_library_save" id="overwrite_save" :show_close="false">
    <template v-slot:title>Confirm Preset Overwrite</template>
    <template v-slot:default>
      The preset {{ getCurrentPresetName() }} already exists in your library, would you like to overwrite?
    </template>
    <template v-slot:footer>
      <ModalButton ref="overwriteConfirm" @click="saveActivePreset(); $refs.overwrite_library_save.closeModal();">
        Overwrite
      </ModalButton>
      <ModalButton @click="$refs.overwrite_library_save.closeModal();">Cancel</ModalButton>
    </template>
  </AccessibleModal>
</template>

<script>
import ReverbEffect from "@/components/sections/effects/ReverbEffect.vue";
import EchoEffect from "@/components/sections/effects/EchoEffect.vue";
import PitchEffect from "@/components/sections/effects/PitchEffect.vue";
import GenderEffect from "@/components/sections/effects/GenderEffect.vue";
import MegaphoneEffect from "@/components/sections/effects/MegaphoneEffect.vue";
import RobotEffect from "@/components/sections/effects/RobotEffect.vue";
import HardTuneEffect from "@/components/sections/effects/HardTuneEffect.vue";
import {EffectPresets} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import ModalButton from "@/components/design/modal/ModalButton.vue";
import ModalInput from "@/components/design/modal/ModalInput.vue";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import ScrollingRadioList from "@/components/lists/ScrollingRadioList.vue";

export default {
  name: "EffectsTab",
  components: {
    ScrollingRadioList,
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

      selectedPreset: undefined,

      // This will need to be generated per-button..
      menu_options: [
        {name: "Load Preset", slug: "load"},
        {name: 'Rename', slug: 'rename'},
        {name: 'Save to Library', slug: 'save'}
      ],
    };
  },

  methods: {
    getCurrentPresetName() {
      return store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset];
    },

    openPresets() {
      websocket.open_path("Presets");
    },

    confirmPresetLoad() {
      let returnRef = this.$refs.select_preset_modal.returnFocus;

      this.$refs.select_preset_modal.returnFocus = undefined;
      this.$refs.select_preset_modal.closeModal();

      this.$refs.override_preset_modal.openModal(this.$refs.confirmFocusOk, returnRef);
    },

    getPresetList() {
      let presets = [];
      for (let preset of store.getPresetFiles().sort(Intl.Collator().compare)) {
        presets.push({
          id: preset,
          label: preset,
        });
      }
      return presets;
    },

    getSelectedPreset() {
      return this.selectedPreset;
    },

    selectPreset(preset) {
      this.selectedPreset = preset;
    },

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

    loadPreset() {
      let name = this.getSelectedPreset();
      websocket.send_command(store.getActiveSerial(), {"LoadEffectPreset": name}).then(() => {
        store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset] = name;

        let currentBank = EffectPresets.indexOf(store.getActiveDevice().effects.active_preset) + 1;
        store.setAccessibilityNotification(
            "polite",
            `Preset ${name} loaded to bank ${currentBank}.`
        );

        this.selectedPreset = undefined;
      }).finally(() => {
        let self = this;
        setTimeout(() => {
          self.$refs.override_preset_modal.closeModal();
        }, 10);
      });
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

      websocket.send_command(store.getActiveSerial(), command).then(() => {
        store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset] = this.newPresetName;
      }).finally(() => {
        let self = this;
        this.newPresetName = ''
        setTimeout(() => {
          self.$refs.renamePresetModal.closeModal();
        }, 10);
      });
    },

    saveActivePreset() {
      let name = store.getActiveDevice().effects.preset_names[store.getActiveDevice().effects.active_preset];

      websocket.send_command(store.getActiveSerial(), {"SaveActivePreset": []});
      store.setAccessibilityNotification(
          "polite",
          `Preset ${name} saved to library`
      );
    },

    optionClicked(event) {
      if (event.option.slug === "load") {
        let element = document.getElementById(event.return_id);
        this.$refs.select_preset_modal.openModal(undefined, element);
      }

      if (event.option.slug === "rename") {
        let element = document.getElementById(event.return_id);
        this.$refs.renamePresetModal.openModal(this.$refs.newName, element);
      }

      if (event.option.slug === "save") {
        // Get the Current Preset..
        let current = this.getCurrentPresetName();

        // Does this exist in the library?
        if (store.getPresetFiles().includes(current)) {
          let element = document.getElementById(event.return_id);
          this.$refs.overwrite_library_save.openModal(this.$refs.overwriteConfirm, element);
        } else {
          this.saveActivePreset();
        }
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

.openButton {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin-left: 5px;


  display: inline-block;
  color: #a5a7a6;
  font-size: 14px;
}

.openButton:hover {
  color: #fff;
  cursor: pointer;
}
</style>
