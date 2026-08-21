// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { makeVTimePickerProps, VTimePicker } from '@/components/VTimePicker/VTimePicker'

// Composables
import { makeFocusProps } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { closeWhenFocusLeaves, useOpenOnFocus } from '@/composables/openOnFocus'
import { useProxiedModel } from '@/composables/proxiedModel'
import { createSegmentedEdit } from '@/composables/segmentedMask'
import { makeTimeFormatProps, useTimeFormat } from '@/composables/timeFormat'

// Utilities
import { computed, ref, shallowRef, toRef, watch } from 'vue'
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
  menu: Boolean,
  menuProps: Object as PropType<VMenu['$props']>,
  openOnFocus: Boolean,
  updateOn: {
    type: Array as PropType<('blur' | 'enter')[]>,
    default: () => ['blur', 'enter'],
  },
  pickerProps: Object as PropType<VTimePicker['$props']>,

  ...makeTimeFormatProps(),
  ...makeFocusProps(),
  ...makeVConfirmEditProps({
    hideActions: true,
  }),
  ...makeVTextFieldProps({
    prependIcon: '$clock',
  }),
  ...omit(makeVTimePickerProps({
    format: '24hr',
    hideTitle: true,
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
    save: (value: unknown) => true,
    cancel: () => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: string | null) => true,
    'update:menu': (val: boolean) => true,
    'update:period': (val: string) => true,
  },

  setup (props, { emit, slots }) {
    const { InputIcon } = useInputIcon(props)
    const timeFormat = useTimeFormat(toRef(() => ({
      useSeconds: props.useSeconds,
      format: props.format,
    })))

    const model = useProxiedModel(props, 'modelValue')
    const menu = useProxiedModel(props, 'menu')
    const isFocused = shallowRef(props.focused)
    const vTextFieldRef = ref<VTextField>()
    const vMenuRef = ref<VMenu>()
    const disabledActions = ref<typeof VConfirmEdit['props']['disabled']>(['save'])
    const { onBeforeinput, onInput } = createSegmentedEdit(timeFormat.maskTime)

    useOpenOnFocus(menu, isFocused, () => props.openOnFocus && !props.disabled)

    const display = computed(() => timeFormat.formatTime(model.value))
    const placeholder = computed(() => props.placeholder ?? timeFormat.parserFormat.value)
    const isInteractive = computed(() => !props.disabled && !props.readonly)
    const isReadonly = computed(() => !props.updateOn.length || props.readonly)

    const viewMode = shallowRef(props.viewMode)
    const lastViewMode = computed(() => props.useSeconds ? 'second' : 'minute')

    watch(menu, val => {
      if (!val) {
        disabledActions.value = ['save']
        viewMode.value = props.viewMode
      }
    })

    // a click on the clock is the only interaction that can complete a value:
    // wheel events emit the same updates but must not close the menu, and a
    // click that advances the view (hour -> minute) is not a completed value
    let pressedIn: string | null = null

    function onPickerMousedown (e: MouseEvent) {
      const target = e.target as HTMLElement
      // the header fields have to be able to take focus to switch the view back,
      // anything else keeps focus in the text field
      if (!target.closest('.v-time-picker-controls__time__field')) e.preventDefault()
      pressedIn = target.closest('.v-time-picker-clock') ? viewMode.value : null
    }

    function onPickerClick () {
      const completed = pressedIn === lastViewMode.value && viewMode.value === pressedIn
      pressedIn = null
      if (completed && props.hideActions && model.value) menu.value = false
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true
      }

      if (props.updateOn.includes('enter') && !props.readonly) {
        onUserInput(e.target as HTMLInputElement)
      }
    }

    function onClick (e: MouseEvent) {
      if (props.disabled) return
      e.preventDefault()
      e.stopPropagation()
      menu.value = true
    }

    function onCancel () {
      emit('cancel')
      menu.value = false
    }

    function onSave (value: string) {
      emit('save', value)
      menu.value = false
    }

    function onUpdateDisplayModel (value: unknown) {
      if (value != null) return
      model.value = null
    }

    function onBlur (e: FocusEvent) {
      if ((e.relatedTarget as HTMLElement | null)?.closest('.v-time-picker')) return

      if (props.updateOn.includes('blur') && !props.readonly) {
        onUserInput(e.target as HTMLInputElement)
      }

      closeWhenFocusLeaves(menu, vTextFieldRef.value?.$el, vMenuRef.value?.contentEl)
    }

    function onUserInput ({ value }: HTMLInputElement) {
      if (!value.trim()) {
        model.value = null
        return
      }

      const parsed = timeFormat.parseTime(value)
      if (parsed) model.value = parsed
    }

    useRender(() => {
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const timePickerProps = {
        ...VTimePicker.filterProps(omit(props, [
          'active',
          'bgColor',
          'color',
          'rounded',
          'maxWidth',
          'minWidth',
          'width',
        ])),
        ...props.pickerProps,
      }
      const textFieldProps = VTextField.filterProps(omit(props, ['placeholder']))

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          class={['v-time-input', props.class]}
          style={ props.style }
          modelValue={ display.value }
          placeholder={ placeholder.value }
          readonly={ isReadonly.value }
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          onBeforeinput={ isInteractive.value ? onBeforeinput : undefined }
          onInput={ isInteractive.value ? onInput : undefined }
          focused={ menu.value || isFocused.value }
          onBlur={ onBlur }
          validationValue={ model.value }
          onClick:control={ onClick }
          onUpdate:modelValue={ onUpdateDisplayModel }
          onUpdate:focused={ event => isFocused.value = event }
        >
          {{
            ...slots,
            default: () => (
              <>
                <VMenu
                  ref={ vMenuRef }
                  v-model={ menu.value }
                  activator="parent"
                  minWidth="0"
                  eager={ isFocused.value }
                  closeOnContentClick={ false }
                  openOnClick={ false }
                  { ...props.menuProps }
                >
                  <VConfirmEdit
                    { ...confirmEditProps }
                    v-model={ model.value }
                    disabled={ disabledActions.value }
                    onSave={ onSave }
                    onCancel={ onCancel }
                  >
                    {{
                      default: ({ actions, model: proxyModel, save, cancel, isPristine }) => (
                        <VTimePicker
                          { ...timePickerProps }
                          v-model:viewMode={ viewMode.value }
                          modelValue={ props.hideActions ? model.value : proxyModel.value }
                          onUpdate:modelValue={ value => {
                            if (props.hideActions) {
                              model.value = value
                            } else {
                              proxyModel.value = value
                            }
                            emit('save', value)
                            disabledActions.value = []
                          }}
                          onMousedown={ onPickerMousedown }
                          onClick={ onPickerClick }
                        >
                          {{
                            actions: !props.hideActions ? () => slots.actions?.({ save, cancel, isPristine }) ?? actions() : undefined,
                          }}
                        </VTimePicker>
                      ),
                    }}
                  </VConfirmEdit>
                </VMenu>

                { slots.default?.() }
              </>
            ),
            prepend: hasPrepend ? prependSlotProps => (
              slots.prepend
                ? slots.prepend(prependSlotProps)
                : (props.prependIcon && (
                  <InputIcon
                    key="prepend-icon"
                    name="prepend"
                    tabindex={ props['onClick:prepend'] ? undefined : -1 }
                    onClick={ isInteractive.value ? onClick : undefined }
                  />
                ))
            ) : undefined,
          }}
        </VTextField>
      )
    })

    return forwardRefs({}, vTextFieldRef)
  },
})

export type VTimeInput = InstanceType<typeof VTimeInput>
