'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Default delimiter RegExp
 *
 * @type {RegExp}
 */
var defaultDelimiters = exports.defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;
/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */
var isMaskDelimiter = exports.isMaskDelimiter = function isMaskDelimiter(char) {
    return char && defaultDelimiters.test(char);
};
/**
 * Mask keys
 *
 * @type {Object}
 */
var allowedMasks = {
    '#': {
        test: function test(char) {
            return char.match(/[0-9]/);
        }
    },
    'A': {
        test: function test(char) {
            return char.match(/[A-Z]/i);
        },
        convert: function convert(char) {
            return char.toUpperCase();
        }
    },
    'a': {
        test: function test(char) {
            return char.match(/[a-z]/i);
        },
        convert: function convert(char) {
            return char.toLowerCase();
        }
    },
    'N': {
        test: function test(char) {
            return char.match(/[0-9A-Z]/i);
        },
        convert: function convert(char) {
            return char.toUpperCase();
        }
    },
    'n': {
        test: function test(char) {
            return char.match(/[0-9a-z]/i);
        },
        convert: function convert(char) {
            return char.toLowerCase();
        }
    },
    'X': {
        test: isMaskDelimiter
    }
};
/**
 * Is Character mask
 *
 * @param  {String} char
 *
 * @return {Boolean}
 */
var isMask = function isMask(char) {
    return allowedMasks.hasOwnProperty(char);
};
/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {String}
 */
var convert = function convert(mask, char) {
    return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char;
};
/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */
var maskValidates = function maskValidates(mask, char) {
    if (char == null || !isMask(mask)) return false;
    return allowedMasks[mask].test(char);
};
/**
 * Mask Text
 *
 * Takes a string or an array of characters
 * and returns a masked string
 *
 * @param {*} text
 * @param {Array|String} masked
 * @param {Boolean} [dontFillMaskBlanks]
 *
 * @return {String}
 */
var maskText = exports.maskText = function maskText(text, masked, dontFillMaskBlanks) {
    if (text == null) return '';
    text = String(text);
    if (!masked.length || !text.length) return text;
    if (!Array.isArray(masked)) masked = masked.split('');
    var textIndex = 0;
    var maskIndex = 0;
    var newText = '';
    while (maskIndex < masked.length) {
        var mask = masked[maskIndex];
        // Assign the next character
        var char = text[textIndex];
        // Check if mask is delimiter
        // and current char matches
        if (!isMask(mask) && char === mask) {
            newText += mask;
            textIndex++;
            // Check if not mask
        } else if (!isMask(mask) && !dontFillMaskBlanks) {
            newText += mask;
            // Check if is mask and validates
        } else if (maskValidates(mask, char)) {
            newText += convert(mask, char);
            textIndex++;
        } else {
            return newText;
        }
        maskIndex++;
    }
    return newText;
};
/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */
var unmaskText = exports.unmaskText = function unmaskText(text) {
    return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text;
};
//# sourceMappingURL=mask.js.map