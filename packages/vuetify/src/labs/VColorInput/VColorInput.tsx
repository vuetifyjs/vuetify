// Styles
import './VColorInput.sass'

// Components
import { VAvatar } from '@/components/VAvatar'
import { makeVColorPickerProps, VColorPicker } from '@/components/VColorPicker/VColorPicker'
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { makeFocusProps } from '@/composables/focus'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

export type VColorInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VColorInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VColorInputActionsSlot
  default: never
}

const availablePipLocations = ['prepend', 'prepend-inner', 'append', 'append-inner'] as const
export type PipLocation = typeof availablePipLocations[number]

export const makeVColorInputProps = propsFactory({
  hidePip: Boolean,
  colorPip: Boolean,
  pipIcon: {
    type: String,
    default: '$color',
  },
  pipLocation: {
    type: String as PropType<PipLocation>,
    default: 'prepend',
    validator: (v: any) => availablePipLocations.includes(v),
  },
  pipVariant: {
    type: String as PropType<VAvatar['$props']['variant']>,
    default: 'text',
  },

  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps(),
  ...omit(makeVColorPickerProps(), ['width']),
}, 'VColorInput')

export const VColorInput = genericComponent<VColorInputSlots>()({
  name: 'VColorInput',

  props: makeVColorInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const menu = shallowRef(false)
    const isFocused = shallowRef(props.focused)

    const isInteractive = computed(() => !props.disabled && !props.readonly)

    const display = computed(() => model.value || null)

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

    function onCancel () {
      menu.value = false
    }

    useRender(() => {
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const colorPickerProps = VColorPicker.filterProps(omit(props, ['active', 'color']))
      const textFieldProps = VTextField.filterProps(props)

      const slotWithPip = props.hidePip
        ? undefined
        : {
          [props.pipLocation]: (arg: any) => (
            <>
              <VAvatar
                class="v-color-input__pip"
                color={ props.colorPip ? model.value as string : undefined }
                variant={ props.pipVariant }
                icon={ props.pipIcon }
              />
              { slots[props.pipLocation]?.(arg) }
            </>
          ),
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
          onClick:control={ isInteractive.value ? onClick : undefined }
          onClick:prependInner={ isInteractive.value ? onClick : undefined }
          onUpdate:focused={ event => isFocused.value = event }
          onClick:appendInner={ isInteractive.value ? onClick : undefined }
          onUpdate:modelValue={ val => {
            model.value = val
          }}
        >
          {{
            ...slots,
            ...slotWithPip,
            default: () => (
              <>
                <VMenu
                  v-model={ menu.value }
                  activator="parent"
                  minWidth="0"
                  closeOnContentClick={ false }
                  openOnClick={ false }
                >
                  <VConfirmEdit
                    { ...confirmEditProps }
                    v-model={ model.value }
                    onSave={ onSave }
                    onCancel={ onCancel }
                  >
                    {{
                      default: ({ actions, model: proxyModel, save, cancel, isPristine }) => {
                        function onUpdateModel (value: string) {
                          if (!props.hideActions) {
                            proxyModel.value = value
                          } else {
                            model.value = value
                          }
                        }

                        return (
                          <VColorPicker
                            { ...colorPickerProps }
                            modelValue={ props.hideActions ? model.value : proxyModel.value }
                            onUpdate:modelValue={ value => onUpdateModel(value) }
                            onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          >
                            {{
                              actions: !props.hideActions ? () => slots.actions?.({ save, cancel, isPristine }) ?? actions() : undefined,
                            }}
                          </VColorPicker>
                        )
                      },
                    }}
                  </VConfirmEdit>
                </VMenu>

                { slots.default?.() }
              </>
            ),
          }}
        </VTextField>
      )
    })
  },
})

export type VColorInput = InstanceType<typeof VColorInput>
