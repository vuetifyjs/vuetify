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
import { addOnceEventListener, createRange, keyCodes, deepEqual } from '../../util/helpers'
import { consoleWarn } from '../../util/console'

export default {
  name: 'v-slider',

  extends: VInput,

  directives: { ClickOutside },

  data: vm => ({
    activeThumb: 0,
    app: {},
    defaultColor: 'primary',
    isActive: false,
    keyPressed: 0,
    lazyValue: typeof vm.value !== 'undefined' && (Array.isArray(vm.value) ? vm.value : [vm.value]) || (vm.range ? [0, 0] : [0])
  }),

  props: {
    label: String,
    inverseLabel: Boolean,
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
    value: [Array, Number, String]
  },

  computed: {
    classes () {
      return {
        'v-input--slider': true,
        'v-input--slider--ticks': !this.disabled &&
          this.stepNumeric && this.ticks,
        'v-input--slider--inverse-label': this.inverseLabel
      }
    },
    computedColor () {
      if (this.disabled) return null
      return this.validationState || this.color || this.defaultColor
    },
    computedTrackColor () {
      return this.disabled ? null : (this.trackColor || null)
    },
    computedThumbColor () {
      if (this.disabled || !this.isDirty) return null
      return this.validationState || this.thumbColor || this.color || this.defaultColor
    },
    inputValue: {
      get () {
        return this.lazyValue
      },
      set (val) {
        const { min, max } = this

        // Round value to ensure the
        // entire slider range can
        // be selected with step
        let value = val.map(v => this.roundValue(Math.min(Math.max(v, min), max)))

        // Switch values if range and wrong order
        if (this.range && (value[0] > value[1] || value[1] < value[0])) {
          if (this.activeThumb !== null) this.activeThumb = this.activeThumb === 1 ? 0 : 1
          value = [value[1], value[0]]
        }

        this.lazyValue = value

        if (!deepEqual(value, this.value)) this.$emit('input', this.range ? value : value[0])
        this.validate()
      }
    },
    stepNumeric () {
      return this.step > 0 ? parseFloat(this.step) : 1
    },
    trackPadding () {
      if (this.thumbLabel || this.isActive) return 0

      return 6 + (this.isActive && !this.disabled ? 3 : 0)
    },
    trackStyles () {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        [this.$vuetify.rtl ? 'right' : 'left']: `calc(${this.inputWidth}% + ${this.trackPadding}px)`,
        width: `calc(${100 - this.inputWidth}% - ${this.trackPadding}px)`
      }
    },
    trackFillStyles () {
      const width = this.range ? Math.abs(this.inputWidth[0] - this.inputWidth[1]) : this.inputWidth[0]
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        width: `calc(${width}% - ${this.trackPadding}px)`,
        [this.$vuetify.rtl ? 'right' : 'left']: this.range ? `${this.inputWidth[0]}%` : 0
      }
    },
    numTicks () {
      return Math.ceil((this.max - this.min) / this.stepNumeric)
    },
    inputWidth () {
      return this.inputValue.map(v => (this.roundValue(v) - this.min) / (this.max - this.min) * 100)
    },
    isDirty () {
      return this.inputValue.some(v => v !== this.min)
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
      this.inputValue = Array.isArray(val) ? val : [parseFloat(val)]
    }
  },

  mounted () {
    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') ||
      consoleWarn('Missing v-app or a non-body wrapping element with the [data-app] attribute', this)
  },

  methods: {
    createThumbStyles (i) {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: `${this.$vuetify.rtl ? 100 - this.inputWidth[i] : this.inputWidth[i]}%`
      }
    },
    genDefaultSlot () {
      const children = [this.genLabel()]
      const slider = this.genSlider()

      this.inverseLabel
        ? children.unshift(slider)
        : children.push(slider)

      return children
    },
    genLabel () {
      if (!this.label) return null

      const data = {
        props: {
          color: this.validationState,
          focused: !!this.validationState
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
          click: this.onSliderMove,
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
        ...this.genThumbs()
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
    genThumbs () {
      const thumbs = createRange(this.range ? 2 : 1)

      return thumbs.map(i => this.genThumbContainer(i))
    },
    genThumbContainer (i) {
      const children = []
      children.push(this.$createElement('div', {
        staticClass: 'v-slider__thumb',
        'class': {
          ...this.addBackgroundColorClassChecks({}, this.computedThumbColor),
          'v-slider__thumb--is-active': this.activeThumb === i
        }
      }))

      this.thumbLabel && children.push(this.genThumbLabel())

      const drag = e => this.onMouseDown(e, i)

      return this.$createElement('div', {
        staticClass: 'v-slider__thumb-container',
        'class': {
          'v-slider__thumb-container-label': this.thumbLabel
        },
        style: this.createThumbStyles(i),
        on: {
          touchstart: drag,
          mousedown: drag
        }
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
    getIndexOfClosestValue (arr, v) {
      return arr.indexOf(arr.reduce((prev, curr) => {
        return Math.abs((curr / 100) - v) < Math.abs((prev / 100) - v) ? curr : prev
      }))
    },
    onMouseDown (e, i) {
      this.keyPressed = 2
      const options = { passive: true }
      this.isActive = true
      this.activeThumb = i

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, options)
        addOnceEventListener(this.app, 'touchend', this.onMouseUp)
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, options)
        addOnceEventListener(this.app, 'mouseup', this.onMouseUp)
      }

      this.$emit('start', this.inputValue)
    },
    onMouseUp () {
      this.keyPressed = 0
      const options = { passive: true }
      this.isActive = false
      this.app.removeEventListener('touchmove', this.onMouseMove, options)
      this.app.removeEventListener('mousemove', this.onMouseMove, options)

      this.$emit('end', this.inputValue)
    },
    onMouseMove (e, isTrackClick = false) {
      const {
        left: offsetLeft,
        width: trackWidth
      } = this.$refs.track.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      let left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1)
      if (this.$vuetify.rtl) left = 1 - left
      if (clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8) {
        if (isTrackClick) this.activeThumb = this.getIndexOfClosestValue(this.inputWidth, left)

        this.inputValue = this.inputValue.map((v, i) => {
          if (i === this.activeThumb) return parseFloat(this.min) + left * (this.max - this.min)
          else return v
        })
      }
    },
    onKeyDown (e) {
      const { pageup, pagedown, end, home, left, right, down, up } = keyCodes
      if (this.disabled || ![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return

      e.preventDefault()
      const step = this.stepNumeric
      const steps = (this.max - this.min) / step
      let value = this.range ? this.inputValue[this.activeThumb] : this.inputValue[0]
      if (e.keyCode === left || e.keyCode === right || e.keyCode === down || e.keyCode === up) {
        this.keyPressed += 1

        const increase = this.$vuetify.rtl ? [left, up] : [right, up]
        let direction = increase.includes(e.keyCode) ? 1 : -1
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

      this.inputValue = this.inputValue.map((v, i) => {
        if (i === this.activeThumb) return value
        else return v
      })
      this.$emit('change', this.inputValue)
    },
    onKeyUp () {
      this.keyPressed = 0
    },
    onSliderMove (e) {
      if (!this.isActive) {
        this.onMouseMove(e, true)
        this.$emit('change', this.inputValue)
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
