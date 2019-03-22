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
import pad from './pad';
function createNativeLocaleFormatter(locale, options, substrOptions) {
    if (substrOptions === void 0) {
        substrOptions = { start: 0, length: 0 };
    }
    var makeIsoString = function (dateString) {
        var _a = __read(dateString.trim().split(' ')[0].split('-'), 3), year = _a[0], month = _a[1], date = _a[2];
        return [pad(year, 4), pad(month || 1), pad(date || 1)].join('-');
    };
    try {
        var intlFormatter_1 = new Intl.DateTimeFormat(locale || undefined, options);
        return function (dateString) { return intlFormatter_1.format(new Date(makeIsoString(dateString) + "T00:00:00+00:00")); };
    }
    catch (e) {
        return (substrOptions.start || substrOptions.length)
            ? function (dateString) { return makeIsoString(dateString).substr(substrOptions.start || 0, substrOptions.length); }
            : undefined;
    }
}
export default createNativeLocaleFormatter;
//# sourceMappingURL=createNativeLocaleFormatter.js.map
//# sourceMappingURL=createNativeLocaleFormatter.js.map