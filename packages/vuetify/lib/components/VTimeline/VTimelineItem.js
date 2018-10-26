var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
        hasIcon: function hasIcon() {
            return !!this.icon || !!this.$slots.icon;
        }
    },
    methods: {
        genBody: function genBody() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__body'
            }, this.$slots.default);
        },
        genIcon: function genIcon() {
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
        genInnerDot: function genInnerDot() {
            var children = [];
            this.hasIcon && children.push(this.genIcon());
            var data = this.setBackgroundColor(this.color);
            return this.$createElement('div', _extends({
                staticClass: 'v-timeline-item__inner-dot'
            }, data), children);
        },
        genDot: function genDot() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__dot',
                class: {
                    'v-timeline-item__dot--small': this.small,
                    'v-timeline-item__dot--large': this.large
                }
            }, [this.genInnerDot()]);
        },
        genOpposite: function genOpposite() {
            return this.$createElement('div', {
                staticClass: 'v-timeline-item__opposite'
            }, [this.$slots.opposite]);
        }
    },
    render: function render(h) {
        var children = [this.genBody()];
        if (!this.hideDot) children.unshift(this.genDot());
        if (this.$slots.opposite) children.push(this.genOpposite());
        return h('div', {
            staticClass: 'v-timeline-item',
            class: _extends({
                'v-timeline-item--fill-dot': this.fillDot,
                'v-timeline-item--left': this.left,
                'v-timeline-item--right': this.right
            }, this.themeClasses)
        }, children);
    }
});
//# sourceMappingURL=VTimelineItem.js.map