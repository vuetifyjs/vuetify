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
import { set } from '@/util/vuex';
var DEFAULT_SNACKBAR = Object.freeze({
    color: 'success',
    href: false,
    msg: '',
    text: 'Close',
    to: false,
    timeout: 6000
});
export default {
    namespaced: true,
    state: {
        snackbar: __assign({}, DEFAULT_SNACKBAR),
        value: false
    },
    mutations: {
        setSnackbar: function (state, payload) {
            state.snackbar = Object.assign({}, {
                color: 'success',
                href: false,
                msg: '',
                text: 'Close',
                to: false,
                timeout: 6000
            }, payload);
        },
        setValue: set('value')
    }
};
//# sourceMappingURL=snackbar.js.map
//# sourceMappingURL=snackbar.js.map
//# sourceMappingURL=snackbar.js.map
//# sourceMappingURL=snackbar.js.map