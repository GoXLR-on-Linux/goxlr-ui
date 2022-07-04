use strum::IntoEnumIterator;
use goxlr_types::{ChannelName, FaderName, InputDevice, MuteFunction, OutputDevice};

// Primarily a group of mappings :)
pub fn get_channel_name(id: u8) -> ChannelName  {
    if let Some(value) = ChannelName::iter().nth(id.into()) {
       return value;
    }
    ChannelName::Chat
}

pub fn get_fader_name(id: u8) -> FaderName {
    if let Some(value) = FaderName::iter().nth(id.into()) {
        return value;
    }
    FaderName::A
}

pub fn get_mute_function_name(id: u8) -> MuteFunction {
    if let Some(value) = MuteFunction::iter().nth(id.into()) {
        return value;
    }
    MuteFunction::All
}

pub fn get_output_name(id: u8) -> OutputDevice {
    if let Some(value) =  OutputDevice::iter().nth(id.into()) {
        return value;
    }
    OutputDevice::Headphones
}

pub fn get_input_name(id: u8) -> InputDevice {
    if let Some(value) = InputDevice::iter().nth(id.into()) {
        return value;
    }
    InputDevice::Microphone
}

pub fn get_cough_mute_behaviour_name(id: u8) -> MuteFunction {
    if let Some(value) =  MuteFunction::iter().nth(id.into()) {
        return value;
    }
    MuteFunction::All
}