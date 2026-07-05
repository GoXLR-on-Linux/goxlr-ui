/*  Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This file is for Japanese (Japan) - 日本語 (日本)

    Everything inside quotation marks ("text") is translatable.
    Anything wrapped in curly brackets ({text}) is a variable, do NOT translate that!
    Anything starting with @: is a linked message reference, keep it as-is.
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
            A: "チャンネル 1",
            B: "チャンネル 2",
            C: "チャンネル 3",
            D: "チャンネル 4"
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
            yes: "はい",
            no: "いいえ",
            cancel: "キャンセル",
            continue: "続行",
            close: "閉じる",
        },

        common: {
            close: "閉じる",
            clear: "クリア",
            collapseSection: "セクションを折りたたむ",
            expandSection: "セクションを展開",
            activeProfile: "アクティブなプロファイル",
            switchDevice: "デバイスを切り替え",
            removeSample: "サンプルを削除",
            waterfallAnimationUp: "ウォーターフォールアニメーション 上",
            waterfallAnimationDown: "ウォーターフォールアニメーション 下",
            unknown: "不明",
            tabList: "タブ一覧",
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "プロファイル",
            presets: "プリセット",
            samples: "サンプル",

            // Main Navigation Tabs
            microphone: "マイク",
            mixer: "ミキサー",
            configuration: "設定",
            effects: "エフェクト",
            sampler: "サンプラー",
            lighting: "ライティング",
            routing: "ルーティング",
            system: "システム",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "グローバル",
            lightingMixer: "ミキサー",
            lightingEffects: "エフェクト",
            lightingSampler: "サンプラー",
            lightingCough: "咳(Cough)",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "プロファイルとファイル",
            accessibilityDeviceSection: "デバイス設定",
            accessibilityLightingSection: "ライティング設定",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "マイクプロファイル"
            },

            setup: {
                button: "マイク設定",
                title: "マイク設定",
                type: "マイクタイプ",
                gain: "ゲイン",

                // Microphone Types
                xlr: "XLRマイク",
                phantom: "XLR + ファンタム (+{voltage}V)",
                jack: "3.5mm",
            },

            waveform: {
                loud: "大きすぎ",
                good: "良好",
                gate_estimated: "ゲートは推定値です"
            },

            gate: {
                title: "ゲート",
                threshold: "しきい値",
                attenuation: "減衰量",
                attack: "アタック",
                release: "リリース",
            },

            equaliser: {
                title: "イコライザー",
                reset: "リセット",
                enableFineTune: "微調整を有効化",
                bass: "低音",
                mid: "中音",
                treble: "高音",
            },

            compressor: {
                title: "コンプレッサー",
                amount: "量",
                threshold: "しきい値",
                ratio: "レシオ",
                attack: "アタック",
                release: "リリース",
                makeUpGain: "メイクアップゲイン",
            },

            extras: {
                title: "その他",
                deEsser: "ディエッサー",
                bleep: "ビープ",
            }
        },

        mixer: {
            // Box Headers
            inputs: "入力",
            outputs: "出力",
            mixAssignment: "ミックス割り当て",

            // Submix Checkbox
            submix: "サブミックス",

            // Mix Assignment
            channelA: "A",
            channelB: "B"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "{channel} にミュート",
                all: "すべてにミュート",

                stream: "@:message.channels.StreamMix にミュート",
                stream1: "@:message.channels.StreamMix1 にミュート",
                stream2: "@:message.channels.StreamMix2 にミュート",
                streams: "@:message.channels.StreamMix 1 + 2 にミュート",
                chatMic: "@:message.channels.ChatMic にミュート",
                headphones: "@:message.channels.Headphones にミュート",
                lineOut: "@:message.channels.LineOut にミュート",
            },
            muteBehaviourTitle: "ミュート動作",
            muteBehaviourLabel: "{channel} のミュート動作",

            // Config for the Faders
            faders: {
                title: "フェーダー",
                channelTitle: "チャンネル",
                sourceTitle: "ソース",
                sourceLabel: "{channel} のソース",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "ホールド",
                    toggle: "トグル",
                },

                title: "Cough ボタン設定",
                behaviourTitle: "ボタン動作",
            }
        },

        effects: {
            preset: {
                title: "プリセット",
                group: "グループ",

                menuLoad: "読み込み",
                menuRename: "名前を変更",
                menuSave: "ライブラリに保存",


                loadPreset: "プリセットを読み込み",

                renamePresetTitle: "プリセット名を変更",
                renamePresetPlaceholder: "新しいプリセット名",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "現在ライブラリにプリセットがありません。保存またはコピーするとここに表示されます。",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "プリセット読み込みの確認",
                confirmMessage: "このプリセットを読み込むと、このエフェクトバンクの未保存の変更が置き換えられます。続行しますか？",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "プリセット上書きの確認",
                overwriteMessage: "プリセット {current} は既にライブラリに存在します。上書きしますか？",
                overwriteConfirm: "上書き",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "プリセットディレクトリを開く",
                accessibilityPresetLoaded: "プリセット {name} を {bank} に読み込みました",
                accessibilityPresetSaved: "プリセット {name} をライブラリに保存しました",
            },
            reverb: {
                title: "リバーブ",
                style: "スタイル",

                styles: {
                    library: "ライブラリ",
                    darkBloom: "ダークブルーム",
                    musicClub: "ミュージッククラブ",
                    realPlate: "リアルプレート",
                    chapel: "チャペル",
                    hockeyArena: "ホッケーアリーナ"
                },

                amount: "量",
                decay: "ディケイ",
                earlyLevel: "アーリーレベル",
                tailLevel: "テールレベル",
                preDelay: "プリディレイ",
                lowColour: "ローカラー",
                highColour: "ハイカラー",
                highFactor: "ハイファクター",
                diffuse: "ディフューズ",
                modSpeed: "モッドスピード",
                modDepth: "モッドデプス"
            },

            echo: {
                title: "エコー",

                style: "スタイル",
                styles: {
                    quarter: "4分",
                    eighth: "8分",
                    triplet: "3連符",
                    pingPong: "ピンポン",
                    classicSlap: "クラシックスラップ",
                    multiTap: "マルチタップ"
                },

                amount: "量",
                feedback: "フィードバック",
                tempo: "テンポ",
                delayLeft: "ディレイ L",
                delayRight: "ディレイ R",
                feedbackLeft: "フィードバック L",
                feedbackRight: "フィードバック R",
                xfbLeftToRight: "XFB L→R",
                xfbRightToLeft: "XFB R→L",
            },

            pitch: {
                title: "ピッチ",

                style: "スタイル",
                styles: {
                    narrow: "ナロー",
                    wide: "ワイド"
                },

                amount: "量",
                character: "キャラクター"
            },

            gender: {
                title: "ジェンダー",

                style: "スタイル",
                styles: {
                    narrow: "ナロー",
                    medium: "ミディアム",
                    wide: "ワイド"
                },

                amount: "量"
            },

            megaphone: {
                title: "メガホン",

                style: "スタイル",
                styles: {
                    megaphone: "メガホン",
                    radio: "ラジオ",
                    onThePhone: "電話",
                    overdrive: "オーバードライブ",
                    buzzCutt: "バズカット",
                    tweed: "ツイード"
                },

                amount: "量",
                postGain: "ポストゲイン"
            },

            robot: {
                title: "ロボット",

                style: "スタイル",
                styles: {
                    robot1: "ロボット 1",
                    robot2: "ロボット 2",
                    robot3: "ロボット 3",
                },

                lowGain: "低域ゲイン",
                lowFrequency: "低域周波数",
                lowWidth: "低域幅",
                midGain: "中域ゲイン",
                midFrequency: "中域周波数",
                midWidth: "中域幅",
                highGain: "高域ゲイン",
                highFrequency: "高域周波数",
                highWidth: "高域幅",
                waveform: "波形",
                pulseWidth: "パルス幅",
                threshold: "しきい値",
                dryMix: "ドライミックス",
            },

            hardTune: {
                title: "ハードチューン",

                style: "スタイル",
                styles: {
                    natural: "ナチュラル",
                    medium: "ミディアム",
                    hard: "ハード"
                },

                amount: "量",
                rate: "レート",
                window: "ウィンドウ",

                source: "ソース"
            }
        },

        sampler: {
            bankTitle: "バンク",
            banks: {
                bankTitle: "バンク",
                bank: {
                    a: "A",
                    b: "B",
                    c: "C"
                },
                buttonTitle: "ボタン",
                buttonLabel: "バンク {activeBank} のボタン",
                buttons: {
                    topLeft: "左上",
                    topRight: "右上",
                    bottomLeft: "左下",
                    bottomRight: "右下",
                },

                functionTitle: "機能",
                functionLabel: "バンク {activeBank} の {activeButton} ボタンの機能",
                functions: {
                    playNext: "再生 / 次へ",
                    playStop: "再生 / 停止",
                    playFade: "再生 / フェードアウト",
                    stopOnRelease: "離すと停止",
                    fadeOnRelease: "離すとフェード",
                    loop: "ループ"
                },

                playOrderTitle: "再生順",
                playOrderLabel: "バンク {activeBank} の {activeButton} ボタンの再生順",
                playOrders: {
                    sequential: "順次",
                    random: "ランダム",
                },
            },

            samplesTitle: "サンプル",
            samples: {
                samplesTitle: "サンプル",
                samplesLabel: "バンク {activeBank} の {activeButton} ボタンのサンプル",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "サンプルを追加",
                sampleSelector: {
                    parentDirectory: "親ディレクトリ",
                    addButton: "追加",

                    noSamples: "現在サンプルフォルダーにサンプルがありません。ここで選択できるようにいくつかコピーしてください！",

                    // Used with Screen Readers
                    directories: "ディレクトリ",
                    samples: "サンプル",
                },

                gain: "ゲイン",
                waveform: {
                    title: "波形",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "{sample} の波形",

                    // The Play / Stop button before the waveform
                    playbackSample: "サンプルを再生",
                    stopSample: "サンプルを停止",

                    // Labels for the draggable 'Handles'
                    sampleStart: "サンプル開始",
                    sampleEnd: "サンプル終了",

                    sampleDeleted: "サンプル {sampleName} をバンク {activeBank} の {activeButton} ボタンから削除しました",
                    zoomLevel: "ズームレベル: {level}",
                },

                addSampleWaitTitle: "お待ちください",
                addSampleAnalysing: "サンプルを解析しています。お待ちください。",
                addSampleProgress: "進捗: {progress}@:message.suffixes.percentage",

                errorTitle: "サンプル追加エラー",
                errorText: "サンプルをバンクに追加中にエラーが発生しました:",
                genericError: "不明なエラーが発生しました。",

                accessibilityOpenSamplesDirectory: "サンプルディレクトリを開く",
                accessibilityAnalysing: "サンプルを解析しています。しばらくお待ちください。この処理には数分かかる場合があります。",
                accessibilityAdded: "サンプル {name} をバンク {activeBank} の {activeButton} ボタンに追加しました。"
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "カラー",

                activeColour: "アクティブ",
                inactiveColour: "非アクティブ",

                inactiveOption: "非アクティブ時のオプション",
                inactiveOptions: {
                    dimActiveColour: "アクティブカラーを暗く",
                    inactiveColour: "非アクティブカラー",
                    dimInactiveColour: "非アクティブカラーを暗く"

                },

                applyToAll: "すべてに適用",
            },

            global: {
                areas: {
                    title: "エリア",

                    area: "エリア",
                    areas: {
                        global: "グローバル",
                        accent: "アクセント",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "アニメーション",

                    mode: "アニメーションモード",
                    modes: {
                        none: "なし",
                        rainbowRetro: "レインボー レトロ",
                        rainbowBright: "レインボー ブライト",
                        rainbowDark: "レインボー ダーク",
                        simple: "シンプル",
                        ripple: "リップル",
                    },

                    mod1: "グラデーション Mod 1",
                    mod2: "グラデーション Mod 2",

                    waterfall: "ウォーターフォール設定",
                    waterfallOff: "オフ",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "フェーダー",

                    style: "スタイル",
                    styles: {
                        gradient: "グラデーション",
                        meter: "メーター",
                    },

                    bottomColour: "下部カラー",
                    topColour: "上部カラー",

                    accessibilityTitle: "{channel} のフェーダー設定",
                },

                screen: {
                    title: "スクリーン",
                    backgroundColour: "背景色",
                    icons: "アイコン",
                    iconNone: "-- なし --",

                    optionsTitle: "オプション",
                    options: {
                        showNumber: "番号を表示",
                        invertDisplay: "表示を反転",
                        text: "テキスト",

                        accessibilityText: "GoXLRのスクリーンに表示するテキスト"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "ミュート",
                    accessibilityTitle: "{channel} のミュート設定"
                }
            },

            effects: {
                preset: {
                    title: "プリセットボタン",
                    presetTitle: "プリセット"
                },

                encoders: {
                    title: "エンコーダー",

                    encoder: "エンコーダー",
                    encoders: {
                        reverb: "リバーブ",
                        echo: "エコー",
                        pitch: "ピッチ",
                        gender: "ジェンダー",
                    },

                    leftColour: "左カラー",
                    rightColour: "右カラー",
                    knobColour: "ノブカラー"
                },

                buttons: {
                    title: "エフェクトボタン",

                    effectTitle: "エフェクト",
                    effect: {
                        megaphone: "メガホン",
                        robot: "ロボット",
                        hardTune: "ハードチューン",
                        fx: "Fx"
                    }
                },
            },
            sampler: {
                title: "バンク",

                buttonsTitle: "ボタン",
                buttons: {
                    a: "A",
                    b: "B",
                    c: "C"
                },

                active: "アクティブ / 読込済",
                empty: "サンプルなし",
                inactive: "非アクティブなバンク",
            },

            cough: {
                title: "Cough/Bleep ボタン",

                buttonsTitle: "ボタン",
                buttons: {
                    bleep: "ビープ",
                    cough: "咳(Cough)",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "ルーティング",

            input: "入力",
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

            output: "出力",
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
            title: "システム",

            powerButton: "電源アクション",
            power: {
                shutdownTitle: "シャットダウン時のアクション",
                shutdownDescription: "これらのアクションはGoXLR Utilityが安全にシャットダウンされる際に実行されます。",

                sleepTitle: "スリープ時のアクション",
                sleepDescription: "これらのアクションはシステムがスリープに入る際に実行されます。",

                wakeTitle: "復帰時のアクション",
                wakeDescription: "これらのアクションはシステムがスリープから復帰する際に実行されます。",

                settingsError: "設定が手動で変更されたようです。予期しない動作を防ぐため、このセクションは無効化されています。シャットダウンアクションを完全にリセットするには、下のボタンを押してください",
                settingsReset: "シャットダウンアクションをリセット",

                power_options: {
                    reload: "設定を再読み込み",
                    saveProfile: "プロファイルを保存",
                    loadProfile: "フルプロファイルを読み込み",
                    loadColourProfile: "プロファイルのカラーを読み込み",
                    saveMicProfile: "マイクプロファイルを保存",
                    loadMicProfile: "マイクプロファイルを読み込み",
                }
            },

            deviceButton: "デバイス設定",
            device: {
                holdDuration: "ミュートボタンを長押しして全ミュートにする時間",
                holdDurationAccessibility: "ミュートボタンを長押しして全チャンネルをミュートするまでの時間（ミリ秒）",

                sampleBuffer: "サンプラー先行録音バッファ（秒）",
                sampleBufferAccessibility: "サンプラーがボタン押下前に録音する時間（秒）",

                voiceDeafen: "ボイスチャットの全ミュート時にマイク→チャットマイクもミュート",
                voiceDeafenAccessibility: "ボイスチャットを全チャンネルにミュートする際、マイク→チャットマイクもミュートします",

                monitorWithFx: "FX状態に合わせてマイクモニタリングを切り替え",
                monitorWithFxAccessibility: "FXが有効なときにマイクモニタリングを有効化します",

                resetSampleFunctionOnClear: "クリア時にサンプル機能をリセット",
                resetSampleFunctionOnClearAccessibility: "クリア時にサンプル機能を「開始 / 次へ」にリセットします",

                lockFaders: "全ミュート時にフェーダー位置をロック",
                lockFadersAccessibility: "全ミュートが有効なときにフェーダーが下がるのを防ぎます",

                samplerFadeDuration: "サンプラーのフェード時間",
                samplerFadeDurationAccessibility: "再生停止時にサンプラーがフェードアウトする時間（ミリ秒）",
            },

            settingsButton: "ユーティリティ設定",
            settings: {
                language: "言語",
                useSystem: "システムの言語を使用（利用可能な場合）",

                uiHandler: "UIハンドラー",
                uiHandlers: {
                    browser: "ブラウザ",
                    app: "アプリ",
                    custom: "カスタム"
                },


                logLevel: "ログレベル（再起動が必要）",
                logLevels: {
                    off: "オフ",
                    error: "エラー",
                    warn: "警告",
                    info: "情報",
                    debug: "デバッグ",
                    trace: "トレース"

                    // OFF / ERROR / WARN / INFO / DEBUG / TRACE
                },

                firmwareSource: "ファームウェア更新チャンネル",
                firmwareSources: {
                    live: "Live",
                    beta: "Beta"
                },

                allowNetworkAccess: "UIのネットワークアクセスを許可（再起動が必要）",
                allowNetworkAccessAccessibility: "ネットワーク上の他のデバイスからUIへのアクセスを許可します",

                autoStart: "ログイン時に自動起動",
                autoStartAccessibility: "ユーザーのログイン時にGoXLR Utilityを起動します",

                showOnLaunch: "起動時にUIを表示",
                showOnLaunchAccessibility: "起動時に自動的にUIを表示します",

                showTray: "トレイアイコンを表示（再起動が必要）",
                showTrayAccessibility: "システムトレイにGoXLR Utilityのアイコンを表示します",

                ttsOnButton: "ボタン押下時にTTS（読み上げ）",
                ttsOnButtonAccessibility: "ボタン押下時に、スクリーンリーダーまたはシステムTTSでボタンの状態を読み上げます",

                recoverDefaults: "デフォルトに復元",
                recoverOptions: {
                    profiles: "プロファイル",
                    micProfiles: "マイクプロファイル",
                    icons: "アイコン",
                    presets: "プリセット"
                },

                shutdownUtility: "GoXLR Utilityをシャットダウン",

                shutdownConfirmTitle: "本当によろしいですか？",
                shutdownConfirmMessage: "GoXLR Utilityをシャットダウンしてもよろしいですか？",

                settingsRegionAccessibility: "設定",

                macosAggregateManagement: "macOSのアグリゲート管理を無効化（再起動が必要）",
                macosAggregateManagementAccessibility: "macOSでのユーティリティによるアグリゲート管理を無効化します（再起動が必要）",
            },

            aboutButton: "GoXLRについて",
            about: {
                serial: "シリアル",
                utilityVersion: "ユーティリティ バージョン",
                driverVersion: "ドライバー バージョン",
                hardwareVersion: "ハードウェア バージョン",

                firmware: "ファームウェア",
                dice: "DICE",
                fpga: "FPGA",
            },

            firmwareUpdateButton: {
                update: "ファームウェアを更新",
                downgrade: "ファームウェアをダウングレード",
                reinstall: "ファームウェアを再インストール",
                custom: "カスタムファームウェア",
            },
            firmwareUpdate: {
                newVersionAvailable: "新しいファームウェアバージョン（{latestVersion}）がお使いのデバイスに利用可能です。\n今すぐデバイスを更新しますか？",
                currentVersionIsNewer: "現在のファームウェアバージョン（{currentVersion}）は、お使いのデバイスで利用可能な最新のファームウェアバージョン（{latestVersion}）より新しいです。\n最新のファームウェアバージョンにダウングレードしますか？",
                currentIsUpToDate: "ファームウェアは既に最新です。\n現在のファームウェアバージョンを再インストールしますか？",
                customFirmware: "カスタムファームウェアをインストールしようとしています。\n知識がない場合は推奨されません。\n続行してもよろしいですか？",

                warning: "デバイスに新しいファームウェアバージョンを書き込もうとしています。\nGoXLR Utilityの開発者は、この処理によって生じるいかなる損害についても責任を負いません。 ",
                warningInfo: "詳細",

                betaWarning: "ベータ版ファームウェアをインストールしようとしています。\nこのバージョンは公式サポートを受けられず、修正できないバグや問題が含まれる可能性があります。",

                updatePaused: "ファームウェアバージョン {version} をインストールしようとしています。続行してもよろしいですか？",
                updateInProgress: "ファームウェア更新中です。お待ちいただき、デバイスを取り外さないでください！",
                completed: "ファームウェア更新が正常に完了しました。",
                failed: "ファームウェア更新中に問題が発生しました。もう一度お試しください。",

                changelog: "バージョン {version} の変更履歴:",
                title: "ファームウェアをインストール中...",

                progress: {
                    starting: "開始中...",
                    manifest: "マニフェストを取得中...",
                    download: "ファームウェアをダウンロード中...",
                    pause: "更新を一時停止",
                    clearNVR: "更新パーティションを準備中...",
                    uploadFirmware: "ファームウェアをアップロード中...",
                    validateUpload: "アップロードされたファームウェアを検証中...",
                    hardwareWrite: "ファームウェアを書き込み中...",
                    hardwareValidate: "ファームウェアを検証中...",
                    complete: "更新完了",
                    failed: "ファームウェア更新に失敗しました",
                }
            },

            licenses: "ライセンス",
            help: "ヘルプ",
        },

        deviceSelector: {
            title: "デバイスを選択",
            connecting: "GoXLR Utilityへの接続を試みています..",
            disconnected: "GoXLR Utilityに接続できません。起動しているか確認してください。\n\nこのページは自動的に再接続を試みます..",
            noDevices: "GoXLRデバイスが見つかりません",
        },

        versionCheck: {
            updateAvailable: "更新があります",
            firmwareDirectionAvailable: "ファームウェアの{direction}があります",
            firmwareDirections: {
                update: "更新",
                downgrade: "ダウングレード",
                unknown: "不明",
            },
            incompatibleDriver: "インストールされているドライバーはこのファームウェアと互換性がありません。最新のドライバーをダウンロードするにはここをクリックしてください。",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "プロファイル {profileName} を保存",
            createProfile: "プロファイルを作成",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "新しいプロファイルの元",
            newQuestion: "デフォルトから新しいプロファイルを作成しますか、それとも現在の設定から作成しますか？",
            newDefaultButton: "デフォルト",
            newCurrentButton: "現在の設定",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "上書きの確認",
            overwriteQuestion: "プロファイル {activeProfile} を上書きしてもよろしいですか？",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",

            // Dialog Popup when clicking the 'Delete' Menu Item
            deleteTitle: "削除の確認",
            deleteQuestion: "プロファイル {profileName} を削除してもよろしいですか？",
            deleteYes: "@:message.modalButtons.yes",
            deleteNo: "@:message.modalButtons.no",

            // Dialog prompting for a new Profile Name
            newNameTitle: "新しいプロファイル名を入力",
            newNamePlaceHolder: "新しい名前",
            newNameOk: "@:message.modalButtons.ok",
            newNameCancel: "@:message.modalButtons.cancel",

            // Dialog Popup when attempting to delete the active profile
            deleteCurrentErrorTitle: "削除できません",
            deleteCurrentErrorMessage: "アクティブなプロファイルは削除できません。",

            // Items in the Popup Menu on Profiles
            menuLoadProfile: "プロファイルを読み込み",
            menuLoadProfileColours: "カラーのみ読み込み",
            menuDeleteProfile: "プロファイルを削除",


            // Accessibility Messages (these are announced to screen readers)
            accessibilityLoadedProfile: "プロファイル {profileName} を読み込みました",
            accessibilityLoadedColours: "プロファイル {profileName} のカラーを読み込みました",
            accessibilityCreatedProfile: "プロファイル {profileName} を作成しました",
            accessibilitySavedProfile: "プロファイル {profileName} を保存しました",
            accessibilitySavedProfileAs: "プロファイル {profileName} を {newProfileName} として保存しました",
            accessibilityProfileDeleted: "プロファイル {profileName} を削除しました",
            accessibilityActiveProfile: "アクティブなプロファイル",
            accessibilityDropMenuTitle: "{profileName} のオプション",
            accessibilityOpenProfileDirectory: "プロファイルディレクトリを開く",
            accessibilityOpenMicProfileDirectory: "マイクプロファイルディレクトリを開く",
        },
    }
}
