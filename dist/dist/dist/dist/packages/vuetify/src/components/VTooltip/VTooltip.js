import '../../stylus/components/_tooltips.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Delayable from '../../mixins/delayable';
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Menuable from '../../mixins/menuable';
import Toggleable from '../../mixins/toggleable';
// Helpers
import { convertToUnit, getSlotType } from '../../util/helpers';
import { consoleError } from '../../util/console';
/* @vue/component */
export default {
    name: 'v-tooltip',
    mixins: [Colorable, Delayable, Dependent, Detachable, Menuable, Toggleable],
    props: {
        closeDelay: {
            type: [Number, String],
            default: 200
        },
        debounce: {
            type: [Number, String],
            default: 0
        },
        disabled: Boolean,
        fixed: {
            type: Boolean,
            default: true
        },
        openDelay: {
            type: [Number, String],
            default: 200
        },
        tag: {
            type: String,
            default: 'span'
        },
        transition: String,
        zIndex: {
            default: null
        }
    },
    data: function () {
        return ({
            calculatedMinWidth: 0,
            closeDependents: false
        });
    },
    computed: {
        calculatedLeft: function () {
            var _a = this.dimensions, activator = _a.activator, content = _a.content;
            var unknown = !this.bottom && !this.left && !this.top && !this.right;
            var activatorLeft = this.isAttached ? activator.offsetLeft : activator.left;
            var left = 0;
            if (this.top || this.bottom || unknown) {
                left = (activatorLeft +
                    (activator.width / 2) -
                    (content.width / 2));
            }
            else if (this.left || this.right) {
                left = (activatorLeft +
                    (this.right ? activator.width : -content.width) +
                    (this.right ? 10 : -10));
            }
            if (this.nudgeLeft)
                left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight)
                left += parseInt(this.nudgeRight);
            return this.calcXOverflow(left, this.dimensions.content.width) + "px";
        },
        calculatedTop: function () {
            var _a = this.dimensions, activator = _a.activator, content = _a.content;
            var activatorTop = this.isAttached ? activator.offsetTop : activator.top;
            var top = 0;
            if (this.top || this.bottom) {
                top = (activatorTop +
                    (this.bottom ? activator.height : -content.height) +
                    (this.bottom ? 10 : -10));
            }
            else if (this.left || this.right) {
                top = (activatorTop +
                    (activator.height / 2) -
                    (content.height / 2));
            }
            if (this.nudgeTop)
                top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom)
                top += parseInt(this.nudgeBottom);
            return this.calcYOverflow(top + this.pageYOffset) + "px";
        },
        classes: function () {
            return {
                'v-tooltip--top': this.top,
                'v-tooltip--right': this.right,
                'v-tooltip--bottom': this.bottom,
                'v-tooltip--left': this.left
            };
        },
        computedTransition: function () {
            if (this.transition)
                return this.transition;
            if (this.top)
                return 'slide-y-reverse-transition';
            if (this.right)
                return 'slide-x-transition';
            if (this.bottom)
                return 'slide-y-transition';
            if (this.left)
                return 'slide-x-reverse-transition';
            return '';
        },
        offsetY: function () {
            return this.top || this.bottom;
        },
        offsetX: function () {
            return this.left || this.right;
        },
        styles: function () {
            return {
                left: this.calculatedLeft,
                maxWidth: convertToUnit(this.maxWidth),
                minWidth: convertToUnit(this.minWidth),
                opacity: this.isActive ? 0.9 : 0,
                top: this.calculatedTop,
                zIndex: this.zIndex || this.activeZIndex
            };
        }
    },
    beforeMount: function () {
        var _this = this;
        this.$nextTick(function () {
            _this.value && _this.callActivate();
        });
    },
    mounted: function () {
        if (getSlotType(this, 'activator', true) === 'v-slot') {
            consoleError("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'", this);
        }
    },
    methods: {
        activate: function () {
            // Update coordinates and dimensions of menu
            // and its activator
            this.updateDimensions();
            // Start the transition
            requestAnimationFrame(this.startTransition);
        },
        genActivator: function () {
            var _this = this;
            var listeners = this.disabled ? {} : {
                mouseenter: function (e) {
                    _this.getActivator(e);
                    _this.runDelay('open');
                },
                mouseleave: function (e) {
                    _this.getActivator(e);
                    _this.runDelay('close');
                }
            };
            if (getSlotType(this, 'activator') === 'scoped') {
                var activator = this.$scopedSlots.activator({ on: listeners });
                this.activatorNode = activator;
                return activator;
            }
            return this.$createElement('span', {
                on: listeners,
                ref: 'activator'
            }, this.$slots.activator);
        }
    },
    render: function (h) {
        var _a;
        var tooltip = h('div', this.setBackgroundColor(this.color, {
            staticClass: 'v-tooltip__content',
            'class': (_a = {},
                _a[this.contentClass] = true,
                _a['menuable__content__active'] = this.isActive,
                _a['v-tooltip__content--fixed'] = this.activatorFixed,
                _a),
            style: this.styles,
            attrs: this.getScopeIdAttrs(),
            directives: [{
                    name: 'show',
                    value: this.isContentActive
                }],
            ref: 'content'
        }), this.showLazyContent(this.$slots.default));
        return h(this.tag, {
            staticClass: 'v-tooltip',
            'class': this.classes
        }, [
            h('transition', {
                props: {
                    name: this.computedTransition
                }
            }, [tooltip]),
            this.genActivator()
        ]);
    }
};
//# sourceMappingURL=VTooltip.js.map
//# sourceMappingURL=VTooltip.js.map
//# sourceMappingURL=VTooltip.js.map
//# sourceMappingURL=VTooltip.js.map