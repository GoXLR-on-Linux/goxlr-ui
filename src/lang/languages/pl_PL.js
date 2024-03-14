/*  Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This export will be directly included in the main structure, with the relevant language flag, all
    that needs to be worried about here are the messages, and any applicable language modifiers.

    Note, this file is for Polish

    I'm being as verbose as possible with the strings, while there are a lot of common answers for things
    like buttons (Yes, No, Ok, Cancel, etc), I'm a little paranoid some languages may need more contextual
    answers, so they're all individually labelled here.

    If you're editing, or creating a new language, everything inside quotation marks ("text") is translatable,
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!

    Also, feel free to leave your name as a contributor:
 */

///
/// Authors:
/// Pitermach
///


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Wszystkie",
            Mic: "Mikrofon",
            Chat: "Czat głosowy",
            Music: "Muzyka",
            Game: "Gra",
            Console: "Konsola",
            LineIn: "Wejście Liniowe",
            System: "System",
            Sample: "Sample",
            LineOut: "Wyjście Liniowe",
            Headphones: "Słuchawki",
            MicMonitor: "Odsłóch Mikrofonu",
            StreamMix: "Mix dla nadawania",
            ChatMic: "Mix dla czatu",
            Sampler: "Sampler",
        },

        faders: {
            A: "Kanał 1",
            B: "Kanał 2",
            C: "Kanał 3",
            D: "Kanał 4"
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
            ok: "OK",
            yes: "Tak",
            no: "Nie",
            cancel: "Anuluj"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profile",
            presets: "Presety",
            samples: "Sample",

            // Main Navigation Tabs
            microphone: "Mikrofon",
            mixer: "Mixer",
            configuration: "Konfiguracja",
            effects: "Efekty",
            sampler: "Sampler",
            lighting: "Oświetlenie",
            routing: "Przekierowanie",
            system: "System",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Globalne",
            lightingMixer: "Mixer",
            lightingEffects: "Efekty",
            lightingSampler: "Sampler",
            lightingCough: "Kaszel",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profile i Pliki",
            accessibilityDeviceSection: "Ustawienia Urządzenia",
            accessibilityLightingSection: "Ustawienia oświetlenia",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Profile Mikrofonu"
            },

            setup: {
                button: "Konfiguracja Mikrofonu",
                title: "Konfiguracja Mikrofonu",
                type: "Typ mikrofonu",
                gain: "Poziom",

                // Microphone Types
                xlr: "Mikrofon XLR",
                phantom: "Mikrofon XLR + Zasilanie Phantom (+{voltage}V)",
                jack: "Mikrofon na wejście 3.5mm",
            },

            waveform: {
                loud: "Za Głośno",
                good: "Dobry",
                gate_estimated: "Bramka jest Oszacowana"
            },

            gate: {
                title: "Bramka",
                threshold: "Threshold",
                attenuation: "Attenuation",
                attack: "Attack",
                release: "Release",
            },

            equaliser: {
                title: "Korektor",
                reset: "Resetuj",
                enableFineTune: "Włącz Dostrajanie",
                bass: "Niskie",
                mid: "Średnie",
                treble: "Wysokie",
            },

            compressor: {
                title: "Kompresor",
                amount: "Ilość",
                threshold: "Threshold",
                ratio: "Stopień",
                attack: "Attack",
                release: "Release",
                makeUpGain: "Make-Up",
            },

            extras: {
                title: "Extras",
                deEsser: "De-Esser",
                bleep: "Dźwięk Cenzury",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Wejścia",
            outputs: "Wyjścia",
            mixAssignment: "Wybór Mixu",

            // Submix Checkbox
            submix: "Submixy",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                all: "Wycisz Wszędzie",
                stream: "Wycisz na nadawaniu",
                chatMic: "Wycisz na Czacie",
                headphones: "Wycisz na Słuchawkach",
                lineOut: "Wycisz na Wyjściu Liniowym",
            },
            muteBehaviourTitle: "Zachowanie Wyciszenia",
            muteBehaviourLabel: "Zachowanie Wyciszenia dla Kanału",

            // Config for the Faders
            faders: {
                title: "Suwaki",
                channelTitle: "Kanał",
                sourceTitle: "Źródło",
                sourceLabel: "Źrudło dla kanału",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Trzymaj, aby Wyciszyć",
                    toggle: "Naciśnij, aby przełączyć Wyciszenie",
                },

                title: "Ustawienia przycisku Kaszel",
                behaviourTitle: "Zachowanie Przycisku",
            }
        },

        effects: {
            preset: {
                title: "Preset",
                group: "Grupa",

                menuLoad: "Wczytaj",
                menuRename: "Zmień Nazwę",
                menuSave: "Zapisz do Biblioteki",


                loadPreset: "Wczytaj Preset",

                renamePresetTitle: "Zmień Nazwę Presetu",
                renamePresetPlaceholder: "Nowa Nazwa Presetu",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "W tej chwili w bibliotece nie ma żadnych presetów, zapisz lub skopiuj jakieś presety, a wtedy pojawią się tutaj.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Potwierdź Wczytanie Presetu",
                confirmMessage: "Wczytanie tego presetu zastąpi niezapisane zmiany w tym banku efektów. Czy chcesz kontynuować?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Potwierdź nadpisanie presetu",
                overwriteMessage: "Preset {current} już istnieje w twojej bibliotece, czy chcesz go nadpisać?",
                overwriteConfirm: "Nadpisz",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Otwórz katalog Presetów",
                accessibilityPresetLoaded: "Preset {name} wczytany do banku {bank}",
                accessibilityPresetSaved: "Preset {name} zapisany w bibliotece.",
            },
            reverb: {
                title: "Pogłos",
                style: "Styl",

                styles: {
                    library: "Biblioteka",
                    darkBloom: "Ciemny Rozkwit",
                    musicClub: "Klub Muzyczny",
                    realPlate: "Stalowa Płyta",
                    chapel: "Sala",
                    hockeyArena: "Boisko Hockeyowe"
                },

                amount: "Ilość",
                decay: "Czas",
                earlyLevel: "Poziom Wczesnych",
                tailLevel: "Poziom późnych",
                preDelay: "Opóźnienie Wczesne",
                lowColour: "Kolor Niskich",
                highColour: "Kolor Wysokich",
                highFactor: "Podbicie Wysokich",
                diffuse: "Rozproszenie",
                modSpeed: "Szybkość Modulacji",
                modDepth: "Głębokość Modulacji"
            },

            echo: {
                title: "Echo",

                style: "Styl",
                styles: {
                    quarter: "Ćwiartki",
                    eighth: "Ósemki",
                    triplet: "Kropki",
                    pingPong: "Ping Pong",
                    classicSlap: "Klasyczny",
                    multiTap: "MultiTap"
                },

                amount: "Ilość",
                feedback: "Oddźwięk",
                tempo: "Tempo",
                delayLeft: "Opóźnienie L",
                delayRight: "Opóźnienie P",
                feedbackLeft: "Oddźwięk L",
                feedbackRight: "Oddźwięk P",
                xfbLeftToRight: "Mieszanie oddźwięku L Z P",
                xfbRightToLeft: "Mieszanie oddźwięku P Z L",
            },

            pitch: {
                title: "Ton",

                style: "Styl",
                styles: {
                    narrow: "Wąski",
                    wide: "Szeroki"
                },

                amount: "Ilość",
                character: "Charakter"
            },

            gender: {
                title: "Płeć",

                style: "Styl",
                styles: {
                    narrow: "Wąski",
                    medium: "Średni",
                    wide: "Szeroki"
                },

                amount: "Ilość"
            },

            megaphone: {
                title: "Megafon",

                style: "Styl",
                styles: {
                    megaphone: "Megafon",
                    radio: "Radio",
                    onThePhone: "Przez telefon",
                    overdrive: "Zniekształcony",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Ilość",
                postGain: "Poziom"
            },

            robot: {
                title: "Robot",

                style: "Styl",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Poziom Niskich",
                lowFrequency: "Częst. Niskich",
                lowWidth: "Szerokość Niskich",
                midGain: "Poziom Średnich",
                midFrequency: "Częst. Średnich",
                midWidth: "Szerokość Średnich",
                highGain: "Poziom Wysokich",
                highFrequency: "Częst. Wysokich",
                highWidth: "Szerokość Wysokich",
                waveform: "Fala",
                pulseWidth: "Szerokość Impulsu",
                threshold: "Próg",
                dryMix: "Mix Suchy",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Styl",
                styles: {
                    natural: "Naturalny",
                    medium: "Średni",
                    hard: "Ostry"
                },

                amount: "Ilość",
                rate: "Szybkość",
                window: "Okno",

                source: "Źródło"
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
                buttonTitle: "Przycisk",
                buttonLabel: "Przycisk dla Banku {activeBank}",
                buttons: {
                    topLeft: "Lewy Górny",
                    topRight: "Prawy Górny",
                    bottomLeft: "Lewy Dolny",
                    bottomRight: "Prawy Dolny",
                },

                functionTitle: "Funkcja",
                functionLabel: "{activeButton} Przycisk w Banku {activeBank} - Funkcja",
                functions: {
                    playNext: "Odtwórz/Następny",
                    playStop: "Odtwórz/Zatrzymaj",
                    playFade: "Odtwórz/Wycisz",
                    stopOnRelease: "Zatrzymaj po puszczeniu",
                    fadeOnRelease: "Wycisz po puszczeniu",
                    loop: "Powtarzaj"
                },

                playOrderTitle: "Kolejność Odtwarzania",
                playOrderLabel: "{activeButton} Przycisk w Banku {activeBank} - Kolejność Odtwarzania",
                playOrders: {
                    sequential: "Sekwencyjna",
                    random: "Losowa",
                },
            },

            samplesTitle: "Sample",
            samples: {
                samplesTitle: "Sample",
                samplesLabel: "{activeButton} Przycisk w Banku {activeBank} - Sample",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Dodaj Sampel",
                sampleSelector: {
                    parentDirectory: "Katalog Wyżej",
                    addButton: "Dodaj",

                    noSamples: "W katalogu Samples nie ma żadnych sampli. Skopiuj jakieś pliki, aby je tutaj wybrać!",

                    // Used with Screen Readers
                    directories: "Katalogi",
                    samples: "Sample",
                },

                gain: "Poziom",
                waveform: {
                    title: "Fala",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Obraz fali dla {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Odtwórz",
                    stopSample: "Zatrzymaj",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Początek Sampla",
                    sampleEnd: "Koniec Sampla",

                    sampleDeleted: "Sampel {sampleName} usunięty z {activeButton} przycisku w Banku {activeBank}",
                    zoomLevel: "Powiększenie: {level}",
                },

                addSampleWaitTitle: "Proszę Czekać",
                addSampleAnalysing: "Czekaj, plik jest analizowany.",
                addSampleProgress: "Postęp: {progress}@:message.suffixes.percentage",

                errorTitle: "Błąd Dodawania Sampla",
                errorText: "Wystąpił błąd podczas dodawania sampla do banku:",

                accessibilityOpenSamplesDirectory: "Otwórz Katalog Sampli",
                accessibilityAnalysing: "Proszę czekać, plik jest analizowany. Może to potrwać kilka minut.",
                accessibilityAdded: "Sampel {name} dodany na {activeButton} przycisk w banku {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Kolor",

                activeColour: "Aktywny",
                inactiveColour: "Nieaktywny",

                inactiveOption: "Nieaktywna Opcja",
                inactiveOptions: {
                    dimActiveColour: "Przyciemnij Aktywny Kolor",
                    inactiveColour: "Nieaktywny Kolor",
                    dimInactiveColour: "Przyciemnij Aktywny Kolor"

                },

                applyToAll: "Zastosuj dla Wszystkich",
            },

            global: {
                areas: {
                    title: "Obszary",

                    area: "Obszar",
                    areas: {
                        global: "Globalne",
                        accent: "Akcent",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animacje",

                    mode: "Tryb Animacji",
                    modes: {
                        none: "Brak",
                        rainbowRetro: "Tęcza Retro",
                        rainbowBright: "Tęcza Jasna",
                        rainbowDark: "Tęcza Ciemna",
                        simple: "Prosta",
                        ripple: "Rozprysk",
                    },

                    mod1: "Gradient Mod 1",
                    mod2: "Gradient Mod 2",

                    waterfall: "Ustawienia Fali",
                    waterfallOff: "Wyłączona",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Suwak",

                    style: "Styl",
                    styles: {
                        gradient: "Gradient",
                        meter: "Miernik",
                    },

                    bottomColour: "Kolor dołu",
                    topColour: "Kolor Góry",

                    accessibilityTitle: "Ustawienia suwaka kanału {channel}",
                },

                screen: {
                    title: "Ekran",
                    backgroundColour: "Kolor Tła",
                    icons: "Ikony",
                    iconNone: "-- BRAK --",

                    optionsTitle: "Opcje",
                    options: {
                        showNumber: "Pokazuj Liczbę",
                        invertDisplay: "Odwróć Ekran",
                        text: "Tekst",

                        accessibilityText: "Tekst do wyświetlenia na ekranie GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Wyciszenie",
                    accessibilityTitle: "Ustawienia Wyciszenia kanału {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Przyciski Presetów",
                    presetTitle: "Preset"
                },

                encoders: {
                    title: "Pokrętła",

                    encoder: "Pokrętło",
                    encoders: {
                        reverb: "Pogłos",
                        echo: "Echo",
                        pitch: "Ton",
                        gender: "Płeć",
                    },

                    leftColour: "Lewy Kolor",
                    rightColour: "Prawy Kolor",
                    knobColour: "Kolor Pokrętła"
                },

                buttons: {
                    title: "Przyciski Efektów",

                    effectTitle: "Efekt",
                    effect: {
                        megaphone: "Megafon",
                        robot: "Robot",
                        hardTune: "Hardtune",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "Bank",

                buttonsTitle: "Przyciski",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Aktywny / Wczytany",
                empty: "Pusty",
                inactive: "Nieaktywny Bank",
            },

            cough: {
                title: "Przyciski Kaszel / Cenzura",

                buttonsTitle: "Przyciski",
                buttons: {
                    bleep: "Cenzura",
                    cough: "Kaszel",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Przekierowanie",

            input: "Wejścia",
            inputs: {
                Microphone: "@:message.channels.Mic",
                Chat: "Czat",
                Music: "@:message.channels.Music",
                Game: "@:message.channels.Game",
                Console: "@:message.channels.Console",
                LineIn: "@:message.channels.LineIn",
                System: "@:message.channels.System",
                Samples: "@:message.channels.Sample",
            },

            output: "Wyjścia",
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

            powerButton: "Akcje Zasilania",
            power: {
                shutdownTitle: "Akcje Zamekania",
                shutdownDescription: "Te akcje zostaną wykonane kiedy GoXLR Utility zostanie bezpiecznie zamknięte",

                sleepTitle: "Akcje Usypiania",
                sleepDescription: "Te akcje zostaną wykonane kiedy twój system przechodzi w tryb uśpienia",

                wakeTitle: "Akcje Obudzenia",
                wakeDescription: "Te akcje zostaną wykonane kiedy twój system obudzi się z uśpienia",

                settingsError: "Wygląda na to, że Konfiguracja została ręcznie zmodefikowana. Aby zapobiec nieoczekiwanym zachowaniom, ta sekcja została wyłączona. Jeśli chcesz zresetować ustawienia Akcji Zasilania, naciśnij przycisk poniżej.",
                settingsReset: "Resetuj Akcje Zasilania",

                power_options: {
                    reload: "Przeładuj Ustawienia",
                    saveProfile: "Zapisz Profil",
                    loadProfile: "Wczytaj Cały Profil",
                    loadColourProfile: "Wczytaj Kolory z Profilu",
                    saveMicProfile: "Zapisz Profil Mikrofonu",
                    loadMicProfile: "Wczytaj Profil Mikrofonu",
                }
            },

            deviceButton: "Ustawienia Urządzenia",
            device: {
                holdDuration: "Czas przytrzymania, aby wyciszyć wszędzie",
                holdDurationAccessibility: "Czas w milisekundach, przez który musi być przytrzymany przycisk wyciszenia, aby wyciszyć wszystkie kanały",

                sampleBuffer: "Bufor pre-nagrywania Samplera (w sekundach)",
                sampleBufferAccessibility: "Czas w sekundach, który nagra sampler przed naciśnięciem przycisku",

                voiceDeafen: "Wyciszenie Czatu wycisza również Mikrofon",
                voiceDeafenAccessibility: "Kiedy wyciszasz wszystkie kanały, wycisz również mikrofon dla Mixu Czat",

                monitorWithFx: "Przełącz odsłuch Mikrofonu z efektami",
                monitorWithFxAccessibility: "Włącza odsłuch mikrofonu kiedy efekty są włączone",

                lockFaders: "Zablokuj Pozycje Suwaków kiedy Wyciszasz Wszędzie",
                lockFadersAccessibility: "Nie przesuwa suwaków na dół kiedy opcja Wyciszenia Wszędzie jest aktywna",
            },

            settingsButton: "Ustawienia GoXLR Utility",
            settings: {
                uiHandler: "Program obsługujący Interfejs",
                uiHandlers: {
                    browser: "Przeglądarka",
                    app: "Aplikacja",
                    custom: "Własny"
                },


                logLevel: "Poziom Logowania (wymaga restartu)",
                logLevels: {
                    off: "Wyłączone",
                    error: "Error (Błędy)",
                    warn: "Warn (Uwagi)",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Zezwól na dostęp do interfejsu po sieci (wymaga restartu)",
                allowNetworkAccessAccessibility: "Pozwól, żeby intefejs był dostępny dla innych urządzeń w sieci",

                autoStart: "Uruchom po Zalogowaniu",
                autoStartAccessibility: "Uruchom GoXLR Utility po zalogowaniu użytkownika",

                showOnLaunch: "Pokaż Interfejs po Uruchomieniu",
                showOnLaunchAccessibility: "Automatycznie otwiera interfejs po starcie aplikacji",

                showTray: "Pokaż ikonę w Zasobniku (wymaga restartu)",
                showTrayAccessibility: "Pokaż ikonę GoXLR Utility w zasobniku systemowym",

                ttsOnButton: "Czytaj Naciśnięte Przyciski",
                ttsOnButtonAccessibility: "Czytaj stan naciśniętych przycisków na głos, używając czytnika ekranu lub systemowego głosu",

                recoverDefaults: "Przywróć Domyślne",
                recoverOptions: {
                    profiles: "Profile",
                    micProfiles: "Profile Mikrofonu",
                    icons: "Icony",
                    presets: "Presety"
                },

                shutdownUtility: "Zamknij GoXLR Utility"
            },

            aboutButton: "O GoXLR",
            about: {
                serial: "Numer Seryjny",
                utilityVersion: "Wersja GoXLR Utility",
                hardwareVersion: "Wersja Sprzętu",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licencje",
            help: "Pomoc",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Zapisz Profil {profileName}",
            createProfile: "Utwórz Profil",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Źródło Nowego Profilu",
            newQuestion: "Czy chcesz stworzyć nowy profil na bazie bierzących, czy domyślnych ustawień?",
            newDefaultButton: "Domyślne",
            newCurrentButton: "Bieżące",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Potwierdź Nadpisanie",
            overwriteQuestion: "Czy na pewno chcesz nadpisać profil {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Potwierdź Usunięcie",
            deleteQuestion: "Czy na pewno chcesz usunąć profil {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Podaj Nazwę Nowego Profilu",
            newNamePlaceHolder: "Nowa Nazwa",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Nie Można Usunąć",
            deleteCurrentErrorMessage: "Usunięcie aktywnego profilu jest nie ożliwe.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Wczytaj Profil",
            menuLoadProfileColours: "Wczytaj Tylko Kolory",
            menuDeleteProfile: "Usuń Profil",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profil {profileName} wczytany",
            accessibilityLoadedColours: "Kolory z profilu {profileName} wczytane",
            accessibilityCreatedProfile: "Profil {profileName} utworzony",
            accessibilitySavedProfile: "Profil {profileName} zapisany",
            accessibilitySavedProfileAs: "Profil {profileName} zapisany jako {newProfileName}",
            accessibilityProfileDeleted: "Profil {profileName} usunięty",
            accessibilityActiveProfile: "Aktywny Profil",
            accessibilityDropMenuTitle: "Opcje dla {profileName}",
            accessibilityOpenProfileDirectory: "Otwórz Katalog Profili",
            accessibilityOpenMicProfileDirectory: "Otwórz Katalog Profili Mikrofonu",
        },
    }
}