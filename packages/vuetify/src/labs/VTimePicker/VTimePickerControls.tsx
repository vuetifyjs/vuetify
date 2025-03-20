// Styles
import './VTimePickerControls.sass'

// Components
import { pad } from './util'
import { VBtn } from '@/components/VBtn'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTimePickerViewMode } from './shared'
type Period = 'am' | 'pm'

export const makeVTimePickerControlsProps = propsFactory({
  ampm: Boolean,
  ampmInTitle: Boolean,
  ampmReadonly: Boolean,
  color: String,
  disabled: Boolean,
  hour: Number,
  minute: Number,
  second: Number,
  period: String,
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
              active={ props.viewMode === 'hour' }
              color={ props.viewMode === 'hour' ? props.color : undefined }
              disabled={ props.disabled }
              variant="tonal"
              class={{
                'v-time-picker-controls__time__btn': true,
                'v-time-picker-controls__time--with-ampm__btn': props.ampm,
                'v-time-picker-controls__time--with-seconds__btn': props.useSeconds,
              }}
              text={ props.hour == null ? '--' : pad(`${hour}`) }
              onClick={ () => emit('update:viewMode', 'hour') }
            />

            <span
              class={[
                'v-time-picker-controls__time__separator',
                { 'v-time-picker-controls--with-seconds__time__separator': props.useSeconds },
              ]}
            >:</span>

            <VBtn
              active={ props.viewMode === 'minute' }
              color={ props.viewMode === 'minute' ? props.color : undefined }
              class={{
                'v-time-picker-controls__time__btn': true,
                'v-time-picker-controls__time__btn__active': props.viewMode === 'minute',
                'v-time-picker-controls__time--with-ampm__btn': props.ampm,
                'v-time-picker-controls__time--with-seconds__btn': props.useSeconds,
              }}
              disabled={ props.disabled }
              variant="tonal"
              text={ props.minute == null ? '--' : pad(props.minute) }
              onClick={ () => emit('update:viewMode', 'minute') }
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
                  active={ props.viewMode === 'second' }
                  color={ props.viewMode === 'second' ? props.color : undefined }
                  variant="tonal"
                  onClick={ () => emit('update:viewMode', 'second') }
                  class={{
                    'v-time-picker-controls__time__btn': true,
                    'v-time-picker-controls__time__btn__active': props.viewMode === 'second',
                    'v-time-picker-controls__time--with-seconds__btn': props.useSeconds,
                  }}
                  disabled={ props.disabled }
                  text={ props.second == null ? '--' : pad(props.second) }
                />
              )
            }

            {
              props.ampm && props.ampmInTitle && (
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
