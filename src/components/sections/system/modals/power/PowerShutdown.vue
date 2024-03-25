<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import PowerBooleanSetting from "@/components/sections/system/modals/power/settings/PowerBooleanSetting.vue";
import PowerBooleanListSetting from "@/components/sections/system/modals/power/settings/PowerBooleanListSetting.vue";

export default {
  name: "PowerShutdown",
  components: {PowerBooleanListSetting, PowerBooleanSetting},

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

    micProfileChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadMicProfile.checked) {
        return;
      }
      this.generateActions();
    },

    profileChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadFullProfile.checked) {
        return;
      }
      this.generateActions();
    },

    profileColourChanged() {
      // Only send an update to the Daemon if the Load Colours checkbox is actually checked.
      if (!this.$refs.loadProfileColours.checked) {
        return;
      }
      this.generateActions();
    },

    getSelectedMicProfile() {
      let profile = this.getValue("LoadMicProfile");
      if (profile !== undefined) {
        return profile.LoadMicProfile[0];
      }
      return undefined;
    },

    getSelectedProfile() {
      let profile = this.getValue("LoadProfile");
      if (profile !== undefined) {
        return profile.LoadProfile[0];
      }
      return undefined;
    },

    getSelectedColourProfile() {
      let profile = this.getValue("LoadProfileColours");
      if (profile !== undefined) {
        return profile.LoadProfileColours;
      }
      return undefined;
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

    getMicProfiles() {
      return store.getMicProfileFiles();
    },

    getProfiles() {
      return store.getProfileFiles();
    },


    getMicProfileList() {
      let list = [];
      for (let profile of store.getMicProfileFiles()) {
        list.push({
          key: profile,
          value: profile,
        });
      }
      return list;
    },

    getProfileList() {
      let list = [];
      for (let profile of store.getProfileFiles()) {
        list.push({
          key: profile,
          value: profile
        });
      }
      return list;
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
        actions.push({"LoadMicProfile": [this.$refs.loadMicProfile.selectedValue(), false]})
      }
      if (this.$refs.loadProfile.checked) {
        actions.push({"LoadProfile": [this.$refs.loadProfile.selectedValue(), false]})
      }
      if (this.$refs.loadProfileColours.checked) {
        actions.push({"LoadProfileColours": this.$refs.loadProfileColours.selectedValue()});
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
      <span v-if="!this.is_sleep">{{ $t('message.system.power.shutdownDescription') }}</span>
      <span v-else>{{ $t('message.system.power.sleepDescription') }}</span>
    </div>
    <div class="settingList">
      <PowerBooleanSetting ref="saveProfile" @check-change="changed" :enabled="isActive('SaveProfile')"
                           :description="$t('message.system.power.power_options.saveProfile')"
                           :label="$t('message.system.power.power_options.saveProfile')"/>

      <PowerBooleanSetting ref="saveMicProfile" @check-change="changed" :enabled="isActive('SaveMicProfile')"
                           :description="$t('message.system.power.power_options.saveMicProfile')"
                           :label="$t('message.system.power.power_options.saveMicProfile')"/>

      <PowerBooleanListSetting ref="loadMicProfile" @check-change="changed" @select-change="micProfileChanged"
                               :value="getSelectedMicProfile()" :options="getMicProfileList()"
                               :enabled="isActive('LoadMicProfile')"
                               :description="$t('message.system.power.power_options.loadMicProfile')"
                               :label="$t('message.system.power.power_options.loadMicProfile')"/>

      <PowerBooleanListSetting ref="loadProfile" @check-change="changed" @select-change="profileChanged"
                               :value="getSelectedProfile()" :options="getProfileList()"
                               :enabled="isActive('LoadProfile')"
                               :description="$t('message.system.power.power_options.loadProfile')"
                               :label="$t('message.system.power.power_options.loadProfile')"/>

      <PowerBooleanListSetting ref="loadProfileColours" @check-change="changed" @select-change="profileColourChanged"
                               :value="getSelectedColourProfile()" :options="getProfileList()"
                               :enabled="isActive('LoadProfileColours')"
                               :description="$t('message.system.power.power_options.loadColourProfile')"
                               :label="$t('message.system.power.power_options.loadColourProfile')"/>
    </div>
  </div>
  <div v-else>
    {{ $t('message.system.power.settingsError') }}:<br/><br/>
    <button @click="resetShutdownActions">{{ $t('message.system.power.settingsReset') }}</button>
  </div>
</template>

<style scoped>
.settingList > :nth-child(odd) {
  background-color: #353937;
}

.settingList > :nth-child(even) {
  background-color: #242826;
}
</style>