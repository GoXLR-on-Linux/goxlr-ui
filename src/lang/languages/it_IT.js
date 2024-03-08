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

                newPresetTitle: "Rinomina Preset",
                newPresetPlaceholder: "Nome Nuovo Preset",
                newPresetOk: "@:message.modalButtons.ok",
                newPresetCancel: "@:message.modalButtons.cancel",

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