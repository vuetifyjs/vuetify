// Styles
import './VCheckbox.sass'

// Components
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { filterCheckboxBtnProps, makeVCheckboxBtnProps, VCheckboxBtn } from './VCheckboxBtn'

// Utilities
import { computed } from 'vue'
import { defineComponent, filterInputAttrs, getUid, useRender } from '@/util'

export const VCheckbox = defineComponent({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: {
    ...makeVInputProps(),
    ...makeVCheckboxBtnProps(),
  },

  setup (props, { attrs, slots }) {
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
        >
          {{
            ...slots,
            default: ({
              id,
              isDisabled,
              isReadonly,
            }) => (
              <VCheckboxBtn
                { ...checkboxProps }
                id={ id.value }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                { ...controlAttrs }
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
