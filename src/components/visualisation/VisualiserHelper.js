export const HighlightArea = {
    COUGH: 0,
    CHANNEL1: 1,
    CHANNEL2: 2,
    CHANNEL3: 3,
    CHANNEL4: 4,
    SAMPLER_BANK_A: 5,
    SAMPLER_BANK_B: 6,
    SAMPLER_BANK_C: 7,
    EFFECTS_PRESET1: 8,
    EFFECTS_PRESET2: 9,
    EFFECTS_PRESET3: 10,
    EFFECTS_PRESET4: 11,
    EFFECTS_PRESET5: 12,
    EFFECTS_PRESET6: 13,
}

/**
 * Maps the clicked .capture elment to the correct HighlightArea enum.
 * @see HighlightArea
 * @param elem {Element} The target element
 * @param activeEffectPreset {HighlightArea.SAMPLER_BANK_A || HighlightArea.SAMPLER_BANK_B || HighlightArea.C || null} The currently selected effect preset.
 * @param activeSamplerBank {HighlightArea.EFFECTS_PRESET1 || HighlightArea.EFFECTS_PRESET2 || HighlightArea.EFFECTS_PRESET3 || HighlightArea.EFFECTS_PRESET4 || HighlightArea.EFFECTS_PRESET5 || HighlightArea.EFFECTS_PRESET6 || null} The currently select sampler bank.
 * @returns {HighlightArea || null} The detected HighlightArea or null.
 */
export function mapElementToArea(elem, activeEffectPreset = null, activeSamplerBank = null) {
    // cough area
    if (elem.matches('.capture #Cough'))
        return HighlightArea.COUGH;

    // mixer area
    if (elem.matches('.capture .mixer *')) {
        switch (elem.id) {
            case "Channel1":
                return HighlightArea.CHANNEL1;
            case "Channel2":
                return HighlightArea.CHANNEL2;
            case "Channel3":
                return HighlightArea.CHANNEL3;
            case "Channel4":
                return HighlightArea.CHANNEL4;
        }
    }

    // sampler area
    if (elem.matches('.capture .sampler *')) {
        switch (elem.id) {
            case "BankA":
                return HighlightArea.SAMPLER_BANK_A;
            case "BankB":
                return HighlightArea.SAMPLER_BANK_B;
            case "BankC":
                return HighlightArea.SAMPLER_BANK_C;
            default:
                return activeSamplerBank ? activeSamplerBank : HighlightArea.SAMPLER_BANK_A;
        }
    }

    // effects area
    if (elem.matches('.capture .effects *')) {
        switch (elem.id) {
            case "Preset1":
                return HighlightArea.EFFECTS_PRESET1;
            case "Preset2":
                return HighlightArea.EFFECTS_PRESET2;
            case "Preset3":
                return HighlightArea.EFFECTS_PRESET3;
            case "Preset4":
                return HighlightArea.EFFECTS_PRESET4;
            case "Preset5":
                return HighlightArea.EFFECTS_PRESET5;
            case "Preset6":
                return HighlightArea.EFFECTS_PRESET6;
            default:
                return activeEffectPreset ? activeEffectPreset : HighlightArea.EFFECTS_PRESET1;
        }
    }

    return null;
}