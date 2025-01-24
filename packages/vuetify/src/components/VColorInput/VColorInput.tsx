// Styles
import './VColorInput.sass'

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
import type { DefaultInputSlot, VFieldSlots } from '@/components/VField/VField'
import type { VInputSlot, VInputSlots } from '@/components/VInput/VInput'

export type VColorInputSlots = Omit<VInputSlots & VFieldSlots, 'default'> & {
  default: never
  prepend: VInputSlot
  'prepend-inner': DefaultInputSlot
  append: VInputSlot
  'append-inner': DefaultInputSlot
}

export const makeVColorInputProps = propsFactory({
  colorPip: {
    type: Boolean,
    default: true,
  },
  hideActions: Boolean,
  readonlyInput: Boolean,

  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: '',
    prependInnerIcon: '$pip',
  }),
  ...omit(makeVColorPickerProps({
  }), ['width']),
}, 'VColorInput')

export const VColorInput = genericComponent<VColorInputSlots>()({
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

    const colorPip = computed(() => !!props.colorPip)
    const isInteractive = computed(() => !props.disabled && !props.readonly)

    const display = computed(() => {
      const value = model.value

      if (!value) return null

      return value
    })

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
      const hasPrepend = !!(slots.prepend)
      const hasPrependInner = !!(slots['prepend-inner'])
      const hasAppendInner = !!(slots['append-inner'])
      const hasAppend = !!(slots.append)

      const isReadOnlyInput = computed(() => props.readonlyInput || props.readonly)

      const pipColor = computed(() => {
        return colorPip.value ? model.value as string ?? 'on-surface' : undefined
      })

      const getPipIcon = (key: string) => {
        const icon = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) as string

        return (
          <VIcon
            key={ key }
            icon={ props[icon as keyof typeof props] }
            color={ pipColor.value }
          />
        )
      }

      return (
        <VTextField
          { ...textFieldProps }
          class={[
            'v-color-input',
            props.class,
          ]}
          style={ props.style }
          modelValue={ display.value }
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          focused={ menu.value || isFocused.value }
          onFocus={ focus }
          onBlur={ blur }
          onClick:control={ isInteractive.value ? onClick : undefined }
          onClick:prependInner={ isInteractive.value ? onClick : undefined }
          onClick:appendInner={ isInteractive.value ? onClick : undefined }
          onUpdate:modelValue={ val => {
            pickerModel.value = val
            model.value = val
          }}
          readonly={ isReadOnlyInput.value }
          prependIcon={ undefined }
          prependInnerIcon={ undefined }
          appendInnerIcon={ undefined }
          appendIcon={ undefined }
        >
          {{
            ...slots,
            prepend: ({ ...slotProps }) => {
              return !hasPrepend && props.prependIcon ? getPipIcon('prepend-icon')
                : slots.prepend?.(slotProps)
            },
            [`prepend-inner`]: slotProps => {
              return !hasPrependInner && props.prependInnerIcon ? getPipIcon('prepend-inner-icon')
                : slots['prepend-inner']?.(slotProps)
            },
            default: () => {
              return (
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
              )
            },
            [`append-inner`]: slotProps => {
              return !hasAppendInner && props.appendInnerIcon ? getPipIcon('append-inner-icon')
                : slots['append-inner']?.(slotProps)
            },
            append: slotProps => {
              return !hasAppend && props.appendIcon ? getPipIcon('append-icon')
                : slots.append?.(slotProps)
            },
          }}
        </VTextField>
      )
    })
  },
})

export type VColorInput = InstanceType<typeof VColorInput>
