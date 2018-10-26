'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.extend({
    name: 'transitionable',
    props: {
        mode: String,
        origin: String,
        transition: String
    }
});
//# sourceMappingURL=transitionable.js.map