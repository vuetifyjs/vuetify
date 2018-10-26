var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import pad from './pad';
export default (function (locale, options) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { start: 0, length: 0 },
        start = _ref.start,
        length = _ref.length;

    var makeIsoString = function makeIsoString(dateString) {
        var _dateString$trim$spli = dateString.trim().split(' ')[0].split('-'),
            _dateString$trim$spli2 = _slicedToArray(_dateString$trim$spli, 3),
            year = _dateString$trim$spli2[0],
            month = _dateString$trim$spli2[1],
            date = _dateString$trim$spli2[2];

        return [year, pad(month || 1), pad(date || 1)].join('-');
    };
    try {
        var intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);
        return function (dateString) {
            return intlFormatter.format(new Date(makeIsoString(dateString) + 'T00:00:00+00:00'));
        };
    } catch (e) {
        return start || length ? function (dateString) {
            return makeIsoString(dateString).substr(start, length);
        } : null;
    }
});
//# sourceMappingURL=createNativeLocaleFormatter.js.map