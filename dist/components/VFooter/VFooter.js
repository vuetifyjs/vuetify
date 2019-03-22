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
// Styles
import '../../stylus/components/_footer.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-footer',
    mixins: [
        Applicationable(null, [
            'height',
            'inset'
        ]),
        Colorable,
        Themeable
    ],
    props: {
        height: {
            default: 32,
            type: [Number, String]
        },
        inset: Boolean
    },
    computed: {
        applicationProperty: function () {
            return this.inset ? 'insetFooter' : 'footer';
        },
        computedMarginBottom: function () {
            if (!this.app)
                return;
            return this.$vuetify.application.bottom;
        },
        computedPaddingLeft: function () {
            return !this.app || !this.inset
                ? 0
                : this.$vuetify.application.left;
        },
        computedPaddingRight: function () {
            return !this.app || !this.inset
                ? 0
                : this.$vuetify.application.right;
        },
        styles: function () {
            var styles = {
                height: isNaN(this.height) ? this.height : this.height + "px"
            };
            if (this.computedPaddingLeft) {
                styles.paddingLeft = this.computedPaddingLeft + "px";
            }
            if (this.computedPaddingRight) {
                styles.paddingRight = this.computedPaddingRight + "px";
            }
            if (this.computedMarginBottom) {
                styles.marginBottom = this.computedMarginBottom + "px";
            }
            return styles;
        }
    },
    methods: {
        /**
         * Update the application layout
         *
         * @return {number}
         */
        updateApplication: function () {
            var height = parseInt(this.height);
            return isNaN(height)
                ? this.$el ? this.$el.clientHeight : 0
                : height;
        }
    },
    render: function (h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-footer',
            'class': __assign({ 'v-footer--absolute': this.absolute, 'v-footer--fixed': !this.absolute && (this.app || this.fixed), 'v-footer--inset': this.inset }, this.themeClasses),
            style: this.styles,
            ref: 'content'
        });
        return h('footer', data, this.$slots.default);
    }
};
//# sourceMappingURL=VFooter.js.map