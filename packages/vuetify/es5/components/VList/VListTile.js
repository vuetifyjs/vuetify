'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Mixins

// Directives


var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _routable = require('../../mixins/routable');

var _routable2 = _interopRequireDefault(_routable);

var _toggleable = require('../../mixins/toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _ripple = require('../../directives/ripple');

var _ripple2 = _interopRequireDefault(_ripple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* @vue/component */
exports.default = {
    name: 'v-list-tile',
    directives: {
        Ripple: _ripple2.default
    },
    mixins: [_colorable2.default, _routable2.default, _toggleable2.default, _themeable2.default],
    inheritAttrs: false,
    props: {
        activeClass: {
            type: String,
            default: 'primary--text'
        },
        avatar: Boolean,
        inactive: Boolean,
        tag: String
    },
    data: function data() {
        return {
            proxyClass: 'v-list__tile--active'
        };
    },
    computed: {
        listClasses: function listClasses() {
            return this.disabled ? { 'v-list--disabled': true } : undefined;
        },
        classes: function classes() {
            return _extends({
                'v-list__tile': true,
                'v-list__tile--link': this.isLink && !this.inactive,
                'v-list__tile--avatar': this.avatar,
                'v-list__tile--disabled': this.disabled,
                'v-list__tile--active': !this.to && this.isActive
            }, this.themeClasses, _defineProperty({}, this.activeClass, this.isActive));
        },
        isLink: function isLink() {
            return this.href || this.to || this.$listeners && (this.$listeners.click || this.$listeners['!click']);
        }
    },
    render: function render(h) {
        var isRouteLink = !this.inactive && this.isLink;

        var _ref = isRouteLink ? this.generateRouteLink(this.classes) : {
            tag: this.tag || 'div',
            data: {
                class: this.classes
            }
        },
            tag = _ref.tag,
            data = _ref.data;

        data.attrs = Object.assign({}, data.attrs, this.$attrs);
        return h('div', this.setTextColor(!this.disabled && this.color, {
            class: this.listClasses,
            attrs: {
                disabled: this.disabled
            },
            on: _extends({}, this.$listeners)
        }), [h(tag, data, this.$slots.default)]);
    }
};
//# sourceMappingURL=VListTile.js.map