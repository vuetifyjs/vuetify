// Components
import { makeVColorPickerProps, VColorPicker } from '@/components/VColorPicker/VColorPicker'
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { VIcon } from '@/components/VIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { Ref } from 'vue'
import type { VFieldSlots } from '@/components/VField/VField'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { GenericProps } from '@/util'

export interface DefaultInputSlot {
  isActive: Ref<boolean>
  isFocused: Ref<boolean>
  controlRef: Ref<HTMLElement | undefined>
  focus: () => void
  blur: () => void
}

export type VColorInputSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  default: never
}

export const makeVColorInputProps = propsFactory({
  hideActions: Boolean,

  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: '',
  }),
  ...omit(makeVColorPickerProps({
  }), []), // ! VDatePicker had this, not sure about use here
}, 'VColorInput')

export const VColorInput = genericComponent<new <T>(
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (value: T) => void
  },
  slots: VColorInputSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VColorInput',

  props: makeVColorInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { slots }) {
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(props, 'modelValue')
    const pickerModel = useProxiedModel(props, 'modelValue')
    const menu = shallowRef(false)

    const display = computed(() => {
      const value = model.value

      if (!value) return null

      return value
    })

    const isInteractive = computed(() => !props.disabled && !props.readonly)

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true

        return
      }

      const target = e.target as HTMLInputElement

      model.value = target.value
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
      const colorPickerProps = VColorPicker.filterProps(omit(props, ['active', 'color']))
      const textFieldProps = VTextField.filterProps(omit(props, ['prependInnerIcon']))
      const hasPrepend = !!slots['prepend-inner']

      const prependInnerIcon = props.prependInnerIcon ?? '$pip'

      return (
        <VTextField
          { ...textFieldProps }
          class={ props.class }
          style={ props.style }
          modelValue={ display.value }
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          focused={ menu.value || isFocused.value }
          onFocus={ focus }
          onBlur={ blur }
          onClick:control={ isInteractive.value ? onClick : undefined }
          onClick:prepend={ isInteractive.value ? onClick : undefined }
          onUpdate:modelValue={ val => {
            pickerModel.value = val
            model.value = val
          }}
        >
          { !hasPrepend ? (
            <div key="prepend" class="v-field__prepend_inner_icon">
              <VIcon
                key="prepend-icon"
                density={ props.density }
                icon={ prependInnerIcon }
                color={ model.value as string ?? 'on-surface' }
              />
            </div>
          ) : null
        }

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
                    <VColorPicker
                      { ...colorPickerProps }
                      modelValue={ proxyModel.value }
                      onUpdate:modelValue={ val => {
                        proxyModel.value = val
                        model.value = val
                      }}
                      onMousedown={ (e: MouseEvent) => e.preventDefault() }
                    >
                      {{
                        actions: !props.hideActions ? () => actions : undefined,
                      }}
                    </VColorPicker>
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

export type VColorInput = InstanceType<typeof VColorInput>
