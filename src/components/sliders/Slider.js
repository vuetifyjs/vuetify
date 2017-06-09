import Input from '../../mixins/input'
import { addOnceEventListener } from '../../util/helpers'

export default {
  name: 'slider',

  mixins: [Input],

  data () {
    return {
      app: {},
      isActive: false,
      inputWidth: 0
    }
  },

  props: {
    inverted: Boolean,
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
    thumbLabel: Boolean,
    value: [Number, String],
    vertical: Boolean
  },

  computed: {
    classes () {
      return {
        'input-group input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputValue > this.min,
        'input-group--disabled': this.disabled,
        'input-group--ticks': this.thumbLabel
      }
    },
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        val = val < this.min ? this.min : val > this.max ? this.max : val
        if (Math.ceil(val) !== Math.ceil(this.lazyValue)) {
          this.inputWidth = this.calculateWidth(val)
        }

        const value = parseInt(val)
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
        left: `${this.inputWidth}%`
      }
    },
    tickContainerStyles () {
      return {
        transform: `translate3d(-${this.interval}%, -50%, 0)`
      }
    },
    tickStyles () {
      return {
        backgroundSize: `${this.interval}% 2px`,
        transform: `translate3d(${this.interval}%, 0, 0)`
      }
    },
    trackStyles () {
      const scaleX = this.calculateScale(1 - (this.inputWidth / 100))
      const translateX = this.inputWidth < 1 && !this.thumbLabel ? `${8}px` : 0
      return {
        transform: `scaleX(${scaleX}) translateX(${translateX})`
      }
    },
    trackFillStyles () {
      const scaleX = this.calculateScale(this.inputWidth / 100)
      const translateX = this.inputWidth > 99 && !this.thumbLabel ? `${-8}px` : 0
      return {
        transform: `scaleX(${scaleX}) translateX(${translateX})`
      }
    }
  },

  watch: {
    value () {
      this.inputValue = this.value
    }
  },

  mounted () {
    this.inputValue = this.value
    this.inputWidth = this.calculateWidth(this.inputValue)
    this.app = document.querySelector('[data-app]')
  },

  methods: {
    calculateWidth (val) {
      return (val - this.min) / (this.max - this.min) * 100
    },
    calculateScale (scale) {
      if (scale < 0.02 && !this.thumbLabel) {
        return 0
      }

      return this.disabled ? scale - 0.015 : scale
    },
    onMouseDown (e) {
      this.isActive = true

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, false)
        addOnceEventListener(this.app, 'touchend', this.onMouseUp)
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, false)
        addOnceEventListener(this.app, 'mouseup', this.onMouseUp)
      }
    },
    onMouseUp () {
      this.isActive = false
      this.app.removeEventListener('touchmove', this.onMouseMove, false)
      this.app.removeEventListener('mousemove', this.onMouseMove, false)
    },
    onMouseMove (e) {
      const { left: offsetLeft, width: trackWidth } = this.$refs.track.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      let left = (
        ((clientX - offsetLeft) / trackWidth) * 100
      )

      left = left < 0 ? 0 : left > 100 ? 100 : left

      this.inputValue = this.min + ((left / 100) * (this.max - this.min))
    },
    sliderMove (e) {
      if (!this.isActive) {
        this.onMouseMove(e)
      }
    }
  },

  render (h) {
    const children = []
    const trackChildren = []
    const thumbChildren = []

    trackChildren.push(h('div', { 'class': 'slider__track', style: this.trackStyles }))
    trackChildren.push(h('div', { 'class': 'slider__track-fill', style: this.trackFillStyles }))
    children.push(h('div', { 'class': 'slider__track__container', ref: 'track' }, trackChildren))

    if (this.step) {
      children.push(
        h('div', { 'class': 'slider__ticks-container', style: this.tickContainerStyles }, [
          h('div', { 'class': 'slider__ticks', style: this.tickStyles })
        ])
      )
    }

    thumbChildren.push(h('div', { 'class': 'slider__thumb' }))

    if (this.thumbLabel) {
      thumbChildren.push(
        h('v-scale-transition', { props: { origin: 'bottom center' }}, [
          h('div', {
            'class': 'slider__thumb--label__container',
            directives: [
              {
                name: 'show',
                value: this.isActive
              }
            ]
          }, [
            h('div', { 'class': 'slider__thumb--label' }, [
              h('span', {}, parseInt(this.inputValue))
            ])
          ])
        ])
      )
    }

    const thumbContainer = h('div', {
      'class': this.thumbContainerClasses,
      style: this.thumbStyles,
      on: {
        touchstart: this.onMouseDown,
        mousedown: this.onMouseDown
      },
      ref: 'thumb'
    }, thumbChildren)

    children.push(thumbContainer)

    const slider = h('div', { 'class': 'slider' }, children)

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.tabindex
      },
      on: {
        mouseup: this.sliderMove
      },
      directives: [
        {
          name: 'click-outside'
        }
      ]
    })
  }
}
