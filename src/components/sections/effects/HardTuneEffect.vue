<template>
  <ExpandoGroupContainer :title="$t('message.effects.hardTune.title')" @expando-clicked="is_expanded = !is_expanded"
                         :expanded="is_expanded">
    <RadioSelection :title="$t('message.effects.hardTune.style')" group="effects_hardtune_style"
                    :options="hard_tune_style" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.hardTune.amount')" :slider-min-value=0 :slider-max-value=100
                 :slider-value="getAmountValue()" :store-path="getStorePath('amount')" v-show="is_expanded"
                 @value-changed="setAmountValue"/>
    <SliderInput :title="$t('message.effects.hardTune.rate')" :slider-min-value=0 :slider-max-value=100
                 :slider-value="getRateValue()" :store-path="getStorePath('rate')" v-show="is_expanded"
                 @value-changed="setRateValue"/>
    <SliderInput :title="$t('message.effects.hardTune.window')" :slider-min-value=0 :slider-max-value=600
                 :slider-value="getWindowValue()" :store-path="getStorePath('window')" v-show="is_expanded"
                 @value-changed="setWindowValue"/>

    <RadioSelection :title="$t('message.effects.hardTune.source')" group="effects_hardtune_source"
                    :options="hard_tune_source" :selected="getActiveSource()" @selection-changed="sourcePressed"/>
  </ExpandoGroupContainer>
</template>

<script>
import SliderInput from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "HardTuneEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,

      hard_tune_style: [
        {id: "Natural", label: this.$t('message.effects.hardTune.styles.natural')},
        {id: "Medium", label: this.$t('message.effects.hardTune.styles.medium')},
        {id: "Hard", label: this.$t('message.effects.hardTune.styles.hard')},
      ],

      hard_tune_source: [
        {id: "All", label: this.$t('message.channels.All')},
        {id: "Music", label: this.$t('message.channels.Music')},
        {id: "LineIn", label: this.$t('message.channels.LineIn')},
        {id: "System", label: this.$t('message.channels.System')},
      ],
    }
  },

  methods: {
    getActiveStyle() {
      return store.getActiveDevice().effects.current.hard_tune.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetHardTuneStyle": button});
    },

    getActiveSource() {
      return store.getActiveDevice().effects.current.hard_tune.source;
    },

    sourcePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetHardTuneSource": button});
    },

    getAmountValue() {
      return store.getActiveDevice().effects.current.hard_tune.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetHardTuneAmount": value});
    },
    getRateValue() {
      return store.getActiveDevice().effects.current.hard_tune.rate;
    },
    setRateValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetHardTuneRate": value});
    },
    getWindowValue() {
      return store.getActiveDevice().effects.current.hard_tune.window;
    },
    setWindowValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetHardTuneWindow": value});
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/hard_tune/" + name;
    },
  }
}
</script>

<style scoped>

</style>
