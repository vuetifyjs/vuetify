// Styles
import './VDateTimePicker.sass'

// Components
import VPicker from '../VPicker'
import { VTabs, VTab, VTabsItems, VTabItem } from '../VTabs'
import VTime, { VTimeScopedProps } from '../VTimePicker/VTime'
import VDate, { VDateScopedProps, DatePickerEnum } from '../VDatePicker/VDate'
import VDatePickerBody from '../VDatePicker/VDatePickerBody'

// Mixins
import { VDatePickerTitle, VDatePicker } from '../VDatePicker'
import { VTimePickerTitle, VTimePickerClock, VTimePicker } from '../VTimePicker'
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Types
import Vue, { VNode } from 'vue'
import { TimePickerType, Period, Time } from 'types'
import { PropValidator } from 'vue/types/options'

type VTimeProps = Partial<typeof VTimePicker.options.props>
type VDateProps = Partial<typeof VDatePicker.options.props>

/* @vue/component */
export default Vue.extend({
  name: 'v-date-time-picker',

  props: {
    ...VPicker.options.props,
    ...Colorable.options.props,
    ...Themeable.options.props,
    disabled: Boolean,
    readonly: Boolean,
    timeProps: {
      type: Object,
      default: () => ({
        scrollable: false,
        showAmPmInTitle: false,
      }),
    } as PropValidator<VTimeProps>,
    dateProps: {
      type: Object,
      default: () => ({}),
    } as PropValidator<VDateProps>,
    value: String,
  },

  data: () => ({
    mode: 0,
    internalDate: null as string | null,
    internalTime: null as string | null,
    scopedTimeProps: null as VTimeScopedProps | null,
    scopedDateProps: null as VDateScopedProps | null,
  }),

  computed: {
    combinedValue (): string | null {
      return !!this.internalDate && !!this.internalTime ? `${this.internalDate} ${this.internalTime}` : null
    },
  },

  watch: {
    value: {
      handler (val: string) {
        // TODO: Check against malformed input?
        if (!val) return

        const [date, time] = val.split(' ')
        this.internalDate = date
        this.internalTime = time
      },
      immediate: true,
    },
    combinedValue (val: string | null) {
      if (val) this.$emit('input', val)
    },
  },

  methods: {
    genTabs () {
      const tabs = ['date', 'time'].map(tab => this.$createElement(VTab, [tab]))

      return this.$createElement(VTabs, {
        props: {
          value: this.mode,
          grow: true,
          dark: this.dark,
        },
        on: {
          change: (v: any) => this.mode = v,
        },
      }, tabs)
    },
    genHeaders () {
      const timeProps = this.scopedTimeProps || {} as any
      // TODO: We need some sane defaults here because
      // scoped data props are not available on first render
      const dateProps = this.scopedDateProps || {
        yearFormat: (v: string) => v,
        titleDateFormat: (v: string) => v,
        landscapeTitleDateFormat: (v: string) => v,
        headerDateFormat: (v: string) => v,
        updateActivePicker: () => {},
      } as any

      return this.$createElement('div', {
        staticClass: 'v-date-time-picker__headers',
      }, [
        this.$createElement(VDatePickerTitle, {
          props: {
            dayFormat: dateProps.titleDateFormat,
            yearFormat: dateProps.yearFormat,
            value: dateProps.value,
            disabled: this.disabled,
            readonly: this.readonly,
            selectingYear: dateProps.activePicker === DatePickerEnum.Year,
            yearIcon: this.dateProps.yearIcon,
            type: dateProps.type,
          },
          on: {
            'update:activePicker': dateProps.updateActivePicker,
          },
        }),
        this.$createElement(VTimePickerTitle, {
          props: {
            isAmPm: this.timeProps.showAmPm && timeProps.isAmPm,
            disabled: this.disabled,
            time: timeProps.time,
            period: timeProps.period,
            readonly: this.readonly,
            useSeconds: timeProps.useSeconds,
            selectMode: timeProps.selectMode,
            format: timeProps.format,
          },
          on: {
            'update:selectMode': (m: TimePickerType) => timeProps.setSelectMode(m),
            'update:period': (p: Period) => timeProps.setPeriod(p),
          },
        }),
      ])
    },
    genDatePickerBody (props: VDateScopedProps) {
      this.scopedDateProps = props
      return this.$createElement(VDatePickerBody, {
        props: {
          ...this.dateProps,
          ...props,
        },
        on: {
          'update:year': props.yearClick,
          'update:month': props.monthClick,
          'update:date': props.dateClick,
          'update:activePicker': props.updateActivePicker,
          'update:pickerDate': props.updatePickerDate,
          'click:date': (value: string) => this.$emit('click:date', value),
          'dblclick:date': (value: string) => this.$emit('dblclick:date', value),
          'click:month': (value: string) => this.$emit('click:month', value),
          'dblclick:month': (value: string) => this.$emit('dblclick:month', value),
        },
      })
    },
    genDatePicker () {
      return this.$createElement(VDate, {
        props: {
          ...this.dateProps,
          value: this.internalDate,
        },
        on: {
          input: (date: string) => this.internalDate = date,
        },
        scopedSlots: {
          default: props => this.genDatePickerBody(props),
        },
      })
    },
    genClock (props: VTimeScopedProps) {
      this.scopedTimeProps = props

      return this.$createElement(VTimePickerClock, {
        props: {
          allowed: props.allowed,
          color: this.color,
          dark: this.dark,
          disabled: this.disabled,
          format: props.format,
          light: this.light,
          readonly: this.readonly,
          period: props.period,
          scrollable: this.timeProps.scrollable,
          showAmPm: !this.timeProps.showAmPm,
          selectMode: props.selectMode,
          size: this.width,
          time: props.time,
          useSeconds: props.useSeconds,
        },
        on: {
          'update:period': (p: Period) => props.setPeriod(p),
          'update:time': (t: Time) => props.setTime(t),
          'update:selectMode': (m: TimePickerType) => props.setSelectMode(m),
        },
      })
    },
    genTimePicker () {
      return this.$createElement(VTime, {
        props: {
          ...this.timeProps,
          value: this.internalTime,
        },
        scopedSlots: {
          default: (props: VTimeScopedProps) => this.$createElement('transition', {
            props: {
              name: 'fade-transition',
              mode: 'out-in',
            },
          }, [this.genClock(props)]),
        },
        on: {
          input: (time: string) => this.internalTime = time,
        },
      })
    },
    genBody () {
      return this.$createElement(VTabsItems, {
        props: {
          value: this.mode,
        },
      }, [
        this.$createElement(VTabItem, { key: 'date', props: { eager: true } }, [this.genDatePicker()]),
        this.$createElement(VTabItem, { key: 'time', props: { eager: true } }, [this.genTimePicker()]),
      ])
    },
  },

  render (h): VNode {
    return h(VPicker, {
      staticClass: 'v-date-time-picker',
      props: {
        ...this.$props,
        transition: false,
      },
    }, [
      h('template', { slot: 'title' }, [
        this.genHeaders(),
        this.genTabs(),
      ]),
      this.genBody(),
    ])
  },
})
