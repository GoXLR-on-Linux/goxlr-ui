import {CaptureSelector, HighlightSelector} from "@/components/visualisation/helpers/selectors";

// store the class names
const ACTIVE_CLASS = "show";
const HOVER_CLASS = "hover"

// change this to set a default tab
const DEFAULT_SAMPLER_TAB = "A";
const DEFAULT_EFFECTS_TAB = 1;

function setElementState(selector, state) {
    let elem = document.querySelector(selector);

    switch (state) {
        case HighlightState.ACTIVE:
            elem.classList.add(ACTIVE_CLASS);
            elem.classList.remove(HOVER_CLASS);
            return;

        case HighlightState.HOVER:
            elem.classList.add(HOVER_CLASS);
            return;

        default:
        case HighlightState.NONE:
            elem.classList.remove(ACTIVE_CLASS);
            elem.classList.remove(HOVER_CLASS);
            return;
    }
}

/**
 * Possible areas for highlighting. Basically a map for all required selectors.
 */
export const HighlightArea = {
    COUGH: [HighlightSelector.COUGH],
    CHANNEL1: [HighlightSelector.CHANNEL1],
    CHANNEL2: [HighlightSelector.CHANNEL2],
    CHANNEL3: [HighlightSelector.CHANNEL3],
    CHANNEL4: [HighlightSelector.CHANNEL4],
    SAMPLER_BANK_A: [HighlightSelector.SAMPLER_BANK_A_TAB, HighlightSelector.SAMPLER_BANK_A_BODY],
    SAMPLER_BANK_B: [HighlightSelector.SAMPLER_BANK_B_TAB, HighlightSelector.SAMPLER_BANK_B_BODY],
    SAMPLER_BANK_C: [HighlightSelector.SAMPLER_BANK_C_TAB, HighlightSelector.SAMPLER_BANK_C_BODY],
    EFFECTS_PRESET1: [HighlightSelector.EFFECTS_PRESET1_TAB, HighlightSelector.EFFECTS_PRESET1_BODY],
    EFFECTS_PRESET2: [HighlightSelector.EFFECTS_PRESET2_TAB, HighlightSelector.EFFECTS_PRESET2_BODY],
    EFFECTS_PRESET3: [HighlightSelector.EFFECTS_PRESET3_TAB, HighlightSelector.EFFECTS_PRESET3_BODY],
    EFFECTS_PRESET4: [HighlightSelector.EFFECTS_PRESET4_TAB, HighlightSelector.EFFECTS_PRESET4_BODY],
    EFFECTS_PRESET5: [HighlightSelector.EFFECTS_PRESET5_TAB, HighlightSelector.EFFECTS_PRESET5_BODY],
    EFFECTS_PRESET6: [HighlightSelector.EFFECTS_PRESET6_TAB, HighlightSelector.EFFECTS_PRESET6_BODY],
}

export const HighlightState = {
    NONE: 0,
    HOVER: 1,
    ACTIVE: 2
}

export const SamplerTabBank = {
    A: [HighlightSelector.SAMPLER_BANK_A_TAB, HighlightSelector.SAMPLER_BANK_A_BODY],
    B: [HighlightSelector.SAMPLER_BANK_B_TAB, HighlightSelector.SAMPLER_BANK_B_BODY],
    C: [HighlightSelector.SAMPLER_BANK_C_TAB, HighlightSelector.SAMPLER_BANK_C_BODY],
}

export const EffectsTabPreset = {
    PRESET1: [HighlightSelector.EFFECTS_PRESET1_TAB, HighlightSelector.EFFECTS_PRESET1_BODY],
    PRESET2: [HighlightSelector.EFFECTS_PRESET2_TAB, HighlightSelector.EFFECTS_PRESET2_BODY],
    PRESET3: [HighlightSelector.EFFECTS_PRESET3_TAB, HighlightSelector.EFFECTS_PRESET3_BODY],
    PRESET4: [HighlightSelector.EFFECTS_PRESET4_TAB, HighlightSelector.EFFECTS_PRESET4_BODY],
    PRESET5: [HighlightSelector.EFFECTS_PRESET5_TAB, HighlightSelector.EFFECTS_PRESET5_BODY],
    PRESET6: [HighlightSelector.EFFECTS_PRESET6_TAB, HighlightSelector.EFFECTS_PRESET6_BODY],
}

