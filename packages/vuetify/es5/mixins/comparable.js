'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _helpers = require('../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.extend({
    name: 'comparable',
    props: {
        valueComparator: {
            type: Function,
            default: _helpers.deepEqual
        }
    }
});
//# sourceMappingURL=comparable.js.map