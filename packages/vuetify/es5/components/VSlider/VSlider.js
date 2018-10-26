'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Styles

// Components

// Extensions

// Directives

// Utilities


require('../../../src/stylus/components/_sliders.styl');

var _transitions = require('../transitions');

var _VInput = require('../VInput');

var _VInput2 = _interopRequireDefault(_VInput);

var _clickOutside = require('../../directives/click-outside');

var _clickOutside2 = _interopRequireDefault(_clickOutside);

var _helpers = require('../../util/helpers');

var _console = require('../../util/console');

var _loadable = require('../../mixins/loadable');

var _loadable2 = _interopRequireDefault(_loadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @vue/component */
exports.default = {
    name: 'v-slider',
    directives: { ClickOutside: _clickOutside2.default },
    extends: _VInput2.default,
    mixins: [_loadable2.default],
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
        range: Boolean,
        step: {
            type: [Number, String],
            default: 1
        },
        ticks: {
            type: [Boolean, String],
            default: false,
            validator: function validator(v) {
                return typeof v === 'boolean' || v === 'always';
            }
        },
        tickLabels: {
            type: Array,
            default: function _default() {
                return [];
            }
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
            validator: function validator(v) {
                return typeof v === 'boolean' || v === 'always';
            }
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
    data: function data(vm) {
        return {
            app: {},
            isActive: false,
            keyPressed: 0,
            lazyValue: typeof vm.value !== 'undefined' ? vm.value : Number(vm.min),
            oldValue: null
        };
    },
    computed: {
        classes: function classes() {
            return {
                'v-input--slider': true,
                'v-input--slider--ticks': this.showTicks,
                'v-input--slider--inverse-label': this.inverseLabel,
                'v-input--slider--ticks-labels': this.tickLabels.length > 0,
                'v-input--slider--thumb-label': this.thumbLabel || this.$scopedSlots.thumbLabel
            };
        },
        showTicks: function showTicks() {
            return this.tickLabels.length > 0 || !this.disabled && this.stepNumeric && !!this.ticks;
        },
        showThumbLabel: function showThumbLabel() {
            return !this.disabled && (!!this.thumbLabel || this.thumbLabel === '' || this.$scopedSlots['thumb-label']);
        },
        computedColor: function computedColor() {
            if (this.disabled) return null;
            return this.validationState || this.color || 'primary';
        },
        computedTrackColor: function computedTrackColor() {
            return this.disabled ? null : this.trackColor || null;
        },
        computedThumbColor: function computedThumbColor() {
            if (this.disabled || !this.isDirty) return null;
            return this.validationState || this.thumbColor || this.color || 'primary';
        },

        internalValue: {
            get: function get() {
                return this.lazyValue;
            },
            set: function set(val) {
                var min = this.min,
                    max = this.max;
                // Round value to ensure the
                // entire slider range can
                // be selected with step

                var value = this.roundValue(Math.min(Math.max(val, min), max));
                if (value === this.lazyValue) return;
                this.lazyValue = value;
                this.$emit('input', value);
                this.validate();
            }
        },
        stepNumeric: function stepNumeric() {
            return this.step > 0 ? parseFloat(this.step) : 0;
        },
        trackFillStyles: function trackFillStyles() {
            var left = this.$vuetify.rtl ? 'auto' : 0;
            var right = this.$vuetify.rtl ? 0 : 'auto';
            var width = this.inputWidth + '%';
            if (this.disabled) width = 'calc(' + this.inputWidth + '% - 8px)';
            return {
                transition: this.trackTransition,
                left: left,
                right: right,
                width: width
            };
        },
        trackPadding: function trackPadding() {
            return this.isActive || this.inputWidth > 0 || this.disabled ? 0 : 7;
        },
        trackStyles: function trackStyles() {
            var trackPadding = this.disabled ? 'calc(' + this.inputWidth + '% + 8px)' : this.trackPadding + 'px';
            var left = this.$vuetify.rtl ? 'auto' : trackPadding;
            var right = this.$vuetify.rtl ? trackPadding : 'auto';
            var width = this.disabled ? 'calc(' + (100 - this.inputWidth) + '% - 8px)' : '100%';
            return {
                transition: this.trackTransition,
                left: left,
                right: right,
                width: width
            };
        },
        tickStyles: function tickStyles() {
            var size = Number(this.tickSize);
            return {
                'border-width': size + 'px',
                'border-radius': size > 1 ? '50%' : null,
                transform: size > 1 ? 'translateX(-' + size + 'px) translateY(-' + (size - 1) + 'px)' : null
            };
        },
        trackTransition: function trackTransition() {
            return this.keyPressed >= 2 ? 'none' : '';
        },
        numTicks: function numTicks() {
            return Math.ceil((this.max - this.min) / this.stepNumeric);
        },
        inputWidth: function inputWidth() {
            return (this.roundValue(this.internalValue) - this.min) / (this.max - this.min) * 100;
        },
        isDirty: function isDirty() {
            return this.internalValue > this.min || this.alwaysDirty;
        }
    },
    watch: {
        min: function min(val) {
            val > this.internalValue && this.$emit('input', parseFloat(val));
        },
        max: function max(val) {
            val < this.internalValue && this.$emit('input', parseFloat(val));
        },
        value: function value(val) {
            this.internalValue = val;
        }
    },
    mounted: function mounted() {
        // Without a v-app, iOS does not work with body selectors
        this.app = document.querySelector('[data-app]') || (0, _console.consoleWarn)('Missing v-app or a non-body wrapping element with the [data-app] attribute', this);
    },

    methods: {
        genDefaultSlot: function genDefaultSlot() {
            var children = [this.genLabel()];
            var slider = this.genSlider();
            this.inverseLabel ? children.unshift(slider) : children.push(slider);
            children.push(this.genProgress());
            return children;
        },
        genListeners: function genListeners() {
            return {
                blur: this.onBlur,
                click: this.onSliderClick,
                focus: this.onFocus,
                keydown: this.onKeyDown,
                keyup: this.onKeyUp
            };
        },
        genInput: function genInput() {
            return this.$createElement('input', {
                attrs: _extends({
                    'aria-label': this.label,
                    name: this.name,
                    role: 'slider',
                    tabindex: this.disabled ? -1 : this.$attrs.tabindex,
                    value: this.internalValue,
                    readonly: true,
                    'aria-readonly': String(this.readonly),
                    'aria-valuemin': this.min,
                    'aria-valuemax': this.max,
                    'aria-valuenow': this.internalValue
                }, this.$attrs),
                on: this.genListeners(),
                ref: 'input'
            });
        },
        genSlider: function genSlider() {
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
        genChildren: function genChildren() {
            return [this.genInput(), this.genTrackContainer(), this.genSteps(), this.genThumbContainer(this.internalValue, this.inputWidth, this.isFocused || this.isActive, this.onThumbMouseDown)];
        },
        genSteps: function genSteps() {
            var _this = this;

            if (!this.step || !this.showTicks) return null;
            var ticks = (0, _helpers.createRange)(this.numTicks + 1).map(function (i) {
                var children = [];
                if (_this.tickLabels[i]) {
                    children.push(_this.$createElement('span', _this.tickLabels[i]));
                }
                return _this.$createElement('span', {
                    key: i,
                    staticClass: 'v-slider__ticks',
                    class: {
                        'v-slider__ticks--always-show': _this.ticks === 'always' || _this.tickLabels.length > 0
                    },
                    style: _extends({}, _this.tickStyles, {
                        left: i * (100 / _this.numTicks) + '%'
                    })
                }, children);
            });
            return this.$createElement('div', {
                staticClass: 'v-slider__ticks-container'
            }, ticks);
        },
        genThumb: function genThumb() {
            return this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb'
            }));
        },
        genThumbContainer: function genThumbContainer(value, valueWidth, isActive, onDrag) {
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
                    left: (this.$vuetify.rtl ? 100 - valueWidth : valueWidth) + '%'
                },
                on: {
                    touchstart: onDrag,
                    mousedown: onDrag
                }
            }), children);
        },
        genThumbLabel: function genThumbLabel(content) {
            var size = (0, _helpers.convertToUnit)(this.thumbSize);
            return this.$createElement(_transitions.VScaleTransition, {
                props: { origin: 'bottom center' }
            }, [this.$createElement('div', {
                staticClass: 'v-slider__thumb-label__container',
                directives: [{
                    name: 'show',
                    value: this.isFocused || this.isActive || this.thumbLabel === 'always'
                }]
            }, [this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb-label',
                style: {
                    height: size,
                    width: size
                }
            }), [content])])]);
        },
        genTrackContainer: function genTrackContainer() {
            var children = [this.$createElement('div', this.setBackgroundColor(this.computedTrackColor, {
                staticClass: 'v-slider__track',
                style: this.trackStyles
            })), this.$createElement('div', this.setBackgroundColor(this.computedColor, {
                staticClass: 'v-slider__track-fill',
                style: this.trackFillStyles
            }))];
            return this.$createElement('div', {
                staticClass: 'v-slider__track__container',
                ref: 'track'
            }, children);
        },
        getLabel: function getLabel(value) {
            return this.$scopedSlots['thumb-label'] ? this.$scopedSlots['thumb-label']({ value: value }) : this.$createElement('span', value);
        },
        onBlur: function onBlur(e) {
            if (this.keyPressed === 2) return;
            this.isActive = false;
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onFocus: function onFocus(e) {
            this.isFocused = true;
            this.$emit('focus', e);
        },
        onThumbMouseDown: function onThumbMouseDown(e) {
            this.oldValue = this.internalValue;
            this.keyPressed = 2;
            var options = { passive: true };
            this.isActive = true;
            this.isFocused = false;
            if ('touches' in e) {
                this.app.addEventListener('touchmove', this.onMouseMove, options);
                (0, _helpers.addOnceEventListener)(this.app, 'touchend', this.onSliderMouseUp);
            } else {
                this.app.addEventListener('mousemove', this.onMouseMove, options);
                (0, _helpers.addOnceEventListener)(this.app, 'mouseup', this.onSliderMouseUp);
            }
            this.$emit('start', this.internalValue);
        },
        onSliderMouseUp: function onSliderMouseUp() {
            this.keyPressed = 0;
            var options = { passive: true };
            this.isActive = false;
            this.isFocused = false;
            this.app.removeEventListener('touchmove', this.onMouseMove, options);
            this.app.removeEventListener('mousemove', this.onMouseMove, options);
            this.$emit('end', this.internalValue);
            if (!(0, _helpers.deepEqual)(this.oldValue, this.internalValue)) {
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove: function onMouseMove(e) {
            var _parseMouseMove = this.parseMouseMove(e),
                value = _parseMouseMove.value,
                isInsideTrack = _parseMouseMove.isInsideTrack;

            if (isInsideTrack) {
                this.setInternalValue(value);
            }
        },
        onKeyDown: function onKeyDown(e) {
            if (this.disabled || this.readonly) return;
            var value = this.parseKeyDown(e);
            if (value == null) return;
            this.setInternalValue(value);
            this.$emit('change', value);
        },
        onKeyUp: function onKeyUp() {
            this.keyPressed = 0;
        },
        onSliderClick: function onSliderClick(e) {
            this.isFocused = true;
            this.onMouseMove(e);
            this.$emit('change', this.internalValue);
        },
        parseMouseMove: function parseMouseMove(e) {
            var _$refs$track$getBound = this.$refs.track.getBoundingClientRect(),
                offsetLeft = _$refs$track$getBound.left,
                trackWidth = _$refs$track$getBound.width;

            var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            // It is possible for left to be NaN, force to number
            var left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1) || 0;
            if (this.$vuetify.rtl) left = 1 - left;
            var isInsideTrack = clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8;
            var value = parseFloat(this.min) + left * (this.max - this.min);
            return { value: value, isInsideTrack: isInsideTrack };
        },
        parseKeyDown: function parseKeyDown(e) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.internalValue;

            if (this.disabled) return;
            var pageup = _helpers.keyCodes.pageup,
                pagedown = _helpers.keyCodes.pagedown,
                end = _helpers.keyCodes.end,
                home = _helpers.keyCodes.home,
                left = _helpers.keyCodes.left,
                right = _helpers.keyCodes.right,
                down = _helpers.keyCodes.down,
                up = _helpers.keyCodes.up;

            if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return;
            e.preventDefault();
            var step = this.stepNumeric || 1;
            var steps = (this.max - this.min) / step;
            if ([left, right, down, up].includes(e.keyCode)) {
                this.keyPressed += 1;
                var increase = this.$vuetify.rtl ? [left, up] : [right, up];
                var direction = increase.includes(e.keyCode) ? 1 : -1;
                var multiplier = e.shiftKey ? 3 : e.ctrlKey ? 2 : 1;
                value = value + direction * step * multiplier;
            } else if (e.keyCode === home) {
                value = parseFloat(this.min);
            } else if (e.keyCode === end) {
                value = parseFloat(this.max);
            } else /* if (e.keyCode === keyCodes.pageup || e.keyCode === pagedown) */{
                    // Page up/down
                    var _direction = e.keyCode === pagedown ? 1 : -1;
                    value = value - _direction * step * (steps > 100 ? steps / 10 : 10);
                }
            return value;
        },
        roundValue: function roundValue(value) {
            if (!this.stepNumeric) return value;
            // Format input value using the same number
            // of decimals places as in the step prop
            var trimmedStep = this.step.toString().trim();
            var decimals = trimmedStep.indexOf('.') > -1 ? trimmedStep.length - trimmedStep.indexOf('.') - 1 : 0;
            var offset = this.min % this.stepNumeric;
            var newValue = Math.round((value - offset) / this.stepNumeric) * this.stepNumeric + offset;
            return parseFloat(Math.min(newValue, this.max).toFixed(decimals));
        },
        setInternalValue: function setInternalValue(value) {
            this.internalValue = value;
        }
    }
};
//# sourceMappingURL=VSlider.js.map