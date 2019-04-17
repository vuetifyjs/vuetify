import './VTimePickerClock.sass'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Helpers
import { pad } from '../VDatePicker/util'
import { deepEqual, convertToUnit } from '../../util/helpers'
import { genPickerButton } from '../VPicker/VPicker'

// Types
import mixins, { ExtractVue } from '../../util/mixins'
import Vue, { VNode, PropType } from 'vue'
import { convert24to12, convert12to24, TimePickerEnum } from './VTime'
import { Period, Format, TimePickerAllowFunction, TimePickerType, Time } from 'types'

interface Point {
  x: number
  y: number
}

interface options extends Vue {
  $refs: {
    clock: HTMLElement
    innerClock: HTMLElement
  }
}

function euclidean (p0: Point, p1: Point) {
  const dx = p1.x - p0.x
  const dy = p1.y - p0.y

  return Math.sqrt(dx * dx + dy * dy)
}

function angle (center: Point, p1: Point) {
  const value = 2 * Math.atan2(p1.y - center.y - euclidean(center, p1), p1.x - center.x)
  return Math.abs(value * 180 / Math.PI)
}

interface Allowed {
  hour: TimePickerAllowFunction
  minute: TimePickerAllowFunction
  second: TimePickerAllowFunction
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof Colorable,
    typeof Themeable
  ]>
