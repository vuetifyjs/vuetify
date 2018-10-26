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
export default {
    name: 'v-slider',
    directives: { ClickOutside },
    extends: VInput,
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
        range: Boolean,
        step: {
            type: [Number, String],
            default: 1
        },
        ticks: {
            type: [Boolean, String],
            default: false,
            validator: v => typeof v === 'boolean' || v === 'always'
        },
        tickLabels: {
            type: Array,
            default: () => ([])
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
            validator: v => typeof v === 'boolean' || v === 'always'
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
    data: vm => ({
        app: {},
        isActive: false,
        keyPressed: 0,
        lazyValue: typeof vm.value !== 'undefined' ? vm.value : Number(vm.min),
        oldValue: null
    }),
    computed: {
        classes() {
            return {
                'v-input--slider': true,
                'v-input--slider--ticks': this.showTicks,
                'v-input--slider--inverse-label': this.inverseLabel,
                'v-input--slider--ticks-labels': this.tickLabels.length > 0,
                'v-input--slider--thumb-label': this.thumbLabel ||
                    this.$scopedSlots.thumbLabel
            };
        },
        showTicks() {
            return this.tickLabels.length > 0 ||
                (!this.disabled && this.stepNumeric && !!this.ticks);
        },
        showThumbLabel() {
            return !this.disabled && (!!this.thumbLabel ||
                this.thumbLabel === '' ||
                this.$scopedSlots['thumb-label']);
        },
        computedColor() {
            if (this.disabled)
                return null;
            return this.validationState || this.color || 'primary';
        },
        computedTrackColor() {
            return this.disabled ? null : (this.trackColor || null);
        },
        computedThumbColor() {
            if (this.disabled || !this.isDirty)
                return null;
            return this.validationState || this.thumbColor || this.color || 'primary';
        },
        internalValue: {
            get() {
                return this.lazyValue;
            },
            set(val) {
                const { min, max } = this;
                // Round value to ensure the
                // entire slider range can
                // be selected with step
                const value = this.roundValue(Math.min(Math.max(val, min), max));
                if (value === this.lazyValue)
                    return;
                this.lazyValue = value;
                this.$emit('input', value);
                this.validate();
            }
        },
        stepNumeric() {
            return this.step > 0 ? parseFloat(this.step) : 0;
        },
        trackFillStyles() {
            const left = this.$vuetify.rtl ? 'auto' : 0;
            const right = this.$vuetify.rtl ? 0 : 'auto';
            let width = `${this.inputWidth}%`;
            if (this.disabled)
                width = `calc(${this.inputWidth}% - 8px)`;
            return {
                transition: this.trackTransition,
                left,
                right,
                width
            };
        },
        trackPadding() {
            return (this.isActive ||
                this.inputWidth > 0 ||
                this.disabled) ? 0 : 7;
        },
        trackStyles() {
            const trackPadding = this.disabled ? `calc(${this.inputWidth}% + 8px)` : `${this.trackPadding}px`;
            const left = this.$vuetify.rtl ? 'auto' : trackPadding;
            const right = this.$vuetify.rtl ? trackPadding : 'auto';
            const width = this.disabled
                ? `calc(${100 - this.inputWidth}% - 8px)`
                : '100%';
            return {
                transition: this.trackTransition,
                left,
                right,
                width
            };
        },
        tickStyles() {
            const size = Number(this.tickSize);
            return {
                'border-width': `${size}px`,
                'border-radius': size > 1 ? '50%' : null,
                transform: size > 1 ? `translateX(-${size}px) translateY(-${size - 1}px)` : null
            };
        },
        trackTransition() {
            return this.keyPressed >= 2 ? 'none' : '';
        },
        numTicks() {
            return Math.ceil((this.max - this.min) / this.stepNumeric);
        },
        inputWidth() {
            return (this.roundValue(this.internalValue) - this.min) / (this.max - this.min) * 100;
        },
        isDirty() {
            return this.internalValue > this.min ||
                this.alwaysDirty;
        }
    },
    watch: {
        min(val) {
            val > this.internalValue && this.$emit('input', parseFloat(val));
        },
        max(val) {
            val < this.internalValue && this.$emit('input', parseFloat(val));
        },
        value(val) {
            this.internalValue = val;
        }
    },
    mounted() {
        // Without a v-app, iOS does not work with body selectors
        this.app = document.querySelector('[data-app]') ||
            consoleWarn('Missing v-app or a non-body wrapping element with the [data-app] attribute', this);
    },
    methods: {
        genDefaultSlot() {
            const children = [this.genLabel()];
            const slider = this.genSlider();
            this.inverseLabel
                ? children.unshift(slider)
                : children.push(slider);
            children.push(this.genProgress());
            return children;
        },
        genListeners() {
            return {
                blur: this.onBlur,
                click: this.onSliderClick,
                focus: this.onFocus,
                keydown: this.onKeyDown,
                keyup: this.onKeyUp
            };
        },
        genInput() {
            return this.$createElement('input', {
                attrs: {
                    'aria-label': this.label,
                    name: this.name,
                    role: 'slider',
                    tabindex: this.disabled ? -1 : this.$attrs.tabindex,
                    value: this.internalValue,
                    readonly: true,
                    'aria-readonly': String(this.readonly),
                    'aria-valuemin': this.min,
                    'aria-valuemax': this.max,
                    'aria-valuenow': this.internalValue,
                    ...this.$attrs
                },
                on: this.genListeners(),
                ref: 'input'
            });
        },
        genSlider() {
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
        genChildren() {
            return [
                this.genInput(),
                this.genTrackContainer(),
                this.genSteps(),
                this.genThumbContainer(this.internalValue, this.inputWidth, this.isFocused || this.isActive, this.onThumbMouseDown)
            ];
        },
        genSteps() {
            if (!this.step || !this.showTicks)
                return null;
            const ticks = createRange(this.numTicks + 1).map(i => {
                const children = [];
                if (this.tickLabels[i]) {
                    children.push(this.$createElement('span', this.tickLabels[i]));
                }
                return this.$createElement('span', {
                    key: i,
                    staticClass: 'v-slider__ticks',
                    class: {
                        'v-slider__ticks--always-show': this.ticks === 'always' ||
                            this.tickLabels.length > 0
                    },
                    style: {
                        ...this.tickStyles,
                        left: `${i * (100 / this.numTicks)}%`
                    }
                }, children);
            });
            return this.$createElement('div', {
                staticClass: 'v-slider__ticks-container'
            }, ticks);
        },
        genThumb() {
            return this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb'
            }));
        },
        genThumbContainer(value, valueWidth, isActive, onDrag) {
            const children = [this.genThumb()];
            const thumbLabelContent = this.getLabel(value);
            this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent));
            return this.$createElement('div', this.setTextColor(this.computedThumbColor, {
                staticClass: 'v-slider__thumb-container',
                'class': {
                    'v-slider__thumb-container--is-active': isActive,
                    'v-slider__thumb-container--show-label': this.showThumbLabel
                },
                style: {
                    transition: this.trackTransition,
                    left: `${this.$vuetify.rtl ? 100 - valueWidth : valueWidth}%`
                },
                on: {
                    touchstart: onDrag,
                    mousedown: onDrag
                }
            }), children);
        },
        genThumbLabel(content) {
            const size = convertToUnit(this.thumbSize);
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
        genTrackContainer() {
            const children = [
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
        getLabel(value) {
            return this.$scopedSlots['thumb-label']
                ? this.$scopedSlots['thumb-label']({ value })
                : this.$createElement('span', value);
        },
        onBlur(e) {
            if (this.keyPressed === 2)
                return;
            this.isActive = false;
            this.isFocused = false;
            this.$emit('blur', e);
        },
        onFocus(e) {
            this.isFocused = true;
            this.$emit('focus', e);
        },
        onThumbMouseDown(e) {
            this.oldValue = this.internalValue;
            this.keyPressed = 2;
            const options = { passive: true };
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
        onSliderMouseUp() {
            this.keyPressed = 0;
            const options = { passive: true };
            this.isActive = false;
            this.isFocused = false;
            this.app.removeEventListener('touchmove', this.onMouseMove, options);
            this.app.removeEventListener('mousemove', this.onMouseMove, options);
            this.$emit('end', this.internalValue);
            if (!deepEqual(this.oldValue, this.internalValue)) {
                this.$emit('change', this.internalValue);
            }
        },
        onMouseMove(e) {
            const { value, isInsideTrack } = this.parseMouseMove(e);
            if (isInsideTrack) {
                this.setInternalValue(value);
            }
        },
        onKeyDown(e) {
            if (this.disabled || this.readonly)
                return;
            const value = this.parseKeyDown(e);
            if (value == null)
                return;
            this.setInternalValue(value);
            this.$emit('change', value);
        },
        onKeyUp() {
            this.keyPressed = 0;
        },
        onSliderClick(e) {
            this.isFocused = true;
            this.onMouseMove(e);
            this.$emit('change', this.internalValue);
        },
        parseMouseMove(e) {
            const { left: offsetLeft, width: trackWidth } = this.$refs.track.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            // It is possible for left to be NaN, force to number
            let left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1) || 0;
            if (this.$vuetify.rtl)
                left = 1 - left;
            const isInsideTrack = clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8;
            const value = parseFloat(this.min) + left * (this.max - this.min);
            return { value, isInsideTrack };
        },
        parseKeyDown(e, value = this.internalValue) {
            if (this.disabled)
                return;
            const { pageup, pagedown, end, home, left, right, down, up } = keyCodes;
            if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode))
                return;
            e.preventDefault();
            const step = this.stepNumeric || 1;
            const steps = (this.max - this.min) / step;
            if ([left, right, down, up].includes(e.keyCode)) {
                this.keyPressed += 1;
                const increase = this.$vuetify.rtl ? [left, up] : [right, up];
                const direction = increase.includes(e.keyCode) ? 1 : -1;
                const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1);
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
                const direction = e.keyCode === pagedown ? 1 : -1;
                value = value - (direction * step * (steps > 100 ? steps / 10 : 10));
            }
            return value;
        },
        roundValue(value) {
            if (!this.stepNumeric)
                return value;
            // Format input value using the same number
            // of decimals places as in the step prop
            const trimmedStep = this.step.toString().trim();
            const decimals = trimmedStep.indexOf('.') > -1
                ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
                : 0;
            const offset = this.min % this.stepNumeric;
            const newValue = Math.round((value - offset) / this.stepNumeric) * this.stepNumeric + offset;
            return parseFloat(Math.min(newValue, this.max).toFixed(decimals));
        },
        setInternalValue(value) {
            this.internalValue = value;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTbGlkZXIvVlNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUU5QyxhQUFhO0FBQ2IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFakQsYUFBYTtBQUNiLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQTtBQUU5QixhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUE7QUFFekQsWUFBWTtBQUNaLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLFdBQVcsRUFDWCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sb0JBQW9CLENBQUE7QUFDM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBQ2hELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFBO0FBRTVDLG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFVBQVU7SUFFaEIsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFO0lBRTVCLE9BQU8sRUFBRSxNQUFNO0lBRWYsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO0lBRWxCLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFlBQVksRUFBRSxPQUFPO1FBQ3JCLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBQ0QsR0FBRyxFQUFFO1lBQ0gsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztZQUN0QixPQUFPLEVBQUUsR0FBRztTQUNiO1FBQ0QsS0FBSyxFQUFFLE9BQU87UUFDZCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVB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RyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNMLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtZQUUxQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQTtZQUU1RixPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDbkUsQ0FBQztRQUNELGdCQUFnQixDQUFFLEtBQUs7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUE7UUFDNUIsQ0FBQztLQUNGO0NBQ0YsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFN0eWxlc1xuaW1wb3J0ICcuLi8uLi9zdHlsdXMvY29tcG9uZW50cy9fc2xpZGVycy5zdHlsJ1xuXG4vLyBDb21wb25lbnRzXG5pbXBvcnQgeyBWU2NhbGVUcmFuc2l0aW9uIH0gZnJvbSAnLi4vdHJhbnNpdGlvbnMnXG5cbi8vIEV4dGVuc2lvbnNcbmltcG9ydCBWSW5wdXQgZnJvbSAnLi4vVklucHV0J1xuXG4vLyBEaXJlY3RpdmVzXG5pbXBvcnQgQ2xpY2tPdXRzaWRlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY2xpY2stb3V0c2lkZSdcblxuLy8gVXRpbGl0aWVzXG5pbXBvcnQge1xuICBhZGRPbmNlRXZlbnRMaXN0ZW5lcixcbiAgY29udmVydFRvVW5pdCxcbiAgY3JlYXRlUmFuZ2UsXG4gIGtleUNvZGVzLFxuICBkZWVwRXF1YWxcbn0gZnJvbSAnLi4vLi4vdXRpbC9oZWxwZXJzJ1xuaW1wb3J0IHsgY29uc29sZVdhcm4gfSBmcm9tICcuLi8uLi91dGlsL2NvbnNvbGUnXG5pbXBvcnQgTG9hZGFibGUgZnJvbSAnLi4vLi4vbWl4aW5zL2xvYWRhYmxlJ1xuXG4vKiBAdnVlL2NvbXBvbmVudCAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAndi1zbGlkZXInLFxuXG4gIGRpcmVjdGl2ZXM6IHsgQ2xpY2tPdXRzaWRlIH0sXG5cbiAgZXh0ZW5kczogVklucHV0LFxuXG4gIG1peGluczogW0xvYWRhYmxlXSxcblxuICBwcm9wczoge1xuICAgIGFsd2F5c0RpcnR5OiBCb29sZWFuLFxuICAgIGludmVyc2VMYWJlbDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIG1pbjoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIG1heDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH0sXG4gICAgcmFuZ2U6IEJvb2xlYW4sXG4gICAgc3RlcDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9LFxuICAgIHRpY2tzOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHR5cGVvZiB2ID09PSAnYm9vbGVhbicgfHwgdiA9PT0gJ2Fsd2F5cydcbiAgICB9LFxuICAgIHRpY2tMYWJlbHM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gKFtdKVxuICAgIH0sXG4gICAgdGlja1NpemU6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAxXG4gICAgfSxcbiAgICB0aHVtYkNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICB0aHVtYkxhYmVsOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdHlwZW9mIHYgPT09ICdib29sZWFuJyB8fCB2ID09PSAnYWx3YXlzJ1xuICAgIH0sXG4gICAgdGh1bWJTaXplOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMzJcbiAgICB9LFxuICAgIHRyYWNrQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHZhbHVlOiBbTnVtYmVyLCBTdHJpbmddXG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBhcHA6IHt9LFxuICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICBrZXlQcmVzc2VkOiAwLFxuICAgIGxhenlWYWx1ZTogdHlwZW9mIHZtLnZhbHVlICE9PSAndW5kZWZpbmVkJyA/IHZtLnZhbHVlIDogTnVtYmVyKHZtLm1pbiksXG4gICAgb2xkVmFsdWU6IG51bGxcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWlucHV0LS1zbGlkZXInOiB0cnVlLFxuICAgICAgICAndi1pbnB1dC0tc2xpZGVyLS10aWNrcyc6IHRoaXMuc2hvd1RpY2tzLFxuICAgICAgICAndi1pbnB1dC0tc2xpZGVyLS1pbnZlcnNlLWxhYmVsJzogdGhpcy5pbnZlcnNlTGFiZWwsXG4gICAgICAgICd2LWlucHV0LS1zbGlkZXItLXRpY2tzLWxhYmVscyc6IHRoaXMudGlja0xhYmVscy5sZW5ndGggPiAwLFxuICAgICAgICAndi1pbnB1dC0tc2xpZGVyLS10aHVtYi1sYWJlbCc6IHRoaXMudGh1bWJMYWJlbCB8fFxuICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnRodW1iTGFiZWxcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dUaWNrcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aWNrTGFiZWxzLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMuc3RlcE51bWVyaWMgJiYgISF0aGlzLnRpY2tzKVxuICAgIH0sXG4gICAgc2hvd1RodW1iTGFiZWwgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmRpc2FibGVkICYmIChcbiAgICAgICAgISF0aGlzLnRodW1iTGFiZWwgfHxcbiAgICAgICAgdGhpcy50aHVtYkxhYmVsID09PSAnJyB8fFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90c1sndGh1bWItbGFiZWwnXVxuICAgICAgKVxuICAgIH0sXG4gICAgY29tcHV0ZWRDb2xvciAoKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25TdGF0ZSB8fCB0aGlzLmNvbG9yIHx8ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgY29tcHV0ZWRUcmFja0NvbG9yICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkID8gbnVsbCA6ICh0aGlzLnRyYWNrQ29sb3IgfHwgbnVsbClcbiAgICB9LFxuICAgIGNvbXB1dGVkVGh1bWJDb2xvciAoKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5pc0RpcnR5KSByZXR1cm4gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGlvblN0YXRlIHx8IHRoaXMudGh1bWJDb2xvciB8fCB0aGlzLmNvbG9yIHx8ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgaW50ZXJuYWxWYWx1ZToge1xuICAgICAgZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGF6eVZhbHVlXG4gICAgICB9LFxuICAgICAgc2V0ICh2YWwpIHtcbiAgICAgICAgY29uc3QgeyBtaW4sIG1heCB9ID0gdGhpc1xuXG4gICAgICAgIC8vIFJvdW5kIHZhbHVlIHRvIGVuc3VyZSB0aGVcbiAgICAgICAgLy8gZW50aXJlIHNsaWRlciByYW5nZSBjYW5cbiAgICAgICAgLy8gYmUgc2VsZWN0ZWQgd2l0aCBzdGVwXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5yb3VuZFZhbHVlKE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KSlcblxuICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMubGF6eVZhbHVlKSByZXR1cm5cblxuICAgICAgICB0aGlzLmxhenlWYWx1ZSA9IHZhbHVlXG5cbiAgICAgICAgdGhpcy4kZW1pdCgnaW5wdXQnLCB2YWx1ZSlcbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpXG4gICAgICB9XG4gICAgfSxcbiAgICBzdGVwTnVtZXJpYyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGVwID4gMCA/IHBhcnNlRmxvYXQodGhpcy5zdGVwKSA6IDBcbiAgICB9LFxuICAgIHRyYWNrRmlsbFN0eWxlcyAoKSB7XG4gICAgICBjb25zdCBsZWZ0ID0gdGhpcy4kdnVldGlmeS5ydGwgPyAnYXV0bycgOiAwXG4gICAgICBjb25zdCByaWdodCA9IHRoaXMuJHZ1ZXRpZnkucnRsID8gMCA6ICdhdXRvJ1xuICAgICAgbGV0IHdpZHRoID0gYCR7dGhpcy5pbnB1dFdpZHRofSVgXG5cbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB3aWR0aCA9IGBjYWxjKCR7dGhpcy5pbnB1dFdpZHRofSUgLSA4cHgpYFxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2l0aW9uOiB0aGlzLnRyYWNrVHJhbnNpdGlvbixcbiAgICAgICAgbGVmdCxcbiAgICAgICAgcmlnaHQsXG4gICAgICAgIHdpZHRoXG4gICAgICB9XG4gICAgfSxcbiAgICB0cmFja1BhZGRpbmcgKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSB8fFxuICAgICAgICB0aGlzLmlucHV0V2lkdGggPiAwIHx8XG4gICAgICAgIHRoaXMuZGlzYWJsZWRcbiAgICAgICkgPyAwIDogN1xuICAgIH0sXG4gICAgdHJhY2tTdHlsZXMgKCkge1xuICAgICAgY29uc3QgdHJhY2tQYWRkaW5nID0gdGhpcy5kaXNhYmxlZCA/IGBjYWxjKCR7dGhpcy5pbnB1dFdpZHRofSUgKyA4cHgpYCA6IGAke3RoaXMudHJhY2tQYWRkaW5nfXB4YFxuICAgICAgY29uc3QgbGVmdCA9IHRoaXMuJHZ1ZXRpZnkucnRsID8gJ2F1dG8nIDogdHJhY2tQYWRkaW5nXG4gICAgICBjb25zdCByaWdodCA9IHRoaXMuJHZ1ZXRpZnkucnRsID8gdHJhY2tQYWRkaW5nIDogJ2F1dG8nXG4gICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZGlzYWJsZWRcbiAgICAgICAgPyBgY2FsYygkezEwMCAtIHRoaXMuaW5wdXRXaWR0aH0lIC0gOHB4KWBcbiAgICAgICAgOiAnMTAwJSdcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNpdGlvbjogdGhpcy50cmFja1RyYW5zaXRpb24sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHJpZ2h0LFxuICAgICAgICB3aWR0aFxuICAgICAgfVxuICAgIH0sXG4gICAgdGlja1N0eWxlcyAoKSB7XG4gICAgICBjb25zdCBzaXplID0gTnVtYmVyKHRoaXMudGlja1NpemUpXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgICdib3JkZXItd2lkdGgnOiBgJHtzaXplfXB4YCxcbiAgICAgICAgJ2JvcmRlci1yYWRpdXMnOiBzaXplID4gMSA/ICc1MCUnIDogbnVsbCxcbiAgICAgICAgdHJhbnNmb3JtOiBzaXplID4gMSA/IGB0cmFuc2xhdGVYKC0ke3NpemV9cHgpIHRyYW5zbGF0ZVkoLSR7c2l6ZSAtIDF9cHgpYCA6IG51bGxcbiAgICAgIH1cbiAgICB9LFxuICAgIHRyYWNrVHJhbnNpdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5rZXlQcmVzc2VkID49IDIgPyAnbm9uZScgOiAnJ1xuICAgIH0sXG4gICAgbnVtVGlja3MgKCkge1xuICAgICAgcmV0dXJuIE1hdGguY2VpbCgodGhpcy5tYXggLSB0aGlzLm1pbikgLyB0aGlzLnN0ZXBOdW1lcmljKVxuICAgIH0sXG4gICAgaW5wdXRXaWR0aCAoKSB7XG4gICAgICByZXR1cm4gKHRoaXMucm91bmRWYWx1ZSh0aGlzLmludGVybmFsVmFsdWUpIC0gdGhpcy5taW4pIC8gKHRoaXMubWF4IC0gdGhpcy5taW4pICogMTAwXG4gICAgfSxcbiAgICBpc0RpcnR5ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLmludGVybmFsVmFsdWUgPiB0aGlzLm1pbiB8fFxuICAgICAgICB0aGlzLmFsd2F5c0RpcnR5XG4gICAgfVxuICB9LFxuXG4gIHdhdGNoOiB7XG4gICAgbWluICh2YWwpIHtcbiAgICAgIHZhbCA+IHRoaXMuaW50ZXJuYWxWYWx1ZSAmJiB0aGlzLiRlbWl0KCdpbnB1dCcsIHBhcnNlRmxvYXQodmFsKSlcbiAgICB9LFxuICAgIG1heCAodmFsKSB7XG4gICAgICB2YWwgPCB0aGlzLmludGVybmFsVmFsdWUgJiYgdGhpcy4kZW1pdCgnaW5wdXQnLCBwYXJzZUZsb2F0KHZhbCkpXG4gICAgfSxcbiAgICB2YWx1ZSAodmFsKSB7XG4gICAgICB0aGlzLmludGVybmFsVmFsdWUgPSB2YWxcbiAgICB9XG4gIH0sXG5cbiAgbW91bnRlZCAoKSB7XG4gICAgLy8gV2l0aG91dCBhIHYtYXBwLCBpT1MgZG9lcyBub3Qgd29yayB3aXRoIGJvZHkgc2VsZWN0b3JzXG4gICAgdGhpcy5hcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hcHBdJykgfHxcbiAgICAgIGNvbnNvbGVXYXJuKCdNaXNzaW5nIHYtYXBwIG9yIGEgbm9uLWJvZHkgd3JhcHBpbmcgZWxlbWVudCB3aXRoIHRoZSBbZGF0YS1hcHBdIGF0dHJpYnV0ZScsIHRoaXMpXG4gIH0sXG5cbiAgbWV0aG9kczoge1xuICAgIGdlbkRlZmF1bHRTbG90ICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW3RoaXMuZ2VuTGFiZWwoKV1cbiAgICAgIGNvbnN0IHNsaWRlciA9IHRoaXMuZ2VuU2xpZGVyKClcbiAgICAgIHRoaXMuaW52ZXJzZUxhYmVsXG4gICAgICAgID8gY2hpbGRyZW4udW5zaGlmdChzbGlkZXIpXG4gICAgICAgIDogY2hpbGRyZW4ucHVzaChzbGlkZXIpXG5cbiAgICAgIGNoaWxkcmVuLnB1c2godGhpcy5nZW5Qcm9ncmVzcygpKVxuXG4gICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICB9LFxuICAgIGdlbkxpc3RlbmVycyAoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBibHVyOiB0aGlzLm9uQmx1cixcbiAgICAgICAgY2xpY2s6IHRoaXMub25TbGlkZXJDbGljayxcbiAgICAgICAgZm9jdXM6IHRoaXMub25Gb2N1cyxcbiAgICAgICAga2V5ZG93bjogdGhpcy5vbktleURvd24sXG4gICAgICAgIGtleXVwOiB0aGlzLm9uS2V5VXBcbiAgICAgIH1cbiAgICB9LFxuICAgIGdlbklucHV0ICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdpbnB1dCcsIHtcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAnYXJpYS1sYWJlbCc6IHRoaXMubGFiZWwsXG4gICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgIHJvbGU6ICdzbGlkZXInLFxuICAgICAgICAgIHRhYmluZGV4OiB0aGlzLmRpc2FibGVkID8gLTEgOiB0aGlzLiRhdHRycy50YWJpbmRleCxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5pbnRlcm5hbFZhbHVlLFxuICAgICAgICAgIHJlYWRvbmx5OiB0cnVlLFxuICAgICAgICAgICdhcmlhLXJlYWRvbmx5JzogU3RyaW5nKHRoaXMucmVhZG9ubHkpLFxuICAgICAgICAgICdhcmlhLXZhbHVlbWluJzogdGhpcy5taW4sXG4gICAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiB0aGlzLm1heCxcbiAgICAgICAgICAnYXJpYS12YWx1ZW5vdyc6IHRoaXMuaW50ZXJuYWxWYWx1ZSxcbiAgICAgICAgICAuLi50aGlzLiRhdHRyc1xuICAgICAgICB9LFxuICAgICAgICBvbjogdGhpcy5nZW5MaXN0ZW5lcnMoKSxcbiAgICAgICAgcmVmOiAnaW5wdXQnXG4gICAgICB9KVxuICAgIH0sXG4gICAgZ2VuU2xpZGVyICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXInLFxuICAgICAgICAnY2xhc3MnOiB7XG4gICAgICAgICAgJ3Ytc2xpZGVyLS1pcy1hY3RpdmUnOiB0aGlzLmlzQWN0aXZlXG4gICAgICAgIH0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgICAgbmFtZTogJ2NsaWNrLW91dHNpZGUnLFxuICAgICAgICAgIHZhbHVlOiB0aGlzLm9uQmx1clxuICAgICAgICB9XVxuICAgICAgfSwgdGhpcy5nZW5DaGlsZHJlbigpKVxuICAgIH0sXG4gICAgZ2VuQ2hpbGRyZW4gKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgdGhpcy5nZW5JbnB1dCgpLFxuICAgICAgICB0aGlzLmdlblRyYWNrQ29udGFpbmVyKCksXG4gICAgICAgIHRoaXMuZ2VuU3RlcHMoKSxcbiAgICAgICAgdGhpcy5nZW5UaHVtYkNvbnRhaW5lcihcbiAgICAgICAgICB0aGlzLmludGVybmFsVmFsdWUsXG4gICAgICAgICAgdGhpcy5pbnB1dFdpZHRoLFxuICAgICAgICAgIHRoaXMuaXNGb2N1c2VkIHx8IHRoaXMuaXNBY3RpdmUsXG4gICAgICAgICAgdGhpcy5vblRodW1iTW91c2VEb3duXG4gICAgICAgIClcbiAgICAgIF1cbiAgICB9LFxuICAgIGdlblN0ZXBzICgpIHtcbiAgICAgIGlmICghdGhpcy5zdGVwIHx8ICF0aGlzLnNob3dUaWNrcykgcmV0dXJuIG51bGxcblxuICAgICAgY29uc3QgdGlja3MgPSBjcmVhdGVSYW5nZSh0aGlzLm51bVRpY2tzICsgMSkubWFwKGkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IFtdXG5cbiAgICAgICAgaWYgKHRoaXMudGlja0xhYmVsc1tpXSkge1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2godGhpcy4kY3JlYXRlRWxlbWVudCgnc3BhbicsIHRoaXMudGlja0xhYmVsc1tpXSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnc3BhbicsIHtcbiAgICAgICAgICBrZXk6IGksXG4gICAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNsaWRlcl9fdGlja3MnLFxuICAgICAgICAgIGNsYXNzOiB7XG4gICAgICAgICAgICAndi1zbGlkZXJfX3RpY2tzLS1hbHdheXMtc2hvdyc6IHRoaXMudGlja3MgPT09ICdhbHdheXMnIHx8XG4gICAgICAgICAgICAgIHRoaXMudGlja0xhYmVscy5sZW5ndGggPiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgLi4udGhpcy50aWNrU3R5bGVzLFxuICAgICAgICAgICAgbGVmdDogYCR7aSAqICgxMDAgLyB0aGlzLm51bVRpY2tzKX0lYFxuICAgICAgICAgIH1cbiAgICAgICAgfSwgY2hpbGRyZW4pXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2xpZGVyX190aWNrcy1jb250YWluZXInXG4gICAgICB9LCB0aWNrcylcbiAgICB9LFxuICAgIGdlblRodW1iICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB0aGlzLnNldEJhY2tncm91bmRDb2xvcih0aGlzLmNvbXB1dGVkVGh1bWJDb2xvciwge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2xpZGVyX190aHVtYidcbiAgICAgIH0pKVxuICAgIH0sXG4gICAgZ2VuVGh1bWJDb250YWluZXIgKHZhbHVlLCB2YWx1ZVdpZHRoLCBpc0FjdGl2ZSwgb25EcmFnKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFt0aGlzLmdlblRodW1iKCldXG5cbiAgICAgIGNvbnN0IHRodW1iTGFiZWxDb250ZW50ID0gdGhpcy5nZXRMYWJlbCh2YWx1ZSlcbiAgICAgIHRoaXMuc2hvd1RodW1iTGFiZWwgJiYgY2hpbGRyZW4ucHVzaCh0aGlzLmdlblRodW1iTGFiZWwodGh1bWJMYWJlbENvbnRlbnQpKVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2JywgdGhpcy5zZXRUZXh0Q29sb3IodGhpcy5jb21wdXRlZFRodW1iQ29sb3IsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNsaWRlcl9fdGh1bWItY29udGFpbmVyJyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgICd2LXNsaWRlcl9fdGh1bWItY29udGFpbmVyLS1pcy1hY3RpdmUnOiBpc0FjdGl2ZSxcbiAgICAgICAgICAndi1zbGlkZXJfX3RodW1iLWNvbnRhaW5lci0tc2hvdy1sYWJlbCc6IHRoaXMuc2hvd1RodW1iTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICB0cmFuc2l0aW9uOiB0aGlzLnRyYWNrVHJhbnNpdGlvbixcbiAgICAgICAgICBsZWZ0OiBgJHt0aGlzLiR2dWV0aWZ5LnJ0bCA/IDEwMCAtIHZhbHVlV2lkdGggOiB2YWx1ZVdpZHRofSVgXG4gICAgICAgIH0sXG4gICAgICAgIG9uOiB7XG4gICAgICAgICAgdG91Y2hzdGFydDogb25EcmFnLFxuICAgICAgICAgIG1vdXNlZG93bjogb25EcmFnXG4gICAgICAgIH1cbiAgICAgIH0pLCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlblRodW1iTGFiZWwgKGNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBjb252ZXJ0VG9Vbml0KHRoaXMudGh1bWJTaXplKVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWU2NhbGVUcmFuc2l0aW9uLCB7XG4gICAgICAgIHByb3BzOiB7IG9yaWdpbjogJ2JvdHRvbSBjZW50ZXInIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RodW1iLWxhYmVsX19jb250YWluZXInLFxuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5pc0ZvY3VzZWQgfHwgdGhpcy5pc0FjdGl2ZSB8fCB0aGlzLnRodW1iTGFiZWwgPT09ICdhbHdheXMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LCBbXG4gICAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2JywgdGhpcy5zZXRCYWNrZ3JvdW5kQ29sb3IodGhpcy5jb21wdXRlZFRodW1iQ29sb3IsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RodW1iLWxhYmVsJyxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgIGhlaWdodDogc2l6ZSxcbiAgICAgICAgICAgICAgd2lkdGg6IHNpemVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSwgW2NvbnRlbnRdKVxuICAgICAgICBdKVxuICAgICAgXSlcbiAgICB9LFxuICAgIGdlblRyYWNrQ29udGFpbmVyICgpIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gW1xuICAgICAgICB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB0aGlzLnNldEJhY2tncm91bmRDb2xvcih0aGlzLmNvbXB1dGVkVHJhY2tDb2xvciwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RyYWNrJyxcbiAgICAgICAgICBzdHlsZTogdGhpcy50cmFja1N0eWxlc1xuICAgICAgICB9KSksXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHRoaXMuc2V0QmFja2dyb3VuZENvbG9yKHRoaXMuY29tcHV0ZWRDb2xvciwge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RyYWNrLWZpbGwnLFxuICAgICAgICAgIHN0eWxlOiB0aGlzLnRyYWNrRmlsbFN0eWxlc1xuICAgICAgICB9KSlcbiAgICAgIF1cblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNsaWRlcl9fdHJhY2tfX2NvbnRhaW5lcicsXG4gICAgICAgIHJlZjogJ3RyYWNrJ1xuICAgICAgfSwgY2hpbGRyZW4pXG4gICAgfSxcbiAgICBnZXRMYWJlbCAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLiRzY29wZWRTbG90c1sndGh1bWItbGFiZWwnXVxuICAgICAgICA/IHRoaXMuJHNjb3BlZFNsb3RzWyd0aHVtYi1sYWJlbCddKHsgdmFsdWUgfSlcbiAgICAgICAgOiB0aGlzLiRjcmVhdGVFbGVtZW50KCdzcGFuJywgdmFsdWUpXG4gICAgfSxcbiAgICBvbkJsdXIgKGUpIHtcbiAgICAgIGlmICh0aGlzLmtleVByZXNzZWQgPT09IDIpIHJldHVyblxuXG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuJGVtaXQoJ2JsdXInLCBlKVxuICAgIH0sXG4gICAgb25Gb2N1cyAoZSkge1xuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlXG4gICAgICB0aGlzLiRlbWl0KCdmb2N1cycsIGUpXG4gICAgfSxcbiAgICBvblRodW1iTW91c2VEb3duIChlKSB7XG4gICAgICB0aGlzLm9sZFZhbHVlID0gdGhpcy5pbnRlcm5hbFZhbHVlXG4gICAgICB0aGlzLmtleVByZXNzZWQgPSAyXG4gICAgICBjb25zdCBvcHRpb25zID0geyBwYXNzaXZlOiB0cnVlIH1cbiAgICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlXG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlXG5cbiAgICAgIGlmICgndG91Y2hlcycgaW4gZSkge1xuICAgICAgICB0aGlzLmFwcC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLCBvcHRpb25zKVxuICAgICAgICBhZGRPbmNlRXZlbnRMaXN0ZW5lcih0aGlzLmFwcCwgJ3RvdWNoZW5kJywgdGhpcy5vblNsaWRlck1vdXNlVXApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFwcC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLCBvcHRpb25zKVxuICAgICAgICBhZGRPbmNlRXZlbnRMaXN0ZW5lcih0aGlzLmFwcCwgJ21vdXNldXAnLCB0aGlzLm9uU2xpZGVyTW91c2VVcClcbiAgICAgIH1cblxuICAgICAgdGhpcy4kZW1pdCgnc3RhcnQnLCB0aGlzLmludGVybmFsVmFsdWUpXG4gICAgfSxcbiAgICBvblNsaWRlck1vdXNlVXAgKCkge1xuICAgICAgdGhpcy5rZXlQcmVzc2VkID0gMFxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICAgICB0aGlzLmlzQWN0aXZlID0gZmFsc2VcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2VcbiAgICAgIHRoaXMuYXBwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Nb3VzZU1vdmUsIG9wdGlvbnMpXG4gICAgICB0aGlzLmFwcC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLCBvcHRpb25zKVxuXG4gICAgICB0aGlzLiRlbWl0KCdlbmQnLCB0aGlzLmludGVybmFsVmFsdWUpXG4gICAgICBpZiAoIWRlZXBFcXVhbCh0aGlzLm9sZFZhbHVlLCB0aGlzLmludGVybmFsVmFsdWUpKSB7XG4gICAgICAgIHRoaXMuJGVtaXQoJ2NoYW5nZScsIHRoaXMuaW50ZXJuYWxWYWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uTW91c2VNb3ZlIChlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlLCBpc0luc2lkZVRyYWNrIH0gPSB0aGlzLnBhcnNlTW91c2VNb3ZlKGUpXG5cbiAgICAgIGlmIChpc0luc2lkZVRyYWNrKSB7XG4gICAgICAgIHRoaXMuc2V0SW50ZXJuYWxWYWx1ZSh2YWx1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uS2V5RG93biAoZSkge1xuICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgdGhpcy5yZWFkb25seSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wYXJzZUtleURvd24oZSlcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVyblxuXG4gICAgICB0aGlzLnNldEludGVybmFsVmFsdWUodmFsdWUpXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB2YWx1ZSlcbiAgICB9LFxuICAgIG9uS2V5VXAgKCkge1xuICAgICAgdGhpcy5rZXlQcmVzc2VkID0gMFxuICAgIH0sXG4gICAgb25TbGlkZXJDbGljayAoZSkge1xuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlXG4gICAgICB0aGlzLm9uTW91c2VNb3ZlKGUpXG4gICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmludGVybmFsVmFsdWUpXG4gICAgfSxcbiAgICBwYXJzZU1vdXNlTW92ZSAoZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBsZWZ0OiBvZmZzZXRMZWZ0LFxuICAgICAgICB3aWR0aDogdHJhY2tXaWR0aFxuICAgICAgfSA9IHRoaXMuJHJlZnMudHJhY2suZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgIGNvbnN0IGNsaWVudFggPSAndG91Y2hlcycgaW4gZSA/IGUudG91Y2hlc1swXS5jbGllbnRYIDogZS5jbGllbnRYXG4gICAgICAvLyBJdCBpcyBwb3NzaWJsZSBmb3IgbGVmdCB0byBiZSBOYU4sIGZvcmNlIHRvIG51bWJlclxuICAgICAgbGV0IGxlZnQgPSBNYXRoLm1pbihNYXRoLm1heCgoY2xpZW50WCAtIG9mZnNldExlZnQpIC8gdHJhY2tXaWR0aCwgMCksIDEpIHx8IDBcblxuICAgICAgaWYgKHRoaXMuJHZ1ZXRpZnkucnRsKSBsZWZ0ID0gMSAtIGxlZnRcblxuICAgICAgY29uc3QgaXNJbnNpZGVUcmFjayA9IGNsaWVudFggPj0gb2Zmc2V0TGVmdCAtIDggJiYgY2xpZW50WCA8PSBvZmZzZXRMZWZ0ICsgdHJhY2tXaWR0aCArIDhcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLm1pbikgKyBsZWZ0ICogKHRoaXMubWF4IC0gdGhpcy5taW4pXG5cbiAgICAgIHJldHVybiB7IHZhbHVlLCBpc0luc2lkZVRyYWNrIH1cbiAgICB9LFxuICAgIHBhcnNlS2V5RG93biAoZSwgdmFsdWUgPSB0aGlzLmludGVybmFsVmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm5cblxuICAgICAgY29uc3QgeyBwYWdldXAsIHBhZ2Vkb3duLCBlbmQsIGhvbWUsIGxlZnQsIHJpZ2h0LCBkb3duLCB1cCB9ID0ga2V5Q29kZXNcblxuICAgICAgaWYgKCFbcGFnZXVwLCBwYWdlZG93biwgZW5kLCBob21lLCBsZWZ0LCByaWdodCwgZG93biwgdXBdLmluY2x1ZGVzKGUua2V5Q29kZSkpIHJldHVyblxuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLnN0ZXBOdW1lcmljIHx8IDFcbiAgICAgIGNvbnN0IHN0ZXBzID0gKHRoaXMubWF4IC0gdGhpcy5taW4pIC8gc3RlcFxuICAgICAgaWYgKFtsZWZ0LCByaWdodCwgZG93biwgdXBdLmluY2x1ZGVzKGUua2V5Q29kZSkpIHtcbiAgICAgICAgdGhpcy5rZXlQcmVzc2VkICs9IDFcblxuICAgICAgICBjb25zdCBpbmNyZWFzZSA9IHRoaXMuJHZ1ZXRpZnkucnRsID8gW2xlZnQsIHVwXSA6IFtyaWdodCwgdXBdXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGluY3JlYXNlLmluY2x1ZGVzKGUua2V5Q29kZSkgPyAxIDogLTFcbiAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IGUuc2hpZnRLZXkgPyAzIDogKGUuY3RybEtleSA/IDIgOiAxKVxuXG4gICAgICAgIHZhbHVlID0gdmFsdWUgKyAoZGlyZWN0aW9uICogc3RlcCAqIG11bHRpcGxpZXIpXG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gaG9tZSkge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5taW4pXG4gICAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gZW5kKSB7XG4gICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh0aGlzLm1heClcbiAgICAgIH0gZWxzZSAvKiBpZiAoZS5rZXlDb2RlID09PSBrZXlDb2Rlcy5wYWdldXAgfHwgZS5rZXlDb2RlID09PSBwYWdlZG93bikgKi8ge1xuICAgICAgICAvLyBQYWdlIHVwL2Rvd25cbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gZS5rZXlDb2RlID09PSBwYWdlZG93biA/IDEgOiAtMVxuICAgICAgICB2YWx1ZSA9IHZhbHVlIC0gKGRpcmVjdGlvbiAqIHN0ZXAgKiAoc3RlcHMgPiAxMDAgPyBzdGVwcyAvIDEwIDogMTApKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9LFxuICAgIHJvdW5kVmFsdWUgKHZhbHVlKSB7XG4gICAgICBpZiAoIXRoaXMuc3RlcE51bWVyaWMpIHJldHVybiB2YWx1ZVxuICAgICAgLy8gRm9ybWF0IGlucHV0IHZhbHVlIHVzaW5nIHRoZSBzYW1lIG51bWJlclxuICAgICAgLy8gb2YgZGVjaW1hbHMgcGxhY2VzIGFzIGluIHRoZSBzdGVwIHByb3BcbiAgICAgIGNvbnN0IHRyaW1tZWRTdGVwID0gdGhpcy5zdGVwLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgICBjb25zdCBkZWNpbWFscyA9IHRyaW1tZWRTdGVwLmluZGV4T2YoJy4nKSA+IC0xXG4gICAgICAgID8gKHRyaW1tZWRTdGVwLmxlbmd0aCAtIHRyaW1tZWRTdGVwLmluZGV4T2YoJy4nKSAtIDEpXG4gICAgICAgIDogMFxuICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5taW4gJSB0aGlzLnN0ZXBOdW1lcmljXG5cbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gTWF0aC5yb3VuZCgodmFsdWUgLSBvZmZzZXQpIC8gdGhpcy5zdGVwTnVtZXJpYykgKiB0aGlzLnN0ZXBOdW1lcmljICsgb2Zmc2V0XG5cbiAgICAgIHJldHVybiBwYXJzZUZsb2F0KE1hdGgubWluKG5ld1ZhbHVlLCB0aGlzLm1heCkudG9GaXhlZChkZWNpbWFscykpXG4gICAgfSxcbiAgICBzZXRJbnRlcm5hbFZhbHVlICh2YWx1ZSkge1xuICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID0gdmFsdWVcbiAgICB9XG4gIH1cbn1cbiJdfQ==