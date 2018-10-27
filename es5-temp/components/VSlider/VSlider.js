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
/* @vue/component */
export default {
    name: 'v-slider',
    directives: { ClickOutside },
    extends: VInput,
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
        defaultColor: 'primary',
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
            return this.validationState || this.color || this.defaultColor;
        },
        computedTrackColor() {
            return this.disabled ? null : (this.trackColor || null);
        },
        computedThumbColor() {
            if (this.disabled || !this.isDirty)
                return null;
            return this.validationState || this.thumbColor || this.color || this.defaultColor;
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
                    'aria-readonly': String(this.readonly)
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
            return this.$createElement('div', {
                staticClass: 'v-slider__thumb',
                'class': this.addBackgroundColorClassChecks({}, this.computedThumbColor)
            });
        },
        genThumbContainer(value, valueWidth, isActive, onDrag) {
            const children = [this.genThumb()];
            const thumbLabelContent = this.getLabel(value);
            this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent));
            return this.$createElement('div', {
                staticClass: 'v-slider__thumb-container',
                'class': this.addTextColorClassChecks({
                    'v-slider__thumb-container--is-active': isActive,
                    'v-slider__thumb-container--show-label': this.showThumbLabel
                }, this.computedThumbColor),
                style: {
                    transition: this.trackTransition,
                    left: `${this.$vuetify.rtl ? 100 - valueWidth : valueWidth}%`
                },
                on: {
                    touchstart: onDrag,
                    mousedown: onDrag
                }
            }, children);
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
                    this.$createElement('div', {
                        staticClass: 'v-slider__thumb-label',
                        'class': this.addBackgroundColorClassChecks({}, this.computedThumbColor),
                        style: {
                            height: size,
                            width: size
                        }
                    }, [content])
                ])
            ]);
        },
        genTrackContainer() {
            const children = [
                this.$createElement('div', {
                    staticClass: 'v-slider__track',
                    'class': this.addBackgroundColorClassChecks({}, this.computedTrackColor),
                    style: this.trackStyles
                }),
                this.$createElement('div', {
                    staticClass: 'v-slider__track-fill',
                    'class': this.addBackgroundColorClassChecks(),
                    style: this.trackFillStyles
                })
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
                addOnceEventListener(this.app, 'touchend', this.onMouseUp);
            }
            else {
                this.app.addEventListener('mousemove', this.onMouseMove, options);
                addOnceEventListener(this.app, 'mouseup', this.onMouseUp);
            }
            this.$emit('start', this.internalValue);
        },
        onMouseUp() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVlNsaWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1ZTbGlkZXIvVlNsaWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTO0FBQ1QsT0FBTyx1Q0FBdUMsQ0FBQTtBQUU5QyxhQUFhO0FBQ2IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUE7QUFFakQsYUFBYTtBQUNiLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQTtBQUU5QixhQUFhO0FBQ2IsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUE7QUFFekQsWUFBWTtBQUNaLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsYUFBYSxFQUNiLFdBQVcsRUFDWCxRQUFRLEVBQ1IsU0FBUyxFQUNWLE1BQU0sb0JBQW9CLENBQUE7QUFDM0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRWhELG9CQUFvQjtBQUNwQixlQUFlO0lBQ2IsSUFBSSxFQUFFLFVBQVU7SUFFaEIsVUFBVSxFQUFFLEVBQUUsWUFBWSxFQUFFO0lBRTVCLE9BQU8sRUFBRSxNQUFNO0lBRWYsS0FBSyxFQUFFO1FBQ0wsV0FBVyxFQUFFLE9BQU87UUFDcEIsWUFBWSxFQUFFLE9BQU87UUFDckIsS0FBSyxFQUFFLE1BQU07UUFDYixHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFDRCxHQUFHLEVBQUU7WUFDSCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxHQUFHO1NBQ2I7UUFDRCxLQUFLLEVBQUUsT0FBTztRQUNkLElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDdkIsT0FBTyxFQUFFLEtBQUs7WUFDZCxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLFFBQVE7U0FDekQ7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsS0FBSztZQUNYLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztTQUNwQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDdkIsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxTQUFTLElBQUksQ0FBQyxLQUFLLFFBQVE7U0FDekQ7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLE9BQU8sRUFBRSxFQUFFO1NBQ1o7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsTUFBTTtZQUNaLE9BQU8sRUFBRSxJQUFJO1NBQ2Q7UUFDRCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0tBQ3hCO0lBRUQsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNYLEdBQUcsRUFBRSxFQUFFO1FBQ1AsWUFBWSxFQUFFLFNBQVM7UUFDdkIsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQUUsQ0FBQztRQUNiLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFLLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztRQUN0RSxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7SUFFRixRQUFRLEVBQUU7UUFDUixPQUFPO1lBQ0wsT0FBTztnQkFDTCxpQkFBaUIsRUFBRSxJQUFJO2dCQUN2Qix3QkFBd0IsRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDeEMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQ25ELCtCQUErQixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQzNELDhCQUE4QixFQUFFLElBQUksQ0FBQyxVQUFVO29CQUM3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVU7YUFDL0IsQ0FBQTtRQUNILENBQUM7UUFDRCxTQUFTO1lBQ1AsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUMvQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDeEQsQ0FBQztRQUNELGNBQWM7WUFDWixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUN2QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLEtBQUssRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FDakMsQ0FBQTtRQUNILENBQUM7UUFDRCxhQUFhO1lBQ1gsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUM5QixPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFBO1FBQ2hFLENBQUM7UUFDRCxrQkFBa0I7WUFDaEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsQ0FBQTtRQUN6RCxDQUFDO1FBQ0Qsa0JBQWtCO1lBQ2hCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUFFLE9BQU8sSUFBSSxDQUFBO1lBQy9DLE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQTtRQUNuRixDQUFDO1FBQ0QsYUFBYSxFQUFFO1lBQ2IsR0FBRztnQkFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUE7WUFDdkIsQ0FBQztZQUNELEdBQUcsQ0FBRSxHQUFHO2dCQUNOLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFBO2dCQUV6Qiw0QkFBNEI7Z0JBQzVCLDBCQUEwQjtnQkFDMUIsd0JBQXdCO2dCQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtnQkFFaEUsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLFNBQVM7b0JBQUUsT0FBTTtnQkFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7Z0JBRXRCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO2dCQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDakIsQ0FBQztTQUNGO1FBQ0QsV0FBVztZQUNULE9BQU8sSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNsRCxDQUFDO1FBQ0QsZUFBZTtZQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7WUFDNUMsSUFBSSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUE7WUFFakMsSUFBSSxJQUFJLENBQUMsUUFBUTtnQkFBRSxLQUFLLEdBQUcsUUFBUSxJQUFJLENBQUMsVUFBVSxVQUFVLENBQUE7WUFFNUQsT0FBTztnQkFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ2hDLElBQUk7Z0JBQ0osS0FBSztnQkFDTCxLQUFLO2FBQ04sQ0FBQTtRQUNILENBQUM7UUFDRCxZQUFZO1lBQ1YsT0FBTyxDQUNMLElBQUksQ0FBQyxRQUFRO2dCQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNYLENBQUM7UUFDRCxXQUFXO1lBQ1QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsVUFBVSxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFBO1lBQ2pHLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQTtZQUN0RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7WUFDdkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVE7Z0JBQ3pCLENBQUMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxVQUFVO2dCQUN6QyxDQUFDLENBQUMsTUFBTSxDQUFBO1lBRVYsT0FBTztnQkFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWU7Z0JBQ2hDLElBQUk7Z0JBQ0osS0FBSztnQkFDTCxLQUFLO2FBQ04sQ0FBQTtRQUNILENBQUM7UUFDRCxVQUFVO1lBQ1IsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUVsQyxPQUFPO2dCQUNMLGNBQWMsRUFBRSxHQUFHLElBQUksSUFBSTtnQkFDM0IsZUFBZSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDeEMsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsSUFBSSxtQkFBbUIsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJO2FBQ2pGLENBQUE7UUFDSCxDQUFDO1FBQ0QsZUFBZTtZQUNiLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1FBQzNDLENBQUM7UUFDRCxRQUFRO1lBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzVELENBQUM7UUFDRCxVQUFVO1lBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUN2RixDQUFDO1FBQ0QsT0FBTztZQUNMLE9BQU8sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRztnQkFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUNwQixDQUFDO0tBQ0Y7SUFFRCxLQUFLLEVBQUU7UUFDTCxHQUFHLENBQUUsR0FBRztZQUNOLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2xFLENBQUM7UUFDRCxHQUFHLENBQUUsR0FBRztZQUNOLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ2xFLENBQUM7UUFDRCxLQUFLLENBQUUsR0FBRztZQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFBO1FBQzFCLENBQUM7S0FDRjtJQUVELE9BQU87UUFDTCx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUM3QyxXQUFXLENBQUMsNEVBQTRFLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDbkcsQ0FBQztJQUVELE9BQU8sRUFBRTtRQUNQLGNBQWM7WUFDWixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTtZQUUvQixJQUFJLENBQUMsWUFBWTtnQkFDZixDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBRXpCLE9BQU8sUUFBUSxDQUFBO1FBQ2pCLENBQUM7UUFDRCxZQUFZO1lBQ1YsT0FBTztnQkFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtnQkFDekIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTzthQUNwQixDQUFBO1FBQ0gsQ0FBQztRQUNELFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO2dCQUNsQyxLQUFLLEVBQUU7b0JBQ0wsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLO29CQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7b0JBQ25ELEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYTtvQkFDekIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsZUFBZSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUN2QztnQkFDRCxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDdkIsR0FBRyxFQUFFLE9BQU87YUFDYixDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsU0FBUztZQUNQLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSxVQUFVO2dCQUN2QixPQUFPLEVBQUU7b0JBQ1AscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFFBQVE7aUJBQ3JDO2dCQUNELFVBQVUsRUFBRSxDQUFDO3dCQUNYLElBQUksRUFBRSxlQUFlO3dCQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU07cUJBQ25CLENBQUM7YUFDSCxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQ3hCLENBQUM7UUFDRCxXQUFXO1lBQ1QsT0FBTztnQkFDTCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsaUJBQWlCLENBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQ2YsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUMvQixJQUFJLENBQUMsZ0JBQWdCLENBQ3RCO2FBQ0YsQ0FBQTtRQUNILENBQUM7UUFDRCxRQUFRO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFBRSxPQUFPLElBQUksQ0FBQTtZQUU5QyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25ELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQTtnQkFFbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUN0QixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUMvRDtnQkFFRCxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO29CQUNqQyxHQUFHLEVBQUUsQ0FBQztvQkFDTixXQUFXLEVBQUUsaUJBQWlCO29CQUM5QixLQUFLLEVBQUU7d0JBQ0wsOEJBQThCLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFROzRCQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDO3FCQUM3QjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0wsR0FBRyxJQUFJLENBQUMsVUFBVTt3QkFDbEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRztxQkFDdEM7aUJBQ0YsRUFBRSxRQUFRLENBQUMsQ0FBQTtZQUNkLENBQUMsQ0FBQyxDQUFBO1lBRUYsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLDJCQUEyQjthQUN6QyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ1gsQ0FBQztRQUNELFFBQVE7WUFDTixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO2dCQUNoQyxXQUFXLEVBQUUsaUJBQWlCO2dCQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUM7YUFDekUsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUNELGlCQUFpQixDQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU07WUFDcEQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUVsQyxNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDOUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO1lBRTNFLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hDLFdBQVcsRUFBRSwyQkFBMkI7Z0JBQ3hDLE9BQU8sRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUM7b0JBQ3BDLHNDQUFzQyxFQUFFLFFBQVE7b0JBQ2hELHVDQUF1QyxFQUFFLElBQUksQ0FBQyxjQUFjO2lCQUM3RCxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztnQkFDM0IsS0FBSyxFQUFFO29CQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZTtvQkFDaEMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRztpQkFDOUQ7Z0JBQ0QsRUFBRSxFQUFFO29CQUNGLFVBQVUsRUFBRSxNQUFNO29CQUNsQixTQUFTLEVBQUUsTUFBTTtpQkFDbEI7YUFDRixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2QsQ0FBQztRQUNELGFBQWEsQ0FBRSxPQUFPO1lBQ3BCLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7WUFFMUMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixFQUFFO2dCQUMzQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFFO2FBQ25DLEVBQUU7Z0JBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3pCLFdBQVcsRUFBRSxrQ0FBa0M7b0JBQy9DLFVBQVUsRUFBRTt3QkFDVjs0QkFDRSxJQUFJLEVBQUUsTUFBTTs0QkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUTt5QkFDdkU7cUJBQ0Y7aUJBQ0YsRUFBRTtvQkFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTt3QkFDekIsV0FBVyxFQUFFLHVCQUF1Qjt3QkFDcEMsT0FBTyxFQUFFLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDO3dCQUN4RSxLQUFLLEVBQUU7NEJBQ0wsTUFBTSxFQUFFLElBQUk7NEJBQ1osS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0YsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNkLENBQUM7YUFDSCxDQUFDLENBQUE7UUFDSixDQUFDO1FBQ0QsaUJBQWlCO1lBQ2YsTUFBTSxRQUFRLEdBQUc7Z0JBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3pCLFdBQVcsRUFBRSxpQkFBaUI7b0JBQzlCLE9BQU8sRUFBRSxJQUFJLENBQUMsNkJBQTZCLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztvQkFDeEUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXO2lCQUN4QixDQUFDO2dCQUNGLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFO29CQUN6QixXQUFXLEVBQUUsc0JBQXNCO29CQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLDZCQUE2QixFQUFFO29CQUM3QyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWU7aUJBQzVCLENBQUM7YUFDSCxDQUFBO1lBRUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRTtnQkFDaEMsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsR0FBRyxFQUFFLE9BQU87YUFDYixFQUFFLFFBQVEsQ0FBQyxDQUFBO1FBQ2QsQ0FBQztRQUNELFFBQVEsQ0FBRSxLQUFLO1lBQ2IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3hDLENBQUM7UUFDRCxNQUFNLENBQUUsQ0FBQztZQUNQLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxDQUFDO2dCQUFFLE9BQU07WUFFakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUE7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7WUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDdkIsQ0FBQztRQUNELE9BQU8sQ0FBRSxDQUFDO1lBQ1IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUE7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDeEIsQ0FBQztRQUNELGdCQUFnQixDQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLE1BQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1lBRXRCLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFDakUsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2FBQzNEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQ2pFLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTthQUMxRDtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUN6QyxDQUFDO1FBQ0QsU0FBUztZQUNQLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQ25CLE1BQU0sT0FBTyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFBO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUE7WUFDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUVwRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDakQsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2FBQ3pDO1FBQ0gsQ0FBQztRQUNELFdBQVcsQ0FBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRXZELElBQUksYUFBYSxFQUFFO2dCQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDN0I7UUFDSCxDQUFDO1FBQ0QsU0FBUyxDQUFFLENBQUM7WUFDVixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsT0FBTTtZQUUxQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRWxDLElBQUksS0FBSyxJQUFJLElBQUk7Z0JBQUUsT0FBTTtZQUV6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUE7WUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDN0IsQ0FBQztRQUNELE9BQU87WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQTtRQUNyQixDQUFDO1FBQ0QsYUFBYSxDQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtZQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtRQUMxQyxDQUFDO1FBQ0QsY0FBYyxDQUFFLENBQUM7WUFDZixNQUFNLEVBQ0osSUFBSSxFQUFFLFVBQVUsRUFDaEIsS0FBSyxFQUFFLFVBQVUsRUFDbEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO1lBQzVDLE1BQU0sT0FBTyxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBO1lBQ2pFLHFEQUFxRDtZQUNyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUU3RSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRztnQkFBRSxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQTtZQUV0QyxNQUFNLGFBQWEsR0FBRyxPQUFPLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxPQUFPLElBQUksVUFBVSxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDekYsTUFBTSxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUVqRSxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxDQUFBO1FBQ2pDLENBQUM7UUFDRCxZQUFZLENBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYTtZQUN6QyxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU07WUFFekIsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxRQUFRLENBQUE7WUFFdkUsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFFLE9BQU07WUFFckYsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFBO1lBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFBO1lBQ2xDLE1BQU0sS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFBO1lBQzFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQTtnQkFFcEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFDN0QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ3ZELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUV2RCxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQTthQUNoRDtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO2dCQUM3QixLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUM3QjtpQkFBTSxJQUFJLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO2dCQUM1QixLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUM3QjtpQkFBTSxrRUFBa0UsQ0FBQztnQkFDeEUsZUFBZTtnQkFDZixNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDakQsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2FBQ3JFO1lBRUQsT0FBTyxLQUFLLENBQUE7UUFDZCxDQUFDO1FBQ0QsVUFBVSxDQUFFLEtBQUs7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQUUsT0FBTyxLQUFLLENBQUE7WUFDbkMsMkNBQTJDO1lBQzNDLHlDQUF5QztZQUN6QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFBO1lBQy9DLE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ0wsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFBO1lBRTFDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO1lBRTVGLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUNuRSxDQUFDO1FBQ0QsZ0JBQWdCLENBQUUsS0FBSztZQUNyQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQTtRQUM1QixDQUFDO0tBQ0Y7Q0FDRixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU3R5bGVzXG5pbXBvcnQgJy4uLy4uL3N0eWx1cy9jb21wb25lbnRzL19zbGlkZXJzLnN0eWwnXG5cbi8vIENvbXBvbmVudHNcbmltcG9ydCB7IFZTY2FsZVRyYW5zaXRpb24gfSBmcm9tICcuLi90cmFuc2l0aW9ucydcblxuLy8gRXh0ZW5zaW9uc1xuaW1wb3J0IFZJbnB1dCBmcm9tICcuLi9WSW5wdXQnXG5cbi8vIERpcmVjdGl2ZXNcbmltcG9ydCBDbGlja091dHNpZGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9jbGljay1vdXRzaWRlJ1xuXG4vLyBVdGlsaXRpZXNcbmltcG9ydCB7XG4gIGFkZE9uY2VFdmVudExpc3RlbmVyLFxuICBjb252ZXJ0VG9Vbml0LFxuICBjcmVhdGVSYW5nZSxcbiAga2V5Q29kZXMsXG4gIGRlZXBFcXVhbFxufSBmcm9tICcuLi8uLi91dGlsL2hlbHBlcnMnXG5pbXBvcnQgeyBjb25zb2xlV2FybiB9IGZyb20gJy4uLy4uL3V0aWwvY29uc29sZSdcblxuLyogQHZ1ZS9jb21wb25lbnQgKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3Ytc2xpZGVyJyxcblxuICBkaXJlY3RpdmVzOiB7IENsaWNrT3V0c2lkZSB9LFxuXG4gIGV4dGVuZHM6IFZJbnB1dCxcblxuICBwcm9wczoge1xuICAgIGFsd2F5c0RpcnR5OiBCb29sZWFuLFxuICAgIGludmVyc2VMYWJlbDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIG1pbjoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIG1heDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH0sXG4gICAgcmFuZ2U6IEJvb2xlYW4sXG4gICAgc3RlcDoge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDFcbiAgICB9LFxuICAgIHRpY2tzOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IHR5cGVvZiB2ID09PSAnYm9vbGVhbicgfHwgdiA9PT0gJ2Fsd2F5cydcbiAgICB9LFxuICAgIHRpY2tMYWJlbHM6IHtcbiAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgZGVmYXVsdDogKCkgPT4gKFtdKVxuICAgIH0sXG4gICAgdGlja1NpemU6IHtcbiAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXG4gICAgICBkZWZhdWx0OiAxXG4gICAgfSxcbiAgICB0aHVtYkNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICB0aHVtYkxhYmVsOiB7XG4gICAgICB0eXBlOiBbQm9vbGVhbiwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gdHlwZW9mIHYgPT09ICdib29sZWFuJyB8fCB2ID09PSAnYWx3YXlzJ1xuICAgIH0sXG4gICAgdGh1bWJTaXplOiB7XG4gICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxuICAgICAgZGVmYXVsdDogMzJcbiAgICB9LFxuICAgIHRyYWNrQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHZhbHVlOiBbTnVtYmVyLCBTdHJpbmddXG4gIH0sXG5cbiAgZGF0YTogdm0gPT4gKHtcbiAgICBhcHA6IHt9LFxuICAgIGRlZmF1bHRDb2xvcjogJ3ByaW1hcnknLFxuICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICBrZXlQcmVzc2VkOiAwLFxuICAgIGxhenlWYWx1ZTogdHlwZW9mIHZtLnZhbHVlICE9PSAndW5kZWZpbmVkJyA/IHZtLnZhbHVlIDogTnVtYmVyKHZtLm1pbiksXG4gICAgb2xkVmFsdWU6IG51bGxcbiAgfSksXG5cbiAgY29tcHV0ZWQ6IHtcbiAgICBjbGFzc2VzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICd2LWlucHV0LS1zbGlkZXInOiB0cnVlLFxuICAgICAgICAndi1pbnB1dC0tc2xpZGVyLS10aWNrcyc6IHRoaXMuc2hvd1RpY2tzLFxuICAgICAgICAndi1pbnB1dC0tc2xpZGVyLS1pbnZlcnNlLWxhYmVsJzogdGhpcy5pbnZlcnNlTGFiZWwsXG4gICAgICAgICd2LWlucHV0LS1zbGlkZXItLXRpY2tzLWxhYmVscyc6IHRoaXMudGlja0xhYmVscy5sZW5ndGggPiAwLFxuICAgICAgICAndi1pbnB1dC0tc2xpZGVyLS10aHVtYi1sYWJlbCc6IHRoaXMudGh1bWJMYWJlbCB8fFxuICAgICAgICAgIHRoaXMuJHNjb3BlZFNsb3RzLnRodW1iTGFiZWxcbiAgICAgIH1cbiAgICB9LFxuICAgIHNob3dUaWNrcyAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50aWNrTGFiZWxzLmxlbmd0aCA+IDAgfHxcbiAgICAgICAgKCF0aGlzLmRpc2FibGVkICYmIHRoaXMuc3RlcE51bWVyaWMgJiYgISF0aGlzLnRpY2tzKVxuICAgIH0sXG4gICAgc2hvd1RodW1iTGFiZWwgKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmRpc2FibGVkICYmIChcbiAgICAgICAgISF0aGlzLnRodW1iTGFiZWwgfHxcbiAgICAgICAgdGhpcy50aHVtYkxhYmVsID09PSAnJyB8fFxuICAgICAgICB0aGlzLiRzY29wZWRTbG90c1sndGh1bWItbGFiZWwnXVxuICAgICAgKVxuICAgIH0sXG4gICAgY29tcHV0ZWRDb2xvciAoKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuIG51bGxcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRpb25TdGF0ZSB8fCB0aGlzLmNvbG9yIHx8IHRoaXMuZGVmYXVsdENvbG9yXG4gICAgfSxcbiAgICBjb21wdXRlZFRyYWNrQ29sb3IgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgPyBudWxsIDogKHRoaXMudHJhY2tDb2xvciB8fCBudWxsKVxuICAgIH0sXG4gICAgY29tcHV0ZWRUaHVtYkNvbG9yICgpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmlzRGlydHkpIHJldHVybiBudWxsXG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0aW9uU3RhdGUgfHwgdGhpcy50aHVtYkNvbG9yIHx8IHRoaXMuY29sb3IgfHwgdGhpcy5kZWZhdWx0Q29sb3JcbiAgICB9LFxuICAgIGludGVybmFsVmFsdWU6IHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhenlWYWx1ZVxuICAgICAgfSxcbiAgICAgIHNldCAodmFsKSB7XG4gICAgICAgIGNvbnN0IHsgbWluLCBtYXggfSA9IHRoaXNcblxuICAgICAgICAvLyBSb3VuZCB2YWx1ZSB0byBlbnN1cmUgdGhlXG4gICAgICAgIC8vIGVudGlyZSBzbGlkZXIgcmFuZ2UgY2FuXG4gICAgICAgIC8vIGJlIHNlbGVjdGVkIHdpdGggc3RlcFxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucm91bmRWYWx1ZShNYXRoLm1pbihNYXRoLm1heCh2YWwsIG1pbiksIG1heCkpXG5cbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLmxhenlWYWx1ZSkgcmV0dXJuXG5cbiAgICAgICAgdGhpcy5sYXp5VmFsdWUgPSB2YWx1ZVxuXG4gICAgICAgIHRoaXMuJGVtaXQoJ2lucHV0JywgdmFsdWUpXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKVxuICAgICAgfVxuICAgIH0sXG4gICAgc3RlcE51bWVyaWMgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RlcCA+IDAgPyBwYXJzZUZsb2F0KHRoaXMuc3RlcCkgOiAwXG4gICAgfSxcbiAgICB0cmFja0ZpbGxTdHlsZXMgKCkge1xuICAgICAgY29uc3QgbGVmdCA9IHRoaXMuJHZ1ZXRpZnkucnRsID8gJ2F1dG8nIDogMFxuICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLiR2dWV0aWZ5LnJ0bCA/IDAgOiAnYXV0bydcbiAgICAgIGxldCB3aWR0aCA9IGAke3RoaXMuaW5wdXRXaWR0aH0lYFxuXG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgd2lkdGggPSBgY2FsYygke3RoaXMuaW5wdXRXaWR0aH0lIC0gOHB4KWBcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHJhbnNpdGlvbjogdGhpcy50cmFja1RyYW5zaXRpb24sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHJpZ2h0LFxuICAgICAgICB3aWR0aFxuICAgICAgfVxuICAgIH0sXG4gICAgdHJhY2tQYWRkaW5nICgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgfHxcbiAgICAgICAgdGhpcy5pbnB1dFdpZHRoID4gMCB8fFxuICAgICAgICB0aGlzLmRpc2FibGVkXG4gICAgICApID8gMCA6IDdcbiAgICB9LFxuICAgIHRyYWNrU3R5bGVzICgpIHtcbiAgICAgIGNvbnN0IHRyYWNrUGFkZGluZyA9IHRoaXMuZGlzYWJsZWQgPyBgY2FsYygke3RoaXMuaW5wdXRXaWR0aH0lICsgOHB4KWAgOiBgJHt0aGlzLnRyYWNrUGFkZGluZ31weGBcbiAgICAgIGNvbnN0IGxlZnQgPSB0aGlzLiR2dWV0aWZ5LnJ0bCA/ICdhdXRvJyA6IHRyYWNrUGFkZGluZ1xuICAgICAgY29uc3QgcmlnaHQgPSB0aGlzLiR2dWV0aWZ5LnJ0bCA/IHRyYWNrUGFkZGluZyA6ICdhdXRvJ1xuICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmRpc2FibGVkXG4gICAgICAgID8gYGNhbGMoJHsxMDAgLSB0aGlzLmlucHV0V2lkdGh9JSAtIDhweClgXG4gICAgICAgIDogJzEwMCUnXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zaXRpb246IHRoaXMudHJhY2tUcmFuc2l0aW9uLFxuICAgICAgICBsZWZ0LFxuICAgICAgICByaWdodCxcbiAgICAgICAgd2lkdGhcbiAgICAgIH1cbiAgICB9LFxuICAgIHRpY2tTdHlsZXMgKCkge1xuICAgICAgY29uc3Qgc2l6ZSA9IE51bWJlcih0aGlzLnRpY2tTaXplKVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAnYm9yZGVyLXdpZHRoJzogYCR7c2l6ZX1weGAsXG4gICAgICAgICdib3JkZXItcmFkaXVzJzogc2l6ZSA+IDEgPyAnNTAlJyA6IG51bGwsXG4gICAgICAgIHRyYW5zZm9ybTogc2l6ZSA+IDEgPyBgdHJhbnNsYXRlWCgtJHtzaXplfXB4KSB0cmFuc2xhdGVZKC0ke3NpemUgLSAxfXB4KWAgOiBudWxsXG4gICAgICB9XG4gICAgfSxcbiAgICB0cmFja1RyYW5zaXRpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMua2V5UHJlc3NlZCA+PSAyID8gJ25vbmUnIDogJydcbiAgICB9LFxuICAgIG51bVRpY2tzICgpIHtcbiAgICAgIHJldHVybiBNYXRoLmNlaWwoKHRoaXMubWF4IC0gdGhpcy5taW4pIC8gdGhpcy5zdGVwTnVtZXJpYylcbiAgICB9LFxuICAgIGlucHV0V2lkdGggKCkge1xuICAgICAgcmV0dXJuICh0aGlzLnJvdW5kVmFsdWUodGhpcy5pbnRlcm5hbFZhbHVlKSAtIHRoaXMubWluKSAvICh0aGlzLm1heCAtIHRoaXMubWluKSAqIDEwMFxuICAgIH0sXG4gICAgaXNEaXJ0eSAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnRlcm5hbFZhbHVlID4gdGhpcy5taW4gfHxcbiAgICAgICAgdGhpcy5hbHdheXNEaXJ0eVxuICAgIH1cbiAgfSxcblxuICB3YXRjaDoge1xuICAgIG1pbiAodmFsKSB7XG4gICAgICB2YWwgPiB0aGlzLmludGVybmFsVmFsdWUgJiYgdGhpcy4kZW1pdCgnaW5wdXQnLCBwYXJzZUZsb2F0KHZhbCkpXG4gICAgfSxcbiAgICBtYXggKHZhbCkge1xuICAgICAgdmFsIDwgdGhpcy5pbnRlcm5hbFZhbHVlICYmIHRoaXMuJGVtaXQoJ2lucHV0JywgcGFyc2VGbG9hdCh2YWwpKVxuICAgIH0sXG4gICAgdmFsdWUgKHZhbCkge1xuICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlID0gdmFsXG4gICAgfVxuICB9LFxuXG4gIG1vdW50ZWQgKCkge1xuICAgIC8vIFdpdGhvdXQgYSB2LWFwcCwgaU9TIGRvZXMgbm90IHdvcmsgd2l0aCBib2R5IHNlbGVjdG9yc1xuICAgIHRoaXMuYXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYXBwXScpIHx8XG4gICAgICBjb25zb2xlV2FybignTWlzc2luZyB2LWFwcCBvciBhIG5vbi1ib2R5IHdyYXBwaW5nIGVsZW1lbnQgd2l0aCB0aGUgW2RhdGEtYXBwXSBhdHRyaWJ1dGUnLCB0aGlzKVxuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBnZW5EZWZhdWx0U2xvdCAoKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFt0aGlzLmdlbkxhYmVsKCldXG4gICAgICBjb25zdCBzbGlkZXIgPSB0aGlzLmdlblNsaWRlcigpXG5cbiAgICAgIHRoaXMuaW52ZXJzZUxhYmVsXG4gICAgICAgID8gY2hpbGRyZW4udW5zaGlmdChzbGlkZXIpXG4gICAgICAgIDogY2hpbGRyZW4ucHVzaChzbGlkZXIpXG5cbiAgICAgIHJldHVybiBjaGlsZHJlblxuICAgIH0sXG4gICAgZ2VuTGlzdGVuZXJzICgpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGJsdXI6IHRoaXMub25CbHVyLFxuICAgICAgICBjbGljazogdGhpcy5vblNsaWRlckNsaWNrLFxuICAgICAgICBmb2N1czogdGhpcy5vbkZvY3VzLFxuICAgICAgICBrZXlkb3duOiB0aGlzLm9uS2V5RG93bixcbiAgICAgICAga2V5dXA6IHRoaXMub25LZXlVcFxuICAgICAgfVxuICAgIH0sXG4gICAgZ2VuSW5wdXQgKCkge1xuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2lucHV0Jywge1xuICAgICAgICBhdHRyczoge1xuICAgICAgICAgICdhcmlhLWxhYmVsJzogdGhpcy5sYWJlbCxcbiAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgcm9sZTogJ3NsaWRlcicsXG4gICAgICAgICAgdGFiaW5kZXg6IHRoaXMuZGlzYWJsZWQgPyAtMSA6IHRoaXMuJGF0dHJzLnRhYmluZGV4LFxuICAgICAgICAgIHZhbHVlOiB0aGlzLmludGVybmFsVmFsdWUsXG4gICAgICAgICAgcmVhZG9ubHk6IHRydWUsXG4gICAgICAgICAgJ2FyaWEtcmVhZG9ubHknOiBTdHJpbmcodGhpcy5yZWFkb25seSlcbiAgICAgICAgfSxcbiAgICAgICAgb246IHRoaXMuZ2VuTGlzdGVuZXJzKCksXG4gICAgICAgIHJlZjogJ2lucHV0J1xuICAgICAgfSlcbiAgICB9LFxuICAgIGdlblNsaWRlciAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2xpZGVyJyxcbiAgICAgICAgJ2NsYXNzJzoge1xuICAgICAgICAgICd2LXNsaWRlci0taXMtYWN0aXZlJzogdGhpcy5pc0FjdGl2ZVxuICAgICAgICB9LFxuICAgICAgICBkaXJlY3RpdmVzOiBbe1xuICAgICAgICAgIG5hbWU6ICdjbGljay1vdXRzaWRlJyxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5vbkJsdXJcbiAgICAgICAgfV1cbiAgICAgIH0sIHRoaXMuZ2VuQ2hpbGRyZW4oKSlcbiAgICB9LFxuICAgIGdlbkNoaWxkcmVuICgpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIHRoaXMuZ2VuSW5wdXQoKSxcbiAgICAgICAgdGhpcy5nZW5UcmFja0NvbnRhaW5lcigpLFxuICAgICAgICB0aGlzLmdlblN0ZXBzKCksXG4gICAgICAgIHRoaXMuZ2VuVGh1bWJDb250YWluZXIoXG4gICAgICAgICAgdGhpcy5pbnRlcm5hbFZhbHVlLFxuICAgICAgICAgIHRoaXMuaW5wdXRXaWR0aCxcbiAgICAgICAgICB0aGlzLmlzRm9jdXNlZCB8fCB0aGlzLmlzQWN0aXZlLFxuICAgICAgICAgIHRoaXMub25UaHVtYk1vdXNlRG93blxuICAgICAgICApXG4gICAgICBdXG4gICAgfSxcbiAgICBnZW5TdGVwcyAoKSB7XG4gICAgICBpZiAoIXRoaXMuc3RlcCB8fCAhdGhpcy5zaG93VGlja3MpIHJldHVybiBudWxsXG5cbiAgICAgIGNvbnN0IHRpY2tzID0gY3JlYXRlUmFuZ2UodGhpcy5udW1UaWNrcyArIDEpLm1hcChpID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXVxuXG4gICAgICAgIGlmICh0aGlzLnRpY2tMYWJlbHNbaV0pIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB0aGlzLnRpY2tMYWJlbHNbaV0pKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ3NwYW4nLCB7XG4gICAgICAgICAga2V5OiBpLFxuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RpY2tzJyxcbiAgICAgICAgICBjbGFzczoge1xuICAgICAgICAgICAgJ3Ytc2xpZGVyX190aWNrcy0tYWx3YXlzLXNob3cnOiB0aGlzLnRpY2tzID09PSAnYWx3YXlzJyB8fFxuICAgICAgICAgICAgICB0aGlzLnRpY2tMYWJlbHMubGVuZ3RoID4gMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIC4uLnRoaXMudGlja1N0eWxlcyxcbiAgICAgICAgICAgIGxlZnQ6IGAke2kgKiAoMTAwIC8gdGhpcy5udW1UaWNrcyl9JWBcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGNoaWxkcmVuKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNsaWRlcl9fdGlja3MtY29udGFpbmVyJ1xuICAgICAgfSwgdGlja3MpXG4gICAgfSxcbiAgICBnZW5UaHVtYiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2xpZGVyX190aHVtYicsXG4gICAgICAgICdjbGFzcyc6IHRoaXMuYWRkQmFja2dyb3VuZENvbG9yQ2xhc3NDaGVja3Moe30sIHRoaXMuY29tcHV0ZWRUaHVtYkNvbG9yKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdlblRodW1iQ29udGFpbmVyICh2YWx1ZSwgdmFsdWVXaWR0aCwgaXNBY3RpdmUsIG9uRHJhZykge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSBbdGhpcy5nZW5UaHVtYigpXVxuXG4gICAgICBjb25zdCB0aHVtYkxhYmVsQ29udGVudCA9IHRoaXMuZ2V0TGFiZWwodmFsdWUpXG4gICAgICB0aGlzLnNob3dUaHVtYkxhYmVsICYmIGNoaWxkcmVuLnB1c2godGhpcy5nZW5UaHVtYkxhYmVsKHRodW1iTGFiZWxDb250ZW50KSlcblxuICAgICAgcmV0dXJuIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNsaWRlcl9fdGh1bWItY29udGFpbmVyJyxcbiAgICAgICAgJ2NsYXNzJzogdGhpcy5hZGRUZXh0Q29sb3JDbGFzc0NoZWNrcyh7XG4gICAgICAgICAgJ3Ytc2xpZGVyX190aHVtYi1jb250YWluZXItLWlzLWFjdGl2ZSc6IGlzQWN0aXZlLFxuICAgICAgICAgICd2LXNsaWRlcl9fdGh1bWItY29udGFpbmVyLS1zaG93LWxhYmVsJzogdGhpcy5zaG93VGh1bWJMYWJlbFxuICAgICAgICB9LCB0aGlzLmNvbXB1dGVkVGh1bWJDb2xvciksXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgdHJhbnNpdGlvbjogdGhpcy50cmFja1RyYW5zaXRpb24sXG4gICAgICAgICAgbGVmdDogYCR7dGhpcy4kdnVldGlmeS5ydGwgPyAxMDAgLSB2YWx1ZVdpZHRoIDogdmFsdWVXaWR0aH0lYFxuICAgICAgICB9LFxuICAgICAgICBvbjoge1xuICAgICAgICAgIHRvdWNoc3RhcnQ6IG9uRHJhZyxcbiAgICAgICAgICBtb3VzZWRvd246IG9uRHJhZ1xuICAgICAgICB9XG4gICAgICB9LCBjaGlsZHJlbilcbiAgICB9LFxuICAgIGdlblRodW1iTGFiZWwgKGNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IHNpemUgPSBjb252ZXJ0VG9Vbml0KHRoaXMudGh1bWJTaXplKVxuXG4gICAgICByZXR1cm4gdGhpcy4kY3JlYXRlRWxlbWVudChWU2NhbGVUcmFuc2l0aW9uLCB7XG4gICAgICAgIHByb3BzOiB7IG9yaWdpbjogJ2JvdHRvbSBjZW50ZXInIH1cbiAgICAgIH0sIFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RodW1iLWxhYmVsX19jb250YWluZXInLFxuICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3Nob3cnLFxuICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5pc0ZvY3VzZWQgfHwgdGhpcy5pc0FjdGl2ZSB8fCB0aGlzLnRodW1iTGFiZWwgPT09ICdhbHdheXMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LCBbXG4gICAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6ICd2LXNsaWRlcl9fdGh1bWItbGFiZWwnLFxuICAgICAgICAgICAgJ2NsYXNzJzogdGhpcy5hZGRCYWNrZ3JvdW5kQ29sb3JDbGFzc0NoZWNrcyh7fSwgdGhpcy5jb21wdXRlZFRodW1iQ29sb3IpLFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgaGVpZ2h0OiBzaXplLFxuICAgICAgICAgICAgICB3aWR0aDogc2l6ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIFtjb250ZW50XSlcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgfSxcbiAgICBnZW5UcmFja0NvbnRhaW5lciAoKSB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IFtcbiAgICAgICAgdGhpcy4kY3JlYXRlRWxlbWVudCgnZGl2Jywge1xuICAgICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RyYWNrJyxcbiAgICAgICAgICAnY2xhc3MnOiB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKHt9LCB0aGlzLmNvbXB1dGVkVHJhY2tDb2xvciksXG4gICAgICAgICAgc3R5bGU6IHRoaXMudHJhY2tTdHlsZXNcbiAgICAgICAgfSksXG4gICAgICAgIHRoaXMuJGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcbiAgICAgICAgICBzdGF0aWNDbGFzczogJ3Ytc2xpZGVyX190cmFjay1maWxsJyxcbiAgICAgICAgICAnY2xhc3MnOiB0aGlzLmFkZEJhY2tncm91bmRDb2xvckNsYXNzQ2hlY2tzKCksXG4gICAgICAgICAgc3R5bGU6IHRoaXMudHJhY2tGaWxsU3R5bGVzXG4gICAgICAgIH0pXG4gICAgICBdXG5cbiAgICAgIHJldHVybiB0aGlzLiRjcmVhdGVFbGVtZW50KCdkaXYnLCB7XG4gICAgICAgIHN0YXRpY0NsYXNzOiAndi1zbGlkZXJfX3RyYWNrX19jb250YWluZXInLFxuICAgICAgICByZWY6ICd0cmFjaydcbiAgICAgIH0sIGNoaWxkcmVuKVxuICAgIH0sXG4gICAgZ2V0TGFiZWwgKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy4kc2NvcGVkU2xvdHNbJ3RodW1iLWxhYmVsJ11cbiAgICAgICAgPyB0aGlzLiRzY29wZWRTbG90c1sndGh1bWItbGFiZWwnXSh7IHZhbHVlIH0pXG4gICAgICAgIDogdGhpcy4kY3JlYXRlRWxlbWVudCgnc3BhbicsIHZhbHVlKVxuICAgIH0sXG4gICAgb25CbHVyIChlKSB7XG4gICAgICBpZiAodGhpcy5rZXlQcmVzc2VkID09PSAyKSByZXR1cm5cblxuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlXG4gICAgICB0aGlzLiRlbWl0KCdibHVyJywgZSlcbiAgICB9LFxuICAgIG9uRm9jdXMgKGUpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZVxuICAgICAgdGhpcy4kZW1pdCgnZm9jdXMnLCBlKVxuICAgIH0sXG4gICAgb25UaHVtYk1vdXNlRG93biAoZSkge1xuICAgICAgdGhpcy5vbGRWYWx1ZSA9IHRoaXMuaW50ZXJuYWxWYWx1ZVxuICAgICAgdGhpcy5rZXlQcmVzc2VkID0gMlxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgcGFzc2l2ZTogdHJ1ZSB9XG4gICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZVxuICAgICAgdGhpcy5pc0ZvY3VzZWQgPSBmYWxzZVxuXG4gICAgICBpZiAoJ3RvdWNoZXMnIGluIGUpIHtcbiAgICAgICAgdGhpcy5hcHAuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSwgb3B0aW9ucylcbiAgICAgICAgYWRkT25jZUV2ZW50TGlzdGVuZXIodGhpcy5hcHAsICd0b3VjaGVuZCcsIHRoaXMub25Nb3VzZVVwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hcHAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSwgb3B0aW9ucylcbiAgICAgICAgYWRkT25jZUV2ZW50TGlzdGVuZXIodGhpcy5hcHAsICdtb3VzZXVwJywgdGhpcy5vbk1vdXNlVXApXG4gICAgICB9XG5cbiAgICAgIHRoaXMuJGVtaXQoJ3N0YXJ0JywgdGhpcy5pbnRlcm5hbFZhbHVlKVxuICAgIH0sXG4gICAgb25Nb3VzZVVwICgpIHtcbiAgICAgIHRoaXMua2V5UHJlc3NlZCA9IDBcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBhc3NpdmU6IHRydWUgfVxuICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlXG4gICAgICB0aGlzLmlzRm9jdXNlZCA9IGZhbHNlXG4gICAgICB0aGlzLmFwcC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uTW91c2VNb3ZlLCBvcHRpb25zKVxuICAgICAgdGhpcy5hcHAucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5vbk1vdXNlTW92ZSwgb3B0aW9ucylcblxuICAgICAgdGhpcy4kZW1pdCgnZW5kJywgdGhpcy5pbnRlcm5hbFZhbHVlKVxuICAgICAgaWYgKCFkZWVwRXF1YWwodGhpcy5vbGRWYWx1ZSwgdGhpcy5pbnRlcm5hbFZhbHVlKSkge1xuICAgICAgICB0aGlzLiRlbWl0KCdjaGFuZ2UnLCB0aGlzLmludGVybmFsVmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICBvbk1vdXNlTW92ZSAoZSkge1xuICAgICAgY29uc3QgeyB2YWx1ZSwgaXNJbnNpZGVUcmFjayB9ID0gdGhpcy5wYXJzZU1vdXNlTW92ZShlKVxuXG4gICAgICBpZiAoaXNJbnNpZGVUcmFjaykge1xuICAgICAgICB0aGlzLnNldEludGVybmFsVmFsdWUodmFsdWUpXG4gICAgICB9XG4gICAgfSxcbiAgICBvbktleURvd24gKGUpIHtcbiAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHJldHVyblxuXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucGFyc2VLZXlEb3duKGUpXG5cbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm5cblxuICAgICAgdGhpcy5zZXRJbnRlcm5hbFZhbHVlKHZhbHVlKVxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdmFsdWUpXG4gICAgfSxcbiAgICBvbktleVVwICgpIHtcbiAgICAgIHRoaXMua2V5UHJlc3NlZCA9IDBcbiAgICB9LFxuICAgIG9uU2xpZGVyQ2xpY2sgKGUpIHtcbiAgICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZVxuICAgICAgdGhpcy5vbk1vdXNlTW92ZShlKVxuICAgICAgdGhpcy4kZW1pdCgnY2hhbmdlJywgdGhpcy5pbnRlcm5hbFZhbHVlKVxuICAgIH0sXG4gICAgcGFyc2VNb3VzZU1vdmUgKGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbGVmdDogb2Zmc2V0TGVmdCxcbiAgICAgICAgd2lkdGg6IHRyYWNrV2lkdGhcbiAgICAgIH0gPSB0aGlzLiRyZWZzLnRyYWNrLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBjb25zdCBjbGllbnRYID0gJ3RvdWNoZXMnIGluIGUgPyBlLnRvdWNoZXNbMF0uY2xpZW50WCA6IGUuY2xpZW50WFxuICAgICAgLy8gSXQgaXMgcG9zc2libGUgZm9yIGxlZnQgdG8gYmUgTmFOLCBmb3JjZSB0byBudW1iZXJcbiAgICAgIGxldCBsZWZ0ID0gTWF0aC5taW4oTWF0aC5tYXgoKGNsaWVudFggLSBvZmZzZXRMZWZ0KSAvIHRyYWNrV2lkdGgsIDApLCAxKSB8fCAwXG5cbiAgICAgIGlmICh0aGlzLiR2dWV0aWZ5LnJ0bCkgbGVmdCA9IDEgLSBsZWZ0XG5cbiAgICAgIGNvbnN0IGlzSW5zaWRlVHJhY2sgPSBjbGllbnRYID49IG9mZnNldExlZnQgLSA4ICYmIGNsaWVudFggPD0gb2Zmc2V0TGVmdCArIHRyYWNrV2lkdGggKyA4XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5taW4pICsgbGVmdCAqICh0aGlzLm1heCAtIHRoaXMubWluKVxuXG4gICAgICByZXR1cm4geyB2YWx1ZSwgaXNJbnNpZGVUcmFjayB9XG4gICAgfSxcbiAgICBwYXJzZUtleURvd24gKGUsIHZhbHVlID0gdGhpcy5pbnRlcm5hbFZhbHVlKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHsgcGFnZXVwLCBwYWdlZG93biwgZW5kLCBob21lLCBsZWZ0LCByaWdodCwgZG93biwgdXAgfSA9IGtleUNvZGVzXG5cbiAgICAgIGlmICghW3BhZ2V1cCwgcGFnZWRvd24sIGVuZCwgaG9tZSwgbGVmdCwgcmlnaHQsIGRvd24sIHVwXS5pbmNsdWRlcyhlLmtleUNvZGUpKSByZXR1cm5cblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCBzdGVwID0gdGhpcy5zdGVwTnVtZXJpYyB8fCAxXG4gICAgICBjb25zdCBzdGVwcyA9ICh0aGlzLm1heCAtIHRoaXMubWluKSAvIHN0ZXBcbiAgICAgIGlmIChbbGVmdCwgcmlnaHQsIGRvd24sIHVwXS5pbmNsdWRlcyhlLmtleUNvZGUpKSB7XG4gICAgICAgIHRoaXMua2V5UHJlc3NlZCArPSAxXG5cbiAgICAgICAgY29uc3QgaW5jcmVhc2UgPSB0aGlzLiR2dWV0aWZ5LnJ0bCA/IFtsZWZ0LCB1cF0gOiBbcmlnaHQsIHVwXVxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBpbmNyZWFzZS5pbmNsdWRlcyhlLmtleUNvZGUpID8gMSA6IC0xXG4gICAgICAgIGNvbnN0IG11bHRpcGxpZXIgPSBlLnNoaWZ0S2V5ID8gMyA6IChlLmN0cmxLZXkgPyAyIDogMSlcblxuICAgICAgICB2YWx1ZSA9IHZhbHVlICsgKGRpcmVjdGlvbiAqIHN0ZXAgKiBtdWx0aXBsaWVyKVxuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IGhvbWUpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHRoaXMubWluKVxuICAgICAgfSBlbHNlIGlmIChlLmtleUNvZGUgPT09IGVuZCkge1xuICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodGhpcy5tYXgpXG4gICAgICB9IGVsc2UgLyogaWYgKGUua2V5Q29kZSA9PT0ga2V5Q29kZXMucGFnZXVwIHx8IGUua2V5Q29kZSA9PT0gcGFnZWRvd24pICovIHtcbiAgICAgICAgLy8gUGFnZSB1cC9kb3duXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGUua2V5Q29kZSA9PT0gcGFnZWRvd24gPyAxIDogLTFcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSAtIChkaXJlY3Rpb24gKiBzdGVwICogKHN0ZXBzID4gMTAwID8gc3RlcHMgLyAxMCA6IDEwKSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfSxcbiAgICByb3VuZFZhbHVlICh2YWx1ZSkge1xuICAgICAgaWYgKCF0aGlzLnN0ZXBOdW1lcmljKSByZXR1cm4gdmFsdWVcbiAgICAgIC8vIEZvcm1hdCBpbnB1dCB2YWx1ZSB1c2luZyB0aGUgc2FtZSBudW1iZXJcbiAgICAgIC8vIG9mIGRlY2ltYWxzIHBsYWNlcyBhcyBpbiB0aGUgc3RlcCBwcm9wXG4gICAgICBjb25zdCB0cmltbWVkU3RlcCA9IHRoaXMuc3RlcC50b1N0cmluZygpLnRyaW0oKVxuICAgICAgY29uc3QgZGVjaW1hbHMgPSB0cmltbWVkU3RlcC5pbmRleE9mKCcuJykgPiAtMVxuICAgICAgICA/ICh0cmltbWVkU3RlcC5sZW5ndGggLSB0cmltbWVkU3RlcC5pbmRleE9mKCcuJykgLSAxKVxuICAgICAgICA6IDBcbiAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMubWluICUgdGhpcy5zdGVwTnVtZXJpY1xuXG4gICAgICBjb25zdCBuZXdWYWx1ZSA9IE1hdGgucm91bmQoKHZhbHVlIC0gb2Zmc2V0KSAvIHRoaXMuc3RlcE51bWVyaWMpICogdGhpcy5zdGVwTnVtZXJpYyArIG9mZnNldFxuXG4gICAgICByZXR1cm4gcGFyc2VGbG9hdChNYXRoLm1pbihuZXdWYWx1ZSwgdGhpcy5tYXgpLnRvRml4ZWQoZGVjaW1hbHMpKVxuICAgIH0sXG4gICAgc2V0SW50ZXJuYWxWYWx1ZSAodmFsdWUpIHtcbiAgICAgIHRoaXMuaW50ZXJuYWxWYWx1ZSA9IHZhbHVlXG4gICAgfVxuICB9XG59XG4iXX0=