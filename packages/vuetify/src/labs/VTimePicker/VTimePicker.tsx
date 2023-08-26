// @ts-nocheck
/* eslint-disable */

// Components
import { VTimePickerTitle } from './VTimePickerTitle'
import { VTimePickerClock } from './VTimePickerClock'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Mixins
// import Picker from '../../mixins/picker'
// import PickerButton from '../../mixins/picker-button'

// Composables
import { useLocale } from '@/composables/locale'

// Utils
import { createRange } from '../../util/helpers'
import pad from '../VDatePicker/util/pad'
// import mixins from '../../util/mixins'

// Types
// import { VNode, PropType } from 'vue'
import { SelectingTimes } from './SelectingTimes'

// Utilities
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

const rangeHours24 = createRange(24)
const rangeHours12am = createRange(12)
const rangeHours12pm = rangeHours12am.map(v => v + 12)
const range60 = createRange(60)
const selectingNames = { 1: 'hour', 2: 'minute', 3: 'second' }
export { SelectingTimes }

type Period = 'am' | 'pm'
type AllowFunction = (val: number) => boolean

export const makeVTimePickerProps = propsFactory({
  allowedHours: [Function, Array] as PropType<AllowFunction | number[]>,
  allowedMinutes: [Function, Array] as PropType<AllowFunction | number[]>,
  allowedSeconds: [Function, Array] as PropType<AllowFunction | number[]>,
  disabled: Boolean,
  format: {
    type: String as PropType<'ampm' | '24hr'>,
    default: 'ampm',
    validator (val: any) {
      return ['ampm', '24hr'].includes(val)
    },
  },
  min: String,
  max: String,
  readonly: Boolean,
  scrollable: Boolean,
  useSeconds: Boolean,
  value: null as any as PropType<any>,
  ampmInTitle: Boolean,
  ...makeVPickerProps({ title: ''})
}, 'VTimePicker')

