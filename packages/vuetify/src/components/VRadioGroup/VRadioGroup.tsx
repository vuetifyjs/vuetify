// Styles
import './VRadioGroup.sass'

// Components
import { filterInputAttrs, filterInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'
import { VSelectionControlGroup } from '@/components/VSelectionControlGroup'

// Utility
import { computed, defineComponent } from 'vue'
import { getUid, useRender } from '@/util'

export const VRadioGroup = defineComponent({
  name: 'VRadioGroup',

  inheritAttrs: false,

  props: {
    height: {
      type: [Number, String],
      default: 'auto',
    },
    label: String,
    id: String,
    inline: Boolean,
    onIcon: {
      type: String,
      default: '$radioOn',
    },
    offIcon: {
      type: String,
      default: '$radioOff',
    },
    type: {
      type: String,
      default: 'radio',
    },
  },

  setup (props, { attrs, slots }) {
    const uid = getUid()
    const id = computed(() => props.id || `radio-group-${uid}`)

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [rootProps, inputProps] = filterInputProps(inputAttrs)
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label

      return (
        <VInput
          class="v-radio-group"
          { ...rootAttrs }
          { ...rootProps }
          v-slots={{
            ...slots,
            default: ({
              isDisabled,
              isReadonly,
              isValid,
            }) => (
              <>
                { label && (
                  <VLabel
                    disabled={ isDisabled.value }
                    error={ isValid.value === false }
                    for={ id.value }
                  >
                    { label }
                  </VLabel>
                ) }

                <VSelectionControlGroup
                  id={ id.value }
                  disabled={ isDisabled.value }
                  onIcon={ props.onIcon }
                  offIcon={ props.offIcon }
                  type={ props.type }
                  readonly={ isReadonly.value }
                  inline={ props.inline }
                  v-slots={ slots }
                  { ...inputProps }
                />
              </>
            ),
          }}
        />
      )
    })

    return {}
  },
})
