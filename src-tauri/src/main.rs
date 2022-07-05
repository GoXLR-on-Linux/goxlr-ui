#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod mixers;
mod mappings;

use goxlr_ipc::client::Client;
use tokio::runtime::Runtime;
use std::sync::Mutex;

use anyhow::{Context, Result};
use goxlr_ipc::{DeviceType, GoXLRCommand, Socket};
use goxlr_types::{CompressorAttackTime, CompressorRatio, CompressorReleaseTime, GateTimes};
use strum::IntoEnumIterator;
use tokio::net::UnixStream;
use crate::mappings::{get_channel_name, get_fader_name, get_input_name, get_mute_function_name, get_output_name};
use crate::mixers::Mixer;


/**
 * This struct will contain the basics to allow for daemon communication in a way that can be
 * passed through to Tauri, it will then be made available for all command executions.
 */
pub struct DaemonConnection {
  client: Mutex<Client>,
  runtime: Runtime
}

fn main() -> Result<()> {
  let rt = tokio::runtime::Builder::new_current_thread().enable_all().build()?;
  let client = rt.block_on(connect_to_daemon())?;

  let daemon_connection = DaemonConnection{
    client: Mutex::new(client),
    runtime: rt
  };

  tauri::Builder::default()
      .manage(daemon_connection)
      .invoke_handler(tauri::generate_handler![
          get_profiles,
          set_volume,
          set_fader_channel,
          set_fader_mute_function,
          set_routing,
          set_profile,
          set_cough_behaviour,

          // Compressor.
          set_compressor_threshold,
          set_compressor_ratio,
          set_compressor_attack,
          set_compressor_release,
          set_compressor_makeup,

          // Gate
          set_noise_gate_threshold,
          set_noise_gate_attenuation,
          set_noise_gate_attack,
          set_noise_gate_release,
        ])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");

    Ok(())
}

async fn connect_to_daemon() -> Result<Client> {
    let stream = UnixStream::connect("/tmp/goxlr.socket")
        .await
        .context("Could not connect to the GoXLR Daemon Socket")?;

    let address = stream
        .peer_addr()
        .context("Could not get the address of the GoXLR daemon process")?;

    let socket = Socket::new(address, stream);
    let mut client = Client::new(socket);
    client.poll_status().await?;

    Ok(client)
}

#[tauri::command]
fn get_profiles(client_state: tauri::State<'_, DaemonConnection>) -> Result<String, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(client.poll_status());

    let json = serde_json::to_string(client.status()).unwrap_or(String::from("Unable to parse mixer"));
    Ok(json)
}

#[tauri::command]
fn set_volume(serial: String, channel: u8, volume: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetVolume(get_channel_name(channel), volume))
    );

    Ok(true)
}

#[tauri::command]
fn set_fader_channel(serial: String, fader: u8, channel: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetFader(get_fader_name(fader), get_channel_name(channel)))
    );

    Ok(true)
}

#[tauri::command]
fn set_fader_mute_function(serial: String, fader: u8, function: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetFaderMuteFunction(get_fader_name(fader), get_mute_function_name(function)))
    );

    Ok(true)
}

#[tauri::command]
fn set_routing(serial: String, input: u8, output: u8, value: bool, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetRouter(get_input_name(input), get_output_name(output), value))
    );

    Ok(true)
}

#[tauri::command]
fn set_profile(serial: String, profile_name: String, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::LoadProfile(profile_name.to_string()))
    );

    Ok(true)
}

#[tauri::command]
fn set_cough_behaviour(serial: String, cough_mute_function: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetCoughMuteFunction(get_mute_function_name(cough_mute_function)))
    );

    Ok(true)
}


/* Compressor */
#[tauri::command]
fn set_compressor_threshold(serial: String, value: i8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetCompressorThreshold(value))
    );

    Ok(true)
}

#[tauri::command]
fn set_compressor_ratio(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    if let Some(ratio) = CompressorRatio::iter().nth(value.into()) {
        client_state.inner().runtime.block_on(
            client.command(serial.as_str(), GoXLRCommand::SetCompressorRatio(ratio))
        );
        return Ok(true);
    }

    Ok(false)
}

#[tauri::command]
fn set_compressor_attack(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    if let Some(attack) = CompressorAttackTime::iter().nth(value.into()) {
        client_state.inner().runtime.block_on(
            client.command(serial.as_str(), GoXLRCommand::SetCompressorAttack(attack))
        );
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
fn set_compressor_release(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    if let Some(release) = CompressorReleaseTime::iter().nth(value.into()) {
        client_state.inner().runtime.block_on(
            client.command(serial.as_str(), GoXLRCommand::SetCompressorReleaseTime(release))
        );
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
fn set_compressor_makeup(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetCompressorMakeupGain(value))
    );

    Ok(true)
}

#[tauri::command]
fn set_noise_gate_threshold(serial: String, value: i8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetGateThreshold(value))
    );

    Ok(true)
}

#[tauri::command]
fn set_noise_gate_attenuation(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    client_state.inner().runtime.block_on(
        client.command(serial.as_str(), GoXLRCommand::SetGateAttenuation(value))
    );

    Ok(true)
}

#[tauri::command]
fn set_noise_gate_attack(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    if let Some(attack) = GateTimes::iter().nth(value.into()) {
        client_state.inner().runtime.block_on(
            client.command(serial.as_str(), GoXLRCommand::SetGateAttack(attack))
        );
        return Ok(true);
    }
    Ok(false)
}

#[tauri::command]
fn set_noise_gate_release(serial: String, value: u8, client_state: tauri::State<'_, DaemonConnection>) -> Result<bool, String> {
    let mut client = client_state.inner().client.lock().unwrap();

    if let Some(release) = GateTimes::iter().nth(value.into()) {
        client_state.inner().runtime.block_on(
            client.command(serial.as_str(), GoXLRCommand::SetGateRelease(release))
        );
        return Ok(true);
    }
    Ok(false)
}