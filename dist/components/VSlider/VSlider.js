var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// Styles
import '../../stylus/components/_sliders.styl';
// Components
import { VScaleTransition } from '../transitions';
// Extensions
import VInput from '../VInput';
// Directives
import ClickOutside from '../../directives/click-outside';
// Utilities
import { addOnceEventListener, convertToUnit, createRange, keyCodes, deepEqual } from '../../util/helpers';
import { consoleWarn } from '../../util/console';
import Loadable from '../../mixins/loadable';
/* @vue/component */
export default VInput.extend({
    name: 'v-slider',
    directives: { ClickOutside: ClickOutside },
    mixins: [Loadable],
    props: {
        alwaysDirty: Boolean,
        inverseLabel: Boolean,
        label: String,
        min: {
            type: [Number, String],
            default: 0
        },
        max: {
            type: [Number, String],
            default: 100
        },
        step: {
            type: [Number, String],
            default: 1
        },
        ticks: {
            type: [Boolean, String],
            default: false,
            validator: function (v) { return typeof v === 'boolean' || v === 'always'; }
        },
        tickLabels: {
            type: Array,
            default: function () { return ([]); }
        },
        tickSize: {
            type: [Number, String],
            default: 1
        },
        thumbColor: {
            type: String,
            default: null
        },
        thumbLabel: {
            type: [Boolean, String],
            default: null,
            validator: function (v) { return typeof v === 'boolean' || v === 'always'; }
        },
        thumbSize: {
            type: [Number, String],
            default: 32
        },
        trackColor: {
            type: String,
            default: null
        },
        value: [Number, String]
    },
    data: function (vm) { return ({
        app: {},
        isActive: false,
        keyPressed: 0,
        lazyValue: typeof vm.value !== 'undefined' ? vm.value : Number(vm.min),
        oldValue: null
    }); },
    computed: {
        classes: function () {
            return {
                'v-input--slider': true,
                'v-input--slider--ticks': this.showTicks,
                'v-input--slider--inverse-label': this.inverseLabel,
                'v-input--slider--ticks-labels': this.tickLabels.length > 0,
                'v-input--slider--thumb-label': this.thumbLabel ||
                    this.$scopedSlots.thumbLabel
            };
        },
        showTicks: function () {
            return this.tickLabels.length > 0 ||
                (!this.disabled && this.stepNumeric && !!this.ticks);
        },
        showThumbLabel: function () {
            return !this.disabled && (!!this.thumbLabel ||
                this.thumbLabel === '' ||
                this.$scopedSlots['thumb-label']);
        },
        computedColor: function () {
            if (this.disabled)
                return null;
            return this.validationState || this.color || 'primary';
        },
        computedTrackColor: function () {
            return this.disabled ? null : (this.trackColor || null);
        },
        computedThumbColor: function () {
            if (this.disabled || !this.isDirty)
                return null;
            return this.validationState || this.thumbColor || this.color || 'primary';
        },
        internalValue: {
            get: function () {
                return this.lazyValue;
            },
            set: function (val) {
                var _a = this, min = _a.min, max = _a.max;
                // Round value to ensure the
                // entire slider range can
                // be selected with step
                var value = this.roundValue(Math.min(Math.max(val, min), max));
                if (value === this.lazyValue)
                    return;
                this.lazyValue = value;
                this.$emit('input', value);
                this.validate();
            }
        },
        stepNumeric: function () {
            return this.step > 0 ? parseFloat(this.step) : 0;
        },
        trackFillStyles: function () {
            var left = this.$vuetify.rtl ? 'auto' : 0;
            var right = this.$vuetify.rtl ? 0 : 'auto';
            var width = this.inputWidth + "%";
            if (this.disabled)
                width = "calc(" + this.inputWidth + "% - 8px)";
            return {
                transition: this.trackTransition,
                left: left,
                right: right,
                width: width
            };
        },
        trackPadding: function () {
            return (this.isActive ||
                this.inputWidth > 0 ||
                this.disabled) ? 0 : 7;
        },
        trackStyles: function () {
            var trackPadding = this.disabled ? "calc(" + this.inputWidth + "% + 8px)" : this.trackPadding + "px";
            var left = this.$vuetify.rtl ? 'auto' : trackPadding;
            var right = this.$vuetify.rtl ? trackPadding : 'auto';
            var width = this.disabled
                ? "calc(" + (100 - this.inputWidth) + "% - 8px)"
                : '100%';
            return {
                transition: this.trackTransition,
                left: left,
                right: right,
                width: width
            };
        },
        tickStyles: function () {
            var size = Number(this.tickSize);
            return {
                'border-width': size + "px",
                'border-radius': size > 1 ? '50%' : null,
                transform: size > 1 ? "translateX(-" + size + "px) translateY(-" + (size - 1) + "px)" : null
            };
        },
        trackTransition: function () {
            return this.keyPressed >= 2 ? 'none' : '';
        },
        numTicks: function () {
            return Math.ceil((this.max - this.min) / this.stepNumeric);
        },
        inputWidth: function () {
            return (this.roundValue(this.internalValue) - this.min) / (this.max - this.min) * 100;
        },
        isDirty: function () {
            return this.internalValue > this.min ||
                this.alwaysDirty;
        }
    },
    watch: {
        min: function (val) {
            val > this.internalValue && this.$emit('input', parseFloat(val));
        },
        max: function (val) {
            val < this.internalValue && this.$emit('input', parseFloat(val));
        },
        value: function (val) {
            this.internalValue = val;
        }
    },
    mounted: function () {
        // Without a v-app, iOS does not work with body selectors
        this.app = document.querySelector('[data-app]') ||
            consoleWarn('Missing v-app or a non-body wrapping element with the [data-app] attribute', this);
    },
    methods: {
        genDefaultSlot: function () {
            var children = [this.genLabel()];
            var slider = this.genSlider();
            this.inverseLabel
                ? children.unshift(slider)
                : children.push(slider);
            children.push(this.genProgress());
            return children;
        },
        genListeners: function () {
            return {
                blur: this.onBlur,
                click: this.onSliderClick,
                focus: this.onFocus,
                keydown: this.onKeyDown,
                keyup: this.onKeyUp
            };
        },
        genInput: function () {
            return this.$createElement('input', {
                attrs: __assign({ 'aria-label': this.label, name: this.name, role: 'slider', tabindex: this.disabled ? -1 : this.$attrs.tabindex, value: this.internalValue, readonly: true, 'aria-readonly': String(this.readonly), 'aria-valuemin': this.min, 'aria-valuemax': this.max, 'aria-valuenow': this.internalValue }, this.$attrs),
                on: this.genListeners(),
                ref: 'input'
            });
        },
        genSlider: function () {
            return this.$createElement('div', {
                staticClass: 'v-slider',
                'class': {
                    'v-slider--is-active': this.isActive
                },
                directives: [{
                        name: 'click-outside',
                        value: this.onBlur
                    }]
            }, this.genChildren());
        },
        genChildren: function () {
            return [
                this.genInput(),
                this.genTrackContainer(),
                this.genSteps(),
                this.genThumbContainer(this.internalValue, this.inputWidth, this.isFocused || this.isActive, this.onThumbMouseDown)
            ];
        },
        genSteps: function () {
            var _this = this;
            if (!this.step || !this.showTicks)
                return null;
            var ticks = createRange(this.numTicks + 1).map(function (i) {
                var children = [];
                if (_this.tickLabels[i]) {
                    children.push(_this.$createElement('span', _this.tickLabels[i]));
                }
                return _this.$createElement('span', {
                    key: i,
                    staticClass: 'v-slider__ticks',
                    class: {
                        'v-slider__ticks--always-show': _this.ticks === 'always' ||
                            _this.tickLabels.length > 0
                    },
                    style: __assign({}, _this.tickStyles, { left: i * (100 / _this.numTicks) + "%" })
                }, children);
            });
            return this.$createElement('div', {
                staticClass: 'v-slider__ticks-container'
            }, ticks);
        },
        genThumb: function () {
            return this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb'
            }));
        },
        genThumbContainer: function (value, valueWidth, isActive, onDrag) {
            var children = [this.genThumb()];
            var thumbLabelContent = this.getLabel(value);
            this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent));
            return this.$createElement('div', this.setTextColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb-container',
                'class': {
                    'v-slider__thumb-container--is-active': isActive,
                    'v-slider__thumb-container--show-label': this.showThumbLabel
                },
                style: {
                    transition: this.trackTransition,
                    left: (this.$vuetify.rtl ? 100 - valueWidth : valueWidth) + "%"
                },
                on: {
                    touchstart: onDrag,
                    mousedown: onDrag
                }
            }), children);
        },
        genThumbLabel: function (content) {
            var size = convertToUnit(this.thumbSize);
            return this.$createElement(VScaleTransition, {
                props: { origin: 'bottom center' }
            }, [
                this.$createElement('div', {
                    staticClass: 'v-slider__thumb-label__container',
                    directives: [
                        {
                            name: 'show',
                            value: this.isFocused || this.isActive || this.thumbLabel === 'always'
                        }
                    ]
                }, [
                    this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                        staticClass: 'v-slider__thumb-label',
                        style: {
                            height: size,
                            width: size
                        }
                    }), [content])
                ])
            ]);
        },
        genTrackContainer: function () {
            var children = [
                this.$createElement('div', this.setBackgroundColor(this.computedTrackColor, {
                    staticClass: 'v-slider__track',
                    style: this.trackStyles
                })),
                this.$createElement('div', this.setBackgroundColor(this.computedColor, {
                    staticClass: 'v-slider__track-fill',
                    style: this.trackFillStyles
                }))
            ];
            return this.$createElement('div', {
                staticClass: 'v-slider__track__container',
                ref: 'track'
            }, children);
        },
        getLabel: function (value) {
            return this.$scopedSlots['thumb-label']
                ? this.$scopedSlots['thumb-label']({ value: value })
                : this.$createElement('span', value);
        },
        onBlur: function (e) {
            if (this.keyPressed === 2)
                return;
            this.isActive = false;
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onFocus: function (e) {
            this.isFocused = true;
            this.$emit('focus', e);
        },
        onThumbMouseDown: function (e) {
            this.oldValue = this.internalValue;
            this.keyPressed = 2;
            var options = { passive: true };
            this.isActive = true;
            this.isFocused = false;
            if ('touches' in e) {
                this.app.addEventListener('touchmove', this.onMouseMove, options);
                addOnceEventListener(this.app, 'touchend', this.onSliderMouseUp);
            }
            else {
                this.app.addEventListener('mousemove', this.onMouseMove, options);
                addOnceEventListener(this.app, 'mouseup', this.onSliderMouseUp);
            }
            this.$emit('start', this.internalValue);
        },
        onSliderMouseUp: function () {
            this.keyPressed = 0;
            var options = { passive: true };
            this.isActive = false;
            this.isFocused = false;
            this.app.removeEventListener('touchmove', this.onMouseMove, options);
            this.app.removeEventListener('mousemove', this.onMouseMove, options);
            this.$emit('end', this.internalValue);
            if (!deepEqual(this.oldValue, this.internalValue)) {
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove: function (e) {
            var _a = this.parseMouseMove(e), value = _a.value, isInsideTrack = _a.isInsideTrack;
            if (isInsideTrack) {
                this.setInternalValue(value);
            }
        },
        onKeyDown: function (e) {
            if (this.disabled || this.readonly)
                return;
            var value = this.parseKeyDown(e);
            if (value == null)
                return;
            this.setInternalValue(value);
            this.$emit('change', value);
        },
        onKeyUp: function () {
            this.keyPressed = 0;
        },
        onSliderClick: function (e) {
            this.isFocused = true;
            this.onMouseMove(e);
            this.$emit('change', this.internalValue);
        },
        parseMouseMove: function (e) {
            var _a = this.$refs.track.getBoundingClientRect(), offsetLeft = _a.left, trackWidth = _a.width;
            var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            // It is possible for left to be NaN, force to number
            var left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1) || 0;
            if (this.$vuetify.rtl)
                left = 1 - left;
            var isInsideTrack = clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8;
            var value = parseFloat(this.min) + left * (this.max - this.min);
            return { value: value, isInsideTrack: isInsideTrack };
        },
        parseKeyDown: function (e, value) {
            if (value === void 0) { value = this.internalValue; }
            if (this.disabled)
                return;
            var pageup = keyCodes.pageup, pagedown = keyCodes.pagedown, end = keyCodes.end, home = keyCodes.home, left = keyCodes.left, right = keyCodes.right, down = keyCodes.down, up = keyCodes.up;
            if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode))
                return;
            e.preventDefault();
            var step = this.stepNumeric || 1;
            var steps = (this.max - this.min) / step;
            if ([left, right, down, up].includes(e.keyCode)) {
                this.keyPressed += 1;
                var increase = this.$vuetify.rtl ? [left, up] : [right, up];
                var direction = increase.includes(e.keyCode) ? 1 : -1;
                var multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1);
                value = value + (direction * step * multiplier);
            }
            else if (e.keyCode === home) {
                value = parseFloat(this.min);
            }
            else if (e.keyCode === end) {
                value = parseFloat(this.max);
            }
            else /* if (e.keyCode === keyCodes.pageup || e.keyCode === pagedown) */ {
                // Page up/down
                var direction = e.keyCode === pagedown ? 1 : -1;
                value = value - (direction * step * (steps > 100 ? steps / 10 : 10));
            }
            return value;
        },
        roundValue: function (value) {
            if (!this.stepNumeric)
                return value;
            // Format input value using the same number
            // of decimals places as in the step prop
            var trimmedStep = this.step.toString().trim();
            var decimals = trimmedStep.indexOf('.') > -1
                ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
                : 0;
            var offset = this.min % this.stepNumeric;
            var newValue = Math.round((value - offset) / this.stepNumeric) * this.stepNumeric + offset;
            return parseFloat(Math.max(Math.min(newValue, this.max), this.min).toFixed(decimals));
        },
        setInternalValue: function (value) {
            this.internalValue = value;
        }
    }
});
//# sourceMappingURL=VSlider.js.map