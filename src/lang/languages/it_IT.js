/*  Italian (Italy) language
 */


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Tutti",
            Mic: "Mic",
            Chat: "Chat Vocale",
            Music: "Musica",
            Game: "Gioco",
            Console: "Console",
            LineIn: "Line In",
            System: "Sistema",
            Sample: "Campioni",
            LineOut: "Line Out",
            Headphones: "Cuffie",
            MicMonitor: "Monitor Mic",
            StreamMix: "Mix Diretta",
            ChatMic: "Mic Chat",
            Sampler: "Campionatore",
        },

        faders: {
            A: "Canale 1",
            B: "Canale 2",
            C: "Canale 3",
            D: "Canale 4"
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
            ok: "Ok",
            yes: "Sì",
            no: "No",
            cancel: "Annulla"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profili",
            presets: "Preset",
            samples: "Campioni",

            // Main Navigation Tabs
            microphone: "Mic",
            mixer: "Mixer",
            configuration: "Configurazione",
            effects: "Effetti",
            sampler: "Campionatore",
            lighting: "Illuminazione",
            routing: "Routing",
            system: "Sistema",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Globale",
            lightingMixer: "Mixer",
            lightingEffects: "Effetti",
            lightingSampler: "Campionatore",
            lightingCough: "Tosse",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profili e File",
            accessibilityDeviceSection: "Impostazioni Dispositivo",
            accessibilityLightingSection: "Impostazioni Illuminazione",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Profili Mic"
            },

            setup: {
                button: "Configurazione Mic",
                title: "Configurazione Mic",
                type: "Tipo Mic",
                gain: "Guadagno",

                // Microphone Types
                xlr: "Microfono XLR",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3.5mm",
            },
            waveform: {
                loud: "Troppo Forte",
                good: "Giusto",
                gate_estimated: "Il Gate è una stima"
            },

            gate: {
                title: "Gate",
                threshold: "Soglia",
                attenuation: "Attenuazione",
                attack: "Attacco",
                release: "Rilascio",
            },

            equaliser: {
                title: "Equalizzatore",
                reset: "Reset",
                enableFineTune: "Abilita controllo di precisione",
                bass: "Bassi",
                mid: "Medi",
                treble: "Alti",
            },

            compressor: {
                title: "Compressore",
                amount: "Quantità",
                threshold: "Soglia",
                ratio: "Rapporto",
                attack: "Attacco",
                release: "Rilascio",
                makeUpGain: "Guadagno aggiuntivo",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Bip",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Ingressi",
            outputs: "Uscite",
            mixAssignment: "Assegnamento Mix",

            // Submix Checkbox
            submix: "Submix",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                all: "Muta verso @:message.channels.All",
                stream: "Muta verso @:message.channels.StreamMix",
                chatMic: "Muta verso @:message.channels.ChatMic",
                headphones: "Muta verso @:message.channels.Headphones",
                lineOut: "Muta verso @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Comportamento Muto",
            muteBehaviourLabel: "Comportamento Muto per {channel}",

            // Config for the Faders
            faders: {
                title: "Fader",
                channelTitle: "Canale",
                sourceTitle: "Fonte",
                sourceLabel: "Fonte per {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Tieni Premuto",
                    toggle: "Premi",
                },

                title: "Impostazioni Tasto Tosse",
                behaviourTitle: "Comportamento Tasto Tosse",
            }
        },

        effects: {
            preset: {
                title: "Preset",
                group: "Gruppo",

                menuLoad: "Carica",
                menuRename: "Rinomina",
                menuSave: "Salva nella Libreria",


                loadPreset: "Carica Preset",

                renamePresetTitle: "Rinomina Preset",
                renamePresetPlaceholder: "Nome Nuovo Preset",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "Al momento non sono presenti preset nella libreria, salva o copiane qualcuno per farli apparire qui.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Conferma Caricamento Preset",
                confirmMessage: "Caricare questo preset sostituirà qualsiasi modifica non salvata su questa banca effetti, vuoi procedere?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Conferma Sovrascrizione Preset",
                overwriteMessage: "Il preset {current} esiste già nella tua libreria, vuoi sovrascriverlo?",
                overwriteConfirm: "Sovrascrivi",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Apri Cartella Preset",
                accessibilityPresetLoaded: "Preset {name} caricato su {bank}",
                accessibilityPresetSaved: "Preset {name} salvato nella Libreria",
            },
            reverb: {
                title: "Riverbero",
                style: "Stile",

                styles: {
                    library: "Libreria",
                    darkBloom: "Dark Bloom",
                    musicClub: "Discoteca",
                    realPlate: "Real Plate",
                    chapel: "Cappella",
                    hockeyArena: "Arena Hockey"
                },

                amount: "Quantità",
                decay: "Decadimento",
                earlyLevel: "Livello di Inizio",
                tailLevel: "Livello di Coda",
                preDelay: "Pre-ritardo",
                lowColour: "Colore Basso",
                highColour: "Colore Alto",
                highFactor: "Fattore Alto",
                diffuse: "Diffusione",
                modSpeed: "Velocità Mod",
                modDepth: "Profondità Mod"
            },

            echo: {
                title: "Eco",

                style: "Stile",
                styles: {
                    quarter: "Quarto",
                    eighth: "Ottavo",
                    triplet: "Terzina",
                    pingPong: "Ping Pong",
                    classicSlap: "Schiaffo Classico",
                    multiTap: "Tocco Multiplo"
                },

                amount: "Quantità",
                feedback: "Ritorno",
                tempo: "Ritmo",
                delayLeft: "Ritardo Sx",
                delayRight: "Ritardo Dx",
                feedbackLeft: "Ritorno Sx",
                feedbackRight: "Ritorno Dx",
                xfbLeftToRight: "XFB Sx a Dx",
                xfbRightToLeft: "XFB Dx a Sx",
            },

            pitch: {
                title: "Tono",

                style: "Stile",
                styles: {
                    narrow: "Stretto",
                    wide: "Largo"
                },

                amount: "Quantità",
                character: "Carattere"
            },

            gender: {
                title: "Genere",

                style: "Stile",
                styles: {
                    narrow: "Stretto",
                    medium: "Medio",
                    wide: "Largo"
                },

                amount: "Quantità"
            },

            megaphone: {
                title: "Megafono",

                style: "Stile",
                styles: {
                    megaphone: "Megafono",
                    radio: "Radio",
                    onThePhone: "Al Telefono",
                    overdrive: "Sovraccarico",
                    buzzCutt: "Capelli a Spazzola",
                    tweed: "Tweed"
                },

                amount: "Quantità",
                postGain: "Guadagno Aggiuntivo"
            },

            robot: {
                title: "Robot",

                style: "Stile",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Guadagno Bassi",
                lowFrequency: "Frequenza Bassi",
                lowWidth: "Larghezza Bassi",
                midGain: "Guadagno Medi",
                midFrequency: "Frequenza Medi",
                midWidth: "Larghezza Medi",
                highGain: "Guadagno Alti",
                highFrequency: "Frequenza Alti",
                highWidth: "Larghezza Alti",
                waveform: "Onda",
                pulseWidth: "Larghezza Impulso",
                threshold: "Soglia",
                dryMix: "Mix Secco",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Stile",
                styles: {
                    natural: "Naturale",
                    medium: "Medio",
                    hard: "Forte"
                },

                amount: "Quantità",
                rate: "Rapporto",
                window: "Finestra",

                source: "Fonte"
            }
        },

        sampler: {
            bankTitle: "Banca",
            banks: {
                bankTitle: "Banca",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "Tasto",
                buttonLabel: "Tasto per banca {activeBank}",
                buttons: {
                    topLeft: "Alto a Sinistra",
                    topRight: "Alto a Destra",
                    bottomLeft: "Basso a Sinistra",
                    bottomRight: "Basso a Destra",
                },

                functionTitle: "Funzione",
                functionLabel: "Funzione per tasto {activeButton} sulla banca {activeBank}",
                functions: {
                    playNext: "Inizia Riproduzione / Prossimo Campione",
                    playStop: "Inizia Riproduzione / Interrompi Riproduzione",
                    playFade: "Inizia Riproduzione / Sfuma Campione",
                    stopOnRelease: "Interrompi al Rilascio",
                    fadeOnRelease: "Sfuma al Rilascio",
                    loop: "Loop"
                },

                playOrderTitle: "Ordine di Riproduzione",
                playOrderLabel: "Ordine di riproduzione per il tasto {activeButton} sulla banca {activeBank}",
                playOrders: {
                    sequential: "Sequenziale",
                    random: "Casuale",
                },
            },

            samplesTitle: "Campioni",
            samples: {
                samplesTitle: "Campioni",
                samplesLabel: "Campioni per tasto {activeButton} sulla banca {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Aggiungi Campione",
                sampleSelector: {
                    parentDirectory: "Cartella Superiore",
                    addButton: "Aggiungi",

                    noSamples: "Al momento non sono presenti campioni nella cartella dei campioni, copiane qualcuno per selezionarli qui!",

                    // Used with Screen Readers
                    directories: "Cartelle",
                    samples: "Campioni",
                },

                gain: "Guadagno",
                waveform: {
                    title: "Onda",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Onda per {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Riproduci Campione",
                    stopSample: "Interrompi Campione",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Inizio Campione",
                    sampleEnd: "Fine Campione",

                    sampleDeleted: "Il Campione {sampleName} è stato eliminato dal tasto {activeButton} sulla banca {activeBank}",
                    zoomLevel: "Livello di zoom: {level}",
                },

                addSampleWaitTitle: "Attendi",
                addSampleAnalysing: "Attendi mentre il campione viene analizzato.",
                addSampleProgress: "Progresso: {progress}@:message.suffixes.percentage",

                errorTitle: "Errore nell'aggiunta del Campione",
                errorText: "Si è verificato un errore nell'aggiunta del campione alla banca:",

                accessibilityOpenSamplesDirectory: "Apri Cartella Campioni",
                accessibilityAnalysing: "Attendi, analisi del campione in corso. Questo processo potrebbe richiedere fino a due minuti.",
                accessibilityAdded: "Il campione {name} è stato aggiunto al tasto {activeButton} sulla banca {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Colore",

                activeColour: "Attivo",
                inactiveColour: "Inattivo",

                inactiveOption: "Opzione Inattiva",
                inactiveOptions: {
                    dimActiveColour: "Riduci Luminosità Colore Attivo",
                    inactiveColour: "Colore Inattivo",
                    dimInactiveColour: "Riduci Luminosità Colore Inattivo"

                },

                applyToAll: "Applica a Tutti",
            },

            global: {
                areas: {
                    title: "Aree",

                    area: "Area",
                    areas: {
                        global: "Globale",
                        accent: "Accenti",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animazioni",

                    mode: "Modalità Animazione",
                    modes: {
                        none: "Nessuna",
                        rainbowRetro: "Arcobaleno Retro",
                        rainbowBright: "Arcobaleno Chiaro",
                        rainbowDark: "Arcobaleno Scuro",
                        simple: "Semplice",
                        ripple: "Onda",
                    },

                    mod1: "Gradiente Mod 1",
                    mod2: "Gradiente Mod 2",

                    waterfall: "Impostazioni Cascata",
                    waterfallOff: "Disabilitata",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Fader",

                    style: "Stile",
                    styles: {
                        gradient: "Gradiente",
                        meter: "Meter",
                    },

                    bottomColour: "Colore Inizio",
                    topColour: "Colore Fine",

                    accessibilityTitle: "Impostazioni Fader per {channel}",
                },

                screen: {
                    title: "Schermo",
                    backgroundColour: "Colore di Sfondo",
                    icons: "Icone",
                    iconNone: "-- NESSUNA --",

                    optionsTitle: "Opzioni",
                    options: {
                        showNumber: "Mostra Numbero",
                        invertDisplay: "Inverti Schermo",
                        text: "Testo",

                        accessibilityText: "Testo da mostrare sullo schermo di GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Muto",
                    accessibilityTitle: "Impostazioni Muto per {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Tasti Preset",
                    presetTitle: "Preset"
                },

                encoders: {
                    title: "Manopole",

                    encoder: "Manopola",
                    encoders: {
                        reverb: "Riverbero",
                        echo: "Eco",
                        pitch: "Tono",
                        gender: "Genere",
                    },

                    leftColour: "Colore Sinistro",
                    rightColour: "Colore Destro",
                    knobColour: "Colore Manopola"
                },

                buttons: {
                    title: "Tasti Effetto",

                    effectTitle: "Effetto",
                    effect: {
                        megaphone: "Megafono",
                        robot: "Robot",
                        hardTune: "Hardtune",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "Banca",

                buttonsTitle: "Tasti",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Attivo / Caricato",
                empty: "Campione Vuoto",
                inactive: "Banca Inattiva",
            },

            cough: {
                title: "Tasti Tosse/Bip",

                buttonsTitle: "Tasti",
                buttons: {
                    bleep: "Bip",
                    cough: "Tosse",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Ingressi",
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

            output: "Uscite",
            outputs: {
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                ChatMic: "@:message.channels.ChatMic",
                Sampler: "@:message.channels.Sampler",
                LineOut: "@:message.channels.LineOut",
            }
        },

        system: {
            title: "System",

            powerButton: "Azione Alimentazione",
            power: {
                shutdownTitle: "Azioni di Spegnimento",
                shutdownDescription: "Queste azioni verranno eseguite quando GoXLR Utility viene chiusa in maniera pulita.",

                sleepTitle: "Azioni Modalità Riposo",
                sleepDescription: "Queste azioni verranno eseguite quando il computer va in Modalità Riposo.",

                wakeTitle: "Azioni di Risveglio",
                wakeDescription: "Queste azioni verranno eseguite quando il computer si risveglia dalla Modalità Riposo",

                settingsError: "Sembra che la Configurazione sia stata modificata manualmente. Al fine di evitare comportamenti inattesi, questa sezione è stata disabilitata. Per resettare completamente le Azioni di Spegnimento, premi il tasto qui sotto",
                settingsReset: "Resetta Azioni di Spegnimento",

                power_options: {
                    reload: "Ricarica Impostazioni",
                    saveProfile: "Salva Profilo",
                    loadProfile: "Carica Profilo Completo",
                    loadColourProfile: "Carica Colori Profilo",
                    saveMicProfile: "Salva Profilo Microfono",
                    loadMicProfile: "Carica Profilo Microfono",
                }
            },

            deviceButton: "Impostazioni Dispositivo",
            device: {
                holdDuration: "Durata pressione Tasto Muto per mutare verso Tutti",
                holdDurationAccessibility: "La durata in millisecondi per cui bisogna tenere premuto il tasto Muto per mutare verso tutti i canali",

                sampleBuffer: "Buffer di pre-registrazione del Campionatore (in secondi)",
                sampleBufferAccessibility: "La durata in secondi che il Campionatore registerà prima che il tasto venga premuto.",

                voiceDeafen: "Muta verso Tutti su Chat Vocale muta anche Mic verso Mic Chat",
                voiceDeafenAccessibility: "Quando muti Chat Vocale verso tutti i canali, muta anche Mic verso Mic Chat",

                monitorWithFx: "Attiva/Disattiva monitoraggio microfono con tasto FX",
                monitorWithFxAccessibility: "Attiva monitoraggio microfono quando FX è attivo",

                lockFaders: "Blocca posizioni fader quando Muta verso Tutti viene attivato",
                lockFadersAccessibility: "Disabilita il movimento dei fader quando viene attivato Muta verso Tutti",
            },

            settingsButton: "Impostazioni Utility",
            settings: {
                language: "Language",
                useSystem: "Use System Language (if available)",

                uiHandler: "Handler UI",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Personalizzato"
                },


                logLevel: "Livelli di Log (richiede il riavvio)",
                logLevels: {
                    off: "Disabilitato",
                    error: "Errori",
                    warn: "Avvisi",
                    info: "Info",
                    debug: "Debug",
                    trace: "Traccia"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Consenti accesso di Rete all'UI (richiede il riavvio)",
                allowNetworkAccessAccessibility: "Consente di accedere all'interfaccia utente tramite altri dispositivi sulla rete locale",

                autoStart: "Avvio automatico al Login",
                autoStartAccessibility: "Avvia GoXLR Utility quando l'utente esegue l'accesso",

                showOnLaunch: "Mostra l'UI al Avvio",
                showOnLaunchAccessibility: "Mostra l'UI all'avvio automaticamente",

                showTray: "Mostra icona Barra di Sistema (richiede il riavvio)",
                showTrayAccessibility: "Mostra l'icona di GoXLR Utility nella Barra di Sistema",

                ttsOnButton: "Sintesi Vocale alla pressione dei tasti",
                ttsOnButtonAccessibility: "Sintesi Vocale dello stato dei tasti quando premuti, tramite screen reader o TTS di sistema",

                recoverDefaults: "Ripristina Predefiniti",
                recoverOptions: {
                    profiles: "Profili",
                    micProfiles: "Profili Microfono",
                    icons: "Icone",
                    presets: "Preset"
                },

                shutdownUtility: "Chiudi GoXLR Utility"
            },

            aboutButton: "Informazioni GoXLR",
            about: {
                serial: "Seriale",
                utilityVersion: "Versione Utility",
                hardwareVersion: "Versione Hardware",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licenze",
            help: "Aiuto",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Salva Profilo {profileName}",
            createProfile: "Crea Profilo",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Origine del Nuovo Profilo",
            newQuestion: "Vuoi creare un nuovo profilo da quello predefinito o dalle impostazioni correnti?",
            newDefaultButton: "Predefinito",
            newCurrentButton: "Impostazioni Correnti",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Conferma di Sovrascrizione",
            overwriteQuestion: "Confermi di voler sovrascrivere il profilo {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Conferma di Eliminazione",
            deleteQuestion: "Confermi di voler eliminare il profilo {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "inserisci Nuovo Nome Profilo",
            newNamePlaceHolder: "Nuovo Nome",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Impossibile Eliminare",
            deleteCurrentErrorMessage: "Non è possibile eliminare il profilo attivo.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Carica Profilo",
            menuLoadProfileColours: "Carica Solo i Colori",
            menuDeleteProfile: "Elimina Profilo",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Il profilo {profileName} è stato caricato",
            accessibilityLoadedColours: "I colori del profilo {profileName} sono stati caricati",
            accessibilityCreatedProfile: "Il profilo {profileName} è stato creato",
            accessibilitySavedProfile: "Il profilo {profileName} è stato salvato",
            accessibilitySavedProfileAs: "Il profilo {profileName} è stato salvato con nome {newProfileName}",
            accessibilityProfileDeleted: "Il profilo {profileName} è stato eliminato",
            accessibilityActiveProfile: "Profilo Attivo",
            accessibilityDropMenuTitle: "Opzioni per {profileName}",
            accessibilityOpenProfileDirectory: "Apri Cartella Profili",
            accessibilityOpenMicProfileDirectory: "Apri Cartella Profili Microfono",
        },
    }
}