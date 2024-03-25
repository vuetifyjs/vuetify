// Styles
import './VTimePickerControls.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { pad } from '@/components/VDatePicker/util'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import { SelectingTimes } from './SelectingTimes'
type Period = 'am' | 'pm'

export const makeVTimePickerControlsProps = propsFactory({
  ampm: Boolean,
  ampmReadonly: Boolean,
  color: String,
  disabled: Boolean,
  hour: Number,
  minute: Number,
  second: Number,
  period: String,
  readonly: Boolean,
  useSeconds: Boolean,
  selecting: Number,
  value: Number,
}, 'VTimePickerControls')

export const VTimePickerControls = genericComponent()({
  name: 'VTimePickerControls',

  props: makeVTimePickerControlsProps(),

  emits: {
    'update:period': (data: Period) => data,
    'update:selecting': (data: 1 | 2 | 3) => data,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()

    useRender(() => {
      let hour = props.hour
      if (props.ampm) {
        hour = hour ? ((hour - 1) % 12 + 1) : 12
      }
      return (
        <div class="v-time-picker-title">
          <div
            class={{ 'v-time-picker-title__time': true, 'v-time-picker-title__time--with-seconds': props.useSeconds }}
          >
            <VBtn
              variant="tonal"
              onClick={ () => emit('update:selecting', SelectingTimes.Hour) }
              class={{
                'v-time-picker-title__time__btn': true,
                'v-time-picker-title__time__btn__active': props.selecting === 1,
                'v-time-picker-title__time--with-seconds__btn': props.useSeconds,
              }}
            >
              { props.hour == null ? '--' : pad(`${hour}`) }
            </VBtn>
            <span class="v-time-picker-title__time__separator">:</span>
            <VBtn
              variant="tonal"
              onClick={ () => emit('update:selecting', SelectingTimes.Minute) }
              class={{
                'v-time-picker-title__time__btn': true,
                'v-time-picker-title__time__btn__active': props.selecting === 2,
                'v-time-picker-title__time--with-seconds__btn': props.useSeconds,
              }}
            >
              { props.minute == null ? '--' : pad(props.minute) }
            </VBtn>
            {
              props.useSeconds && (
                <span class="v-time-picker-title__time__btn" key="secondsDivider">:</span>
              )
            }
            {
              props.useSeconds && (
                <VBtn
                  key="secondsVal"
                  variant="tonal"
                  onClick={ () => emit('update:selecting', SelectingTimes.Second) }
                  class={{
                    'v-time-picker-title__time__btn': true,
                    'v-time-picker-title__time__btn__active': props.selecting === 3,
                    'v-time-picker-title__time--with-seconds__btn': props.useSeconds,
                  }}
                >
                  { props.second == null ? '--' : pad(props.second) }
                </VBtn>
              )
            }
            {
              props.ampm && (
                <div
                  class={['v-time-picker-title__ampm', {
                    'v-time-picker-title__ampm--readonly': props.ampmReadonly,
                  }]}
                >
                  <VBtn
                    variant="tonal"
                    onClick={ () => emit('update:period', 'am') }
                    class={{
                      'v-time-picker-title__ampm__am': true,
                      'v-time-picker-title__ampm__btn': true,
                      'v-time-picker-title__ampm__btn__active': props.period === 'am',
                    }}
                  >
                    { t('$vuetify.timePicker.am') }
                  </VBtn>
                  <VBtn
                    variant="tonal"
                    onClick={ () => emit('update:period', 'pm') }
                    class={{
                      'v-time-picker-title__ampm__pm': true,
                      'v-time-picker-title__ampm__btn': true,
                      'v-time-picker-title__ampm__btn__active': props.period === 'pm',
                    }}
                  >
                    { t('$vuetify.timePicker.pm') }
                  </VBtn>
                </div>
              )
            }
          </div>
        </div>
      )
    })

    return {}
  },

})

export type VTimePickerControls = InstanceType<typeof VTimePickerControls>
