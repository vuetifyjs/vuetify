var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Mixins
import Colorable from '../../mixins/colorable';
import Routable from '../../mixins/routable';
import Toggleable from '../../mixins/toggleable';
import Themeable from '../../mixins/themeable';
// Directives
import Ripple from '../../directives/ripple';
// Types
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Routable, Toggleable, Themeable).extend({
    name: 'v-list-tile',
    directives: {
        Ripple: Ripple
    },
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
    data: function () { return ({
        proxyClass: 'v-list__tile--active'
    }); },
    computed: {
        listClasses: function () {
            return this.disabled
                ? { 'v-list--disabled': true }
                : undefined;
        },
        classes: function () {
            var _a;
            return __assign({ 'v-list__tile': true, 'v-list__tile--link': this.isLink && !this.inactive, 'v-list__tile--avatar': this.avatar, 'v-list__tile--disabled': this.disabled, 'v-list__tile--active': !this.to && this.isActive }, this.themeClasses, (_a = {}, _a[this.activeClass] = this.isActive, _a));
        },
        isLink: function () {
            var hasClick = this.$listeners && (this.$listeners.click || this.$listeners['!click']);
            return Boolean(this.href ||
                this.to ||
                hasClick);
        }
    },
    render: function (h) {
        var isRouteLink = !this.inactive && this.isLink;
        var _a = isRouteLink ? this.generateRouteLink(this.classes) : {
            tag: this.tag || 'div',
            data: {
                class: this.classes
            }
        }, tag = _a.tag, data = _a.data;
        data.attrs = Object.assign({}, data.attrs, this.$attrs);
        return h('div', this.setTextColor(!this.disabled && this.color, {
            class: this.listClasses,
            attrs: {
                disabled: this.disabled,
                role: 'listitem'
            }
        }), [h(tag, data, this.$slots.default)]);
    }
});
//# sourceMappingURL=VListTile.js.map