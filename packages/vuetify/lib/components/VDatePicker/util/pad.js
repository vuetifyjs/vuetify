var padStart = function padStart(string, targetLength, padString) {
    targetLength = targetLength >> 0;
    string = String(string);
    padString = String(padString);
    if (string.length > targetLength) {
        return String(string);
    }
    targetLength = targetLength - string.length;
    if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length);
    }
    return padString.slice(0, targetLength) + String(string);
};
export default (function (n) {
    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return padStart(n, length, '0');
});
//# sourceMappingURL=pad.js.map