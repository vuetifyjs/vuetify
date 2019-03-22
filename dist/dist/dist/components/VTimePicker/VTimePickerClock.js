var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import '../../stylus/components/_time-picker-clock.styl';
// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import mixins from '../../util/mixins';
export default mixins(Colorable, Themeable
/* @vue/component */
).extend({
    name: 'v-time-picker-clock',
    props: {
        allowedValues: Function,
        disabled: Boolean,
        double: Boolean,
        format: {
            type: Function,
            default: function (val) { return val; }
        },
        max: {
            type: Number,
            required: true
        },
        min: {
            type: Number,
            required: true
        },
        scrollable: Boolean,
        readonly: Boolean,
        rotate: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        },
        value: Number
    },
    data: function () {
        return {
            inputValue: this.value,
            isDragging: false,
            valueOnMouseDown: null,
            valueOnMouseUp: null
        };
    },
    computed: {
        count: function () {
            return this.max - this.min + 1;
        },
        degreesPerUnit: function () {
            return 360 / this.roundCount;
        },
        degrees: function () {
            return this.degreesPerUnit * Math.PI / 180;
        },
        displayedValue: function () {
            return this.value == null ? this.min : this.value;
        },
        innerRadiusScale: function () {
            return 0.62;
        },
        roundCount: function () {
            return this.double ? (this.count / 2) : this.count;
        }
    },
    watch: {
        value: function (value) {
            this.inputValue = value;
        }
    },
    methods: {
        wheel: function (e) {
            e.preventDefault();
            var delta = Math.sign(-e.deltaY || 1);
            var value = this.displayedValue;
            do {
                value = value + delta;
                value = (value - this.min + this.count) % this.count + this.min;
            } while (!this.isAllowed(value) && value !== this.displayedValue);
            if (value !== this.displayedValue) {
                this.update(value);
            }
        },
        isInner: function (value) {
            return this.double && (value - this.min >= this.roundCount);
        },
        handScale: function (value) {
            return this.isInner(value) ? this.innerRadiusScale : 1;
        },
        isAllowed: function (value) {
            return !this.allowedValues || this.allowedValues(value);
        },
        genValues: function () {
            var children = [];
            for (var value = this.min; value <= this.max; value = value + this.step) {
                var color = value === this.value && (this.color || 'accent');
                children.push(this.$createElement('span', this.setBackgroundColor(color, {
                    staticClass: 'v-time-picker-clock__item',
                    'class': {
                        'v-time-picker-clock__item--active': value === this.displayedValue,
                        'v-time-picker-clock__item--disabled': this.disabled || !this.isAllowed(value)
                    },
                    style: this.getTransform(value),
                    domProps: { innerHTML: "<span>" + this.format(value) + "</span>" }
                })));
            }
            return children;
        },
        genHand: function () {
            var scale = "scaleY(" + this.handScale(this.displayedValue) + ")";
            var angle = this.rotate + this.degreesPerUnit * (this.displayedValue - this.min);
            var color = (this.value != null) && (this.color || 'accent');
            return this.$createElement('div', this.setBackgroundColor(color, {
                staticClass: 'v-time-picker-clock__hand',
                'class': {
                    'v-time-picker-clock__hand--inner': this.isInner(this.value)
                },
                style: {
                    transform: "rotate(" + angle + "deg) " + scale
                }
            }));
        },
        getTransform: function (i) {
            var _a = this.getPosition(i), x = _a.x, y = _a.y;
            return {
                left: 50 + x * 50 + "%",
                top: 50 + y * 50 + "%"
            };
        },
        getPosition: function (value) {
            var rotateRadians = this.rotate * Math.PI / 180;
            return {
                x: Math.sin((value - this.min) * this.degrees + rotateRadians) * this.handScale(value),
                y: -Math.cos((value - this.min) * this.degrees + rotateRadians) * this.handScale(value)
            };
        },
        onMouseDown: function (e) {
            e.preventDefault();
            this.valueOnMouseDown = null;
            this.valueOnMouseUp = null;
            this.isDragging = true;
            this.onDragMove(e);
        },
        onMouseUp: function () {
            this.isDragging = false;
            if (this.valueOnMouseUp !== null && this.isAllowed(this.valueOnMouseUp)) {
                this.$emit('change', this.valueOnMouseUp);
            }
        },
        onDragMove: function (e) {
            e.preventDefault();
            if (!this.isDragging && e.type !== 'click')
                return;
            var _a = this.$refs.clock.getBoundingClientRect(), width = _a.width, top = _a.top, left = _a.left;
            var innerWidth = this.$refs.innerClock.getBoundingClientRect().width;
            var _b = 'touches' in e ? e.touches[0] : e, clientX = _b.clientX, clientY = _b.clientY;
            var center = { x: width / 2, y: -width / 2 };
            var coords = { x: clientX - left, y: top - clientY };
            var handAngle = Math.round(this.angle(center, coords) - this.rotate + 360) % 360;
            var insideClick = this.double && this.euclidean(center, coords) < (innerWidth + innerWidth * this.innerRadiusScale) / 4;
            var value = (Math.round(handAngle / this.degreesPerUnit) +
                (insideClick ? this.roundCount : 0)) % this.count + this.min;
            // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
            var newValue;
            if (handAngle >= (360 - this.degreesPerUnit / 2)) {
                newValue = insideClick ? this.max - this.roundCount + 1 : this.min;
            }
            else {
                newValue = value;
            }
            if (this.isAllowed(value)) {
                if (this.valueOnMouseDown === null) {
                    this.valueOnMouseDown = newValue;
                }
                this.valueOnMouseUp = newValue;
                this.update(newValue);
            }
        },
        update: function (value) {
            if (this.inputValue !== value) {
                this.inputValue = value;
                this.$emit('input', value);
            }
        },
        euclidean: function (p0, p1) {
            var dx = p1.x - p0.x;
            var dy = p1.y - p0.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        angle: function (center, p1) {
            var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
            return Math.abs(value * 180 / Math.PI);
        }
    },
    render: function (h) {
        var _this = this;
        var data = {
            staticClass: 'v-time-picker-clock',
            class: __assign({ 'v-time-picker-clock--indeterminate': this.value == null }, this.themeClasses),
            on: (this.readonly || this.disabled) ? undefined : Object.assign({
                mousedown: this.onMouseDown,
                mouseup: this.onMouseUp,
                mouseleave: function () { return (_this.isDragging && _this.onMouseUp()); },
                touchstart: this.onMouseDown,
                touchend: this.onMouseUp,
                mousemove: this.onDragMove,
                touchmove: this.onDragMove
            }, this.scrollable ? {
                wheel: this.wheel
            } : {}),
            ref: 'clock'
        };
        return h('div', data, [
            h('div', {
                staticClass: 'v-time-picker-clock__inner',
                ref: 'innerClock'
            }, [
                this.genHand(),
                this.genValues()
            ])
        ]);
    }
});
//# sourceMappingURL=VTimePickerClock.js.map
//# sourceMappingURL=VTimePickerClock.js.map
//# sourceMappingURL=VTimePickerClock.js.map