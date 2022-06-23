use goxlr_types::{ChannelName, FaderName, MuteFunction};

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