// Composables
import { makeComponentProps } from '@/composables/component'
import { createForm, makeFormProps } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { ref } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { FieldValidationResult, FormField, FormValidationResult, SubmitEventPromise } from '@/composables/form'

export const makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps(),
}, 'VForm')

type VFormSlots = {
  default: {
    errors: FieldValidationResult[]
    isDisabled: boolean
    isReadonly: boolean
    isValidating: boolean
    isValid: boolean | null
    items: FormField[]
    validate: () => Promise<FormValidationResult>
    reset: () => void
    resetValidation: () => void
  }
}

export const VForm = genericComponent<VFormSlots>()({
  name: 'VForm',

  props: makeVFormProps(),

  emits: {
    'update:modelValue': (val: boolean | null) => true,
    submit: (e: SubmitEventPromise) => true,
  },

  setup (props, { slots, emit }) {
    const form = createForm(props)
    const formRef = ref<HTMLFormElement>()

    function onReset (e: Event) {
      e.preventDefault()
      form.reset()
    }

    function onSubmit (_e: Event) {
      const e = _e as SubmitEventPromise

      const ready = form.validate()
      e.then = ready.then.bind(ready)
      e.catch = ready.catch.bind(ready)
      e.finally = ready.finally.bind(ready)

      emit('submit', e)

      if (!e.defaultPrevented) {
        ready.then(({ valid }) => {
          if (valid) {
            formRef.value?.submit()
          }
        })
      }

      e.preventDefault()
    }

    useRender(() => ((
      <form
        ref={ formRef }
        class={[
          'v-form',
          props.class,
        ]}
        style={ props.style }
        novalidate
        onReset={ onReset }
        onSubmit={ onSubmit }
      >
        { slots.default?.({
          errors: form.errors.value,
          isDisabled: form.isDisabled.value,
          isReadonly: form.isReadonly.value,
          isValidating: form.isValidating.value,
          isValid: form.isValid.value,
          items: form.items.value,
          validate: form.validate,
          reset: form.reset,
          resetValidation: form.resetValidation,
        })}
      </form>
    )))

    return forwardRefs(form, formRef)
  },
})

export type VForm = InstanceType<typeof VForm>
