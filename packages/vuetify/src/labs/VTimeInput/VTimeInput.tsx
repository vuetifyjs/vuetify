// Styles
import './VTimeInput.sass'

// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { useTimeValidation } from '@/components/VTimePicker/useTimeValidation'
import { pad } from '@/components/VTimePicker/util'
import { makeVTimePickerProps, VTimePicker } from '@/components/VTimePicker/VTimePicker'

// Composables
import { useDate } from '@/composables/date'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeFocusProps } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { closeWhenFocusLeaves, useOpenOnFocus } from '@/composables/openOnFocus'
import { useProxiedModel } from '@/composables/proxiedModel'
import { createSegmentedEdit } from '@/composables/segmentedMask'
import { useTimeFormat } from '@/composables/timeFormat'

// Utilities
import { computed, ref, shallowRef, toRef, watch } from 'vue'
import { clamp, genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'
import type { VTimePickerViewMode } from '@/components/VTimePicker/shared'

export type VTimeInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VTimeInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VTimeInputActionsSlot
  default: never
}

function toSeconds (time: string) {
  const [hour, minute, second = 0] = time.split(':').map(Number)

  return hour * 3600 + minute * 60 + second
}

export const makeVTimeInputProps = propsFactory({
  format: String as PropType<'ampm' | '24hr'>,
  location: {
    type: String as PropType<StrategyProps['location']>,
    default: 'bottom start',
  },
  menu: Boolean,
  menuProps: Object as PropType<VMenu['$props']>,
  openOnFocus: Boolean,
  updateOn: {
    type: Array as PropType<('blur' | 'enter')[]>,
    default: () => ['blur', 'enter'],
  },
  pickerProps: Object as PropType<VTimePicker['$props']>,

  ...makeDisplayProps({
    mobile: null,
  }),
  ...makeFocusProps(),
  ...makeVConfirmEditProps({
    hideActions: true,
  }),
  ...makeVTextFieldProps({
    prependIcon: '$clock',
  }),
  ...omit(makeVTimePickerProps({
    hideTitle: true,
  }), [
    'format',
    'location',
    'rounded',
    'height',
    'minHeight',
    'maxHeight',
    'period',
    'variant',
    'viewMode',
  ]),
}, 'VTimeInput')

