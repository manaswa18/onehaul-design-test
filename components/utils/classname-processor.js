const NAMESPACE = 'onehaul_ui';
const PRESET = 'onehaul_ui';
const VALID_PRESETS = ['onehaul_ui'];

const cl = (...args) => {
    const [template, ...values] = args;

    let final = '';

    template.forEach((templateString) => {
        const value = values.shift() || '';
        final += templateString.toString() + value.toString();
    });

    final = final.replace(/[\t\n]/g, ' ').trim();
    final = final.replace(/\s\s+/g, ' ').trim();

    return final;
};

/**
 * Namespaces a class name with the library prefix.
 * @param {string} classname
 * @returns {string}
 */
cl.namespace = (classname) => {
    if (!classname) return '';
    return `${NAMESPACE}_${classname}`;
};

/**
 * Generates a preset class name.
 * @param {string} presetKey
 * @param {string} presetValue
 * @returns {string}
 */
cl.preset = (presetKey, presetValue) => {
    if (!presetValue) return '';
    if (!presetKey || !VALID_PRESETS.includes(presetKey)) return '';
    return `${PRESET}_${presetKey}_${presetValue}`;
};

/** @type {(classname: string) => string} */
cl.ns = cl.namespace;

/** @type {(presetKey: string, presetValue: string) => string} */
cl.ps = cl.preset;

export default cl;
