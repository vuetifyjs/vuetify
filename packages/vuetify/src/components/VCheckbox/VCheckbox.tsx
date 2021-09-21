// Styles
import './VCheckbox.sass'

// Components
import { VInput } from '@/components/VInput'
import VFieldLabel from '@/components/VField/VFieldLabel'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Utility
import { computed, defineComponent, ref } from 'vue'
import { getUid, pick, useRender } from '@/util'
import { VIcon } from '..'

export const VCheckbox = defineComponent({
  name: 'VCheckbox',

  inheritAttrs: false,

  props: {
    color: String,
    id: String,
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate',
    },
    label: String,
    offIcon: {
      type: String,
      default: '$checkboxOff',
    },
    onIcon: {
      type: String,
      default: '$checkboxOn',
    },

    ...makeThemeProps(),
    ...makeValidationProps(),
  },

  setup (props, { attrs, slots }) {
    const { themeClasses } = useTheme(props)
    const { errorMessages, isDisabled, isReadonly, isValid, validationClasses } = useValidation(props, 'v-field')
    const model = useProxiedModel(props, 'modelValue')
    const uid = getUid()

    const icon = computed(() => {
      if (props.indeterminate) return props.indeterminateIcon

      return model.value ? props.onIcon : props.offIcon
    })
    const id = computed(() => props.id || `input-${uid}`)
    const isFocused = ref(false)

    useRender(() => {
      const [_, restAttrs] = pick(attrs, ['class'])

      return (
        <VInput
          active={ false }
          class={[
            'v-checkbox',
            {
              'v-field--focused': isFocused.value, // todo replace when ripple focus state in
            },
            themeClasses.value,
            validationClasses.value,
          ]}
          messages={ props.errorMessages?.length ? props.errorMessages : errorMessages.value }
          { ...attrs }
          v-slots={{
            ...slots,
            default: () => {
              return (
                <div class="v-checkbox__control">
                  <div class="v-checkbox__input">
                  <VIcon
                    icon={ icon.value }
                    onClick={ () => model.value = !model.value }
                    color={ isValid.value || model.value ? props.color : undefined }
                  />

                  <input
                    v-model={ model.value }
                    readonly={ isReadonly.value }
                    disabled={ isDisabled.value }
                    id={ id.value }
                    onFocus={ () => (isFocused.value = true) }
                    onBlur={ () => (isFocused.value = false) }
                    type="checkbox"
                    { ...restAttrs }
                  />
                  </div>

                  <VFieldLabel
                    for={ id.value }
                    style="position: static; pointer-events: auto; cursor: pointer;"
                  >
                    { props.label }
                  </VFieldLabel>
                </div>
              )
            },
          }}
        />
      )
    })

    return {}
  },
})
