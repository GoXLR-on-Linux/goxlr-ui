<script>
import {store} from "@/store";
import {websocket} from "@/util/sockets";
import {
  getLightingInactiveOptions,
  MuteButtonNamesForFader,
  ScribbleNames
} from "@/util/mixerMapping";
import {isDeviceMini} from "@/util/util";
import ContentContainer from "@/components/containers/ContentContainer.vue";
import GroupContainer from "@/components/containers/GroupContainer.vue";
import RadioSelection from "@/components/lists/RadioSelection.vue";
import ColourPicker from "@/components/sections/lighting/elements/ColourPicker.vue";
import CheckSelection from "@/components/lists/CheckSelection.vue";

export default {
  name: "LightingMixer",
  components: {
    CheckSelection,
    ColourPicker,
    RadioSelection,
    GroupContainer,
    ContentContainer,
  },

  data() {
    return {
      activeChannel: "A",
      textValue: null,
    }
  },

  methods: {
    getLightingInactiveOptions,
    isDeviceMini,

    getButtonOptions() {
      return [
        {id: "A", label: this.$t('message.faders.A')},
        {id: "B", label: this.$t('message.faders.B')},
        {id: "C", label: this.$t('message.faders.C')},
        {id: "D", label: this.$t('message.faders.D')}
      ];
    },

    getNodes: function () {
      return [this.activeChannel];
    },

    /* Channel Selection */
    selectedChannel: function () {
      return this.activeChannel;
    },

    onChannelSelectionChange: function (id) {
      this.activeChannel = id;

      if (!isDeviceMini()) {
        this.textValue = this.getBottomText();
      }

      this.$emit("nav-updated");
    },

    /***************************/

    /* Fader Colour Common */
    onFaderColourChange(top, bottom) {
      websocket.send_command(store.getActiveSerial(), {"SetFaderColours": [this.activeChannel, top, bottom]});
    },

    /* Fader Top Colour */
    getFaderTopColour() {
      return "#" + store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
    },

    onFaderTopColourChange(value) {
      let top = value.substr(1, 6);
      let bottom = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;

      this.onFaderColourChange(top, bottom);
    },

    /* Fader Bottom Colour */
    getFaderBottomColour() {
      return "#" + store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;
    },

    onFaderBottomColourChange(value) {
      let top = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
      let bottom = value.substr(1, 6);

      this.onFaderColourChange(top, bottom);
    },

    // Style..
    styleContains(match) {
      return store.getActiveDevice().lighting.faders[this.activeChannel].style.includes(match);
    },

    getStyleOptions() {
      return [
        {
          id: 'StyleGradient',
          label: this.$t('message.lighting.mixer.fader.styles.gradient'),
          selected: this.styleContains('Gradient')
        },
        {
          id: 'StyleMeter',
          label: this.$t('message.lighting.mixer.fader.styles.meter'),
          selected: this.styleContains('Meter')
        },
      ];
    },

    onStyleSelectionChanged(id, value) {
      let gradient = this.styleContains('Gradient');
      let meter = this.styleContains('Meter');

      if (id === 'StyleGradient') {
        gradient = value;
      }

      if (id === 'StyleMeter') {
        meter = value;
      }

      this.setStyle(gradient, meter);
    },

    setStyle(gradient, meter) {
      let type = this.getDisplayStyle(gradient, meter);
      websocket.send_command(store.getActiveSerial(), {"SetFaderDisplayStyle": [this.activeChannel, type]});
    },

    getDisplayStyle(gradient, meter) {
      let type = "TwoColour";
      // Go through the possible options..
      if (gradient && meter) {
        type = "GradientMeter";
      } else if (gradient && !meter) {
        type = "Gradient"
      } else if (!gradient && meter) {
        type = "Meter"
      }
      return type;
    },

    applyFaderToAll() {
      // Pull the settings, and apply to all..
      // SetAllFaderDisplayStyle(FaderDisplayStyle)
      // SetAllFaderColours(String, String),
      let gradient = this.styleContains('Gradient');
      let meter = this.styleContains('Meter');
      let type = this.getDisplayStyle(gradient, meter);
      websocket.send_command(store.getActiveSerial(), {"SetAllFaderDisplayStyle": type});

      let colour_one = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.faders[this.activeChannel].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetAllFaderColours": [colour_one, colour_two]});
    },

    /***************************/

    /* Screen Colour */
    getScreenColour() {
      return "#" + store.getActiveDevice().lighting.simple[ScribbleNames[this.activeChannel]].colour_one;
    },

    onScreenColourChange(value) {
      value = value.substr(1, 6);
      websocket.send_command(store.getActiveSerial(), {"SetSimpleColour": [ScribbleNames[this.activeChannel], value]});
    },

    /* Icons */
    openIcons() {
      websocket.open_path("Icons");
    },

    getIconOptions() {
      let options = [
        {
          id: null,
          label: this.$t('message.lighting.mixer.screen.icon_none')
        }
      ];

      store.getIconFiles().sort(Intl.Collator().compare).forEach(item => {
        options.push({
          id: item,
          label: item
        });
      });

      return options;
    },

    getSelectedIcon() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.file_name;
    },

    onIconSelectionChange(value) {
      websocket.send_command(store.getActiveSerial(), {"SetScribbleIcon": [this.activeChannel, value]})
    },

    /* Display Options */
    getDisplayOptions() {
      return [
        {
          id: 'lighting-mixer-screen-show-number',
          label: this.$t('message.lighting.mixer.screen.options.show_number'),
          selected: this.isScreenNumberShow()
        },
        {
          id: 'lighting-mixer-screen-invert-display',
          label: this.$t('message.lighting.mixer.screen.options.invert_display'),
          selected: this.isScreenInverted()
        },
      ];
    },

    onDisplayOptionsChanged(id, value) {
      if (id === 'lighting-mixer-screen-show-number') {
        this.setScreenNumberShow(value);
      } else if (id === 'lighting-mixer-screen-invert-display') {
        this.setScreenInverted(value);
      }
    },

    isScreenInverted() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.inverted;
    },

    isScreenNumberShow() {
      return store.getActiveDevice().fader_status[this.activeChannel].scribble.left_text !== null;
    },

    setScreenInverted(inverted) {
      websocket.send_command(store.getActiveSerial(), {"SetScribbleInvert": [this.activeChannel, inverted]});
    },

    setScreenNumberShow(show) {
      let channel = Object.keys(store.getActiveDevice().fader_status).indexOf(this.activeChannel) + 1;
      let value = show ? channel.toString() : "";
      websocket.send_command(store.getActiveSerial(), {"SetScribbleNumber": [this.activeChannel, value]})
    },

    /* Text Field */
    getBottomText() {
      let text = store.getActiveDevice().fader_status[this.activeChannel].scribble.bottom_text;
      return (text == null) ? "" : text;
    },

    updateText(event) {
      store.getActiveDevice().fader_status[this.activeChannel].scribble.bottom_text = event.target.value;
    },

    applyUpdate(event) {
      let value = event.target.value;
      websocket.send_command(store.getActiveSerial(), {"SetScribbleText": [this.activeChannel, value]})
    },


    /***************************/
    getMuteActiveColour() {
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
    },

    getMuteInactiveColour() {
      return "#" + store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;
    },

    onMuteActiveColourChanged(value) {
      let active = value.substr(1, 6);
      let inactive = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;

      this.setMuteColourValues(active, inactive);
    },

    onMuteInactiveColourChanged(value) {
      let active = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
      let inactive = value.substr(1, 6);

      this.setMuteColourValues(active, inactive);
    },

    setMuteColourValues(active, inactive) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonColours": [MuteButtonNamesForFader[this.activeChannel], active, inactive]});
    },

    selectedMuteInactiveOption() {
      return store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style;
    },

    onMuteInactiveSelectionChange(id) {
      websocket.send_command(store.getActiveSerial(), {"SetButtonOffStyle": [MuteButtonNamesForFader[this.activeChannel], id]});
    },

    applyMuteToAll() {
      let colour_one = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_one;
      let colour_two = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].colours.colour_two;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupColours": ["FaderMute", colour_one, colour_two]});

      let off_style = store.getActiveDevice().lighting.buttons[MuteButtonNamesForFader[this.activeChannel]].off_style;
      websocket.send_command(store.getActiveSerial(), {"SetButtonGroupOffStyle": ["FaderMute", off_style]});
    },

    getSelectedChannelName() {
      //get the current selected channel name to be used in aria-labels
      return this.getButtonOptions().find(option => option.id === this.activeChannel).label;
    },
  },

  mounted() {
    if (!this.isDeviceMini()) {
      this.textValue = this.getBottomText();
    }
  }
}
</script>

