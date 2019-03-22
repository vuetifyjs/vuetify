var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m)
        return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length)
                o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var e_1, _a;
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
var requireLang = require.context('./', true, /\.json$/);
var messages = {};
var _loop_1 = function (file) {
    if (file === './index.js')
        return "continue";
    var path = file.replace(/(\.\/|\.json$)/g, '').split('/');
    path.reduce(function (o, s, i) {
        var prop = upperFirst(camelCase(s));
        o[prop] = i + 1 === path.length
            ? requireLang(file)
            : o[prop] || {};
        return o[prop];
    }, messages);
};
try {
    for (var _b = __values(requireLang.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var file = _c.value;
        _loop_1(file);
    }
}
catch (e_1_1) {
    e_1 = { error: e_1_1 };
}
finally {
    try {
        if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
    }
    finally {
        if (e_1)
            throw e_1.error;
    }
}
export default messages;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map