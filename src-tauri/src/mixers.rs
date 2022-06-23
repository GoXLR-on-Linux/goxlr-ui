use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Mixer {
    // Basic Information
    pub(crate) serial_number: String,
    pub(crate) manufactured_date: String,
    pub(crate) device_type: u8,

    // Versions
    pub(crate) firmware_version: String,
    pub(crate) dice_version: String,
    pub(crate) fpga_count: u32,

    // USB Information
    pub(crate) bus_number: u8,
    pub(crate) address: u8
}