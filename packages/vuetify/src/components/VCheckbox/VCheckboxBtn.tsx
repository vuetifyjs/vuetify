// Components
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { IconValue } from '@/composables/icons'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'
import type { GenericProps } from '@/util'

export const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: IconValue,
    default: '$checkboxIndeterminate',
  },

  ...makeVSelectionControlProps({
    falseIcon: '$checkboxOff',
    trueIcon: '$checkboxOn',
  }),
}, 'VCheckboxBtn')

export const VCheckboxBtn = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VSelectionControlSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VCheckboxBtn',

  props: makeVCheckboxBtnProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const model = useProxiedModel(props, 'modelValue')

    function onChange (v: any) {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    const falseIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.falseIcon
    })

    const trueIcon = computed(() => {
      return indeterminate.value
        ? props.indeterminateIcon
        : props.trueIcon
    })

    useRender(() => {
      const controlProps = omit(VSelectionControl.filterProps(props), ['modelValue'])
      return (
        <VSelectionControl
          { ...controlProps }
          v-model={ model.value }
          class={[
            'v-checkbox-btn',
            props.class,
          ]}
          style={ props.style }
          type="checkbox"
          onUpdate:modelValue={ onChange }
          falseIcon={ falseIcon.value }
          trueIcon={ trueIcon.value }
          aria-checked={ indeterminate.value ? 'mixed' : undefined }
          v-slots={ slots }
        />
      )
    })

    return {}
  },
})

export type VCheckboxBtn = InstanceType<typeof VCheckboxBtn>
