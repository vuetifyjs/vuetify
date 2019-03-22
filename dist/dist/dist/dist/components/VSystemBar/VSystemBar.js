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
import '../../stylus/components/_system-bars.styl';
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import mixins from '../../util/mixins';
export default mixins(Applicationable('bar', [
    'height',
    'window'
]), Colorable, Themeable
/* @vue/component */
).extend({
    name: 'v-system-bar',
    props: {
        height: {
            type: [Number, String],
            validator: function (v) { return !isNaN(parseInt(v)); }
        },
        lightsOut: Boolean,
        status: Boolean,
        window: Boolean
    },
    computed: {
        classes: function () {
            return __assign({ 'v-system-bar--lights-out': this.lightsOut, 'v-system-bar--absolute': this.absolute, 'v-system-bar--fixed': !this.absolute && (this.app || this.fixed), 'v-system-bar--status': this.status, 'v-system-bar--window': this.window }, this.themeClasses);
        },
        computedHeight: function () {
            if (this.height)
                return parseInt(this.height);
            return this.window ? 32 : 24;
        }
    },
    methods: {
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function () {
            return this.computedHeight;
        }
    },
    render: function (h) {
        var data = {
            staticClass: 'v-system-bar',
            'class': this.classes,
            style: {
                height: this.computedHeight + "px"
            }
        };
        return h('div', this.setBackgroundColor(this.color, data), this.$slots.default);
    }
});
//# sourceMappingURL=VSystemBar.js.map
//# sourceMappingURL=VSystemBar.js.map
//# sourceMappingURL=VSystemBar.js.map
//# sourceMappingURL=VSystemBar.js.map