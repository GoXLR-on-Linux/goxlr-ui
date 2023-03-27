<template>
  <BigButton id="shutdown_button" ref="button" title="Shutdown Actions"
             @button-clicked="$refs.shutdownModal.openModal(undefined, $refs.button)">
    <font-awesome-icon icon="fa-solid fa-power-off"/>
  </BigButton>
  <AccessibleModal ref="shutdownModal" width="630px" id="shutdown_modal" :show_footer=false>
    <template v-slot:title>Shutdown Actions</template>
    <div v-if="isValid()">
      <div style="padding-bottom: 15px">
        These actions will be executed when the GoXLR Utility is safely shut down.
      </div>
      <div>
        <input type="checkbox" ref="saveProfile" id="saveProfile" :checked="isActive('SaveProfile')"
               @change="changed"><label for="saveProfile">Save Profile</label>
      </div>
      <div>
        <input type="checkbox" ref="saveMicProfile" id="saveMicProfile" :checked="isActive('SaveMicProfile')"
               @change="changed"><label for="saveMicProfile">Save Mic Profile</label>
      </div>
      <div>
        <input type="checkbox" ref="loadColourProfile" id="loadColourProfile" :checked="isActive('LoadProfileColours')"
               @change="changed"><label for="loadColourProfile">Load Colour Profile: </label>
        <select ref="colourProfile" @change="profileChanged" :value="getSelectedProfile()">
          <option v-for="value in getProfiles()" :key="value">{{ value }}</option>
        </select>
      </div>
    </div>
    <div v-else>
      Shutdown Configuration appears to have been manually modified, in order to prevent damage, the UI here will not
      function. To completely reset the shutdown actions, press the button below:<br /><br />
      <button @click="resetShutdownActions">Reset Shutdown Actions</button>
    </div>
  </AccessibleModal>
</template>

<script>
import AccessibleModal from "@/components/design/modal/AccessibleModal.vue";
import BigButton from "@/components/buttons/BigButton.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";


export default {
  name: "ShutdownButton",
  components: {BigButton, AccessibleModal},

  data: function() {
    return {
      commands: ["SaveProfile", "SaveMicProfile", "LoadProfileColours"],
  };
},

  methods: {
    isValid() {
      // Ok, firstly, we need to iterate over all the comamnds, and see if any aren't in our list...
      let commands = [];
      let order = [];

      for (const object of store.getActiveDevice().shutdown_commands) {
        for (const key in object) {
          if (!this.commands.includes(key)) {
            return false;
          } else {
            // Perform a duplicate check...
            if (commands.includes(key)) {
              return false;
            }
            order.push(this.commands.indexOf(key));
            commands.push(key);
          }
        }
      }

      // Now verify the order of the commands...
      return order.every((value, index, array) => !index || array[index-1] <= value);
    },

    isActive(command) {
      return this.getValue(command) !== undefined;
    },

    getValue(command) {
      for (const object of store.getActiveDevice().shutdown_commands) {
        for (const key in object) {
          if (key === command) {
            return object;
          }
        }
      }
      return undefined;
    },

    getProfiles() {
      return store.getProfileFiles();
    },

    changed() {
      // If any checkmark changes, we need to send an updated command list to the Daemon.
      this.generateShutdownActions();
    },

    profileChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadColourProfile.checked) {
        return;
      }
      this.generateShutdownActions();
    },

    getSelectedProfile() {
      let profile = this.getValue("LoadProfileColours");
      if (profile !== undefined) {
        return profile.LoadProfileColours;
      }

      return this.getProfiles()[0];
    },

    generateShutdownActions() {
      let actions = [];
      if (this.$refs.saveProfile.checked) {
        actions.push({"SaveProfile": []});
      }
      if (this.$refs.saveMicProfile.checked) {
        actions.push({"SaveMicProfile": []})
      }
      if (this.$refs.loadColourProfile.checked) {
        actions.push({"LoadProfileColours": this.$refs.colourProfile.value});
      }

      websocket.send_command(store.getActiveSerial(), { "SetShutdownCommands": actions });
    },

    resetShutdownActions() {
      websocket.send_command(store.getActiveSerial(), { "SetShutdownCommands": [] });
    }
  }
}
</script>

<style scoped>

</style>