/* eslint-disable max-len, import/export, no-use-before-define */
import Vue from 'vue';
export default function mixins() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return Vue.extend({ mixins: args });
}
//# sourceMappingURL=mixins.js.map