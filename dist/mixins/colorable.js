var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import Vue from 'vue';
function isCssColor(color) {
    return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
}
export default Vue.extend({
    name: 'colorable',
    props: {
        color: String
    },
    methods: {
        setBackgroundColor: function (color, data) {
            if (data === void 0) { data = {}; }
            var _a;
            if (isCssColor(color)) {
                data.style = __assign({}, data.style, { 'background-color': "" + color, 'border-color': "" + color });
            }
            else if (color) {
                data.class = __assign({}, data.class, (_a = {}, _a[color] = true, _a));
            }
            return data;
        },
        setTextColor: function (color, data) {
            if (data === void 0) { data = {}; }
            var _a;
            if (isCssColor(color)) {
                data.style = __assign({}, data.style, { 'color': "" + color, 'caret-color': "" + color });
            }
            else if (color) {
                var _b = __read(color.toString().trim().split(' ', 2), 2), colorName = _b[0], colorModifier = _b[1];
                data.class = __assign({}, data.class, (_a = {}, _a[colorName + '--text'] = true, _a));
                if (colorModifier) {
                    data.class['text--' + colorModifier] = true;
                }
            }
            return data;
        }
    }
});
//# sourceMappingURL=colorable.js.map