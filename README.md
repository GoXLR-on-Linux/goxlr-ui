# goxlr-ui

The GoXLR UI is designed to be used alongside the [GoXLR Utility](https://github.com/GoXLR-on-Linux/goxlr-utility) daemon
to perform configuration of the GoXLR device. It's still in its early days it currently supports the following features:

* Simply Loading Profiles
* Configuring microphone type and gain
* Configuring Mic Gate, EQ, Compressor and DeEsser
* Configuring Faders, and mute behaviours
* Configuring Channel volumes
* Configuring Cough Button behaviour and 'Mute to X'
* Configuring and Changing GoXLR Routing

There's a lot of future work to come, but this should grow as the Utility IPC is expanded.

## Development
This UI is based on [VueJS](https://vuejs.org), and communicates with HTTP server embedded in the GoXLR Utility.
Messages are sent and received in accordance to the utilities IPC format to maintain consistent communication between 
clients. Detailed information on this is available in `src/util/socket.js`.

## Project setup
```
npm install
```

## Debug Mode
Note, that when running in debug mode, the code expects the GoXLR daemon to be running on the default port (14564).

```
npm run serve
```