// Styles
import './VCheckbox.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VInput } from '@/components/VInput'
import { VFieldLabel } from '@/components/VField/VFieldLabel'

// Composables
import { useTextColor } from '@/composables/color'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeThemeProps, useTheme } from '@/composables/theme'
import { makeValidationProps, useValidation } from '@/composables/validation'

// Directives
import { Ripple } from '@/directives/ripple'

// Utility
import { computed, defineComponent, ref } from 'vue'
import { getUid, pick, SUPPORTS_FOCUS_VISIBLE, useRender } from '@/util'

export const VCheckbox = defineComponent({
  name: 'VCheckbox',

  directives: { Ripple },

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
    const { errorMessages, isDisabled, isReadonly, isValid, validationClasses } = useValidation(props, 'v-checkbox')
    const model = useProxiedModel(props, 'modelValue')
    const uid = getUid()
    const { textColorClasses, textColorStyles } = useTextColor(computed(() => {
      return isValid.value || model.value ? props.color : undefined
    }))

    const icon = computed(() => {
      if (props.indeterminate) return props.indeterminateIcon

      return model.value ? props.onIcon : props.offIcon
    })
    const id = computed(() => props.id || `input-${uid}`)
    const isFocused = ref(false)
    const isFocusVisible = ref(false)

    function onFocus (e: FocusEvent) {
      isFocused.value = true
      if (
        !SUPPORTS_FOCUS_VISIBLE ||
        (SUPPORTS_FOCUS_VISIBLE && (e.target as HTMLElement).matches(':focus-visible'))
      ) {
        isFocusVisible.value = true
      }
    }

    function onBlur () {
      isFocused.value = false
      isFocusVisible.value = false
    }

    useRender(() => {
      const [_, restAttrs] = pick(attrs, ['class'])

      return (
        <VInput
          active={ false }
          focused={ isFocusVisible.value }
          class={[
            'v-checkbox',
            {
              'v-checkbox--focused': isFocused.value,
              'v-checkbox--focus-visible': isFocusVisible.value,
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
                  <div
                    class={[
                      'v-checkbox__input',
                      textColorClasses.value,
                    ]}
                    style={ textColorStyles.value }
                    v-ripple={[
                      !isDisabled.value && !isReadonly.value,
                      null,
                      ['center', 'circle'],
                    ]}
                  >
                    <VIcon
                      icon={ icon.value }
                      onClick={ () => model.value = !model.value }
                    />

                    <input
                      v-model={ model.value }
                      readonly={ isReadonly.value }
                      disabled={ isDisabled.value }
                      id={ id.value }
                      onFocus={ onFocus }
                      onBlur={ onBlur }
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
