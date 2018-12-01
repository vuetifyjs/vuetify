import '../../stylus/components/_time-picker-clock.styl'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

/* @vue/component */
export default {
  name: 'v-time-picker-clock',

  mixins: [
    Colorable,
    Themeable
  ],

  props: {
    allowedValues: Function,
    double: Boolean,
    format: {
      type: Function,
      default: val => val
    },
    max: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    scrollable: Boolean,
    readonly: Boolean,
    rotate: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    value: Number
  },

  data () {
    return {
      inputValue: this.value,
      isDragging: false,
      valueOnMouseDown: null,
      valueOnMouseUp: null
    }
  },

  computed: {
    count () {
      return this.max - this.min + 1
    },
    degreesPerUnit () {
      return 360 / this.roundCount
    },
    degrees () {
      return this.degreesPerUnit * Math.PI / 180
    },
    displayedValue () {
      return this.value == null ? this.min : this.value
    },
    innerRadiusScale () {
      return 0.62
    },
    roundCount () {
      return this.double ? (this.count / 2) : this.count
    }
  },

  watch: {
    value (value) {
      this.inputValue = value
    }
  },

  methods: {
    wheel (e) {
      e.preventDefault()

      const delta = Math.sign(e.wheelDelta || 1)
      let value = this.displayedValue
      do {
        value = value + delta
        value = (value - this.min + this.count) % this.count + this.min
      } while (!this.isAllowed(value) && value !== this.displayedValue)

      if (value !== this.displayedValue) {
        this.update(value)
      }
    },
    isInner (value) {
      return this.double && (value - this.min >= this.roundCount)
    },
    handScale (value) {
      return this.isInner(value) ? this.innerRadiusScale : 1
    },
    isAllowed (value) {
      return !this.allowedValues || this.allowedValues(value)
    },
    genValues () {
      const children = []

      for (let value = this.min; value <= this.max; value = value + this.step) {
        const color = value === this.value && (this.color || 'accent')
        children.push(this.$createElement('span', this.setBackgroundColor(color, {
          staticClass: 'v-time-picker-clock__item',
          'class': {
            'v-time-picker-clock__item--active': value === this.displayedValue,
            'v-time-picker-clock__item--disabled': !this.isAllowed(value)
          },
          style: this.getTransform(value),
          domProps: { innerHTML: `<span>${this.format(value)}</span>` }
        })))
      }

      return children
    },
    genHand () {
      const scale = `scaleY(${this.handScale(this.displayedValue)})`
      const angle = this.rotate + this.degreesPerUnit * (this.displayedValue - this.min)
      const color = (this.value != null) && (this.color || 'accent')
      return this.$createElement('div', this.setBackgroundColor(color, {
        staticClass: 'v-time-picker-clock__hand',
        'class': {
          'v-time-picker-clock__hand--inner': this.isInner(this.value)
        },
        style: {
          transform: `rotate(${angle}deg) ${scale}`
        }
      }))
    },
    getTransform (i) {
      const { x, y } = this.getPosition(i)
      return {
        left: `${50 + x * 50}%`,
        top: `${50 + y * 50}%`
      }
    },
    getPosition (value) {
      const rotateRadians = this.rotate * Math.PI / 180
      return {
        x: Math.sin((value - this.min) * this.degrees + rotateRadians) * this.handScale(value),
        y: -Math.cos((value - this.min) * this.degrees + rotateRadians) * this.handScale(value)
      }
    },
    onMouseDown (e) {
      e.preventDefault()

      this.valueOnMouseDown = null
      this.valueOnMouseUp = null
      this.isDragging = true
      this.onDragMove(e)
    },
    onMouseUp () {
      this.isDragging = false
      if (this.valueOnMouseUp !== null && this.isAllowed(this.valueOnMouseUp)) {
        this.$emit('change', this.valueOnMouseUp)
      }
    },
    onDragMove (e) {
      e.preventDefault()
      if (!this.isDragging && e.type !== 'click') return

      const { width, top, left } = this.$refs.clock.getBoundingClientRect()
      const { width: innerWidth } = this.$refs.innerClock.getBoundingClientRect()
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
      const center = { x: width / 2, y: -width / 2 }
      const coords = { x: clientX - left, y: top - clientY }
      const handAngle = Math.round(this.angle(center, coords) - this.rotate + 360) % 360
      const insideClick = this.double && this.euclidean(center, coords) < (innerWidth + innerWidth * this.innerRadiusScale) / 4
      const value = Math.round(handAngle / this.degreesPerUnit) +
        this.min + (insideClick ? this.roundCount : 0)

      // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
      let newValue
      if (handAngle >= (360 - this.degreesPerUnit / 2)) {
        newValue = insideClick ? this.max - this.roundCount + 1 : this.min
      } else {
        newValue = value
      }

      if (this.isAllowed(value)) {
        if (this.valueOnMouseDown === null) {
          this.valueOnMouseDown = newValue
        }
        this.valueOnMouseUp = newValue
        this.update(newValue)
      }
    },
    update (value) {
      if (this.inputValue !== value) {
        this.inputValue = value
        this.$emit('input', value)
      }
    },
    euclidean (p0, p1) {
      const dx = p1.x - p0.x
      const dy = p1.y - p0.y

      return Math.sqrt(dx * dx + dy * dy)
    },
    angle (center, p1) {
      const value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x)
      return Math.abs(value * 180 / Math.PI)
    }
  },

  render (h) {
    const data = {
      staticClass: 'v-time-picker-clock',
      class: {
        'v-time-picker-clock--indeterminate': this.value == null,
        ...this.themeClasses
      },
      on: this.readonly ? undefined : {
        mousedown: this.onMouseDown,
        mouseup: this.onMouseUp,
        mouseleave: () => (this.isDragging && this.onMouseUp()),
        touchstart: this.onMouseDown,
        touchend: this.onMouseUp,
        mousemove: this.onDragMove,
        touchmove: this.onDragMove
      },
      ref: 'clock'
    }

    !this.readonly && this.scrollable && (data.on.wheel = this.wheel)

    return h('div', data, [
      h('div', {
        staticClass: 'v-time-picker-clock__inner',
        ref: 'innerClock'
      }, [
        this.genHand(),
        this.genValues()
      ])
    ])
  }
}