export const VTimeInput = genericComponent<VTimeInputSlots>()({
  name: 'VTimeInput',

  props: makeVTimeInputProps(),

  emits: {
    save: (value: string | null) => true,
    cancel: () => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: string | null) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { isRtl } = useLocale()
    const adapter = useDate()

    const {
      hour12,
      period,
      placeholder,
      formatTime,
      getHint,
      maskTime,
      parseTime,
      readPeriod,
    } = useTimeFormat(props, toRef(() => adapter.locale))

    const {
      onBeforeinput,
      onInput: onMaskInput,
      onKeydown: onInputKeydown,
      text,
    } = createSegmentedEdit(maskTime, ':')

    const { mobile } = useDisplay(props)
    const { InputIcon } = useInputIcon(props)
    const { isAllowedHour, isAllowedMinute, isAllowedSecond } = useTimeValidation(props)

    const model = useProxiedModel(props, 'modelValue', null)
    const menu = useProxiedModel(props, 'menu')
    const isEditingInput = shallowRef(false)
    const isFocused = shallowRef(props.focused)
    const viewMode = shallowRef<VTimePickerViewMode>('hour')
    const vTextFieldRef = ref<VTextField>()
    const vMenuRef = ref<VMenu>()
    const hintRef = ref<HTMLElement>()
    const hintWidth = shallowRef(0)
    const disabledActions = ref<typeof VConfirmEdit['props']['disabled']>(['save'])

    useOpenOnFocus(menu, isFocused, () => props.openOnFocus && !props.disabled)

    const display = computed(() => model.value ? formatTime(model.value) : '')
    const formatHint = computed(() => getHint(text.value))

    function reset () {
      text.value = display.value
      period.value = model.value ? (toSeconds(model.value) < 12 * 3600 ? 'am' : 'pm') : null
    }

    // the mask writes to the input directly, the text field has to render the same value
    watch(display, reset, { immediate: true })

    const inputmode = computed(() => {
      if (!mobile.value) return undefined
      if (isEditingInput.value) return 'numeric'

      return 'none'
    })

    const isInteractive = computed(() => !props.disabled && !props.readonly)

    const isReadonly = computed(() => {
      if (!props.updateOn.length) return true

      return !(mobile.value && isEditingInput.value) && props.readonly
    })

    const showHint = toRef(() => isFocused.value && !isReadonly.value && !!text.value)

    // the input grows to the right, in a right-aligned field the hint has to keep its room after it
    watch([formatHint, showHint, isRtl], () => {
      hintWidth.value = isRtl.value ? hintRef.value?.offsetWidth ?? 0 : 0
    }, { flush: 'post' })

    watch(menu, val => {
      if (val) return

      isEditingInput.value = false
      disabledActions.value = ['save']
      viewMode.value = 'hour'
    })

    function onInput (e: InputEvent) {
      const { value } = e.target as HTMLInputElement

      if (hour12.value && !e.isComposing) {
        period.value = readPeriod(value) ?? (/\d/.test(value) ? period.value : null)
      }

      onMaskInput(e)
    }

    function onKeydown (e: KeyboardEvent) {
      onInputKeydown(e)

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

      if (menu.value && mobile.value) {
        isEditingInput.value = !props.readonly
      } else {
        menu.value = true
      }
    }

    function onCancel () {
      emit('cancel')
      menu.value = false
      isEditingInput.value = false
    }

    function onSave (value: string | null) {
      emit('save', value)
      menu.value = false
    }

    function onUpdateDisplayModel (value: unknown) {
      if (value != null) return

      model.value = null
    }

    function onBlur (e: FocusEvent) {
      if (props.updateOn.includes('blur') && !props.readonly) {
        onUserInput(e.target as HTMLInputElement)
      }

      reset()

      if (mobile.value && isEditingInput.value && !isFocused.value) {
        menu.value = false
        isEditingInput.value = false
      }

      closeWhenFocusLeaves(menu, vTextFieldRef.value?.$el, vMenuRef.value?.contentEl)
    }

    function onUserInput ({ value }: HTMLInputElement) {
      if (!value.trim()) {
        model.value = null
        return
      }

      const time = parseTime(value)

      if (!time) return

      const seconds = clamp(
        toSeconds(time),
        props.min ? toSeconds(props.min) : 0,
        props.max ? toSeconds(props.max) : 86399,
      )
      const hour = Math.floor(seconds / 3600)
      const minute = Math.floor(seconds / 60) % 60
      const second = seconds % 60

      if (
        !isAllowedHour.value(hour) ||
        !isAllowedMinute.value(hour, minute) ||
        (props.useSeconds && !isAllowedSecond.value(hour, minute, second))
      ) return

      model.value = [hour, minute, ...props.useSeconds ? [second] : []].map(v => pad(v)).join(':')
    }

    // a click on the clock in its last view is a finished value, the wheel and the first views are not
    let pressedView: VTimePickerViewMode | null = null

    function onPickerMousedown (e: MouseEvent) {
      const target = e.target as HTMLElement

      // the picker fields take focus themselves, anything else leaves it in the text field
      if (!target.closest('.v-time-picker-controls__time__field')) e.preventDefault()

      pressedView = target.closest('.v-time-picker-clock') ? viewMode.value : null
    }

    function onPickerClick () {
      const isLastView = pressedView === (props.useSeconds ? 'second' : 'minute') && viewMode.value === pressedView

      pressedView = null

      if (isLastView && props.hideActions && model.value) menu.value = false
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
          'variant',
          'width',
        ])),
        format: hour12.value ? 'ampm' as const : '24hr' as const,
        variant: mobile.value ? 'dial' as const : 'input' as const,
        ...props.pickerProps,
      }
      const textFieldProps = VTextField.filterProps(omit(props, ['placeholder']))

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          class={['v-time-input', { 'v-time-input--rtl': isRtl.value }, props.class]}
          style={[{ '--v-time-input-hint-width': `${hintWidth.value}px` }, props.style]}
          modelValue={ text.value }
          inputmode={ inputmode.value }
          placeholder={ props.placeholder ?? placeholder.value }
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
                { showHint.value && (
                  <div class="v-time-input__format-hint" aria-hidden="true">
                    <span>{ text.value }</span>
                    <bdi ref={ hintRef } dir="ltr">
                      { formatHint.value.split(/(\p{L}+)/u).map((part, i) => i % 2 ? <bdi>{ part }</bdi> : part) }
                    </bdi>
                  </div>
                )}

                <VMenu
                  ref={ vMenuRef }
                  v-model={ menu.value }
                  activator="parent"
                  minWidth="0"
                  eager={ isFocused.value }
                  location={ props.location }
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
                      default: ({ actions, model: proxyModel, save, cancel, isPristine }) => {
                        function onUpdateModel (value: string | null) {
                          if (!props.hideActions) {
                            proxyModel.value = value
                          } else {
                            model.value = value
                          }

                          emit('save', value)

                          disabledActions.value = []
                        }

                        return (
                          <VTimePicker
                            { ...timePickerProps }
                            class="v-time-input__picker"
                            v-model:viewMode={ viewMode.value }
                            modelValue={ props.hideActions ? model.value : proxyModel.value }
                            onUpdate:modelValue={ onUpdateModel }
                            onMousedown={ onPickerMousedown }
                            onClick={ onPickerClick }
                          >
                            {{
                              actions: !props.hideActions ? () => slots.actions?.({ save, cancel, isPristine }) ?? actions() : undefined,
                            }}
                          </VTimePicker>
                        )
                      },
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
