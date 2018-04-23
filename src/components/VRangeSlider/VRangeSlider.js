// Styles
import '../../stylus/components/_sliders.styl'

// Extensions
import VSlider from '../VSlider'

import {
  createRange,
  deepEqual
} from '../../util/helpers'

export default {
  name: 'v-range-slider',

  extends: VSlider,

  data: vm => ({
    activeThumb: null,
    lazyValue: !vm.value.length
      ? [0, 0]
      : vm.value
  }),

  props: {
    value: {
      type: Array,
      default: () => ([])
    }
  },

  computed: {
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
      return this.internalValue.some(v => v !== this.min)
    },
    trackFillStyles () {
      const styles = VSlider.computed.trackFillStyles.call(this)
      const fillPercent = Math.abs(this.inputWidth[0] - this.inputWidth[1])

      styles.width = `calc(${fillPercent}% - ${this.trackPadding}px`
      styles[this.$vuetify.rtl ? 'right' : 'left'] = `${this.inputWidth[0]}%`

      return styles
    },
    trackPadding () {
      if (this.range && this.isDirty) return 0

      return VSlider.computed.trackPadding.call(this)
    }
  },

  methods: {
    getIndexOfClosestValue (arr, v) {
      return arr.indexOf(arr.reduce((prev, curr) => {
        return Math.abs((curr / 100) - v) < Math.abs((prev / 100) - v) ? curr : prev
      }, 0))
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
    // We will manually general this
    getLabel () {
      return null
    },
    genThumbContainer () {
      return createRange(2).map(i => {
        const drag = e => this.onMouseDown(e, i)
        const left = this.$vuetify.rtl ? 100 - this.inputWidth[i] : this.inputWidth[i]
        const isActive = (this.isFocused && this.activeThumb === i) ||
          this.thumbLabel === 'always'
        const thumbContainer = VSlider.methods.genThumbContainer.call(this)

        if (thumbContainer.children.length > 1) {
          const transition = thumbContainer.children[1]
          const label = transition.componentOptions.children[0]
          const content = this.$scopedSlots['thumb-label']
            ? this.$scopedSlots['thumb-label']({ index: i, value: this.internalValue[i] })
            : this.$createElement('span', {}, this.internalValue[i])

          // Dynamically generate content
          label.children[0].children.push(content)
          // Re-assign directive value for show
          label.data.directives[0].value = isActive
        }

        thumbContainer.data.on.touchstart = drag
        thumbContainer.data.on.mousedown = drag

        thumbContainer.data.class['v-slider__thumb-container--is-active'] = isActive
        thumbContainer.data.style.left = `${left}%`

        return thumbContainer
      })
    },
    onClick (e) {
      if (!this.isActive) {
        this.onMouseMove(e, true)
        this.$emit('input', this.internalValue)
      }
    },
    onMouseDown (e, i) {
      this.activeThumb = i

      VSlider.methods.onMouseDown.call(this, e)
    },
    onMouseMove (e, trackClick = false) {
      const {
        left: offsetLeft,
        width: trackWidth
      } = this.$refs.track.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      let left = Math.min(Math.max((clientX - offsetLeft) / trackWidth, 0), 1)

      if (this.$vuetify.rtl) left = 1 - left
      if (clientX >= offsetLeft - 8 && clientX <= offsetLeft + trackWidth + 8) {
        if (trackClick) this.activeThumb = this.getIndexOfClosestValue(this.inputWidth, left)

        this.internalValue = this.internalValue.map((v, i) => {
          if (i === this.activeThumb) return parseFloat(this.min) + left * (this.max - this.min)
          else return v
        })
      }
    },
    parseKeyDown (e) {
      const value = VSlider.methods.parseKeyDown.call(
        this,
        e,
        this.internalValue[this.activeThumb]
      )

      if (value == null) return

      return this.internalValue.map((v, i) => {
        if (i === this.activeThumb) return value
        else return Number(v)
      })
    }
  }
}
