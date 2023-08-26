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

  setup (props, { slots }) {
    const { t } = useLocale()

    useRender(() => {
      let hour = props.hour
      if (props.ampm) {
        hour = hour ? ((hour - 1) % 12 + 1) : 12
      }
      return (
        <div class="v-time-picker-title">
          <div class="v-time-picker-title__time">
            <span>{ props.hour == null ? '--' : props.ampm ? String(hour) : pad(hour) }</span>
            <span>:</span>
            <span>{ props.minute == null ? '--' : pad(props.minute) }</span>
            {
              props.useSeconds && (
                <template>
                  <span>:</span>
                  <span>{ props.second == null ? '--' : pad(props.second) }</span>
                </template>
              )
            }
            {
              props.ampm && (
                <div
                  class={['v-time-picker-title__ampm', {
                    'v-time-picker-title__ampm--readonly': this.ampmReadonly,
                  }]}
                >
                  { (!this.ampmReadonly || this.period === 'am') ?<span>{ t('$vuetify.timePicker.am') }</span> : '' }
                  { (!this.ampmReadonly || this.period === 'pm') ? <span>{ t('$vuetify.timePicker.pm') }</span> : '' }
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