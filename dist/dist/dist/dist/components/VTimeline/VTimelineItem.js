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
// Types
import mixins from '../../util/mixins';
// Components
import VIcon from '../VIcon';
// Mixins
import Themeable from '../../mixins/themeable';
import Colorable from '../../mixins/colorable';
export default mixins(Colorable, Themeable
/* @vue/component */
).extend({
    name: 'v-timeline-item',
    props: {
        color: {
            type: String,
            default: 'primary'
        },
        fillDot: Boolean,
        hideDot: Boolean,
        icon: String,
        iconColor: String,
        large: Boolean,
        left: Boolean,
        right: Boolean,
        small: Boolean
    },
    computed: {
        hasIcon: function () {
            return !!this.icon || !!this.$slots.icon;
        }
    },
    methods: {
        genBody: function () {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__body'
            }, this.$slots.default);
        },
        genIcon: function () {
            if (this.$slots.icon) {
                return this.$slots.icon;
            }
            return this.$createElement(VIcon, {
                props: {
                    color: this.iconColor,
                    dark: !this.theme.isDark,
                    small: this.small
                }
            }, this.icon);
        },
        genInnerDot: function () {
            var data = this.setBackgroundColor(this.color);
            return this.$createElement('div', __assign({ staticClass: 'v-timeline-item__inner-dot' }, data), [this.hasIcon && this.genIcon()]);
        },
        genDot: function () {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__dot',
                class: {
                    'v-timeline-item__dot--small': this.small,
                    'v-timeline-item__dot--large': this.large
                }
            }, [this.genInnerDot()]);
        },
        genOpposite: function () {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__opposite'
            }, this.$slots.opposite);
        }
    },
    render: function (h) {
        var children = [this.genBody()];
        if (!this.hideDot)
            children.unshift(this.genDot());
        if (this.$slots.opposite)
            children.push(this.genOpposite());
        return h('div', {
            staticClass: 'v-timeline-item',
            class: __assign({ 'v-timeline-item--fill-dot': this.fillDot, 'v-timeline-item--left': this.left, 'v-timeline-item--right': this.right }, this.themeClasses)
        }, children);
    }
});
//# sourceMappingURL=VTimelineItem.js.map
//# sourceMappingURL=VTimelineItem.js.map
//# sourceMappingURL=VTimelineItem.js.map
//# sourceMappingURL=VTimelineItem.js.map