// Components
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { makeVConfirmEditProps, VConfirmEdit } from '@/labs/VConfirmEdit/VConfirmEdit'
import { makeVTimePickerProps, VTimePicker } from '@/labs/VTimePicker/VTimePicker'

// Composables
import { useDate } from '@/composables/date'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
export interface VTimeInputSlots {
  default: never
}

export const makeVTimeInputProps = propsFactory({
  hideActions: Boolean,

  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: 'hh:mm',
    prependIcon: '$clock',
  }),
  ...omit(makeVTimePickerProps({
    hideHeader: true,
  }), ['active']),
}, 'VTimeInput')

export const VTimeInput = genericComponent()({
  name: 'VTimeInput',

  props: makeVTimeInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { slots }) {
    const adapter = useDate()
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(props, 'modelValue', null)
    const menu = shallowRef(false)

    const display = computed(() => adapter.isValid(model.value)
      ? adapter.format(model.value, props.format === '24hr' ? 'fullTime24h' : 'fullTime12h')
      : '')

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true

        return
      }

      const target = e.target as HTMLInputElement

      model.value = adapter.date(target.value)
    }

    function onClick (e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()

      menu.value = true
    }

    function onSave () {
      menu.value = false
    }

    useRender(() => {
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const timePickerProps = VTimePicker.filterProps(omit(props, ['active']))
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          { ...textFieldProps }
          modelValue={ display.value }
          onKeydown={ onKeydown }
          focused={ menu.value || isFocused.value }
          onFocus={ focus }
          onBlur={ blur }
          onClick:control={ onClick }
          onClick:prepend={ onClick }
        >
          <VMenu
            v-model={ menu.value }
            activator="parent"
            min-width="0"
            closeOnContentClick={ false }
            openOnClick={ false }
          >
            <VConfirmEdit
              { ...confirmEditProps }
              v-model={ model.value }
              onSave={ onSave }
            >
              {{
                default: ({ actions, model: proxyModel }) => {
                  return (
                    <VTimePicker
                      { ...timePickerProps }
                      modelValue={ props.hideActions ? model.value : proxyModel.value }
                      onUpdate:modelValue={ val => {
                        if (!props.hideActions) {
                          proxyModel.value = val
                        } else {
                          model.value = val
                        }
                      }}
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    >
                      {{
                        actions: !props.hideActions ? () => actions : undefined,
                      }}
                    </VTimePicker>
                  )
                },
              }}
            </VConfirmEdit>
          </VMenu>

          { slots.default?.() }
        </VTextField>
      )
    })
  },
})

export type VTimeInput = InstanceType<typeof VTimeInput>