/* eslint-enable indent */
>(
  Colorable,
  Themeable
/* @vue/component */
).extend({
  name: 'v-time-picker-clock',

  inheritAttrs: false,

  props: {
    allowed: {
      type: Object as PropType<Allowed>,
      default: () => ({ hour: () => true, minute: () => true, second: () => true }),
    },
    disabled: Boolean,
    period: String as PropType<Period>,
    readonly: Boolean,
    format: String as PropType<Format>,
    rotate: {
      type: Number,
      default: 0,
    },
    scrollable: Boolean,
    selectMode: String as PropType<TimePickerType>,
    showAmPm: Boolean,
    useSeconds: Boolean,
    size: [Number, String],
    time: Object as PropType<Time>,
  },

  data () {
    return {
      internalSelectMode: this.selectMode,
      isDragging: false,
      valueOnMouseUp: null as number | null,
      min: 0,
    }
  },

  computed: {
    isAmPm (): boolean {
      return this.format === 'ampm'
    },
    isHourMode (): boolean {
      return this.internalSelectMode === TimePickerEnum.Hour
    },
    isTwoCircles (): boolean {
      return this.isHourMode && !this.isAmPm
    },
    step (): number {
      return this.isHourMode ? 1 : 5
    },
    max (): number {
      return this.isHourMode ? (this.isAmPm ? 11 : 23) : 59
    },
    unitCount (): number {
      return this.max - this.min + 1
    },
    degreesPerUnit (): number {
      return 360 / this.unitsPerCircle
    },
    degrees (): number {
      return this.degreesPerUnit * Math.PI / 180
    },
    value (): number | null {
      if (!this.time) return null

      let value = null
      switch (this.internalSelectMode) {
        case TimePickerEnum.Hour: value = this.time.hour; break
        case TimePickerEnum.Minute: value = this.time.minute; break
        case TimePickerEnum.Second: value = this.time.second; break
      }

      return value
    },
    innerRadiusScale (): number {
      return 0.62
    },
    unitsPerCircle (): number {
      return this.isTwoCircles ? (this.unitCount / 2) : this.unitCount
    },
  },

  watch: {
    selectMode (v: TimePickerType) {
      this.internalSelectMode = v
    },
  },

  methods: {
    cycleMode () {
      let selectMode = this.internalSelectMode

      if (selectMode === TimePickerEnum.Hour) {
        selectMode = TimePickerEnum.Minute
      } else if (this.useSeconds && selectMode === TimePickerEnum.Minute) {
        selectMode = TimePickerEnum.Second
      }

      this.internalSelectMode = selectMode
      this.$emit('update:selectMode', selectMode)
    },
    wheel (e: WheelEvent) {
      e.preventDefault()

      const delta = Math.sign(-e.deltaY || 1)
      let value = this.value || 0
      do {
        value = value + delta
        value = (value - this.min + this.unitCount) % this.unitCount + this.min
      } while (!this.isAllowed(value) && value !== this.value)

      if (value !== this.value) {
        this.update(value)
      }
    },
    isInner (value: number): boolean {
      return this.isTwoCircles && (value - this.min >= this.unitsPerCircle)
    },
    handScale (value: number): number {
      return this.isInner(value) ? this.innerRadiusScale : 1
    },
    isAllowed (value: number): boolean {
      switch (this.internalSelectMode) {
        case TimePickerEnum.Hour: return !this.allowed.hour || this.allowed.hour(value)
        case TimePickerEnum.Minute: return !this.allowed.minute || this.allowed.minute(value)
        case TimePickerEnum.Second: return !this.allowed.second || this.allowed.second(value)
        default: return false
      }
    },
    genValues () {
      const children: VNode[] = []

      for (let value = this.min; value <= this.max; value = value + this.step) {
        const compareValue = this.isHourMode && this.isAmPm ? convert24to12(value) : value
        const currentValue = this.isHourMode && this.isAmPm ? convert24to12(this.value || 0) : this.value || 0
        const color = this.value !== null && compareValue === currentValue && (this.color || 'accent')
        const displayValue = !this.isHourMode ? pad(value, 2) : !this.isAmPm ? pad(compareValue, 2) : compareValue

        children.push(this.$createElement('span', this.setBackgroundColor(color, {
          staticClass: 'v-time-picker-clock__item',
          class: {
            'v-time-picker-clock__item--active': compareValue === currentValue,
            'v-time-picker-clock__item--disabled': this.disabled || !this.isAllowed(value),
          },
          style: this.getTransform(value),
          domProps: { innerHTML: `<span>${displayValue}</span>` },
        })))
      }

      return children
    },
    genHand (): VNode {
      const value = this.value || 0
      const scale = `scaleY(${this.handScale(value)})`
      const angle = this.rotate + this.degreesPerUnit * (value - this.min)
      const color = (this.value !== null) && (this.color || 'accent')
      return this.$createElement('div', this.setBackgroundColor(color, {
        staticClass: 'v-time-picker-clock__hand',
        class: {
          'v-time-picker-clock__hand--inner': this.isInner(value),
        },
        style: {
          transform: `rotate(${angle}deg) ${scale}`,
        },
      }))
    },
    getTransform (i: number) {
      const { x, y } = this.getPosition(i)
      return {
        left: `${50 + x * 50}%`,
        top: `${50 + y * 50}%`,
      }
    },
    getPosition (value: number): Point {
      const rotateRadians = this.rotate * Math.PI / 180
      return {
        x: Math.sin((value - this.min) * this.degrees + rotateRadians) * this.handScale(value),
        y: -Math.cos((value - this.min) * this.degrees + rotateRadians) * this.handScale(value),
      }
    },
    onMouseDown (e: MouseEvent | TouchEvent) {
      e.preventDefault()

      this.valueOnMouseUp = null
      this.isDragging = true
      this.onDragMove(e)
    },
    onMouseUp (e: MouseEvent | TouchEvent) {
      e.stopPropagation()

      this.isDragging = false
      if (this.valueOnMouseUp !== null && this.isAllowed(this.valueOnMouseUp)) {
        this.update(this.valueOnMouseUp)
        this.$emit(`click:${this.internalSelectMode}`, this.valueOnMouseUp)
        this.cycleMode()
      }
    },
    onDragMove (e: MouseEvent | TouchEvent) {
      e.preventDefault()
      if (!this.isDragging && e.type !== 'click') return

      const { width, top, left } = this.$refs.clock.getBoundingClientRect()
      const { width: innerWidth } = this.$refs.innerClock.getBoundingClientRect()
      const { clientX, clientY } = 'touches' in e ? e.touches[0] : e
      const center = { x: width / 2, y: -width / 2 }
      const coords = { x: clientX - left, y: top - clientY }
      const handAngle = Math.round(angle(center, coords) - this.rotate + 360) % 360
      const insideClick = this.isTwoCircles && euclidean(center, coords) < (innerWidth + innerWidth * this.innerRadiusScale) / 4
      const value = (
        Math.round(handAngle / this.degreesPerUnit) +
        (insideClick ? this.unitsPerCircle : 0)
      ) % this.unitCount + this.min

      // Necessary to fix edge case when selecting left part of the value(s) at 12 o'clock
      let newValue: number
      if (handAngle >= (360 - this.degreesPerUnit / 2)) {
        newValue = insideClick ? this.max - this.unitsPerCircle + 1 : this.min
      } else {
        newValue = value
      }

      if (this.isAllowed(value)) {
        this.valueOnMouseUp = newValue
        this.update(newValue)
      }
    },
    update (value: number) {
      const time = { ...this.time }

      switch (this.internalSelectMode) {
        case TimePickerEnum.Hour: time.hour = this.isAmPm ? convert12to24(value, this.period) : value; break
        case TimePickerEnum.Minute: time.minute = value; break
        case TimePickerEnum.Second: time.second = value; break
      }

      if (deepEqual(this.time, time)) return

      this.$emit('update:time', time)
    },
    genClock () {
      let listeners = {}

      if (!this.readonly && !this.disabled) {
        listeners = Object.assign(listeners, {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: (e: MouseEvent) => (this.isDragging && this.onMouseUp(e)),
          touchstart: this.onMouseDown,
          touchend: this.onMouseUp,
          mousemove: this.onDragMove,
          touchmove: this.onDragMove,
        })

        if (this.scrollable) {
          listeners = Object.assign(listeners, {
            wheel: this.wheel,
          })
        }
      }

      const data = {
        staticClass: 'v-time-picker-clock__outer',
        on: listeners,
        ref: 'clock',
      }

      return this.$createElement('div', data, [
        this.$createElement('div', {
          staticClass: 'v-time-picker-clock__inner',
          ref: 'innerClock',
        }, [
          this.genHand(),
          this.genValues(),
        ]),
      ])
    },
    genClockAmPm () {
      return this.$createElement('div', this.setTextColor(this.color || 'primary', {
        staticClass: 'v-time-picker-clock__ampm',
      }), [
        genPickerButton(
          this.$createElement,
          this.$vuetify.lang.t('$vuetify.timePicker.am'),
          () => this.$emit('update:period', 'am'),
          this.period === 'am',
          this.disabled || this.readonly
        ),
        genPickerButton(
          this.$createElement,
          this.$vuetify.lang.t('$vuetify.timePicker.pm'),
          () => this.$emit('update:period', 'pm'),
          this.period === 'pm',
          this.disabled || this.readonly
        ),
      ])
    },
  },

  render (): VNode {
    return this.$createElement('div', {
      key: this.selectMode,
      staticClass: 'v-time-picker-clock',
      class: {
        'v-time-picker-clock--indeterminate': this.value == null,
        ...this.themeClasses,
      },
      style: {
        width: convertToUnit(this.size),
        height: convertToUnit(this.size),
      },
    }, [
      this.isAmPm && this.showAmPm && this.genClockAmPm(),
      this.genClock(),
    ])
  },
})
