import Input from '../../mixins/input'

export default {
  name: 'slider',

  mixins: [Input],

  data () {
    return {
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
    stepSize: {
      type: [Number, String],
      default: 1
    },
    tickInterval: [Number, String],
    thumbLabel: Boolean,
    value: [Number, String],
    vertical: Boolean
  },

  watch: {
    value () {
      this.inputValue = this.value
    }
  },

  computed: {
    classes () {
      return {
        'input-group input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputValue > this.min,
        'input-group--disabled': this.disabled,
        'input-group--ticks': this.tickInterval
      }
    },
    inputValue: {
      get () {
        return this.value
      },
      set (val) {
        // Do not re-calc width if not needed, causes jump
        if (val !== Math.round(this.inputWidth)) {
          this.inputWidth = (100 * (val / this.max))
        }

        let value = Math.round(val)

        value = value < this.min ? 0 : value > this.max ? this.max : value

        this.$emit('input', value)
      }
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
        transform: `translate3d(-${this.tickInterval / 2 * this.stepSize}%, -50%, 0)`
      }
    },
    tickStyles () {
      return {
        backgroundSize: `${this.tickInterval * this.stepSize}% 2px`,
        transform: `translate3d(${this.tickInterval / 2 * this.stepSize}%, 0, 0)`
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

  mounted () {
    this.inputValue = this.value
  },

  methods: {
    calculateScale (scale) {
      if (scale < 0.02 && !this.thumbLabel) {
        return 0
      }

      return this.disabled ? scale - 0.015 : scale
    },
    onMouseDown (e) {
      this.isActive = true
      document.addEventListener('touchmove', this.onMouseMove, false)
      document.addEventListener('pointermove', this.onMouseMove, false)
      document.addEventListener('mouseup', this.onMouseUp, false)
    },
    onMouseUp (e) {
      this.isActive = false
      document.removeEventListener('pointermove', this.onMouseMove, false)
      document.removeEventListener('touchmove', this.onMouseMove, false)
    },
    onMouseMove (e) {
      const { left: offsetLeft, width: trackWidth } = this.$refs.track.getBoundingClientRect()
      const { width: thumbWidth } = this.$refs.thumb.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      let left = (
        ((clientX - offsetLeft - thumbWidth) / trackWidth) * 100
      )

      left = left < 0 ? 0 : left > 100 ? 100 : left

      this.inputValue = this.max * (left / 100)
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

    if (this.tickInterval) {
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
              h('span', {}, this.inputValue)
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
    return this.genInputGroup(h, [slider])
  }
}
