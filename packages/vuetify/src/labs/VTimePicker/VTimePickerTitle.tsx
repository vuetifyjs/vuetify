// @ts-nocheck
/* eslint-disable */

import './VTimePickerTitle.sass'

// Mixins
// import PickerButton from '../../mixins/picker-button'

// Utils
import { pad } from '../VDatePicker/util'
// import mixins from '../../util/mixins'

import { SelectingTimes } from './SelectingTimes'
// import { VNode, PropType } from 'vue'

// Composables
import { useLocale } from '@/composables/locale'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVTimePickerTitleProps = propsFactory({
  ampm: Boolean,
  ampmReadonly: Boolean,
  color: String,
  disabled: Boolean,
  hour: Number,
  minute: Number,
  second: Number,
  period: {
    type: String as PropType<'am' | 'pm'>,
    validator: period => period === 'am' || period === 'pm',
  },
  readonly: Boolean,
  useSeconds: Boolean,
  selecting: Number,
}, 'VTimePickerTitle')

export const VTimePickerTitle = genericComponent()({
  name: 'VTimePickerTitle',

  props: makeVTimePickerTitleProps(),

  emits: [
    'update:period',
    'update:selecting',
  ],

  setup (props, { emit, slots }) {
    const { t } = useLocale()

    useRender(() => {
      let hour = props.hour
      if (props.ampm) {
        hour = hour ? ((hour - 1) % 12 + 1) : 12
      }
      return (
        <div class="v-time-picker-title">
          <div class="v-time-picker-title__text" style="width: 100%">
            { t('$vuetify.timePicker.select') }
          </div>
          <div
            class="v-time-picker-title__time"
            class={{ 'v-time-picker-title__time--with-seconds': props.useSeconds }}
          >
            <v-btn
              variant="tonal"
              onClick={ () => emit('update:selecting', SelectingTimes.Hour) }
              class="v-time-picker-title__time__btn"
              class={{ 
                'v-time-picker-title__time__btn__active': props.selecting === 1,
                'v-time-picker-title__time--with-seconds__btn': props.useSeconds
              }}
            >
              { props.hour == null ? '--' : pad(hour) }
            </v-btn>
            <span class="v-time-picker-title__time__btn">:</span>
            <v-btn
              variant="tonal"
              onClick={ () => emit('update:selecting', SelectingTimes.Minute) }
              class="v-time-picker-title__time__btn"
              class={{
                'v-time-picker-title__time__btn__active': props.selecting === 2,
                'v-time-picker-title__time--with-seconds__btn': props.useSeconds
              }}
            >
              { props.minute == null ? '--' : pad(props.minute) }
            </v-btn>
            {
              props.useSeconds && (
                <span class="v-time-picker-title__time__btn">:</span>
              )
            }
            {
              props.useSeconds && (
                <v-btn
                  variant="tonal"
                  onClick={ () => emit('update:selecting', SelectingTimes.Second) }
                  class="v-time-picker-title__time__btn"
                  class={{
                    'v-time-picker-title__time__btn__active': props.selecting === 3,
                    'v-time-picker-title__time--with-seconds__btn': props.useSeconds
                  }}
                >
                  { props.second == null ? '--' : pad(props.second) }
                </v-btn>
              )
            }
            {
              props.ampm && (
                <div
                  class={['v-time-picker-title__ampm', {
                    'v-time-picker-title__ampm--readonly': props.ampmReadonly,
                  }]}
                >
                  <v-btn
                    variant="tonal"
                    onClick={ () => emit('update:period', 'am') }
                    class="v-time-picker-title__ampm__btn"
                    class={{ 'v-time-picker-title__ampm__btn__active': props.period === 'am' }}
                  >
                    { t('$vuetify.timePicker.am') }
                  </v-btn>
                  <v-btn
                    variant="tonal"
                    onClick={ () => emit('update:period', 'pm') }
                    class="v-time-picker-title__ampm__btn"
                    class={{ 'v-time-picker-title__ampm__btn__active': props.period === 'pm' }}
                  >
                    { t('$vuetify.timePicker.pm') }
                  </v-btn>
                </div>
              )
            }
          </div>
        </div>
      )
    })
  }
})

export type VTimePickerTitle = InstanceType<typeof VTimePickerTitle>