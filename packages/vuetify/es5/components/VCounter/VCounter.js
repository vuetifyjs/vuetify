'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins


require('../../../src/stylus/components/_counters.styl');

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-counter',
    functional: true,
    mixins: [_themeable2.default],
    props: {
        value: {
            type: [Number, String],
            default: ''
        },
        max: [Number, String]
    },
    render: function render(h, ctx) {
        var props = ctx.props;

        var max = parseInt(props.max, 10);
        var value = parseInt(props.value, 10);
        var content = max ? value + ' / ' + max : props.value;
        var isGreater = max && value > max;
        return h('div', {
            staticClass: 'v-counter',
            class: _extends({
                'error--text': isGreater
            }, (0, _themeable.functionalThemeClasses)(ctx))
        }, content);
    }
};
//# sourceMappingURL=VCounter.js.map