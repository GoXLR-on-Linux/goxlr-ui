<template>
  <!-- Lets just draw the table.. -->
  <CenteredContainer>
    <GroupContainer title="Routing">
      <table>
        <thead>
        <tr>
          <th colspan="2" class="hidden"></th>
          <th :colspan="inputs.length">Inputs</th>
        </tr>
        <tr class="subHeader">
          <th colspan="2" class="hidden"></th>
          <th v-for="input in inputs" :key="input">{{ input }}</th>
        </tr>
        </thead>
        <tr v-for="output in getOutputs()" :key="output">
          <th v-if="output === 'Headphones'" class="rotated" :rowspan="outputs.length"><span>Outputs</span></th>
          <SubmixButton :name="OutputDevice[output]" :display="output" v-if="submixEnabled()"/>
          <th v-else>{{ output }}</th>
          <Cell v-for="input in inputs" :key="input" :enabled="isEnabled(output, input)" :output="output" :input="input"
                :orange="isDeviceMix(OutputDevice[output], 'B')" @clicked="handleClick"
                :cell-disabled="!canRoute(output, input)"/>
        </tr>
      </table>
    </GroupContainer>
  </CenteredContainer>
</template>

<script>
import Cell from "@/components/sections/routing/Cell";
import {store} from "@/store";
import {InputDevice, OutputDevice} from "@/util/mixerMapping";
import {websocket} from "@/util/sockets";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import SubmixButton from "@/components/sections/routing/SubmixButton.vue";

export default {
  name: "RoutingTable",
  computed: {
    OutputDevice() {
      return OutputDevice
    }
  },
  components: {SubmixButton, GroupContainer, CenteredContainer, Cell},

  data() {
    return {
      inputs: Object.keys(InputDevice),
      outputs: Object.keys(OutputDevice),
    }
  },

  methods: {
    getOutputs: function () {
      return Object.keys(OutputDevice);
    },


    handleClick: function (output, input) {
      if (!this.canRoute(output, input)) {
        return;
      }

      let new_state = !this.isEnabled(output, input);

      let inputDevice = InputDevice[input];
      let outputDevice = OutputDevice[output];

      // eslint-disable-next-line no-unused-vars
      let command = {
        "SetRouter": [inputDevice, outputDevice, new_state]
      };

      websocket.send_command(store.getActiveSerial(), command);
    },

    canRoute(output, input) {
      input = InputDevice[input];
      output = OutputDevice[output];
      return !(output === "ChatMic" && input === "Chat");
    },

    // eslint-disable-next-line no-unused-vars
    isEnabled: function (output, input) {
      return store.getActiveDevice().router[InputDevice[input]][OutputDevice[output]];
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
  width: 70px;
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
