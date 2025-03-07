// Styles
import './VTimePicker.sass'

// Components
import { pad } from './util'
import { VTimePickerClock } from './VTimePickerClock'
import { VTimePickerControls } from './VTimePickerControls'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onMounted, ref, watch } from 'vue'
import { createRange, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTimePickerViewMode } from './shared'
import type { VPickerSlots } from '@/labs/VPicker/VPicker'

type Period = 'am' | 'pm'
type AllowFunction = (val: number) => boolean

const rangeHours24 = createRange(24)
const rangeHours12am = createRange(12)
const rangeHours12pm = rangeHours12am.map(v => v + 12)
const range60 = createRange(60)

export type VTimePickerSlots = Omit<VPickerSlots, 'header'>

export const makeVTimePickerProps = propsFactory({
  allowedHours: [Function, Array] as PropType<AllowFunction | number[]>,
  allowedMinutes: [Function, Array] as PropType<AllowFunction | number[]>,
  allowedSeconds: [Function, Array] as PropType<AllowFunction | number[]>,
  ampmInTitle: Boolean,
  disabled: Boolean,
  format: {
    type: String as PropType<'ampm' | '24hr'>,
    default: 'ampm',
  },
  max: String,
  min: String,
  viewMode: {
    type: String as PropType<VTimePickerViewMode>,
    default: 'hour',
  },
  modelValue: null as any as PropType<any>,
  readonly: Boolean,
  scrollable: Boolean,
  useSeconds: Boolean,
  ...omit(makeVPickerProps({ title: '$vuetify.timePicker.title' }), ['landscape']),
}, 'VTimePicker')

