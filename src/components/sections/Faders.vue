<template>
  <ContentBox title="Faders">
    <ButtonList title="Channel">
      <Button label="Channel 1" buttonId="0" :is-active="isActiveChannel(0)" @button-pressed="channelPressed"/>
      <Button label="Channel 2" buttonId="1" :is-active="isActiveChannel(1)" @button-pressed="channelPressed"/>
      <Button label="Channel 3" buttonId="2" :is-active="isActiveChannel(2)" @button-pressed="channelPressed"/>
      <Button label="Channel 4" buttonId="3" :is-active="isActiveChannel(3)" @button-pressed="channelPressed"/>
    </ButtonList>

    <ButtonList title="Source">
      <Button v-for="item in faderTargets" :key="item.id" :label=item.name :buttonId=item.id.toString()
              :is-active=isActiveSource(item.id) @button-pressed="sourcePressed"/>
    </ButtonList>

    <ButtonList title="Mute Behaviour">
      <Button v-for="(item, index) in muteBehaviours" :key=index :label=item :buttonId="index.toString()"
              :is-active=isActiveMuteFunction(index) :is-disabled=isMuteFunctionDisabled(index)
              @button-pressed="micBehaviourPressed"/>
    </ButtonList>
  </ContentBox>
</template>

<script>
import ContentBox from "../ContentBox";
import ButtonList from "../button_list/ButtonList";
import Button from "../button_list/Button";
import {
  FaderTargets,
  getMixerIdByName, getMixerNameById,
  getMuteIdByName,
  getMuteNameById,
  MixerID,
  MuteBehaviours
} from "@/util/mixerMapping";
import {store} from "@/store";
import {url_base} from "@/main";

export default {
  /**
   * Everything here focuses around the 'Channel' input,
   */

  components: {ContentBox, ButtonList, Button},
  name: "MicFaders",

  data() {
    return {
      faderTargets: FaderTargets,
      muteBehaviours: MuteBehaviours,

      activeChannel: 0,
    }
  },

  methods: {
    channelPressed: function (id) {
      this.activeChannel = parseInt(id); // parseInt required because javascript :D
    },

    sourcePressed: function (id) {
      let self = this;

      let serial = store.getActiveSerial();
      let fader = this.activeChannel;
      let channel = parseInt(id);

      let url = `${url_base}/set-fader-channel/${serial}/${fader}/${channel}`
      fetch(url, { method: 'POST' })
      .then(function() {
        store.getActiveDevice().fader_status[self.activeChannel].channel = getMixerNameById(parseInt(id));

        // Double check mute function is valid..
        if (self.isMuteFunctionDisabled(self.getActiveMuteFunction())) {
          self.setMuteFunction(0)
        }
      });
    },

    micBehaviourPressed: function (id) {
      this.setMuteFunction(parseInt(id));
    },

    setMuteFunction: function(id) {
      let self = this;

      let serial = store.getActiveSerial();
      let fader = this.activeChannel;
      let mute_function = parseInt(id);

      let url = `${url_base}/set-fader-mute/${serial}/${fader}/${mute_function}`

      fetch(url, { method: 'POST' })
      .then(response => {
        if (response.status === 200) {
          store.getActiveDevice().fader_status[self.activeChannel].mute_type = getMuteNameById(id)
        }
      });
    },

    isActiveChannel: function (id) {
      return this.activeChannel === id;
    },

    isActiveSource: function (id) {
      if (store.hasActiveDevice()) {
        return this.getActiveSource() === id;
      }

      return false;
    },

    isActiveMuteFunction: function (id) {
      if (store.hasActiveDevice()) {
        let active = getMuteIdByName(store.getActiveDevice().fader_status[this.activeChannel].mute_type);
        return active === id;
      }
      return false;
    },

    isMuteFunctionDisabled: function (id) {
      // According to the GoXLR UI, The Voice Chat mute button can't mute to voice chat..
      if (this.getActiveSource() === MixerID.CHAT.id) {
        if (id === 2) {
          return true;
        }
      }

      // The Headphone and Line Out channels can only mute to 'All'.
      if (this.getActiveSource() === MixerID.HEADPHONES.id) {
        if (id > 0) {
          return true;
        }
      }
      if (this.getActiveSource() === MixerID.LINE_OUT.id) {
        if (id > 0) {
          return true;
        }
      }
    },

    getActiveSource: function() {
      if (store.hasActiveDevice()) {
        return getMixerIdByName(store.getActiveDevice().fader_status[this.activeChannel].channel);
      }
      return 0;
    },

    getActiveMuteFunction: function() {
      if (store.hasActiveDevice()) {
        return getMuteIdByName(store.getActiveDevice().fader_status[this.activeChannel].mute_type);
      }
      return 0;
    }
  },
}
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
