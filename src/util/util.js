export function waitFor(conditionFunction) {
    const poll = resolve => {
        if (conditionFunction()) resolve();
        // eslint-disable-next-line no-unused-vars
        else setTimeout(_ =>
            poll(resolve), 400);
    }
    return new Promise(poll);
}