export function setTabState(tab, state, tabType) {
    let isOtherTabActive = false;
    let isOwnTabActive = false;

    if (state === HighlightState.HOVER) {
        Object.keys(tabType).forEach(keyName => {
            if (document.querySelector(tabType[keyName][1]).classList.contains(ACTIVE_CLASS))
                isOtherTabActive = true;
        });

        isOwnTabActive = document.querySelector(tab[0]).classList.contains(ACTIVE_CLASS);
    }

    // only change body if nothing is set to ACTIVE_CLASS
    if (!isOtherTabActive && !isOwnTabActive) setAreaState(tab, state);
    else if (!isOwnTabActive) setAreaState([ tab[0] ], state);
}

export function setAreaState(area, state, skipUnset = false) {
    if (state === HighlightState.NONE) {
        area.forEach(selector => setElementState(selector, state));
        return;
    }

    // unset
    if (!skipUnset) {
        let unsetClass = (state === HighlightState.HOVER) ? HOVER_CLASS : ACTIVE_CLASS;
        document.querySelectorAll(`${HighlightSelector.GLOBAL} .${unsetClass}`).forEach(elem => {
            // prevent flashing
            if (area.filter(selector => elem.matches(selector)).length !== 0) return;

            elem.classList.remove(unsetClass);
        });
    }

    // don't set hover if already active
    if (state === HighlightState.HOVER && area.filter(query => document.querySelector(query).classList.contains(ACTIVE_CLASS)).length > 0) return;

    // set new
    area.forEach(selector => setElementState(selector, state));
}



// store last used tab
let lastSamplerTab = DEFAULT_SAMPLER_TAB;
let lastEffectsTab = DEFAULT_EFFECTS_TAB;

/**
 * Completely handles the hover effect for the preview image.
 * @param e event args
 */
