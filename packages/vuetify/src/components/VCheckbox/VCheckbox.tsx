// Styles
import './VCheckbox.sass'

// Components
import type { VInputSlots } from '@/components/VInput/VInput'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { filterCheckboxBtnProps, makeVCheckboxBtnProps, VCheckboxBtn } from './VCheckboxBtn'

// Composables
import { useFocus } from '@/composables/focus'

// Utilities
import { computed } from 'vue'
import { filterInputAttrs, genericComponent, getUid, useRender } from '@/util'

// Types
import type { VSelectionControlSlots } from '../VSelectionControl/VSelectionControl'

export type VCheckboxSlots = VInputSlots & VSelectionControlSlots

export const VCheckbox = genericComponent<VCheckboxSlots>()({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: {
    ...makeVInputProps(),
    ...makeVCheckboxBtnProps(),
  },

  emits: {
    'update:focused': (focused: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const { isFocused, focus, blur } = useFocus(props)

    const uid = getUid()
    const id = computed(() => props.id || `checkbox-${uid}`)

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs)
      const [inputProps, _1] = filterInputProps(props)
      const [checkboxProps, _2] = filterCheckboxBtnProps(props)

      return (
        <VInput
          class="v-checkbox"
          { ...inputAttrs }
          { ...inputProps }
          id={ id.value }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
            }) => (
              <VCheckboxBtn
                { ...checkboxProps }
                id={ id.value }
                aria-describedby={ messagesId.value }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                { ...controlAttrs }
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

export type VCheckbox = InstanceType<typeof VCheckbox>
