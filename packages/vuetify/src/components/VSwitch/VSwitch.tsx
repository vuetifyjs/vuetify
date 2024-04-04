// Styles
import './VSwitch.sass'

// Components
import { makeVSwitchBtnProps, VSwitchBtn } from './VSwitchBtn'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'

// Composables
import { useFocus } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed } from 'vue'
import { filterInputAttrs, genericComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'
import type { IconValue } from '@/composables/icons'
import type { LoaderSlotProps } from '@/composables/loader'
import type { GenericProps } from '@/util'

export type VSwitchSlot = {
  model: Ref<boolean>
  isValid: ComputedRef<boolean | null>
}

export type VSwitchSlots =
  & VInputSlots
  & VSelectionControlSlots
  & {
    loader: LoaderSlotProps
    thumb: { icon: IconValue | undefined } & VSwitchSlot
    'track-false': VSwitchSlot
    'track-true': VSwitchSlot
  }

export const makeVSwitchProps = propsFactory({
  ...makeVInputProps(),
  ...makeVSwitchBtnProps(),
}, 'VSwitch')

export const VSwitch = genericComponent<new <T>(
  props: {
    modelValue?: T | null
    'onUpdate:modelValue'?: (value: T | null) => void
  },
  slots: VSwitchSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSwitch',

  inheritAttrs: false,

  props: makeVSwitchProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const { isFocused, focus, blur } = useFocus(props)

    const uid = getUid()
    const id = computed(() => props.id || `switch-${uid}`)

    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
      const inputProps = VInput.filterProps(props)
      const switchProps = VSwitchBtn.filterProps(props)

      return (
        <VInput
          class={[
            'v-switch',
            props.class,
          ]}
          { ...rootAttrs }
          { ...inputProps }
          v-model={ model.value }
          id={ id.value }
          focused={ isFocused.value }
          style={ props.style }
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
              isValid,
            }) => (
              <VSwitchBtn
                { ...switchProps }
                id={ id.value }
                aria-describedby={ messagesId.value }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                { ...controlAttrs }
                error={ isValid.value === false }
                v-model={ model.value }
                onFocus={ focus }
                onBlur={ blur }
                v-slots={ slots }
              />
            ),
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VSwitch = InstanceType<typeof VSwitch>
