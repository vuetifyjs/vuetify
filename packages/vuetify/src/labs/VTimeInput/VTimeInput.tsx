// Components
import { VBtn } from '@/components/VBtn'
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { VSpacer } from '@/components/VGrid/VSpacer'
import { VMenu } from '@/components/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { makeVTimePickerProps, VTimePicker } from '@/components/VTimePicker/VTimePicker'

// Composables
import { useDate } from '@/composables/date'
import { makeFocusProps, useFocus } from '@/composables/focus'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, shallowRef } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

export type VTimeInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VTimeInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VTimeInputActionsSlot
  default: never
}

export const makeVTimeInputProps = propsFactory({
  pickerProps: Object as PropType<VTimePicker['$props']>,

  ...makeFocusProps(),
  ...makeVConfirmEditProps(),
  ...makeVTextFieldProps({
    placeholder: '--:--',
    prependIcon: '$clock',
  }),
  ...omit(makeVTimePickerProps({
    variant: 'dial',
    hideHeader: true,
  }), [
    'location',
    'rounded',
    'height',
    'minHeight',
    'maxHeight',
    'variant',
  ]),
}, 'VTimeInput')

export const VTimeInput = genericComponent<VTimeInputSlots>()({
  name: 'VTimeInput',

  props: makeVTimeInputProps(),

  emits: {
    'update:modelValue': (val: string) => true,
    'update:period': (val: string) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
    const adapter = useDate()
    const { isFocused, focus, blur } = useFocus(props)
    const model = useProxiedModel(props, 'modelValue', null)
    const period = useProxiedModel(props, 'period', 'am')
    const menu = shallowRef(false)

    const display = computed(() => {
      if (!model.value) return ''
      const isoDate = `2000-01-01T${model.value}`

      return model.value && adapter.isValid(isoDate)
        ? adapter.format(isoDate, props.format === '24hr' ? 'fullTime24h' : 'fullTime12h')
        : ''
    })

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
      const textFieldProps = VTextField.filterProps(props)
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const timePickerProps = {
        ...VTimePicker.filterProps(omit(props, [
          'active',
          'bgColor',
          'color',
          'period',
          'rounded',
          'maxWidth',
          'minWidth',
          'width',
          'variant',
        ])),
        ...props.pickerProps,
      }

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
            minWidth="0"
            closeOnContentClick={ false }
            openOnClick={ false }
          >
            <VConfirmEdit
              { ...confirmEditProps }
              v-model={ model.value }
              onSave={ onSave }
            >
              {{
                default: ({ actions, model: proxyModel, save, cancel, isPristine }) => {
                  return (
                    <VTimePicker
                      v-model:period={ period.value }
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
                        actions: () => (
                          <>
                            <div class="d-flex">
                              <VBtn
                                class="mr-0"
                                active={ period.value === 'am' }
                                color={ period.value === 'am' ? props.color : undefined }
                                disabled={ props.disabled }
                                text={ t('$vuetify.timePicker.am') }
                                variant={ props.disabled && period.value === 'am' ? 'elevated' : 'tonal' }
                                onClick={ () => period.value !== 'am' ? period.value = 'am' : null }
                              />
                              <VBtn
                                active={ period.value === 'pm' }
                                color={ period.value === 'pm' ? props.color : undefined }
                                disabled={ props.disabled }
                                text={ t('$vuetify.timePicker.pm') }
                                variant={ props.disabled && period.value === 'pm' ? 'elevated' : 'tonal' }
                                onClick={ () => period.value !== 'pm' ? period.value = 'pm' : null }
                              />
                            </div>
                            <VSpacer />
                            { !props.hideActions
                              ? slots.actions?.({ save, cancel, isPristine }) ?? actions()
                              : undefined }
                          </>
                        ),
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
