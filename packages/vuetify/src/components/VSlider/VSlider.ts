import './VSlider.sass'

// Components
import VInput from '../VInput'
import { VScaleTransition } from '../transitions'

// Mixins
import mixins, { ExtractVue } from '../../util/mixins'
import Loadable from '../../mixins/loadable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { addOnceEventListener, deepEqual, keyCodes, createRange, convertToUnit, passiveSupported } from '../../util/helpers'
import { consoleWarn } from '../../util/console'

// Types
import Vue, { VNode, VNodeChildrenArrayContents, PropType } from 'vue'
import { ScopedSlotChildren } from 'vue/types/vnode'
import { PropValidator } from 'vue/types/options'

interface options extends Vue {
  $refs: {
    track: HTMLElement
  }
}

export default mixins<options &
/* eslint-disable indent */
  ExtractVue<[
    typeof VInput,
    typeof Loadable
  ]>
/* eslint-enable indent */
>(
  VInput,
  Loadable
/* @vue/component */
).extend({
  name: 'v-slider',

  directives: {
    ClickOutside,
  },

  mixins: [Loadable],

  props: {
    disabled: Boolean,
    inverseLabel: Boolean,
    max: {
      type: [Number, String],
      default: 100,
    },
    min: {
      type: [Number, String],
      default: 0,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    thumbColor: String,
    thumbLabel: {
      type: [Boolean, String] as PropType<boolean | 'always' | undefined>,
      default: undefined,
      validator: v => typeof v === 'boolean' || v === 'always',
    },
    thumbSize: {
      type: [Number, String],
      default: 32,
    },
    tickLabels: {
      type: Array,
      default: () => ([]),
    } as PropValidator<string[]>,
    ticks: {
      type: [Boolean, String] as PropType<boolean | 'always'>,
      default: false,
      validator: v => typeof v === 'boolean' || v === 'always',
    },
    tickSize: {
      type: [Number, String],
      default: 2,
    },
    trackColor: String,
    trackFillColor: String,
    value: [Number, String],
    vertical: Boolean,
  },

  data: () => ({
    app: null as any,
    oldValue: null as any,
    thumbPressed: false,
    mouseTimeout: -1,
    isFocused: false,
    isActive: false,
    noClick: false, // Prevent click event if dragging took place, hack for #7915
    startOffset: 0,
  }),

  computed: {
    classes (): object {
      return {
        ...VInput.options.computed.classes.call(this),
        'v-input__slider': true,
        'v-input__slider--vertical': this.vertical,
        'v-input__slider--inverse-label': this.inverseLabel,
      }
    },
    internalValue: {
      get (): number {
        return this.lazyValue
      },
      set (val: number) {
        val = isNaN(val) ? this.minValue : val
        // Round value to ensure the
        // entire slider range can
        // be selected with step
        const value = this.roundValue(Math.min(Math.max(val, this.minValue), this.maxValue))

        if (value === this.lazyValue) return

        this.lazyValue = value

        this.$emit('input', value)
      },
    },
    trackTransition (): string {
      return this.thumbPressed
        ? this.showTicks || this.stepNumeric
          ? '0.1s cubic-bezier(0.25, 0.8, 0.5, 1)'
          : 'none'
        : ''
    },
    minValue (): number {
      return parseFloat(this.min)
    },
    maxValue (): number {
      return parseFloat(this.max)
    },
    stepNumeric (): number {
      return this.step > 0 ? parseFloat(this.step) : 0
    },
    inputWidth (): number {
      return (this.roundValue(this.internalValue) - this.minValue) / (this.maxValue - this.minValue) * 100
    },
    trackFillStyles (): Partial<CSSStyleDeclaration> {
      const startDir = this.vertical ? 'bottom' : 'left'
      const endDir = this.vertical ? 'top' : 'right'
      const valueDir = this.vertical ? 'height' : 'width'

      const start = this.$vuetify.rtl ? 'auto' : '0'
      const end = this.$vuetify.rtl ? '0' : 'auto'
      const value = this.isDisabled ? `calc(${this.inputWidth}% - 10px)` : `${this.inputWidth}%`

      return {
        transition: this.trackTransition,
        [startDir]: start,
        [endDir]: end,
        [valueDir]: value,
      }
    },
    trackStyles (): Partial<CSSStyleDeclaration> {
      const startDir = this.vertical ? this.$vuetify.rtl ? 'bottom' : 'top' : this.$vuetify.rtl ? 'left' : 'right'
      const endDir = this.vertical ? 'height' : 'width'

      const start = '0px'
      const end = this.isDisabled ? `calc(${100 - this.inputWidth}% - 10px)` : `calc(${100 - this.inputWidth}%)`

      return {
        transition: this.trackTransition,
        [startDir]: start,
        [endDir]: end,
      }
    },
    showTicks (): boolean {
      return this.tickLabels.length > 0 ||
        !!(!this.isDisabled && this.stepNumeric && this.ticks)
    },
    numTicks (): number {
      return Math.ceil((this.maxValue - this.minValue) / this.stepNumeric)
    },
    showThumbLabel (): boolean {
      return !this.isDisabled && !!(
        this.thumbLabel ||
        this.$scopedSlots['thumb-label']
      )
    },
    computedTrackColor (): string | undefined {
      if (this.isDisabled) return undefined
      if (this.trackColor) return this.trackColor
      if (this.isDark) return this.validationState
      return this.validationState || 'primary lighten-3'
    },
    computedTrackFillColor (): string | undefined {
      if (this.isDisabled) return undefined
      if (this.trackFillColor) return this.trackFillColor
      return this.validationState || this.computedColor
    },
    computedThumbColor (): string | undefined {
      if (this.thumbColor) return this.thumbColor
      return this.validationState || this.computedColor
    },
  },

  watch: {
    min (val) {
      const parsed = parseFloat(val)
      parsed > this.internalValue && this.$emit('input', parsed)
    },
    max (val) {
      const parsed = parseFloat(val)
      parsed < this.internalValue && this.$emit('input', parsed)
    },
    value: {
      handler (v: number) {
        this.internalValue = v
      },
    },
  },

  // If done in as immediate in
  // value watcher, causes issues
  // with vue-test-utils
  beforeMount () {
    this.internalValue = this.value
  },

  mounted () {
    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') ||
      consoleWarn('Missing v-app or a non-body wrapping element with the [data-app] attribute', this)
  },

  methods: {
    genDefaultSlot (): VNodeChildrenArrayContents {
      const children: VNodeChildrenArrayContents = [this.genLabel()]
      const slider = this.genSlider()
      this.inverseLabel
        ? children.unshift(slider)
        : children.push(slider)

      children.push(this.genProgress())

      return children
    },
    genSlider (): VNode {
      return this.$createElement('div', {
        class: {
          'v-slider': true,
          'v-slider--horizontal': !this.vertical,
          'v-slider--vertical': this.vertical,
          'v-slider--focused': this.isFocused,
          'v-slider--active': this.isActive,
          'v-slider--disabled': this.isDisabled,
          'v-slider--readonly': this.isReadonly,
          ...this.themeClasses,
        },
        directives: [{
          name: 'click-outside',
          value: this.onBlur,
        }],
        on: {
          click: this.onSliderClick,
          mousedown: this.onSliderMouseDown,
          touchstart: this.onSliderMouseDown,
        },
      }, this.genChildren())
    },
    genChildren (): VNodeChildrenArrayContents {
      return [
        this.genInput(),
        this.genTrackContainer(),
        this.genSteps(),
        this.genThumbContainer(
          this.internalValue,
          this.inputWidth,
          this.isActive,
          this.isFocused,
          this.onFocus,
          this.onBlur,
        ),
      ]
    },
    genInput (): VNode {
      return this.$createElement('input', {
        attrs: {
          value: this.internalValue,
          id: this.computedId,
          disabled: true,
          readonly: true,
          tabindex: -1,
          ...this.$attrs,
        },
        // on: this.genListeners(), // TODO: do we need to attach the listeners to input?
      })
    },
    genTrackContainer (): VNode {
      const children = [
        this.$createElement('div', this.setBackgroundColor(this.computedTrackColor, {
          staticClass: 'v-slider__track-background',
          style: this.trackStyles,
        })),
        this.$createElement('div', this.setBackgroundColor(this.computedTrackFillColor, {
          staticClass: 'v-slider__track-fill',
          style: this.trackFillStyles,
        })),
      ]

      return this.$createElement('div', {
        staticClass: 'v-slider__track-container',
        ref: 'track',
      }, children)
    },
    genSteps (): VNode | null {
      if (!this.step || !this.showTicks) return null

      const tickSize = parseFloat(this.tickSize)
      const range = createRange(this.numTicks + 1)
      const direction = this.vertical ? 'bottom' : (this.$vuetify.rtl ? 'right' : 'left')
      const offsetDirection = this.vertical ? (this.$vuetify.rtl ? 'left' : 'right') : 'top'

      if (this.vertical) range.reverse()

      const ticks = range.map(index => {
        const children = []

        if (this.tickLabels[index]) {
          children.push(this.$createElement('div', {
            staticClass: 'v-slider__tick-label',
          }, this.tickLabels[index]))
        }

        const width = index * (100 / this.numTicks)
        const filled = this.$vuetify.rtl ? (100 - this.inputWidth) < width : width < this.inputWidth

        return this.$createElement('span', {
          key: index,
          staticClass: 'v-slider__tick',
          class: {
            'v-slider__tick--filled': filled,
          },
          style: {
            width: `${tickSize}px`,
            height: `${tickSize}px`,
            [direction]: `calc(${width}% - ${tickSize / 2}px)`,
            [offsetDirection]: `calc(50% - ${tickSize / 2}px)`,
          },
        }, children)
      })

      return this.$createElement('div', {
        staticClass: 'v-slider__ticks-container',
        class: {
          'v-slider__ticks-container--always-show': this.ticks === 'always' || this.tickLabels.length > 0,
        },
      }, ticks)
    },
    genThumbContainer (
      value: number,
      valueWidth: number,
      isActive: boolean,
      isFocused: boolean,
      onFocus: Function,
      onBlur: Function,
      ref = 'thumb'
    ): VNode {
      const children = [this.genThumb()]

      const thumbLabelContent = this.genThumbLabelContent(value)
      this.showThumbLabel && children.push(this.genThumbLabel(thumbLabelContent))

      return this.$createElement('div', this.setTextColor(this.computedThumbColor, {
        ref,
        key: ref,
        staticClass: 'v-slider__thumb-container',
        class: {
          'v-slider__thumb-container--active': isActive,
          'v-slider__thumb-container--focused': isFocused,
          'v-slider__thumb-container--show-label': this.showThumbLabel,
        },
        style: this.getThumbContainerStyles(valueWidth),
        attrs: {
          role: 'slider',
          tabindex: this.isDisabled ? -1 : this.$attrs.tabindex ? this.$attrs.tabindex : 0,
          'aria-label': this.label,
          'aria-valuemin': this.min,
          'aria-valuemax': this.max,
          'aria-valuenow': this.internalValue,
          'aria-readonly': String(this.isReadonly),
          'aria-orientation': this.vertical ? 'vertical' : 'horizontal',
          ...this.$attrs,
        },
        on: {
          focus: onFocus,
          blur: onBlur,
          keydown: this.onKeyDown,
        },
      }), children)
    },
    genThumbLabelContent (value: number | string): ScopedSlotChildren {
      return this.$scopedSlots['thumb-label']
        ? this.$scopedSlots['thumb-label']!({ value })
        : [this.$createElement('span', [String(value)])]
    },
    genThumbLabel (content: ScopedSlotChildren): VNode {
      const size = convertToUnit(this.thumbSize)

      const transform = this.vertical
        ? `translateY(20%) translateY(${(Number(this.thumbSize) / 3) - 1}px) translateX(55%) rotate(135deg)`
        : `translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)`

      return this.$createElement(VScaleTransition, {
        props: { origin: 'bottom center' },
      }, [
        this.$createElement('div', {
          staticClass: 'v-slider__thumb-label-container',
          directives: [{
            name: 'show',
            value: this.isFocused || this.isActive || this.thumbLabel === 'always',
          }],
        }, [
          this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
            staticClass: 'v-slider__thumb-label',
            style: {
              height: size,
              width: size,
              transform,
            },
          }), [this.$createElement('div', content)]),
        ]),
      ])
    },
    genThumb (): VNode {
      return this.$createElement('div', this.setBackgroundColor(this.computedThumbColor, {
        staticClass: 'v-slider__thumb',
      }))
    },
    getThumbContainerStyles (width: number): object {
      const direction = this.vertical ? 'top' : 'left'
      let value = this.$vuetify.rtl ? 100 - width : width
      value = this.vertical ? 100 - value : value

      return {
        transition: this.trackTransition,
        [direction]: `${value}%`,
      }
    },
    onSliderMouseDown (e: MouseEvent | TouchEvent) {
      e.preventDefault()

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
    onSliderMouseUp (e: Event) {
      e.stopPropagation()
      window.clearTimeout(this.mouseTimeout)
      this.thumbPressed = false
      const mouseMoveOptions = passiveSupported ? { passive: true } : false
      this.app.removeEventListener('touchmove', this.onMouseMove, mouseMoveOptions)
      this.app.removeEventListener('mousemove', this.onMouseMove, mouseMoveOptions)

      this.$emit('mouseup', e)
      this.$emit('end', this.internalValue)
      if (!deepEqual(this.oldValue, this.internalValue)) {
        this.$emit('change', this.internalValue)
        this.noClick = true
      }

      this.isActive = false
    },
    onMouseMove (e: MouseEvent | TouchEvent) {
      if (e.type === 'mousemove') {
        this.thumbPressed = true
      }
      this.internalValue = this.parseMouseMove(e)
    },
    onKeyDown (e: KeyboardEvent) {
      if (!this.isInteractive) return

      const value = this.parseKeyDown(e, this.internalValue)

      if (
        value == null ||
        value < this.minValue ||
        value > this.maxValue
      ) return

      this.internalValue = value
      this.$emit('change', value)
    },
    onSliderClick (e: MouseEvent) {
      if (this.noClick) {
        this.noClick = false
        return
      }
      const thumb = this.$refs.thumb as HTMLElement
      thumb.focus()

      this.onMouseMove(e)
      this.$emit('change', this.internalValue)
    },
    onBlur (e: Event) {
      this.isFocused = false

      this.$emit('blur', e)
    },
    onFocus (e: Event) {
      this.isFocused = true

      this.$emit('focus', e)
    },
    parseMouseMove (e: MouseEvent | TouchEvent) {
      const start = this.vertical ? 'top' : 'left'
      const length = this.vertical ? 'height' : 'width'
      const click = this.vertical ? 'clientY' : 'clientX'

      const {
        [start]: trackStart,
        [length]: trackLength,
      } = this.$refs.track.getBoundingClientRect()
      const clickOffset = 'touches' in e ? e.touches[0][click] : e[click]

      // It is possible for left to be NaN, force to number
      let clickPos = Math.min(Math.max((clickOffset - trackStart - this.startOffset) / trackLength, 0), 1) || 0

      if (this.vertical) clickPos = 1 - clickPos
      if (this.$vuetify.rtl) clickPos = 1 - clickPos

      return parseFloat(this.min) + clickPos * (this.maxValue - this.minValue)
    },
    parseKeyDown (e: KeyboardEvent, value: number) {
      if (!this.isInteractive) return

      const { pageup, pagedown, end, home, left, right, down, up } = keyCodes

      if (![pageup, pagedown, end, home, left, right, down, up].includes(e.keyCode)) return

      e.preventDefault()
      const step = this.stepNumeric || 1
      const steps = (this.maxValue - this.minValue) / step
      if ([left, right, down, up].includes(e.keyCode)) {
        const increase = this.$vuetify.rtl ? [left, up] : [right, up]
        const direction = increase.includes(e.keyCode) ? 1 : -1
        const multiplier = e.shiftKey ? 3 : (e.ctrlKey ? 2 : 1)

        value = value + (direction * step * multiplier)
      } else if (e.keyCode === home) {
        value = this.minValue
      } else if (e.keyCode === end) {
        value = this.maxValue
      } else {
        const direction = e.keyCode === pagedown ? 1 : -1
        value = value - (direction * step * (steps > 100 ? steps / 10 : 10))
      }

      return value
    },
    roundValue (value: number): number {
      if (!this.stepNumeric) return value
      // Format input value using the same number
      // of decimals places as in the step prop
      const trimmedStep = this.step.toString().trim()
      const decimals = trimmedStep.indexOf('.') > -1
        ? (trimmedStep.length - trimmedStep.indexOf('.') - 1)
        : 0
      const offset = this.minValue % this.stepNumeric

      const newValue = Math.round((value - offset) / this.stepNumeric) * this.stepNumeric + offset

      return parseFloat(Math.min(newValue, this.maxValue).toFixed(decimals))
    },
  },
})
