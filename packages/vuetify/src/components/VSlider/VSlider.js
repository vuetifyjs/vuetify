// Styles
import '../../stylus/components/_sliders.styl'

// Components
import { VScaleTransition } from '../transitions'

// Extensions
import VInput from '../VInput'

// Directives
import ClickOutside from '../../directives/click-outside'

// Utilities
import {
  addOnceEventListener,
  convertToUnit,
  createRange,
  keyCodes,
  deepEqual
} from '../../util/helpers'
import { consoleWarn } from '../../util/console'
import Loadable from '../../mixins/loadable'

/* @vue/component */
export default VInput.extend({
  name: 'v-slider',

  directives: { ClickOutside },

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
    classes () {
      return {
        'v-input--slider': true,
        'v-input--slider--ticks': this.showTicks,
        'v-input--slider--inverse-label': this.inverseLabel,
        'v-input--slider--ticks-labels': this.tickLabels.length > 0,
        'v-input--slider--thumb-label': this.thumbLabel ||
          this.$scopedSlots.thumbLabel
      }
    },
    showTicks () {
      return this.tickLabels.length > 0 ||
        (!this.disabled && this.stepNumeric && !!this.ticks)
    },
    showThumbLabel () {
      return !this.disabled && (
        !!this.thumbLabel ||
        this.thumbLabel === '' ||
        this.$scopedSlots['thumb-label']
      )
    },
    computedColor () {
      if (this.disabled) return null
      return this.validationState || this.color || 'primary'
    },
    computedTrackColor () {
      return this.disabled ? null : (this.trackColor || null)
    },
    computedThumbColor () {
      if (this.disabled || !this.isDirty) return null
      return this.validationState || this.thumbColor || this.color || 'primary'
    },
    internalValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        const { min, max } = this

        // Round value to ensure the
        // entire slider range can
        // be selected with step
        const value = this.roundValue(Math.min(Math.max(val, min), max))

        if (value === this.lazyValue) return

        this.lazyValue = value

        this.$emit('input', value)
        this.validate()
      }
    },
    stepNumeric () {
      return this.step > 0 ? parseFloat(this.step) : 0
    },
    trackFillStyles () {
      const left = this.$vuetify.rtl ? 'auto' : 0
      const right = this.$vuetify.rtl ? 0 : 'auto'
      let width = `${this.inputWidth}%`

      if (this.disabled) width = `calc(${this.inputWidth}% - 8px)`

      return {
        transition: this.trackTransition,
        left,
        right,
        width
      }
    },
    trackPadding () {
      return (
        this.isActive ||
        this.inputWidth > 0 ||
        this.disabled
      ) ? 0 : 7
    },
    trackStyles () {
      const trackPadding = this.disabled ? `calc(${this.inputWidth}% + 8px)` : `${this.trackPadding}px`
      const left = this.$vuetify.rtl ? 'auto' : trackPadding
      const right = this.$vuetify.rtl ? trackPadding : 'auto'
      const width = this.disabled
        ? `calc(${100 - this.inputWidth}% - 8px)`
        : '100%'

      return {
        transition: this.trackTransition,
        left,
        right,
        width
      }
    },
    tickStyles () {
      const size = Number(this.tickSize)

      return {
        'border-width': `${size}px`,
        'border-radius': size > 1 ? '50%' : null,
        transform: size > 1 ? `translateX(-${size}px) translateY(-${size - 1}px)` : null
      }
    },
    trackTransition () {
      return this.keyPressed >= 2 ? 'none' : ''
    },
    numTicks () {
      return Math.ceil((this.max - this.min) / this.stepNumeric)
    },
    inputWidth () {
      return (this.roundValue(this.internalValue) - this.min) / (this.max - this.min) * 100
    },
    isDirty () {
      return this.internalValue > this.min ||
        this.alwaysDirty
    }
  },

  watch: {
    min (val) {
      val > this.internalValue && this.$emit('input', parseFloat(val))
    },
    max (val) {
      val < this.internalValue && this.$emit('input', parseFloat(val))
    },
    value (val) {
      this.internalValue = val
    }
  },

  mounted () {
    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') ||
      consoleWarn('Missing v-app or a non-body wrapping element with the [data-app] attribute', this)
  },

  methods: {
    genDefaultSlot () {
      const children = [this.genLabel()]
      const slider = this.genSlider()
      this.inverseLabel
        ? children.unshift(slider)
        : children.push(slider)

      children.push(this.genProgress())

      return children
    },
    genListeners () {
      return {
        blur: this.onBlur,
        click: this.onSliderClick,
        focus: this.onFocus,
        keydown: this.onKeyDown,
        keyup: this.onKeyUp
      }
    },
    genInput () {
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
      })
    },
    genSlider () {
      return this.$createElement('div', {
        staticClass: 'v-slider',
        'class': {
          'v-slider--is-active': this.isActive
        },
        directives: [{
          name: 'click-outside',
          value: this.onBlur
        }]
      }, this.genChildren())
    },
    genChildren () {
      return [
        this.genInput(),
        this.genTrackContainer(),
        this.genSteps(),
        this.genThumbContainer(
          this.internalValue,
          this.inputWidth,
          this.isFocused || this.isActive,
          this.onThumbMouseDown
        )
      ]
    },
    genSteps () {
      if (!this.step || !this.showTicks) return null

      const ticks = createRange(this.numTicks + 1).map(i => {
        const children = []

        if (this.tickLabels[i]) {
          children.push(this.$createElement('span', this.tickLabels[i]))
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
        }, children)
      })

      return this.$createElement('div', {
        staticClass: 'v-slider__ticks-container'
      }, ticks)
    },
    genThumb () {
      return this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
        staticClass: 'v-slider__thumb'
      }))
    },
    genThumbContainer (value, valueWidth, isActive, onDrag) {
      const children = [this.genThumb()]

      const thumbLabelContent = this.getLabel(value)
      this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent))

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
      }), children)
    },
    genThumbLabel (content) {
      const size = convertToUnit(this.thumbSize)

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
      ])
    },
    genTrackContainer () {
      const children = [
        this.$createElement('div', this.setBackgroundColor(this.computedTrackColor, {
          staticClass: 'v-slider__track',
          style: this.trackStyles
        })),
        this.$createElement('div', this.setBackgroundColor(this.computedColor, {
          staticClass: 'v-slider__track-fill',
          style: this.trackFillStyles
        }))
      ]

      return this.$createElement('div', {
        staticClass: 'v-slider__track__container',
        ref: 'track'
      }, children)
    },
    getLabel (value) {
      return this.$scopedSlots['thumb-label']
        ? this.$scopedSlots['thumb-label']({ value })
        : this.$createElement('span', value)
    },
    onBlur (e) {
      if (this.keyPressed === 2) return

      this.isActive = false
      this.isFocused = false
      this.$emit('blur', e)
    },
    onFocus (e) {
      this.isFocused = true
      this.$emit('focus', e)
    },
    onThumbMouseDown (e) {
      this.oldValue = this.internalValue
      this.keyPressed = 2
      const options = { passive: true }
      this.isActive = true
      this.isFocused = false

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, options)
        addOnceEventListener(this.app, 'touchend', this.onSliderMouseUp)
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, options)
        addOnceEventListener(this.app, 'mouseup', this.onSliderMouseUp)
      }

      this.$emit('start', this.internalValue)
    },
    onSliderMouseUp () {
      this.keyPressed = 0
      const options = { passive: true }
      this.isActive = false
      this.isFocused = false
      this.app.removeEventListener('touchmove', this.onMouseMove, options)
      this.app.removeEventListener('mousemove', this.onMouseMove, options)

      this.$emit('end', this.internalValue)
      if (!deepEqual(this.oldValue, this.internalValue)) {
        this.$emit('change', this.internalValue)
      }
    },
    onMouseMove (e) {
      const { value, isInsideTrack } = this.parseMouseMove(e)

      if (isInsideTrack) {
        this.setInternalValue(value)
      }
    },
    onKeyDown (e) {
      if (this.disabled || this.readonly) return

      const value = this.parseKeyDown(e)

      if (value == null) return

      this.setInternalValue(value)
      this.$emit('change', value)
    },
    onKeyUp () {
      this.keyPressed = 0
    },
    onSliderClick (e) {
      this.isFocused = true
      this.onMouseMove(e)
      this.$emit('change', this.internalValue)
    },
    parseMouseMove (e) {
      const {
        left: offsetLeft,
        width: trackWidth
      } = this.$refs.track.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      // It is possible for left to be NaN, force to number
      let left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1) || 0

      if (this.$vuetify.rtl) left = 1 - left

      const isInsideTrack = clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8
      const value = parseFloat(this.min) + left * (this.max - this.min)

      return { value, isInsideTrack }
    },
    parseKeyDown (e, value = this.internalValue) {
      if (this.disabled) return

      const { pageup, pagedown, end, home, left, right, down, up } = keyCodes

      if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return

      e.preventDefault()
      const step = this.stepNumeric || 1
      const steps = (this.max - this.min) / step
      if ([left, right, down, up].includes(e.keyCode)) {
        this.keyPressed += 1

        const increase = this.$vuetify.rtl ? [left, up] : [right, up]
        const direction = increase.includes(e.keyCode) ? 1 : -1
        const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1)

        value = value + (direction * step * multiplier)
      } else if (e.keyCode === home) {
        value = parseFloat(this.min)
      } else if (e.keyCode === end) {
        value = parseFloat(this.max)
      } else /* if (e.keyCode === keyCodes.pageup || e.keyCode === pagedown) */ {
        // Page up/down
        const direction = e.keyCode === pagedown ? 1 : -1
        value = value - (direction * step * (steps > 100 ? steps / 10 : 10))
      }

      return value
    },
    roundValue (value) {
      if (!this.stepNumeric) return value
      // Format input value using the same number
      // of decimals places as in the step prop
      const trimmedStep = this.step.toString().trim()
      const decimals = trimmedStep.indexOf('.') > -1
        ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
        : 0
      const offset = this.min % this.stepNumeric

      const newValue = Math.round((value - offset) / this.stepNumeric) * this.stepNumeric + offset

      return parseFloat(Math.max(Math.min(newValue, this.max), this.min).toFixed(decimals))
    },
    setInternalValue (value) {
      this.internalValue = value
    }
  }
})
