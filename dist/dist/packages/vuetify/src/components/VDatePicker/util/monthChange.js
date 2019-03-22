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
/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export default (function (value, sign) {
    var _a = __read(value.split('-').map(Number), 2), year = _a[0], month = _a[1];
    if (month + sign === 0) {
        return year - 1 + "-12";
    }
    else if (month + sign === 13) {
        return year + 1 + "-01";
    }
    else {
        return year + "-" + pad(month + sign);
    }
});
//# sourceMappingURL=monthChange.js.map
//# sourceMappingURL=monthChange.js.map