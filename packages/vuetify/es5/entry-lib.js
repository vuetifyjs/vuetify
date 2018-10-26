'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colors = exports.directives = undefined;

var _components = require('./components');

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

var _directives = require('./directives');

Object.defineProperty(exports, 'directives', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_directives).default;
  }
});

var _colors = require('./util/colors');

Object.defineProperty(exports, 'colors', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_colors).default;
  }
});

var _Vuetify = require('./components/Vuetify');

var _Vuetify2 = _interopRequireDefault(_Vuetify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Vuetify2.default;
//# sourceMappingURL=entry-lib.js.map