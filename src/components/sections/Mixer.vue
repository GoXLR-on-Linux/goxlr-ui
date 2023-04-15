<template>
  <CenteredContainer>
    <GroupContainer v-if="submixEnabled" title="Mix Assignment">

    </GroupContainer>

    <GroupContainer v-if="!submixEnabled()" title="Inputs">
      <template #right>
        <input type="checkbox" :checked="submixEnabled()" @change="setSubmixEnabled" />
        <span style="color: #fff"> Submixes</span>
      </template>
      <Slider v-for="item in inputMixer" :key=item :id=channelNames.indexOf(item) :title="channelNamesReadable[item]"
              :slider-min-value=0
              :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getValue(item)"
              :store-path="getStorePath(item)" @value-changed="valueChange"
      />
    </GroupContainer>
    <GroupContainer v-else title="Inputs">
      <template #right>
        <input type="checkbox" :checked="submixEnabled()" @change="setSubmixEnabled" />
        <span style="color: #fff"> Submixes</span>
      </template>
      <SubmixSlider v-for="item in inputMixer" :key=item :id=channelNames.indexOf(item)
                    :title="channelNamesReadable[item]" :slider-min-value=0
                    :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%"
                    :slider-a-value="getValue(item)" :slider-b-value="getSubmixValue(item)"
                    :submix-linked="isSubMixLinked(item)"
                    :store-path="getSubmixPaths(item)" @value-changed="submixValueChange"
      />
    </GroupContainer>

    <GroupContainer title="Outputs" @expando-clicked="isVisible = !isVisible" :expanded="isVisible">
      <Slider v-for="item in outputMixer" :key=item :id=channelNames.indexOf(item)
              :title="channelNamesReadable[item]" :slider-min-value=0
              :slider-max-value=255 :text-min-value=0 :text-max-value=100 text-suffix="%" :slider-value="getValue(item)"
              :store-path="getStorePath(item)" @value-changed="valueChange"
              v-show="!submixEnabled() || !submixHide.includes(item)"
      />
    </GroupContainer>
  </CenteredContainer>
</template>

<script>
import Slider from "../slider/Slider";
import {
  ChannelName,
  ChannelNameReadable,
  OutputMixerSubmixHidden,
  OutputMixer,
  InputMixer,
} from "@/util/mixerMapping";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import SubmixSlider from "@/components/slider/SubmixSlider.vue";
import CenteredContainer from "@/components/containers/CenteredContainer.vue";

export default {
  name: "MixerTop",
  components: {CenteredContainer, SubmixSlider, GroupContainer, Slider},

  data() {
    return {
      inputMixer: InputMixer,
      outputMixer: OutputMixer,
      submixHide: OutputMixerSubmixHidden,
      channelNames: ChannelName,
      channelNamesReadable: ChannelNameReadable,

      isVisible: false,
      volumes: [],
    }
  },

  methods: {
    valueChange(id, volume) {
      let str_id = this.channelNames[id];
      let command = undefined;

      command = {
        "SetVolume": [
          str_id,
          volume
        ]
      };
      websocket.send_command(store.getActiveSerial(), command);
    },

    submixValueChange(id, volume, side) {
      let str_id = this.channelNames[id];
      let command = undefined;
      if (side === 'A') {
        command = {
          "SetVolume": [str_id, volume]
        };
      } else {
        command = {
          "SetSubMixVolume": [str_id, volume]
        };
      }
      websocket.send_command(store.getActiveSerial(), command);

      if (store.getActiveDevice().levels.submix.inputs[str_id].linked) {
        if (side === 'A') {
          this.syncSubmix(str_id, volume);
        } else {
          this.syncMix(str_id, volume);
        }
      }
    },

    syncMix(name, volume) {
      let ratio = store.getActiveDevice().levels.submix.inputs[name].ratio;

      // Calculate the Main volume..
      let calculated_volume = parseInt(volume) / ratio;
      let value = Math.min(Math.floor(calculated_volume), 255);
      store.getActiveDevice().levels.volumes[name] = value;
    },

    syncSubmix(name, volume) {
      let ratio = store.getActiveDevice().levels.submix.inputs[name].ratio;

      // Calculate the Submix Volume..
      let calculated_volume = parseInt(volume) * ratio;
      let value = Math.max(Math.floor(calculated_volume), 0);
      store.getActiveDevice().levels.submix.inputs[name].volume = value;
    },

    getValue(id) {
      if (id === 11) {
        return store.getActiveDevice().levels.bleep;
      }
      return store.getActiveDevice().levels.volumes[id];
    },

    getSubmixValue(name) {
      return store.getActiveDevice().levels.submix.inputs[name].volume;
    },

    getStorePath(id) {
      return "/mixers/" + store.getActiveSerial() + "/levels/volumes/" + id;
    },

    getSubmixPaths(id) {
      return this.getStorePath(id) + ";/mixers/" + store.getActiveSerial() + "/levels/submix/inputs/" + id + "/volume"
    },

    isSubMixLinked(name) {
      return store.getActiveDevice().levels.submix.inputs[name].linked;
    },

    submixEnabled() {
      return store.getActiveDevice().levels.submix !== null;
    },

    setSubmixEnabled(e) {
      let command = {
        "SetSubMixEnabled": e.target.checked
      };

      websocket.send_command(store.getActiveSerial(), command);
    },
  }
}
</script>

<style scoped>
</style>
