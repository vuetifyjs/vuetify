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
        <div class="v-time-picker-controls">
          <div
            class={{
              'v-time-picker-controls__time': true,
              'v-time-picker-controls__time--with-seconds': props.useSeconds,
            }}
          >
            <VBtn
              active={ props.selecting === 1 }
              color={ props.selecting === 1 ? props.color : undefined }
              variant="tonal"
              class={{
                'v-time-picker-controls__time__btn': true,
                'v-time-picker-controls__time--with-ampm__btn': props.ampm,
                'v-time-picker-controls__time--with-seconds__btn': props.useSeconds,
              }}
              text={ props.hour == null ? '--' : pad(`${hour}`) }
              onClick={ () => emit('update:selecting', SelectingTimes.Hour) }
            />

            <span
              class={[
                'v-time-picker-controls__time__separator',
                { 'v-time-picker-controls--with-seconds__time__separator': props.useSeconds },
              ]}
            >:</span>

            <VBtn
              active={ props.selecting === 2 }
              color={ props.selecting === 2 ? props.color : undefined }
              class={{
                'v-time-picker-controls__time__btn': true,
                'v-time-picker-controls__time__btn__active': props.selecting === 2,
                'v-time-picker-controls__time--with-ampm__btn': props.ampm,
                'v-time-picker-controls__time--with-seconds__btn': props.useSeconds,
              }}
              variant="tonal"
              text={ props.minute == null ? '--' : pad(props.minute) }
              onClick={ () => emit('update:selecting', SelectingTimes.Minute) }
            />

            {
              props.useSeconds && (
                <span
                  class={[
                    'v-time-picker-controls__time__separator',
                    { 'v-time-picker-controls--with-seconds__time__separator': props.useSeconds },
                  ]}
                  key="secondsDivider"
                >:</span>
              )
            }

            {
              props.useSeconds && (
                <VBtn
                  key="secondsVal"
                  variant="tonal"
                  onClick={ () => emit('update:selecting', SelectingTimes.Second) }
                  class={{
                    'v-time-picker-controls__time__btn': true,
                    'v-time-picker-controls__time__btn__active': props.selecting === 3,
                    'v-time-picker-controls__time--with-seconds__btn': props.useSeconds,
                  }}
                  text={ props.second == null ? '--' : pad(props.second) }
                />
              )
            }

            {
              props.ampm && (
                <div
                  class={['v-time-picker-controls__ampm', {
                    'v-time-picker-controls__ampm--readonly': props.ampmReadonly,
                  }]}
                >
                  <VBtn
                    active={ props.period === 'am' }
                    color={ props.period === 'am' ? props.color : undefined }
                    class={{
                      'v-time-picker-controls__ampm__am': true,
                      'v-time-picker-controls__ampm__btn': true,
                      'v-time-picker-controls__ampm__btn__active': props.period === 'am',
                    }}
                    text={ t('$vuetify.timePicker.am') }
                    variant="tonal"
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
                    text={ t('$vuetify.timePicker.pm') }
                    variant="tonal"
                    onClick={ () => props.period !== 'pm' ? emit('update:period', 'pm') : null }
                  />
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
