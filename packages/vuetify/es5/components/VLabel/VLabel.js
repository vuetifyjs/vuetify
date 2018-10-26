'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Mixins

// Helpers


require('../../../src/stylus/components/_labels.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _helpers = require('../../util/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-label',
    functional: true,
    mixins: [_themeable2.default],
    props: {
        absolute: Boolean,
        color: {
            type: [Boolean, String],
            default: 'primary'
        },
        disabled: Boolean,
        focused: Boolean,
        for: String,
        left: {
            type: [Number, String],
            default: 0
        },
        right: {
            type: [Number, String],
            default: 'auto'
        },
        value: Boolean
    },
    render: function render(h, ctx) {
        var children = ctx.children,
            listeners = ctx.listeners,
            props = ctx.props;

        var data = {
            staticClass: 'v-label',
            'class': _extends({
                'v-label--active': props.value,
                'v-label--is-disabled': props.disabled
            }, (0, _themeable.functionalThemeClasses)(ctx)),
            attrs: {
                for: props.for,
                'aria-hidden': !props.for
            },
            on: listeners,
            style: {
                left: (0, _helpers.convertToUnit)(props.left),
                right: (0, _helpers.convertToUnit)(props.right),
                position: props.absolute ? 'absolute' : 'relative'
            }
        };
        return h('label', _colorable2.default.options.methods.setTextColor(props.focused && props.color, data), children);
    }
};
//# sourceMappingURL=VLabel.js.map