'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// Mixins


require('../../../src/stylus/components/_time-picker-clock.styl');

var _colorable = require('../../mixins/colorable');

var _colorable2 = _interopRequireDefault(_colorable);

var _themeable = require('../../mixins/themeable');

var _themeable2 = _interopRequireDefault(_themeable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-time-picker-clock',
    mixins: [_colorable2.default, _themeable2.default],
    props: {
        allowedValues: Function,
        double: Boolean,
        format: {
            type: Function,
            default: function _default(val) {
                return val;
            }
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
    data: function data() {
        return {
            inputValue: this.value,
            isDragging: false,
            valueOnMouseDown: null,
            valueOnMouseUp: null
        };
    },

    computed: {
        count: function count() {
            return this.max - this.min + 1;
        },
        degreesPerUnit: function degreesPerUnit() {
            return 360 / this.roundCount;
        },
        degrees: function degrees() {
            return this.degreesPerUnit * Math.PI / 180;
        },
        displayedValue: function displayedValue() {
            return this.value == null ? this.min : this.value;
        },
        innerRadius: function innerRadius() {
            return 0.62;
        },
        roundCount: function roundCount() {
            return this.double ? this.count / 2 : this.count;
        }
    },
    watch: {
        value: function value(_value) {
            this.inputValue = _value;
        }
    },
    methods: {
        wheel: function wheel(e) {
            e.preventDefault();
            var delta = Math.sign(e.wheelDelta || 1);
            var value = this.displayedValue;
            do {
                value = value + delta;
                value = (value - this.min + this.count) % this.count + this.min;
            } while (!this.isAllowed(value) && value !== this.displayedValue);
            if (value !== this.displayedValue) {
                this.update(value);
            }
        },
        isInner: function isInner(value) {
            return this.double && value - this.min >= this.roundCount;
        },
        handScale: function handScale(value) {
            return this.isInner(value) ? this.innerRadius : 1;
        },
        isAllowed: function isAllowed(value) {
            return !this.allowedValues || this.allowedValues(value);
        },
        genValues: function genValues() {
            var children = [];
            for (var value = this.min; value <= this.max; value = value + this.step) {
                var color = value === this.value && (this.color || 'accent');
                children.push(this.$createElement('span', this.setBackgroundColor(color, {
                    staticClass: 'v-time-picker-clock__item',
                    'class': {
                        'v-time-picker-clock__item--active': value === this.displayedValue,
                        'v-time-picker-clock__item--disabled': !this.isAllowed(value)
                    },
                    style: this.getTransform(value),
                    domProps: { innerHTML: '<span>' + this.format(value) + '</span>' }
                })));
            }
            return children;
        },
        genHand: function genHand() {
            var scale = 'scaleY(' + this.handScale(this.displayedValue) + ')';
            var angle = this.rotate + this.degreesPerUnit * (this.displayedValue - this.min);
            var color = this.value != null && (this.color || 'accent');
            return this.$createElement('div', this.setBackgroundColor(color, {
                staticClass: 'v-time-picker-clock__hand',
                'class': {
                    'v-time-picker-clock__hand--inner': this.isInner(this.value)
                },
                style: {
                    transform: 'rotate(' + angle + 'deg) ' + scale
                }
            }));
        },
        getTransform: function getTransform(i) {
            var _getPosition = this.getPosition(i),
                x = _getPosition.x,
                y = _getPosition.y;

            return {
                left: 50 + x * 50 + '%',
                top: 50 + y * 50 + '%'
            };
        },
        getPosition: function getPosition(value) {
            var rotateRadians = this.rotate * Math.PI / 180;
            return {
                x: Math.sin((value - this.min) * this.degrees + rotateRadians) * this.handScale(value),
                y: -Math.cos((value - this.min) * this.degrees + rotateRadians) * this.handScale(value)
            };
        },
        onMouseDown: function onMouseDown(e) {
            e.preventDefault();
            this.valueOnMouseDown = null;
            this.valueOnMouseUp = null;
            this.isDragging = true;
            this.onDragMove(e);
        },
        onMouseUp: function onMouseUp() {
            this.isDragging = false;
            if (this.valueOnMouseUp !== null && this.isAllowed(this.valueOnMouseUp)) {
                this.$emit('change', this.valueOnMouseUp);
            }
        },
        onDragMove: function onDragMove(e) {
            e.preventDefault();
            if (!this.isDragging && e.type !== 'click') return;

            var _$refs$clock$getBound = this.$refs.clock.getBoundingClientRect(),
                width = _$refs$clock$getBound.width,
                top = _$refs$clock$getBound.top,
                left = _$refs$clock$getBound.left;

            var _ref = 'touches' in e ? e.touches[0] : e,
                clientX = _ref.clientX,
                clientY = _ref.clientY;

            var center = { x: width / 2, y: -width / 2 };
            var coords = { x: clientX - left, y: top - clientY };
            var handAngle = Math.round(this.angle(center, coords) - this.rotate + 360) % 360;
            // (1 + this.innerRadius) / 4 = radius of the circle equally distant from inner and outer circles
            var insideClick = this.double && this.euclidean(center, coords) / width < (1 + this.innerRadius) / 4;
            var value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.roundCount : 0);
            // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
            var newValue = void 0;
            if (handAngle >= 360 - this.degreesPerUnit / 2) {
                newValue = insideClick ? this.max - this.roundCount + 1 : this.min;
            } else {
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
        update: function update(value) {
            if (this.inputValue !== value) {
                this.inputValue = value;
                this.$emit('input', value);
            }
        },
        euclidean: function euclidean(p0, p1) {
            var dx = p1.x - p0.x;
            var dy = p1.y - p0.y;
            return Math.sqrt(dx * dx + dy * dy);
        },
        angle: function angle(center, p1) {
            var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
            return Math.abs(value * 180 / Math.PI);
        }
    },
    render: function render(h) {
        var _this = this;

        var data = {
            staticClass: 'v-time-picker-clock',
            class: _extends({
                'v-time-picker-clock--indeterminate': this.value == null
            }, this.themeClasses),
            on: this.readonly ? undefined : {
                mousedown: this.onMouseDown,
                mouseup: this.onMouseUp,
                mouseleave: function mouseleave() {
                    return _this.isDragging && _this.onMouseUp();
                },
                touchstart: this.onMouseDown,
                touchend: this.onMouseUp,
                mousemove: this.onDragMove,
                touchmove: this.onDragMove
            },
            ref: 'clock'
        };
        !this.readonly && this.scrollable && (data.on.wheel = this.wheel);
        return h('div', data, [h('div', {
            staticClass: 'v-time-picker-clock__inner'
        }, [this.genHand(), this.genValues()])]);
    }
};
//# sourceMappingURL=VTimePickerClock.js.map