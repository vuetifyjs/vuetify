'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Components

// Mixins


require('../../../src/stylus/components/_chips.styl');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _VIcon = require('../VIcon');

var _VIcon2 = _interopRequireDefault(_VIcon);

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = (0, _mixins2.default)(_colorable2.default, _themeable2.default, _toggleable2.default).extend({
    name: 'v-chip',
    props: {
        close: Boolean,
        disabled: Boolean,
        label: Boolean,
        outline: Boolean,
        // Used for selects/tagging
        selected: Boolean,
        small: Boolean,
        textColor: String,
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classes: function classes() {
            return _extends({
                'v-chip--disabled': this.disabled,
                'v-chip--selected': this.selected && !this.disabled,
                'v-chip--label': this.label,
                'v-chip--outline': this.outline,
                'v-chip--small': this.small,
                'v-chip--removable': this.close
            }, this.themeClasses);
        }
    },
    methods: {
        genClose: function genClose(h) {
            var _this = this;

            var data = {
                staticClass: 'v-chip__close',
                on: {
                    click: function click(e) {
                        e.stopPropagation();
                        _this.$emit('input', false);
                    }
                }
            };
            return h('div', data, [h(_VIcon2.default, '$vuetify.icons.delete')]);
        },
        genContent: function genContent(h) {
            var children = [this.$slots.default];
            this.close && children.push(this.genClose(h));
            return h('span', {
                staticClass: 'v-chip__content'
            }, children);
        }
    },
    render: function render(h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-chip',
            'class': this.classes,
            attrs: { tabindex: this.disabled ? -1 : 0 },
            directives: [{
                name: 'show',
                value: this.isActive
            }],
            on: this.$listeners
        });
        var color = this.textColor || this.outline && this.color;
        return h('span', this.setTextColor(color, data), [this.genContent(h)]);
    }
});
//# sourceMappingURL=VChip.js.map