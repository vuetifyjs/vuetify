// Styles
import './VSwitch.sass'

// Components
import { makeVSelectionControlProps } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, PropType, Ref } from 'vue'
import { makeVInputProps } from '../VInput/VInput'
import type { LoaderSlotProps } from '@/composables/loader'
import type { GenericProps } from '@/util'

export type VSwitchTrackSlot = {
  model: Ref<boolean>
  isValid: ComputedRef<boolean | null>
}

export type VSwitchTrackSlots = {
  loader: LoaderSlotProps
  'track-false': VSwitchTrackSlot
  'track-true': VSwitchTrackSlot
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
    const model = useProxiedModel(props, 'modelValue')

    function onTrackClick (e: Event) {
      e.stopPropagation()
      e.preventDefault()
      model.value = !model.value
    }

    useRender(() => {
      const slotProps = {
        model,
        isValid: computed(() => props.isValid || null),
      }

      return (
        <div
          class={['v-switch__track', ...props.bgColor]}
          style={ props.style }
          onClick={ onTrackClick }
        >
          { slots['track-true'] && (
            <div key="prepend" class="v-switch__track-true">
              { slots['track-true'](slotProps) }
            </div>
          )}

          { slots['track-false'] && (
            <div key="append" class="v-switch__track-false">
              { slots['track-false'](slotProps) }
            </div>
          )}
        </div>
      )
    })

    return {}
  },
})

export type VSwitchTrack = InstanceType<typeof VSwitchTrack>
