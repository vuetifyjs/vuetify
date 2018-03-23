// Styles
import '../../stylus/components/_sliders.styl'

// Components
import VLabel from '../VLabel'
import { VScaleTransition } from '../transitions'

// Extensions
import VInput from '../VInput'

// Directives
import ClickOutside from '../../directives/click-outside'

// Utilities
import { addOnceEventListener, createRange } from '../../util/helpers'
import { consoleWarn } from '../../util/console'

export default {
  name: 'v-slider',

  extends: VInput,

  directives: { ClickOutside },

  data: vm => ({
    app: {},
    defaultColor: 'primary',
    isActive: false,
    keyPressed: 0,
    lazyValue: vm.value || 0
  }),

  props: {
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
    ticks: Boolean,
    thumbColor: {
      type: String,
      default: null
    },
    thumbLabel: Boolean,
    trackColor: {
      type: String,
      default: null
    },
    value: [Number, String]
  },

  computed: {
    classes () {
      return {
        'v-input--slider': true,
        'v-input--slider--ticks': !this.disabled &&
          this.stepNumeric && this.ticks
      }
    },
    computedColor () {
      return this.disabled ? null : (this.color || this.defaultColor)
    },
    computedTrackColor () {
      return this.disabled ? null : (this.trackColor || null)
    },
    computedThumbColor () {
      return (this.disabled || !this.inputWidth) ? null : (this.thumbColor || this.color || this.defaultColor)
    },
    stepNumeric () {
      return this.step > 0 ? parseFloat(this.step) : 1
    },
    inputValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        const { min, max } = this
        val = Math.min(Math.max(val, min), max)

        // Round value to ensure the
        // entire slider range can
        // be selected with step
        const value = this.roundValue(val)
        this.lazyValue = value

        this.$emit('input', value)
      }
    },
    thumbStyles () {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: `${this.inputWidth}%`
      }
    },
    trackPadding () {
      if (this.thumbLabel && this.isActive) return 0

      return 6 + (this.isActive && !this.disabled ? 3 : 0)
    },
    trackStyles () {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: `calc(${this.inputWidth}% + ${this.trackPadding}px)`,
        width: `calc(${100 - this.inputWidth}% - ${this.trackPadding}px)`
      }
    },
    trackFillStyles () {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        width: `calc(${this.inputWidth}% - ${this.trackPadding}px)`
      }
    },
    numTicks () {
      return Math.ceil((this.max - this.min) / this.stepNumeric)
    },
    inputWidth () {
      return (this.roundValue(this.inputValue) - this.min) / (this.max - this.min) * 100
    }
  },

  watch: {
    isActive (val) {
      this.isFocused = val
    },
    min (val) {
      val > this.inputValue && this.$emit('input', parseFloat(val))
    },
    max (val) {
      val < this.inputValue && this.$emit('input', parseFloat(val))
    },
    value (val) {
      this.inputValue = parseFloat(val)
    }
  },

  mounted () {
    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') ||
      consoleWarn('Missing v-app or a non-body wrapping element with the [data-app] attribute', this)
  },

  methods: {
    genDefaultSlot () {
      return [
        this.genLabel(),
        this.genSlider()
      ]
    },
    genLabel () {
      if (!this.label) return null

      const data = {
        props: {
          color: this.validationState
        }
      }

      if (this.$attrs.id) data.props.for = this.$attrs.id

      return this.$createElement(VLabel, data, this.$slots.label || this.label)
    },
    genInput () {
      return null
    },
    genSlider () {
      return this.$createElement('div', {
        staticClass: 'v-slider',
        attrs: {
          role: 'slider',
          tabindex: this.disabled ? -1 : this.tabindex
        },
        on: Object.assign({}, {
          mouseup: this.onSliderMove,
          keydown: this.onKeyDown,
          keyup: this.onKeyUp
        }, this.$listeners),
        directives: [{
          name: 'click-outside',
          value: () => (this.isActive = false)
        }]
      }, [
        this.genInput(),
        this.genTrackContainer(),
        this.genSteps(),
        this.genThumbContainer()
      ])
    },
    genSteps () {
      if (!this.step || !this.ticks) return null

      const ticks = createRange(this.numTicks + 1).map(i => {
        const span = this.$createElement('span', {
          key: i,
          staticClass: 'v-slider__tick',
          style: {
            left: `${i * (100 / this.numTicks)}%`
          }
        })

        return span
      })

      return this.$createElement('div', {
        staticClass: 'v-slider__ticks-container'
      }, ticks)
    },
    genThumbContainer () {
      const children = []
      children.push(this.$createElement('div', {
        staticClass: 'v-slider__thumb',
        'class': this.addBackgroundColorClassChecks({}, this.computedThumbColor)
      }))

      this.thumbLabel && children.push(this.genThumbLabel())

      return this.$createElement('div', {
        staticClass: 'v-slider__thumb-container',
        'class': {
          'v-slider__thumb-container-label': this.thumbLabel
        },
        style: this.thumbStyles,
        on: {
          touchstart: this.onMouseDown,
          mousedown: this.onMouseDown
        },
        ref: 'thumb'
      }, children)
    },
    genThumbLabel () {
      return this.$createElement(VScaleTransition, {
        props: { origin: 'bottom center' }
      }, [
        this.$createElement('div', {
          staticClass: 'v-slider__thumb-label__container',
          directives: [
            {
              name: 'show',
              value: this.isActive
            }
          ]
        }, [
          this.$createElement('div', {
            staticClass: 'v-slider__thumb-label',
            'class': this.addBackgroundColorClassChecks({}, this.computedThumbColor)
          }, [
            this.$createElement('span', {}, this.inputValue)
          ])
        ])
      ])
    },
    genTrackContainer () {
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
      ]

      return this.$createElement('div', {
        staticClass: 'v-slider__track__container', ref: 'track'
      }, children)
    },
    onMouseDown (e) {
      this.keyPressed = 2
      const options = { passive: true }
      this.isActive = true

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, options)
        addOnceEventListener(this.app, 'touchend', this.onMouseUp)
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, options)
        addOnceEventListener(this.app, 'mouseup', this.onMouseUp)
      }
    },
    onMouseUp () {
      this.keyPressed = 0
      const options = { passive: true }
      this.isActive = false
      this.app.removeEventListener('touchmove', this.onMouseMove, options)
      this.app.removeEventListener('mousemove', this.onMouseMove, options)
    },
    onMouseMove (e) {
      const {
        left: offsetLeft,
        width: trackWidth
      } = this.$refs.track.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1)
      if (clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8) {
        const inputValue = parseFloat(this.min) + left * (this.max - this.min)
        this.inputValue = inputValue
      }
    },
    onKeyDown (e) {
      if (this.disabled || ![33, 34, 35, 36, 37, 39].includes(e.keyCode)) return

      e.preventDefault()
      const step = this.stepNumeric
      const steps = (this.max - this.min) / step
      if (e.keyCode === 37 || e.keyCode === 39) {
        // Left/right
        this.keyPressed += 1

        const direction = e.keyCode === 37 ? -1 : 1
        const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1)

        this.inputValue = this.inputValue + (direction * step * multiplier)
      } else if (e.keyCode === 36) {
        // Home
        this.inputValue = parseFloat(this.min)
      } else if (e.keyCode === 35) {
        // End
        this.inputValue = parseFloat(this.max)
      } else /* if (e.keyCode === 33 || e.keyCode === 34) */ {
        // Page up/down
        const direction = e.keyCode === 34 ? 1 : -1
        this.inputValue = this.inputValue - (direction * step * (steps > 100 ? steps / 10 : 10))
      }
    },
    onKeyUp () {
      this.keyPressed = 0
    },
    onSliderMove (e) {
      if (!this.isActive) {
        this.onMouseMove(e)
      }
    },
    roundValue (value) {
      // Format input value using the same number
      // of decimals places as in the step prop
      const trimmedStep = this.step.toString().trim()
      const decimals = trimmedStep.indexOf('.') > -1
        ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
        : 0

      const newValue = 1 * Math.round(value / this.stepNumeric) * this.stepNumeric

      return parseFloat(Math.min(newValue, this.max).toFixed(decimals))
    }
  }
}
