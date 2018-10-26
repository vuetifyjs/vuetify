var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Styles
import '../../../src/stylus/components/_footer.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
/* @vue/component */
export default {
    name: 'v-footer',
    mixins: [Applicationable(null, ['height', 'inset']), Colorable, Themeable],
    props: {
        height: {
            default: 32,
            type: [Number, String]
        },
        inset: Boolean
    },
    computed: {
        applicationProperty: function applicationProperty() {
            return this.inset ? 'insetFooter' : 'footer';
        },
        computedMarginBottom: function computedMarginBottom() {
            if (!this.app) return;
            return this.$vuetify.application.bottom;
        },
        computedPaddingLeft: function computedPaddingLeft() {
            return !this.app || !this.inset ? 0 : this.$vuetify.application.left;
        },
        computedPaddingRight: function computedPaddingRight() {
            return !this.app ? 0 : this.$vuetify.application.right;
        },
        styles: function styles() {
            var styles = {
                height: isNaN(this.height) ? this.height : this.height + 'px'
            };
            if (this.computedPaddingLeft) {
                styles.paddingLeft = this.computedPaddingLeft + 'px';
            }
            if (this.computedPaddingRight) {
                styles.paddingRight = this.computedPaddingRight + 'px';
            }
            if (this.computedMarginBottom) {
                styles.marginBottom = this.computedMarginBottom + 'px';
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
        updateApplication: function updateApplication() {
            var height = parseInt(this.height);
            return isNaN(height) ? this.$el ? this.$el.clientHeight : 0 : height;
        }
    },
    render: function render(h) {
        var data = this.setBackgroundColor(this.color, {
            staticClass: 'v-footer',
            'class': _extends({
                'v-footer--absolute': this.absolute,
                'v-footer--fixed': !this.absolute && (this.app || this.fixed),
                'v-footer--inset': this.inset
            }, this.themeClasses),
            style: this.styles,
            ref: 'content'
        });
        return h('footer', data, this.$slots.default);
    }
};
//# sourceMappingURL=VFooter.js.map