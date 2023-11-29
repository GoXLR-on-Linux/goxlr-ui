<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";

export default {
  name: "PowerShutdown",

  props: {
    title: {type: String, required: true},
    is_sleep: {type: Boolean, required: true},
  },

  data: function () {
    return {
      commands: ["SaveProfile", "SaveMicProfile", "LoadMicProfile", "LoadProfile", "LoadProfileColours"],
    };
  },

  methods: {
    getId(name) {
      return ((this.is_sleep) ? "sleep_" : "shutdown_") + name;
    },

    isValid() {
      // Ok, firstly, we need to iterate over all the comamnds, and see if any aren't in our list...
      let commands = [];
      let order = [];

      let objects = store.getActiveDevice().shutdown_commands;
      if (this.is_sleep) {
        objects = store.getActiveDevice().sleep_commands;
      }

      for (const object of objects) {
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
      return order.every((value, index, array) => !index || array[index - 1] <= value);
    },

    isActive(command) {
      return this.getValue(command) !== undefined;
    },

    profileChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadColourProfile.checked) {
        return;
      }
      this.generateActions();
    },

    fullProfileChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadFullProfile.checked) {
        return;
      }
      this.generateActions();
    },

    micProfileChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadMicProfile.checked) {
        return;
      }
      this.generateActions();
    },

    getSelectedProfile() {
      let profile = this.getValue("LoadProfileColours");
      if (profile !== undefined) {
        return profile.LoadProfileColours;
      }

      return this.getProfiles()[0];
    },

    getSelectedFullProfile() {
      let profile = this.getValue("LoadProfile");
      if (profile !== undefined) {
        return profile.LoadProfile[0];
      }

      return this.getProfiles()[0];
    },

    getSelectedMicProfile() {
      let profile = this.getValue("LoadMicProfile");
      if (profile !== undefined) {
        return profile.LoadMicProfile[0];
      }

      return this.getMicProfiles()[0];
    },

    getValue(command) {
      let objects = store.getActiveDevice().shutdown_commands;
      if (this.is_sleep) {
        objects = store.getActiveDevice().sleep_commands;
      }

      for (const object of objects) {
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

    getMicProfiles() {
      return store.getMicProfileFiles();
    },

    changed() {
      // If any checkmark changes, we need to send an updated command list to the Daemon.
      this.generateActions();
    },

    generateActions() {
      let actions = [];
      if (this.$refs.saveProfile.checked) {
        actions.push({"SaveProfile": []});
      }
      if (this.$refs.saveMicProfile.checked) {
        actions.push({"SaveMicProfile": []})
      }
      if (this.$refs.loadMicProfile.checked) {
        actions.push({"LoadMicProfile": [this.$refs.micProfile.value, false]})
      }
      if (this.$refs.loadFullProfile.checked) {
        actions.push({"LoadProfile": [this.$refs.fullProfile.value, false]})
      }
      if (this.$refs.loadColourProfile.checked) {
        actions.push({"LoadProfileColours": this.$refs.colourProfile.value});
      }

      let command = (this.is_sleep) ? "SetSleepCommands" : "SetShutdownCommands";
      websocket.send_command(store.getActiveSerial(), {[command]: actions});
    },

    resetShutdownActions() {
      let command = (this.is_sleep) ? "SetSleepCommands" : "SetShutdownCommands";
      websocket.send_command(store.getActiveSerial(), {[command]: []});
    }
  }
}
</script>

<template>
  <b>{{ this.title }}</b>
  <hr/>
  <div v-if="isValid()" style="margin-bottom: 20px;">
    <div style="padding-bottom: 15px">
      These actions will be executed when
      <span v-if="!this.is_sleep">the GoXLR Utility is safely shut down.</span>
      <span v-else>your system is going to Sleep.</span>
    </div>
    <div>
      <input type="checkbox" ref="saveProfile" :id="this.getId('saveProfile')" :checked="isActive('SaveProfile')"
             @change="changed"><label :for="this.getId('saveProfile')">Save Profile</label>
    </div>
    <div>
      <input type="checkbox" ref="saveMicProfile" :id="this.getId('saveMicProfile')" :checked="isActive('SaveMicProfile')"
             @change="changed"><label :for="this.getId('saveMicProfile')">Save Mic Profile</label>
    </div>
    <div>
      <span style="display: inline-block; width: 200px">
      <input type="checkbox" ref="loadMicProfile" :id="this.getId('loadMicProfile')" :checked="isActive('LoadMicProfile')"
             @change="changed"><label :for="this.getId('loadMicProfile')">Load Mic Profile: </label>
      </span>
      <select ref="micProfile" @change="micProfileChanged" :value="getSelectedMicProfile()">
        <option v-for="value in getMicProfiles()" :key="value">{{ value }}</option>
      </select>
    </div>
    <div>
      <span style="display: inline-block; width: 200px">
      <input type="checkbox" ref="loadFullProfile" :id="this.getId('loadFullProfile')" :checked="isActive('LoadProfile')"
             @change="changed"><label :for="this.getId('loadFullProfile')">Load Full Profile: </label>
      </span>
      <select ref="fullProfile" @change="fullProfileChanged" :value="getSelectedFullProfile()">
        <option v-for="value in getProfiles()" :key="value">{{ value }}</option>
      </select>
    </div>
    <div>
      <span style="display: inline-block; width: 200px">
      <input type="checkbox" ref="loadColourProfile" :id="this.getId('loadColourProfile')" :checked="isActive('LoadProfileColours')"
             @change="changed"><label :for="this.getId('loadColourProfile')">Load Colour Profile: </label>
      </span>
      <select ref="colourProfile" @change="profileChanged" :value="getSelectedProfile()">
        <option v-for="value in getProfiles()" :key="value">{{ value }}</option>
      </select>
    </div>
  </div>
  <div v-else>
    Shutdown Configuration appears to have been manually modified, in order to prevent damage, the UI here will not
    function. To completely reset the shutdown actions, press the button below:<br/><br/>
    <button @click="resetShutdownActions">Reset Shutdown Actions</button>
  </div>
</template>

<style scoped>

</style>