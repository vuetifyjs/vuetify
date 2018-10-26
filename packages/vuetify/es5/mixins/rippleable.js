'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ripple = require('../directives/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Directives
exports.default = _vue2.default.extend({
    name: 'rippleable',
    directives: { Ripple: _ripple2.default },
    props: {
        ripple: {
            type: [Boolean, Object],
            default: true
        }
    },
    methods: {
        genRipple: function genRipple() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (!this.ripple) return null;
            data.staticClass = 'v-input--selection-controls__ripple';
            data.directives = data.directives || [];
            data.directives.push({
                name: 'ripple',
                value: { center: true }
            });
            data.on = Object.assign({
                click: this.onChange
            }, this.$listeners);
            return this.$createElement('div', data);
        },
        onChange: function onChange() {}
    }
});
// Types
//# sourceMappingURL=rippleable.js.map