var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import pad from './pad';
/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export default (function (value, sign) {
    var _value$split$map = value.split('-').map(function (v) {
        return 1 * v;
    }),
        _value$split$map2 = _slicedToArray(_value$split$map, 2),
        year = _value$split$map2[0],
        month = _value$split$map2[1];

    if (month + sign === 0) {
        return year - 1 + '-12';
    } else if (month + sign === 13) {
        return year + 1 + '-01';
    } else {
        return year + '-' + pad(month + sign);
    }
});
//# sourceMappingURL=monthChange.js.map