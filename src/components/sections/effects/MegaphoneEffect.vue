<template>
  <ExpandoGroupContainer :title="$t('message.effects.megaphone.title')" @expando-clicked="is_expanded = !is_expanded"
                         :expanded="is_expanded">
    <RadioSelection :title="$t('message.effects.megaphone.style')" group="effects_megaphone_style"
                    :options="getMegaphoneStyles()" :selected="getActiveStyle()" @selection-changed="stylePressed"/>

    <SliderInput :title="$t('message.effects.megaphone.amount')" :slider-min-value=0 :slider-max-value=100
                 suffix:text-suffix="$t('message.suffixes.percentage')" :slider-value="getAmountValue()"
                 :store-path="getStorePath('amount')" v-show="is_expanded" @value-changed="setAmountValue"/>

    <SliderInput :title="$t('message.effects.megaphone.postGain')" :slider-min-value=-20 :slider-max-value=20
                 suffix:text-suffix="$t('message.suffixes.decibels')" :slider-value="getPostGainValue()"
                 :store-path="getStorePath('post_gain')" v-show="is_expanded" @value-changed="setPostGainValue"/>
  </ExpandoGroupContainer>
</template>

<script>
import SliderInput from "@/components/slider/Slider.vue";
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ExpandoGroupContainer from "@/components/containers/ExpandoGroupContainer.vue";

export default {
  name: "MegaphoneEffect",
  components: {ExpandoGroupContainer, RadioSelection, SliderInput},
  data() {
    return {
      is_expanded: false,
    }
  },

  methods: {
    getMegaphoneStyles() {
      return [
        {id: "Megaphone", label: this.$t('message.effects.megaphone.styles.megaphone')},
        {id: "Radio", label: this.$t('message.effects.megaphone.styles.radio')},
        {id: "OnThePhone", label: this.$t('message.effects.megaphone.styles.onThePhone')},
        {id: "Overdrive", label: this.$t('message.effects.megaphone.styles.overdrive')},
        {id: "BuzzCutt", label: this.$t('message.effects.megaphone.styles.buzzCutt')},
        {id: "Tweed", label: this.$t('message.effects.megaphone.styles.tweed')}
      ];
    },

    getActiveStyle() {
      return store.getActiveDevice().effects.current.megaphone.style;
    },

    stylePressed(button) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphoneStyle": button});
    },

    getAmountValue() {
      // TODO, the values can change depending on the style :D
      return store.getActiveDevice().effects.current.megaphone.amount;
    },
    setAmountValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphoneAmount": value});
    },

    getPostGainValue() {
      return store.getActiveDevice().effects.current.megaphone.post_gain;
    },
    setPostGainValue(id, value) {
      websocket.send_command(store.getActiveSerial(), {"SetMegaphonePostGain": value});
    },

    getStorePath(name) {
      return "/mixers/" + store.getActiveSerial() + "/effects/current/megaphone/" + name;
    },

  }
}
</script>

<style scoped>

</style>
