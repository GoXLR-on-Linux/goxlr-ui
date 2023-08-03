/**
 * CSS selectors for the input capture layer.
 */
export const CaptureSelector = {
    COUGH:                  "#GoXLR .capture #Cough",
    CHANNEL1:               "#GoXLR .capture .mixer #Channel1",
    CHANNEL2:               "#GoXLR .capture .mixer #Channel2",
    CHANNEL3:               "#GoXLR .capture .mixer #Channel3",
    CHANNEL4:               "#GoXLR .capture .mixer #Channel4",
    SAMPLER_BODY:           "#GoXLR .capture .sampler .body",
    SAMPLER_BANK_A:         "#GoXLR .capture .sampler #BankA",
    SAMPLER_BANK_B:         "#GoXLR .capture .sampler #BankB",
    SAMPLER_BANK_C:         "#GoXLR .capture .sampler #BankC",
    EFFECTS_BODY:           "#GoXLR .capture .effects .body",
    EFFECTS_PRESET1:        "#GoXLR .capture .effects #Preset1",
    EFFECTS_PRESET2:        "#GoXLR .capture .effects #Preset2",
    EFFECTS_PRESET3:        "#GoXLR .capture .effects #Preset3",
    EFFECTS_PRESET4:        "#GoXLR .capture .effects #Preset4",
    EFFECTS_PRESET5:        "#GoXLR .capture .effects #Preset5",
    EFFECTS_PRESET6:        "#GoXLR .capture .effects #Preset6",
    GLOBAL:                 "#GoXLR .capture",
    GROUP_MIXER:            "#GoXLR .capture .mixer",
    GROUP_EFFECTS:          "#GoXLR .capture .effects",
    GROUP_SAMPLER:          "#GoXLR .capture .sampler"
}

/**
 CSS selectors for the input highlight layer.
 */
export const HighlightSelector = {
    COUGH:                  "#GoXLR .highlight #Cough",
    CHANNEL1:               "#GoXLR .highlight .channels #Channel1",
    CHANNEL2:               "#GoXLR .highlight .channels #Channel2",
    CHANNEL3:               "#GoXLR .highlight .channels #Channel3",
    CHANNEL4:               "#GoXLR .highlight .channels #Channel4",
    EFFECTS_PRESET1_TAB:    "#GoXLR .highlight .presets #Preset1 .tab",
    EFFECTS_PRESET1_BODY:   "#GoXLR .highlight .presets #Preset1 .body",
    EFFECTS_PRESET2_TAB:    "#GoXLR .highlight .presets #Preset2 .tab",
    EFFECTS_PRESET2_BODY:   "#GoXLR .highlight .presets #Preset2 .body",
    EFFECTS_PRESET3_TAB:    "#GoXLR .highlight .presets #Preset3 .tab",
    EFFECTS_PRESET3_BODY:   "#GoXLR .highlight .presets #Preset3 .body",
    EFFECTS_PRESET4_TAB:    "#GoXLR .highlight .presets #Preset4 .tab",
    EFFECTS_PRESET4_BODY:   "#GoXLR .highlight .presets #Preset4 .body",
    EFFECTS_PRESET5_TAB:    "#GoXLR .highlight .presets #Preset5 .tab",
    EFFECTS_PRESET5_BODY:   "#GoXLR .highlight .presets #Preset5 .body",
    EFFECTS_PRESET6_TAB:    "#GoXLR .highlight .presets #Preset6 .tab",
    EFFECTS_PRESET6_BODY:   "#GoXLR .highlight .presets #Preset6 .body",
    SAMPLER_BANK_A_TAB:     "#GoXLR .highlight .sampler #BankA .tab",
    SAMPLER_BANK_A_BODY:    "#GoXLR .highlight .sampler #BankA .body",
    SAMPLER_BANK_B_TAB:     "#GoXLR .highlight .sampler #BankB .tab",
    SAMPLER_BANK_B_BODY:    "#GoXLR .highlight .sampler #BankB .body",
    SAMPLER_BANK_C_TAB:     "#GoXLR .highlight .sampler #BankC .tab",
    SAMPLER_BANK_C_BODY:    "#GoXLR .highlight .sampler #BankC .body",
    GLOBAL:                 "#GoXLR .highlight"
}

