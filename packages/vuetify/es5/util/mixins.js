'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mixins;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mixins() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return _vue2.default.extend({ mixins: args });
} /* eslint-disable max-len, import/export, no-use-before-define */
//# sourceMappingURL=mixins.js.map