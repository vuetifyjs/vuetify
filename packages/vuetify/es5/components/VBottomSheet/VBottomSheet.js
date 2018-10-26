'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../../../src/stylus/components/_bottom-sheets.styl');

var _VDialog = require('../VDialog/VDialog');

var _VDialog2 = _interopRequireDefault(_VDialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-bottom-sheet',
    props: {
        disabled: Boolean,
        fullWidth: Boolean,
        hideOverlay: Boolean,
        inset: Boolean,
        lazy: Boolean,
        maxWidth: {
            type: [String, Number],
            default: 'auto'
        },
        persistent: Boolean,
        value: null
    },
    render: function render(h) {
        var activator = h('template', {
            slot: 'activator'
        }, this.$slots.activator);
        var contentClass = ['v-bottom-sheet', this.inset ? 'v-bottom-sheet--inset' : ''].join(' ');
        return h(_VDialog2.default, {
            attrs: _extends({}, this.$props),
            on: _extends({}, this.$listeners),
            props: {
                contentClass: contentClass,
                noClickAnimation: true,
                transition: 'bottom-sheet-transition',
                value: this.value
            }
        }, [activator, this.$slots.default]);
    }
};
//# sourceMappingURL=VBottomSheet.js.map