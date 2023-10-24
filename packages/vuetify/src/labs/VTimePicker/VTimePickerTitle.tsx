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
          <div class="v-time-picker-title__time">
            <v-btn variant="flat" onClick={ () => emit('update:selecting', SelectingTimes.Hour) }>{ props.hour == null ? '--' : props.ampm ? String(hour) : pad(hour) }</v-btn>
            <v-btn disabled={true}>:</v-btn>
            <v-btn variant="flat" onClick={ () => emit('update:selecting', SelectingTimes.Minute) }>{ props.minute == null ? '--' : pad(props.minute) }</v-btn>
            {
              props.useSeconds && (
                <template>
                  <span>:</span>
                  <v-btn variant="flat" onClick={ emit('update:selecting', SelectingTimes.Second) }>{ props.second == null ? '--' : pad(props.second) }</v-btn>
                </template>
              )
            }
            {
              props.ampm && (
                <div
                  class={['v-time-picker-title__ampm', {
                    'v-time-picker-title__ampm--readonly': props.ampmReadonly,
                  }]}
                >
                  { (!props.ampmReadonly || props.period === 'am') ?<span>{ t('$vuetify.timePicker.am') }</span> : '' }
                  { (!props.ampmReadonly || props.period === 'pm') ? <span>{ t('$vuetify.timePicker.pm') }</span> : '' }
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