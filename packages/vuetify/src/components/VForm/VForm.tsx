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

    function focusFirstError (id: number | string) {
      const field = form.items.value.find(item => item.id === id)
      if (!field?.vm?.vnode?.el) return

      const el = field.vm.vnode.el as HTMLElement
      const input = el.querySelector?.(
        'input, textarea, [tabindex]:not([tabindex="-1"]):not([disabled])'
      )
      if (input) {
        (input as HTMLElement).focus()
      } else {
        el.focus()
      }
    }

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
        ready.then(({ valid, errors }) => {
          if (valid) {
            formRef.value?.submit()
          } else if (errors.length > 0) {
            // Focus the first invalid field so screen readers announce the error
            focusFirstError(errors[0].id)
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
          get errors () { return form.errors.value },
          get isDisabled () { return form.isDisabled.value },
          get isReadonly () { return form.isReadonly.value },
          get isValidating () { return form.isValidating.value },
          get isValid () { return form.isValid.value },
          get items () { return form.items.value },
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
