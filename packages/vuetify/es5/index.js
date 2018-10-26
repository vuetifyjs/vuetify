'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../src/stylus/app.styl');

var _Vuetify = require('./components/Vuetify');

var _Vuetify2 = _interopRequireDefault(_Vuetify);

var _components = require('./components');

var components = _interopRequireWildcard(_components);

var _directives = require('./directives');

var _directives2 = _interopRequireDefault(_directives);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Vuetify = {
    install: function install(Vue, args) {
        Vue.use(_Vuetify2.default, _extends({
            components: components,
            directives: _directives2.default
        }, args));
    },

    version: '1.3.3'
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Vuetify);
}
exports.default = Vuetify;
//# sourceMappingURL=index.js.map