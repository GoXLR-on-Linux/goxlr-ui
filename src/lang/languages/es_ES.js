export default {
    message: {
        channels: {
            All: "All",
            Mic: "Microphone",
            Chat: "Voice Chat",
            Music: "Music",
            Game: "Game",
            Console: "Console",
            LineIn: "Line In",
            System: "System",
            Sample: "Samples",
            LineOut: "Line Out",
            Headphones: "Headphones",
            MicMonitor: "Mic Monitor",
            StreamMix: "Stream Mix",
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Canal 1",
            B: "Canal 2",
            C: "Canal 3",
            D: "Canal 4"
        },

        suffixes: {
            decibels: "dB",
            percentage: "%",
            milliseconds: "ms",
            hertz: "Hz",
            kilohertz: "KHz",
            ratio: ":{value}",
            beatsPerMinute: "BPM",
        },

        modalButtons: {
            ok: "Aceptar",
            yes: "Sí",
            no: "No",
            cancel: "Cancelar"
        },

        navigation: {
            profiles: "Perfiles",
            presets: "Presets",
            samples: "Muestras",
            microphone: "Micrófono",
            mixer: "Mezclador",
            configuration: "Configuración",
            effects: "Efectos",
            sampler: "Sampler",
            lighting: "Iluminación",
            routing: "Ruteo",
            system: "Sistema",

            lightingGlobal: "Global",
            lightingMixer: "Mezclador",
            lightingEffects: "Efectos",
            lightingSampler: "Sampler",
            lightingCough: "Botón de la tos",

            accessibilityProfileSection: "Perfiles y Archivos",
            accessibilityDeviceSection: "Configuración del Dispositivo",
            accessibilityLightingSection: "Configuración de Iluminación",
        },

        microphone: {
            profiles: {
                title: "Perfiles de Micrófono"
            },

            setup: {
                button: "Configuración de Micrófono",
                title: "Configuración de Micrófono",
                type: "Tipo de Micrófono",
                gain: "Ganancia",

                xlr: "Micrófono XLR",
                phantom: "XLR con Phantom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Demasiado Alto",
                good: "Bueno",
                gate_estimated: "La Puerta de ruido no es precisa"
            },

            gate: {
                title: "Puerta de Ruido",
                threshold: "Umbral",
                attenuation: "Atenuación",
                attack: "Ataque",
                release: "Liberación",
            },

            equaliser: {
                title: "Ecualizador",
                reset: "Restablecer",
                enableFineTune: "Habilitar Ajuste Preciso",
                bass: "Graves",
                mid: "Medios",
                treble: "Agudos",
            },

            compressor: {
                title: "Compresor",
                amount: "Cantidad",
                threshold: "Umbral",
                ratio: "Relación",
                attack: "Ataque",
                release: "Liberación",
                makeUpGain: "Ganancia de Compensación",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser/desempolvador",
                bleep: "Pitido",
            }
        },

        mixer: {
            inputs: "Entradas",
            outputs: "Salidas",
            mixAssignment: "Asignación de Mezcla",
            submix: "Submezclas",
            channelA: "A",
            channelB: "B"
        },

        configuration: {
            mute_behaviour: {
                all: "Silenciar para @:message.channels.All",
                stream: "Silenciar para @:message.channels.StreamMix",
                chatMic: "Silenciar para @:message.channels.ChatMic",
                headphones: "Silenciar para @:message.channels.Headphones",
                lineOut: "Silenciar para @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Comportamiento de Silenciado",
            muteBehaviourLabel: "Comportamiento de Silenciado para {channel}",

            faders: {
                title: "Faders/Controles Deslizantes",
                channelTitle: "Canal",
                sourceTitle: "Fuente",
                sourceLabel: "Fuente para {channel}",
            },

            cough: {
                behaviour: {
                    hold: "Mantener",
                    toggle: "Alternar",
                },

                title: "Configuración del Botón de la Tos",
                behaviourTitle: "Comportamiento del Botón",
            }
        },

        effects: {
            preset: {
                title: "Preset",
                group: "Grupo",

                menuLoad: "Cargar",
                menuRename: "Renombrar",
                menuSave: "Guardar en Biblioteca",

                loadPreset: "Cargar Preset",

                renamePresetTitle: "Renombrar Preset",
                renamePresetPlaceholder: "Nuevo Nombre de Preset",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "No tienes presets en la biblioteca, guarda o copia algunos para que aparezcan aquí.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Confirmar Carga de Preset",
                confirmMessage: "Cargar este preset reemplazaró cualquier cambio no guardado en este banco de efectos, ódesea continuar?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Confirmar Sobrescritura de Preset",
                overwriteMessage: "El preset {current} ya existe en su biblioteca, ¿desea sobrescribirlo?",
                overwriteConfirm: "Sobrescribir",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Abrir Carpeta de Presets",
                accessibilityPresetLoaded: "Preset {name} cargado en {bank}",
                accessibilityPresetSaved: "Preset {name} guardado en la Biblioteca",
            },
            reverb: {
                title: "Reverberación",
                style: "Estilo",

                styles: {
                    library: "Biblioteca",
                    darkBloom: "Flor Oscura",
                    musicClub: "Club de Mósica",
                    realPlate: "Placa Real",
                    chapel: "Capilla",
                    hockeyArena: "Pista de Hockey"
                },

                amount: "Cantidad",
                decay: "Decaimiento",
                earlyLevel: "Nivel Inicial",
                tailLevel: "Nivel Final",
                preDelay: "Pre-Retardo",
                lowColour: "Color Bajo",
                highColour: "Color Alto",
                highFactor: "Factor Alto",
                diffuse: "Difuso",
                modSpeed: "Velocidad de Modulación",
                modDepth: "Profundidad de Modulación"
            },

            echo: {
                title: "Eco",

                style: "Estilo",
                styles: {
                    quarter: "Cuarto",
                    eighth: "Octavo",
                    triplet: "Tresillo",
                    pingPong: "Ping Pong",
                    classicSlap: "Slap Clósico",
                    multiTap: "MultiTap"
                },

                amount: "Cantidad",
                feedback: "Realimentación",
                tempo: "Tempo",
                delayLeft: "Retardo Izquierdo",
                delayRight: "Retardo Derecho",
                feedbackLeft: "Realimentación Izquierda",
                feedbackRight: "Realimentación Derecha",
                xfbLeftToRight: "XFB Izq a Der",
                xfbRightToLeft: "XFB Der a Izq",
            },

            pitch: {
                title: "Tono",

                style: "Estilo",
                styles: {
                    narrow: "Estrecho",
                    wide: "Amplio"
                },

                amount: "Cantidad",
                character: "Carácter"
            },

            gender: {
                title: "Género",

                style: "Estilo",
                styles: {
                    narrow: "Estrecho",
                    medium: "Medio",
                    wide: "Amplio"
                },

                amount: "Cantidad"
            },

            megaphone: {
                title: "Megáfono",

                style: "Estilo",
                styles: {
                    megaphone: "Megáfono",
                    radio: "Radio",
                    onThePhone: "En el Teléfono",
                    overdrive: "Overdrive",
                    buzzCutt: "Recorte Buzz",
                    tweed: "Tweed"
                },

                amount: "Cantidad",
                postGain: "Ganancia Posterior"
            },

            robot: {
                title: "Robot",

                style: "Estilo",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Ganancia Baja",
                lowFrequency: "Frecuencia Baja",
                lowWidth: "Ancho Bajo",
                midGain: "Ganancia Media",
                midFrequency: "Frecuencia Media",
                midWidth: "Ancho Medio",
                highGain: "Ganancia Alta",
                                highFrequency: "Frecuencia Alta",
                highWidth: "Ancho Alto",
                waveform: "Forma de Onda",
                pulseWidth: "Ancho de Pulso",
                threshold: "Umbral",
                dryMix: "Mezcla Seco",
            },

            hardTune: {
                title: "Autoajuste",

                style: "Estilo",
                styles: {
                    natural: "Natural",
                    medium: "Medio",
                    hard: "Fuerte"
                },

                amount: "Cantidad",
                rate: "Velocidad",
                window: "Ventana",

                source: "Fuente"
            }
        },

        sampler: {
            bankTitle: "Banco",
            banks: {
                bankTitle: "Banco",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "Botón",
                buttonLabel: "Botón para banco {activeBank}",
                buttons: {
                    topLeft: "Arriba Izquierda",
                    topRight: "Arriba Derecha",
                    bottomLeft: "Abajo Izquierda",
                    bottomRight: "Abajo Derecha",
                },

                functionTitle: "Función",
                functionLabel: "Función para botón {activeButton} en banco {activeBank}",
                functions: {
                    playNext: "Reproducir / Siguiente",
                    playStop: "Reproducir / Detener",
                    playFade: "Reproducir / Fundir",
                    stopOnRelease: "Detener al Soltar",
                    fadeOnRelease: "Fundir al Soltar",
                    loop: "Bucle"
                },

                playOrderTitle: "Orden de Reproducción",
                playOrderLabel: "Orden de Reproducción para botón {activeButton} en banco {activeBank}",
                playOrders: {
                    sequential: "Secuencial",
                    random: "Aleatorio",
                },
            },

            samplesTitle: "Muestras",
            samples: {
                samplesTitle: "Muestras",
                samplesLabel: "Muestra para botón {activeButton} en banco {activeBank}",

                addSample: "+",
                addSampleLabel: "Añadir Muestra",
                sampleSelector: {
                    parentDirectory: "Carpeta Anterior",
                    addButton: "Añadir",

                    noSamples: "No tienes muestras en la carpeta de muestras. Copia algunas aquí para poder seleccionarlas.",

                    directories: "Carpetas",
                    samples: "Muestras",
                },

                gain: "Ganancia",
                waveform: {
                    title: "Forma de Onda",

                    text: "Forma de Onda para {sample}",

                    playbackSample: "Reproducir Muestra",
                    stopSample: "Detener Muestra",

                    sampleStart: "Inicio de la Muestra",
                    sampleEnd: "Fin de la Muestra",

                    sampleDeleted: "La muestra {sampleName} se ha eliminado del botón {activeButton} en el banco {activeBank}",
                    zoomLevel: "Nivel de Zoom: {level}",
                },

                addSampleWaitTitle: "Por Favor, Espera",
                addSampleAnalysing: "Por favor, espera mientras se analiza la muestra.",
                addSampleProgress: "Progreso: {progress}@:message.suffixes.percentage",

                errorTitle: "Error al Añadir Muestra",
                errorText: "Ha ocurrido un error y no se ha añadido la muestra al banco:",

                accessibilityOpenSamplesDirectory: "Abrir Carpeta de Muestras",
                accessibilityAnalysing: "Por favor, espera mientras se analiza la muestra. Este proceso puede tardar un tiempo.",
                accessibilityAdded: "Muestra {name} añadida al botón {activeButton} en el banco {activeBank}."
            }
        },

        lighting: {
            common: {
                colour: "Color",

                activeColour: "Activo",
                inactiveColour: "Inactivo",

                inactiveOption: "Opción Inactiva",
                inactiveOptions: {
                    dimActiveColour: "Atenuar Color Activo",
                    inactiveColour: "Color Inactivo",
                    dimInactiveColour: "Atenuar Color Inactivo"
                },

                applyToAll: "Aplicar a Todo",
            },

            global: {
                areas: {
                    title: "áreas",

                    area: "área",
                    areas: {
                        global: "Global",
                        accent: "Acento",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animaciones",

                    mode: "Modo de Animación",
                    modes: {
                        none: "Ninguno",
                        rainbowRetro: "Arcoíris Retro",
                        rainbowBright: "Arcoíris Brillante",
                        rainbowDark: "Arcoíris Oscuro",
                        simple: "Simple",
                        ripple: "Onda",
                    },

                    mod1: "Modificador Gradiente 1",
                    mod2: "Modificador Gradiente 2",

                    waterfall: "Ajustes Cascada",
                    waterfallOff: "Apagado",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Fader",

                    style: "Estilo",
                    styles: {
                        gradient: "Gradiente",
                        meter: "Medidor",
                    },

                    bottomColour: "Color Inferior",
                    topColour: "Color Superior",

                    accessibilityTitle: "Ajustes de Fader para {channel}",
                },

                screen: {
                    title: "Pantalla",
                    backgroundColour: "Color de Fondo",
                    icons: "Iconos",
                    iconNone: "-- NINGUNO --",

                    optionsTitle: "Opciones",
                    options: {
                        showNumber: "Mostrar Número",
                        invertDisplay: "Invertir Pantalla",
                        text: "Texto",

                        accessibilityText: "Texto para mostrar en la pantalla del GoXLR"
                    }
                },

                mute: {
                    title: "mute ",
                    accessibilityTitle: "Ajustes de mute para {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Botones de Preset",
                    presetTitle: "Preset"
                },

                encoders: {
                    title: "Codificadores",

                    encoder: "Codificador",
                    encoders: {
                        reverb: "Reverberación",
                        echo: "Eco",
                        pitch: "Tono",
                        gender: "Género",
                    },

                    leftColour: "Color Izquierdo",
                    rightColour: "Color Derecho",
                    knobColour: "Color del Botón"
                },

                buttons: {
                    title: "Botones de Efecto",

                    effectTitle: "Efecto",
                    effect: {
                        megaphone: "Megáfono",
                        robot: "Robot",
                        hardTune: "Autoajuste",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "Banco",

                buttonsTitle: "Botones",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Activo / Cargado",
                empty: "Muestra Vacía",
                inactive: "Banco Inactivo",
            },

            cough: {
                title: "Botones de Tos/Pitido",

                buttonsTitle: "Botones",
                buttons: {
                    bleep: "Pitido",
                    cough: "Botón de la Tos",
                }
            },
        },

        routing: {
            title: "Ruteo",

            input: "Entradas",
            inputs: {
                Microphone: "@:message.channels.Mic",
                Chat: "Chat",
                Music: "@:message.channels.Music",
                Game: "@:message.channels.Game",
                Console: "@:message.channels.Console",
                LineIn: "@:message.channels.LineIn",
                System: "@:message.channels.System",
                Samples: "@:message.channels.Sample",
            },

            output: "Salidas",
            outputs: {
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                ChatMic: "@:message.channels.ChatMic",
                Sampler: "@:message.channels.Sampler",
                LineOut: "@:message.channels.LineOut",
                VOD: "@:message.channels.VOD",
            }
        },

        system: {
            title: "Sistema",

            powerButton: "Acción de Encendido",
            power: {
                shutdownTitle: "Acciones de Apagado",
                shutdownDescription: "Estas acciones se ejecutarán cuando se cierre de forma segura la utilidad GoXLR.",

                sleepTitle: "Acciones de Suspensión",
                sleepDescription: "Estas acciones se ejecutarán cuando tu sistema entre en suspensión.",

                wakeTitle: "Acciones al Despertar",
                wakeDescription: "Estas acciones se ejecutarán cuando tu sistema despierte de la suspensión.",

                settingsError: "Parece que la Configuración ha sido modificada manualmente. Para evitar comportamientos inesperados, esta sección ha sido deshabilitada. Para restablecer completamente las acciones de apagado, presiona el botón de abajo.",
                settingsReset: "Restablecer Acciones de Apagado",

                power_options: {
                    reload: "Recargar Configuración",
                    saveProfile: "Guardar Perfil",
                    loadProfile: "Cargar Perfil Completo",
                    loadColourProfile: "Cargar Colores del Perfil",
                    saveMicProfile: "Guardar Perfil de Micrófono",
                                        loadMicProfile: "Cargar Perfil de Micrófono",
                }
            },

            deviceButton: "Configuración del Dispositivo",
            device: {
                holdDuration: "Duración de Mantener el Botón de Silencio para Silenciar Todo",
                holdDurationAccessibility: "La duración en milisegundos que el botón de silencio debe mantenerse presionado para silenciar todos los canales",

                sampleBuffer: "Búfer de Pre-Grabación del Sampler (en segundos)",
                sampleBufferAccessibility: "La duración en segundos que el sampler grabará antes de que se presione el botón",

                voiceDeafen: "Silenciar Chat de Voz también silencia el Mic al Mic de Chat",
                voiceDeafenAccessibility: "Al silenciar el Chat de Voz en todos los canales, también silencia el micrófono para el mic de chat",

                monitorWithFx: "Alternar el Estado de Monitoreo del Mic con Efectos",
                monitorWithFxAccessibility: "Activa el monitoreo del micrófono cuando los efectos están habilitados",

                resetSampleFunctionOnClear: "Restablecer Función de Muestra al Borrar",
                resetSampleFunctionOnClearAccessibility: "Restablece la función de la muestra a Iniciar / Siguiente cuando se borra",

                lockFaders: "Bloquear la posición de los faders al silenciar todo",
                lockFadersAccessibility: "Evita que los faders se desplacen hacia abajo cuando está activo Silenciar Todo",
            },

            settingsButton: "Configuración de la Utilidad",
            settings: {
                language: "Idioma",
                useSystem: "Usar Idioma del Sistema (si está disponible)",

                uiHandler: "Gestor de IU",
                uiHandlers: {
                    browser: "Navegador",
                    app: "Aplicación",
                    custom: "Personalizado"
                },

                logLevel: "Nivel de Registro (requiere reinicio)",
                logLevels: {
                    off: "Apagado",
                    error: "Error",
                    warn: "Advertencia",
                    info: "Información",
                    debug: "Depuración",
                    trace: "Traza"
                },

                allowNetworkAccess: "Permitir Acceso a la Red de la IU (requiere reinicio)",
                allowNetworkAccessAccessibility: "Permite que la IU sea accesible desde otros dispositivos en la red",

                autoStart: "Inicio Automático al Iniciar Sesión",
                autoStartAccessibility: "Inicia la Utilidad GoXLR cuando el usuario inicie sesión",

                showOnLaunch: "Mostrar IU al Iniciar",
                showOnLaunchAccessibility: "Lanza automáticamente la IU al iniciar",

                showTray: "Mostrar Icono en la Bandeja (requiere reinicio)",
                showTrayAccessibility: "Muestra el icono de la utilidad GoXLR en la bandeja del sistema",

                ttsOnButton: "TTS al presionar botón",
                ttsOnButtonAccessibility: "Habla el estado del botón cuando se presiona, ya sea a través del lector de pantalla o TTS del sistema",

                recoverDefaults: "Restablecer Valores Predeterminados",
                recoverOptions: {
                    profiles: "Perfiles",
                    micProfiles: "Perfiles de Micrófono",
                    icons: "Iconos",
                    presets: "Presets"
                },

                shutdownUtility: "Apagar Utilidad GoXLR"
            },

            aboutButton: "Acerca de GoXLR",
            about: {
                serial: "Número de Serie",
                utilityVersion: "Versión de la Utilidad",
                driverVersion: "Versión del Controlador",
                hardwareVersion: "Versión del Hardware",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licencias",
            help: "Ayuda",
        },

        profileManager: {
            saveProfileName: "Guardar Perfil {profileName}",
            createProfile: "Crear Perfil",

            newTitle: "Nueva Fuente de Perfil",
            newQuestion: "¿Te gustaría crear un nuevo perfil desde la configuración predeterminada o actual?",
            newDefaultButton: "Predeterminado",
            newCurrentButton: "Actual",
            newCancelButton: "@:message.modalButtons.cancel",

            overwriteTitle: "Confirmación de Sobrescritura",
            overwriteQuestion: "¿Estós seguro de que deseas sobrescribir el perfil {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            deleteTitle: "Confirmación de Eliminación",
            deleteQuestion: "¿Estás seguro de que deseas eliminar el perfil {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            newNameTitle: "Introduce el Nuevo Nombre de Perfil",
            newNamePlaceHolder: "Nuevo Nombre",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            deleteCurrentErrorTitle: "No se Puede Eliminar",
            deleteCurrentErrorMessage: "No es posible eliminar el perfil activo.",

            menuLoadProfile: "Cargar Perfil",
            menuLoadProfileColours: "Cargar Solo Colores",
            menuDeleteProfile: "Eliminar Perfil",

            accessibilityLoadedProfile: "Perfil {profileName} cargado",
            accessibilityLoadedColours: "Colores del perfil {profileName} cargados",
            accessibilityCreatedProfile: "Perfil {profileName} creado",
            accessibilitySavedProfile: "Perfil {profileName} guardado",
            accessibilitySavedProfileAs: "Perfil {profileName} guardado como {newProfileName}",
            accessibilityProfileDeleted: "Perfil {profileName} eliminado",
            accessibilityActiveProfile: "Perfil Activo",
            accessibilityDropMenuTitle: "Opciones de {profileName}",
            accessibilityOpenProfileDirectory: "Abrir Carpeta de Perfiles",
            accessibilityOpenMicProfileDirectory: "Abrir Carpeta de Perfiles de Micrófono",
        },
    }
}
