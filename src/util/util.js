import {store} from "@/store";

export function isDeviceMini() {
    // Do this here, rather than on created() so it can update if the device changes
    return store.getActiveDevice().hardware.device_type === "Mini";
}

export function roundToStep(value, step) {
    step || (step = 1.0);
    let inverse = 1.0 / step;
    return Math.round(value * inverse) / inverse;
}

/**
 * Function to turn a HEX string into a rgb-object.
 * @param colour
 * @returns {{r: number, b: number, g: number}}
 */
export function transformColour(colour) {
    let r = parseInt(colour.substring(0, 2), 16);
    let g = parseInt(colour.substring(2, 4), 16);
    let b = parseInt(colour.substring(4, 6), 16);
    return { r, g, b};
}

/**
 * Calculates the colour at a specific position on a gradient between two given colours.
 * @param startColour
 * @param endColour
 * @param position A value between 0 and 1 representing the position on the gradient.
 * @returns {{r: number, b: number, g: number}}
 */
export function calculateGradientColour(startColour, endColour, position) {
    return {
        r: Math.round(startColour.r + (endColour.r - startColour.r) * position),
        g: Math.round(startColour.g + (endColour.g - startColour.g) * position),
        b: Math.round(startColour.b + (endColour.b - startColour.b) * position),
    }
}

/**
 * Returns a style colour based on the off-state, using the provided colors.
 * @param state
 * @param colour
 * @param colour2
 * @returns {string}
 */
export function getOffStyleColour(state, colour, colour2) {
    switch (state) {
        case "Dimmed":
            return `rgba(${colour.r}, ${colour.g}, ${colour.b}, 0.4)`;
        case "Colour2":
            return `rgba(${colour2.r}, ${colour2.g}, ${colour2.b}, 1)`;
        case "DimmedColour2":
            return `rgba(${colour2.r}, ${colour2.g}, ${colour2.b}, 0.4)`;
        default:
            return `rgba(${colour.r}, ${colour.g}, ${colour.b}, 1)`;
    }
}

/**
 * Checks if the given sample is currently recording.
 * @param sample
 * @returns {boolean}
 */
export function isSampleRecording(sample) {
    let activeBank = store.getActiveDevice().sampler.active_bank;
    let sampleState = store.getActiveDevice().sampler.banks[activeBank][sample];
    return sampleState.is_recording;
}

/**
 * Sets the state of a given class for a given selector.
 * @param selector
 * @param className
 * @param state
 */
export function setClassState(selector, className, state) {
    const elem = document.querySelector(selector);
    if (elem === null) return;

    if (state) elem.classList.add(className);
    else elem.classList.remove(className);
}