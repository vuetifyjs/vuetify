// Styles
import './VSwitch.sass'

// Components
import { makeVSelectionControlProps } from '@/components/VSelectionControl/VSelectionControl'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { makeVInputProps } from '../VInput/VInput'
import type { LoaderSlotProps } from '@/composables/loader'
import type { GenericProps } from '@/util'

export type VSwitchTrackSlots = {
  loader: LoaderSlotProps
  'track-false': never
  'track-true': never
}

export const makeVSwitchTrackProps = propsFactory(
  {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    bgColor: {
      type: [Array] as PropType<String[]>,
      default: [],
    },
    isValid: {
      type: [Boolean],
      default: true,
    },

    ...makeVInputProps(),
    ...makeVSelectionControlProps(),
  },
  'VSwitchTrack'
)

export const VSwitchTrack = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VSwitchTrackSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'VSwitchTrack',

  inheritAttrs: false,

  props: makeVSwitchTrackProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    function onTrackClick (e: Event) {
      e.stopPropagation()
      e.preventDefault()

      let target

      if (slots['track-true'] && slots['track-false']) {
        target = (e as any).target.parentElement.parentElement
      } else {
        target = (e as any).target.parentElement
      }

      (target.querySelector('input') as HTMLInputElement).click()
    }

    useRender(() => {
      return (
        <div
          class={['v-switch__track', ...props.bgColor]}
          style={ props.style }
          onClick={ onTrackClick }
        >
          { slots['track-true'] && (
            <div key="prepend" class="v-switch__track-true">
              { slots['track-true']() }
            </div>
          )}

          { slots['track-false'] && (
            <div key="append" class="v-switch__track-false">
              { slots['track-false']() }
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VSwitchTrack = InstanceType<typeof VSwitchTrack>
