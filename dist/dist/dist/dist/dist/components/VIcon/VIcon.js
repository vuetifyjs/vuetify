var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import '../../stylus/components/_icons.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Sizeable from '../../mixins/sizeable';
import Themeable from '../../mixins/themeable';
// Util
import { convertToUnit, keys, remapInternalIcon } from '../../util/helpers';
// Types
import Vue from 'vue';
import mixins from '../../util/mixins';
var SIZE_MAP;
(function (SIZE_MAP) {
    SIZE_MAP["small"] = "16px";
    SIZE_MAP["default"] = "24px";
    SIZE_MAP["medium"] = "28px";
    SIZE_MAP["large"] = "36px";
    SIZE_MAP["xLarge"] = "40px";
})(SIZE_MAP || (SIZE_MAP = {}));
function isFontAwesome5(iconType) {
    return ['fas', 'far', 'fal', 'fab'].some(function (val) { return iconType.includes(val); });
}
var VIcon = mixins(Colorable, Sizeable, Themeable
/* @vue/component */
).extend({
    name: 'v-icon',
    props: {
        disabled: Boolean,
        left: Boolean,
        right: Boolean
    },
    methods: {
        getIcon: function () {
            var iconName = '';
            if (this.$slots.default)
                iconName = this.$slots.default[0].text.trim();
            return remapInternalIcon(this, iconName);
        },
        getSize: function () {
            var sizes = {
                small: this.small,
                medium: this.medium,
                large: this.large,
                xLarge: this.xLarge
            };
            var explicitSize = keys(sizes).find(function (key) { return sizes[key]; });
            return (explicitSize && SIZE_MAP[explicitSize]) || convertToUnit(this.size);
        },
        // Component data for both font and svg icon.
        getDefaultData: function () {
            var data = {
                staticClass: 'v-icon',
                class: {
                    'v-icon--disabled': this.disabled,
                    'v-icon--left': this.left,
                    'v-icon--link': this.$listeners.click || this.$listeners['!click'],
                    'v-icon--right': this.right
                },
                attrs: __assign({ 'aria-hidden': true }, this.$attrs),
                on: this.$listeners
            };
            return data;
        },
        applyColors: function (data) {
            data.class = __assign({}, data.class, this.themeClasses);
            this.setTextColor(this.color, data);
        },
        renderFontIcon: function (icon, h) {
            var newChildren = [];
            var data = this.getDefaultData();
            var iconType = 'material-icons';
            // Material Icon delimiter is _
            // https://material.io/icons/
            var delimiterIndex = icon.indexOf('-');
            var isMaterialIcon = delimiterIndex <= -1;
            if (isMaterialIcon) {
                // Material icon uses ligatures.
                newChildren.push(icon);
            }
            else {
                iconType = icon.slice(0, delimiterIndex);
                if (isFontAwesome5(iconType))
                    iconType = '';
            }
            data.class[iconType] = true;
            data.class[icon] = !isMaterialIcon;
            var fontSize = this.getSize();
            if (fontSize)
                data.style = { fontSize: fontSize };
            this.applyColors(data);
            return h('i', data, newChildren);
        },
        renderSvgIcon: function (icon, h) {
            var data = this.getDefaultData();
            data.class['v-icon--is-component'] = true;
            var size = this.getSize();
            if (size) {
                data.style = {
                    fontSize: size,
                    height: size
                };
            }
            this.applyColors(data);
            var component = icon.component;
            data.props = icon.props;
            data.nativeOn = data.on;
            return h(component, data);
        }
    },
    render: function (h) {
        var icon = this.getIcon();
        if (typeof icon === 'string') {
            return this.renderFontIcon(icon, h);
        }
        return this.renderSvgIcon(icon, h);
    }
});
export default Vue.extend({
    name: 'v-icon',
    $_wrapperFor: VIcon,
    functional: true,
    render: function (h, _a) {
        var data = _a.data, children = _a.children;
        var iconName = '';
        // Support usage of v-text and v-html
        if (data.domProps) {
            iconName = data.domProps.textContent ||
                data.domProps.innerHTML ||
                iconName;
            // Remove nodes so it doesn't
            // overwrite our changes
            delete data.domProps.textContent;
            delete data.domProps.innerHTML;
        }
        return h(VIcon, data, iconName ? [iconName] : children);
    }
});
//# sourceMappingURL=VIcon.js.map
//# sourceMappingURL=VIcon.js.map
//# sourceMappingURL=VIcon.js.map
//# sourceMappingURL=VIcon.js.map
//# sourceMappingURL=VIcon.js.map