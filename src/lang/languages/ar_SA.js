/* Check out https://vue-i18n.intlify.dev/guide/essentials/syntax for a syntax guide.

    This export will be directly included in the main structure, with the relevant language flag, all
    that needs to be worried about here are the messages, and any applicable language modifiers.

    Note, this file is for Arabic (Saudi Arabia)

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
/// Muhannad Jarbu J F
///


export default {
    message: {
        // For these, the keys map directly to their GoXLR Channel Names
        channels: {
            All: "الكل",
            Mic: "المايكروفون",
            Chat: "محادثة الصوت",
            Music: "الموسيقى",
            Game: "الألعاب",
            Console: "الكونسول",
            LineIn: "مدخل الصوت ",
            System: "النظام",
            Sample: "العينات الصوتية",
            LineOut: "مخرج الصوت (Line Out)",
            Headphones: "سماعات الرأس",
            MicMonitor: "مراقبة المايكروفون",
            StreamMix: "مزيج البث",
            StreamMix1: "مزيج البث 1",
            StreamMix2: "مزيج البث 2",
            ChatMic: "مايك المحادثة",
            Sampler: "جهاز العينات",
            VOD: "فيديو حسب الطلب (VOD)",
        },

        faders: {
            A: "القناة 1",
            B: "القناة 2",
            C: "القناة 3",
            D: "القناة 4"
        },

        suffixes: {
            decibels: "ديسيبل",
            percentage: "%",
            milliseconds: "ملي ثانية",
            hertz: "هرتز",
            kilohertz: "كيلوهرتز",
            ratio: ":{value}",
            beatsPerMinute: "نبضة في الدقيقة (BPM)",
        },

        modalButtons: {
            ok: "موافق",
            yes: "نعم",
            no: "لا",
            cancel: "إلغاء",
            continue: "متابعة",
            close: "إغلاق",
        },

        common: {
            close: "إغلاق",
            clear: "مسح",
            collapseSection: "طي القسم",
            expandSection: "توسيع القسم",
            activeProfile: "الملف النشط",
            switchDevice: "تبديل الجهاز",
            removeSample: "إزالة العينة",
            waterfallAnimationUp: "تأثير الشلال للأعلى",
            waterfallAnimationDown: "تأثير الشلال للأسفل",
            unknown: "غير معروف",
            tabList: "قائمة التبويبات",
        },

        // These Strings appear in the tabs throughout the pages
        navigation: {
            // Tabs at the top of the Page
            profiles: "الملفات الشخصية",
            presets: "التأثيرات الجاهزة",
            samples: "العينات الصوتية",

            // Main Navigation Tabs
            microphone: "المايكروفون",
            mixer: "الخلاط (Mixer)",
            configuration: "الإعدادات التكوينية",
            effects: "التأثيرات (FX)",
            sampler: "السامبلر",
            lighting: "الإضاءة",
            routing: "توجيه الصوت (Routing)",
            system: "النظام",

            // Navigation Sections on the Lighting Page
            lightingGlobal: "عام",
            lightingMixer: "الخلاط (Mixer)",
            lightingEffects: "التأثيرات (FX)",
            lightingSampler: "السامبلر",
            lightingCough: "السعال/الكتم",

            // Accessibility Messages (these are announced to screen readers)
            accessibilityProfileSection: "الملفات والملفات الشخصية",
            accessibilityDeviceSection: "إعدادات الجهاز",
            accessibilityLightingSection: "إعدادات الإضاءة",
        },

        // Strings that appear in the Mic tab, note that the Profile Strings are handled in 'profileManager'
        microphone: {
            profiles: {
                title: "ملفات المايكروفون"
            },

            setup: {
                button: "إعداد المايكروفون",
                title: "إعداد المايكروفون",
                type: "نوع المايكروفون",
                gain: "مستوى الكسب (Gain)",

                // Microphone Types
                xlr: "مايكروفون XLR",
                phantom: "XLR + طاقة فانتوم (+{voltage}V)",
                jack: "منفذ 3.5 ملم",
            },

            waveform: {
                loud: "مرتفع جداً",
                good: "ممتاز",
                gate_estimated: "تقدير بوابة الضوضاء (Gate)"
            },

            gate: {
                title: "بوابة الضوضاء (Gate)",
                threshold: "العتبة (Threshold)",
                attenuation: "التخميد (Attenuation)",
                attack: "الهجوم (Attack)",
                release: "التلاشي (Release)",
            },

            equaliser: {
                title: "موازن الصوت (EQ)",
                reset: "إعادة تعيين",
                enableFineTune: "تفعيل الضبط الدقيق",
                bass: "الضخامة (Bass)",
                mid: "الترددات المتوسطة (Mid)",
                treble: "الحدة (Treble)",
            },

            compressor: {
                title: "الضاغط (Compressor)",
                amount: "النسبة الإجمالية",
                threshold: "العتبة (Threshold)",
                ratio: "معدل الضغط (Ratio)",
                attack: "الهجوم (Attack)",
                release: "التلاشي (Release)",
                makeUpGain: "تعويض الكسب (Make-Up Gain)",
            },

            extras: {
                title: "إضافات",
                deEsser: "مزيل الصفير (De-Esser)",
                bleep: "صوت الرقابة (Bleep)",
            }
        },

        mixer: {
            // Box Headers
            inputs: "المدخلات",
            outputs: "المخرجات",
            mixAssignment: "تعيين المزيج",

            // Submix Checkbox
            submix: "المزيج الفرعي (Submixes)",

            // Mix Assignment
            channelA: "أ",
            channelB: "ب"
        },

        // Strings in the Configuration Tab
        configuration: {
            // This is common between Faders and Cough Buttons
            mute_behaviour: {
                base: "كتم لـ {channel}",
                all: "كتم للكل",

                stream: "كتم لـ @:message.channels.StreamMix",
                stream1: "كتم لـ @:message.channels.StreamMix1",
                stream2: "كتم لـ @:message.channels.StreamMix2",
                streams: "كتم لـ @:message.channels.StreamMix 1 + 2",
                chatMic: "كتم لـ @:message.channels.ChatMic",
                headphones: "كتم لـ @:message.channels.Headphones",
                lineOut: "كتم لـ @:message.channels.LineOut",
            },
            muteBehaviourTitle: "سلوك الكتم",
            muteBehaviourLabel: "سلوك الكتم لـ {channel}",

            // Config for the Faders
            faders: {
                title: "أشرطة التحكم (Faders)",
                channelTitle: "القناة",
                sourceTitle: "المصدر",
                sourceLabel: "المصدر لـ {channel}",
            },

            // Configuration for the Cough Button
            cough: {
                behaviour: {
                    hold: "ضغط مطول",
                    toggle: "تبديل (كتم/إلغاء)",
                },

                title: "إعدادات زر السعال (كتم مؤقت)",
                behaviourTitle: "سلوك الزر",
            }
        },

        effects: {
            preset: {
                title: "التأثير الجاهز",
                group: "المجموعة",

                menuLoad: "تحميل",
                menuRename: "إعادة تسمية",
                menuSave: "حفظ في المكتبة",


                loadPreset: "تحميل التأثير الجاهز",

                renamePresetTitle: "إعادة تسمية التأثير",
                renamePresetPlaceholder: "اسم التأثير الجديد",
                renamePresetOk: "@:message.modalButtons.ok",
                renamePresetCancel: "@:message.modalButtons.cancel",

                noPresets: "لا توجد أي تأثيرات جاهزة في المكتبة حالياً، احفظ أو انسخ بعضاً منها لتظهر هنا.",
                loadPresetOk: "@:message.modalButtons.ok",

                confirmTitle: "تأكيد تحميل التأثير الجاهز",
                confirmMessage: "تحميل هذا التأثير سيلغي أي تعديلات غير محفوظة على بنك التأثيرات الحالي، هل تريد الاستمرار؟",
                confirmOk: "@:message.modalButtons.ok",
                confirmCancel: "@:message.modalButtons.cancel",

                overwriteTitle: "تأكيد استبدال الملف",
                overwriteMessage: "التأثير {current} موجود بالفعل في مكتبتك، هل تريد استبداله؟",
                overwriteConfirm: "استبدال",
                overwriteCancel: "@:message.modalButtons.cancel",

                accessibilityOpenPresetDirectory: "فتح مجلد التأثيرات الجاهزة",
                accessibilityPresetLoaded: "تم تحميل التأثير الجاهز {name} إلى البنك {bank}",
                accessibilityPresetSaved: "تم حفظ التأثير الجاهز {name} في المكتبة",
            },
            reverb: {
                title: "الصدى الارتدادي (Reverb)",
                style: "النمط",

                styles: {
                    library: "المكتبة",
                    darkBloom: "الازدهار المظلم (Dark Bloom)",
                    musicClub: "نادي موسيقي",
                    realPlate: "صفيحة حقيقية",
                    chapel: "مصلى صغير",
                    hockeyArena: "حلبة الهوكي"
                },

                amount: "النسبة",
                decay: "الاضمحلال",
                earlyLevel: "المستوى الأولي",
                tailLevel: "المستوى الخلفي",
                preDelay: "التأخير المسبق",
                lowColour: "اللون المنخفض",
                highColour: "اللون المرتفع",
                highFactor: "العامل المرتفع",
                diffuse: "الانتشار",
                modSpeed: "سرعة التعديل",
                modDepth: "عمق التعديل"
            },

            echo: {
                title: "الصدى التكراري (Echo)",

                style: "النمط",
                styles: {
                    quarter: "ربع درجة",
                    eighth: "ثمن درجة",
                    triplet: "ثلاثي الأبعاد",
                    pingPong: "بينغ بونغ",
                    classicSlap: "صفعة كلاسيكية",
                    multiTap: "متعدد النقرات"
                },

                amount: "النسبة",
                feedback: "التغذية الراجعة",
                tempo: "الإيقاع (Tempo)",
                delayLeft: "تأخير اليسار L",
                delayRight: "تأخير اليمين R",
                feedbackLeft: "تغذية راجعة اليسار L",
                feedbackRight: "تغذية راجعة اليمين R",
                xfbLeftToRight: "تغذية متقاطعة من L إلى R",
                xfbRightToLeft: "تغذية متقاطعة من R إلى L",
            },

            pitch: {
                title: "طبقة الصوت (Pitch)",

                style: "النمط",
                styles: {
                    narrow: "ضيق",
                    wide: "واسع"
                },

                amount: "النسبة",
                character: "السمة الصوتية"
            },

            gender: {
                title: "الجنس (Gender)",

                style: "النمط",
                styles: {
                    narrow: "ضيق",
                    medium: "متوسط",
                    wide: "واسع"
                },

                amount: "النسبة"
            },

            megaphone: {
                title: "مكبر الصوت (Megaphone)",

                style: "النمط",
                styles: {
                    megaphone: "مكبر صوت يدوي",
                    radio: "راديو",
                    onThePhone: "على الهاتف",
                    overdrive: "تضخيم إلكتروني",
                    buzzCutt: "صوت الطنين",
                    tweed: "صوف قديم"
                },

                amount: "النسبة",
                postGain: "الكسب اللاحق"
            },

            robot: {
                title: "الروبوت (Robot)",

                style: "النمط",
                styles: {
                    robot1: "روبوت 1",
                    robot2: "روبوت 2",
                    robot3: "روبوت 3",
                },

                lowGain: "الكسب المنخفض",
                lowFrequency: "التردد المنخفض",
                lowWidth: "العرض المنخفض",
                midGain: "الكسب المتوسط",
                midFrequency: "التردد المتوسط",
                midWidth: "العرض المتوسط",
                highGain: "الكسب المرتفع",
                highFrequency: "التردد المرتفع",
                highWidth: "العرض المرتفع",
                waveform: "الموجة الصوتية",
                pulseWidth: "عرض النبضة",
                threshold: "العتبة",
                dryMix: "المزيج النقي (Dry)",
            },

            hardTune: {
                title: "مصحح النغمة التلقائي (Hard Tune)",

                style: "النمط",
                styles: {
                    natural: "طبيعي",
                    medium: "متوسط",
                    hard: "قوي"
                },

                amount: "النسبة",
                rate: "المعدل",
                window: "النطاق (Window)",

                source: "المصدر"
            }
        },

        sampler: {
            bankTitle: "البنك",
            banks: {
                bankTitle: "البنك",
                bank: {
                    a: "أ (A)",
                    b: "ب (B)",
                    c: "ج (C)"
                },
                buttonTitle: "الزر",
                buttonLabel: "زر للبنك {activeBank}",
                buttons: {
                    topLeft: "أعلى اليسار",
                    topRight: "أعلى اليمين",
                    bottomLeft: "أسفل اليسار",
                    bottomRight: "أسفل اليمين",
                },

                functionTitle: "الوظيفة",
                functionLabel: "الوظيفة للزر {activeButton} في البنك {activeBank}",
                functions: {
                    playNext: "تشغيل / التالي",
                    playStop: "تشغيل / إيقاف",
                    playFade: "تشغيل / تلاشي للتدريج",
                    stopOnRelease: "إيقاف عند الإفلات",
                    fadeOnRelease: "تلاشي عند الإفلات",
                    loop: "تكرار مستمر"
                },

                playOrderTitle: "ترتيب التشغيل",
                playOrderLabel: "ترتيب التشغيل للزر {activeButton} في البنك {activeBank}",
                playOrders: {
                    sequential: "تتابعي",
                    عشوائي: "Random",
                },
            },

            samplesTitle: "العينات الصوتية",
            samples: {
                samplesTitle: "العينات الصوتية",
                samplesLabel: "العينة للزر {activeButton} في البنك {activeBank}",

                // Button at the bottom of the Sample List
                addSample: "+",
                addSampleLabel: "إضافة عينة صوتية",
                sampleSelector: {
                    parentDirectory: "المجلد الأب",
                    addButton: "إضافة",

                    noSamples: "لا توجد عينات في مجلد العينات حالياً. يرجى نسخ بعضها لتتمكن من اختيارها هنا!",

                    // Used with Screen Readers
                    directories: "المجلدات",
                    samples: "العينات الصوتية",
                },

                gain: "الكسب (Gain)",
                waveform: {
                    title: "شكل الموجة",

                    // These are primarily for accessibility, but are labels on the various buttons.
                    text: "شكل الموجة لـ {sample}",

                    // The Play / Stop button before the waveform
                    playbackSample: "تشغيل العينة",
                    stopSample: "إيقاف العينة",

                    // Labels for the draggable 'Handles'
                    sampleStart: "بداية العينة",
                    sampleEnd: "نهاية العينة",

                    sampleDeleted: "تم حذف العينة {sampleName} من الزر {activeButton} في البنك {activeBank}",
                    zoomLevel: "مستوى التكبير: {level}",
                },

                addSampleWaitTitle: "يرجى الانتظار",
                addSampleAnalysing: "يرجى الانتظار بينما يتم تحليل العينة الصوتية.",
                addSampleProgress: "التقدم: {progress}@:message.suffixes.percentage",

                errorTitle: "خطأ في إضافة العينة",
                errorText: "حدث خطأ أثناء إضافة العينة الصوتية إلى البنك:",
                genericError: "حدث خطأ غير معروف.",

                accessibilityOpenSamplesDirectory: "فتح مجلد العينات الصوتية",
                accessibilityAnalysing: "يرجى الانتظار، جاري تحليل العينة. قد تستغرق هذه العملية بضع دقائق.",
                accessibilityAdded: "تمت إضافة العينة {name} إلى الزر {activeButton} في البنك {activeBank}."
            }
        },

        lighting: {
            // These are some common strings that are used in multiple places
            common: {
                colour: "اللون",

                activeColour: "النشط",
                inactiveColour: "غير النشط",

                inactiveOption: "خيارات غير النشط",
                inactiveOptions: {
                    dimActiveColour: "تعتيم اللون النشط",
                    inactiveColour: "اللون غير النشط",
                    dimInactiveColour: "تعتيم اللون غير النشط"

                },

                applyToAll: "تطبيق على الكل",
            },

            global: {
                areas: {
                    title: "المناطق",

                    area: "المنطقة",
                    areas: {
                        global: "عام",
                        accent: "اللمسة الجمالية (Accent)",
                    },

                    colour: "@:message.lighting.common.colour",
                },

                animations: {
                    title: "الرسوم التعبيرية (Animations)",

                    mode: "نمط الحركة",
                    modes: {
                        none: "بدون تأثير",
                        rainbowRetro: "قوس قزح كلاسيكي",
                        rainbowBright: "قوس قزح زاهي",
                        rainbowDark: "قوس قزح داكن",
                        simple: "بسيط",
                        ripple: "تموج (Ripple)",
                    },

                    mod1: "تعديل التدرج 1",
                    mod2: "تعديل التدرج 2",

                    waterfall: "إعدادات تأثير الشلال",
                    waterfallOff: "إيقاف تشغيل التدرج المائي",
                }
            },

            mixer: {
                faders: {
                    title: "@:message.configuration.faders.title",
                    channelTitle: "@:message.configuration.faders.channel",
                },

                fader: {
                    title: "شريط التحكم (Fader)",

                    style: "النمط",
                    styles: {
                        gradient: "تدرج لوني",
                        meter: "مقياس الإشارة (Meter)",
                    },

                    bottomColour: "اللون السفلي",
                    topColour: "اللون العلوي",

                    accessibilityTitle: "إعدادات شريط التحكم لقناة {channel}",
                },

                screen: {
                    title: "الشاشة",
                    backgroundColour: "لون الخلفية",
                    icons: "الأيقونات",
                    iconNone: "-- بدون أيقونة --",

                    optionsTitle: "الخيارات",
                    options: {
                        showNumber: "عرض الرقم",
                        invertDisplay: "عكس العرض",
                        text: "النص",

                        accessibilityText: "النص المعروض على شاشة الـ GoXLR"
                    }
                },

                mute: {
                    // Pretty much all other fields for this area come from 'Common'
                    title: "الكتم",
                    accessibilityTitle: "إعدادات الكتم لقناة {channel}"
                }
            },

            effects: {
                preset: {
                    title: "أزرار التأثيرات الجاهزة",
                    presetTitle: "التأثير الجاهز"
                },

                encoders: {
                    title: "الفرّارات اللامتناهية (Encoders)",

                    encoder: "الفرّار",
                    encoders: {
                        reverb: "الصدى الارتدادي",
                        echo: "الصدى التكراري",
                        pitch: "طبقة الصوت",
                        gender: "الجنس",
                    },

                    leftColour: "اللون الأيسر",
                    rightColour: "اللون الأيمن",
                    knobColour: "لون المقبض الدائري"
                },

                buttons: {
                    title: "أزرار التأثيرات",

                    effectTitle: "التأثير",
                    effect: {
                        megaphone: "مكبر الصوت",
                        robot: "الروبوت",
                        hardTune: "الهارديون",
                        fx: "المؤثرات الصوتية"
                    }
                },
            },
            sampler: {
                title: "البنك",

                buttonsTitle: "الأزرار",
                buttons: {
                    a: "أ (A)",
                    b: "ب (B)",
                    c: "ج (C)"
                },

                active: "نشط / محمل",
                empty: "العينة فارغة",
                inactive: "بنك غير نشط",
            },

            cough: {
                title: "أزرار السعال وكتم الرقابة",

                buttonsTitle: "الأزرار",
                buttons: {
                    bleep: "الرقابة (Bleep)",
                    cough: "السعال (كتم)",
                }
            },
        },

        routing: {
            // There are (frustratingly) some minor differences between how channels appear in the routing table,
            // and how they appear in the Mixer, these changes also fall under the hood at the Utility level, so
            // we'll define all the channels here, and 'fix' anything which needs adjustment.
            title: "جدول التوجيه (Routing)",

            input: "المدخلات",
            inputs: {
                Microphone: "@:message.channels.Mic",
                Chat: "محادثة الصوت",
                Music: "@:message.channels.Music",
                Game: "@:message.channels.Game",
                Console: "@:message.channels.Console",
                LineIn: "@:message.channels.LineIn",
                System: "@:message.channels.System",
                Samples: "@:message.channels.Sample",
            },

            output: "المخرجات",
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
            title: "النظام",

            powerButton: "إجراء الطاقة",
            power: {
                shutdownTitle: "إجراءات إيقاف التشغيل",
                shutdownDescription: "سيتم تنفيذ هذه الإجراءات بمجرد إغلاق أداة GoXLR بأمان.",

                sleepTitle: "إجراءات السكون (Sleep)",
                sleepDescription: "سيتم تنفيذ هذه الإجراءات عندما يدخل النظام في وضع السكون.",

                wakeTitle: "إجراءات الاستيقاظ (Wake)",
                wakeDescription: "سيتم تنفيذ هذه الإجراءات فور استيقاظ جهازك من وضع السكون.",

                settingsError: "يبدو أنه قد تم تعديل التكوين يدوياً. لمنع حدوث سلوكيات غير متوقعة، تم تعطيل هذا القسم. لإعادة تعيين إجراءات إيقاف التشغيل بالكامل، اضغط الزر أدناه.",
                settingsReset: "إعادة تعيين إجراءات إيقاف التشغيل",

                power_options: {
                    reload: "إعادة تحميل الإعدادات",
                    saveProfile: "حفظ الملف الشخصي",
                    loadProfile: "تحميل الملف الشخصي الكامل",
                    loadColourProfile: "تحميل ألوان الملف الشخصي",
                    saveMicProfile: "حفظ ملف المايكروفون",
                    loadMicProfile: "تحميل ملف المايكروفون",
                }
            },

            deviceButton: "إعدادات الجهاز",
            device: {
                holdDuration: "مدة الضغط على زر الكتم لكتم جميع القنوات",
                holdDurationAccessibility: "المدة الزمنية بالملي ثانية المطلوبة للضغط المستمر على زر الكتم لتطبيق الكتم لجميع القنوات",

                sampleBuffer: "مخزن ما قبل التسجيل للسامبلر (بالثواني)",
                sampleBufferAccessibility: "المدة بالثواني التي سيقوم السامبلر بتسجيلها تلقائياً قبل قيامك بالضغط على الزر",

                voiceDeafen: "كتم الجميع في المحادثة الصوتية يكتم المايك أيضاً",
                voiceDeafenAccessibility: "عند كتم المحادثة الصوتية لجميع القنوات، يتم كتم مايكروفونك الموجه لمحادثة الصوت أيضاً",

                monitorWithFx: "ربط مراقبة المايكروفون بحالة تفعيل المؤثرات (FX)",
                monitorWithFxAccessibility: "يقوم بتنشيط مراقبة المايك فور تفعيل الـ FX",

                resetSampleFunctionOnClear: "إعادة تعيين وظيفة العينة عند المسح",
                resetSampleFunctionOnClearAccessibility: "يعيد وظيفة العينات الصوتية إلى (البدء / التالي) تلقائياً عند مسحها",

                lockFaders: "قفل موضع أشرطة الصوت عند كتم الكل",
                lockFadersAccessibility: "يمنع أشرطة الصوت من النزول للأسفل عند تفعيل كتم الجميع",

                samplerFadeDuration: "مدة تلاشي صوت العينة",
                samplerFadeDurationAccessibility: "المدة الزمنية بالملي ثانية لتلاشي صوت السامبلر تدريجياً عند إيقاف التشغيل",
            },

            settingsButton: "إعدادات الأداة",
            settings: {
                language: "اللغة",
                useSystem: "استخدام لغة النظام الافتراضية (إذا كانت متوفرة)",

                uiHandler: "معالج واجهة المستخدم",
                uiHandlers: {
                    browser: "المتصفح",
                    app: "التطبيق",
                    custom: "مخصص"
                },


                logLevel: "مستوى تسجيل السجلات (يتطلب إعادة تشغيل)",
                logLevels: {
                    off: "إيقاف التشغيل",
                    error: "الأخطاء فقط (Error)",
                    warn: "التحذيرات (Warn)",
                    info: "المعلومات (Info)",
                    debug: "التصحيح (Debug)",
                    trace: "التتبع الكامل (Trace)"
                },

                firmwareSource: "قناة تحديثات النظام (Firmware)",
                firmwareSources: {
                    live: "الإصدار المستقر الرسمي (Live)",
                    beta: "الإصدار التجريبي (Beta)"
                },

                allowNetworkAccess: "السماح بالوصول للواجهة عبر الشبكة المحليّة (يتطلب إعادة تشغيل)",
                allowNetworkAccessAccessibility: "يسمح بالوصول لواجهة التحكم من خلال الأجهزة الأخرى المتصلة بالشبكة المحلية",

                autoStart: "تشغيل تلقائي عند تسجيل الدخول للويندوز",
                autoStartAccessibility: "تشغيل أداة GoXLR تلقائياً فور تشغيل النظام ودخول المستخدم",

                showOnLaunch: "إظهار الواجهة عند بدء التشغيل",
                showOnLaunchAccessibility: "يفتح واجهة التحكم تلقائياً على الشاشة عند إقلاع البرنامج",

                showTray: "إظهار أيقونة شريط المهام بجانب الساعة (يتطلب إعادة تشغيل)",
                showTrayAccessibility: "يعرض أيقونة أداة GoXLR في منطقة الإشعارات السفلية بنظام ويندوز",

                ttsOnButton: "قراءة النصوص منطوقة (TTS) عند الضغط على الأزرار",
                ttsOnButtonAccessibility: "نطق حالة وتسمية الزر عند الضغط عليه عبر قارئ الشاشة أو محرك تحويل النص إلى كلام بالنظام",

                recoverDefaults: "استعادة القيم الافتراضية",
                recoverOptions: {
                    profiles: "الملفات الشخصية",
                    micProfiles: "ملفات المايكروفون",
                    icons: "الأيقونات",
                    presets: "التأثيرات الجاهزة"
                },

                shutdownUtility: "إيقاف تشغيل أداة GoXLR تماماً",

                shutdownConfirmTitle: "هل أنت متأكد؟",
                shutdownConfirmMessage: "هل تود بالتأكيد إغلاق وإنهاء عمل أداة GoXLR بالكامل؟",

                settingsRegionAccessibility: "الإعدادات العامة",

                macosAggregateManagement: "تعطيل إدارة المجموعات لنظام ماك (يتطلب إعادة تشغيل)",
                macosAggregateManagementAccessibility: "يعطل عمل إدارة مجموعات الأجهزة الصوتية المدمجة في أنظمة ماك",
            },

            aboutButton: "حول GoXLR",
            about: {
                serial: "الرقم التسلسلي (Serial)",
                utilityVersion: "إصدار الأداة (Utility)",
                driverVersion: "إصدار برامج التشغيل (Driver)",
                hardwareVersion: "إصدار العتاد (Hardware)",

                firmware: "النظام البرمجي (Firmware)",
                dice: "DICE",
                fpga: "FPGA",
            },

            firmwareUpdateButton: {
                update: "تحديث النظام (Firmware)",
                downgrade: "تنزيل إصدار النظام",
                reinstall: "إعادة تثبيت النظام",
                custom: "تثبيت نظام مخصص",
            },
            firmwareUpdate: {
                newVersionAvailable: "يتوفر إصدار نظام تشغيل أحدث ({latestVersion}) لجهازك.\nهل ترغب في ترقية وتحديث جهازك الآن؟",
                currentVersionIsNewer: "الإصدار الحالي المثبت لديك ({currentVersion}) أحدث من الإصدار الرسمي الأخير المتوفر للتحميل ({latestVersion}).\nهل تود الرجوع والتراجع للإصدار الرسمي الأخير؟",
                currentIsUpToDate: "نظام جهازك محدث بالفعل لآخر إصدار.\nهل ترغب في إعادة تثبيت نفس الإصدار الحالي مجدداً؟",
                customFirmware: "أنت على وشك تثبيت نسخة نظام مخصصة وغير رسمية.\nلا ننصح بهذا الإجراء بتاتاً إلا إذا كنت تعلم بالضبط عواقب ما تفعله.\nهل ترغب في الاستمرار بالتثبيت المخصص؟",

                warning: "أنت بصدد تثبيت وبرمجة نظام تشغيل جديد لجهاز GoXLR الخاص بك.\nمطورو أداة GoXLR Utility ليسوا مسؤولين عن أي تلف أو عطل قد يصيب جهازك جراء هذه العملية.",
                warningInfo: "مزيد من المعلومات",

                betaWarning: "أنت بصدد تثبيت نظام تشغيل تجريبي (Beta).\nهذا الإصدار لن يتلقى أي دعم فني رسمي وقد يحتوي على أخطاء برمجية لا يمكننا معالجتها.",

                updatePaused: "أنت بصدد تثبيت إصدار النظام {version}. هل ترغب حقاً بالاستمرار؟",
                updateInProgress: "عملية التحديث جارية الآن. يرجى الانتظار وتجنب فصل كابل الجهاز أو إطفائه بأي شكل من الأشكال!",
                completed: "اكتمل تحديث نظام الجهاز بنجاح تام.",
                failed: "حدث خطأ ما أثناء تثبيت التحديث. يرجى إعادة المحاولة من جديد.",

                changelog: "سجل التغييرات للإصدار {version}:",
                title: "جاري تثبيت نظام التشغيل...",

                progress: {
                    starting: "جاري البدء...",
                    manifest: "جاري جلب تفاصيل التحديث (Manifest)...",
                    download: "جاري تحميل ملفات النظام...",
                    pause: "تم تعليق التحديث مؤقتاً",
                    clearNVR: "جاري تحضير قطاع التحديث بالذاكرة...",
                    uploadFirmware: "جاري نقل ملف النظام للجهاز...",
                    validateUpload: "جاري التحقق من صحة الملف المنقول...",
                    hardwareWrite: "جاري كتابة النظام الجديد على عتاد الجهاز...",
                    hardwareValidate: "جاري مطابقة وتدقيق صحة التحديث...",
                    complete: "اكتمل التحديث بنجاح",
                    failed: "فشل إتمام عملية تحديث نظام التشغيل",
                }
            },

            licenses: "التراخيص البرمجية",
            help: "الدعم والمساعدة",
        },

        deviceSelector: {
            title: "تحديد الجهاز الصوتى",
            connecting: "جاري محاولة الاتصال ببرنامج GoXLR Utility..",
            disconnected: "تعذر الاتصال ببرنامج GoXLR Utility، يرجى التحقق من تشغيله على جهازك.\n\nستقوم هذه الصفحة بإعادة المحاولة تلقائياً بشكل مستمر..",
            noDevices: "لم يتم العثور على أية أجهزة GoXLR متصلة",
        },

        versionCheck: {
            updateAvailable: "يتوفر تحديث جديد للبرنامج",
            firmwareDirectionAvailable: "يتوفر {direction} لنظام الجهاز",
            firmwareDirections: {
                update: "ترقية وتحديث",
                downgrade: "رجوع لإصدار سابق",
                unknown: "غير معروف",
            },
            incompatibleDriver: "برامج التشغيل الحالية المثبتة غير متوافقة مع إصدار هذا النظام، اضغط هنا لتحميل أحدث التعريفات المتوافقة.",
        },

        // Strings used in Profile and Microphone Profile Management.
        profileManager: {
            // Accessibility Titles for the buttons at the bottom of the Profile List
            saveProfileName: "حفظ الملف الشخصي {profileName}",
            createProfile: "إنشاء ملف شخصي جديد",

            // Dialog Popup when clicking 'Create Profile' Button
            newTitle: "مصدر الملف الشخصي الجديد",
            newQuestion: "هل ترغب في إنشاء ملف شخصي جديد بناءً على الإعدادات الافتراضية، أم بناءً على تكوينك وإعداداتك الحالية؟",
            newDefaultButton: "الافتراضي",
            newCurrentButton: "الحالي",
            newCancelButton: "@:message.modalButtons.cancel",

            // Dialog Popup when hitting the 'Save Profile' button
            overwriteTitle: "تأكيد استبدال الملف الشخصي",
            overwriteQuestion: "هل أنت متأكد من رغبتك في استبدال وحفظ التعديلات فوق الملف الشخصي {activeProfile}؟",
            overwriteYes: "@:message.modalButtons.yes",
            overwriteNo: "@:message.modalButtons.no",
        }
    }
}
