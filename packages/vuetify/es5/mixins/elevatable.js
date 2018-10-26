'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = _vue2.default.extend({
    name: 'elevatable',
    props: {
        elevation: [Number, String]
    },
    computed: {
        computedElevation: function computedElevation() {
            return this.elevation;
        },
        elevationClasses: function elevationClasses() {
            if (!this.computedElevation) return {};
            return _defineProperty({}, 'elevation-' + this.computedElevation, true);
        }
    }
});
//# sourceMappingURL=elevatable.js.map