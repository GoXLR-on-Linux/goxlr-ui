/*  Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This export will be directly included in the main structure, with the relevant language flag, all
    that needs to be worried about here are the messages, and any applicable language modifiers.

    Note, this file is for English (British)

    I'm being as verbose as possible with the strings, while there are a lot of common answers for things
    like buttons (Yes, No, Ok, Cancel, etc), I'm a little paranoid some languages may need more contextual
    answers, so they're all individually labelled here.

    If you're editing, or creating a new language, everything inside quotation marks ("text") is translatable,
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!
 */


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "All",
            Mic: "Mic",
            Chat: "Voice Chat",
            Music: "Music",
            Game: "Game",
            Console: "Console",
            LineIn: "Line In",
            System: "System",
            Sample: "Sample",
            LineOut: "Line Out",
            Headphones: "Headphones",
            MicMonitor: "Mic Monitor",
            StreamMix: "Stream Mix",
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
        },

        faders: {
            A: "Channel 1",
            B: "Channel 2",
            C: "Channel 3",
            D: "Channel 4"
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
            yes: "Yes",
            no: "No",
            cancel: "Cancel"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profiles",
            presets: "Presets",
            samples: "Samples",

            // Main Navigation Tabs
            microphone: "Mic",
            mixer: "Mixer",
            configuration: "Configuration",
            effects: "Effects",
            sampler: "Sampler",
            lighting: "Lighting",
            routing: "Routing",
            system: "System",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Global",
            lightingMixer: "Mixer",
            lightingEffects: "Effects",
            lightingSampler: "Sampler",
            lightingCough: "Cough",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profiles and Files",
            accessibilityDeviceSection: "Device Settings",
            accessibilityLightingSection: "Lighting Settings",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Mic Profiles"
            },

            setup: {
                button: "Mic Setup",
                title: "Mic Setup",
                type: "Mic Type",
                gain: "Gain",

                // Microphone Types
                xlr: "XLR Microphone",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Too Loud",
                good: "Good",
                gate_estimated: "Gate is Estimated"
            },

            gate: {
                title: "Gate",
                threshold: "Threshold",
                attenuation: "Attenuation",
                attack: "Attack",
                release: "Release",
            },

            equaliser: {
                title: "Equaliser",
                reset: "Reset",
                enableFineTune: "Enable Fine Tune",
                bass: "Bass",
                mid: "Mid",
                treble: "Treble",
            },

            compressor: {
                title: "Compressor",
                amount: "Amount",
                threshold: "Threshold",
                ratio: "Ratio",
                attack: "Attack",
                release: "Release",
                makeUpGain: "Make-Up Gain",
            },

            extras: {
                deEsser: "De-Esser",
                bleep: "Bleep",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Inputs",
            outputs: "Outputs",
            mixAssignment: "Mix Assignment",

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
                all: "Mute to @:message.channels.All",
                stream: "Mute to @:message.channels.StreamMix",
                chatMic: "Mute to @:message.channels.ChatMic",
                headphones: "Mute to @:message.channels.Headphones",
                lineOut: "Mute to @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Mute Behaviour",
            muteBehaviourLabel: "Mute Behaviour for {channel}",

            // Config for the Faders
            faders: {
                title: "Faders",
                channelTitle: "Channel",
                sourceTitle: "Source",
                sourceLabel: "Source for {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Hold",
                    toggle: "Toggle",
                },

                title: "Cough Button Settings",
                behaviourTitle: "Button Behaviour",
            }
        },

        effects: {
            preset: {
                title: "Preset",
                group: "Group",

                menuLoad: "Load",
                menuRename: "Rename",
                menuSave: "Save to Library",


                loadPreset: "Load Preset",

                renamePresetTitle: "Rename Preset",
                renamePresetPlaceholder: "New Preset Name",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "There are currently no presets in the library, save or copy some for them to appear here.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Confirm Preset Load",
                confirmMessage: "Loading this preset will replace any unsaved changes on this effects bank, would you like to proceed?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Confirm Preset Overwrite",
                overwriteMessage: "The preset {current} already exists in your library, would you like to overwrite?",
                overwriteConfirm: "Overwrite",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Open Presets Directory",
                accessibilityPresetLoaded: "Preset {name} loaded to {bank}",
                accessibilityPresetSaved: "Preset {name} saved to Library",
            },
            reverb: {
                title: "Reverb",
                style: "Style",

                styles: {
                    library: "Library",
                    darkBloom: "Dark Bloom",
                    musicClub: "Music Club",
                    realPlate: "Real Plate",
                    chapel: "Chapel",
                    hockeyArena: "Hockey Arena"
                },

                amount: "Amount",
                decay: "Decay",
                earlyLevel: "Early Level",
                tailLevel: "Tail Level",
                preDelay: "Predelay",
                lowColour: "Lo Colour",
                highColour: "Hi Colour",
                highFactor: "Hi Factor",
                diffuse: "Diffuse",
                modSpeed: "ModSpeed",
                modDepth: "ModDepth"
            },

            echo: {
                title: "Echo",

                style: "Style",
                styles: {
                    quarter: "Quarter",
                    eighth: "Eighth",
                    triplet: "Triplet",
                    pingPong: "Ping Pong",
                    classicSlap: "Classic Slap",
                    multiTap: "MultiTap"
                },

                amount: "Amount",
                feedback: "Feedback",
                tempo: "Tempo",
                delayLeft: "Delay L",
                delayRight: "Delay R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L to R",
                xfbRightToLeft: "XFB R to L",
            },

            pitch: {
                title: "Pitch",

                style: "Style",
                styles: {
                    narrow: "Narrow",
                    wide: "Wide"
                },

                amount: "Amount",
                character: "Character"
            },

            gender: {
                title: "Gender",

                style: "Style",
                styles: {
                    narrow: "Narrow",
                    medium: "Medium",
                    wide: "Wide"
                },

                amount: "Amount"
            },

            megaphone: {
                title: "Megaphone",

                style: "Style",
                styles: {
                    megaphone: "Megaphone",
                    radio: "Radio",
                    onThePhone: "On The Phone",
                    overdrive: "Overdrive",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Amount",
                postGain: "Post Gain"
            },

            robot: {
                title: "Robot",

                style: "Style",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
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
                waveform: "Waveform",
                pulseWidth: "Pulse Width",
                threshold: "Threshold",
                dryMix: "Dry Mix",
            },

            hardTune: {
                title: "Hard Tune",

                style: "Style",
                styles: {
                    natural: "Natural",
                    medium: "Medium",
                    hard: "Hard"
                },

                amount: "Amount",
                rate: "Rate",
                window: "Window",

                source: "Source"
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
                buttonTitle: "Button",
                buttonLabel: "Button for bank {activeBank}",
                buttons: {
                    topLeft: "Top Left",
                    topRight: "Top Right",
                    bottomLeft: "Bottom Left",
                    bottomRight: "Bottom Right",
                },

                functionTitle: "Function",
                functionLabel: "Function for {activeButton} button in bank {activeBank}",
                functions: {
                    playNext: "Play / Next",
                    playStop: "Play / Stop",
                    playFade: "Play / Fade Out",
                    stopOnRelease: "Stop on Release",
                    fadeOnRelease: "Fade on Release",
                    loop: "Loop"
                },

                playOrderTitle: "Play Order",
                playOrderLabel: "Play Order for {activeButton} button in bank {activeBank}",
                playOrders: {
                    sequential: "Sequential",
                    random: "Random",
                },
            },

            samplesTitle: "Samples",
            samples: {
                samplesTitle: "Samples",
                samplesLabel: "Sample for {activeButton} button in bank {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Add Sample",
                sampleSelector: {
                    parentDirectory: "Parent Directory",
                    addButton: "Add",

                    noSamples: "There are currently no samples in the samples folder. Copy some over so they can be selected here!",

                    // Used with Screen Readers
                    directories: "Directories",
                    samples: "Samples",
                },

                gain: "Gain",
                waveform: {
                    title: "Waveform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Waveform for {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Play Sample",
                    stopSample: "Stop Sample",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Sample Start",
                    sampleEnd: "Sample End",

                    sampleDeleted: "Sample {sampleName} has been deleted from {activeButton} button in bank {activeBank}",
                    zoomLevel: "Zoom Level: {level}",
                },

                addSampleWaitTitle: "Please Wait",
                addSampleAnalysing: "Please wait while the sample is being analysed.",
                addSampleProgress: "Progress: {progress}@:message.suffixes.percentage",

                errorTitle: "Error Adding Sample",
                errorText: "An error occurred while adding the sample to the bank:",

                accessibilityOpenSamplesDirectory: "Open Samples Directory",
                accessibilityAnalysing: "Please wait, analysing sample. This process may take a couple of minutes.",
                accessibilityAdded: "Sample {name} added to {activeButton} button in bank {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Colour",

                active_colour: "Active",
                inactive_colour: "Inactive",

                inactive_option: "Inactive Option",
                inactive_options: {
                    dim_active_colour: "Dim Active Colour",
                    inactive_colour: "Inactive Colour",
                    dim_inactive_colour: "Dim Inactive Colour"

                },

                apply_to_all: "Apply to All",
            },

            global: {
                areas: {
                    title: "Areas",

                    area: "Area",
                    areas: {
                        global: "Global",
                        accent: "Accent",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animations",

                    mode: "Animation Mode",
                    modes: {
                        none: "None",
                        rainbow_retro: "Rainbow Retro",
                        rainbow_bright: "Rainbow Bright",
                        rainbow_dark: "Rainbow Dark",
                        simple: "Simple",
                        ripple: "Ripple",
                    },

                    mod_1: "Gradient Mod 1",
                    mod_2: "Gradient Mod 2",

                    waterfall: "Waterfall Settings",
                    waterfall_off: "Off",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Fader",

                    style: "Style",
                    styles: {
                        gradient: "Gradient",
                        meter: "Meter",
                    },

                    bottom_colour: "Bottom Colour",
                    top_colour: "Top Colour",

                    accessibilityTitle: "Fader settings for {channel}",
                },

                screen: {
                    title: "Screen",
                    background_colour: "Background Colour",
                    icons: "Icons",
                    icon_none: "-- NONE --",

                    optionsTitle: "Options",
                    options: {
                        show_number: "Show Number",
                        invert_display: "Invert Display",
                        text: "Text",

                        accessibilityText: "Text to display on the GoXLR screen"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Mute",
                    accessibilityTitle: "Mute Settings for {channel}"
                }
            },

        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Save Profile {profileName}",
            createProfile: "Create Profile",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "New Profile Source",
            newQuestion: "Would you like to create a new profile from the default, or current configuration?",
            newDefaultButton: "Default",
            newCurrentButton: "Current",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Overwrite Confirmation",
            overwriteQuestion: "Are you sure you want to overwrite the profile {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Delete Confirmation",
            deleteQuestion: "Are you sure you want to delete the profile {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Enter New Profile Name",
            newNamePlaceHolder: "New Name",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Unable to Delete",
            deleteCurrentErrorMessage: "It is not possible to delete the active profile.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Load Profile",
            menuLoadProfileColours: "Load Colours Only",
            menuDeleteProfile: "Delete Profile",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profile {profileName} loaded",
            accessibilityLoadedColours: "Profile {profileName} colours loaded",
            accessibilityCreatedProfile: "Created profile {profileName}",
            accessibilitySavedProfile: "Profile {profileName} Saved",
            accessibilitySavedProfileAs: "Profile {profileName} Saved as {newProfileName}",
            accessibilityProfileDeleted: "Profile {profileName} deleted",
            accessibilityActiveProfile: "Active Profile",
            accessibilityDropMenuTitle: "{profileName} options",
            accessibilityOpenProfileDirectory: "Open Profile Directory",
            accessibilityOpenMicProfileDirectory: "Open Mic Profile Directory",
        },
    }
}