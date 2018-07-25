// Styles
import '../../stylus/components/_range-sliders.styl'

// Extensions
import VSlider from '../VSlider'

import {
  createRange,
  deepEqual
} from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-range-slider',

  extends: VSlider,

  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },

  data: vm => ({
    activeThumb: null,
    lazyValue: !vm.value.length
      ? [0, 0]
      : vm.value
  }),

  computed: {
    classes () {
      return Object.assign({}, {
        'v-input--range-slider': true
      }, VSlider.computed.classes.call(this))
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
        let value = val.map(v => this.roundValue(Math.min(Math.max(v, min), max)))

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
      return this.internalValue.map(v => (
        this.roundValue(v) - this.min) / (this.max - this.min) * 100
      )
    },
    isDirty () {
      return this.internalValue.some(v => v !== this.min) || this.alwaysDirty
    },
    trackFillStyles () {
      const styles = VSlider.computed.trackFillStyles.call(this)
      const fillPercent = Math.abs(this.inputWidth[0] - this.inputWidth[1])

      styles.width = `calc(${fillPercent}% - ${this.trackPadding}px)`
      styles[this.$vuetify.rtl ? 'right' : 'left'] = `${this.inputWidth[0]}%`

      return styles
    },
    trackPadding () {
      if (this.isDirty ||
        this.internalValue[0]
      ) return 0

      return VSlider.computed.trackPadding.call(this)
    }
  },

  methods: {
    getIndexOfClosestValue (arr, v) {
      if (Math.abs(arr[0] - v) < Math.abs(arr[1] - v)) return 0
      else return 1
    },
    genInput () {
      return createRange(2).map(i => {
        const input = VSlider.methods.genInput.call(this)

        input.data.attrs.value = this.internalValue[i]

        input.data.on.focus = e => {
          this.activeThumb = i
          VSlider.methods.onFocus.call(this, e)
        }

        return input
      })
    },
    genChildren () {
      return [
        this.genInput(),
        this.genTrackContainer(),
        this.genSteps(),
        createRange(2).map(i => {
          const value = this.internalValue[i]
          const onDrag = e => {
            this.isActive = true
            this.activeThumb = i
            this.onThumbMouseDown(e)
          }
          const valueWidth = this.inputWidth[i]
          const isActive = (this.isFocused || this.isActive) && this.activeThumb === i

          return this.genThumbContainer(value, valueWidth, isActive, onDrag)
        })
      ]
    },
    onSliderClick (e) {
      if (!this.isActive) {
        this.isFocused = true
        this.onMouseMove(e, true)
        this.$emit('change', this.internalValue)
      }
    },
    onMouseMove (e, trackClick = false) {
      const { value, isInsideTrack } = this.parseMouseMove(e)

      if (isInsideTrack) {
        if (trackClick) this.activeThumb = this.getIndexOfClosestValue(this.internalValue, value)

        this.setInternalValue(value)
      }
    },
    onKeyDown (e) {
      const value = this.parseKeyDown(e, this.internalValue[this.activeThumb])

      if (value == null) return

      this.setInternalValue(value)
    },
    setInternalValue (value) {
      this.internalValue = this.internalValue.map((v, i) => {
        if (i === this.activeThumb) return value
        else return Number(v)
      })
    }
  }
}
