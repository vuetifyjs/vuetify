var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
        return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
    }
    catch (error) {
        e = { error: error };
    }
    finally {
        try {
            if (r && !r.done && (m = i["return"]))
                m.call(i);
        }
        finally {
            if (e)
                throw e.error;
        }
    }
    return ar;
};
import { colorToInt, intToHex, colorToHex } from './colorUtils';
import * as sRGB from './color/transformSRGB';
import * as LAB from './color/transformCIELAB';
export function parse(theme, isItem) {
    if (isItem === void 0) {
        isItem = false;
    }
    var colors = Object.keys(theme);
    var parsedTheme = {};
    for (var i = 0; i < colors.length; ++i) {
        var name_1 = colors[i];
        var value = theme[name_1];
        if (isItem) {
            if (name_1 === 'base' || name_1.startsWith('lighten') || name_1.startsWith('darken')) {
                parsedTheme[name_1] = colorToHex(value);
            }
        }
        else if (typeof value === 'object') {
            parsedTheme[name_1] = parse(value, true);
        }
        else {
            parsedTheme[name_1] = genVariations(name_1, colorToInt(value));
        }
    }
    return parsedTheme;
}
/**
 * Generate the CSS for a base color (.primary)
 */
var genBaseColor = function (name, value) {
    return "\n." + name + " {\n  background-color: " + value + " !important;\n  border-color: " + value + " !important;\n}\n." + name + "--text {\n  color: " + value + " !important;\n  caret-color: " + value + " !important;\n}";
};
/**
 * Generate the CSS for a variant color (.primary.darken-2)
 */
var genVariantColor = function (name, variant, value) {
    var _a = __read(variant.split(/(\d)/, 2), 2), type = _a[0], n = _a[1];
    return "\n." + name + "." + type + "-" + n + " {\n  background-color: " + value + " !important;\n  border-color: " + value + " !important;\n}\n." + name + "--text.text--" + type + "-" + n + " {\n  color: " + value + " !important;\n  caret-color: " + value + " !important;\n}";
};
var genColorVariableName = function (name, variant) {
    if (variant === void 0) {
        variant = 'base';
    }
    return "--v-" + name + "-" + variant;
};
var genColorVariable = function (name, variant) {
    if (variant === void 0) {
        variant = 'base';
    }
    return "var(" + genColorVariableName(name, variant) + ")";
};
export function genStyles(theme, cssVar) {
    if (cssVar === void 0) {
        cssVar = false;
    }
    var colors = Object.keys(theme);
    if (!colors.length)
        return '';
    var variablesCss = '';
    var css = '';
    var aColor = cssVar ? genColorVariable('primary') : theme.primary.base;
    css += "a { color: " + aColor + "; }";
    for (var i = 0; i < colors.length; ++i) {
        var name_2 = colors[i];
        var value = theme[name_2];
        if (typeof value !== 'object')
            continue;
        css += genBaseColor(name_2, cssVar ? genColorVariable(name_2) : value.base);
        cssVar && (variablesCss += "  " + genColorVariableName(name_2) + ": " + value.base + ";\n");
        var variants = Object.keys(value);
        for (var i_1 = 0; i_1 < variants.length; ++i_1) {
            var variant = variants[i_1];
            var variantValue = value[variant];
            if (variant === 'base')
                continue;
            css += genVariantColor(name_2, variant, cssVar ? genColorVariable(name_2, variant) : variantValue);
            cssVar && (variablesCss += "  " + genColorVariableName(name_2, variant) + ": " + variantValue + ";\n");
        }
    }
    if (cssVar) {
        variablesCss = ":root {\n" + variablesCss + "}\n\n";
    }
    return variablesCss + css;
}
export function genVariations(name, value) {
    var values = {
        base: intToHex(value)
    };
    for (var i = 5; i > 0; --i) {
        values["lighten" + i] = intToHex(lighten(value, i));
    }
    for (var i = 1; i <= 4; ++i) {
        values["darken" + i] = intToHex(darken(value, i));
    }
    return values;
}
function lighten(value, amount) {
    var lab = LAB.fromXYZ(sRGB.toXYZ(value));
    lab[0] = lab[0] + amount * 10;
    return sRGB.fromXYZ(LAB.toXYZ(lab));
}
function darken(value, amount) {
    var lab = LAB.fromXYZ(sRGB.toXYZ(value));
    lab[0] = lab[0] - amount * 10;
    return sRGB.fromXYZ(LAB.toXYZ(lab));
}
//# sourceMappingURL=theme.js.map
//# sourceMappingURL=theme.js.map
//# sourceMappingURL=theme.js.map