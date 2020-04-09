import '../VDatePickerTable.sass'

// Directives
import Touch from '../../../directives/touch'

// Mixins
import Colorable from '../../../mixins/colorable'
import Localable from '../../../mixins/localable'
import Themeable from '../../../mixins/themeable'

// Utils
import isDateAllowed from '../util/isDateAllowed'
import mixins from '../../../util/mixins'

// Types
import { VNodeChildren, PropType } from 'vue'
import { DatePickerAllowedDatesFunction, DatePickerFormatter, DatePickerEvents, DatePickerEventColors, DatePickerEventColorValue, TouchWrapper } from 'types'

type CalculateTableDateFunction = (v: number) => string

export default mixins(
  Colorable,
  Localable,
  Themeable
/* @vue/component */
).extend({
  directives: { Touch },

  props: {
    allowedDates: Function as PropType<DatePickerAllowedDatesFunction | undefined>,
    current: String,
    disabled: Boolean,
    format: Function as PropType<DatePickerFormatter | undefined>,
    events: {
      type: [Array, Function, Object] as PropType<DatePickerEvents>,
      default: () => null,
    },
    eventColor: {
      type: [Array, Function, Object, String] as PropType<DatePickerEventColors>,
      default: () => 'warning',
    },
    min: String,
    max: String,
    range: Boolean,
    readonly: Boolean,
    scrollable: Boolean,
    tableDate: {
      type: String,
      required: true,
    },
    value: [String, Array] as PropType<string | string[]>,
  },

  data: () => ({
    isReversing: false,
  }),

  computed: {
    computedTransition (): string {
      return (this.isReversing === !this.$vuetify.rtl) ? 'tab-reverse-transition' : 'tab-transition'
    },
    displayedMonth (): number {
      return Number(this.tableDate.split('-')[1]) - 1
    },
    displayedYear (): number {
      return Number(this.tableDate.split('-')[0])
    },
  },

  watch: {
    tableDate (newVal: string, oldVal: string) {
      this.isReversing = newVal < oldVal
    },
  },

  methods: {
    genButtonClasses (isAllowed: boolean, isFloating: boolean, isSelected: boolean, isCurrent: boolean) {
      return {
        'v-size--default': !isFloating,
        'v-date-picker-table__current': isCurrent,
        'v-btn--active': isSelected,
        'v-btn--flat': !isAllowed || this.disabled,
        'v-btn--text': isSelected === isCurrent,
        'v-btn--rounded': isFloating,
        'v-btn--disabled': !isAllowed || this.disabled,
        'v-btn--outlined': isCurrent && !isSelected,
        ...this.themeClasses,
      }
    },
    genButtonEvents (value: string, isAllowed: boolean, mouseEventType: string) {
      if (this.disabled) return undefined

      return {
        click: () => {
          isAllowed && !this.readonly && this.$emit('input', value)
          this.$emit(`click:${mouseEventType}`, value)
        },
        dblclick: () => this.$emit(`dblclick:${mouseEventType}`, value),
      }
    },
    genButton (value: string, isFloating: boolean, mouseEventType: string, formatter: DatePickerFormatter) {
      const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates)
      const isSelected = this.isSelected(value)
      const isCurrent = value === this.current
      const setColor = isSelected ? this.setBackgroundColor : this.setTextColor
      const color = (isSelected || isCurrent) && (this.color || 'accent')

      return this.$createElement('button', setColor(color, {
        staticClass: 'v-btn',
        class: this.genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
        attrs: {
          type: 'button',
        },
        domProps: {
          disabled: this.disabled || !isAllowed,
        },
        on: this.genButtonEvents(value, isAllowed, mouseEventType),
      }), [
        this.$createElement('div', {
          staticClass: 'v-btn__content',
        }, [formatter(value)]),
        this.genEvents(value),
      ])
    },
    getEventColors (date: string) {
      const arrayize = (v: string | string[]) => Array.isArray(v) ? v : [v]
      let eventData: boolean | DatePickerEventColorValue
      let eventColors: string[] = []

      if (Array.isArray(this.events)) {
        eventData = this.events.includes(date)
      } else if (this.events instanceof Function) {
        eventData = this.events(date) || false
      } else if (this.events) {
        eventData = this.events[date] || false
      } else {
        eventData = false
      }

      if (!eventData) {
        return []
      } else if (eventData !== true) {
        eventColors = arrayize(eventData)
      } else if (typeof this.eventColor === 'string') {
        eventColors = [this.eventColor]
      } else if (typeof this.eventColor === 'function') {
        eventColors = arrayize(this.eventColor(date))
      } else if (Array.isArray(this.eventColor)) {
        eventColors = this.eventColor
      } else {
        eventColors = arrayize(this.eventColor[date])
      }

      return eventColors.filter(v => v)
    },
    genEvents (date: string) {
      const eventColors = this.getEventColors(date)

      return eventColors.length ? this.$createElement('div', {
        staticClass: 'v-date-picker-table__events',
      }, eventColors.map(color => this.$createElement('div', this.setBackgroundColor(color)))) : null
    },
    wheel (e: WheelEvent, calculateTableDate: CalculateTableDateFunction) {
      e.preventDefault()
      this.$emit('update:table-date', calculateTableDate(e.deltaY))
    },
    touch (value: number, calculateTableDate: CalculateTableDateFunction) {
      this.$emit('update:table-date', calculateTableDate(value))
    },
    genTable (staticClass: string, children: VNodeChildren, calculateTableDate: CalculateTableDateFunction) {
      const transition = this.$createElement('transition', {
        props: { name: this.computedTransition },
      }, [this.$createElement('table', { key: this.tableDate }, children)])

      const touchDirective = {
        name: 'touch',
        value: {
          left: (e: TouchWrapper) => (e.offsetX < -15) && this.touch(1, calculateTableDate),
          right: (e: TouchWrapper) => (e.offsetX > 15) && this.touch(-1, calculateTableDate),
        },
      }

      return this.$createElement('div', {
        staticClass,
        class: {
          'v-date-picker-table--disabled': this.disabled,
          ...this.themeClasses,
        },
        on: (!this.disabled && this.scrollable) ? {
          wheel: (e: WheelEvent) => this.wheel(e, calculateTableDate),
        } : undefined,
        directives: [touchDirective],
      }, [transition])
    },
    isSelected (value: string): boolean {
      if (Array.isArray(this.value)) {
        if (this.range && this.value.length === 2) {
          const [from, to] = [...this.value].sort()
          return from <= value && value <= to
        } else {
          return this.value.indexOf(value) !== -1
        }
      }

      return value === this.value
    },
  },
})