/**
 * CSS selectors for the preview layer. Only contains rules for the buttons {@see TunableSelector}.
 */
export const ButtonSelector = {
    MUTE:                   "#GoXLR .area .cough #Mute",
    BLEEP:                  "#GoXLR .area .cough #Bleep",
    SAMPLER_CLEAR:          "#GoXLR .area .sampler #Clear",
    SAMPLER_TOP_LEFT:       "#GoXLR .area .sampler #TopLeft",
    SAMPLER_TOP_RIGHT:      "#GoXLR .area .sampler #TopRight",
    SAMPLER_BOTTOM_LEFT:    "#GoXLR .area .sampler #BottomLeft",
    SAMPLER_BOTTOM_RIGHT:   "#GoXLR .area .sampler #BottomRight",
    SAMPLER_BANK_A:         "#GoXLR .area .sampler #BankA",
    SAMPLER_BANK_B:         "#GoXLR .area .sampler #BankB",
    SAMPLER_BANK_C:         "#GoXLR .area .sampler #BankC",
    EFFECTS_MEGAPHONE:      "#GoXLR .area .effects .buttons #Megaphone",
    EFFECTS_ROBOT:          "#GoXLR .area .effects .buttons #Robot",
    EFFECTS_HARD_TUNE:      "#GoXLR .area .effects .buttons #HardTune",
    EFFECTS_FX:             "#GoXLR .area .effects .buttons #FX",
    EFFECTS_PRESET1:        "#GoXLR .area .effects .presets #Preset1",
    EFFECTS_PRESET2:        "#GoXLR .area .effects .presets #Preset2",
    EFFECTS_PRESET3:        "#GoXLR .area .effects .presets #Preset3",
    EFFECTS_PRESET4:        "#GoXLR .area .effects .presets #Preset4",
    EFFECTS_PRESET5:        "#GoXLR .area .effects .presets #Preset5",
    EFFECTS_PRESET6:        "#GoXLR .area .effects .presets #Preset6",
    CHANNEL1_MUTE:          "#GoXLR .area .mixer #Channel1 #Mute",
    CHANNEL2_MUTE:          "#GoXLR .area .mixer #Channel2 #Mute",
    CHANNEL3_MUTE:          "#GoXLR .area .mixer #Channel3 #Mute",
    CHANNEL4_MUTE:          "#GoXLR .area .mixer #Channel4 #Mute",
}

/**
 * CSS selectors for the preview layer. Does not contain selectors for buttons {@see ButtonSelector}.
 */
export const TunableSelector = {
    ENCODER_REVERB:         "#GoXLR .area .effects .encoders .reverb #Encoder",
    ENCODER_REVERB_LEVEL:   "#GoXLR .area .effects .encoders .reverb .level",
    PITCH_REVERB:           "#GoXLR .area .effects .encoders .pitch #Encoder",
    PITCH_REVERB_LEVEL:     "#GoXLR .area .effects .encoders .pitch .level",
    ECHO_REVERB:            "#GoXLR .area .effects .encoders .echo #Encoder",
    ECHO_REVERB_LEVEL:      "#GoXLR .area .effects .encoders .echo .level",
    GENDER_REVERB:          "#GoXLR .area .effects .encoders .gender #Encoder",
    GENDER_REVERB_LEVEL:    "#GoXLR .area .effects .encoders .gender .level",
    CHANNEL1_FADER:         "#GoXLR .area .mixer #Channel1 .rail #Fader",
    CHANNEL1_LEVEL:         "#GoXLR .area .mixer #Channel1 .level",
    CHANNEL2_FADER:         "#GoXLR .area .mixer #Channel2 .rail #Fader",
    CHANNEL2_LEVEL:         "#GoXLR .area .mixer #Channel2 .level",
    CHANNEL3_FADER:         "#GoXLR .area .mixer #Channel3 .rail #Fader",
    CHANNEL3_LEVEL:         "#GoXLR .area .mixer #Channel3 .level",
    CHANNEL4_FADER:         "#GoXLR .area .mixer #Channel4 .rail #Fader",
    CHANNEL4_LEVEL:         "#GoXLR .area .mixer #Channel4 .level",
}

/**
 * Other CSS selectors.
 */
export const MiscSelector = {
    LOGO:                   "#GoXLR .faceplate #Logo"
}
