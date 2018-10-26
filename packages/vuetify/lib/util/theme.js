var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import { colorToInt, intToHex, colorToHex } from './colorUtils';
import * as sRGB from './color/transformSRGB';
import * as LAB from './color/transformCIELAB';
export function parse(theme) {
    var isItem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var colors = Object.keys(theme);
    var parsedTheme = {};
    for (var i = 0; i < colors.length; ++i) {
        var name = colors[i];
        var value = theme[name];
        if (isItem) {
            if (name === 'base' || name.startsWith('lighten') || name.startsWith('darken')) {
                parsedTheme[name] = colorToHex(value);
            }
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            parsedTheme[name] = parse(value, true);
        } else {
            parsedTheme[name] = genVariations(name, colorToInt(value));
        }
    }
    return parsedTheme;
}
/**
 * Generate the CSS for a base color (.primary)
 */
var genBaseColor = function genBaseColor(name, value) {
    return '\n.' + name + ' {\n  background-color: ' + value + ' !important;\n  border-color: ' + value + ' !important;\n}\n.' + name + '--text {\n  color: ' + value + ' !important;\n  caret-color: ' + value + ' !important;\n}';
};
/**
 * Generate the CSS for a variant color (.primary.darken-2)
 */
var genVariantColor = function genVariantColor(name, variant, value) {
    var _variant$split = variant.split(/(\d)/, 2),
        _variant$split2 = _slicedToArray(_variant$split, 2),
        type = _variant$split2[0],
        n = _variant$split2[1];

    return '\n.' + name + '.' + type + '-' + n + ' {\n  background-color: ' + value + ' !important;\n  border-color: ' + value + ' !important;\n}\n.' + name + '--text.text--' + type + '-' + n + ' {\n  color: ' + value + ' !important;\n  caret-color: ' + value + ' !important;\n}';
};
var genColorVariableName = function genColorVariableName(name) {
    var variant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base';
    return '--v-' + name + '-' + variant;
};
var genColorVariable = function genColorVariable(name) {
    var variant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base';
    return 'var(' + genColorVariableName(name, variant) + ')';
};
export function genStyles(theme) {
    var cssVar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var colors = Object.keys(theme);
    if (!colors.length) return '';
    var variablesCss = '';
    var css = '';
    var aColor = cssVar ? genColorVariable('primary') : theme.primary.base;
    css += 'a { color: ' + aColor + '; }';
    for (var i = 0; i < colors.length; ++i) {
        var name = colors[i];
        var value = theme[name];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') continue;
        css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base);
        cssVar && (variablesCss += '  ' + genColorVariableName(name) + ': ' + value.base + ';\n');
        var variants = Object.keys(value);
        for (var _i = 0; _i < variants.length; ++_i) {
            var variant = variants[_i];
            var variantValue = value[variant];
            if (variant === 'base') continue;
            css += genVariantColor(name, variant, cssVar ? genColorVariable(name, variant) : variantValue);
            cssVar && (variablesCss += '  ' + genColorVariableName(name, variant) + ': ' + variantValue + ';\n');
        }
    }
    if (cssVar) {
        variablesCss = ':root {\n' + variablesCss + '}\n\n';
    }
    return variablesCss + css;
}
export function genVariations(name, value) {
    var values = {
        base: intToHex(value)
    };
    for (var i = 5; i > 0; --i) {
        values['lighten' + i] = intToHex(lighten(value, i));
    }
    for (var _i2 = 1; _i2 <= 4; ++_i2) {
        values['darken' + _i2] = intToHex(darken(value, _i2));
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