<template>
  <BigButton id="shutdown_button" ref="button" title="Shutdown Actions"
             @button-clicked="$refs.shutdownModal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-power-off"/>
  </BigButton>
  <AccessibleModal ref="shutdownModal" width="630px" id="shutdown_modal" :show_footer=false>
    <template v-slot:title>Shutdown Actions</template>
    <div v-if="isValid()">
      <div style="padding-bottom: 15px">
        These actions will be executed when Open GoXLR is safely shut down.
      </div>
      <div>
        <input type="checkbox" id="a" :checked="isActive('SaveProfile')" @change="changed"><label for="a">Save
        Profile</label>
      </div>
      <div>
        <input type="checkbox" id="b" :checked="isActive('SaveMicProfile')" @change="changed"><label for="b">Save Mic Profile</label>
      </div>
      <div>
        <input type="checkbox" ref="color_profile" id="c" :checked="isActive('LoadProfileColours')" @change="changed"><label for="c">Load
        Colour
        Profile: </label>
        <select @change="profileChanged" :value="getSelectedProfile()">
          <option v-for="value in getValues()" :key="value">{{ value }}</option>
        </select>
      </div>
    </div>
    <div v-else>
      Shutdown Configuration appears to have been manually modified,
    </div>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import {store} from "@/store";

export default {
  name: "ShutdownButton",
  components: {BigButton, AccessibleModal},

  methods: {
    isValid() {
      return true;
    },

    changed() {
      //console.log(e);
    },
    isActive(command) {
      for (const object of store.getActiveDevice().shutdown_commands) {
        for (const key in object) {
          if (key === command) {
            return true;
          }
        }
      }
      return false;
    },
    getValue(command) {
      for (const object of store.getActiveDevice().shutdown_commands) {
        for (const key in object) {
          if (key === command) {
            return object;
          }
        }
      }
    },

    getValues() {
      return store.getProfileFiles();
    },
    profileChanged(e) {
      if (this.$refs.color_profile.checked) {
        // We need to change the colour profile :)
        //console.log(e);
        console.log("Button checked, change profile to: " + e.srcElement.value);
        return;
      }

      console.log("Button not pressed, do nothing.");
    },
    getSelectedProfile() {
        return this.getValue("LoadProfileColours").LoadProfileColours;
    }
  }
}
</script>

<style scoped>

</style>