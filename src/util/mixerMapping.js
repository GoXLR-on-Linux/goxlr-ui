// This class primarily aids in mapping to and from the various enums in rust, I'll find a nicer way to handle
// this later.
export class MixerID {
    static MICROPHONE = new MixerID(0);
    static CHAT = new MixerID(5);
    static MUSIC = new MixerID(7);
    static GAME = new MixerID(4);
    static CONSOLE = new MixerID(2);
    static LINE_IN = new MixerID(1);
    static LINE_OUT = new MixerID(10);
    static SYSTEM = new MixerID(3);
    static SAMPLE = new MixerID(6);
    static HEADPHONES = new MixerID(8);
    static MIC_MONITOR = new MixerID(9);
    static BLEEP = new MixerID(11);

    constructor(id) {
        this.id = id;
    }
}

export function getMixerIdByName(name) {
    if (name === "Mic") { return MixerID.MICROPHONE.id; }
    if (name === "Chat") { return MixerID.CHAT.id; }
    if (name === "Music") { return MixerID.MUSIC.id; }
    if (name === "Game") { return MixerID.GAME.id; }
    if (name === "Console") { return MixerID.CONSOLE.id; }
    if (name === "LineIn") { return MixerID.LINE_IN.id; }
    if (name === "LineOut") { return MixerID.LINE_OUT.id; }
    if (name === "System") { return MixerID.SYSTEM.id; }
    if (name === "Sample") { return MixerID.SAMPLE.id; }
    if (name === "Headphones") { return MixerID.HEADPHONES.id; }
    if (name === "MicMonitor") { return MixerID.MIC_MONITOR.id; }
    if (name === "Bleep") { return MixerID.BLEEP.id; }
}

export function getMixerNameById(id) {
    if (id === MixerID.MICROPHONE.id) { return "Mic" }
    if (id === MixerID.CHAT.id) { return "Chat" }
    if (id === MixerID.MUSIC.id) { return "Music" }
    if (id === MixerID.GAME.id) { return "Game" }
    if (id === MixerID.CONSOLE.id) { return "Console" }
    if (id === MixerID.LINE_IN.id) { return "LineIn" }
    if (id === MixerID.LINE_OUT.id) { return "LineOut" }
    if (id === MixerID.SYSTEM.id) { return "System" }
    if (id === MixerID.SAMPLE.id) { return "Sample" }
    if (id === MixerID.HEADPHONES.id) { return "Headphones" }
    if (id === MixerID.MIC_MONITOR.id) { return "MicMonitor" }
    if (id === MixerID.BLEEP.id) { return "Bleep" }

}

export function getMuteIdByName(id) {
    if (id === "All") { return 0; }
    if (id === "ToStream") { return 1; }
    if (id === "ToVoiceChat") { return 2; }
    if (id === "ToPhones") { return 3; }
    if (id === "ToLineOut") { return 4; }
}

export function getMuteNameById(id) {
    if (id === 0) { return "All" }
    if (id === 1) { return "ToStream" }
    if (id === 2) { return "ToVoiceChat" }
    if (id === 3) { return "ToPhones" }
    if (id === 4) { return "ToLineOut" }
}

//export class

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
            id: MixerID.MICROPHONE.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Chat",
            id: MixerID.CHAT.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Music",
            id: MixerID.MUSIC.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Game",
            id: MixerID.GAME.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Console",
            id: MixerID.CONSOLE.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Line In",
            id: MixerID.LINE_IN.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Line Out",
            id: MixerID.LINE_OUT.id,
        },
        {
            type: MixerType.SLIDER,
            name: "System",
            id: MixerID.SYSTEM.id,
        },
        {
            type: MixerType.SLIDER,
            name: "Sample",
            id: MixerID.SAMPLE.id,
        },
        {
            type: MixerType.SPACER,
            id: -1,
        },
        {
            type: MixerType.SLIDER,
            name: "Bleep",
            id: MixerID.BLEEP.id,
        },
    ],
    'headphones': [
        {
            type: MixerType.SLIDER,
            name: "Level",
            id: MixerID.HEADPHONES.id,
            hidden: false,
        },
        {
            type: MixerType.SLIDER,
            name: "Mic Monitor",
            id: MixerID.MIC_MONITOR.id,
            hidden: true,
        },
    ]
};

export let FaderTargets = [
    {
        name: "Mic",
        id: MixerID.MICROPHONE.id,
    },
    {
        name: "Voice Chat",
        id: MixerID.CHAT.id,
    },
    {
        name: "Music",
        id: MixerID.MUSIC.id,
    },
    {
        name: "Game",
        id: MixerID.GAME.id,
    },
    {
        name: "Console",
        id: MixerID.CONSOLE.id,
    },
    {
        name: "Line In",
        id: MixerID.LINE_IN.id,
    },
    {
        name: "System",
        id: MixerID.SYSTEM.id,
    },
    {
        name: "Sample",
        id: MixerID.SAMPLE.id,
    },
    {
        name: "Headphone",
        id: MixerID.HEADPHONES.id,
    },
    {
        name: "Line Out",
        id: MixerID.LINE_OUT.id,
    },
]

export let MuteBehaviours = [
    "Mute All",
    "Mute to Stream",
    "Mute to Voice Chat",
    "Mute to Phones",
    "Mute to Line Out"
]

export let CoughMuteBehaviours = [
    "Mute to All",
    "Mute to Stream",
    "Mute to Voice Chat",
    "Mute to Phones",
    "Mute to Line Out"
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