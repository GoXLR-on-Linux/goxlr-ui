use goxlr_types::{ChannelName, FaderName, InputDevice, MuteFunction, OutputDevice};

// Primarily a group of mappings :)
pub fn get_channel_name(id: u8) -> ChannelName  {
    match id {
        0 => ChannelName::Mic,
        1 => ChannelName::LineIn,
        2 => ChannelName::Console,
        3 => ChannelName::System,
        4 => ChannelName::Game,
        5 => ChannelName::Chat,
        6 => ChannelName::Sample,
        7 => ChannelName::Music,
        8 => ChannelName::Headphones,
        9 => ChannelName::MicMonitor,
        10 => ChannelName::LineOut,

        _ => ChannelName::Chat,
    }
}

pub fn get_fader_name(id: u8) -> FaderName {
    match id {
        0 => FaderName::A,
        1 => FaderName::B,
        2 => FaderName::C,
        3 => FaderName::D,

        _ => FaderName::A
    }
}

pub fn get_mute_function_name(id: u8) -> MuteFunction {
    match id {
        0 => MuteFunction::All,
        1 => MuteFunction::ToStream,
        2 => MuteFunction::ToVoiceChat,
        3 => MuteFunction::ToPhones,
        4 => MuteFunction::ToLineOut,

        _ => MuteFunction::All
    }
}

pub fn get_output_name(id: u8) -> OutputDevice {
    match id {
        0 => OutputDevice::Headphones,
        1 => OutputDevice::BroadcastMix,
        2 => OutputDevice::LineOut,
        3 => OutputDevice::ChatMic,
        4 => OutputDevice::Sampler,

        _ => OutputDevice::Headphones,
    }
}

pub fn get_input_name(id: u8) -> InputDevice {
    match id {
        0 => InputDevice::Microphone,
        1 => InputDevice::Chat,
        2 => InputDevice::Music,
        3 => InputDevice::Game,
        4 => InputDevice::Console,
        5 => InputDevice::LineIn,
        6 => InputDevice::System,
        7 => InputDevice::Samples,

        _ => InputDevice::Microphone,
    }
}

pub fn get_cough_mute_behaviour_name(id: u8) -> MuteFunction {
    match id {
        0 => MuteFunction::All,
        1 => MuteFunction::ToStream,
        2 => MuteFunction::ToVoiceChat,
        3 => MuteFunction::ToPhones,
        4 => MuteFunction::ToLineOut,

        _ => MuteFunction::All,
    }
}