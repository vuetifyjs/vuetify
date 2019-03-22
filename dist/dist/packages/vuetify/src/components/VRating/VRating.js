// Styles
import '../../stylus/components/_rating.styl';
// Components
import VIcon from '../VIcon';
// Mixins
import Colorable from '../../mixins/colorable';
import Delayable from '../../mixins/delayable';
import Sizeable from '../../mixins/sizeable';
import Rippleable from '../../mixins/rippleable';
import Themeable from '../../mixins/themeable';
// Utilities
import { createRange } from '../../util/helpers';
import mixins from '../../util/mixins';
/* @vue/component */
export default mixins(Colorable, Delayable, Rippleable, Sizeable, Themeable).extend({
    name: 'v-rating',
    props: {
        backgroundColor: {
            type: String,
            default: 'accent'
        },
        color: {
            type: String,
            default: 'primary'
        },
        dense: Boolean,
        emptyIcon: {
            type: String,
            default: '$vuetify.icons.ratingEmpty'
        },
        fullIcon: {
            type: String,
            default: '$vuetify.icons.ratingFull'
        },
        halfIcon: {
            type: String,
            default: '$vuetify.icons.ratingHalf'
        },
        halfIncrements: Boolean,
        length: {
            type: [Number, String],
            default: 5
        },
        clearable: Boolean,
        readonly: Boolean,
        hover: Boolean,
        value: {
            type: Number,
            default: 0
        }
    },
    data: function () {
        return {
            hoverIndex: -1,
            internalValue: this.value
        };
    },
    computed: {
        directives: function () {
            if (this.readonly || !this.ripple)
                return [];
            return [{
                    name: 'ripple',
                    value: { circle: true }
                }];
        },
        iconProps: function () {
            var _a = this.$props, dark = _a.dark, medium = _a.medium, large = _a.large, light = _a.light, small = _a.small, size = _a.size, xLarge = _a.xLarge;
            return {
                dark: dark,
                medium: medium,
                large: large,
                light: light,
                size: size,
                small: small,
                xLarge: xLarge
            };
        },
        isHovering: function () {
            return this.hover && this.hoverIndex >= 0;
        }
    },
    watch: {
        internalValue: function (val) {
            val !== this.value && this.$emit('input', val);
        },
        value: function (val) {
            this.internalValue = val;
        }
    },
    methods: {
        createClickFn: function (i) {
            var _this = this;
            return function (e) {
                if (_this.readonly)
                    return;
                var newValue = _this.genHoverIndex(e, i);
                if (_this.clearable && _this.internalValue === newValue) {
                    _this.internalValue = 0;
                }
                else {
                    _this.internalValue = newValue;
                }
            };
        },
        createProps: function (i) {
            var props = {
                index: i,
                value: this.internalValue,
                click: this.createClickFn(i),
                isFilled: Math.floor(this.internalValue) > i,
                isHovered: Math.floor(this.hoverIndex) > i
            };
            if (this.halfIncrements) {
                props.isHalfHovered = !props.isHovered && (this.hoverIndex - i) % 1 > 0;
                props.isHalfFilled = !props.isFilled && (this.internalValue - i) % 1 > 0;
            }
            return props;
        },
        genHoverIndex: function (e, i) {
            return i + (this.isHalfEvent(e) ? 0.5 : 1);
        },
        getIconName: function (props) {
            var isFull = this.isHovering ? props.isHovered : props.isFilled;
            var isHalf = this.isHovering ? props.isHalfHovered : props.isHalfFilled;
            return isFull ? this.fullIcon : isHalf ? this.halfIcon : this.emptyIcon;
        },
        getColor: function (props) {
            if (this.isHovering) {
                if (props.isHovered || props.isHalfHovered)
                    return this.color;
            }
            else {
                if (props.isFilled || props.isHalfFilled)
                    return this.color;
            }
            return this.backgroundColor;
        },
        isHalfEvent: function (e) {
            if (this.halfIncrements) {
                var rect = e.target && e.target.getBoundingClientRect();
                if (rect && (e.pageX - rect.left) < rect.width / 2)
                    return true;
            }
            return false;
        },
        onMouseEnter: function (e, i) {
            var _this = this;
            this.runDelay('open', function () {
                _this.hoverIndex = _this.genHoverIndex(e, i);
            });
        },
        onMouseLeave: function () {
            var _this = this;
            this.runDelay('close', function () { return (_this.hoverIndex = -1); });
        },
        genItem: function (i) {
            var _this = this;
            var props = this.createProps(i);
            if (this.$scopedSlots.item)
                return this.$scopedSlots.item(props);
            var listeners = {
                click: props.click
            };
            if (this.hover) {
                listeners.mouseenter = function (e) { return _this.onMouseEnter(e, i); };
                listeners.mouseleave = this.onMouseLeave;
                if (this.halfIncrements) {
                    listeners.mousemove = function (e) { return _this.onMouseEnter(e, i); };
                }
            }
            return this.$createElement(VIcon, this.setTextColor(this.getColor(props), {
                directives: this.directives,
                props: this.iconProps,
                on: listeners
            }), [this.getIconName(props)]);
        }
    },
    render: function (h) {
        var _this = this;
        var children = createRange(Number(this.length)).map(function (i) { return _this.genItem(i); });
        return h('div', {
            staticClass: 'v-rating',
            class: {
                'v-rating--readonly': this.readonly,
                'v-rating--dense': this.dense
            }
        }, children);
    }
});
//# sourceMappingURL=VRating.js.map
//# sourceMappingURL=VRating.js.map