export const VTimePicker = genericComponent()({
  name: 'VTimePicker',

  props: makeVTimePickerProps(),

  emits: [
    'input',
    'click:hours',
    'click:minutes',
    'click:seconds',
    'update:period',
    'change'
  ],

  setup (props, { emit, slots } ) {
    const { t } = useLocale()
    // Data
    const inputHour = ref(null as number | null)
    const inputMinute = ref(null as number | null)
    const inputSecond = ref(null as number | null)
    const lazyInputHour = ref(null as number | null)
    const lazyInputMinute = ref(null as number | null)
    const lazyInputSecond = ref(null as number | null)
    const period = ref('am' as Period)
    const selecting = ref(SelectingTimes.Hour)

    // Computeds
    const title = computed(() => t(props.title))
    const selectingHour = computed({
      get (): boolean {
        return selecting.value === SelectingTimes.Hour
      },
      set (v: boolean) {
        this.selecting = SelectingTimes.Hour
      },
    })
    const selectingMinute = computed({
      get (): boolean {
        return this.selecting === SelectingTimes.Minute
      },
      set (v: boolean) {
        this.selecting = SelectingTimes.Minute
      },
    })
    const selectingSecond = computed({
      get (): boolean {
        return this.selecting === SelectingTimes.Second
      },
      set (v: boolean) {
        this.selecting = SelectingTimes.Second
      },
    })
    const isAllowedHourCb = computed((): AllowFunction => {
      let cb: AllowFunction

      if (props.allowedHours instanceof Array) {
        cb = (val: number) => (props.allowedHours as number[]).includes(val)
      } else {
        cb = props.allowedHours
      }

      if (!props.min && !props.max) return cb

      const minHour = props.min ? Number(props.min.split(':')[0]) : 0
      const maxHour = props.max ? Number(props.max.split(':')[0]) : 23

      return (val: number) => {
        return val >= minHour * 1 &&
          val <= maxHour * 1 &&
          (!cb || cb(val))
      }
    })
    const isAllowedMinuteCb = computed((): AllowFunction => {
      let cb: AllowFunction

      const isHourAllowed = !isAllowedHourCb.value || inputHour.value === null || isAllowedHourCb.value(this.inputHour)
      if (props.allowedMinutes instanceof Array) {
        cb = (val: number) => (props.allowedMinutes as number[]).includes(val)
      } else {
        cb = props.allowedMinutes
      }

      if (!props.min && !props.max) {
        return isHourAllowed ? cb : () => false
      }

      const [minHour, minMinute] = props.min ? props.min.split(':').map(Number) : [0, 0]
      const [maxHour, maxMinute] = props.max ? props.max.split(':').map(Number) : [23, 59]
      const minTime = minHour * 60 + minMinute * 1
      const maxTime = maxHour * 60 + maxMinute * 1

      return (val: number) => {
        const time = 60 * inputHour.value! + val
        return time >= minTime &&
          time <= maxTime &&
          isHourAllowed &&
          (!cb || cb(val))
      }
    })
    const isAllowedSecondCb = computed((): AllowFunction => {
      let cb: AllowFunction

      const isHourAllowed = !isAllowedHourCb.value || inputHour.value === null || isAllowedHourCb.value(inputHour.value)
      const isMinuteAllowed = isHourAllowed &&
        (!isAllowedMinuteCb.value ||
          inputMinute.value === null ||
          isAllowedMinuteCb.value(inputMinute.value)
        )

      if (props.allowedSeconds instanceof Array) {
        cb = (val: number) => (props.allowedSeconds as number[]).includes(val)
      } else {
        cb = props.allowedSeconds
      }

      if (!props.min && !props.max) {
        return isMinuteAllowed ? cb : () => false
      }

      const [minHour, minMinute, minSecond] = props.min ? props.min.split(':').map(Number) : [0, 0, 0]
      const [maxHour, maxMinute, maxSecond] = props.max ? props.max.split(':').map(Number) : [23, 59, 59]
      const minTime = minHour * 3600 + minMinute * 60 + (minSecond || 0) * 1
      const maxTime = maxHour * 3600 + maxMinute * 60 + (maxSecond || 0) * 1

      return (val: number) => {
        const time = 3600 * inputHour.value! + 60 * inputMinute.value! + val
        return time >= minTime &&
          time <= maxTime &&
          isMinuteAllowed &&
          (!cb || cb(val))
      }
    })
    const isAmPm = computed((): boolean => {
      return props.format === 'ampm'
    })

    const titleSlotProps = computed(() => ({
      ampm: props.ampm,
      ampmReadonly: props.ampmReadonly && !props.ampmInTitle,
      disabled: props.disabled,
      hour: props.hour,
      minute: props.minute,
      second: props.second,
      period: period.value,
      readonly: props.readonly,
      useSeconds: props.useSeconds,
      selecting: selecting.value,
    }))

    watch(props.value, val => setInputData(val))

    onMounted(() => {
      setInputData(props.value)
      // this.$on('update:period', this.setPeriod)
    })

    const genValue = () => {
      if (inputHour.value != null && inputMinute.value != null && (!props.useSeconds || inputSecond.value != null)) {
        return `${pad(inputHour.value)}:${pad(inputMinute.value)}` + (props.useSeconds ? `:${pad(inputSecond.value!)}` : '')
      }

      return null
    }
    const emitValue = () => {
      const value = genValue()
      if (value !== null) emit('input', value)
    }
    const setPeriod = (period: Period) => {
      period.value = period
      if (inputHour.value != null) {
        const newHour = inputHour.value! + (period === 'am' ? -12 : 12)
        inputHour.value = firstAllowed('hour', newHour)
        emitValue()
      }
    }
    const setInputData = (value: string | null | Date) => {
      if (value == null || value === '') {
        inputHour.value = null
        inputMinute.value = null
        inputSecond.value = null
      } else if (value instanceof Date) {
        inputHour.value = value.getHours()
        inputMinute.value = value.getMinutes()
        inputSecond.value = value.getSeconds()
      } else {
        const [, hour, minute, , second, period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/) || new Array(6)

        inputHour.value = period ? this.convert12to24(parseInt(hour, 10), period as Period) : parseInt(hour, 10)
        inputMinute.value = parseInt(minute, 10)
        inputSecond.value = parseInt(second || 0, 10)
      }

      period.value = (inputHour.value == null || inputHour.value < 12) ? 'am' : 'pm'
    }
    const convert24to12 = (hour: number) => {
      return hour ? ((hour - 1) % 12 + 1) : 12
    }
    const convert12to24 = (hour: number, period: Period) => {
      return hour % 12 + (period === 'pm' ? 12 : 0)
    }
    const onInput = (value: number) => {
      if (selecting.value === SelectingTimes.Hour) {
        inputHour.value = isAmPm.value ? convert12to24(value, period.value) : value
      } else if (selecting.value === SelectingTimes.Minute) {
        inputMinute.value = value
      } else {
        inputSecond.value = value
      }
      emitValue()
    }
    const onChange = (value: number) => {
      emit(`click:${selectingNames[selecting.value]}`, value)

      const emitChange = selecting.value === (props.useSeconds ? SelectingTimes.Second : SelectingTimes.Minute)

      if (selecting.value === SelectingTimes.Hour) {
        selecting.value = SelectingTimes.Minute
      } else if (props.useSeconds && selecting.value === SelectingTimes.Minute) {
        selecting.value = SelectingTimes.Second
      }

      if (inputHour.value === lazyInputHour.value &&
        inputMinute.value === lazyInputMinute.value &&
        (!props.useSeconds || inputSecond.value === lazyInputSecond.value)
      ) return

      const time = genValue()
      if (time === null) return

      lazyInputHour.value = inputHour.value
      lazyInputMinute.value = inputMinute.value
      props.useSeconds && (lazyInputSecond.value = inputSecond.value)

      emitChange && emit('change', time)
    }
    const firstAllowed = (type: 'hour' | 'minute' | 'second', value: number) => {
      const allowedFn = type === 'hour' ? isAllowedHourCb.value : (type === 'minute' ? isAllowedMinuteCb.value : isAllowedSecondCb.value)
      if (!allowedFn) return value

      // TODO: clean up
      const range = type === 'minute'
        ? range60
        : (type === 'second'
          ? range60
          : (isAmPm.value
            ? (value < 12
              ? rangeHours12am
              : rangeHours12pm)
            : rangeHours24))
      const first = range.find(v => allowedFn((v + value) % range.length + range[0]))
      return ((first || 0) + value) % range.length + range[0]
    }

    useRender(() => {
      const [pickerProps] = VPicker.filterProps(props)
      return (
        <VPicker
          { ...pickerProps }
          class={[ 'v-time-picker', props.class ]}
          style={ props.style }
          title={ title.value }
          width={360}
          v-slots={{
            title: () => (
              <VTimePickerTitle
                key="header"
                { ...titleSlotProps.value }
                onUpdate:selecting={ (value: 1 | 2 | 3) => (selecting.value = value) }
                onUpdate:period={ (period: string) => emit('update:period', period) }
                ref="title"
              ></VTimePickerTitle>
            ),
            default: () => (
              <div class="v-time-picker-clock__container" key={selecting.value}>
                {
                  !props.ampmInTitle && isAmPm.value ? (
                    <div class="v-time-picker-clock__ampm" style={ `color: ${props.color || 'primary'}`}>
                      <span>{ t('$vuetify.timePicker.am') }</span>
                      <span>{ t('$vuetify.timePicker.pm') }</span>
                    </div>
                  ) : ''
                }
                <VTimePickerClock
                  allowedValues={
                    selecting.value === SelectingTimes.Hour
                      ? isAllowedHourCb.value
                      : (selecting.value === SelectingTimes.Minute
                        ? isAllowedMinuteCb.value
                        : isAllowedSecondCb.value)
                      }
                  color={ props.color }
                  dark={ props.dark }
                  disabled={ props.disabled }
                  double={ selecting.value === SelectingTimes.Hour && !isAmPm.value }
                  format={ selecting.value === SelectingTimes.Hour 
                    ? (isAmPm.value ? convert24to12 : (val: number) => val)
                    : (val: number) => pad(val, 2) }
                  light={ props.light }
                  max={ selecting.value === SelectingTimes.Hour ? (isAmPm.value && period.value === 'am' ? 11 : 23) : 59 }
                  min={ selecting.value === SelectingTimes.Hour && isAmPm.value && period.value === 'pm' ? 12 : 0 }
                  readonly={ props.readonly }
                  scrollable={ props.scrollable }
                  size={20}
                  step={ selecting.value === SelectingTimes.Hour ? 1 : 5 }
                  value={ selecting.value === SelectingTimes.Hour
                    ? inputHour.value
                    : (selecting.value === SelectingTimes.Minute
                      ? inputMinute.value
                      : inputSecond.value) }
                  onInput={ onInput }
                  OnChange={ onChange }
                  ref="clock"
                ></VTimePickerClock>
              </div>
            )
          }}
        >
        </VPicker>
      )
    })


  }
})

export type VTimePicker = InstanceType<typeof VTimePicker>