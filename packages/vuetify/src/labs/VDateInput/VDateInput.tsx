// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useDate } from '@/composables/date'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

// Types
export type VDateInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VDateInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VDateInputActionsSlot
  default: never
}

export const makeVDateInputProps = propsFactory({
  hideActions: Boolean,
  location: {
    type: String as PropType<StrategyProps['location']>,
    default: 'bottom start',
  },

  ...makeDisplayProps(),
  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: 'mm/dd/yyyy',
    prependIcon: '$calendar',
  }),
  ...omit(makeVDatePickerProps({
    hideHeader: true,
    showAdjacentMonths: true,
  }), ['active', 'location', 'rounded']),
}, 'VDateInput')

export const VDateInput = genericComponent<VDateInputSlots>()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const adapter = useDate()
    const { mobile } = useDisplay()
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(
      props,
      'modelValue',
      props.multiple ? [] : null,
      val => Array.isArray(val) ? val.map(item => adapter.toJsDate(item)) : val ? adapter.toJsDate(val) : val,
      val => Array.isArray(val) ? val.map(item => adapter.date(item)) : val ? adapter.date(val) : val
    )

    const menu = shallowRef(false)
    const isEditingInput = shallowRef(false)
    const vDateInputRef = ref()

    const display = computed(() => {
      const value = wrapInArray(model.value)

      if (!value.length) return null

      if (props.multiple === true) {
        return t('$vuetify.datePicker.itemsSelected', value.length)
      }

      if (props.multiple === 'range') {
        const start = value[0]
        const end = value[value.length - 1]

        return adapter.isValid(start) && adapter.isValid(end)
          ? `${adapter.format(adapter.date(start), 'keyboardDate')} - ${adapter.format(adapter.date(end), 'keyboardDate')}`
          : ''
      }

      return adapter.isValid(model.value) ? adapter.format(adapter.date(model.value), 'keyboardDate') : ''
    })

    const inputmode = computed(() => {
      if (!mobile.value) return undefined
      if (isEditingInput.value) return 'text'

      return 'none'
    })

    const isReadonly = computed(() => {
      if (mobile.value && isEditingInput.value) return false
      return props.readonly
    })

    const isInteractive = computed(() => !props.disabled)

    watch(menu, val => {
      if (val) return

      isEditingInput.value = false
    })

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true
        return
      }

      const target = e.target as HTMLInputElement
      model.value = target.value === '' ? null : target.value
    }

    function onClick (e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()

      if (menu.value && mobile.value) {
        // On second click (menu is already open), enable editing
        isEditingInput.value = true
      } else {
        // First click, just open the menu
        menu.value = true
      }
    }

    function onSave () {
      menu.value = false
      isEditingInput.value = false
    }

    function onUpdateModel (value: string) {
      if (value != null) return

      model.value = null
    }

    function onUpdateMenuModel (isMenuOpen: boolean) {
      if (isMenuOpen) return

      isEditingInput.value = false
    }

    function onBlur () {
      blur()

      // When in mobile mode and editing is done (due to keyboard dismissal), close the menu
      if (mobile.value && isEditingInput.value && !isFocused.value) {
        menu.value = false
        isEditingInput.value = false
      }
    }

    useRender(() => {
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const datePickerProps = VDatePicker.filterProps(omit(props, ['active', 'location', 'rounded']))
      const textFieldProps = VTextField.filterProps(props)

      return (
        <VTextField
          ref={ vDateInputRef }
          { ...textFieldProps }
          class={ props.class }
          style={{
            ...(props.style as Record<string, any>),
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            userSelect: 'none',
          }}
          modelValue={ display.value }
          inputmode={ inputmode.value }
          readonly={ isReadonly.value }
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          focused={ menu.value || isFocused.value }
          onFocus={ focus }
          onBlur={ onBlur }
          onClick:control={ isInteractive.value ? onClick : undefined }
          onClick:prepend={ isInteractive.value ? onClick : undefined }
          onUpdate:modelValue={ onUpdateModel }
        >
          {{
            ...slots,
            default: () => (
              <>
                <VMenu
                  v-model={ menu.value }
                  activator="parent"
                  min-width="0"
                  eager={ isFocused.value }
                  location={ props.location }
                  closeOnContentClick={ false }
                  openOnClick={ false }
                  onUpdate:modelValue={ onUpdateMenuModel }
                >
                  <VConfirmEdit
                    { ...confirmEditProps }
                    v-model={ model.value }
                    onSave={ onSave }
                    onCancel={ () => menu.value = false }
                  >
                    {{
                      default: ({ actions, model: proxyModel, save, cancel, isPristine }) => {
                        return (
                          <VDatePicker
                            { ...datePickerProps }
                            modelValue={ props.hideActions ? model.value : proxyModel.value }
                            onUpdate:modelValue={ val => {
                              if (!props.hideActions) {
                                proxyModel.value = val
                              } else {
                                model.value = val

                                if (!props.multiple) menu.value = false
                              }
                            }}
                            onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          >
                            {{
                              actions: !props.hideActions ? () => slots.actions?.({ save, cancel, isPristine }) ?? actions() : undefined,
                            }}
                          </VDatePicker>
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

    return forwardRefs({}, vDateInputRef)
  },
})

export type VDateInput = InstanceType<typeof VDateInput>
