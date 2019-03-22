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
import Vue from 'vue';
import Ripple from '../directives/ripple';
export default Vue.extend({
    name: 'routable',
    directives: {
        Ripple: Ripple
    },
    props: {
        activeClass: String,
        append: Boolean,
        disabled: Boolean,
        exact: {
            type: Boolean,
            default: undefined
        },
        exactActiveClass: String,
        href: [String, Object],
        to: [String, Object],
        nuxt: Boolean,
        replace: Boolean,
        ripple: [Boolean, Object],
        tag: String,
        target: String
    },
    computed: {
        computedRipple: function () {
            return (this.ripple && !this.disabled) ? this.ripple : false;
        }
    },
    methods: {
        click: function (e) {
            this.$emit('click', e);
        },
        generateRouteLink: function (classes) {
            var _a;
            var exact = this.exact;
            var tag;
            var data = (_a = {
                attrs: { disabled: this.disabled },
                class: classes,
                props: {},
                directives: [{
                        name: 'ripple',
                        value: this.computedRipple
                    }]
            },
                _a[this.to ? 'nativeOn' : 'on'] = __assign({}, this.$listeners, { click: this.click }),
                _a);
            if (typeof this.exact === 'undefined') {
                exact = this.to === '/' ||
                    (this.to === Object(this.to) && this.to.path === '/');
            }
            if (this.to) {
                // Add a special activeClass hook
                // for component level styles
                var activeClass = this.activeClass;
                var exactActiveClass = this.exactActiveClass || activeClass;
                // TODO: apply only in VListTile
                if (this.proxyClass) {
                    activeClass += ' ' + this.proxyClass;
                    exactActiveClass += ' ' + this.proxyClass;
                }
                tag = this.nuxt ? 'nuxt-link' : 'router-link';
                Object.assign(data.props, {
                    to: this.to,
                    exact: exact,
                    activeClass: activeClass,
                    exactActiveClass: exactActiveClass,
                    append: this.append,
                    replace: this.replace
                });
            }
            else {
                tag = (this.href && 'a') || this.tag || 'a';
                if (tag === 'a' && this.href)
                    data.attrs.href = this.href;
            }
            if (this.target)
                data.attrs.target = this.target;
            return { tag: tag, data: data };
        }
    }
});
//# sourceMappingURL=routable.js.map
//# sourceMappingURL=routable.js.map
//# sourceMappingURL=routable.js.map
//# sourceMappingURL=routable.js.map