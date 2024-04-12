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
/// FrostyCoolSlug
///


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "Все",
            Mic: "Микрофон",
            Chat: "Voice Chat",
            Music: "Music",
            Game: "Game",
            Console: "Console",
            LineIn: "Line In",
            System: "System",
            Sample: "Samples",
            LineOut: "Line Out",
            Headphones: "Наушники",
            MicMonitor: "Мониторинг",
            StreamMix: "Stream Mix",
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "Канал 1",
            B: "Канал 2",
            C: "Канал 3",
            D: "Канал 4"
        },

        suffixes: {
            decibels: "дБ",
            percentage: "%",
            milliseconds: "мс",
            hertz: "Гц",
            kilohertz: "КГц",
            ratio: ":{value}",
            beatsPerMinute: "BPM",
        },

        modalButtons: {
            ok: "Ок",
            yes: "Да",
            no: "Нет",
            cancel: "Закрыть"
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "Профили",
            presets: "Пресеты",
            samples: "Сэмплы",

            // Main Navigation Tabs
            microphone: "Микрофон",
            mixer: "Микшер",
            configuration: "Конфигурация",
            effects: "Эффекты",
            sampler: "Сэмплер",
            lighting: "Подсветка",
            routing: "Маршрутизация",
            system: "Система",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "Глобальная",
            lightingMixer: "Микшер",
            lightingEffects: "Эффекты",
            lightingSampler: "Сэмплер",
            lightingCough: "Cough",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "Профили и Файлы",
            accessibilityDeviceSection: "Настройки Устройства",
            accessibilityLightingSection: "Настройки Подсветки",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "Профили Микрофона"
            },

            setup: {
                button: "Настройка",
                title: "Настройка Микрофона",
                type: "Тип Микрофона",
                gain: "Усиление",

                // Microphone Types
                xlr: "XLR Микрофон",
                phantom: "XLR + Фантомное (+{voltage}V)",
                jack: "3.5мм",
            },

            waveform: {
                loud: "Слишком громко",
                good: "Хорошо",
                gate_estimated: "Положение порога приблизительно"
            },

            gate: {
                title: "Гейт",
                threshold: "Порог",
                attenuation: "Приглушение",
                attack: "Атака",
                release: "Восстановление",
            },

            equaliser: {
                title: "Эквалайзер",
                reset: "Сброс",
                enableFineTune: "Тонкая Настройка",
                bass: "Басс",
                mid: "Середина",
                treble: "Верхние",
            },

            compressor: {
                title: "Компрессор",
                amount: "Уровень",
                threshold: "Порог",
                ratio: "Соотношение",
                attack: "Атака",
                release: "Восстановление",
                makeUpGain: "Усиление после",
            },

            extras: {
                title: "Дополнительно",
                deEsser: "Де-эссер",
                bleep: "БИИП",
            }
        },

        mixer: {
            // Box Headers
            inputs: "Вводы",
            outputs: "Выводы",
            mixAssignment: "Назначение Микса",

            // Submix Checkbox
            submix: "Подмикс",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                all: "Заглушить для Всего",
                stream: "Заглушить для @:message.channels.StreamMix",
                chatMic: "Заглушить для @:message.channels.ChatMic",
                headphones: "Заглушить для @:message.channels.Headphones",
                lineOut: "Заглушить для @:message.channels.LineOut",
            },
            muteBehaviourTitle: "Поведение Заглушения",
            muteBehaviourLabel: "Поведение Заглушения для {channel}",

            // Config for the Faders
            faders: {
                title: "Фейдер",
                channelTitle: "Канал",
                sourceTitle: "Источник",
                sourceLabel: "Источник для {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "Удержание",
                    toggle: "Переключение",
                },

                title: "Настройки кнопки Cough",
                behaviourTitle: "Поведение кнопки",
            }
        },

        effects: {
            preset: {
                title: "Пресет",
                group: "Группа",

                menuLoad: "Загрузить",
                menuRename: "Переименовать",
                menuSave: "Сохранить в Библиотеку",


                loadPreset: "Загрузить пресет",

                renamePresetTitle: "Переименовать Пресет",
                renamePresetPlaceholder: "Название нового Пресета",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "В Библиотеке пока нет Пресетов, сохраните или скопируйте, чтобы они появились здесь.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "Подтвердить загрузку Пресета",
                confirmMessage: "Загрузка этого Пресета заменить любые несохранённые изменения на этом Банке Эффектов, хотите продолжить?",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "Подтвердить перезапись Пресета",
                overwriteMessage: "Пресет {current} уже существует в Библиотеке, хотите перезаписать?",
                overwriteConfirm: "Перезаписать",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "Открыть папку Пресетов",
                accessibilityPresetLoaded: "Пресет {name} загружен в {bank}",
                accessibilityPresetSaved: "Пресет {name} сохранён в Библиотеку",
            },
            reverb: {
                title: "Реверб",
                style: "Стиль",

                styles: {
                    library: "Библиотека",
                    darkBloom: "Тёмное Цветение",
                    musicClub: "Музыкальный Клуб",
                    realPlate: "Пластина (Real Plate)",
                    chapel: "Часовня",
                    hockeyArena: "Хоккейная Арена"
                },

                amount: "Уровень",
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
                title: "Эхо",

                style: "Стиль",
                styles: {
                    quarter: "Четверть",
                    eighth: "Восьмая",
                    triplet: "Триплет",
                    pingPong: "Пинг Понг",
                    classicSlap: "Классический Слэп",
                    multiTap: "МультиТап"
                },

                amount: "Уровень",
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
                title: "Высота",

                style: "Диапазон",
                styles: {
                    narrow: "Узкий",
                    wide: "Широкий"
                },

                amount: "Уровень",
                character: "Характер"
            },

            gender: {
                title: "Гендер",

                style: "Диапазон",
                styles: {
                    narrow: "Узкий",
                    medium: "Средний",
                    wide: "Широкий"
                },

                amount: "Уровень"
            },

            megaphone: {
                title: "Мегафон",

                style: "Стиль",
                styles: {
                    megaphone: "Мегафон",
                    radio: "Радио",
                    onThePhone: "Как по телефону",
                    overdrive: "Перегрузка",
                    buzzCutt: "Buzz Cutt",
                    tweed: "Tweed"
                },

                amount: "Уровень",
                postGain: "Усиление после"
            },

            robot: {
                title: "Робот",

                style: "Стиль",
                styles: {
                    robot1: "Робот 1",
                    robot2: "Робот 2",
                    robot3: "Робот 3",
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
                title: "Хард-тюн",

                style: "Стиль",
                styles: {
                    natural: "Натуральный",
                    medium: "Средний",
                    hard: "Тяжёлый"
                },

                amount: "Уровень",
                rate: "Степень",
                window: "Окно",

                source: "Источник"
            }
        },

        sampler: {
            bankTitle: "Банк",
            banks: {
                bankTitle: "Банк",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "Кнопка",
                buttonLabel: "Кнопка для Банка {activeBank}",
                buttons: {
                    topLeft: "Верхняя Левая",
                    topRight: "Верхняя Правая",
                    bottomLeft: "Нижняя Левая",
                    bottomRight: "Нижняя Правая",
                },

                functionTitle: "Функция",
                functionLabel: "Функция для {activeButton} кнопки в Банке {activeBank}",
                functions: {
                    playNext: "Воспроизвести / Далее",
                    playStop: "Воспроизвести / Стоп",
                    playFade: "Воспроизвести / Затухание",
                    stopOnRelease: "Стоп при Отпускании",
                    fadeOnRelease: "Затухание при Отпускании",
                    loop: "Повтор"
                },

                playOrderTitle: "Порядок проигрывания",
                playOrderLabel: "Порядок проигрывания для кнопки {activeButton} в Банке {activeBank}",
                playOrders: {
                    sequential: "Последовательно",
                    random: "Случайно",
                },
            },

            samplesTitle: "Сэмплы",
            samples: {
                samplesTitle: "Сэмплы",
                samplesLabel: "Сэмплы для кнопки {activeButton} в Банке {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "Добавить Сэмпл",
                sampleSelector: {
                    parentDirectory: "Родительская папка",
                    addButton: "Добавить",

                    noSamples: "На данный момент, нет Сэмплов в папке Сэмплов. Перенесите их туда, чтобы их можно было ввыбрать здесь!",

                    // Used with Screen Readers
                    directories: "Папки",
                    samples: "Сэмплы",
                },

                gain: "Усиление",
                waveform: {
                    title: "Waveform",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "Waveform для {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "Проиграть Сэмпл",
                    stopSample: "Остановить Сэмпл",

                    // Labels for the draggable 'Handles'
                    sampleStart: "Старт Сэмпла",
                    sampleEnd: "Конец Сэмпла",

                    sampleDeleted: "Сэмпл {sampleName} был удалён с кнопки {activeButton} в Банке {activeBank}",
                    zoomLevel: "Уровень приближения: {level}",
                },

                addSampleWaitTitle: "Пожалуйста, подождите",
                addSampleAnalysing: "Подождите, пока Сэмпл проанализируется.",
                addSampleProgress: "Прогресс: {progress}@:message.suffixes.percentage",

                errorTitle: "Ошибка при добавлении Сэмпла",
                errorText: "При добавлении Сэмпла в Банк произошла ошибка:",

                accessibilityOpenSamplesDirectory: "Открыть папку Сэмплов",
                accessibilityAnalysing: "Пожалуйста, подождите, Cэмпл анализируется. Процесс может занять пару минут.",
                accessibilityAdded: "Сэмпл {name} добавлен к кнопке {activeButton} в Банке {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "Цвет",

                activeColour: "Активированный",
                inactiveColour: "Неактивированный",

                inactiveOption: "Опция для Неактивированных",
                inactiveOptions: {
                    dimActiveColour: "Тусклый Цвет Активированного",
                    inactiveColour: "Цвет Неактивированного",
                    dimInactiveColour: "Тусклый Цвет Неактивированного"

                },

                applyToAll: "Применить ко Всем",
            },

            global: {
                areas: {
                    title: "Зоны",

                    area: "Зона",
                    areas: {
                        global: "Вся",
                        accent: "Логотип",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "Анимации",

                    mode: "Режим Анимации",
                    modes: {
                        none: "Никакой",
                        rainbowRetro: "Радуга - Ретро",
                        rainbowBright: "Радуга - Светлая",
                        rainbowDark: "Радуга - Тёмная",
                        simple: "Дыхание",
                        ripple: "Рябь",
                    },

                    mod1: "Модификация градиента 1",
                    mod2: "Модификация градиента 2",

                    waterfall: "Водопад - Настройка",
                    waterfallOff: "Откл",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "Фейдер",

                    style: "Стиль",
                    styles: {
                        gradient: "Градиент",
                        meter: "Измеритель",
                    },

                    bottomColour: "Нижний Цвет",
                    topColour: "Верхний Цвет",

                    accessibilityTitle: "Настройки Фейдера для {channel}",
                },

                screen: {
                    title: "Экран",
                    backgroundColour: "Фоновый цвет",
                    icons: "Иконки",
                    iconNone: "-- НЕТ --",

                    optionsTitle: "Опции",
                    options: {
                        showNumber: "Показывать номер",
                        invertDisplay: "Инвертировать дисплей",
                        text: "Текст",

                        accessibilityText: "Текст для отображения на экране GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "Заглушение",
                    accessibilityTitle: "Настройки Заглушения для {channel}"
                }
            },

            effects: {
                preset: {
                    title: "Кнопки Пресета",
                    presetTitle: "Пресет"
                },

                encoders: {
                    title: "Энкодеры",

                    encoder: "Энкодер",
                    encoders: {
                        reverb: "Реверб",
                        echo: "Эхо",
                        pitch: "Высота",
                        gender: "Гендер",
                    },

                    leftColour: "Левый Цвет",
                    rightColour: "Правый Цвет",
                    knobColour: "Цвет Ручки"
                },

                buttons: {
                    title: "Кнопки Эффектов",

                    effectTitle: "Эффект",
                    effect: {
                        megaphone: "Megaphone",
                        robot: "Robot",
                        hardTune: "Hardtune",
                        fx: "FX"
                    }
                },
            },
            sampler: {
                title: "Банк",

                buttonsTitle: "Кнопки",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "Активен / Загружен",
                empty: "Нет Сэмпла",
                inactive: "Неактивный Банк",
            },

            cough: {
                title: "Кнопки Cough/БИИП",

                buttonsTitle: "Кнопки",
                buttons: {
                    bleep: "БИИП",
                    cough: "Cough",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "Маршрутизация",

            input: "Вводы",
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

            output: "Выводы",
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
            title: "Система",

            powerButton: "Действия Питания",
            power: {
                shutdownTitle: "Действия при Завершении Работы",
                shutdownDescription: "Эти действия будут исполнены, когда GoXLR Utility безопасно отключён.",

                sleepTitle: "Действия при Сне",
                sleepDescription: "Эти действия будут исполнены, когда ваша система перейдёт в режим Сна.",

                wakeTitle: "Действия при Пробуждении",
                wakeDescription: "Эти действия будут исполнены, когда ваша система проснётся от режима Сна.",

                settingsError: "Похоже, что Конфигурация была изменена вручную, во избежание повреждений, интерфейс здесь не будет работать. Чтобы полностью сбросить Действия при Завершении Работы, нажмите кнопку ниже",
                settingsReset: "Сбросить Действия при Завершении Работы",

                power_options: {
                    reload: "Перезагрузить Настройки",
                    saveProfile: "Сохранить Профиль",
                    loadProfile: "Загрузить Полный профиль",
                    loadColourProfile: "Загрузить Цвета Профиля",
                    saveMicProfile: "Сохранить Профиль Микрофона",
                    loadMicProfile: "Загрузить Профиль Микрофона",
                }
            },

            deviceButton: "Настройки Устройства",
            device: {
                holdDuration: "Длительность удержания кнопки Заглушить, чтобы Заглушить Всё",
                holdDurationAccessibility: "Длительность в миллисекундах, в течение которой необходимо удерживать кнопку отключения звука, чтобы отключить все каналы",

                sampleBuffer: "Буфер предзаписи Сэмплера (в секундах)",
                sampleBufferAccessibility: "Длительность в секундах, которую будет записывать сэмплер перед нажатием кнопки",

                voiceDeafen: "Заглушить Всё Voice Chat'а также заглушает Микрофон для Chat Mic",
                voiceDeafenAccessibility: "Когда заглушаются Все каналы, также глушится Микрофон для Chat Mic",

                monitorWithFx: "Включать Мониторинг вместе с Эффектами(FX)",
                monitorWithFxAccessibility: "Включить мониторинг микрофона, когда включены эффекты",

                resetSampleFunctionOnClear: "Сброс функции Сэмпла при Очистке",
                resetSampleFunctionOnClearAccessibility: "Сбрасывает функцию Сэмпла на Старт / Далее при Очищении",

                lockFaders: "Не передвигать Фейдеры при Заглушении для Всего",
                lockFadersAccessibility: "Не давать фейдера передвигаться вниз, когда включён Заглушить для Всего",
            },

            settingsButton: "Настройки Утилиты",
            settings: {
                language: "Язык",
                useSystem: "Использовать Системный Язык (если доступен)",

                uiHandler: "Обработчик Интерфейса",
                uiHandlers: {
                    browser: "Браузер",
                    app: "Приложение",
                    custom: "Пользовательский"
                },


                logLevel: "Уровень Логов (нужен рестарт)",
                logLevels: {
                    off: "Откл",
                    error: "Error",
                    warn: "Warn",
                    info: "Info",
                    debug: "Debug",
                    trace: "Trace"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                allowNetworkAccess: "Дать Сетевой Доступ к Интерфейсу (нужен рестарт)",
                allowNetworkAccessAccessibility: "Разрешить доступ к Интерфейсу с других устройств в сети",

                autoStart: "Автозапуск при Входе",
                autoStartAccessibility: "Запускать GoXLR Utility, когда пользователь входит в систему",

                showOnLaunch: "Показывать Интерфейс при Запуске",
                showOnLaunchAccessibility: "Автоматически открывать Интерфейс при запуске",

                showTray: "Показывать Иконку в Трее (нужен рестарт)",
                showTrayAccessibility: "Показывать иконку GoXLR Utility в системном трее",

                ttsOnButton: "TTS при нажатии кнопок",
                ttsOnButtonAccessibility: "Произносит статус кнопки при нажатии, либо через программу чтения с экрана, либо через системный TTS",

                recoverDefaults: "Восстановить по умолчанию",
                recoverOptions: {
                    profiles: "Профили",
                    micProfiles: "Профили Микрофона",
                    icons: "Иконки",
                    presets: "Пресеты"
                },

                shutdownUtility: "Отключить GoXLR Utility"
            },

            aboutButton: "О GoXLR",
            about: {
                serial: "Серийный номер",
                utilityVersion: "Версия Утилиты",
                driverVersion: "Версия Драйвера",
                hardwareVersion: "Версия Аппаратной части",

                firmware: "Прошивка",
                dice: "DICE",
                fpga: "FPGA"
            },

            licenses: "Лицензии",
            help: "Помощь",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "Сохранить Профиль {profileName}",
            createProfile: "Создать Профиль",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "Источник нового Профиля",
            newQuestion: "Вы хотите создать новый Профиль из базового или из текущего?",
            newDefaultButton: "Базовый",
            newCurrentButton: "Текущий",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "Подтвердить Перезапись",
            overwriteQuestion: "Вы уверены, что хотите перезаписать Профиль {activeProfile}?",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "Подтвердить Удаление",
            deleteQuestion: "Вы уверены, что хотите удалить профиль {profileName}?",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "Введите название нового Профиля",
            newNamePlaceHolder: "Название профиля",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "Не удаётся удалить",
            deleteCurrentErrorMessage: "Нельзя удалить текущий Профиль.",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "Загрузить Профиль",
            menuLoadProfileColours: "Загрузить только Цвета",
            menuDeleteProfile: "Удалить Профиль",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "Профиль {profileName} загружен",
            accessibilityLoadedColours: "Цвета Профиля {profileName} загружены",
            accessibilityCreatedProfile: "Создан Профиль {profileName}",
            accessibilitySavedProfile: "Профиль {profileName} сохранён",
            accessibilitySavedProfileAs: "Профиль {profileName} сохранён как {newProfileName}",
            accessibilityProfileDeleted: "Профиль {profileName} удалён",
            accessibilityActiveProfile: "Активный Профиль",
            accessibilityDropMenuTitle: "Опции {profileName}",
            accessibilityOpenProfileDirectory: "Открыть папку Профилей",
            accessibilityOpenMicProfileDirectory: "Открыть папку Профилей Микрофона",
        },
    }
}
