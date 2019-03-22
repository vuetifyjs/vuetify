var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable no-multi-spaces */
var THEME_DEFAULTS = {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00' // orange.darken1
};
export default function theme(theme) {
    if (theme === void 0) {
        theme = {};
    }
    if (theme === false)
        return false;
    return __assign({}, THEME_DEFAULTS, theme);
}
//# sourceMappingURL=theme.js.map
//# sourceMappingURL=theme.js.map
//# sourceMappingURL=theme.js.map