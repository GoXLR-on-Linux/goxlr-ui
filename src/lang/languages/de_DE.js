///
/// Authors:
/// jonilala796
/// Kariko
///

export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Alle",
            Mic: "Mikrofon",
            Chat: "Sprachchat",
            Music: "Musik",
            Game: "Spiel",
            Console: "Konsole",
            LineIn: "Line-In",
            System: "System",
            Sample: "Samples",
            LineOut: "Line-Out",
            Headphones: "Kopfhörer",
            MicMonitor: "Mikrofon-Monitor",
            StreamMix: "Stream-Mix",
            ChatMic: "Chat-Mikrofon",
            Sampler: "Sampler",
        },

        faders: {
            A: "Kanal 1",
            B: "Kanal 2",
            C: "Kanal 3",
            D: "Kanal 4"
        },

        suffixes: {
            decibels: "dB",
            percentage: "%",
            milliseconds: "ms",
            hertz: "Hz",
            kilohertz: "kHz",
            ratio: ":{value}",
            beatsPerMinute: "BPM",
        },

        modalButtons: {
            ok: "Ok",
            yes: "Ja",
            no: "Nein",
            cancel: "Abbrechen",
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profile",
            presets: "Vorlagen",
            samples: "Samples",

            // Main Navigation Tabs
            microphone: "Mikrofon",
            mixer: "Mixer",
            configuration: "Konfiguration",
            effects: "Effekte",
            sampler: "Sampler",
            lighting: "Beleuchtung",
            routing: "Routing",
            system: "System",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Global",
            lightingMixer: "Mixer",
            lightingEffects: "Effekte",
            lightingSampler: "Sampler",
            lightingCough: "Husten/Piepton",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profile und Dateien",
            accessibilityDeviceSection: "Geräteeinstellungen",
            accessibilityLightingSection: "Beleuchtungseinstellungen",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Mikrofon Profile",
            },

            setup: {
                button: "Mikrofon Setup",
                title: "Mikrofon Setup",
                type: "Mikrofon Typ",
                gain: "Gain",

                // Microphone Types
                xlr: "XLR Mikrofon",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3,5mm Klinke",
            },

            waveform: {
                loud: "Zu Laut",
                good: "Gut",
                gate_estimated: "Gate geschätzt",
            },

            gate: {
                title: "Gate",
                threshold: "Schwellenwert",
                attenuation: "Dämpfung",
                attack: "Attack",
                release: "Release",
            },

            equaliser: {
                title: "Equalizer",
                reset: "Reset",
                enableFineTune: "Feineinstellung aktivieren",
                bass: "Tiefen",
                mid: "Mitten",
                treble: "Höhen",
            },

            compressor: {
                title: "Kompressor",
                amount: "Anteil",
                threshold: "Schwellenwert",
                ratio: "Verhältnis",
                attack: "Attack",
                release: "Release",
                makeUpGain: "Make-Up Gain",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Piepton",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Eingänge",
            outputs: "Ausgänge",
            mixAssignment: "Mix Zuweisung",

            // Submix Checkbox
            submix: "Submixes",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                all: "@:message.channels.All stummschalten",
                stream: "@:message.channels.StreamMix stummschalten",
                chatMic: "@:message.channels.ChatMic stummschalten",
                headphones: "@:message.channels.Headphones stummschalten",
                lineOut: "@:message.channels.LineOut stummschalten",
            },
            muteBehaviourTitle: "Stummschaltverhalten",
            muteBehaviourLabel: "Stummschaltverhalten für {channel}",

            // Config for the Faders
            faders: {
                title: "Fader",
                channelTitle: "Kanal",
                sourceTitle: "Quelle",
                sourceLabel: "Quelle für {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Halten",
                    toggle: "Umschalten",
                },

                title: "Hust Tasten Einstellungen",
                behaviourTitle: "Tastenverhalten",
            }
        },

        effects: {
            preset: {
                title: "Vorlage",
                group: "Gruppe",

                menuLoad: "Laden",
                menuRename: "Umbenennen",
                menuSave: "In Bibliothek speichern",


                loadPreset: "Vorlage laden",

                renamePresetTitle: "Vorlage umbenennen",
                renamePresetPlaceholder: "neuer Vorlagenname",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "Es gibt derzeit keine Vorlagen in der Bibliothek, speichere oder kopiere einige, damit sie hier erscheinen.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Bestätige Laden der Vorlage",
                confirmMessage: "Wenn du diese Vorlage lädst, werden alle ungespeicherten Änderungen in dieser Effektbank ersetzt, möchtest du fortfahren?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Bestätige Überschreiben der Vorlage",
                overwriteMessage: "Die Vorlage {current} existiert bereits in deiner Bibliothek, möchtest du es überschreiben?",
                overwriteConfirm: "Überschreiben",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Öffne Vorlagen Verzeichnis",
                accessibilityPresetLoaded: "Vorlage {name} in {bank} geladen",
                accessibilityPresetSaved: "Vorlage {name} in Bibliothek gespeichert",
            },
            reverb: {
                title: "Hall",
                style: "Art",

                styles: {
                    library: "Bibliothek",
                    darkBloom: "Dunkle Blüte",
                    musicClub: "Musik Club",
                    realPlate: "Echte Platte",
                    chapel: "Kapelle",
                    hockeyArena: "Hockey Arena",
                },

                amount: "Stärke",
                decay: "Abklingen",
                earlyLevel: "Anfängliches Niveau",
                tailLevel: "Endniveau",
                preDelay: "Pre-Delay",
                lowColour: "Lo Colour",
                highColour: "Hi Colour",
                highFactor: "Hi Factor",
                diffuse: "Diffusion",
                modSpeed: "Modulations-Geschwindigkeit",
                modDepth: "Modulations-Tiefe",
            },

            echo: {
                title: "Echo",

                style: "Art",
                styles: {
                    quarter: "Viertel",
                    eighth: "Achtel",
                    triplet: "Drittel",
                    pingPong: "Ping Pong",
                    classicSlap: "Klassischer Slap",
                    multiTap: "Multi-Tap",
                },

                amount: "Stärke",
                feedback: "Feedback",
                tempo: "Geschwindigkeit",
                delayLeft: "Verzögerung L",
                delayRight: "Verzögerung R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L zu R",
                xfbRightToLeft: "XFB R zu L",
            },

            pitch: {
                title: "Tonhöhe",

                style: "Art",
                styles: {
                    narrow: "Schmal",
                    wide: "Weit",
                },

                amount: "Stärke",
                character: "Charakter",
            },

            gender: {
                title: "Geschlecht",

                style: "Art",
                styles: {
                    narrow: "Schmal",
                    medium: "Mittel",
                    wide: "Weit",
                },

                amount: "Stärke",
            },

            megaphone: {
                title: "Megafon",

                style: "Art",
                styles: {
                    megaphone: "Megafon",
                    radio: "Funk",
                    onThePhone: "Am Telefon",
                    overdrive: "Übersteuern",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed",
                },

                amount: "Stärke",
                postGain: "Post Gain"
            },

            robot: {
                title: "Roboter",

                style: "Art",
                styles: {
                    robot1: "Roboter 1",
                    robot2: "Roboter 2",
                    robot3: "Roboter 3",
                },

                lowGain: "Low Gain",
                lowFrequency: "Low Freq",
                lowWidth: "Low Width",
                midGain: "Mid Gain",
                midFrequency: "Mid Freq",
                midWidth: "Mid Width",
                highGain: "Hi Gain",
                highFrequency: "Hi Freq",
                highWidth: "Hi Width",
                waveform: "Wellenform",
                pulseWidth: "Pulsdauer",
                threshold: "Schwellenwert",
                dryMix: "Dry Mix",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Art",
                styles: {
                    natural: "Natürlich",
                    medium: "Mittel",
                    hard: "Hart",
                },

                amount: "Amount",
                rate: "Rate",
                window: "Window",

                source: "Quelle",
            }
        },

        sampler: {
            bankTitle: "Bank",
            banks: {
                bankTitle: "Bank",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "Taste",
                buttonLabel: "Taste für {activeBank}",
                buttons: {
                    topLeft: "Oben Links",
                    topRight: "Oben Rechts",
                    bottomLeft: "Unten Links",
                    bottomRight: "Unten Rechts",
                },

                functionTitle: "Funktionen",
                functionLabel: "Funktion für Taste {activeButton} in Bank {activeBank}",
                functions: {
                    playNext: "Abspielen / Nächster",
                    playStop: "Abspielen / Stop",
                    playFade: "Abspielen / Ausblenden",
                    stopOnRelease: "Stoppen bei Loslassen",
                    fadeOnRelease: "Ausblenden bei Loslassen",
                    loop: "Schleife",
                },

                playOrderTitle: "Abspielreihenfolge",
                playOrderLabel: "Abspielreihenfolge für Taste {activeButton} in Bank {activeBank}",
                playOrders: {
                    sequential: "Sequentiell",
                    random: "Zufällig",
                },
            },

            samplesTitle: "Samples",
            samples: {
                samplesTitle: "Samples",
                samplesLabel: "Sample für Taste {activeButton} in Bank {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Sample hinzufügen",
                sampleSelector: {
                    parentDirectory: "Übergeordnetes Verzeichnis",
                    addButton: "Hinzufügen",

                    noSamples: "Zurzeit befinden sich keine Samples im Samples-Ordner. Kopiere einige rüber, damit sie hier ausgewählt werden können!",

                    // Used with Screen Readers
                    directories: "Verzeichnisse",
                    samples: "Samples",
                },

                gain: "Gain",
                waveform: {
                    title: "Wellenform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Wellenform für {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Sample abspielen",
                    stopSample: "Sample stoppen",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Sample Start",
                    sampleEnd: "Sample Ende",

                    sampleDeleted: "Sample {sampleName} wurde von der Taste {activeButton} in Bank {activeBank} gelöscht",
                    zoomLevel: "Zoom Level: {level}",
                },

                addSampleWaitTitle: "Bitte warten",
                addSampleAnalysing: "Bitte warte, während das Sample analysiert wird.",
                addSampleProgress: "Fortschritt: {progress}@:message.suffixes.percentage",

                errorTitle: "Fehler beim Hinzufügen des Samples",
                errorText: "Beim Hinzufügen des Samples zur Bank ist ein Fehler aufgetreten:",

                accessibilityOpenSamplesDirectory: "Öffne Samples Verzeichnis",
                accessibilityAnalysing: "Bitte warte, das Sample wird analysiert. Dieser Vorgang kann ein paar Minuten dauern.",
                accessibilityAdded: "Sample {name} wurde zur Taste {activeButton} in Bank {activeBank} hinzugefügt."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Farbe",

                activeColour: "Aktive",
                inactiveColour: "Inaktive",

                inactiveOption: "Inaktive Option",
                inactiveOptions: {
                    dimActiveColour: "Dimme aktive Farbe",
                    inactiveColour: "Inaktive Farbe",
                    dimInactiveColour: "Dimme inaktive Farbe",

                },

                applyToAll: "Auf alle anwenden",
            },

            global: {
                areas: {
                    title: "Bereiche",

                    area: "Bereich",
                    areas: {
                        global: "Global",
                        accent: "Akzent",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animationen",

                    mode: "Animationsmodus",
                    modes: {
                        none: "Keine",
                        rainbowRetro: "Regenbogen Retro",
                        rainbowBright: "Regenbogen Hell",
                        rainbowDark: "Regenbogen Dunkel",
                        simple: "Einfach",
                        ripple: "Welle",
                    },

                    mod1: "Verlauf Mod 1",
                    mod2: "Verlauf Mod 2",

                    waterfall: "Wasserfall Einstellungen",
                    waterfallOff: "Aus",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Fader",

                    style: "Art",
                    styles: {
                        gradient: "Verlauf",
                        meter: "Audioanzeige",
                    },

                    bottomColour: "Untere Farbe",
                    topColour: "Obere Farbe",

                    accessibilityTitle: "Fader Einstellungen für {channel}",
                },

                screen: {
                    title: "Anzeige",
                    backgroundColour: "Hintergrundfarbe",
                    icons: "Icons",
                    iconNone: "-- KEINS --",

                    optionsTitle: "Optionen",
                    options: {
                        showNumber: "Zeige Nummer",
                        invertDisplay: "Anzeige invertieren",
                        text: "Text",

                        accessibilityText: "Text zur Anzeige auf dem GoXLR-Display"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Stummschalten",
                    accessibilityTitle: "Stummschaltungseinstellungen für {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Vorlage Tasten",
                    presetTitle: "Vorlage"
                },

                encoders: {
                    title: "Encoder",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverb",
                        echo: "Echo",
                        pitch: "Pitch",
                        gender: "Geschlecht",
                    },

                    leftColour: "Linke Farbe",
                    rightColour: "Rechte Farbe",
                    knobColour: "Reglerfarbe",
                },

                buttons: {
                    title: "Effekt Tasten",

                    effectTitle: "Effekt",
                    effect: {
                        megaphone: "Megafon",
                        robot: "Roboter",
                        hardTune: "Hardtune",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "Bank",

                buttonsTitle: "Tasten",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Aktiv / Geladen",
                empty: "Sample leer",
                inactive: "Inaktive Bank",
            },

            cough: {
                title: "Hust / Piepton Tasten",

                buttonsTitle: "Tasten",
                buttons: {
                    bleep: "Piepton",
                    cough: "Husten",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Eingänge",
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

            output: "Ausgänge",
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

            powerButton: "Energie-Aktionen",
            power: {
                shutdownTitle: "Abschaltaktionen",
                shutdownDescription: "Diese Aktionen werden ausgeführt, wenn das GoXLR Utility sicher heruntergefahren ist.",

                sleepTitle: "Schlaf Aktionen",
                sleepDescription: "Diese Aktionen werden ausgeführt, wenn das System in den Schlafmodus wechselt.",

                wakeTitle: "Aufwach Aktionen",
                wakeDescription: "Diese Aktionen werden ausgeführt, wenn das System aus dem Schlafmodus aufwacht.",

                settingsError: "Die Konfiguration scheint manuell geändert worden zu sein. Um unerwartetes Verhalten zu vermeiden, wurde dieser Abschnitt deaktiviert. Um die Abschaltaktionen vollständig zurückzusetzen, drücke die Taste unten",
                settingsReset: "Abschaltaktionen zurücksetzen",

                power_options: {
                    reload: "Einstellungen neu laden",
                    saveProfile: "Profil speichern",
                    loadProfile: "Lade ganzes Profil",
                    loadColourProfile: "Lade Profilfarben",
                    saveMicProfile: "Mikrofonprofil speichern",
                    loadMicProfile: "Lade Mikrofonprofil",
                }
            },

            deviceButton: "Geräteeinstellungen",
            device: {
                holdDuration: "Stummschaltetaste Haltezeit um alles stummzuschalten",
                holdDurationAccessibility: "Dauer in Millisekunden, die die Stummschaltetaste gehalten werden muss, um für alle Kanäle stummzuschalten",

                sampleBuffer: "Sampler Pre-Record-Puffer (in Sekunden)",
                sampleBufferAccessibility: "Anzahl der Sekunden, die der Sampler im Voraus aufzeichnet, bevor er ausgelöst wird",

                voiceDeafen: "Sprachchat Stummschaltung für alle schaltet auch das Mikrofon zum Chat-Mikrofon stumm.",
                voiceDeafenAccessibility: "Wenn alle Kanäle stummgeschaltet werden, wird auch das Chat-Mikrofon stummgeschaltet.",

                monitorWithFx: "Mikrofonmonitor mit FX-Status umschalten",
                monitorWithFxAccessibility: "Aktiviert den Mikrofonmonitor, wenn FX aktiviert wird",

                resetSampleFunctionOnClear: "Sampler Modus beim Leeren zurücksetzen",
                resetSampleFunctionOnClearAccessibility: "Setzt den Sampler Modus beim Leeren auf Start/Nächster",

                lockFaders: "Faderpositionen bei Stummschaltung auf Alle sperren",
                lockFadersAccessibility: "Verhindert, dass sich die Fader nach unten bewegen, wenn Stummschaltung für alle aktiviert ist.",
            },

            settingsButton: "Utility Einstellungen",
            settings: {
                language: "Sprache",
                useSystem: "System Sprache verwenden (wenn verfügbar)",

                uiHandler: "UI Handler",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Benutzerdefiniert",
                },


                logLevel: "Log Level (erfordert Neustart)",
                logLevels: {
                    off: "Aus",
                    error: "Fehler",
                    warn: "Warnung",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace",

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "UI-Netzwerkzugriff zulassen (Neustart erforderlich)",
                allowNetworkAccessAccessibility: "Zugriff auf die UI von anderen Geräten im Netzwerk aus zulassen",

                autoStart: "AutoStart bei Anmeldung",
                autoStartAccessibility: "Starte das GoXLR Utility, wenn sich der Benutzer anmeldet",

                showOnLaunch: "UI beim Start anzeigen",
                showOnLaunchAccessibility: "Startet die UI automatisch beim Start",

                showTray: "Taskleistensymbol anzeigen (Neustart erforderlich)",
                showTrayAccessibility: "Anzeigen des GoXLR Utility Icons in der Taskleiste",

                ttsOnButton: "TTS auf Tastendruck",
                ttsOnButtonAccessibility: "Den Status der gedrückten Taste entweder über ein Bildschirmlesegerät oder das System-TTS vorlesen",

                recoverDefaults: "Standardwerte wiederherstellen",
                recoverOptions: {
                    profiles: "Profile",
                    micProfiles: "Mikrofon Profile",
                    icons: "Icons",
                    presets: "Vorlagen"
                },

                shutdownUtility: "GoXLR Utility beenden"
            },

            aboutButton: "Über GoXLR",
            about: {
                serial: "Seriennummer",
                utilityVersion: "Utility Version",
                hardwareVersion: "Hardware Version",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Lizenzen",
            help: "Hilfe",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Profil {profileName} speichern",
            createProfile: "Neues Profil erstellen",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Neues Profil Quelle",
            newQuestion: "Möchtest du ein neues Profil aus der Standard- oder der aktuellen Konfiguration erstellen?",
            newDefaultButton: "Standard",
            newCurrentButton: "Aktuell",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Überschreiben bestätigen",
            overwriteQuestion: "Bist du sicher, dass du das Profil {activeProfile} überschreiben möchtest?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Löschen bestätigen",
            deleteQuestion: "Bist du sicher, dass du das Profil {activeProfile} löschen möchtest?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Neuen Profilnamen eingeben",
            newNamePlaceHolder: "Neuer Name",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Löschen nicht möglich",
            deleteCurrentErrorMessage: "Es ist nicht möglich, das aktive Profil zu löschen.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Profil laden",
            menuLoadProfileColours: "nur Farben laden",
            menuDeleteProfile: "Profil löschen",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profil {profileName} geladen",
            accessibilityLoadedColours: "Profil {profileName} Farben geladen",
            accessibilityCreatedProfile: "Profil {profileName} erstellt",
            accessibilitySavedProfile: "Profil {profileName} gespeichert",
            accessibilitySavedProfileAs: "Profile {profileName} als {newProfileName} gespeichert",
            accessibilityProfileDeleted: "Profile {profileName} gelöscht",
            accessibilityActiveProfile: "Aktives Profil",
            accessibilityDropMenuTitle: "{profileName} Optionen",
            accessibilityOpenProfileDirectory: "Öffne Profil Verzeichnis",
            accessibilityOpenMicProfileDirectory: "Öffne Mikrofon Profil Verzeichnis",
        },
    }
}