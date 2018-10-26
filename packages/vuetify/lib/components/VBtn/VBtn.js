var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Styles
import '../../../src/stylus/components/_buttons.styl';
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
export default mixins(Colorable, Routable, Positionable, Themeable, GroupableFactory('btnToggle'), ToggleableFactory('inputValue')
/* @vue/component */
).extend({
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
        classes: function classes() {
            var _extends2;

            return _extends((_extends2 = {
                'v-btn': true
            }, _defineProperty(_extends2, this.activeClass, this.isActive), _defineProperty(_extends2, 'v-btn--absolute', this.absolute), _defineProperty(_extends2, 'v-btn--block', this.block), _defineProperty(_extends2, 'v-btn--bottom', this.bottom), _defineProperty(_extends2, 'v-btn--disabled', this.disabled), _defineProperty(_extends2, 'v-btn--flat', this.flat), _defineProperty(_extends2, 'v-btn--floating', this.fab), _defineProperty(_extends2, 'v-btn--fixed', this.fixed), _defineProperty(_extends2, 'v-btn--icon', this.icon), _defineProperty(_extends2, 'v-btn--large', this.large), _defineProperty(_extends2, 'v-btn--left', this.left), _defineProperty(_extends2, 'v-btn--loader', this.loading), _defineProperty(_extends2, 'v-btn--outline', this.outline), _defineProperty(_extends2, 'v-btn--depressed', this.depressed && !this.flat || this.outline), _defineProperty(_extends2, 'v-btn--right', this.right), _defineProperty(_extends2, 'v-btn--round', this.round), _defineProperty(_extends2, 'v-btn--router', this.to), _defineProperty(_extends2, 'v-btn--small', this.small), _defineProperty(_extends2, 'v-btn--top', this.top), _extends2), this.themeClasses);
        },
        computedRipple: function computedRipple() {
            var defaultRipple = this.icon || this.fab ? { circle: true } : true;
            if (this.disabled) return false;else return this.ripple !== null ? this.ripple : defaultRipple;
        }
    },
    methods: {
        // Prevent focus to match md spec
        click: function click(e) {
            !this.fab && e.detail && this.$el.blur();
            this.$emit('click', e);
            this.btnToggle && this.toggle();
        },
        genContent: function genContent() {
            return this.$createElement('div', { 'class': 'v-btn__content' }, [this.$slots.default]);
        },
        genLoader: function genLoader() {
            var children = [];
            if (!this.$slots.loader) {
                children.push(this.$createElement(VProgressCircular, {
                    props: {
                        indeterminate: true,
                        size: 23,
                        width: 2
                    }
                }));
            } else {
                children.push(this.$slots.loader);
            }
            return this.$createElement('span', { 'class': 'v-btn__loading' }, children);
        }
    },
    render: function render(h) {
        var setColor = !this.outline && !this.flat ? this.setBackgroundColor : this.setTextColor;

        var _generateRouteLink = this.generateRouteLink(this.classes),
            tag = _generateRouteLink.tag,
            data = _generateRouteLink.data;

        var children = [this.genContent()];
        tag === 'button' && (data.attrs.type = this.type);
        this.loading && children.push(this.genLoader());
        data.attrs.value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);
        return h(tag, setColor(this.color, data), children);
    }
});
//# sourceMappingURL=VBtn.js.map