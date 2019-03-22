import Vue from 'vue';
import Positionable from './positionable';
import Stackable from './stackable';
/* eslint-disable object-property-newline */
var dimensions = {
    activator: {
        top: 0, left: 0,
        bottom: 0, right: 0,
        width: 0, height: 0,
        offsetTop: 0, scrollHeight: 0
    },
    content: {
        top: 0, left: 0,
        bottom: 0, right: 0,
        width: 0, height: 0,
        offsetTop: 0, scrollHeight: 0
    },
    hasWindow: false
};
/* eslint-enable object-property-newline */
/**
 * Menuable
 *
 * @mixin
 *
 * Used for fixed or absolutely positioning
 * elements within the DOM
 * Can calculate X and Y axis overflows
 * As well as be manually positioned
 */
/* @vue/component */
export default Vue.extend({
    name: 'menuable',
    mixins: [
        Positionable,
        Stackable
    ],
    props: {
        activator: {
            default: null,
            validator: function (val) {
                return ['string', 'object'].includes(typeof val);
            }
        },
        allowOverflow: Boolean,
        inputActivator: Boolean,
        light: Boolean,
        dark: Boolean,
        maxWidth: {
            type: [Number, String],
            default: 'auto'
        },
        minWidth: [Number, String],
        nudgeBottom: {
            type: [Number, String],
            default: 0
        },
        nudgeLeft: {
            type: [Number, String],
            default: 0
        },
        nudgeRight: {
            type: [Number, String],
            default: 0
        },
        nudgeTop: {
            type: [Number, String],
            default: 0
        },
        nudgeWidth: {
            type: [Number, String],
            default: 0
        },
        offsetOverflow: Boolean,
        positionX: {
            type: Number,
            default: null
        },
        positionY: {
            type: Number,
            default: null
        },
        zIndex: {
            type: [Number, String],
            default: null
        }
    },
    data: function () {
        return ({
            absoluteX: 0,
            absoluteY: 0,
            activatorFixed: false,
            dimensions: Object.assign({}, dimensions),
            isContentActive: false,
            pageWidth: 0,
            pageYOffset: 0,
            stackClass: 'v-menu__content--active',
            stackMinZIndex: 6
        });
    },
    computed: {
        computedLeft: function () {
            var a = this.dimensions.activator;
            var c = this.dimensions.content;
            var activatorLeft = (this.isAttached ? a.offsetLeft : a.left) || 0;
            var minWidth = Math.max(a.width, c.width);
            var left = 0;
            left += this.left ? activatorLeft - (minWidth - a.width) : activatorLeft;
            if (this.offsetX) {
                var maxWidth = isNaN(this.maxWidth)
                    ? a.width
                    : Math.min(a.width, this.maxWidth);
                left += this.left ? -maxWidth : a.width;
            }
            if (this.nudgeLeft)
                left -= parseInt(this.nudgeLeft);
            if (this.nudgeRight)
                left += parseInt(this.nudgeRight);
            return left;
        },
        computedTop: function () {
            var a = this.dimensions.activator;
            var c = this.dimensions.content;
            var top = 0;
            if (this.top)
                top += a.height - c.height;
            if (this.isAttached)
                top += a.offsetTop;
            else
                top += a.top + this.pageYOffset;
            if (this.offsetY)
                top += this.top ? -a.height : a.height;
            if (this.nudgeTop)
                top -= parseInt(this.nudgeTop);
            if (this.nudgeBottom)
                top += parseInt(this.nudgeBottom);
            return top;
        },
        hasActivator: function () {
            return !!this.$slots.activator || !!this.$scopedSlots.activator || this.activator || this.inputActivator;
        },
        isAttached: function () {
            return this.attach !== false;
        }
    },
    watch: {
        disabled: function (val) {
            val && this.callDeactivate();
        },
        isActive: function (val) {
            if (this.disabled)
                return;
            val ? this.callActivate() : this.callDeactivate();
        },
        positionX: 'updateDimensions',
        positionY: 'updateDimensions'
    },
    beforeMount: function () {
        this.checkForWindow();
    },
    methods: {
        absolutePosition: function () {
            return {
                offsetTop: 0,
                offsetLeft: 0,
                scrollHeight: 0,
                top: this.positionY || this.absoluteY,
                bottom: this.positionY || this.absoluteY,
                left: this.positionX || this.absoluteX,
                right: this.positionX || this.absoluteX,
                height: 0,
                width: 0
            };
        },
        activate: function () { },
        calcLeft: function (menuWidth) {
            return (this.isAttached
                ? this.computedLeft
                : this.calcXOverflow(this.computedLeft, menuWidth)) + "px";
        },
        calcTop: function () {
            return (this.isAttached
                ? this.computedTop
                : this.calcYOverflow(this.computedTop)) + "px";
        },
        calcXOverflow: function (left, menuWidth) {
            var xOverflow = left + menuWidth - this.pageWidth + 12;
            if ((!this.left || this.right) && xOverflow > 0) {
                left = Math.max(left - xOverflow, 0);
            }
            else {
                left = Math.max(left, 12);
            }
            return left + this.getOffsetLeft();
        },
        calcYOverflow: function (top) {
            var documentHeight = this.getInnerHeight();
            var toTop = this.pageYOffset + documentHeight;
            var activator = this.dimensions.activator;
            var contentHeight = this.dimensions.content.height;
            var totalHeight = top + contentHeight;
            var isOverflowing = toTop < totalHeight;
            // If overflowing bottom and offset
            // TODO: set 'bottom' position instead of 'top'
            if (isOverflowing &&
                this.offsetOverflow &&
                // If we don't have enough room to offset
                // the overflow, don't offset
                activator.top > contentHeight) {
                top = this.pageYOffset + (activator.top - contentHeight);
                // If overflowing bottom
            }
            else if (isOverflowing && !this.allowOverflow) {
                top = toTop - contentHeight - 12;
                // If overflowing top
            }
            else if (top < this.pageYOffset && !this.allowOverflow) {
                top = this.pageYOffset + 12;
            }
            return top < 12 ? 12 : top;
        },
        callActivate: function () {
            if (!this.hasWindow)
                return;
            this.activate();
        },
        callDeactivate: function () {
            this.isContentActive = false;
            this.deactivate();
        },
        checkForWindow: function () {
            if (!this.hasWindow) {
                this.hasWindow = typeof window !== 'undefined';
            }
        },
        checkForPageYOffset: function () {
            if (this.hasWindow) {
                this.pageYOffset = this.activatorFixed ? 0 : this.getOffsetTop();
            }
        },
        checkActivatorFixed: function () {
            if (this.attach !== false)
                return;
            var el = this.getActivator();
            while (el) {
                if (window.getComputedStyle(el).position === 'fixed') {
                    this.activatorFixed = true;
                    return;
                }
                el = el.offsetParent;
            }
            this.activatorFixed = false;
        },
        deactivate: function () { },
        getActivator: function (e) {
            if (this.inputActivator) {
                return this.$el.querySelector('.v-input__slot');
            }
            if (this.activator) {
                return typeof this.activator === 'string'
                    ? document.querySelector(this.activator)
                    : this.activator;
            }
            if (this.$refs.activator) {
                return this.$refs.activator.children.length > 0
                    ? this.$refs.activator.children[0]
                    : this.$refs.activator;
            }
            if (e) {
                this.activatedBy = e.currentTarget || e.target;
                return this.activatedBy;
            }
            if (this.activatedBy)
                return this.activatedBy;
            if (this.activatorNode) {
                var activator = Array.isArray(this.activatorNode) ? this.activatorNode[0] : this.activatorNode;
                var el = activator && activator.elm;
                if (el)
                    return el;
            }
        },
        getInnerHeight: function () {
            if (!this.hasWindow)
                return 0;
            return window.innerHeight ||
                document.documentElement.clientHeight;
        },
        getOffsetLeft: function () {
            if (!this.hasWindow)
                return 0;
            return window.pageXOffset ||
                document.documentElement.scrollLeft;
        },
        getOffsetTop: function () {
            if (!this.hasWindow)
                return 0;
            return window.pageYOffset ||
                document.documentElement.scrollTop;
        },
        getRoundedBoundedClientRect: function (el) {
            var rect = el.getBoundingClientRect();
            return {
                top: Math.round(rect.top),
                left: Math.round(rect.left),
                bottom: Math.round(rect.bottom),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            };
        },
        measure: function (el) {
            if (!el || !this.hasWindow)
                return null;
            var rect = this.getRoundedBoundedClientRect(el);
            // Account for activator margin
            if (this.isAttached) {
                var style = window.getComputedStyle(el);
                rect.left = parseInt(style.marginLeft);
                rect.top = parseInt(style.marginTop);
            }
            return rect;
        },
        sneakPeek: function (cb) {
            var _this = this;
            requestAnimationFrame(function () {
                var el = _this.$refs.content;
                if (!el || _this.isShown(el))
                    return cb();
                el.style.display = 'inline-block';
                cb();
                el.style.display = 'none';
            });
        },
        startTransition: function () {
            var _this = this;
            return new Promise(function (resolve) {
                return requestAnimationFrame(function () {
                    _this.isContentActive = _this.hasJustFocused = _this.isActive;
                    resolve();
                });
            });
        },
        isShown: function (el) {
            return el.style.display !== 'none';
        },
        updateDimensions: function () {
            var _this = this;
            this.checkForWindow();
            this.checkActivatorFixed();
            this.checkForPageYOffset();
            this.pageWidth = document.documentElement.clientWidth;
            var dimensions = {};
            // Activator should already be shown
            if (!this.hasActivator || this.absolute) {
                dimensions.activator = this.absolutePosition();
            }
            else {
                var activator = this.getActivator();
                dimensions.activator = this.measure(activator);
                dimensions.activator.offsetLeft = activator.offsetLeft;
                if (this.isAttached) {
                    // account for css padding causing things to not line up
                    // this is mostly for v-autocomplete, hopefully it won't break anything
                    dimensions.activator.offsetTop = activator.offsetTop;
                }
                else {
                    dimensions.activator.offsetTop = 0;
                }
            }
            // Display and hide to get dimensions
            this.sneakPeek(function () {
                dimensions.content = _this.measure(_this.$refs.content);
                _this.dimensions = dimensions;
            });
        }
    }
});
//# sourceMappingURL=menuable.js.map
//# sourceMappingURL=menuable.js.map
//# sourceMappingURL=menuable.js.map
//# sourceMappingURL=menuable.js.map