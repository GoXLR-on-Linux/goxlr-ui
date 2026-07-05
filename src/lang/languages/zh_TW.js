/*  繁體中文 (zh_TW)

    Everything inside quotation marks ("text") is translatable.
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!
    Anything starting with @: is a linked message reference, keep it as-is.

    Note: GoXLR channel names (Mic / Chat / Music / Game ...) are intentionally
    kept in English to match how Windows lists the audio devices.
 */

///
/// Authors:
/// Claude (machine-assisted translation)
///


export default {
    message: {
        // Channel names kept in English on purpose (match Windows device names).
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
            StreamMix1: "Stream Mix 1",
            StreamMix2: "Stream Mix 2",
            ChatMic: "Chat Mic",
            Sampler: "Sampler",
            VOD: "VOD",
        },

        faders: {
            A: "通道 1",
            B: "通道 2",
            C: "通道 3",
            D: "通道 4"
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
            ok: "確定",
            yes: "是",
            no: "否",
            cancel: "取消",
            continue: "繼續",
            close: "關閉",
        },

        common: {
            close: "關閉",
            clear: "清除",
            collapseSection: "摺疊區域",
            expandSection: "展開區域",
            activeProfile: "目前設定檔",
            switchDevice: "切換裝置",
            removeSample: "移除取樣",
            waterfallAnimationUp: "瀑布動畫 上",
            waterfallAnimationDown: "瀑布動畫 下",
            unknown: "未知",
            tabList: "標籤清單",
        },

        navigation: {
            profiles: "設定檔",
            presets: "預設集",
            samples: "取樣",

            microphone: "麥克風",
            mixer: "混音器",
            configuration: "設定",
            effects: "效果",
            sampler: "取樣器",
            lighting: "燈光",
            routing: "路由",
            system: "系統",

            lightingGlobal: "全域",
            lightingMixer: "混音器",
            lightingEffects: "效果",
            lightingSampler: "取樣器",
            lightingCough: "靜音(Cough)",

            accessibilityProfileSection: "設定檔與檔案",
            accessibilityDeviceSection: "裝置設定",
            accessibilityLightingSection: "燈光設定",
        },

        microphone: {
            profiles: {
                title: "麥克風設定檔"
            },

            setup: {
                button: "麥克風設定",
                title: "麥克風設定",
                type: "麥克風類型",
                gain: "增益",

                xlr: "XLR 麥克風",
                phantom: "XLR + 幻象電源 (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "過大",
                good: "良好",
                gate_estimated: "雜訊門為估算值"
            },

            gate: {
                title: "雜訊門",
                threshold: "閾值",
                attenuation: "衰減",
                attack: "起音",
                release: "釋放",
            },

            equaliser: {
                title: "等化器",
                reset: "重設",
                enableFineTune: "啟用微調",
                bass: "低音",
                mid: "中音",
                treble: "高音",
            },

            compressor: {
                title: "壓縮器",
                amount: "強度",
                threshold: "閾值",
                ratio: "比率",
                attack: "起音",
                release: "釋放",
                makeUpGain: "增益補償",
            },

            extras: {
                title: "其他",
                deEsser: "齒音消除",
                bleep: "消音",
            }
        },

        mixer: {
            inputs: "輸入",
            outputs: "輸出",
            mixAssignment: "混音分配",

            submix: "子混音",

            channelA: "A",
            channelB: "B"
        },

        configuration: {
            mute_behaviour: {
                base: "靜音至 {channel}",
                all: "靜音至全部",

                stream: "靜音至 @:message.channels.StreamMix",
                stream1: "靜音至 @:message.channels.StreamMix1",
                stream2: "靜音至 @:message.channels.StreamMix2",
                streams: "靜音至 @:message.channels.StreamMix 1 + 2",
                chatMic: "靜音至 @:message.channels.ChatMic",
                headphones: "靜音至 @:message.channels.Headphones",
                lineOut: "靜音至 @:message.channels.LineOut",
            },
            muteBehaviourTitle: "靜音行為",
            muteBehaviourLabel: "{channel} 的靜音行為",

            faders: {
                title: "推桿",
                channelTitle: "通道",
                sourceTitle: "音源",
                sourceLabel: "{channel} 的音源",
            },

            cough: {
                behaviour: {
                    hold: "按住",
                    toggle: "切換",
                },

                title: "Cough 按鈕設定",
                behaviourTitle: "按鈕行為",
            }
        },

        effects: {
            preset: {
                title: "預設集",
                group: "群組",

                menuLoad: "載入",
                menuRename: "重新命名",
                menuSave: "儲存至媒體庫",


                loadPreset: "載入預設集",

                renamePresetTitle: "重新命名預設集",
                renamePresetPlaceholder: "新預設集名稱",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "媒體庫中目前沒有預設集，儲存或複製一些後即會顯示於此處。",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "確認載入預設集",
                confirmMessage: "載入此預設集將取代該效果庫中所有未儲存的變更，是否要繼續？",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "確認覆寫預設集",
                overwriteMessage: "預設集 {current} 已存在於媒體庫中，是否要覆寫？",
                overwriteConfirm: "覆寫",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "開啟預設集目錄",
                accessibilityPresetLoaded: "預設集 {name} 已載入至 {bank}",
                accessibilityPresetSaved: "預設集 {name} 已儲存至媒體庫",
            },
            reverb: {
                title: "殘響",
                style: "風格",

                styles: {
                    library: "圖書館",
                    darkBloom: "暗色綻放",
                    musicClub: "音樂俱樂部",
                    realPlate: "真實板式",
                    chapel: "教堂",
                    hockeyArena: "曲棍球場"
                },

                amount: "強度",
                decay: "衰減",
                earlyLevel: "早期電平",
                tailLevel: "尾音電平",
                preDelay: "預延遲",
                lowColour: "低頻音色",
                highColour: "高頻音色",
                highFactor: "高頻係數",
                diffuse: "擴散",
                modSpeed: "調變速度",
                modDepth: "調變深度"
            },

            echo: {
                title: "回聲",

                style: "風格",
                styles: {
                    quarter: "四分",
                    eighth: "八分",
                    triplet: "三連音",
                    pingPong: "乒乓",
                    classicSlap: "經典拍擊",
                    multiTap: "多重抽頭"
                },

                amount: "強度",
                feedback: "回饋",
                tempo: "速度",
                delayLeft: "延遲 L",
                delayRight: "延遲 R",
                feedbackLeft: "回饋 L",
                feedbackRight: "回饋 R",
                xfbLeftToRight: "XFB L→R",
                xfbRightToLeft: "XFB R→L",
            },

            pitch: {
                title: "音高",

                style: "風格",
                styles: {
                    narrow: "窄",
                    wide: "寬"
                },

                amount: "強度",
                character: "特性"
            },

            gender: {
                title: "性別",

                style: "風格",
                styles: {
                    narrow: "窄",
                    medium: "中",
                    wide: "寬"
                },

                amount: "強度"
            },

            megaphone: {
                title: "擴音器",

                style: "風格",
                styles: {
                    megaphone: "擴音器",
                    radio: "收音機",
                    onThePhone: "電話中",
                    overdrive: "過載",
                    buzzCutt: "嗡鳴",
                    tweed: "粗花呢"
                },

                amount: "強度",
                postGain: "後級增益"
            },

            robot: {
                title: "機器人",

                style: "風格",
                styles: {
                    robot1: "機器人 1",
                    robot2: "機器人 2",
                    robot3: "機器人 3",
                },

                lowGain: "低頻增益",
                lowFrequency: "低頻頻率",
                lowWidth: "低頻寬度",
                midGain: "中頻增益",
                midFrequency: "中頻頻率",
                midWidth: "中頻寬度",
                highGain: "高頻增益",
                highFrequency: "高頻頻率",
                highWidth: "高頻寬度",
                waveform: "波形",
                pulseWidth: "脈衝寬度",
                threshold: "閾值",
                dryMix: "乾聲混合",
            },

            hardTune: {
                title: "硬調音",

                style: "風格",
                styles: {
                    natural: "自然",
                    medium: "中等",
                    hard: "強烈"
                },

                amount: "強度",
                rate: "速率",
                window: "視窗",

                source: "音源"
            }
        },

        sampler: {
            bankTitle: "庫",
            banks: {
                bankTitle: "庫",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "按鈕",
                buttonLabel: "庫 {activeBank} 的按鈕",
                buttons: {
                    topLeft: "左上",
                    topRight: "右上",
                    bottomLeft: "左下",
                    bottomRight: "右下",
                },

                functionTitle: "功能",
                functionLabel: "庫 {activeBank} 中 {activeButton} 按鈕的功能",
                functions: {
                    playNext: "播放 / 下一個",
                    playStop: "播放 / 停止",
                    playFade: "播放 / 淡出",
                    stopOnRelease: "放開即停止",
                    fadeOnRelease: "放開即淡出",
                    loop: "循環"
                },

                playOrderTitle: "播放順序",
                playOrderLabel: "庫 {activeBank} 中 {activeButton} 按鈕的播放順序",
                playOrders: {
                    sequential: "順序",
                    random: "隨機",
                },
            },

            samplesTitle: "取樣",
            samples: {
                samplesTitle: "取樣",
                samplesLabel: "庫 {activeBank} 中 {activeButton} 按鈕的取樣",

                addSample: "+",
                addSampleLabel: "新增取樣",
                sampleSelector: {
                    parentDirectory: "上層目錄",
                    addButton: "新增",

                    noSamples: "取樣資料夾中目前沒有取樣。請複製一些進去，以便在此處選擇！",

                    directories: "目錄",
                    samples: "取樣",
                },

                gain: "增益",
                waveform: {
                    title: "波形",

                    text: "{sample} 的波形",

                    playbackSample: "播放取樣",
                    stopSample: "停止取樣",

                    sampleStart: "取樣起點",
                    sampleEnd: "取樣終點",

                    sampleDeleted: "取樣 {sampleName} 已從庫 {activeBank} 的 {activeButton} 按鈕中刪除",
                    zoomLevel: "縮放等級：{level}",
                },

                addSampleWaitTitle: "請稍候",
                addSampleAnalysing: "正在分析取樣，請稍候。",
                addSampleProgress: "進度：{progress}@:message.suffixes.percentage",

                errorTitle: "新增取樣時發生錯誤",
                errorText: "將取樣新增至庫時發生錯誤：",
                genericError: "發生未知錯誤。",

                accessibilityOpenSamplesDirectory: "開啟取樣目錄",
                accessibilityAnalysing: "正在分析取樣，請稍候。此程序可能需要幾分鐘。",
                accessibilityAdded: "取樣 {name} 已新增至庫 {activeBank} 的 {activeButton} 按鈕。"
            }
        },

        lighting: {
            common: {
                colour: "顏色",

                activeColour: "啟用",
                inactiveColour: "未啟用",

                inactiveOption: "未啟用選項",
                inactiveOptions: {
                    dimActiveColour: "調暗啟用顏色",
                    inactiveColour: "未啟用顏色",
                    dimInactiveColour: "調暗未啟用顏色"

                },

                applyToAll: "套用至全部",
            },

            global: {
                areas: {
                    title: "區域",

                    area: "區域",
                    areas: {
                        global: "全域",
                        accent: "強調",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "動畫",

                    mode: "動畫模式",
                    modes: {
                        none: "無",
                        rainbowRetro: "彩虹 復古",
                        rainbowBright: "彩虹 明亮",
                        rainbowDark: "彩虹 暗色",
                        simple: "簡單",
                        ripple: "漣漪",
                    },

                    mod1: "漸層 Mod 1",
                    mod2: "漸層 Mod 2",

                    waterfall: "瀑布設定",
                    waterfallOff: "關閉",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "推桿",

                    style: "風格",
                    styles: {
                        gradient: "漸層",
                        meter: "電平表",
                    },

                    bottomColour: "底部顏色",
                    topColour: "頂部顏色",

                    accessibilityTitle: "{channel} 的推桿設定",
                },

                screen: {
                    title: "螢幕",
                    backgroundColour: "背景顏色",
                    icons: "圖示",
                    iconNone: "-- 無 --",

                    optionsTitle: "選項",
                    options: {
                        showNumber: "顯示編號",
                        invertDisplay: "反轉顯示",
                        text: "文字",

                        accessibilityText: "在 GoXLR 螢幕上顯示的文字"
                    }
                },

                mute: {
                    title: "靜音",
                    accessibilityTitle: "{channel} 的靜音設定"
                }
            },

            effects: {
                preset: {
                    title: "預設集按鈕",
                    presetTitle: "預設集"
                },

                encoders: {
                    title: "旋鈕",

                    encoder: "旋鈕",
                    encoders: {
                        reverb: "殘響",
                        echo: "回聲",
                        pitch: "音高",
                        gender: "性別",
                    },

                    leftColour: "左側顏色",
                    rightColour: "右側顏色",
                    knobColour: "旋鈕顏色"
                },

                buttons: {
                    title: "效果按鈕",

                    effectTitle: "效果",
                    effect: {
                        megaphone: "擴音器",
                        robot: "機器人",
                        hardTune: "硬調音",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "庫",

                buttonsTitle: "按鈕",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "啟用 / 已載入",
                empty: "取樣為空",
                inactive: "未啟用的庫",
            },

            cough: {
                title: "Cough/Bleep 按鈕",

                buttonsTitle: "按鈕",
                buttons: {
                    bleep: "消音",
                    cough: "靜音(Cough)",
                }
            },
        },

        routing: {
            title: "路由",

            input: "輸入",
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

            output: "輸出",
            outputs: {
                Headphones: "@:message.channels.Headphones",
                BroadcastMix: "@:message.channels.StreamMix",
                StreamMix2: "@:message.channels.StreamMix2",
                ChatMic: "@:message.channels.ChatMic",
                Sampler: "@:message.channels.Sampler",
                LineOut: "@:message.channels.LineOut",
                VOD: "@:message.channels.VOD",
            }
        },

        system: {
            title: "系統",

            powerButton: "電源操作",
            power: {
                shutdownTitle: "關閉時的操作",
                shutdownDescription: "這些操作將在 GoXLR Utility 安全關閉時執行。",

                sleepTitle: "睡眠時的操作",
                sleepDescription: "這些操作將在系統進入睡眠時執行。",

                wakeTitle: "喚醒時的操作",
                wakeDescription: "這些操作將在系統從睡眠喚醒時執行。",

                settingsError: "設定似乎被手動修改過。為防止非預期的行為，此區域已被停用。若要完全重設關閉操作，請按下方按鈕",
                settingsReset: "重設關閉操作",

                power_options: {
                    reload: "重新載入設定",
                    saveProfile: "儲存設定檔",
                    loadProfile: "載入完整設定檔",
                    loadColourProfile: "載入設定檔顏色",
                    saveMicProfile: "儲存麥克風設定檔",
                    loadMicProfile: "載入麥克風設定檔",
                }
            },

            deviceButton: "裝置設定",
            device: {
                holdDuration: "靜音按鈕長按以全部靜音的時間",
                holdDurationAccessibility: "靜音按鈕必須按住以將所有通道靜音的時間（毫秒）",

                sampleBuffer: "取樣器預錄緩衝（秒）",
                sampleBufferAccessibility: "取樣器在按鈕按下前錄製的時間（秒）",

                voiceDeafen: "語音聊天全部靜音時，同時將麥克風至 Chat Mic 靜音",
                voiceDeafenAccessibility: "將語音聊天靜音至所有通道時，同時將麥克風至 Chat Mic 靜音",

                monitorWithFx: "隨 FX 狀態切換麥克風監聽",
                monitorWithFxAccessibility: "啟用 FX 時啟動麥克風監聽",

                resetSampleFunctionOnClear: "清除時重設取樣功能",
                resetSampleFunctionOnClearAccessibility: "清除時將取樣功能重設為「開始 / 下一個」",

                lockFaders: "全部靜音時鎖定推桿位置",
                lockFadersAccessibility: "當「全部靜音」啟用時，防止推桿下降",

                samplerFadeDuration: "取樣器淡出時間",
                samplerFadeDurationAccessibility: "停止播放時取樣器淡出的時間（毫秒）",
            },

            settingsButton: "工具設定",
            settings: {
                language: "語言",
                useSystem: "使用系統語言（若可用）",

                uiHandler: "UI 處理常式",
                uiHandlers: {
                    browser: "瀏覽器",
                    app: "應用程式",
                    custom: "自訂"
                },


                logLevel: "記錄等級（需重新啟動）",
                logLevels: {
                    off: "關閉",
                    error: "錯誤",
                    warn: "警告",
                    info: "資訊",
                    debug: "偵錯",
                    trace: "追蹤"
                },

                firmwareSource: "韌體更新通道",
                firmwareSources: {
                    live: "Live",
                    beta: "Beta"
                },

                allowNetworkAccess: "允許 UI 網路存取（需重新啟動）",
                allowNetworkAccessAccessibility: "允許網路中的其他裝置存取 UI",

                autoStart: "登入時自動啟動",
                autoStartAccessibility: "在使用者登入時啟動 GoXLR Utility",

                showOnLaunch: "啟動時顯示 UI",
                showOnLaunchAccessibility: "啟動時自動顯示 UI",

                showTray: "顯示系統匣圖示（需重新啟動）",
                showTrayAccessibility: "在系統匣中顯示 GoXLR Utility 圖示",

                ttsOnButton: "按下按鈕時朗讀（TTS）",
                ttsOnButtonAccessibility: "按下按鈕時，透過螢幕閱讀器或系統 TTS 朗讀按鈕狀態",

                recoverDefaults: "還原預設",
                recoverOptions: {
                    profiles: "設定檔",
                    micProfiles: "麥克風設定檔",
                    icons: "圖示",
                    presets: "預設集"
                },

                shutdownUtility: "關閉 GoXLR Utility",

                shutdownConfirmTitle: "確定嗎？",
                shutdownConfirmMessage: "確定要關閉 GoXLR Utility 嗎？",

                settingsRegionAccessibility: "設定",

                macosAggregateManagement: "停用 macOS 彙總裝置管理（需重新啟動）",
                macosAggregateManagementAccessibility: "在 macOS 上停用工具的彙總裝置管理（需重新啟動）",
            },

            aboutButton: "關於 GoXLR",
            about: {
                serial: "序號",
                utilityVersion: "工具版本",
                driverVersion: "驅動程式版本",
                hardwareVersion: "硬體版本",

                firmware: "韌體",
                dice: "DICE",
                fpga: "FPGA",
            },

            firmwareUpdateButton: {
                update: "更新韌體",
                downgrade: "降級韌體",
                reinstall: "重新安裝韌體",
                custom: "自訂韌體",
            },
            firmwareUpdate: {
                newVersionAvailable: "您的裝置有新的韌體版本（{latestVersion}）可用。\n現在要更新裝置嗎？",
                currentVersionIsNewer: "您目前的韌體版本（{currentVersion}）比裝置可用的最新韌體版本（{latestVersion}）更新。\n是否要降級至最新韌體版本？",
                currentIsUpToDate: "您的韌體已是最新。\n是否要重新安裝目前的韌體版本？",
                customFirmware: "您即將安裝自訂韌體。\n除非您了解自己在做什麼，否則不建議這樣做。\n確定要繼續嗎？",

                warning: "您即將對裝置刷入新的韌體版本。\nGoXLR Utility 的開發者不對此程序可能造成的任何損害負責。 ",
                warningInfo: "更多資訊",

                betaWarning: "您即將安裝測試版（Beta）韌體。\n此版本不會獲得任何官方支援，並可能包含我們無法修復的錯誤或問題。",

                updatePaused: "您即將安裝韌體版本 {version}。確定要繼續嗎？",
                updateInProgress: "韌體更新進行中。請稍候，切勿中斷裝置連線！",
                completed: "韌體更新已成功完成。",
                failed: "韌體更新過程中發生問題。請重試。",

                changelog: "版本 {version} 變更紀錄：",
                title: "正在安裝韌體…",

                progress: {
                    starting: "開始中…",
                    manifest: "正在取得資訊清單…",
                    download: "正在下載韌體…",
                    pause: "更新已暫停",
                    clearNVR: "正在準備更新分割區…",
                    uploadFirmware: "正在上傳韌體…",
                    validateUpload: "正在驗證已上傳的韌體…",
                    hardwareWrite: "正在寫入韌體…",
                    hardwareValidate: "正在驗證韌體…",
                    complete: "更新完成",
                    failed: "韌體更新失敗",
                }
            },

            licenses: "授權",
            help: "說明",
        },

        deviceSelector: {
            title: "選擇裝置",
            connecting: "正在嘗試連線至 GoXLR Utility..",
            disconnected: "無法連線至 GoXLR Utility，請檢查其是否正在執行。\n\n本頁面將自動嘗試重新連線..",
            noDevices: "找不到 GoXLR 裝置",
        },

        versionCheck: {
            updateAvailable: "有可用更新",
            firmwareDirectionAvailable: "韌體{direction}可用",
            firmwareDirections: {
                update: "更新",
                downgrade: "降級",
                unknown: "未知",
            },
            incompatibleDriver: "已安裝的驅動程式與此韌體不相容，點擊此處下載最新驅動程式。",
        },

        profileManager: {
            saveProfileName: "儲存設定檔 {profileName}",
            createProfile: "建立設定檔",

            newTitle: "新設定檔的來源",
            newQuestion: "您想從預設配置建立新設定檔，還是從目前配置建立？",
            newDefaultButton: "預設",
            newCurrentButton: "目前配置",
            newCancelButton: "@:message.modalButtons.cancel",

            overwriteTitle: "覆寫確認",
            overwriteQuestion: "確定要覆寫設定檔 {activeProfile} 嗎？",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            deleteTitle: "刪除確認",
            deleteQuestion: "確定要刪除設定檔 {profileName} 嗎？",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            newNameTitle: "輸入新設定檔名稱",
            newNamePlaceHolder: "新名稱",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            deleteCurrentErrorTitle: "無法刪除",
            deleteCurrentErrorMessage: "無法刪除目前使用中的設定檔。",

            menuLoadProfile: "載入設定檔",
            menuLoadProfileColours: "僅載入顏色",
            menuDeleteProfile: "刪除設定檔",


            accessibilityLoadedProfile: "設定檔 {profileName} 已載入",
            accessibilityLoadedColours: "設定檔 {profileName} 的顏色已載入",
            accessibilityCreatedProfile: "已建立設定檔 {profileName}",
            accessibilitySavedProfile: "設定檔 {profileName} 已儲存",
            accessibilitySavedProfileAs: "設定檔 {profileName} 已另存為 {newProfileName}",
            accessibilityProfileDeleted: "設定檔 {profileName} 已刪除",
            accessibilityActiveProfile: "目前設定檔",
            accessibilityDropMenuTitle: "{profileName} 選項",
            accessibilityOpenProfileDirectory: "開啟設定檔目錄",
            accessibilityOpenMicProfileDirectory: "開啟麥克風設定檔目錄",
        },
    }
}
