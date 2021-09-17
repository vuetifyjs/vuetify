// Styles
import './VRangeSlider.sass'

// Components
import VSlider from '../VSlider'

// Helpers
import {
  addOnceEventListener,
  createRange,
  deepEqual,
  passiveSupported,
} from '../../util/helpers'

// Types
import { PropValidator } from 'vue/types/options'

/* @vue/component */
export default VSlider.extend({
  name: 'v-range-slider',

  props: {
    value: {
      type: Array,
      default: () => ([0, 0]),
    } as unknown as PropValidator<[number, number]>,
  },

  data () {
    return {
      activeThumb: null as null | number,
      lazyValue: this.value,
    }
  },

  computed: {
    classes (): object {
      return {
        ...VSlider.options.computed.classes.call(this),
        'v-input--range-slider': true,
      }
    },
    internalValue: {
      get (): number[] {
        return this.lazyValue
      },
      set (val: number[]) {
        // Round value to ensure the
        // entire slider range can
        // be selected with step
        let value = val.map((v = 0) => this.roundValue(Math.min(Math.max(v, this.minValue), this.maxValue)))

        // Switch values if range and wrong order
        if (value[0] > value[1] || value[1] < value[0]) {
          if (this.activeThumb !== null) {
            const toFocus = this.activeThumb === 1 ? 0 : 1
            const el = this.$refs[`thumb_${toFocus}`] as HTMLElement
            el.focus()
          }
          value = [value[1], value[0]]
        }

        this.lazyValue = value
        if (!deepEqual(value, this.value)) this.$emit('input', value)

        this.validate()
      },
    },
    inputWidth (): number[] {
      return this.internalValue.map((v: number) => (
        this.roundValue(v) - this.minValue) / (this.maxValue - this.minValue) * 100
      )
    },
  },

  methods: {
    getTrackStyle (startLength: number, endLength: number, startPadding = 0, endPadding = 0) {
      const startDir = this.vertical ? this.$vuetify.rtl ? 'top' : 'bottom' : this.$vuetify.rtl ? 'right' : 'left'
      const endDir = this.vertical ? 'height' : 'width'

      const start = `calc(${startLength}% + ${startPadding}px)`
      const end = `calc(${endLength}% + ${endPadding}px)`

      return {
        transition: this.trackTransition,
        [startDir]: start,
        [endDir]: end,
      }
    },
    getIndexOfClosestValue (arr: number[], v: number) {
      if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0
      else return 1
    },
    genInput () {
      return createRange(2).map(i => {
        const input = VSlider.options.methods.genInput.call(this)

        input.data = input.data || {}
        input.data.attrs = input.data.attrs || {}
        input.data.attrs.value = this.internalValue[i]
        input.data.attrs.id = `input-${i ? 'max' : 'min'}-${this._uid}`

        return input
      })
    },
    genTrackContainer () {
      const children = []

      const padding = this.isDisabled ? 10 : 0
      const sections: { class: string, color: string | undefined, styles: [number, number, number, number] }[] = [
        {
          class: 'v-slider__track-background',
          color: this.computedTrackColor,
          styles: [0, this.inputWidth[0], 0, -padding],
        },
        {
          class: this.isDisabled ? 'v-slider__track-background' : 'v-slider__track-fill',
          color: this.isDisabled ? this.computedTrackColor : this.computedTrackFillColor,
          styles: [this.inputWidth[0], Math.abs(this.inputWidth[1] - this.inputWidth[0]), padding, padding * -2],
        },
        {
          class: 'v-slider__track-background',
          color: this.computedTrackColor,
          styles: [this.inputWidth[1], Math.abs(100 - this.inputWidth[1]), padding, -padding],
        },
      ]

      if (this.$vuetify.rtl) sections.reverse()

      children.push(...sections.map(section => this.$createElement('div', this.setBackgroundColor(section.color, {
        staticClass: section.class,
        style: this.getTrackStyle(...section.styles),
      }))))

      return this.$createElement('div', {
        staticClass: 'v-slider__track-container',
        ref: 'track',
      }, children)
    },
    genChildren () {
      return [
        this.genInput(),
        this.genTrackContainer(),
        this.genSteps(),
        createRange(2).map(index => {
          const value = this.internalValue[index]
          const onFocus = (e: Event) => {
            this.isFocused = true
            this.activeThumb = index

            this.$emit('focus', e)
          }

          const onBlur = (e: Event) => {
            this.isFocused = false
            this.activeThumb = null

            this.$emit('blur', e)
          }

          const valueWidth = this.inputWidth[index]
          const isActive = this.isActive && this.activeThumb === index
          const isFocused = this.isFocused && this.activeThumb === index

          return this.genThumbContainer(value, valueWidth, isActive, isFocused, onFocus, onBlur, `thumb_${index}`)
        }),
      ]
    },
    reevaluateSelected (value: number) {
      this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value)
      const refName = `thumb_${this.activeThumb}`
      const thumbRef = this.$refs[refName] as HTMLElement
      thumbRef.focus()
    },
    onSliderMouseDown (e: MouseEvent | TouchEvent) {
      const value = this.parseMouseMove(e)

      this.reevaluateSelected(value)

      this.oldValue = this.internalValue
      this.isActive = true

      if ((e.target as Element)?.matches('.v-slider__thumb-container, .v-slider__thumb-container *')) {
        this.thumbPressed = true
        const domRect = (e.target as Element).getBoundingClientRect()
        const touch = 'touches' in e ? e.touches[0] : e
        this.startOffset = this.vertical
          ? touch.clientY - (domRect.top + domRect.height / 2)
          : touch.clientX - (domRect.left + domRect.width / 2)
      } else {
        this.startOffset = 0
        window.clearTimeout(this.mouseTimeout)
        this.mouseTimeout = window.setTimeout(() => {
          this.thumbPressed = true
        }, 300)
      }

      const mouseUpOptions = passiveSupported ? { passive: true, capture: true } : true
      const mouseMoveOptions = passiveSupported ? { passive: true } : false

      const isTouchEvent = 'touches' in e

      this.onMouseMove(e)
      this.app.addEventListener(isTouchEvent ? 'touchmove' : 'mousemove', this.onMouseMove, mouseMoveOptions)
      addOnceEventListener(this.app, isTouchEvent ? 'touchend' : 'mouseup', this.onSliderMouseUp, mouseUpOptions)

      this.$emit('start', this.internalValue)
    },
    onSliderClick (e: MouseEvent) {
      if (!this.isActive) {
        if (this.noClick) {
          this.noClick = false
          return
        }

        const value = this.parseMouseMove(e)

        this.reevaluateSelected(value)

        this.setInternalValue(value)

        this.$emit('change', this.internalValue)
      }
    },
    onMouseMove (e: MouseEvent | TouchEvent) {
      const value = this.parseMouseMove(e)

      if (e.type === 'mousemove') {
        this.thumbPressed = true
      }

      this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value)

      this.setInternalValue(value)
    },
    onKeyDown (e: KeyboardEvent) {
      if (this.activeThumb === null) return

      const value = this.parseKeyDown(e, this.internalValue[this.activeThumb])

      if (value == null) return

      this.setInternalValue(value)
      this.$emit('change', this.internalValue)
    },
    setInternalValue (value: number) {
      this.internalValue = this.internalValue.map((v: number, i: number) => {
        if (i === this.activeThumb) return value
        else return Number(v)
      })
    },
  },
})
