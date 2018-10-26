'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = _vue2.default.extend({
    name: 'filterable',
    props: {
        noDataText: {
            type: String,
            default: '$vuetify.noDataText'
        }
    }
});
//# sourceMappingURL=filterable.js.map