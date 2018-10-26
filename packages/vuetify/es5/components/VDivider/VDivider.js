'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins


require('../../../src/stylus/components/_dividers.styl');

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _themeable2.default.extend({
    name: 'v-divider',
    props: {
        inset: Boolean,
        vertical: Boolean
    },
    render: function render(h) {
        return h('hr', {
            class: _extends({
                'v-divider': true,
                'v-divider--inset': this.inset,
                'v-divider--vertical': this.vertical
            }, this.themeClasses),
            attrs: this.$attrs,
            on: this.$listeners
        });
    }
});
//# sourceMappingURL=VDivider.js.map