export const VTimePicker = genericComponent<VTimePickerSlots>()({
  name: 'VTimePicker',

  props: makeVTimePickerProps(),

  emits: {
    'update:hour': (val: number) => true,
    'update:minute': (val: number) => true,
    'update:period': (val: Period) => true,
    'update:second': (val: number) => true,
    'update:modelValue': (val: string) => true,
    'update:viewMode': (val: VTimePickerViewMode) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const inputHour = ref(null as number | null)
    const inputMinute = ref(null as number | null)
    const inputSecond = ref(null as number | null)
    const lazyInputHour = ref(null as number | null)
    const lazyInputMinute = ref(null as number | null)
    const lazyInputSecond = ref(null as number | null)
    const period = ref('am' as Period)
    const viewMode = useProxiedModel(props, 'viewMode', 'hour')
    const controlsRef = ref<VTimePickerControls | null>(null)
    const clockRef = ref<VTimePickerClock | null>(null)

    const isAllowedHourCb = computed((): AllowFunction => {
      let cb: AllowFunction

      if (props.allowedHours instanceof Array) {
        cb = (val: number) => (props.allowedHours as number[]).includes(val)
      } else {
        cb = props.allowedHours as AllowFunction
      }

      if (!props.min && !props.max) return cb

      const minHour = props.min ? Number(props.min.split(':')[0]) : 0
      const maxHour = props.max ? Number(props.max.split(':')[0]) : 23

      return (val: number) => {
        return val >= Number(minHour) &&
          val <= Number(maxHour) &&
          (!cb || cb(val))
      }
    })

    const isAllowedMinuteCb = computed((): AllowFunction => {
      let cb: AllowFunction

      const isHourAllowed = !isAllowedHourCb.value || inputHour.value === null || isAllowedHourCb.value(inputHour.value)
      if (props.allowedMinutes instanceof Array) {
        cb = (val: number) => (props.allowedMinutes as number[]).includes(val)
      } else {
        cb = props.allowedMinutes as AllowFunction
      }

      if (!props.min && !props.max) {
        return isHourAllowed ? cb : () => false
      }

      const [minHour, minMinute] = props.min ? props.min.split(':').map(Number) : [0, 0]
      const [maxHour, maxMinute] = props.max ? props.max.split(':').map(Number) : [23, 59]
      const minTime = minHour * 60 + Number(minMinute)
      const maxTime = maxHour * 60 + Number(maxMinute)

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
        cb = props.allowedSeconds as AllowFunction
      }

      if (!props.min && !props.max) {
        return isMinuteAllowed ? cb : () => false
      }

      const [minHour, minMinute, minSecond] = props.min ? props.min.split(':').map(Number) : [0, 0, 0]
      const [maxHour, maxMinute, maxSecond] = props.max ? props.max.split(':').map(Number) : [23, 59, 59]
      const minTime = minHour * 3600 + minMinute * 60 + Number(minSecond || 0)
      const maxTime = maxHour * 3600 + maxMinute * 60 + Number(maxSecond || 0)

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

    watch(() => props.modelValue, val => setInputData(val))

    onMounted(() => {
      setInputData(props.modelValue)
    })

    function genValue () {
      if (inputHour.value != null && inputMinute.value != null && (!props.useSeconds || inputSecond.value != null)) {
        return `${pad(inputHour.value)}:${pad(inputMinute.value)}` + (props.useSeconds ? `:${pad(inputSecond.value!)}` : '')
      }

      return null
    }

    function emitValue () {
      const value = genValue()
      if (value !== null) emit('update:modelValue', value)
    }

    function convert24to12 (hour: number) {
      return hour ? ((hour - 1) % 12 + 1) : 12
    }

    function convert12to24 (hour: number, period: Period) {
      return hour % 12 + (period === 'pm' ? 12 : 0)
    }

    function setInputData (value: string | null | Date) {
      if (value == null || value === '') {
        inputHour.value = null
        inputMinute.value = null
        inputSecond.value = null
      } else if (value instanceof Date) {
        inputHour.value = value.getHours()
        inputMinute.value = value.getMinutes()
        inputSecond.value = value.getSeconds()
      } else {
        const [hour, , minute, , second, period] = value.trim().toLowerCase().match(/^(\d+):(\d+)(:(\d+))?([ap]m)?$/) || new Array(6)

        inputHour.value = period ? convert12to24(parseInt(hour, 10), period as Period) : parseInt(hour, 10)
        inputMinute.value = parseInt(minute, 10)
        inputSecond.value = parseInt(second || 0, 10)
      }

      period.value = (inputHour.value == null || inputHour.value < 12) ? 'am' : 'pm'
    }

    function firstAllowed (type: VTimePickerViewMode, value: number) {
      const allowedFn = type === 'hour' ? isAllowedHourCb.value : (type === 'minute' ? isAllowedMinuteCb.value : isAllowedSecondCb.value)
      if (!allowedFn) return value

      // TODO: clean up (Note from V2 code)
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

    function setPeriod (val: Period) {
      period.value = val
      if (inputHour.value != null) {
        const newHour = inputHour.value! + (period.value === 'am' ? -12 : 12)
        inputHour.value = firstAllowed('hour', newHour)
      }
      emit('update:period', val)
      emitValue()
      return true
    }

    function onInput (value: number) {
      if (viewMode.value === 'hour') {
        inputHour.value = isAmPm.value ? convert12to24(value, period.value) : value
      } else if (viewMode.value === 'minute') {
        inputMinute.value = value
      } else {
        inputSecond.value = value
      }
    }

    function onChange (value: number) {
      switch (viewMode.value || 'hour') {
        case 'hour':
          emit('update:hour', value)
          break
        case 'minute':
          emit('update:minute', value)
          break
        case 'second':
          emit('update:second', value)
          break
        default:
          break
      }

      const emitChange = inputHour.value !== null && inputMinute.value !== null && (props.useSeconds ? inputSecond.value !== null : true)
      if (viewMode.value === 'hour') {
        viewMode.value = 'minute'
      } else if (props.useSeconds && viewMode.value === 'minute') {
        viewMode.value = 'second'
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

      emitChange && emitValue()
    }

    useRender(() => {
      const pickerProps = VPicker.filterProps(props)
      const timePickerControlsProps = VTimePickerControls.filterProps(props)
      const timePickerClockProps = VTimePickerClock.filterProps(omit(props, ['format', 'modelValue', 'min', 'max']))

      return (
        <VPicker
          { ...pickerProps }
          color={ undefined }
          class={[
            'v-time-picker',
            props.class,
          ]}
          style={ props.style }
          v-slots={{
            title: () => slots.title?.() ?? (
              <div class="v-time-picker__title">
                { t(props.title) }
              </div>
            ),
            header: () => (
              <VTimePickerControls
                { ...timePickerControlsProps }
                ampm={ isAmPm.value || props.ampmInTitle }
                ampmReadonly={ isAmPm.value && !props.ampmInTitle }
                hour={ inputHour.value as number }
                minute={ inputMinute.value as number }
                period={ period.value }
                second={ inputSecond.value as number }
                viewMode={ viewMode.value }
                onUpdate:period={ (val: Period) => setPeriod(val) }
                onUpdate:viewMode={ (value: VTimePickerViewMode) => (viewMode.value = value) }
                ref={ controlsRef }
              />
            ),
            default: () => (
              <VTimePickerClock
                { ...timePickerClockProps }
                allowedValues={
                  viewMode.value === 'hour'
                    ? isAllowedHourCb.value
                    : (viewMode.value === 'minute'
                      ? isAllowedMinuteCb.value
                      : isAllowedSecondCb.value)
                    }
                double={ viewMode.value === 'hour' && !isAmPm.value }
                format={ viewMode.value === 'hour'
                  ? (isAmPm.value ? convert24to12 : (val: number) => val)
                  : (val: number) => pad(val, 2)
                }
                max={ viewMode.value === 'hour' ? (isAmPm.value && period.value === 'am' ? 11 : 23) : 59 }
                min={ viewMode.value === 'hour' && isAmPm.value && period.value === 'pm' ? 12 : 0 }
                size={ 20 }
                step={ viewMode.value === 'hour' ? 1 : 5 }
                modelValue={ viewMode.value === 'hour'
                  ? inputHour.value as number
                  : (viewMode.value === 'minute'
                    ? inputMinute.value as number
                    : inputSecond.value as number)
                }
                onChange={ onChange }
                onInput={ onInput }
                ref={ clockRef }
              />
            ),
            actions: slots.actions,
          }}
        />
      )
    })
  },
})

export type VTimePicker = InstanceType<typeof VTimePicker>
