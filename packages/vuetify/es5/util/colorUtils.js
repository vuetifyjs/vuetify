'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.colorToInt = colorToInt;
exports.intToHex = intToHex;
exports.colorToHex = colorToHex;

var _console = require('./console');

function colorToInt(color) {
    var rgb = void 0;
    if (typeof color === 'number') {
        rgb = color;
    } else if (typeof color === 'string') {
        var c = color[0] === '#' ? color.substring(1) : color;
        if (c.length === 3) {
            c = c.split('').map(function (char) {
                return char + char;
            }).join('');
        }
        if (c.length !== 6) {
            (0, _console.consoleWarn)('\'' + color + '\' is not a valid rgb color');
        }
        rgb = parseInt(c, 16);
    } else {
        throw new TypeError('Colors can only be numbers or strings, recieved ' + (color == null ? color : color.constructor.name) + ' instead');
    }
    if (rgb < 0) {
        (0, _console.consoleWarn)('Colors cannot be negative: \'' + color + '\'');
        rgb = 0;
    } else if (rgb > 0xffffff || isNaN(rgb)) {
        (0, _console.consoleWarn)('\'' + color + '\' is not a valid rgb color');
        rgb = 0xffffff;
    }
    return rgb;
}
function intToHex(color) {
    var hexColor = color.toString(16);
    if (hexColor.length < 6) hexColor = '0'.repeat(6 - hexColor.length) + hexColor;
    return '#' + hexColor;
}
function colorToHex(color) {
    return intToHex(colorToInt(color));
}
//# sourceMappingURL=colorUtils.js.map