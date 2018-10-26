var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import '../../../src/stylus/components/_pickers.styl';
import '../../../src/stylus/components/_cards.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
// Helpers
import { convertToUnit } from '../../util/helpers';
/* @vue/component */
export default {
    name: 'v-picker',
    mixins: [Colorable, Themeable],
    props: {
        fullWidth: Boolean,
        landscape: Boolean,
        transition: {
            type: String,
            default: 'fade-transition'
        },
        width: {
            type: [Number, String],
            default: 290
        }
    },
    computed: {
        computedTitleColor: function computedTitleColor() {
            var defaultTitleColor = this.isDark ? null : this.color || 'primary';
            return this.color || defaultTitleColor;
        }
    },
    methods: {
        genTitle: function genTitle() {
            return this.$createElement('div', this.setBackgroundColor(this.computedTitleColor, {
                staticClass: 'v-picker__title',
                'class': {
                    'v-picker__title--landscape': this.landscape
                }
            }), this.$slots.title);
        },
        genBodyTransition: function genBodyTransition() {
            return this.$createElement('transition', {
                props: {
                    name: this.transition
                }
            }, this.$slots.default);
        },
        genBody: function genBody() {
            return this.$createElement('div', {
                staticClass: 'v-picker__body',
                'class': this.themeClasses,
                style: this.fullWidth ? undefined : {
                    width: convertToUnit(this.width)
                }
            }, [this.genBodyTransition()]);
        },
        genActions: function genActions() {
            return this.$createElement('div', {
                staticClass: 'v-picker__actions v-card__actions'
            }, this.$slots.actions);
        }
    },
    render: function render(h) {
        return h('div', {
            staticClass: 'v-picker v-card',
            'class': _extends({
                'v-picker--landscape': this.landscape,
                'v-picker--full-width': this.fullWidth
            }, this.themeClasses)
        }, [this.$slots.title ? this.genTitle() : null, this.genBody(), this.$slots.actions ? this.genActions() : null]);
    }
};
//# sourceMappingURL=VPicker.js.map