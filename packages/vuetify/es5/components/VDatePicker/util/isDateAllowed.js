"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = isDateAllowed;
function isDateAllowed(date, min, max, allowedFn) {
    return (!allowedFn || allowedFn(date)) && (!min || date >= min) && (!max || date <= max);
}
//# sourceMappingURL=isDateAllowed.js.map