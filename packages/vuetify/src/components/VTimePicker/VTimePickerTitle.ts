import './VTimePickerTitle.sass'

// Utils
import { pad } from '../VDatePicker/util'
import { genPickerButton } from '../VPicker/VPicker'
import { convert24to12, TimePickerEnum } from './VTime'

// Types
import Vue, { VNode, PropType } from 'vue'
import { Format, TimePickerType, Time } from 'types'

export default Vue.extend({
  name: 'v-time-picker-title',

  inheritAttrs: false,

  props: {
    format: {
      type: String as PropType<Format>,
      default: 'ampm',
    },
    showAmPm: Boolean,
    disabled: Boolean,
    period: {
      type: String as PropType<'am' | 'pm'>,
      validator: period => period === 'am' || period === 'pm',
    },
    readonly: Boolean,
    useSeconds: Boolean,
    selectMode: String as PropType<TimePickerType>,
    time: Object as PropType<Time>,
  },

  computed: {
    isAmPm (): boolean {
      return this.format === 'ampm'
    },
  },

  methods: {
    genTime () {
      let hour = this.time ? this.time.hour : null
      if (hour != null && this.isAmPm) {
        hour = convert24to12(hour)
      }

      const displayedHour = hour == null ? '--' : this.isAmPm ? String(hour) : pad(hour)
      const displayedMinute = this.time && this.time.minute != null ? pad(this.time.minute) : '--'
      const titleContent = [
        genPickerButton(
          this.$createElement,
          displayedHour,
          () => this.$emit('update:selectMode', TimePickerEnum.Hour),
          this.selectMode === TimePickerEnum.Hour,
          this.disabled
        ),
        this.$createElement('span', ':'),
        genPickerButton(
          this.$createElement,
          displayedMinute,
          () => this.$emit('update:selectMode', TimePickerEnum.Minute),
          this.selectMode === TimePickerEnum.Minute,
          this.disabled
        ),
      ]

      if (this.useSeconds) {
        const displayedSecond = this.time.second == null ? '--' : pad(this.time.second)
        titleContent.push(this.$createElement('span', ':'))
        titleContent.push(genPickerButton(
          this.$createElement,
          displayedSecond,
          () => this.$emit('update:selectMode', TimePickerEnum.Second),
          this.selectMode === TimePickerEnum.Second,
          this.disabled
        ))
      }
      return this.$createElement('div', {
        class: 'v-time-picker-title__time',
      }, titleContent)
    },
    genAmPm () {
      return this.$createElement('div', {
        staticClass: 'v-time-picker-title__ampm',
      }, [
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

  render (h): VNode {
    const children = [this.genTime()]

    this.isAmPm && this.showAmPm && children.push(this.genAmPm())

    return h('div', {
      staticClass: 'v-time-picker-title',
    }, children)
  },
})
