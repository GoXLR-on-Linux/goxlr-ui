/**
 * This file primarily contains mappings from Utility Enums to Javascript representations, they're used for checking
 * values against the DaemonStatus, as well as sending updates, so order and naming is important! Some parts of the
 * code (such as faders and mixers) will directly reference array values, it's not ideal, but until some cleaner
 * representation can happen it's more efficient than constantly bouncing back and forward between array indexes.
 */

export const MuteFunction = [
    "All",
    "ToStream",
    "ToVoiceChat",
    "ToPhones",
    "ToLineOut",
]

export let MuteFunctionReadable = [
    "Mute All",
    "Mute to Stream",
    "Mute to Voice Chat",
    "Mute to Phones",
    "Mute to Line Out"
]

export const FaderName = [
    "A",
    "B",
    "C",
    "D"
]

export const InputDevice = ["Microphone", "Chat", "Music", "Game", "Console", "LineIn", "System", "Samples"]
export const OutputDevice = ["Headphones", "BroadcastMix", "LineOut", "ChatMic", "Sampler"]

export const ChannelName = [
    "Mic",
    "LineIn",
    "Console",
    "System",
    "Game",
    "Chat",
    "Sample",
    "Music",
    "Headphones",
    "MicMonitor",
    "LineOut",
]

export const ChannelNameReadable = [
    "Mic",
    "Line In",
    "Console",
    "System",
    "Game",
    "Voice Chat",
    "Sample",
    "Music",
    "Headphones",
    "MicMonitor",
    "Line Out",
]

export const EqMiniFreqs = [
    "Equalizer90Hz",
    "Equalizer250Hz",
    "Equalizer500Hz",
    "Equalizer1KHz",
    "Equalizer3KHz",
    "Equalizer8KHz",
]

export const EqFreqs = [
    "Equalizer31Hz",
    "Equalizer63Hz",
    "Equalizer125Hz",
    "Equalizer250Hz",
    "Equalizer500Hz",
    "Equalizer1KHz",
    "Equalizer2KHz",
    "Equalizer4KHz",
    "Equalizer8KHz",
    "Equalizer16KHz",
]

export const MicrophoneTypes = [
    "Dynamic",
    "Condenser",
    "Jack",
]

// I'm using indexOf for the values in this array just for readability.
export let FaderOrder = [
    ChannelName.indexOf("Mic"),
    ChannelName.indexOf("Chat"),
    ChannelName.indexOf("Music"),
    ChannelName.indexOf("Game"),
    ChannelName.indexOf("Console"),
    ChannelName.indexOf("LineIn"),
    ChannelName.indexOf("System"),
    ChannelName.indexOf("Sample"),
    ChannelName.indexOf("Headphones"),
    ChannelName.indexOf("LineOut")
]

// Still not a fan of this chunk of code, it's a little verbose..
export class MixerType {
    static SLIDER = new MixerType(0);
    static SPACER = new MixerType(1);

    constructor(id) {
        this.id = id;
    }
}

export let MixerMap = {
    'mixer': [
        {
            type: MixerType.SLIDER,
            name: "Mic",
            id: ChannelName.indexOf("Mic"),
        },
        {
            type: MixerType.SLIDER,
            name: "Chat",
            id: ChannelName.indexOf("Chat"),
        },
        {
            type: MixerType.SLIDER,
            name: "Music",
            id: ChannelName.indexOf("Music"),
        },
        {
            type: MixerType.SLIDER,
            name: "Game",
            id: ChannelName.indexOf("Game"),
        },
        {
            type: MixerType.SLIDER,
            name: "Console",
            id: ChannelName.indexOf("Console"),
        },
        {
            type: MixerType.SLIDER,
            name: "Line In",
            id: ChannelName.indexOf("LineIn"),
        },
        {
            type: MixerType.SLIDER,
            name: "Line Out",
            id: ChannelName.indexOf("LineOut"),
        },
        {
            type: MixerType.SLIDER,
            name: "System",
            id: ChannelName.indexOf("System"),
        },
        {
            type: MixerType.SLIDER,
            name: "Sample",
            id: ChannelName.indexOf("Sample"),
        },
        {
            type: MixerType.SPACER,
            id: -1,
        },
        {
            type: MixerType.SLIDER,
            name: "Bleep",
            id: 11,
        },
    ],
    'headphones': [
        {
            type: MixerType.SLIDER,
            name: "Level",
            id: ChannelName.indexOf("Headphones"),
            hidden: false,
        },
        {
            type: MixerType.SLIDER,
            name: "Mic Monitor",
            id: ChannelName.indexOf("MicMonitor"),
            hidden: true,
        },
    ]
};