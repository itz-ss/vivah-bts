/**
 * Color Utility Functions
 * Converts between color spaces and provides premium color palette management
 */

/**
 * Convert HSL to RGB
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {Object} { r, g, b } values (0-255)
 */
export function hslToRgb(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
}

/**
 * Format RGB to CSS rgba string
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @param {number} a - Alpha (0-1)
 * @returns {string} rgba(r, g, b, a)
 */
export function rgbToString(r, g, b, a = 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/**
 * Convert HSL directly to CSS rgba string
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @param {number} a - Alpha (0-1)
 * @returns {string} rgba string
 */
export function hslToRgbString(h, s, l, a = 1) {
    const { r, g, b } = hslToRgb(h, s, l);
    return rgbToString(r, g, b, a);
}

/**
 * Luxury Color Palette — RGB Values
 * Derived from Wedding BTS premium aesthetic
 */
export const luxuryPalette = {
    // Golden Tones (H=45)
    golden: {
        saturated: hslToRgb(45, 80, 65),    // Rich gold
        soft: hslToRgb(45, 60, 80),         // Light gold
        muted: hslToRgb(45, 50, 80),        // Very pale gold
    },

    // Emerald & Sage (H=150)
    emerald: {
        rich: hslToRgb(150, 70, 50),        // Deep emerald
        soft: hslToRgb(150, 50, 70),        // Soft sage
        pale: hslToRgb(150, 30, 85),        // Pale sage
    },

    // Forest Green (H=120)
    forest: {
        deep: hslToRgb(120, 70, 40),        // Deep forest
        soft: hslToRgb(120, 50, 70),        // Soft green
        pale: hslToRgb(120, 30, 85),        // Pale green
    },

    // Neutral bases
    white: { r: 255, g: 255, b: 255 },
    black: { r: 26, g: 26, b: 26 },
    'parchment': { r: 245, g: 241, b: 237 },
    'espresso': { r: 60, g: 47, b: 47 },
};

export default {
    hslToRgb,
    rgbToString,
    hslToRgbString,
    luxuryPalette,
};
