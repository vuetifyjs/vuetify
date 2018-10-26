// Styles
import '../../../src/stylus/components/_rating.styl';
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
    data: function data() {
        return {
            hoverIndex: -1,
            internalValue: this.value
        };
    },

    computed: {
        directives: function directives() {
            if (this.readonly || !this.ripple) return [];
            return [{
                name: 'ripple',
                value: { circle: true }
            }];
        },
        iconProps: function iconProps() {
            var _$props = this.$props,
                dark = _$props.dark,
                medium = _$props.medium,
                large = _$props.large,
                light = _$props.light,
                small = _$props.small,
                size = _$props.size,
                xLarge = _$props.xLarge;

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
        isHovering: function isHovering() {
            return this.hover && this.hoverIndex >= 0;
        }
    },
    watch: {
        internalValue: function internalValue(val) {
            val !== this.value && this.$emit('input', val);
        },
        value: function value(val) {
            this.internalValue = val;
        }
    },
    methods: {
        createClickFn: function createClickFn(i) {
            var _this = this;

            return function (e) {
                if (_this.readonly) return;
                var newValue = _this.genHoverIndex(e, i);
                if (_this.clearable && _this.internalValue === newValue) {
                    _this.internalValue = 0;
                } else {
                    _this.internalValue = newValue;
                }
            };
        },
        createProps: function createProps(i) {
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
        genHoverIndex: function genHoverIndex(e, i) {
            return i + (this.isHalfEvent(e) ? 0.5 : 1);
        },
        getIconName: function getIconName(props) {
            var isFull = this.isHovering ? props.isHovered : props.isFilled;
            var isHalf = this.isHovering ? props.isHalfHovered : props.isHalfFilled;
            return isFull ? this.fullIcon : isHalf ? this.halfIcon : this.emptyIcon;
        },
        getColor: function getColor(props) {
            if (this.isHovering) {
                if (props.isHovered || props.isHalfHovered) return this.color;
            } else {
                if (props.isFilled || props.isHalfFilled) return this.color;
            }
            return this.backgroundColor;
        },
        isHalfEvent: function isHalfEvent(e) {
            if (this.halfIncrements) {
                var rect = e.target && e.target.getBoundingClientRect();
                if (rect && e.pageX - rect.left < rect.width / 2) return true;
            }
            return false;
        },
        onMouseEnter: function onMouseEnter(e, i) {
            var _this2 = this;

            this.runDelay('open', function () {
                _this2.hoverIndex = _this2.genHoverIndex(e, i);
            });
        },
        onMouseLeave: function onMouseLeave() {
            var _this3 = this;

            this.runDelay('close', function () {
                return _this3.hoverIndex = -1;
            });
        },
        genItem: function genItem(i) {
            var _this4 = this;

            var props = this.createProps(i);
            if (this.$scopedSlots.item) return this.$scopedSlots.item(props);
            var listeners = {
                click: props.click
            };
            if (this.hover) {
                listeners.mouseenter = function (e) {
                    return _this4.onMouseEnter(e, i);
                };
                listeners.mouseleave = this.onMouseLeave;
                if (this.halfIncrements) {
                    listeners.mousemove = function (e) {
                        return _this4.onMouseEnter(e, i);
                    };
                }
            }
            return this.$createElement(VIcon, this.setTextColor(this.getColor(props), {
                directives: this.directives,
                props: this.iconProps,
                on: listeners
            }), [this.getIconName(props)]);
        }
    },
    render: function render(h) {
        var _this5 = this;

        var children = createRange(Number(this.length)).map(function (i) {
            return _this5.genItem(i);
        });
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