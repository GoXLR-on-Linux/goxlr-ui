<template>
  <!-- Lets just draw the table.. -->
  <CenteredContainer>
    <GroupContainer :label="$t('message.routing.title')">
      <table>
        <thead>
          <tr>
            <th colspan="2" class="hidden">&nbsp;</th>
            <th :colspan="InputRouting().length">{{ $t('message.routing.input') }}</th>
          </tr>
          <tr class="subHeader">
            <th colspan="2" class="hidden">&nbsp;</th>
            <th v-for="input in InputRouting()" :key="input">{{
              $t(`message.routing.inputs["${input}"]`)
              }}
            </th>
          </tr>
        </thead>
        <tr v-for="output in getOutputChannels" :key="output">
          <th v-if="output === 'Headphones'" class="rotated" :rowspan="getOutputChannels.length">
            <span>{{ $t('message.routing.output') }}</span></th>
          <SubmixButton :name="output" :display="getOutputString(output)" v-if="submixEnabled()" />
          <th v-else>{{ getOutputString(output) }}</th>
          <Cell v-for="input in InputRouting()" :key="input" :enabled="isEnabled(output, input)" :output="output"
            :input="input" :orange="isDeviceMix(output, 'B')" @clicked="handleClick"
            :cell-disabled="!canRoute(output, input)" />
        </tr>
      </table>
    </GroupContainer>
  </CenteredContainer>
</template>

<script>
import Cell from "@/components/sections/routing/Cell.vue";
import { store } from "@/store";
import { InputRouting, OutputRouting } from "@/util/mixerMapping";
import { websocket } from "@/util/sockets";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import SubmixButton from "@/components/sections/routing/SubmixButton.vue";
import { driverMix2, driverVOD, firmwareSupportsMix2, isDeviceMini, isStreamNoMusic, isWindowsDriver, versionNewerOrEqualTo } from "@/util/util";

export default {
  name: "RoutingTable",
  components: { SubmixButton, GroupContainer, CenteredContainer, Cell },

  data() {
    return {}
  },

  methods: {
    InputRouting() {
      return InputRouting
    },

    getOutputString(name) {
      let key = this.getLanguageKeyForChannel(name);
      if (key !== undefined) {
        return this.$t(key);
      }
      return this.$t(`message.routing.outputs['${name}']`)
    },

    handleClick: function (output, input) {
      if (!this.canRoute(output, input)) {
        return;
      }

      let new_state = !this.isEnabled(output, input);

      // eslint-disable-next-line no-unused-vars
      let command = {
        "SetRouter": [input, output, new_state]
      };

      websocket.send_command(store.getActiveSerial(), command);
    },

    canRoute(output, input) {
      return !(output === "ChatMic" && input === "Chat");
    },

    // eslint-disable-next-line no-unused-vars
    isEnabled: function (output, input) {
      return store.getActiveDevice().router[input][output];
    },

    submixEnabled() {
      if (!this.isSubMixSupported()) {
        return false;
      }

      return store.getActiveDevice().levels.submix !== null;
    },
    isSubMixSupported() {
      return store.getActiveDevice().levels.submix_supported;
    },

    isDeviceMix(name, mix) {
      if (!this.isSubMixSupported() || !this.submixEnabled()) {
        return false;
      }

      return this.getOutputMix(name) === mix;
    },
    getOutputMix(name) {
      return store.getActiveDevice().levels.submix.outputs[name];
    },

    getLanguageKeyForChannel(name) {
      if (name === "StreamMix2") {
        let vod = "message.routing.outputs.VOD";
        let mix2 = "message.routing.outputs.StreamMix2"

        if (isWindowsDriver() && driverVOD()) return vod;
        return mix2;
      }

      if (name === "BroadcastMix") {
        let streamMix = "message.channels.StreamMix";
        let streamMix1 = "message.channels.StreamMix1";

        if (firmwareSupportsMix2()) {
          if (isWindowsDriver() && !driverMix2()) return streamMix;
          return streamMix1;
        }

        return streamMix;
      }
    },
  },
  computed: {
    getOutputChannels() {
      let outputList = OutputRouting;

      if (isDeviceMini()) {
        // Ok, we need to either nuke 'Sampler' or 'StreamMix2' depending on the firmware..
        if (!firmwareSupportsMix2()) {
          outputList = outputList.filter(i => i !== "StreamMix2");
        } else {
          outputList = outputList.filter(i => i !== "Sampler");
        }
      } else {
        if (!firmwareSupportsMix2()) {
          outputList = outputList.filter(i => i !== "StreamMix2");
        }
      }
 
      if (isStreamNoMusic()) {
        // If we're stream no music, remove both..
        outputList = outputList.filter(i => {
          if (isDeviceMini()) {
            return (i !== "StreamMix2" && i !== "Sampler");
          }
          return (i !== "StreamMix2");
        });
      }
      
      return outputList;
    }
  }
}
</script>

<style scoped>
table {
  color: #fff;
  font-stretch: condensed;
  border-spacing: 4px;
  border-collapse: separate;
}

th {
  font-weight: normal;
  padding: 6px;
}

thead th:not(.subHeader) {
  background-color: #3b413f;
}

thead .subHeader th {
  background-color: #353937;
  min-width: 70px;
}

tr th {
  background-color: #353937;
}


.rotated {
  background-color: #3b413f;
  text-align: center;
  width: 15px;
}

.rotated span {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  white-space: nowrap;
}

.hidden {
  background-color: transparent !important;
}
</style>