<template>
  <div style="display: flex">
    <ContentContainer style="padding-top: 15px; padding-bottom: 20px">
      <GroupContainer :title="$t('message.lighting.mixer.faders.title')">
        <RadioSelection :title="$t('message.lighting.mixer.faders.channelTitle')" group="lighting_mixer_channel_select"
                        :options="getButtonOptions()" :selected="selectedChannel()"
                        @selection-changed="onChannelSelectionChange"/>
      </GroupContainer>

      <GroupContainer :title="$t('message.lighting.mixer.fader.title')"
                      :label="$t('message.lighting.mixer.fader.accessibilityTitle', { channel: getSelectedChannelName() })">
        <template #right>
          <button class="applyToAll" @click="applyFaderToAll()">{{ $t('message.lighting.common.apply_to_all') }}
          </button>
        </template>

        <CheckSelection :title="$t('message.lighting.mixer.fader.style')" :options="getStyleOptions()"
                        @selection-changed="onStyleSelectionChanged"/>
        <ColourPicker :title="$t('message.lighting.mixer.fader.bottom_colour')" :color-value="getFaderBottomColour()"
                      @colour-changed="onFaderBottomColourChange"/>
        <ColourPicker :title="$t('message.lighting.mixer.fader.top_colour')" :color-value="getFaderTopColour()"
                      @colour-changed="onFaderTopColourChange"/>
      </GroupContainer>

      <GroupContainer v-if="!isDeviceMini()" :title="$t('message.lighting.mixer.screen.title')"
                      :label="$t('message.lighting.mixer.screen.accessibilityTitle', { channel: getSelectedChannelName() })">
        <ColourPicker :title="$t('message.lighting.mixer.screen.background_colour')" :color-value="getScreenColour()"
                      @colour-changed="onScreenColourChange"/>
        <RadioSelection group="lighting_mixer_icon_select" :options="getIconOptions()" :selected="getSelectedIcon()"
                        @selection-changed="onIconSelectionChange">
          <template #title>
            <div>
              <span style="padding-right: 14px">{{ $t('message.lighting.mixer.screen.icons') }}</span>
              <button class="openButton" @click="openIcons">
                <font-awesome-icon icon="fa-solid fa-folder"/>
              </button>
            </div>
          </template>
        </RadioSelection>


        <CheckSelection :title="$t('message.lighting.mixer.screen.optionsTitle')" :options="getDisplayOptions()"
                        @selection-changed="onDisplayOptionsChanged">
          <div style="text-align: center">
            <hr style="margin-top: 14px"/>
            <div style="color: #fff; text-align: left; padding-left: 8px; margin-top: 16px;">
              {{ $t('message.lighting.mixer.screen.options.text') }}:
            </div>
            <input type="text" v-model="textValue" @blur="applyUpdate" v-on:keyup.enter="applyUpdate"
                   :aria-label="$t('message.lighting.mixer.screen.options.text')"
                   :aria-description="$t('message.lighting.mixer.screen.options.accessibilityText')"/>
          </div>
        </CheckSelection>
      </GroupContainer>

      <GroupContainer :title="$t('message.lighting.mixer.mute.title')"
                      :label="$t('message.lighting.mixer.mute.accessibilityTitle', {channel: getSelectedChannelName() })">
        <template #right>
          <button class="applyToAll" @click="applyMuteToAll()">{{ $t('message.lighting.common.apply_to_all') }}</button>
        </template>
        <ColourPicker :title="$t('message.lighting.common.active_colour')" :color-value="getMuteActiveColour()"
                      @colour-changed="onMuteActiveColourChanged"/>
        <RadioSelection :title="$t('message.lighting.common.inactive_option')" group="lighting_mixer_mute_inactive_behaviour"
                        :options="getLightingInactiveOptions($t)"
                        :selected="selectedMuteInactiveOption()" @selection-changed="onMuteInactiveSelectionChange"/>
        <ColourPicker :title="$t('message.lighting.common.inactive_colour')" :color-value="getMuteInactiveColour()"
                      @colour-changed="onMuteInactiveColourChanged"/>
      </GroupContainer>
    </ContentContainer>
  </div>
</template>

<style scoped>
input[type=text] {
  font-family: LeagueMonoCondensed, sans-serif;
  background-color: #3b413f;
  color: #59b1b6;
  box-sizing: border-box;
  text-align: center;

  padding: 10px;
  border: none;
  background-image: none;
  box-shadow: none;
  outline: none;

  -moz-appearance: textfield;
}

button {
  border: 0;
  background-color: transparent;
  padding: 0;
  margin: -4px;
}

button.applyToAll {
  border: 0;
  margin: 0;
  padding: 5px 24px;
  color: #fff;
  font-family: LeagueMonoCondensed, sans-serif;
  font-size: 12px;
  background-color: #3b413f;
}

button.applyToAll:hover {
  background-color: #535c59;
}

.openButton {
  display: inline-block;
  color: #a5a7a6;
  font-size: 14px
}

.openButton:hover {
  color: #fff;
  cursor: pointer;
}
</style>

