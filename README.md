# goxlr-ui

The GoXLR UI is designed to be used alongside the [GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility) daemon
to perform configuration of the GoXLR device. It's still in its early days it currently supports the following features:

* Configuring Channel Volumes
* Configuring Faders, and mute button behaviours
* Displaying Routing Configuration

There's a lot of future work to come, but this should grow as the Utility IPC is expanded.

## Development
This UI is based on [tauri](https://tauri.app) and [VueJS](https://vuejs.org), to provide efficient communication with
the rust based IPC, and component based UI design. 99% of the work is designed to be handled in the Vue component, with
rust being used explicitly for communication with the daemon.

## Project setup
```
npm install
```

## Debug Mode
```
npm tauri:serve
```

## Build the code (AppImage and deb)
```
npm tauri:build
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
