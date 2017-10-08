require('../../stylus/components/_sliders.styl')

import { addOnceEventListener, createRange } from '../../util/helpers'

import Input from '../../mixins/input'

import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-slider',

  mixins: [Input],

  directives: { ClickOutside },

  data () {
    return {
      app: {},
      isActive: false,
      keyPressed: 0
    }
  },

  props: {
    color: {
      type: String,
      default: null
    },
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
      default: null
    },
    thumbColor: {
      type: String,
      default: null
    },
    thumbLabel: Boolean,
    value: [Number, String],
    snap: Boolean,
    trackColor: {
      type: String,
      default: null
    }
  },

  computed: {
    classes () {
      return {
        'input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputWidth > 0,
        'input-group--disabled': this.disabled,
        'input-group--ticks': !this.disabled && this.step
      }
    },
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        const { min, max, step, snap } = this
        val = val < min && min || val > max && max || val

        // Round value to ensure the
        // entire slider range can
        // be selected with step
        const value = snap ? Math.round(val / step) * step : Math.round(val)
        this.lazyValue = value

        if (value !== this.value) {
          this.$emit('input', value)
        }
      }
    },
    interval () {
      return 100 / (this.max - this.min) * this.step
    },
    thumbContainerClasses () {
      return {
        'slider__thumb-container': true,
        'slider__thumb-container--label': this.thumbLabel
      }
    },
    thumbStyles () {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: `${this.inputWidth}%`
      }
    },
    tickContainerStyles () {
      return {
        transform: `translate3d(0, -50%, 0)`
      }
    },
    trackStyles () {
      const scaleX = this.calculateScale(1 - (this.inputWidth / 100))
      const offsetX = this.thumbLabel ? 0 : !this.isActive ? 8 : 12
      const translateX = `${offsetX}px`
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        transform: `scaleX(${scaleX}) translateX(${translateX})`
      }
    },
    trackFillStyles () {
      const inputWidth = this.inputWidth
      const scaleX = this.calculateScale(inputWidth / 100)
      const translateX = inputWidth > 99 && !this.thumbLabel ? `${-8}px` : 0
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        transform: `scaleX(${scaleX}) translateX(${translateX})`
      }
    },
    numTicks () {
      return parseInt((this.max - this.min) / this.step)
    },
    inputWidth () {
      let val = this.inputValue
      if (this.snap) {
        val = Math.round(val / this.step) * this.step
      }

      val = (val - this.min) / (this.max - this.min) * 100

      return val < 0.15 ? 0 : val
    }
  },

  watch: {
    isActive (val) {
      this.isFocused = val
    },
    min (val) {
      val > this.inputValue && this.$emit('input', val)
    },
    max (val) {
      val < this.inputValue && this.$emit('input', val)
    },
    value (val) {
      this.inputValue = val
    }
  },

  mounted () {
    this.inputValue = this.value

    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') ||
      console.warn('The v-slider component requires the presence of v-app or a non-body wrapping element with the [data-app] attribute.')
  },

  methods: {
    calculateScale (scale) {
      return this.disabled ? scale - 0.015 : scale
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
      const left = (
        ((clientX - offsetLeft) / trackWidth) * 100
      )

      if (left >= 0 && left <= 100) {
        this.inputValue = parseInt(this.min, 10) + ((left / 100) * (this.max - this.min))
      }
    },
    onKeyDown (e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        this.keyPressed += 1

        const direction = e.keyCode === 37 && -1 || e.keyCode === 39 && 1 || 0
        const multiplier = e.shiftKey && 3 || e.ctrlKey && 2 || 1
        const amount = this.snap && this.step || 1

        this.inputValue = this.inputValue + (direction * amount * multiplier)
      }
    },
    onKeyUp (e) {
      this.keyPressed = 0
    },
    sliderMove (e) {
      if (!this.isActive) {
        this.onMouseMove(e)
      }
    },
    genThumbLabel (h) {
      return h('v-scale-transition', {
        props: { origin: 'bottom center' }
      }, [
        h('div', {
          'class': 'slider__thumb--label__container',
          directives: [
            {
              name: 'show',
              value: this.isActive
            }
          ]
        }, [
          h('div', { 'class': ['slider__thumb--label', this.thumbColor || this.color] }, [
            h('span', {}, parseInt(this.inputValue))
          ])
        ])
      ])
    },
    genThumbContainer (h) {
      const children = []
      children.push(h('div', { 'class': ['slider__thumb', this.thumbColor || this.color] }))

      this.thumbLabel && children.push(this.genThumbLabel(h))

      return h('div', {
        'class': this.thumbContainerClasses,
        style: this.thumbStyles,
        on: {
          touchstart: this.onMouseDown,
          mousedown: this.onMouseDown
        },
        ref: 'thumb'
      }, children)
    },
    genSteps (h) {
      const ticks = createRange(this.numTicks + 1).map((i) => {
        const span = h('span', {
          class: 'slider__tick',
          style: {
            left: `${i * (100 / this.numTicks)}%`
          }
        })

        return span
      })

      return h('div', {
        'class': 'slider__ticks-container',
        style: this.tickContainerStyles
      }, ticks)
    },
    genTrackContainer (h) {
      const children = [
        h('div', {
          'class': ['slider__track', this.trackColor],
          style: this.trackStyles
        }),
        h('div', {
          'class': ['slider__track-fill', this.color],
          style: this.trackFillStyles
        })
      ]

      return h('div', {
        'class': 'slider__track__container',
        ref: 'track'
      }, children)
    }
  },

  render (h) {
    const children = []

    children.push(this.genTrackContainer(h))
    this.step && children.push(this.genSteps(h))
    children.push(this.genThumbContainer(h))

    const slider = h('div', { 'class': 'slider' }, children)

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.tabindex
      },
      on: Object.assign({}, {
        mouseup: this.sliderMove,
        keydown: this.onKeyDown,
        keyup: this.onKeyUp
      }, this.$listeners),
      directives: [{
        name: 'click-outside'
      }]
    })
  }
}
