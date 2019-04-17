// Components
import VPicker from '../VPicker'
import VTime, { VTimeScopedProps } from './VTime'
import VTimePickerTitle from './VTimePickerTitle'
import VTimePickerClock from './VTimePickerClock'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Types
import Vue, { VNode } from 'vue'
import { Period, Time, TimePickerType } from 'types'

export default Vue.extend({
  name: 'v-time-picker',

  props: {
    ...VPicker.options.props,
    ...Colorable.options.props,
    ...Themeable.options.props,
    ...VTime.options.props,
    readonly: Boolean,
    disabled: Boolean,
    scrollable: Boolean,
    showAmPm: Boolean,
  },

  methods: {
    genClock (props: VTimeScopedProps) {
      return this.$createElement(VTimePickerClock, {
        key: props.selectMode,
        props: {
          allowed: props.allowed,
          color: this.color,
          dark: this.dark,
          disabled: this.disabled,
          format: props.format,
          light: this.light,
          readonly: this.readonly,
          period: props.period,
          scrollable: this.scrollable,
          showAmPm: !this.showAmPm,
          selectMode: props.selectMode,
          size: this.width,
          time: props.time,
          useSeconds: props.useSeconds,
        },
        on: {
          'update:period': (p: Period) => props.setPeriod(p),
          'update:time': (t: Time) => props.setTime(t),
          'update:selectMode': (m: TimePickerType) => props.setSelectMode(m),
          'click:hour': (hour: number) => this.$emit('click:hour', hour),
          'click:minute': (minute: number) => this.$emit('click:minute', minute),
          'click:second': (second: number) => this.$emit('click:second', second),
        },
      })
    },
    genTitle (props: VTimeScopedProps) {
      return this.$createElement(VTimePickerTitle, {
        props: {
          disabled: this.disabled,
          format: props.format,
          period: props.period,
          readonly: this.readonly,
          selectMode: props.selectMode,
          showAmPm: this.showAmPm,
          time: props.time,
          useSeconds: props.useSeconds,
        },
        on: {
          'update:selectMode': (m: TimePickerType) => props.setSelectMode(m),
          'update:period': (p: Period) => props.setPeriod(p),
        },
        slot: 'title',
      })
    },
    genPicker (props: VTimeScopedProps) {
      return this.$createElement(VPicker, {
        staticClass: 'v-picker--time',
        props: {
          ...this.$props,
          transition: false,
        },
      }, [
        this.genTitle(props),
        this.$createElement('transition', {
          props: {
            name: this.transition,
          },
        }, [this.genClock(props)]),
        this.$slots.default && this.$createElement('template', { slot: 'actions' }, this.$slots.default),
      ])
    },
  },

  render (h): VNode {
    return h(VTime, {
      props: {
        allowedHours: this.allowedHours,
        allowedMinutes: this.allowedMinutes,
        allowedSeconds: this.allowedSeconds,
        format: this.format,
        min: this.min,
        max: this.max,
        value: this.value,
        useSeconds: this.useSeconds,
      },
      scopedSlots: {
        default: props => this.genPicker(props),
      },
      on: {
        input: (v: string) => this.$emit('input', v),
      },
    })
  },
})
