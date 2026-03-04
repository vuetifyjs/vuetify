// Styles
import './VTimePicker.sass'

// Components
import { VTimePickerClock } from './VTimePickerClock'
import { VTimePickerControls } from './VTimePickerControls'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { makeDensityProps, useDensity } from '@/composables/density'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, onMounted, ref, toRef, watch } from 'vue'
import { makeTimeValidationProps, useTimeValidation } from './useTimeValidation'
import { convert12to24, convert24to12, pad } from './util'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { Period, VTimePickerViewMode } from './shared'
import type { VPickerSlots } from '@/labs/VPicker/VPicker'

export type VTimePickerSlots = Omit<VPickerSlots, 'header'>

type Variant = 'dial' | 'input'

export const makeVTimePickerProps = propsFactory({
  disabled: Boolean,
  format: {
    type: String as PropType<'ampm' | '24hr'>,
    default: 'ampm',
  },
  viewMode: {
    type: String as PropType<VTimePickerViewMode>,
    default: 'hour',
  },
  period: {
    type: String as PropType<Period>,
    default: 'am',
    validator: (v: any) => ['am', 'pm'].includes(v),
  },
  modelValue: null as any as PropType<any>,
  readonly: Boolean,
  scrollable: Boolean,
  useSeconds: Boolean,
  variant: {
    type: String as PropType<Variant>,
    default: 'dial',
  },
  ...makeTimeValidationProps(),
  ...omit(makeVPickerProps({ title: '$vuetify.timePicker.title' }), ['landscape']),
  ...makeDensityProps(),
}, 'VTimePicker')

export const VTimePicker = genericComponent<VTimePickerSlots>()({
  name: 'VTimePicker',

  props: makeVTimePickerProps(),

  emits: {
    'update:hour': (val: number) => true,
    'update:minute': (val: number) => true,
    'update:period': (val: Period) => true,
    'update:second': (val: number) => true,
    'update:modelValue': (val: string | null) => true,
    'update:viewMode': (val: VTimePickerViewMode) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const { densityClasses } = useDensity(props)
    const inputHour = ref(null as number | null)
    const inputMinute = ref(null as number | null)
    const inputSecond = ref(null as number | null)
    const lazyInputHour = ref(null as number | null)
    const lazyInputMinute = ref(null as number | null)
    const lazyInputSecond = ref(null as number | null)
    const period = useProxiedModel(props, 'period', 'am')
    const viewMode = useProxiedModel(props, 'viewMode', 'hour')
    const controlsRef = ref<VTimePickerControls | null>(null)
    const clockRef = ref<VTimePickerClock | null>(null)

    const isAmPm = computed((): boolean => {
      return props.format === 'ampm'
    })

    const {
      isAllowedHour,
      isAllowedMinute,
      isAllowedSecond,
    } = useTimeValidation(props)

    const shouldClear = toRef(() => {
      return props.modelValue !== null &&
        inputHour.value === null &&
        inputMinute.value === null &&
        (!props.useSeconds || inputSecond.value === null)
    })

    function emitValue () {
      const value = genValue()

      if (value !== null && value !== props.modelValue) {
        emit('update:modelValue', value)
      }
      if (shouldClear.value) {
        emit('update:modelValue', null)
      }
    }

    watch(inputHour, emitValue)
    watch(inputMinute, emitValue)
    watch(inputSecond, emitValue)

    watch(() => props.modelValue, val => setInputData(val))

    watch(() => props.useSeconds, (val, old) => {
      if (old && !val && viewMode.value === 'second') {
        viewMode.value = 'minute'
      }
      if (!val && inputSecond.value !== null) {
        inputSecond.value = null
      }
    })

    onMounted(() => {
      setInputData(props.modelValue)
    })

    function genValue () {
      if (inputHour.value != null && inputMinute.value != null && (!props.useSeconds || inputSecond.value != null)) {
        return `${pad(inputHour.value)}:${pad(inputMinute.value)}` + (props.useSeconds ? `:${pad(inputSecond.value!)}` : '')
      }

      return null
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
      const pickerProps = omit(VPicker.filterProps(props), ['hideHeader'])
      const timePickerControlsProps = VTimePickerControls.filterProps(props)
      const timePickerClockProps = VTimePickerClock.filterProps(omit(props, ['format', 'modelValue', 'min', 'max']))

      const clockValidation = viewMode.value === 'hour'
        ? isAllowedHour.value
        : viewMode.value === 'minute'
          ? (v: number) => isAllowedMinute.value(inputHour.value, v)
          : (v: number) => isAllowedSecond.value(inputHour.value, inputMinute.value, v)

      return (
        <VPicker
          { ...pickerProps }
          color={ undefined }
          class={[
            'v-time-picker',
            `v-time-picker--variant-${props.variant}`,
            props.class,
            densityClasses.value,
          ]}
          hideHeader={ props.hideHeader && props.variant !== 'input' }
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
                ampm={ isAmPm.value }
                hour={ inputHour.value as number }
                minute={ inputMinute.value as number }
                period={ period.value }
                second={ inputSecond.value as number }
                viewMode={ viewMode.value }
                inputHints={ props.variant === 'input' }
                onUpdate:hour={ (val: number) => inputHour.value = val }
                onUpdate:minute={ (val: number) => inputMinute.value = val }
                onUpdate:second={ (val: number) => inputSecond.value = val }
                onUpdate:period={ (val: Period) => period.value = val }
                onUpdate:viewMode={ (value: VTimePickerViewMode) => (viewMode.value = value) }
                ref={ controlsRef }
              />
            ),
            default: () => (
              <VTimePickerClock
                { ...timePickerClockProps }
                allowedValues={ clockValidation }
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
