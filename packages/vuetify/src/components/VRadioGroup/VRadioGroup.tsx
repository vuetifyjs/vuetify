// Styles
import './VRadioGroup.sass'

// Components
import { filterControlProps, makeSelectionControlProps } from '@/components/VSelectionControl/VSelectionControl'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VLabel } from '@/components/VLabel'
import { VSelectionControlGroup } from '@/components/VSelectionControlGroup'

// Composables
import { IconValue } from '@/composables/icons'
import { provideDefaults } from '@/composables/defaults'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, toRef } from 'vue'
import { defineComponent, filterInputAttrs, getUid, useRender } from '@/util'

export const VRadioGroup = defineComponent({
  name: 'VRadioGroup',

  inheritAttrs: false,

  props: {
    height: {
      type: [Number, String],
      default: 'auto',
    },

    ...makeVInputProps(),
    ...makeSelectionControlProps(),

    trueIcon: {
      type: IconValue,
      default: '$radioOn',
    },
    falseIcon: {
      type: IconValue,
      default: '$radioOff',
    },
    type: {
      type: String,
      default: 'radio',
    },
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots }) {
    const uid = getUid()
    const id = computed(() => props.id || `radio-group-${uid}`)
    const model = useProxiedModel(props, 'modelValue')

    provideDefaults({
      VRadio: {
        color: toRef(props, 'color'),
        density: toRef(props, 'density'),
      },
    })

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs)
      const [inputProps, _1] = filterInputProps(props)
      const [controlProps, _2] = filterControlProps(props)
      const label = slots.label
        ? slots.label({
          label: props.label,
          props: { for: id.value },
        })
        : props.label

      return (
        <VInput
          class="v-radio-group"
          { ...inputAttrs }
          { ...inputProps }
          v-model={ model.value }
          id={ id.value }
        >
          {{
            ...slots,
            default: ({
              id,
              isDisabled,
              isReadonly,
            }) => (
              <>
                { label && (
                  <VLabel for={ id.value } clickable>
                    { label }
                  </VLabel>
                ) }

                <VSelectionControlGroup
                  { ...controlProps }
                  id={ id.value }
                  trueIcon={ props.trueIcon }
                  falseIcon={ props.falseIcon }
                  type={ props.type }
                  disabled={ isDisabled.value }
                  readonly={ isReadonly.value }
                  { ...controlAttrs }
                  v-model={ model.value }
                  v-slots={ slots }
                />
              </>
            ),
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VRadioGroup = InstanceType<typeof VRadioGroup>