export function handlePreviewHover(e) {
    // find correct function for highlight area
    let captureZone = Object.keys(CaptureSelector).filter(key => e.target.matches(`${CaptureSelector[key]}`))[0];
    switch (CaptureSelector[captureZone]) {
        // Mixer
        case CaptureSelector.CHANNEL1:
            setAreaState(HighlightArea.CHANNEL1, HighlightState.HOVER);
            break;
        case CaptureSelector.CHANNEL2:
            setAreaState(HighlightArea.CHANNEL2, HighlightState.HOVER);
            break;
        case CaptureSelector.CHANNEL3:
            setAreaState(HighlightArea.CHANNEL3, HighlightState.HOVER);
            break;
        case CaptureSelector.CHANNEL4:
            setAreaState(HighlightArea.CHANNEL4, HighlightState.HOVER);
            break;

        // Sampler
        case CaptureSelector.SAMPLER_BANK_A:
            lastSamplerTab = "A";
            setTabState(SamplerTabBank.A, HighlightState.HOVER, SamplerTabBank);
            break;
        case CaptureSelector.SAMPLER_BANK_B:
            lastSamplerTab = "B";
            setTabState(SamplerTabBank.B, HighlightState.HOVER, SamplerTabBank);
            break;
        case CaptureSelector.SAMPLER_BANK_C:
            lastSamplerTab = "C";
            setTabState(SamplerTabBank.C, HighlightState.HOVER, SamplerTabBank);
            break;
        case CaptureSelector.SAMPLER_BODY:
            setTabState(SamplerTabBank[lastSamplerTab], HighlightState.HOVER, SamplerTabBank);
            break;

        // Effects
        case CaptureSelector.EFFECTS_PRESET1:
            lastEffectsTab = 1;
            setTabState(EffectsTabPreset.PRESET1, HighlightState.HOVER, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET2:
            lastEffectsTab = 2;
            setTabState(EffectsTabPreset.PRESET2, HighlightState.HOVER, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET3:
            lastEffectsTab = 3;
            setTabState(EffectsTabPreset.PRESET3, HighlightState.HOVER, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET4:
            lastEffectsTab = 4;
            setTabState(EffectsTabPreset.PRESET4, HighlightState.HOVER, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET5:
            lastEffectsTab = 5;
            setTabState(EffectsTabPreset.PRESET5, HighlightState.HOVER, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET6:
            lastEffectsTab = 6;
            setTabState(EffectsTabPreset.PRESET6, HighlightState.HOVER, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_BODY:
            setTabState(EffectsTabPreset[`PRESET${lastEffectsTab}`], HighlightState.HOVER, EffectsTabPreset);
            break;

        // Cough
        case CaptureSelector.COUGH:
            setAreaState(HighlightArea.COUGH, HighlightState.HOVER);
            break;

        default:
            Object.keys(HighlightArea)
                .filter(key => HighlightArea[key].filter(query => document.querySelector(query).classList.contains(ACTIVE_CLASS)).length === 0)
                .forEach(key => setAreaState(HighlightArea[key], HighlightState.NONE, true))
            break;
    }

    // unset last* information
    if (!e.target.matches(`${CaptureSelector.GROUP_SAMPLER} *`)) lastSamplerTab = DEFAULT_SAMPLER_TAB;
    if (!e.target.matches(`${CaptureSelector.GROUP_EFFECTS} *`)) lastEffectsTab = DEFAULT_EFFECTS_TAB;
}


/**
 * Completely handles the click event for the preview image.
 * @param e event args
 */
export function handlePreviewClick(e) {
    // find correct function for highlight area
    let captureZone = Object.keys(CaptureSelector).filter(key => e.target.matches(`${CaptureSelector[key]}`))[0];
    switch (CaptureSelector[captureZone]) {
        // Mixer
        case CaptureSelector.CHANNEL1:
            // TODO: add code to switch to view
            setAreaState(HighlightArea.CHANNEL1, HighlightState.ACTIVE);
            break;
        case CaptureSelector.CHANNEL2:
            // TODO: add code to switch to view
            setAreaState(HighlightArea.CHANNEL2, HighlightState.ACTIVE);
            break;
        case CaptureSelector.CHANNEL3:
            // TODO: add code to switch to view
            setAreaState(HighlightArea.CHANNEL3, HighlightState.ACTIVE);
            break;
        case CaptureSelector.CHANNEL4:
            // TODO: add code to switch to view
            setAreaState(HighlightArea.CHANNEL4, HighlightState.ACTIVE);
            break;

        // Sampler
        case CaptureSelector.SAMPLER_BANK_A:
            // TODO: add code to switch to view
            setTabState(SamplerTabBank.A, HighlightState.ACTIVE, SamplerTabBank);
            break;
        case CaptureSelector.SAMPLER_BANK_B:
            // TODO: add code to switch to view
            setTabState(SamplerTabBank.B, HighlightState.ACTIVE, SamplerTabBank);
            break;
        case CaptureSelector.SAMPLER_BANK_C:
            // TODO: add code to switch to view
            setTabState(SamplerTabBank.C, HighlightState.ACTIVE, SamplerTabBank);
            break;
        case CaptureSelector.SAMPLER_BODY:
            // TODO: add code to switch to view
            setTabState(SamplerTabBank[lastSamplerTab], HighlightState.ACTIVE, SamplerTabBank);
            break;

        // Effects
        case CaptureSelector.EFFECTS_PRESET1:
            // TODO: add code to switch to view
            setTabState(EffectsTabPreset.PRESET1, HighlightState.ACTIVE, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET2:
            // TODO: add code to switch to view
            setTabState(EffectsTabPreset.PRESET2, HighlightState.ACTIVE, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET3:
            // TODO: add code to switch to view
            setTabState(EffectsTabPreset.PRESET3, HighlightState.ACTIVE, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET4:
            // TODO: add code to switch to view
            setTabState(EffectsTabPreset.PRESET4, HighlightState.ACTIVE, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET5:
            // TODO: add code to switch to view
            setTabState(EffectsTabPreset.PRESET5, HighlightState.ACTIVE, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_PRESET6:
            setTabState(EffectsTabPreset.PRESET6, HighlightState.ACTIVE, EffectsTabPreset);
            break;
        case CaptureSelector.EFFECTS_BODY:
            // TODO: add code to switch to view
            setTabState(EffectsTabPreset[`PRESET${lastEffectsTab}`], HighlightState.ACTIVE, EffectsTabPreset);
            break;

        // Cough
        case CaptureSelector.COUGH:
            // TODO: add code to switch to view
            setAreaState(HighlightArea.COUGH, HighlightState.ACTIVE);
            break;

        default:
            break;
    }
}