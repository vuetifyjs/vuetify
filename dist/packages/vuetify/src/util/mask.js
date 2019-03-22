export var defaultDelimiters = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/;
export var isMaskDelimiter = function (char) { return char ? defaultDelimiters.test(char) : false; };
var allowedMasks = {
    '#': {
        test: function (char) { return /[0-9]/.test(char); }
    },
    'A': {
        test: function (char) { return /[A-Z]/i.test(char); },
        convert: function (char) { return char.toUpperCase(); }
    },
    'a': {
        test: function (char) { return /[a-z]/i.test(char); },
        convert: function (char) { return char.toLowerCase(); }
    },
    'N': {
        test: function (char) { return /[0-9A-Z]/i.test(char); },
        convert: function (char) { return char.toUpperCase(); }
    },
    'n': {
        test: function (char) { return /[0-9a-z]/i.test(char); },
        convert: function (char) { return char.toLowerCase(); }
    },
    'X': {
        test: isMaskDelimiter
    }
};
var isMask = function (char) { return allowedMasks.hasOwnProperty(char); };
var convert = function (mask, char) {
    return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char;
};
var maskValidates = function (mask, char) {
    if (char == null || !isMask(mask))
        return false;
    return allowedMasks[mask].test(char);
};
export var maskText = function (text, masked, dontFillMaskBlanks) {
    if (text == null)
        return '';
    text = String(text);
    if (!masked.length || !text.length)
        return text;
    if (!Array.isArray(masked))
        masked = masked.split('');
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
        }
        else if (!isMask(mask) && !dontFillMaskBlanks) {
            newText += mask;
            // Check if is mask and validates
        }
        else if (maskValidates(mask, char)) {
            newText += convert(mask, char);
            textIndex++;
        }
        else {
            return newText;
        }
        maskIndex++;
    }
    return newText;
};
export var unmaskText = function (text) {
    return text ? String(text).replace(new RegExp(defaultDelimiters, 'g'), '') : text;
};
//# sourceMappingURL=mask.js.map