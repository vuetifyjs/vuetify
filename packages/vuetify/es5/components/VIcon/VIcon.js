'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Mixins

// Util

// Types


require('../../../src/stylus/components/_icons.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _sizeable = require('../../mixins/sizeable');

var _sizeable2 = _interopRequireDefault(_sizeable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

var _helpers = require('../../util/helpers');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SIZE_MAP;
(function (SIZE_MAP) {
    SIZE_MAP["small"] = "16px";
    SIZE_MAP["default"] = "24px";
    SIZE_MAP["medium"] = "28px";
    SIZE_MAP["large"] = "36px";
    SIZE_MAP["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));
function isFontAwesome5(iconType) {
    return ['fas', 'far', 'fal', 'fab'].some(function (val) {
        return iconType.includes(val);
    });
}
var VIcon = (0, _mixins2.default)(_colorable2.default, _sizeable2.default, _themeable2.default
/* @vue/component */
).extend({
    name: 'v-icon',
    props: {
        disabled: Boolean,
        left: Boolean,
        right: Boolean
    },
    render: function render(h) {
        var _extends2;

        var sizes = {
            small: this.small,
            medium: this.medium,
            large: this.large,
            xLarge: this.xLarge
        };
        var explicitSize = (0, _helpers.keys)(sizes).find(function (key) {
            return sizes[key] && !!key;
        });
        var fontSize = explicitSize && SIZE_MAP[explicitSize] || (0, _helpers.convertToUnit)(this.size);
        var newChildren = [];
        var data = {
            staticClass: 'v-icon',
            attrs: _extends({
                'aria-hidden': true
            }, this.$attrs),
            on: this.$listeners
        };
        if (fontSize) data.style = { fontSize: fontSize };
        var iconName = '';
        if (this.$slots.default) iconName = this.$slots.default[0].text;
        // Remap internal names like '$vuetify.icons.cancel' to the current name for that icon
        iconName = (0, _helpers.remapInternalIcon)(this, iconName);
        var iconType = 'material-icons';
        // Material Icon delimiter is _
        // https://material.io/icons/
        var delimiterIndex = iconName.indexOf('-');
        var isCustomIcon = delimiterIndex > -1;
        if (isCustomIcon) {
            iconType = iconName.slice(0, delimiterIndex);
            if (isFontAwesome5(iconType)) iconType = '';
            // Assume if not a custom icon
            // is Material Icon font
        } else newChildren.push(iconName);
        data.class = _extends((_extends2 = {
            'v-icon--disabled': this.disabled,
            'v-icon--left': this.left,
            'v-icon--link': this.$listeners.click || this.$listeners['!click'],
            'v-icon--right': this.right
        }, _defineProperty(_extends2, iconType, true), _defineProperty(_extends2, iconName, isCustomIcon), _extends2), this.themeClasses);
        return h('i', this.setTextColor(this.color, data), newChildren);
    }
});
exports.default = _vue2.default.extend({
    name: 'v-icon',
    $_wrapperFor: VIcon,
    functional: true,
    render: function render(h, _ref) {
        var data = _ref.data,
            children = _ref.children;

        var iconName = '';
        // Support usage of v-text and v-html
        if (data.domProps) {
            iconName = data.domProps.textContent || data.domProps.innerHTML || iconName;
            // Remove nodes so it doesn't
            // overwrite our changes
            delete data.domProps.textContent;
            delete data.domProps.innerHTML;
        }
        return h(VIcon, data, iconName ? [iconName] : children);
    }
});
//# sourceMappingURL=VIcon.js.map