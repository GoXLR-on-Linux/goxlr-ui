<template>
  <!-- Lets just draw the table.. -->
  <ContentBox title="Routing">
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
        <th v-if="output === 'Headphones'" class="rotated" :rowspan="outputs.length - 1"><span>Outputs</span></th>
        <th>{{ output }}</th>
        <Cell v-for="input in inputs" :key="input" :enabled="isEnabled(output, input)" :output="output" :input="input" @clicked="handleClick"/>
      </tr>
      <tr>
        <td colspan="10" class="hidden" style="height: 10px"></td>
      </tr>
      <tr>
        <!-- Sampler is a little weird, it's on a line by itself because reasons? -->
        <th colspan="2">Sampler</th>
        <Cell v-for="input in inputs" :key="input" :enabled="isEnabled('Sampler', input)" output="Sampler"
              :input="input" @clicked="handleClick"/>
      </tr>
    </table>
  </ContentBox>
</template>

<script>
import ContentBox from "@/components/ContentBox";
import Cell from "@/components/sections/routing/Cell";
import {store} from "@/store";
import {InputDevice, OutputDevice} from "@/util/mixerMapping";
import {websocket} from "@/util/sockets";

export default {
  name: "RoutingTable",
  components: {Cell, ContentBox},

  data() {
    return {
      inputs: Object.keys(InputDevice),
      outputs: Object.keys(OutputDevice),
    }
  },

  methods: {
    getOutputs: function () {
      let channels = Object.keys(OutputDevice);
      channels.splice(channels.indexOf("Sampler"), 1);
      return channels;
    },


    handleClick: function (output, input) {
      let new_state = !this.isEnabled(output, input);

      let inputDevice = InputDevice[input];
      let outputDevice = OutputDevice[output];

      // eslint-disable-next-line no-unused-vars
      let command = {
        "SetRouter": [inputDevice, outputDevice, new_state]
      };

      websocket.send_command(store.getActiveSerial(), command);
    },

    // eslint-disable-next-line no-unused-vars
    isEnabled: function (output, input) {
      if (store.hasActiveDevice()) {
        return store.getActiveDevice().router[InputDevice[input]][OutputDevice[output]];
      }

      return false;
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
