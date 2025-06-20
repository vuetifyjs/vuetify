// Styles
import './VTimePickerControls.sass'

// Components
import { pad } from './util'
import { VTimePickerField } from './VTimePickerField'
import { VBtn } from '@/components/VBtn'

// Composables
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { ref, watch } from 'vue'
import { clamp, genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { VTimePickerViewMode } from './shared'
type Period = 'am' | 'pm'

export const makeVTimePickerControlsProps = propsFactory({
  ampm: Boolean,
  color: String,
  disabled: Boolean,
  hour: [Number, String] as PropType<number | string | null>,
  minute: [Number, String] as PropType<number | string | null>,
  second: [Number, String] as PropType<number | string | null>,
  period: String as PropType<Period>,
  readonly: Boolean,
  useSeconds: Boolean,
  value: Number,
  viewMode: String as PropType<VTimePickerViewMode>,
}, 'VTimePickerControls')

export const VTimePickerControls = genericComponent()({
  name: 'VTimePickerControls',

  props: makeVTimePickerControlsProps(),

  emits: {
    'update:period': (data: Period) => true,
    'update:viewMode': (data: VTimePickerViewMode) => true,
    'update:hour': (v: number) => true,
    'update:minute': (v: number) => true,
    'update:second': (v: number) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()

    function extractNumber (v: string): number | null {
      const digits = v.replaceAll(/\D/g, '')
      return digits.length > 0
        ? Number(digits)
        : null
    }

    const transformHours = {
      in: (v?: number | string | null) => {
        if (v == null || isNaN(Number(v))) return null
        const val = Number(v)
        return props.ampm
          ? pad((val ? ((val - 1) % 12 + 1) : 12))
          : pad(val)
      },
      out: (v: number | string | null) => {
        if (isNaN(Number(v)) || v == null || v === '') return null
        const val = typeof v === 'string' ? extractNumber(v) : Number(v)
        if (val === null) return null
        if (props.ampm && props.period === 'am' && val === 12) return 0
        if (props.ampm && props.period === 'pm') return val + 12
        return clamp(val, 0, 23)
      },
    }

    const hour: Ref<string | number | null> = useProxiedModel(props, 'hour', undefined, transformHours.in, transformHours.out)

    const transformMinutesOrSeconds = {
      in: (v?: number | string | null) => v != null && !isNaN(Number(v)) ? pad(`${v}`) : null,
      out: (v: number | string | null) => {
        if (isNaN(Number(v)) || v == null || v === '') return null
        const val = typeof v === 'string' ? extractNumber(v) : Number(v)
        return val !== null
          ? clamp(val, 0, 59)
          : null
      },
    }

    const minute: Ref<string | number | null> = useProxiedModel(
      props,
      'minute',
      undefined,
      transformMinutesOrSeconds.in,
      transformMinutesOrSeconds.out,
    )

    const second: Ref<string | number | null> = useProxiedModel(
      props,
      'second',
      undefined,
      transformMinutesOrSeconds.in,
      transformMinutesOrSeconds.out,
    )

    function onHourFieldKeydown (e: KeyboardEvent) {
      if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return
      e.preventDefault()
      e.stopPropagation()
      const increment = e.key === 'ArrowUp' ? 1 : -1
      if (props.ampm && hour.value === '12' && increment < 0) return
      if (props.ampm && hour.value === '11' && increment > 0) return
      hour.value = hour.value ? clamp(Number(hour.value) + increment, 0, 23) : 0
    }

    function onMinuteFieldKeydown (e: KeyboardEvent) {
      if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return
      e.preventDefault()
      e.stopPropagation()
      const increment = e.key === 'ArrowUp' ? 1 : -1
      minute.value = minute.value ? clamp(Number(minute.value) + increment, 0, 59) : 0
    }

    function onSecondFieldKeydown (e: KeyboardEvent) {
      if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return
      e.preventDefault()
      e.stopPropagation()
      const increment = e.key === 'ArrowUp' ? 1 : -1
      second.value = second.value ? clamp(Number(second.value) + increment, 0, 59) : 0
    }

    function createInputInterceptor (
      valueTransformOut: (v: string) => number | null,
      compare: (v: number | null) => boolean,
      apply: (v: string) => void,
    ) {
      return (e: InputEvent) => {
        if (!e.data) return
        const inputElement = e.target as HTMLInputElement
        const { value: existingTxt, selectionStart, selectionEnd } = inputElement ?? {}

        if (extractNumber(e.data) === null) {
          e.preventDefault()
          return
        }

        const potentialNewInputVal =
          existingTxt
            ? existingTxt.slice(0, selectionStart as number | undefined) + e.data + existingTxt.slice(selectionEnd as number | undefined)
            : e.data

        if (potentialNewInputVal.length > 2) {
          if (selectionStart === selectionEnd && selectionEnd === 0 && e.data.trim().startsWith('0')) {
            e.preventDefault()
            inputElement!.value = potentialNewInputVal.trim().substring(0, 2)
            apply(inputElement!.value)
            if (e.data.trim().length === 1) {
              inputElement!.setSelectionRange(1, 1)
            }
            return
          }
          if (selectionStart === selectionEnd && selectionEnd === 1 && existingTxt.startsWith('0')) {
            e.preventDefault()
            inputElement!.value = potentialNewInputVal.trim().substring(0, 2)
            apply(inputElement!.value)
            return
          }

          const maxValue = props.viewMode === 'hour' ? (props.ampm ? 12 : 23) : 59
          const value = extractNumber(potentialNewInputVal)!
          if (value > maxValue) {
            e.preventDefault()
            inputElement!.value = pad(String(extractNumber(e.data)).substring(0, 2))
            apply(inputElement!.value)
            return
          }
        }

        const potentialNewNumber = valueTransformOut(potentialNewInputVal)
        if (compare(potentialNewNumber)) {
          // ignore input when results in the same number
          // prevents typing more digits
          e.preventDefault()
        }
      }
    }

    const hourInputRef = ref<VTimePickerField>()
    const minuteInputRef = ref<VTimePickerField>()
    const secondInputRef = ref<VTimePickerField>()

    watch(() => props.viewMode, (_, old) => {
      switch (old) {
        case 'hour': hourInputRef.value!.blur(); break
        case 'minute': minuteInputRef.value!.blur(); break
        case 'second': secondInputRef.value!.blur(); break
      }
    })

    const hourInputFilter = createInputInterceptor(
      transformHours.out,
      (v: number | null) => transformHours.in(v) === hour.value,
      (v: string) => hour.value = v,
    )

    const minuteInputFilter = createInputInterceptor(
      transformMinutesOrSeconds.out,
      (v: number | null) => transformMinutesOrSeconds.in(v) === minute.value,
      (v: string) => minute.value = v,
    )

    const secondInputFilter = createInputInterceptor(
      transformMinutesOrSeconds.out,
      (v: number | null) => transformMinutesOrSeconds.in(v) === second.value,
      (v: string) => second.value = v,
    )

    useRender(() => {
      return (
        <div class="v-time-picker-controls">
          <div
            class={{
              'v-time-picker-controls__time': true,
              'v-time-picker-controls__time--with-ampm': props.ampm,
              'v-time-picker-controls__time--with-seconds': props.useSeconds,
            }}
          >
            <VTimePickerField
              ref={ hourInputRef }
              active={ props.viewMode === 'hour' }
              color={ props.color }
              disabled={ props.disabled }
              label={ t('$vuetify.timePicker.hour') }
              modelValue={ hour.value }
              onUpdate:modelValue={ v => hour.value = v }
              onKeydown={ onHourFieldKeydown }
              onBeforeinput={ hourInputFilter }
              onFocus={ () => emit('update:viewMode', 'hour') }
            />

            <span class="v-time-picker-controls__time__separator">:</span>

            <VTimePickerField
              ref={ minuteInputRef }
              active={ props.viewMode === 'minute' }
              color={ props.color }
              disabled={ props.disabled }
              label={ t('$vuetify.timePicker.minute') }
              modelValue={ minute.value }
              onUpdate:modelValue={ v => minute.value = v }
              onKeydown={ onMinuteFieldKeydown }
              onBeforeinput={ minuteInputFilter }
              onFocus={ () => emit('update:viewMode', 'minute') }
            />

            { props.useSeconds && (
              <span key="secondsDivider" class="v-time-picker-controls__time__separator">:</span>
            )}

            { props.useSeconds && (
              <VTimePickerField
                key="secondsVal"
                ref={ secondInputRef }
                active={ props.viewMode === 'second' }
                color={ props.color }
                disabled={ props.disabled }
                label={ t('$vuetify.timePicker.second') }
                modelValue={ second.value }
                onUpdate:modelValue={ v => second.value = v }
                onKeydown={ onSecondFieldKeydown }
                onBeforeinput={ secondInputFilter }
                onFocus={ () => emit('update:viewMode', 'second') }
              />
            )}

            { props.ampm && (
              <div class="v-time-picker-controls__ampm">
                <VBtn
                  active={ props.period === 'am' }
                  color={ props.period === 'am' ? props.color : undefined }
                  class={{
                    'v-time-picker-controls__ampm__am': true,
                    'v-time-picker-controls__ampm__btn': true,
                    'v-time-picker-controls__ampm__btn__active': props.period === 'am',
                  }}
                  disabled={ props.disabled }
                  text={ t('$vuetify.timePicker.am') }
                  variant={ props.disabled && props.period === 'am' ? 'elevated' : 'tonal' }
                  onClick={ () => props.period !== 'am' ? emit('update:period', 'am') : null }
                />

                <VBtn
                  active={ props.period === 'pm' }
                  color={ props.period === 'pm' ? props.color : undefined }
                  class={{
                    'v-time-picker-controls__ampm__pm': true,
                    'v-time-picker-controls__ampm__btn': true,
                    'v-time-picker-controls__ampm__btn__active': props.period === 'pm',
                  }}
                  disabled={ props.disabled }
                  text={ t('$vuetify.timePicker.pm') }
                  variant={ props.disabled && props.period === 'pm' ? 'elevated' : 'tonal' }
                  onClick={ () => props.period !== 'pm' ? emit('update:period', 'pm') : null }
                />
              </div>
            )}
          </div>
        </div>
      )
    })

    return {}
  },
})

export type VTimePickerControls = InstanceType<typeof VTimePickerControls>
