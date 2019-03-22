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
// Styles
import '../../stylus/components/_buttons.styl';
import mixins from '../../util/mixins';
// Components
import VProgressCircular from '../VProgressCircular';
// Mixins
import Colorable from '../../mixins/colorable';
import { factory as GroupableFactory } from '../../mixins/groupable';
import Positionable from '../../mixins/positionable';
import Routable from '../../mixins/routable';
import Themeable from '../../mixins/themeable';
import { factory as ToggleableFactory } from '../../mixins/toggleable';
// Utilities
import { getObjectValueByPath } from '../../util/helpers';
var baseMixins = mixins(Colorable, Routable, Positionable, Themeable, GroupableFactory('btnToggle'), ToggleableFactory('inputValue')
/* @vue/component */
);
export default baseMixins.extend().extend({
    name: 'v-btn',
    props: {
        activeClass: {
            type: String,
            default: 'v-btn--active'
        },
        block: Boolean,
        depressed: Boolean,
        fab: Boolean,
        flat: Boolean,
        icon: Boolean,
        large: Boolean,
        loading: Boolean,
        outline: Boolean,
        ripple: {
            type: [Boolean, Object],
            default: null
        },
        round: Boolean,
        small: Boolean,
        tag: {
            type: String,
            default: 'button'
        },
        type: {
            type: String,
            default: 'button'
        },
        value: null
    },
    computed: {
        classes: function () {
            var _a;
            return __assign((_a = { 'v-btn': true }, _a[this.activeClass] = this.isActive, _a['v-btn--absolute'] = this.absolute, _a['v-btn--block'] = this.block, _a['v-btn--bottom'] = this.bottom, _a['v-btn--disabled'] = this.disabled, _a['v-btn--flat'] = this.flat, _a['v-btn--floating'] = this.fab, _a['v-btn--fixed'] = this.fixed, _a['v-btn--icon'] = this.icon, _a['v-btn--large'] = this.large, _a['v-btn--left'] = this.left, _a['v-btn--loader'] = this.loading, _a['v-btn--outline'] = this.outline, _a['v-btn--depressed'] = (this.depressed && !this.flat) || this.outline, _a['v-btn--right'] = this.right, _a['v-btn--round'] = this.round, _a['v-btn--router'] = this.to, _a['v-btn--small'] = this.small, _a['v-btn--top'] = this.top, _a), this.themeClasses);
        },
        computedRipple: function () {
            var defaultRipple = this.icon || this.fab ? { circle: true } : true;
            if (this.disabled)
                return false;
            else
                return this.ripple !== null ? this.ripple : defaultRipple;
        }
    },
    watch: {
        '$route': 'onRouteChange'
    },
    methods: {
        // Prevent focus to match md spec
        click: function (e) {
            !this.fab &&
                e.detail &&
                this.$el.blur();
            this.$emit('click', e);
            this.btnToggle && this.toggle();
        },
        genContent: function () {
            return this.$createElement('div', { 'class': 'v-btn__content' }, this.$slots.default);
        },
        genLoader: function () {
            return this.$createElement('span', {
                class: 'v-btn__loading'
            }, this.$slots.loader || [this.$createElement(VProgressCircular, {
                    props: {
                        indeterminate: true,
                        size: 23,
                        width: 2
                    }
                })]);
        },
        onRouteChange: function () {
            var _this = this;
            if (!this.to || !this.$refs.link)
                return;
            var path = "_vnode.data.class." + this.activeClass;
            this.$nextTick(function () {
                if (getObjectValueByPath(_this.$refs.link, path)) {
                    _this.toggle();
                }
            });
        }
    },
    render: function (h) {
        var setColor = (!this.outline && !this.flat && !this.disabled) ? this.setBackgroundColor : this.setTextColor;
        var _a = this.generateRouteLink(this.classes), tag = _a.tag, data = _a.data;
        var children = [
            this.genContent(),
            this.loading && this.genLoader()
        ];
        if (tag === 'button')
            data.attrs.type = this.type;
        data.attrs.value = ['string', 'number'].includes(typeof this.value)
            ? this.value
            : JSON.stringify(this.value);
        if (this.btnToggle) {
            data.ref = 'link';
        }
        return h(tag, setColor(this.color, data), children);
    }
});
//# sourceMappingURL=VBtn.js.map
//# sourceMappingURL=VBtn.js.map
//# sourceMappingURL=VBtn.js.map