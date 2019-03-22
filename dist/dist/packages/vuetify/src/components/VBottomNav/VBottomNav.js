// Styles
import '../../stylus/components/_bottom-navs.styl';
// Mixins
import Applicationable from '../../mixins/applicationable';
import ButtonGroup from '../../mixins/button-group';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
// Util
import mixins from '../../util/mixins';
export default mixins(Applicationable('bottom', [
    'height',
    'value'
]), Colorable, Themeable
/* @vue/component */
).extend({
    name: 'v-bottom-nav',
    props: {
        active: [Number, String],
        mandatory: Boolean,
        height: {
            default: 56,
            type: [Number, String],
            validator: function (v) { return !isNaN(parseInt(v)); }
        },
        shift: Boolean,
        value: null
    },
    computed: {
        classes: function () {
            return {
                'v-bottom-nav--absolute': this.absolute,
                'v-bottom-nav--fixed': !this.absolute && (this.app || this.fixed),
                'v-bottom-nav--shift': this.shift,
                'v-bottom-nav--active': this.value
            };
        },
        computedHeight: function () {
            return parseInt(this.height);
        }
    },
    methods: {
        updateApplication: function () {
            return !this.value
                ? 0
                : this.computedHeight;
        },
        updateValue: function (val) {
            this.$emit('update:active', val);
        }
    },
    render: function (h) {
        return h(ButtonGroup, this.setBackgroundColor(this.color, {
            staticClass: 'v-bottom-nav',
            class: this.classes,
            style: {
                height: parseInt(this.computedHeight) + "px"
            },
            props: {
                mandatory: Boolean(this.mandatory || this.active !== undefined),
                value: this.active
            },
            on: { change: this.updateValue }
        }), this.$slots.default);
    }
});
//# sourceMappingURL=VBottomNav.js.map
//# sourceMappingURL=VBottomNav.js.map