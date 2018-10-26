'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('../../../src/stylus/components/_messages.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */

// Mixins
exports.default = {
    name: 'v-messages',
    mixins: [_colorable2.default, _themeable2.default],
    props: {
        value: {
            type: Array,
            default: function _default() {
                return [];
            }
        }
    },
    methods: {
        genChildren: function genChildren() {
            return this.$createElement('transition-group', {
                staticClass: 'v-messages__wrapper',
                attrs: {
                    name: 'message-transition',
                    tag: 'div'
                }
            }, this.value.map(this.genMessage));
        },
        genMessage: function genMessage(message, key) {
            return this.$createElement('div', {
                staticClass: 'v-messages__message',
                key: key,
                domProps: {
                    innerHTML: message
                }
            });
        }
    },
    render: function render(h) {
        return h('div', this.setTextColor(this.color, {
            staticClass: 'v-messages',
            class: this.themeClasses
        }), [this.genChildren()]);
    }
}; // Styles
//# sourceMappingURL=VMessages.js.map