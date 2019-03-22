import '../../stylus/components/_progress-linear.styl';
// Mixins
import Colorable from '../../mixins/colorable';
// Helpers
import { convertToUnit } from '../../util/helpers';
import mixins from '../../util/mixins';
import { VFadeTransition, VSlideXTransition } from '../transitions';
/* @vue/component */
export default mixins(Colorable).extend({
    name: 'v-progress-linear',
    props: {
        active: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: null
        },
        backgroundOpacity: {
            type: [Number, String],
            default: null
        },
        bufferValue: {
            type: [Number, String],
            default: 100
        },
        color: {
            type: String,
            default: 'primary'
        },
        height: {
            type: [Number, String],
            default: 7
        },
        indeterminate: Boolean,
        query: Boolean,
        value: {
            type: [Number, String],
            default: 0
        }
    },
    computed: {
        backgroundStyle: function () {
            var backgroundOpacity = this.backgroundOpacity == null
                ? (this.backgroundColor ? 1 : 0.3)
                : parseFloat(this.backgroundOpacity);
            return {
                height: this.active ? convertToUnit(this.height) : 0,
                opacity: backgroundOpacity,
                width: this.normalizedBufer + "%"
            };
        },
        effectiveWidth: function () {
            if (!this.normalizedBufer) {
                return 0;
            }
            return +this.normalizedValue * 100 / +this.normalizedBufer;
        },
        normalizedBufer: function () {
            if (this.bufferValue < 0) {
                return 0;
            }
            if (this.bufferValue > 100) {
                return 100;
            }
            return parseFloat(this.bufferValue);
        },
        normalizedValue: function () {
            if (this.value < 0) {
                return 0;
            }
            if (this.value > 100) {
                return 100;
            }
            return parseFloat(this.value);
        },
        styles: function () {
            var styles = {};
            if (!this.active) {
                styles.height = 0;
            }
            if (!this.indeterminate && parseFloat(this.normalizedBufer) !== 100) {
                styles.width = this.normalizedBufer + "%";
            }
            return styles;
        }
    },
    methods: {
        genDeterminate: function (h) {
            return h('div', this.setBackgroundColor(this.color, {
                ref: 'front',
                staticClass: "v-progress-linear__bar__determinate",
                style: {
                    width: this.effectiveWidth + "%"
                }
            }));
        },
        genBar: function (h, name) {
            var _a;
            return h('div', this.setBackgroundColor(this.color, {
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: (_a = {},
                    _a[name] = true,
                    _a)
            }));
        },
        genIndeterminate: function (h) {
            return h('div', {
                ref: 'front',
                staticClass: 'v-progress-linear__bar__indeterminate',
                class: {
                    'v-progress-linear__bar__indeterminate--active': this.active
                }
            }, [
                this.genBar(h, 'long'),
                this.genBar(h, 'short')
            ]);
        }
    },
    render: function (h) {
        var fade = h(VFadeTransition, this.indeterminate ? [this.genIndeterminate(h)] : []);
        var slide = h(VSlideXTransition, this.indeterminate ? [] : [this.genDeterminate(h)]);
        var bar = h('div', {
            staticClass: 'v-progress-linear__bar',
            style: this.styles
        }, [fade, slide]);
        var background = h('div', this.setBackgroundColor(this.backgroundColor || this.color, {
            staticClass: 'v-progress-linear__background',
            style: this.backgroundStyle
        }));
        var content = this.$slots.default && h('div', {
            staticClass: 'v-progress-linear__content'
        }, this.$slots.default);
        return h('div', {
            staticClass: 'v-progress-linear',
            attrs: {
                'role': 'progressbar',
                'aria-valuemin': 0,
                'aria-valuemax': this.normalizedBufer,
                'aria-valuenow': this.indeterminate ? undefined : this.normalizedValue
            },
            class: {
                'v-progress-linear--query': this.query
            },
            style: {
                height: convertToUnit(this.height)
            },
            on: this.$listeners
        }, [
            background,
            bar,
            content
        ]);
    }
});
//# sourceMappingURL=VProgressLinear.js.map
//# sourceMappingURL=VProgressLinear.js.map
//# sourceMappingURL=VProgressLinear.js.map