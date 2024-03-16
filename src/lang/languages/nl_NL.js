/*  Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This export will be directly included in the main structure, with the relevant language flag, all
    that needs to be worried about here are the messages, and any applicable language modifiers.

    Note, this file is for English (British)

    I'm being as verbose as possible with the strings, while there are a lot of common answers for things
    like buttons (Yes, No, Ok, Cancel, etc), I'm a little paranoid some languages may need more contextual
    answers, so they're all individually labelled here.

    If you're editing, or creating a new language, everything inside quotation marks ("text") is translatable,
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!

    Also, feel free to leave your name as a contributor:
 */

///
/// Authors:
/// Tyfcho
///


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Alle",
            Mic: "Microfoon",
            Chat: "Gesprekken",
            Music: "Muziek",
            Game: "Game",
            Console: "Console",
            LineIn: "Lijn ingang",
            System: "Systeem",
            Sample: "Samples",
            LineOut: "Lijn uitgang",
            Headphones: "Koptelefoon",
            MicMonitor: "Mic Monitor",
            StreamMix: "Stream Mix",
            ChatMic: "Gesprek Mic",
            Sampler: "Sampler",
        },

        faders: {
            A: "Kanaal 1",
            B: "Kanaal 2",
            C: "Kanaal 3",
            D: "Kanaal 4"
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
            yes: "Ja",
            no: "Nee",
            cancel: "Annuleren"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profielen",
            presets: "Presets",
            samples: "Samples",

            // Main Navigation Tabs
            microphone: "Mic",
            mixer: "Mixer",
            configuration: "Configuratie",
            effects: "Effecten",
            sampler: "Sampler",
            lighting: "Verlichting",
            routing: "Routing",
            system: "Systeem",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Globaal",
            lightingMixer: "Mixer",
            lightingEffects: "Effecten",
            lightingSampler: "Sampler",
            lightingCough: "Hoesten",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profielen en bestanden",
            accessibilityDeviceSection: "Apparaatinstellingen",
            accessibilityLightingSection: "Verlichting instellingen",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Mic Profielen"
            },

            setup: {
                button: "Mic Instellen",
                title: "Mic Instellen",
                type: "Mic Type",
                gain: "Gain",

                // Microphone Types
                xlr: "XLR Microfoon",
                phantom: "XLR + Fantoom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Te luid",
                good: "Goed",
                gate_estimated: "Gate is geschat"
            },

            gate: {
                title: "Gate",
                threshold: "Drempelwaarde",
                attenuation: "Attenuatie",
                attack: "Opkomend",
                release: "Neerkomend",
            },

            equaliser: {
                title: "Equaliser",
                reset: "Reset",
                enableFineTune: "Inschakelen fijnafstelling",
                bass: "Bass",
                mid: "Mid",
                treble: "Treble",
            },

            compressor: {
                title: "Compressor",
                amount: "Hoeveelheid",
                threshold: "Drempelwaarde",
                ratio: "Ratio",
                attack: "Opkomend",
                release: "Neerkomend",
                makeUpGain: "Make-Up Gain",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Bleep",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Inputs",
            outputs: "Outputs",
            mixAssignment: "Mix Toewijzing",

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
                all: "Demp naar @:message.channels.All",
                stream: "Demp naar @:message.channels.StreamMix",
                chatMic: "Demp naar @:message.channels.ChatMic",
                headphones: "Demp naar @:message.channels.Headphones",
                lineOut: "Demp naar @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Demping gedrag",
            muteBehaviourLabel: "Demping gedrag voor {channel}",

            // Config for the Faders
            faders: {
                title: "Faders",
                channelTitle: "Kanaal",
                sourceTitle: "Bron",
                sourceLabel: "Bron voor {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Vasthouden",
                    toggle: "Schakelen",
                },

                title: "Hoest knop instellingen",
                behaviourTitle: "Knop gedrag",
            }
        },

        effects: {
            preset: {
                title: "Preset",
                group: "Groep",

                menuLoad: "Laad",
                menuRename: "Naam wijzingen",
                menuSave: "Opslaan in bibliotheek",


                loadPreset: "Laad Preset",

                renamePresetTitle: "Wijzig naam van Preset",
                renamePresetPlaceholder: "Nieuwe Preset naam",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "Op het moment zitten er geen presets in je bibliotheek, maak er een aan of kopieer er een. Ze zullen dan hier verschijnen",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Bevestig het laden van de preset",
                confirmMessage: "Het laden van de preset slaat je huidige wijzingen niet op, wil je doorgaan?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Bevestig Preset overschrijving",
                overwriteMessage: "De preset {current} bestaat al in je bibliotheek, wil je deze overschrijven?",
                overwriteConfirm: "Overschrijven",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Open Presets bibliotheek",
                accessibilityPresetLoaded: "Preset {name} geladen op {bank}",
                accessibilityPresetSaved: "Preset {name} opgeslagen in bibliotheek",
            },
            reverb: {
                title: "Reverb",
                style: "Stijl",

                styles: {
                    library: "Bibliotheek",
                    darkBloom: "Donkere bloei",
                    musicClub: "Discotheek",
                    realPlate: "Plaatwerk",
                    chapel: "Kapel",
                    hockeyArena: "Sporthal"
                },

                amount: "Hoeveelheid",
                decay: "Verval",
                earlyLevel: "Vroeg niveau",
                tailLevel: "Opvolgend niveau",
                preDelay: "Voorvertraging",
                lowColour: "Lage Kleur",
                highColour: "Hoge Kleur",
                highFactor: "Hoge Factor",
                diffuse: "Diffuus",
                modSpeed: "ModSnelheid",
                modDepth: "ModDiepte"
            },

            echo: {
                title: "Echo",

                style: "Stijl",
                styles: {
                    quarter: "Kwart",
                    eighth: "Achtste",
                    triplet: "Driedubbel",
                    pingPong: "Ping Pong",
                    classicSlap: "Klassiek",
                    multiTap: "MultiTap"
                },

                amount: "Hoeveelheid",
                feedback: "Feedback",
                tempo: "Tempo",
                delayLeft: "Vertraging L",
                delayRight: "Vertraging R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L to R",
                xfbRightToLeft: "XFB R to L",
            },

            pitch: {
                title: "Toonhoogte",

                style: "Stijl",
                styles: {
                    narrow: "Strak",
                    wide: "Los"
                },

                amount: "Hoeveelheid",
                character: "Karakter"
            },

            gender: {
                title: "Geslacht",

                style: "Stijl",
                styles: {
                    narrow: "Strak",
                    medium: "Medium",
                    wide: "Los"
                },

                amount: "Hoeveelheid"
            },

            megaphone: {
                title: "Megafoon",

                style: "Stijl",
                styles: {
                    megaphone: "Megafoon",
                    radio: "Radio",
                    onThePhone: "Telefoongesprek",
                    overdrive: "Opgevoerd",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Hoeveelheid",
                postGain: "Post Gain"
            },

            robot: {
                title: "Robot",

                style: "Stijl",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Lage Gain",
                lowFrequency: "Lage Freq",
                lowWidth: "Lage Breedte",
                midGain: "Mid Gain",
                midFrequency: "Mid Freq",
                midWidth: "Mid Breedte",
                highGain: "Hoge Gain",
                highFrequency: "Hoge Freq",
                highWidth: "Hoge Breedte",
                waveform: "Waveform",
                pulseWidth: "Puls Breedte",
                threshold: "Drempelwaarde",
                dryMix: "Droge Mix",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Stijl",
                styles: {
                    natural: "Natuurlijk",
                    medium: "Medium",
                    hard: "Hard"
                },

                amount: "Hoeveelheid",
                rate: "Waarde",
                window: "Window",

                source: "Bron"
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
                buttonTitle: "Knop",
                buttonLabel: "Knop voor bank {activeBank}",
                buttons: {
                    topLeft: "Linksboven",
                    topRight: "Rechtsboven",
                    bottomLeft: "Linksonder",
                    bottomRight: "Rechtsonder",
                },

                functionTitle: "Functie",
                functionLabel: "Functie voor knop {activeButton} in bank {activeBank}",
                functions: {
                    playNext: "Afspelen / Volgende",
                    playStop: "Afspelen / Stop",
                    playFade: "Afspelen / Fade Out",
                    stopOnRelease: "Stop bij loslaten",
                    fadeOnRelease: "Fade bij loslaten",
                    loop: "Loop"
                },

                playOrderTitle: "Speelvolgorde",
                playOrderLabel: "Speelvolgorde voor knop {activeButton} in bank {activeBank}",
                playOrders: {
                    sequential: "Sequentieel",
                    random: "Willekeurig",
                },
            },

            samplesTitle: "Samples",
            samples: {
                samplesTitle: "Samples",
                samplesLabel: "Sample voor knop {activeButton} in bank {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Voeg Sample toe",
                sampleSelector: {
                    parentDirectory: "Beginfolder",
                    addButton: "Toevoegen",

                    noSamples: "Momenteel heb je geen samples, maak samples of importeer ze en ze zullen hier verschijnen.",

                    // Used with Screen Readers
                    directories: "Mappen",
                    samples: "Samples",
                },

                gain: "Gain",
                waveform: {
                    title: "Waveform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Waveform voor {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Sample afspelen",
                    stopSample: "Stop Sample",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Sample Start",
                    sampleEnd: "Sample Einde",

                    sampleDeleted: "Sample {sampleName} is verwijderd van knop {activeButton} in bank {activeBank}",
                    zoomLevel: "Zoom Level: {level}",
                },

                addSampleWaitTitle: "Wacht",
                addSampleAnalysing: "Wacht tot de sample geanalyseerd is.",
                addSampleProgress: "Progressie: {progress}@:message.suffixes.percentage",

                errorTitle: "Fout bij het toevoegen van de sample",
                errorText: "Fout bij het toevoegen van de sample:",

                accessibilityOpenSamplesDirectory: "Open Samples map",
                accessibilityAnalysing: "Sample aan het analyseren, dit kan een paar minuten duren.",
                accessibilityAdded: "Sample {name} toegevoegd aan knop {activeButton} in bank {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Kleur",

                activeColour: "Actief",
                inactiveColour: "Inactief",

                inactiveOption: "Inactieve Optie",
                inactiveOptions: {
                    dimActiveColour: "Dim actieve kleur",
                    inactiveColour: "Inactieve kleur",
                    dimInactiveColour: "Dim inactieve kleur"

                },

                applyToAll: "Pas toe op allen",
            },

            global: {
                areas: {
                    title: "Gebieden",

                    area: "Gebied",
                    areas: {
                        global: "Globaal",
                        accent: "Accent",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animaties",

                    mode: "Animatie Mode",
                    modes: {
                        none: "None",
                        rainbowRetro: "Regenboog Retro",
                        rainbowBright: "Regenboog Bright",
                        rainbowDark: "Regenboog Dark",
                        simple: "Simpel",
                        ripple: "Golvend",
                    },

                    mod1: "Overloop Mod 1",
                    mod2: "Overloop Mod 2",

                    waterfall: "Waterval instellingen",
                    waterfallOff: "Uit",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Fader",

                    style: "Stijl",
                    styles: {
                        gradient: "Overloop",
                        meter: "Meter",
                    },

                    bottomColour: "Onderste kleur",
                    topColour: "Bovenste kleur",

                    accessibilityTitle: "Fader instellingen voor {channel}",
                },

                screen: {
                    title: "Scherm",
                    backgroundColour: "Achtergrondkleur",
                    icons: "Iconen",
                    iconNone: "-- GEEN --",

                    optionsTitle: "Opties",
                    options: {
                        showNumber: "Toon nummer",
                        invertDisplay: "Scherm omkeren",
                        text: "Tekst",

                        accessibilityText: "De tekst wat op je GoXLR Scherm komt te staan"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Dempen",
                    accessibilityTitle: "Dempinstellingen voor {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Preset Knoppen",
                    presetTitle: "Preset"
                },

                encoders: {
                    title: "Encoders",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverb",
                        echo: "Echo",
                        pitch: "Toonhoogte",
                        gender: "Geslacht",
                    },

                    leftColour: "Linker kleur",
                    rightColour: "Rechter kleur",
                    knobColour: "Draaiknop kleur"
                },

                buttons: {
                    title: "Effect knoppen",

                    effectTitle: "Effecten",
                    effect: {
                        megaphone: "Megafoon",
                        robot: "Robot",
                        hardTune: "Hardtune",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "Bank",

                buttonsTitle: "Buttons",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Actief / Ingeladen",
                empty: "Leeg",
                inactive: "Inactieve Bank",
            },

            cough: {
                title: "Hoest / Bleep knoppen",

                buttonsTitle: "Knoppen",
                buttons: {
                    bleep: "Bleep",
                    cough: "Hoest",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Routing",

            input: "Inputs",
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

            output: "Outputs",
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

            powerButton: "Stroom acties",
            power: {
                shutdownTitle: "Afsluit acties",
                shutdownDescription: "Deze acties worden uitgevoerd wanneer de GoXLR wordt uitgeschakeld",

                sleepTitle: "Slaap acties",
                sleepDescription: "Deze acties worden uitgevoerd wanneer de GoXLR in slaapstand wordt gezet.",

                wakeTitle: "Wakker acties",
                wakeDescription: "Deze acties worden uitgevoerd wanneer de GoXLR wakker wordt gemaakt.",

                settingsError: "Het lijkt erop dat de configuratie met de hand is aangepast, om ervoor te zorgen dat er geen schade wordt toegebracht, zal de UI niet meer werken. Om de acties volledig te resetten, druk je op de resetknop hieronder.",
                settingsReset: "Reset Afsluit acties",

                power_options: {
                    reload: "Herlaad instellingen",
                    saveProfile: "Profiel opslaan",
                    loadProfile: "Laad volledig profiel",
                    loadColourProfile: "Laad kleurenprofiel",
                    saveMicProfile: "Sla Mic profiel op",
                    loadMicProfile: "Laad Mic profiel",
                }
            },

            deviceButton: "Apparaatinstelligen",
            device: {
                holdDuration: "Dempknop ingedrukt houden om alles te dempen",
                holdDurationAccessibility: "De duur hoelang de dempknop ingedrukt moet blijven om alles te dempen.",

                sampleBuffer: "Sampler Pre-Opname Buffer (in seconden)",
                sampleBufferAccessibility: "De duur van de buffer voordat de sampler gaat opnemen.",

                voiceDeafen: "Gesprekskanaal dempt ook gespreksmicrofoon",
                voiceDeafenAccessibility: "Wanneer je alle kanalen dempt, wordt ook de microfoon gedempt.",

                monitorWithFx: "Schakel Mic Monitoring in wanneer FX wordt ingedrukt",
                monitorWithFxAccessibility: "Schakelt Mic Monitoring in wanneer de FX knop wordt ingedrukt.",

                lockFaders: "Blokkeer fader posities bij dempen",
                lockFadersAccessibility: "Zorgt ervoor dat de faders niet meer bewegen terwijl het kanaal gedempt is",
            },

            settingsButton: "Utility Instellingen",
            settings: {
                language: "Language",
                useSystem: "Use System Language (if available)",

                uiHandler: "UI Handler",
                uiHandlers: {
                    browser: "Browser",
                    app: "App",
                    custom: "Custom"
                },


                logLevel: "Log Level (requires restart)",
                logLevels: {
                    off: "Uit",
                    error: "Error",
                    warn: "Waarschuwingen",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Sta netwerkbesturing toe (Vereist een herstart)",
                allowNetworkAccessAccessibility: "Geef toestemming dat dit programma door andere apparaten in het netwerk geopend kan worden",

                autoStart: "AutoStart bij Login",
                autoStartAccessibility: "Start de GoXLR Utility wanneer de gebruiker inlogt",

                showOnLaunch: "Toon UI bij opstarten",
                showOnLaunchAccessibility: "Laat de UI automatisch zien bij opstarten",

                showTray: "Toon taakbalk icoon (Vereist een herstart)",
                showTrayAccessibility: "Toon de Utility in je taakbalk (bij het pijltje omhoog)",

                ttsOnButton: "Dicteer knopfunctie bij indrukken",
                ttsOnButtonAccessibility: "Wanneer een knop ingedrukt wordt, wordt de functie gedicteerd",

                recoverDefaults: "Haal standaard waardes op",
                recoverOptions: {
                    profiles: "Profielen",
                    micProfiles: "Mic Profielen",
                    icons: "Iconen",
                    presets: "Presets"
                },

                shutdownUtility: "Schakel GoXLR Utility uit"
            },

            aboutButton: "Over GoXLR",
            about: {
                serial: "Serienummer",
                utilityVersion: "Utility Versie",
                hardwareVersion: "Hardware Versie",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licenties",
            help: "Help",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Profiel {profileName} opslaan",
            createProfile: "Maak profiel aan",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Nieuwe profielbron",
            newQuestion: "Wil je de standaardconfiguratie als sjabloom gebruiken of je huidige profiel?",
            newDefaultButton: "Standaard",
            newCurrentButton: "Huidig",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Overschrijven bevestigen",
            overwriteQuestion: "Weet je zeker dat je {activeProfile} wilt overschrijven?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Bevestig verwijderen",
            deleteQuestion: "Weet je zeker dat je {profileName} wilt verwijderen?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Voer profielnaam in",
            newNamePlaceHolder: "Nieuwe Naam",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Verwijderen niet mogelijk",
            deleteCurrentErrorMessage: "Het is niet mogelijk om je huidige profiel te verwijderen.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Laad profiel",
            menuLoadProfileColours: "Laad enkel de kleuren",
            menuDeleteProfile: "Verwijder",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profiel {profileName} ingeladen",
            accessibilityLoadedColours: "Profiel {profileName} kleuren ingeladen",
            accessibilityCreatedProfile: "Profiel {profileName} aangemaakt",
            accessibilitySavedProfile: "Profiel {profileName} opgeslagen",
            accessibilitySavedProfileAs: "Profiel {profileName} opgeslagen als {newProfileName}",
            accessibilityProfileDeleted: "Profiel {profileName} verwijderd",
            accessibilityActiveProfile: "Huidig profiel",
            accessibilityDropMenuTitle: "{profileName} opties",
            accessibilityOpenProfileDirectory: "Open bestandsmap",
            accessibilityOpenMicProfileDirectory: "Open bestandsmap",
        },
    }
}