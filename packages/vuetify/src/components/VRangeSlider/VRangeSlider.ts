// Styles
import '../../stylus/components/_range-sliders.styl'

// Components
import VSlider from '../VSlider'

// Helpers
import {
  createRange,
  deepEqual
} from '../../util/helpers'

// Types
import { PropValidator } from 'vue/types/options'
import { VNode } from 'vue'

/* @vue/component */
export default VSlider.extend({
  name: 'v-range-slider',

  props: {
    value: {
      type: Array,
      default: () => ([])
    } as PropValidator<number[]>
  },

  data () {
    return {
      activeThumb: null as null | number,
      lazyValue: !this.value.length
        ? [0, 0]
        : this.value
    }
  },

  computed: {
    classes () {
      return Object.assign({}, {
        'v-input--range-slider': true
      }, VSlider.options.computed.classes.call(this))
    },
    internalValue: {
      get () {
        return this.lazyValue
      },
      set (val: number[]) {
        // Round value to ensure the
        // entire slider range can
        // be selected with step
        let value = val.map(v => this.roundValue(Math.min(Math.max(v, this.minValue), this.maxValue)))

        // Switch values if range and wrong order
        if (value[0] > value[1] || value[1] < value[0]) {
          if (this.activeThumb !== null) this.activeThumb = this.activeThumb === 1 ? 0 : 1
          value = [value[1], value[0]]
        }

        this.lazyValue = value
        if (!deepEqual(value, this.value)) this.$emit('input', value)

        this.validate()
      }
    },
    inputWidth () {
      return this.internalValue.map((v: number) => (
        this.roundValue(v) - this.minValue) / (this.maxValue - this.minValue) * 100
      )
    },
    trackStyles () {
      return {
        width: '100%'
      }
    },
    trackFillStyles () {
      const styles = VSlider.options.computed.trackFillStyles.call(this)
      const fillPercent = Math.abs(this.inputWidth[0] - this.inputWidth[1])

      styles.width = `${fillPercent}%`
      styles[this.$vuetify.rtl ? 'right' : 'left'] = `${this.inputWidth[0]}%`

      return styles
    }
  },

  methods: {
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

        return input
      })
    },
    genChildren () {
      return [
        this.genInput(),
        this.genTrackContainer(),
        this.genSteps(),
        createRange(2).map(i => {
          return this.genThumbContainer(i)
        })
      ]
    },
    genThumbContainer (index: number): VNode {
      const value = this.internalValue[index]
      const onDrag = (e: MouseEvent) => {
        this.isActive = true
        this.activeThumb = index
        this.onThumbMouseDown(e)
      }

      const valueWidth = this.inputWidth[index]
      const isActive = this.isActive && this.activeThumb === index
      const isFocused = this.isFocused && this.activeThumb === index

      const children = [this.genThumb()]

      const thumbLabelContent = this.genThumbLabelContent(value)
      this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent))

      return this.$createElement('div', this.setTextColor(this.computedThumbColor, {
        staticClass: 'v-slider__thumb-container',
        class: {
          'v-slider__thumb-container--active': isActive,
          'v-slider__thumb-container--focused': isFocused,
          'v-slider__thumb-container--show-label': this.showThumbLabel
        },
        style: this.getThumbContainerStyles(valueWidth),
        attrs: {
          role: 'slider',
          tabindex: this.disabled || this.readonly ? -1 : this.$attrs.tabindex ? this.$attrs.tabindex : 0,
          'aria-label': this.label,
          'aria-valuemin': this.min,
          'aria-valuemax': this.max,
          'aria-valuenow': this.internalValue[index],
          'aria-readonly': String(this.readonly),
          'aria-orientation': this.vertical ? 'vertical' : 'horizontal',
          ...this.$attrs
        },
        on: {
          focus: () => this.onFocus(index),
          blur: this.onBlur,
          keydown: this.onKeyDown,
          keyup: this.onKeyUp,
          touchstart: onDrag,
          mousedown: onDrag
        }
      }), children)
    },
    onFocus (index: number) {
      this.isFocused = true
      this.activeThumb = index
    },
    onBlur () {
      this.isFocused = false
      this.activeThumb = null
    },
    onSliderClick (e: MouseEvent) {
      if (!this.isActive) {
        this.isFocused = true
        this.onMouseMove(e, true)
        this.$emit('change', this.internalValue)
      }
    },
    onMouseMove (e: MouseEvent, trackClick = false) {
      const { value, isInsideTrack } = this.parseMouseMove(e)

      if (isInsideTrack) {
        if (trackClick) this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value)

        this.setInternalValue(value)
      }
    },
    onKeyDown (e: KeyboardEvent) {
      if (this.activeThumb === null) return

      const value = this.parseKeyDown(e, this.internalValue[this.activeThumb])

      if (value == null) return

      this.setInternalValue(value)
    },
    setInternalValue (value: number) {
      this.internalValue = this.internalValue.map((v: number, i: number) => {
        if (i === this.activeThumb) return value
        else return Number(v)
      })
    }
  }
})
