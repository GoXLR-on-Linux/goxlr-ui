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
/// Github: kwandegeulel
///


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Tous",
            Mic: "Microphone",
            Chat: "Discussion vocale",
            Music: "Musique",
            Game: "Jeu",
            Console: "Console",
            LineIn: "Entrée audio",
            System: "Système",
            Sample: "Sons enregistrés",
            LineOut: "Sortie audio",
            Headphones: "Casque/Écouteur",
            MicMonitor: "Écoute du micro",
            StreamMix: "Mélangeur de diffusion",
            ChatMic: "Micro de discussion",
            Sampler: "Sons/Sampler",
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
            ok: "Ok",
            yes: "Oui",
            no: "Non",
            cancel: "Annuler"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Profiles",
            presets: "Préréglages",
            samples: "Sons enregistrés",

            // Main Navigation Tabs
            microphone: "Micro",
            mixer: "Mixer",
            configuration: "Configuration",
            effects: "Effets",
            sampler: "Sons enregistrés",
            lighting: "Éclairage",
            routing: "Entrée/Sortie",
            system: "Système",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Global",
            lightingMixer: "Mixer",
            lightingEffects: "Effets",
            lightingSampler: "Sons enregistrés",
            lightingCough: "Micro désactiver",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Profils et Fichiers",
            accessibilityDeviceSection: "Réglages de l'appareil",
            accessibilityLightingSection: "Paramètres d'éclairage",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Profils de Micro"
            },

            setup: {
                button: "Configuration du Gain",
                title: "Configuration du Gain",
                type: "Type de Micro",
                gain: "Gain",

                // Microphone Types
                xlr: "XLR Microphone",
                phantom: "XLR + Phantom (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "Trop Fort",
                good: "Bien",
                gate_estimated: "Bas"
            },

            gate: {
                title: "Supression de bruit",
                threshold: "Seuil",
                attenuation: "Attenuation",
                attack: "Attack",
                release: "Relâchement",
            },

            equaliser: {
                title: "Égaliseur",
                reset: "Réinitialiser",
                enableFineTune: "Changer la fréquence",
                bass: "Basse",
                mid: "Médium",
                treble: "Aigu",
            },

            compressor: {
                title: "Compresseur",
                amount: "Quantité",
                threshold: "Seuil",
                ratio: "Ratio",
                attack: "Attack",
                release: "Relâchement",
                makeUpGain: "Gain de Compensation",
            },

            extras: {
                title: "Suppléments",
                deEsser: "De-Esser",
                bleep: "Bleep",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Entrées",
            outputs: "Sorties",
            mixAssignment: "Assignation de mixage",

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
                all: "Muet vers @:message.channels.All",
                stream: "Muet vers @:message.channels.StreamMix",
                chatMic: "Muet vers @:message.channels.ChatMic",
                headphones: "Muet vers @:message.channels.Headphones",
                lineOut: "Muet vers @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Comportement de mise en sourdine",
            muteBehaviourLabel: "Comportement de mise en sourdine pour {channel}",

            // Config for the Faders
            faders: {
                title: "Faders",
                channelTitle: "Canal",
                sourceTitle: "Source",
                sourceLabel: "Source pour {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Maintenir",
                    toggle: "Basculer",
                },

                title: "Paramètres du Bouton Sourdine",
                behaviourTitle: "Options Bouton Sourdine",
            }
        },

        effects: {
            preset: {
                title: "Préréglages",
                group: "Groupe",

                menuLoad: "Charge",
                menuRename: "Renommer",
                menuSave: "Sauvegarder",


                loadPreset: "Chargement des Préréglages",

                renamePresetTitle: "Renommer le préréglage",
                renamePresetPlaceholder: "Nouveau nom de préréglage",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "Il n'y a actuellement aucun préréglage dans la bibliothèque, enregistrez ou copiez-en pour qu'ils apparaissent ici.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Confirmer le préréglage",
                confirmMessage: "Le chargement de ce préréglage remplacera toutes les modifications non enregistrées sur cette banque d'effets, souhaitez-vous continuer ?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Confirm Preset Overwrite",
                overwriteMessage: "Le préréglage {current} existe déjà dans votre bibliothèque. Souhaitez-vous l'écraser ?",
                overwriteConfirm: "Écraser",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Ouvrir le répertoire des préréglages",
                accessibilityPresetLoaded: "Préréglage {name} chargé dans {bank}",
                accessibilityPresetSaved: "Préréglage {name} Enregistrer sous Library",
            },
            reverb: {
                title: "Reverb",
                style: "Style",

                styles: {
                    library: "Bibliothèque",
                    darkBloom: "Dark Bloom",
                    musicClub: "Club de Musique",
                    realPlate: "Real Plate",
                    chapel: "Chapel",
                    hockeyArena: "Hockey Arena"
                },

                amount: "Quantité",
                decay: "Décalé",
                earlyLevel: "Niveau",
                tailLevel: "Niveau de Reverb",
                preDelay: "Pre-Décalé",
                lowColour: "Basse",
                highColour: "Basse Haute",
                highFactor: "Facteur de haute fréquence",
                diffuse: "Dispersé",
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

                amount: "Quantité",
                feedback: "Retour d'echo",
                tempo: "Tempo",
                delayLeft: "Delay L",
                delayRight: "Delay R",
                feedbackLeft: "Feedback L",
                feedbackRight: "Feedback R",
                xfbLeftToRight: "XFB L to R",
                xfbRightToLeft: "XFB R to L",
            },

            pitch: {
                title: "Changeur de voix",

                style: "Style",
                styles: {
                    narrow: "Étroit",
                    wide: "Large"
                },

                amount: "Quantité",
                character: "Character"
            },

            gender: {
                title: "Genre",

                style: "Style",
                styles: {
                    narrow: "Étroit",
                    medium: "Moyen",
                    wide: "Large"
                },

                amount: "Quantité"
            },

            megaphone: {
                title: "Mégaphone",

                style: "Style",
                styles: {
                    megaphone: "Mégaphone",
                    radio: "Radio",
                    onThePhone: "Téléphone",
                    overdrive: "Surmultiplié",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Quantité",
                postGain: "Gain d'après"
            },

            robot: {
                title: "Robot",

                style: "Style",
                styles: {
                    robot1: "Robot 1",
                    robot2: "Robot 2",
                    robot3: "Robot 3",
                },

                lowGain: "Gain bas",
                lowFrequency: "Fréquence basse",
                lowWidth: "Basse Large",
                midGain: "Gain Moyen",
                midFrequency: "Mid Freq",
                midWidth: "Mid Width",
                highGain: "Hi Gain",
                highFrequency: "Haute fréquence",
                highWidth: "Largeur haute",
                waveform: "Forme d'onde",
                pulseWidth: "Largeur d'impulsion",
                threshold: "Seuil",
                dryMix: "Dry Mix",
            },

            hardTune: {
                title: "Autotune",

                style: "Style",
                styles: {
                    natural: "Naturel",
                    medium: "Moyen",
                    hard: "Fort"
                },

                amount: "Quantité",
                rate: "Rythem",
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
                buttonTitle: "Bouton",
                buttonLabel: "Bouton de Bank {activeBank}",
                buttons: {
                    topLeft: "En haut à gauche",
                    topRight: "En haut à droite",
                    bottomLeft: "En bas à gauche",
                    bottomRight: "En bas à droite",
                },

                functionTitle: "Fonction",
                functionLabel: "Fonction pour {activeButton} le bouton dans la banque {activeBank}",
                functions: {
                    playNext: "Lecture / Suivant",
                    playStop: "Lecture / Stop",
                    playFade: "Lecture / Fondu en sortie",
                    stopOnRelease: "Arrêt lors du relâchement",
                    fadeOnRelease: "Fondu lors du relâchement",
                    loop: "Boucle"
                },

                playOrderTitle: "Ordre de lecture",
                playOrderLabel: "Ordre de lecture pour {activeButton} le bouton dans la banque {activeBank}",
                playOrders: {
                    sequential: "Sequentiel",
                    random: "Aléatoire",
                },
            },

            samplesTitle: "Sons",
            samples: {
                samplesTitle: "Sons",
                samplesLabel: "Son pour {activeButton} le bouton dans la banque {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Ajouter un son",
                sampleSelector: {
                    parentDirectory: "Répertoire parent",
                    addButton: "Ajouter",

                    noSamples: "Il n'y a actuellement aucun son dans le dossier des son. Copiez-en quelques-uns pour qu'ils puissent être sélectionnés ici !",

                    // Used with Screen Readers
                    directories: "Dossiers",
                    samples: "Sons",
                },

                gain: "Gain",
                waveform: {
                    title: "Forme d'onde",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Forme d'onde pour {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Lancer le son",
                    stopSample: "Arrêter le son",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Début de son",
                    sampleEnd: "Fin de son",

                    sampleDeleted: "Son {sampleName} a été supprimé de {activeButton} la banque {activeBank}",
                    zoomLevel: "Niveau de zoom: {level}",
                },

                addSampleWaitTitle: "Veuillez patienter",
                addSampleAnalysing: "Veuillez patienter pendant que le son est analysé",
                addSampleProgress: "Progression: {progress}@:message.suffixes.percentage",

                errorTitle: "Erreur lors de l'ajout du son",
                errorText: "Une erreur s'est produite lors de l'ajout du son a la banque:",

                accessibilityOpenSamplesDirectory: "Ouvrir le répertoire de son",
                accessibilityAnalysing: "Veuillez patienter, analyse de sons en cours. Ce processus peut prendre quelques minutes.",
                accessibilityAdded: "Son {name} ajouté à {activeButton} la banque {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Couleur",

                activeColour: "Actif",
                inactiveColour: "Inactif",

                inactiveOption: "Couleur active atténuée",
                inactiveOptions: {
                    dimActiveColour: "Couleur active atténuée",
                    inactiveColour: "Couleur inactif",
                    dimInactiveColour: "Couleur inactif atténuée"

                },

                applyToAll: "Appliquer a tout",
            },

            global: {
                areas: {
                    title: "Zones",

                    area: "Zone",
                    areas: {
                        global: "Global",
                        accent: "Accent",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Animations",

                    mode: "Mode d'Animation",
                    modes: {
                        none: "Aucun",
                        rainbowRetro: "Rétroréglage arc-en-ciel",
                        rainbowBright: "Arc-en-ciel vif",
                        rainbowDark: "Arc-en-ciel sombre",
                        simple: "Simple",
                        ripple: "Ondulation",
                    },

                    mod1: "Modulation de dégradé 1",
                    mod2: "Modulation de dégradé 2",

                    waterfall: "Paramètres de cascade",
                    waterfallOff: "Éteint",
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
                        gradient: "Dégradé",
                        meter: "Mètre",
                    },

                    bottomColour: "Couleur basse",
                    topColour: "Couleur haute",

                    accessibilityTitle: "Paramètres du fader pour {channel}",
                },

                screen: {
                    title: "Capture d'écran",
                    backgroundColour: "Couleur de fond",
                    icons: "Icônes",
                    iconNone: "-- Éteint --",

                    optionsTitle: "Options",
                    options: {
                        showNumber: "Afficher le numéro",
                        invertDisplay: "Inverser l'affichage",
                        text: "Texte",

                        accessibilityText: "Texte à afficher sur l'écran GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Muet",
                    accessibilityTitle: "Paramètres de sourdine pour {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Boutons de préréglage",
                    presetTitle: "Préréglage"
                },

                encoders: {
                    title: "Encoders",

                    encoder: "Encoder",
                    encoders: {
                        reverb: "Reverb",
                        echo: "Echo",
                        pitch: "Hauteur",
                        gender: "Genre",
                    },

                    leftColour: "Couleur de gauche",
                    rightColour: "Couleur de droite",
                    knobColour: "Couleur du bouton rotatif"
                },

                buttons: {
                    title: "Boutons d'effet",

                    effectTitle: "Effet",
                    effect: {
                        megaphone: "Mégaphone",
                        robot: "Robot",
                        hardTune: "Autotune",
                        fx: "Effet",
                    }
                },
            },
            sampler: {
                title: "Bank",

                buttonsTitle: "Boutons",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Actif / Chargé",
                empty: "Son vide",
                inactive: "Bank Inactif",
            },

            cough: {
                title: "Cough/Bleep Buttons",

                buttonsTitle: "Buttons",
                buttons: {
                    bleep: "Bleep",
                    cough: "Cough",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Cheminement",

            input: "Entrées",
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

            output: "Sorties",
            outputs: {
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                ChatMic: "@:message.channels.ChatMic",
                Sampler: "@:message.channels.Sampler",
                LineOut: "@:message.channels.LineOut",
            }
        },

        system: {
            title: "Système",

            powerButton: "Actions d'alimentation",
            power: {
                shutdownTitle: "Actions d'arrêt",
                shutdownDescription: "Ces actions seront exécutées lorsque l'utilitaire GoXLR sera arrêté en toute sécurité.",

                sleepTitle: "Actions de mise en veille.",
                sleepDescription: "Ces actions seront exécutées lorsque votre système va entrer en mode veille.",

                wakeTitle: "Actions de réveil.",
                wakeDescription: "Ces actions seront exécutées lorsque votre système se réveille de la mise en veille.",

                settingsError: "La configuration semble avoir été modifiée manuellement. Pour éviter tout dommage, l'interface utilisateur ici ne fonctionnera pas. Pour réinitialiser complètement les actions d'arrêt, appuyez sur le bouton ci-dessous.",
                settingsReset: "Réinitialiser les actions d'arrêt.",

                power_options: {
                    reload: "Recharger les paramètres.",
                    saveProfile: "Enregistrer le profil.",
                    loadProfile: "Charger le profil complet.",
                    loadColourProfile: "Charger le profil de couleur.",
                    saveMicProfile: "Sauvegarder le profil du microphone.",
                    loadMicProfile: "Charger le profil du microphone",
                }
            },

            deviceButton: "Paramètres de l'appareil.",
            device: {
                holdDuration: "Durée du maintien du bouton de sourdine pour mettre en sourdine tout.",
                holdDurationAccessibility: "La durée en millisecondes pendant laquelle le bouton de sourdine doit être maintenu enfoncé pour mettre en sourdine tous les canaux.",

                sampleBuffer: "Tampon de pré-enregistrement du son (en secondes)",
                sampleBufferAccessibility: "La durée en secondes pendant laquelle le son enregistrera avant que le bouton ne soit pressé.",

                voiceDeafen: "Mettre en sourdine tout dans le chat vocal met également en sourdine le micro pour le chat vocal.",
                voiceDeafenAccessibility: "Lors de la mise en sourdine de tous les canaux, mettez également en sourdine le micro pour le chat vocal.",

                monitorWithFx: "Activer ou désactiver l'état de surveillance du microphone avec effets.",
                monitorWithFxAccessibility: "Active la surveillance du micro lorsque les effets sont activés.",

                resetSampleFunctionOnClear: "Reset Sample Function on Clear",
                resetSampleFunctionOnClearAccessibility: "Resets the Sample function to Start / Next when Cleared",

                lockFaders: "Verrouiller les positions des curseurs lors de la mise en sourdine générale.",
                lockFadersAccessibility: "Empêche les curseurs de descendre lorsque la mise en sourdine générale est activée.",
            },

            settingsButton: "Paramètres de l'Utilitaire",
            settings: {
                language: "Langue",
                useSystem: "Utiliser la langue du système (si disponible)",

                uiHandler: "Gestionnaire d'interface utilisateur",
                uiHandlers: {
                    browser: "Navigateur",
                    app: "Application",
                    custom: "Personnalisé"
                },


                logLevel: "Niveau de journalisation (nécessite un redémarrage)",
                logLevels: {
                    off: "Éteint",
                    error: "Erreur",
                    warn: "Avertissement",
                    info: "Information",
                    debug: "Débogage",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Autoriser l'accès réseau de l'interface utilisateur (nécessite un redémarrage)",
                allowNetworkAccessAccessibility: "Autoriser l'accès à l'interface utilisateur depuis d'autres appareils sur le réseau",

                autoStart: "Démarrage automatique à la connexion",
                autoStartAccessibility: "Démarrer l'utilitaire GoXLR lorsque l'utilisateur se connecte",

                showOnLaunch: "Afficher l'interface utilisateur au lancement",
                showOnLaunchAccessibility: "Lance automatiquement l'interface utilisateur au démarrage",

                showTray: "Afficher l'icône dans la barre d'état système (nécessite un redémarrage)",
                showTrayAccessibility: "Afficher l'icône de l'utilitaire GoXLR dans la zone de notification du système",

                ttsOnButton: "Synthèse vocale lors de l'appui sur le bouton",
                ttsOnButtonAccessibility: "Lire à voix haute l'état du bouton lorsqu'il est pressé, soit via un lecteur d'écran soit via la synthèse vocale du système",

                recoverDefaults: "Restaurer les paramètres par défaut",
                recoverOptions: {
                    profiles: "Profiles",
                    micProfiles: "Profils microphone",
                    icons: "icônes",
                    presets: "Préréglages"
                },

                shutdownUtility: "Arrêter l'utilitaire GoXLR"
            },

            aboutButton: "À propos de GoXLR",
            about: {
                serial: "Série",
                utilityVersion: "Version Utilitaire",
                hardwareVersion: "Version Matérielle",

                firmware: "Firmware",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Licences",
            help: "Aide",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Sauvegarder profil {profileName}",
            createProfile: "Crée un profil",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Nouvelle Source de Profil",
            newQuestion: "Souhaitez-vous créer un nouveau profil à partir de la configuration par défaut ou de la configuration actuelle ?",
            newDefaultButton: "Par défaut",
            newCurrentButton: "Actuelle",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Confirmation d'écrasement",
            overwriteQuestion: "Êtes-vous sûr de vouloir écraser le profil ? {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Confirmation de suppression",
            deleteQuestion: "Êtes-vous sûr de vouloir supprimer le profil ? {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Entrez le nouveau nom de profil",
            newNamePlaceHolder: "Nouveau nom de profil",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Impossible de supprimer",
            deleteCurrentErrorMessage: "Il n'est pas possible de supprimer le profil actif.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Charger le profil",
            menuLoadProfileColours: "Charger seulement les couleurs",
            menuDeleteProfile: "Supprimer le profil",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Profil {profileName} charger",
            accessibilityLoadedColours: "Profil {profileName} Couleur chargée",
            accessibilityCreatedProfile: "Profil créé {profileName}",
            accessibilitySavedProfile: "Profile {profileName} Saved",
            accessibilitySavedProfileAs: "Profil {profileName} Enregistrer sous {newProfileName}",
            accessibilityProfileDeleted: "Profil {profileName} Supprimé",
            accessibilityActiveProfile: "Profil actif",
            accessibilityDropMenuTitle: "{profileName} options",
            accessibilityOpenProfileDirectory: "Ouvrir le répertoire des profils",
            accessibilityOpenMicProfileDirectory: "Ouvrir le répertoire des profils de microphone",
        },
    }
}