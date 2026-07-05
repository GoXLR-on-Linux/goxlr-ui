/*  简体中文 (zh_CN)

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
            ok: "确定",
            yes: "是",
            no: "否",
            cancel: "取消",
            continue: "继续",
            close: "关闭",
        },

        common: {
            close: "关闭",
            clear: "清除",
            collapseSection: "折叠区域",
            expandSection: "展开区域",
            activeProfile: "当前配置文件",
            switchDevice: "切换设备",
            removeSample: "移除采样",
            waterfallAnimationUp: "瀑布动画 上",
            waterfallAnimationDown: "瀑布动画 下",
            unknown: "未知",
            tabList: "标签列表",
        },

        navigation: {
            profiles: "配置文件",
            presets: "预设",
            samples: "采样",

            microphone: "麦克风",
            mixer: "混音器",
            configuration: "配置",
            effects: "效果",
            sampler: "采样器",
            lighting: "灯光",
            routing: "路由",
            system: "系统",

            lightingGlobal: "全局",
            lightingMixer: "混音器",
            lightingEffects: "效果",
            lightingSampler: "采样器",
            lightingCough: "静音(Cough)",

            accessibilityProfileSection: "配置文件与文件",
            accessibilityDeviceSection: "设备设置",
            accessibilityLightingSection: "灯光设置",
        },

        microphone: {
            profiles: {
                title: "麦克风配置文件"
            },

            setup: {
                button: "麦克风设置",
                title: "麦克风设置",
                type: "麦克风类型",
                gain: "增益",

                xlr: "XLR 麦克风",
                phantom: "XLR + 幻象电源 (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "过大",
                good: "良好",
                gate_estimated: "噪声门为估算值"
            },

            gate: {
                title: "噪声门",
                threshold: "阈值",
                attenuation: "衰减",
                attack: "起音",
                release: "释放",
            },

            equaliser: {
                title: "均衡器",
                reset: "重置",
                enableFineTune: "启用微调",
                bass: "低音",
                mid: "中音",
                treble: "高音",
            },

            compressor: {
                title: "压缩器",
                amount: "强度",
                threshold: "阈值",
                ratio: "比率",
                attack: "起音",
                release: "释放",
                makeUpGain: "增益补偿",
            },

            extras: {
                title: "其他",
                deEsser: "齿音消除",
                bleep: "消音",
            }
        },

        mixer: {
            inputs: "输入",
            outputs: "输出",
            mixAssignment: "混音分配",

            submix: "子混音",

            channelA: "A",
            channelB: "B"
        },

        configuration: {
            mute_behaviour: {
                base: "静音至 {channel}",
                all: "静音至全部",

                stream: "静音至 @:message.channels.StreamMix",
                stream1: "静音至 @:message.channels.StreamMix1",
                stream2: "静音至 @:message.channels.StreamMix2",
                streams: "静音至 @:message.channels.StreamMix 1 + 2",
                chatMic: "静音至 @:message.channels.ChatMic",
                headphones: "静音至 @:message.channels.Headphones",
                lineOut: "静音至 @:message.channels.LineOut",
            },
            muteBehaviourTitle: "静音行为",
            muteBehaviourLabel: "{channel} 的静音行为",

            faders: {
                title: "推子",
                channelTitle: "通道",
                sourceTitle: "音源",
                sourceLabel: "{channel} 的音源",
            },

            cough: {
                behaviour: {
                    hold: "按住",
                    toggle: "切换",
                },

                title: "Cough 按钮设置",
                behaviourTitle: "按钮行为",
            }
        },

        effects: {
            preset: {
                title: "预设",
                group: "分组",

                menuLoad: "加载",
                menuRename: "重命名",
                menuSave: "保存到库",


                loadPreset: "加载预设",

                renamePresetTitle: "重命名预设",
                renamePresetPlaceholder: "新预设名称",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "库中当前没有预设，保存或复制一些后即可显示在此处。",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "确认加载预设",
                confirmMessage: "加载此预设将替换该效果库中所有未保存的更改，是否继续？",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "确认覆盖预设",
                overwriteMessage: "预设 {current} 已存在于库中，是否覆盖？",
                overwriteConfirm: "覆盖",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "打开预设目录",
                accessibilityPresetLoaded: "预设 {name} 已加载到 {bank}",
                accessibilityPresetSaved: "预设 {name} 已保存到库",
            },
            reverb: {
                title: "混响",
                style: "风格",

                styles: {
                    library: "图书馆",
                    darkBloom: "暗色绽放",
                    musicClub: "音乐俱乐部",
                    realPlate: "真实板式",
                    chapel: "教堂",
                    hockeyArena: "冰球馆"
                },

                amount: "强度",
                decay: "衰减",
                earlyLevel: "早期电平",
                tailLevel: "尾音电平",
                preDelay: "预延迟",
                lowColour: "低频音色",
                highColour: "高频音色",
                highFactor: "高频系数",
                diffuse: "扩散",
                modSpeed: "调制速度",
                modDepth: "调制深度"
            },

            echo: {
                title: "回声",

                style: "风格",
                styles: {
                    quarter: "四分",
                    eighth: "八分",
                    triplet: "三连音",
                    pingPong: "乒乓",
                    classicSlap: "经典拍击",
                    multiTap: "多重抽头"
                },

                amount: "强度",
                feedback: "反馈",
                tempo: "速度",
                delayLeft: "延迟 L",
                delayRight: "延迟 R",
                feedbackLeft: "反馈 L",
                feedbackRight: "反馈 R",
                xfbLeftToRight: "XFB L→R",
                xfbRightToLeft: "XFB R→L",
            },

            pitch: {
                title: "音高",

                style: "风格",
                styles: {
                    narrow: "窄",
                    wide: "宽"
                },

                amount: "强度",
                character: "特征"
            },

            gender: {
                title: "性别",

                style: "风格",
                styles: {
                    narrow: "窄",
                    medium: "中",
                    wide: "宽"
                },

                amount: "强度"
            },

            megaphone: {
                title: "扩音器",

                style: "风格",
                styles: {
                    megaphone: "扩音器",
                    radio: "收音机",
                    onThePhone: "电话中",
                    overdrive: "过载",
                    buzzCutt: "嗡鸣",
                    tweed: "粗花呢"
                },

                amount: "强度",
                postGain: "后级增益"
            },

            robot: {
                title: "机器人",

                style: "风格",
                styles: {
                    robot1: "机器人 1",
                    robot2: "机器人 2",
                    robot3: "机器人 3",
                },

                lowGain: "低频增益",
                lowFrequency: "低频频率",
                lowWidth: "低频宽度",
                midGain: "中频增益",
                midFrequency: "中频频率",
                midWidth: "中频宽度",
                highGain: "高频增益",
                highFrequency: "高频频率",
                highWidth: "高频宽度",
                waveform: "波形",
                pulseWidth: "脉冲宽度",
                threshold: "阈值",
                dryMix: "干声混合",
            },

            hardTune: {
                title: "硬调音",

                style: "风格",
                styles: {
                    natural: "自然",
                    medium: "中等",
                    hard: "强烈"
                },

                amount: "强度",
                rate: "速率",
                window: "窗口",

                source: "音源"
            }
        },

        sampler: {
            bankTitle: "库",
            banks: {
                bankTitle: "库",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "按钮",
                buttonLabel: "库 {activeBank} 的按钮",
                buttons: {
                    topLeft: "左上",
                    topRight: "右上",
                    bottomLeft: "左下",
                    bottomRight: "右下",
                },

                functionTitle: "功能",
                functionLabel: "库 {activeBank} 中 {activeButton} 按钮的功能",
                functions: {
                    playNext: "播放 / 下一个",
                    playStop: "播放 / 停止",
                    playFade: "播放 / 淡出",
                    stopOnRelease: "松开即停止",
                    fadeOnRelease: "松开即淡出",
                    loop: "循环"
                },

                playOrderTitle: "播放顺序",
                playOrderLabel: "库 {activeBank} 中 {activeButton} 按钮的播放顺序",
                playOrders: {
                    sequential: "顺序",
                    random: "随机",
                },
            },

            samplesTitle: "采样",
            samples: {
                samplesTitle: "采样",
                samplesLabel: "库 {activeBank} 中 {activeButton} 按钮的采样",

                addSample: "+",
                addSampleLabel: "添加采样",
                sampleSelector: {
                    parentDirectory: "上级目录",
                    addButton: "添加",

                    noSamples: "采样文件夹中当前没有采样。请复制一些进去，以便在此处选择！",

                    directories: "目录",
                    samples: "采样",
                },

                gain: "增益",
                waveform: {
                    title: "波形",

                    text: "{sample} 的波形",

                    playbackSample: "播放采样",
                    stopSample: "停止采样",

                    sampleStart: "采样起点",
                    sampleEnd: "采样终点",

                    sampleDeleted: "采样 {sampleName} 已从库 {activeBank} 的 {activeButton} 按钮中删除",
                    zoomLevel: "缩放级别：{level}",
                },

                addSampleWaitTitle: "请稍候",
                addSampleAnalysing: "正在分析采样，请稍候。",
                addSampleProgress: "进度：{progress}@:message.suffixes.percentage",

                errorTitle: "添加采样出错",
                errorText: "将采样添加到库时发生错误：",
                genericError: "发生未知错误。",

                accessibilityOpenSamplesDirectory: "打开采样目录",
                accessibilityAnalysing: "正在分析采样，请稍候。此过程可能需要几分钟。",
                accessibilityAdded: "采样 {name} 已添加到库 {activeBank} 的 {activeButton} 按钮。"
            }
        },

        lighting: {
            common: {
                colour: "颜色",

                activeColour: "激活",
                inactiveColour: "未激活",

                inactiveOption: "未激活选项",
                inactiveOptions: {
                    dimActiveColour: "调暗激活颜色",
                    inactiveColour: "未激活颜色",
                    dimInactiveColour: "调暗未激活颜色"

                },

                applyToAll: "应用到全部",
            },

            global: {
                areas: {
                    title: "区域",

                    area: "区域",
                    areas: {
                        global: "全局",
                        accent: "强调",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "动画",

                    mode: "动画模式",
                    modes: {
                        none: "无",
                        rainbowRetro: "彩虹 复古",
                        rainbowBright: "彩虹 明亮",
                        rainbowDark: "彩虹 暗色",
                        simple: "简单",
                        ripple: "涟漪",
                    },

                    mod1: "渐变 Mod 1",
                    mod2: "渐变 Mod 2",

                    waterfall: "瀑布设置",
                    waterfallOff: "关闭",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "推子",

                    style: "风格",
                    styles: {
                        gradient: "渐变",
                        meter: "电平表",
                    },

                    bottomColour: "底部颜色",
                    topColour: "顶部颜色",

                    accessibilityTitle: "{channel} 的推子设置",
                },

                screen: {
                    title: "屏幕",
                    backgroundColour: "背景颜色",
                    icons: "图标",
                    iconNone: "-- 无 --",

                    optionsTitle: "选项",
                    options: {
                        showNumber: "显示编号",
                        invertDisplay: "反转显示",
                        text: "文字",

                        accessibilityText: "在 GoXLR 屏幕上显示的文字"
                    }
                },

                mute: {
                    title: "静音",
                    accessibilityTitle: "{channel} 的静音设置"
                }
            },

            effects: {
                preset: {
                    title: "预设按钮",
                    presetTitle: "预设"
                },

                encoders: {
                    title: "旋钮",

                    encoder: "旋钮",
                    encoders: {
                        reverb: "混响",
                        echo: "回声",
                        pitch: "音高",
                        gender: "性别",
                    },

                    leftColour: "左侧颜色",
                    rightColour: "右侧颜色",
                    knobColour: "旋钮颜色"
                },

                buttons: {
                    title: "效果按钮",

                    effectTitle: "效果",
                    effect: {
                        megaphone: "扩音器",
                        robot: "机器人",
                        hardTune: "硬调音",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "库",

                buttonsTitle: "按钮",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "激活 / 已加载",
                empty: "采样为空",
                inactive: "未激活的库",
            },

            cough: {
                title: "Cough/Bleep 按钮",

                buttonsTitle: "按钮",
                buttons: {
                    bleep: "消音",
                    cough: "静音(Cough)",
                }
            },
        },

        routing: {
            title: "路由",

            input: "输入",
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

            output: "输出",
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
            title: "系统",

            powerButton: "电源操作",
            power: {
                shutdownTitle: "关闭时的操作",
                shutdownDescription: "这些操作将在 GoXLR Utility 安全关闭时执行。",

                sleepTitle: "睡眠时的操作",
                sleepDescription: "这些操作将在系统进入睡眠时执行。",

                wakeTitle: "唤醒时的操作",
                wakeDescription: "这些操作将在系统从睡眠唤醒时执行。",

                settingsError: "配置似乎被手动修改过。为防止意外行为，此区域已被禁用。若要完全重置关闭操作，请按下方按钮",
                settingsReset: "重置关闭操作",

                power_options: {
                    reload: "重新加载设置",
                    saveProfile: "保存配置文件",
                    loadProfile: "加载完整配置文件",
                    loadColourProfile: "加载配置文件颜色",
                    saveMicProfile: "保存麦克风配置文件",
                    loadMicProfile: "加载麦克风配置文件",
                }
            },

            deviceButton: "设备设置",
            device: {
                holdDuration: "静音按钮长按以全部静音的时长",
                holdDurationAccessibility: "静音按钮必须按住以将所有通道静音的时长（毫秒）",

                sampleBuffer: "采样器预录制缓冲（秒）",
                sampleBufferAccessibility: "采样器在按钮按下前录制的时长（秒）",

                voiceDeafen: "语音聊天全部静音时，同时将麦克风到 Chat Mic 静音",
                voiceDeafenAccessibility: "将语音聊天静音至所有通道时，同时将麦克风到 Chat Mic 静音",

                monitorWithFx: "随 FX 状态切换麦克风监听",
                monitorWithFxAccessibility: "启用 FX 时激活麦克风监听",

                resetSampleFunctionOnClear: "清除时重置采样功能",
                resetSampleFunctionOnClearAccessibility: "清除时将采样功能重置为“开始 / 下一个”",

                lockFaders: "全部静音时锁定推子位置",
                lockFadersAccessibility: "当“全部静音”激活时，防止推子下降",

                samplerFadeDuration: "采样器淡出时长",
                samplerFadeDurationAccessibility: "停止播放时采样器淡出的时长（毫秒）",
            },

            settingsButton: "实用工具设置",
            settings: {
                language: "语言",
                useSystem: "使用系统语言（若可用）",

                uiHandler: "UI 处理程序",
                uiHandlers: {
                    browser: "浏览器",
                    app: "应用",
                    custom: "自定义"
                },


                logLevel: "日志级别（需重启）",
                logLevels: {
                    off: "关闭",
                    error: "错误",
                    warn: "警告",
                    info: "信息",
                    debug: "调试",
                    trace: "跟踪"
                },

                firmwareSource: "固件更新通道",
                firmwareSources: {
                    live: "Live",
                    beta: "Beta"
                },

                allowNetworkAccess: "允许 UI 网络访问（需重启）",
                allowNetworkAccessAccessibility: "允许网络中的其他设备访问 UI",

                autoStart: "登录时自动启动",
                autoStartAccessibility: "在用户登录时启动 GoXLR Utility",

                showOnLaunch: "启动时显示 UI",
                showOnLaunchAccessibility: "启动时自动显示 UI",

                showTray: "显示托盘图标（需重启）",
                showTrayAccessibility: "在系统托盘中显示 GoXLR Utility 图标",

                ttsOnButton: "按下按钮时朗读（TTS）",
                ttsOnButtonAccessibility: "按下按钮时，通过屏幕阅读器或系统 TTS 朗读按钮状态",

                recoverDefaults: "恢复默认",
                recoverOptions: {
                    profiles: "配置文件",
                    micProfiles: "麦克风配置文件",
                    icons: "图标",
                    presets: "预设"
                },

                shutdownUtility: "关闭 GoXLR Utility",

                shutdownConfirmTitle: "确定吗？",
                shutdownConfirmMessage: "确定要关闭 GoXLR Utility 吗？",

                settingsRegionAccessibility: "设置",

                macosAggregateManagement: "禁用 macOS 聚合设备管理（需重启）",
                macosAggregateManagementAccessibility: "在 macOS 上禁用实用工具的聚合设备管理（需重启）",
            },

            aboutButton: "关于 GoXLR",
            about: {
                serial: "序列号",
                utilityVersion: "实用工具版本",
                driverVersion: "驱动程序版本",
                hardwareVersion: "硬件版本",

                firmware: "固件",
                dice: "DICE",
                fpga: "FPGA",
            },

            firmwareUpdateButton: {
                update: "更新固件",
                downgrade: "降级固件",
                reinstall: "重新安装固件",
                custom: "自定义固件",
            },
            firmwareUpdate: {
                newVersionAvailable: "您的设备有新的固件版本（{latestVersion}）可用。\n现在要更新设备吗？",
                currentVersionIsNewer: "您当前的固件版本（{currentVersion}）比设备可用的最新固件版本（{latestVersion}）更新。\n是否要降级到最新固件版本？",
                currentIsUpToDate: "您的固件已是最新。\n是否要重新安装当前固件版本？",
                customFirmware: "您即将安装自定义固件。\n除非您了解自己在做什么，否则不建议这样做。\n确定要继续吗？",

                warning: "您即将向设备刷入新的固件版本。\nGoXLR Utility 的开发者不对此过程可能造成的任何损坏负责。 ",
                warningInfo: "更多信息",

                betaWarning: "您即将安装测试版（Beta）固件。\n此版本不会获得任何官方支持，并可能包含我们无法修复的错误或问题。",

                updatePaused: "您即将安装固件版本 {version}。确定要继续吗？",
                updateInProgress: "固件更新进行中。请稍候，切勿断开设备连接！",
                completed: "固件更新已成功完成。",
                failed: "固件更新过程中出现问题。请重试。",

                changelog: "版本 {version} 更新日志：",
                title: "正在安装固件…",

                progress: {
                    starting: "开始中…",
                    manifest: "正在获取清单…",
                    download: "正在下载固件…",
                    pause: "更新已暂停",
                    clearNVR: "正在准备更新分区…",
                    uploadFirmware: "正在上传固件…",
                    validateUpload: "正在校验已上传的固件…",
                    hardwareWrite: "正在写入固件…",
                    hardwareValidate: "正在校验固件…",
                    complete: "更新完成",
                    failed: "固件更新失败",
                }
            },

            licenses: "许可证",
            help: "帮助",
        },

        deviceSelector: {
            title: "选择设备",
            connecting: "正在尝试连接到 GoXLR Utility..",
            disconnected: "无法连接到 GoXLR Utility，请检查其是否正在运行。\n\n本页面将自动尝试重新连接..",
            noDevices: "未找到 GoXLR 设备",
        },

        versionCheck: {
            updateAvailable: "有可用更新",
            firmwareDirectionAvailable: "固件{direction}可用",
            firmwareDirections: {
                update: "更新",
                downgrade: "降级",
                unknown: "未知",
            },
            incompatibleDriver: "已安装的驱动程序与此固件不兼容，点击此处下载最新驱动程序。",
        },

        profileManager: {
            saveProfileName: "保存配置文件 {profileName}",
            createProfile: "创建配置文件",

            newTitle: "新配置文件的来源",
            newQuestion: "您想从默认配置创建新配置文件，还是从当前配置创建？",
            newDefaultButton: "默认",
            newCurrentButton: "当前配置",
            newCancelButton: "@:message.modalButtons.cancel",

            overwriteTitle: "覆盖确认",
            overwriteQuestion: "确定要覆盖配置文件 {activeProfile} 吗？",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            deleteTitle: "删除确认",
            deleteQuestion: "确定要删除配置文件 {profileName} 吗？",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            newNameTitle: "输入新配置文件名称",
            newNamePlaceHolder: "新名称",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            deleteCurrentErrorTitle: "无法删除",
            deleteCurrentErrorMessage: "无法删除当前使用中的配置文件。",

            menuLoadProfile: "加载配置文件",
            menuLoadProfileColours: "仅加载颜色",
            menuDeleteProfile: "删除配置文件",


            accessibilityLoadedProfile: "配置文件 {profileName} 已加载",
            accessibilityLoadedColours: "配置文件 {profileName} 的颜色已加载",
            accessibilityCreatedProfile: "已创建配置文件 {profileName}",
            accessibilitySavedProfile: "配置文件 {profileName} 已保存",
            accessibilitySavedProfileAs: "配置文件 {profileName} 已另存为 {newProfileName}",
            accessibilityProfileDeleted: "配置文件 {profileName} 已删除",
            accessibilityActiveProfile: "当前配置文件",
            accessibilityDropMenuTitle: "{profileName} 选项",
            accessibilityOpenProfileDirectory: "打开配置文件目录",
            accessibilityOpenMicProfileDirectory: "打开麦克风配置文件目录",
        },
    }
}
