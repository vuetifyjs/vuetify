// Styles
import './VDateTimeInput.sass'

// Components
import { normalize, useDateTimeFormat } from './dateTimeFormat'
import { VFadeTransition } from '@/components/transitions'
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'
import { makeTimeValidationProps, useTimeValidation } from '@/components/VTimePicker/useTimeValidation'
import { VTimePicker } from '@/components/VTimePicker/VTimePicker'

// Composables
import { makeCalendarProps } from '@/composables/calendar'
import { useDate } from '@/composables/date'
import { makeDateFormatProps } from '@/composables/dateFormat'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeFocusProps } from '@/composables/focus'
import { useForm } from '@/composables/form'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { closeWhenFocusLeaves, useOpenOnFocus } from '@/composables/openOnFocus'
import { useProxiedModel } from '@/composables/proxiedModel'
import { createSegmentedEdit } from '@/composables/segmentedMask'

// Utilities
import { computed, reactive, ref, shallowRef, toRef, watch } from 'vue'
import { consoleWarn, genericComponent, isFunction, isNullOrUndefined, omit, pick, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'
import type { VTimePickerViewMode } from '@/components/VTimePicker/shared'

export type VDateTimeInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VDateTimeInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VDateTimeInputActionsSlot
  default: never
}

type Picker = 'date' | 'time'

export const makeVDateTimeInputProps = propsFactory({
  datePickerProps: Object as PropType<VDatePicker['$props']>,
  defaultTime: {
    type: String,
    default: '00:00',
  },
  format: String as PropType<'ampm' | '24hr'>,
  location: {
    type: String as PropType<StrategyProps['location']>,
    default: 'bottom start',
  },
  max: String,
  menu: [Boolean, String] as PropType<boolean | Picker>,
  menuProps: Object as PropType<VMenu['$props']>,
  min: String,
  openOnFocus: Boolean,
  timePickerProps: Object as PropType<VTimePicker['$props']>,
  updateOn: {
    type: Array as PropType<('blur' | 'enter')[]>,
    default: () => ['blur', 'enter'],
  },

  ...pick(makeCalendarProps(), ['allowedDates']),
  ...omit(makeTimeValidationProps(), ['allowedSeconds', 'max', 'min']),
  ...makeDateFormatProps(),
  ...makeDisplayProps({
    mobile: null,
  }),
  ...makeFocusProps(),
  ...makeVConfirmEditProps({
    hideActions: true,
  }),
  ...makeVTextFieldProps({
    prependIcon: '$calendar',
  }),
  modelValue: String as PropType<string | null>,
}, 'VDateTimeInput')

export const VDateTimeInput = genericComponent<VDateTimeInputSlots>()({
  name: 'VDateTimeInput',

  props: makeVDateTimeInputProps(),

  emits: {
    save: (value: string | null) => true,
    cancel: () => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: string | null) => true,
    'update:menu': (val: boolean | Picker) => true,
  },

  setup (props, { emit, slots }) {
    const { isRtl } = useLocale()
    const adapter = useDate()

    const {
      hour12,
      period,
      placeholder,
      readPeriod,
      format,
      getHint,
      mask,
      parse,
      split,
      toDay,
    } = useDateTimeFormat(props, toRef(() => adapter.locale))

    const {
      onBeforeinput,
      onInput: onMaskInput,
      onKeydown: onInputKeydown,
      text,
    } = createSegmentedEdit(mask, ':', undefined, data => hour12.value && !!readPeriod(data))

    const { mobile } = useDisplay(props)
    const { InputIcon } = useInputIcon(props)
    const { isAllowedHour, isAllowedMinute } = useTimeValidation(reactive({
      allowedHours: toRef(() => props.allowedHours),
      allowedMinutes: toRef(() => props.allowedMinutes),
    }))

    const model = useProxiedModel(props, 'modelValue', null, val => normalize(val, props.defaultTime))
    const min = toRef(() => normalize(props.min, '00:00'))
    const max = toRef(() => normalize(props.max, '23:59'))

    watch(() => [props.modelValue, props.min, props.max], values => {
      values
        .filter(value => value && !normalize(value, props.defaultTime))
        .forEach(value => consoleWarn(`VDateTimeInput expects a local date and time without a time zone, e.g. 2026-11-10T14:30, got "${value}"`))
    }, { immediate: true })
    const menu = useProxiedModel(props, 'menu')
    const isMenuActive = computed({
      get: () => !!menu.value,
      set: val => menu.value = val && (menu.value || 'date'),
    })
    // a closing menu keeps its picker until the transition is over
    const picker = computed<Picker>(previous => menu.value ? (menu.value === 'time' ? 'time' : 'date') : previous ?? 'date')
    const form = useForm(props)
    const isEditingInput = shallowRef(false)
    const isFocused = shallowRef(props.focused)
    const viewMode = shallowRef<VTimePickerViewMode>('hour')
    const vTextFieldRef = ref<VTextField>()
    const vMenuRef = ref<VMenu>()
    const hintRef = ref<HTMLElement>()
    const hintWidth = shallowRef(0)
    const disabledActions = ref<typeof VConfirmEdit['props']['disabled']>(['save'])

    useOpenOnFocus(isMenuActive, isFocused, () => props.openOnFocus && !form.isDisabled.value)

    const display = computed(() => model.value ? format(model.value) : '')
    const formatHint = computed(() => getHint(text.value))

    function reset () {
      text.value = display.value
      period.value = model.value ? (model.value.slice(11) < '12' ? 'am' : 'pm') : null
    }

    // the mask writes to the input directly, the text field has to render the same value
    watch(display, reset, { immediate: true })

    const inputmode = computed(() => {
      if (!mobile.value) return undefined
      if (isEditingInput.value) return 'text'

      return 'none'
    })

    const isInteractive = computed(() => !form.isDisabled.value && !form.isReadonly.value)

    const isReadonly = computed(() => {
      if (!props.updateOn.length) return true

      return !(mobile.value && isEditingInput.value) && form.isReadonly.value
    })

    const showHint = toRef(() => isFocused.value && !isReadonly.value && !!text.value)
    const showSegment = toRef(() => isMenuActive.value && !!text.value)

    // the overlay repeats the text in transparent ink, so a background marks the part the open picker edits
    const segments = computed(() => {
      const { date, time, boundary } = split(text.value)

      return [
        { name: 'date', text: date },
        { name: 'separator', text: text.value.slice(boundary, boundary + 1) },
        { name: 'time', text: time },
      ]
    })

    // the input grows to the right, in a right-aligned field the hint has to keep its room after it
    watch([formatHint, showHint, isRtl], () => {
      hintWidth.value = isRtl.value ? hintRef.value?.offsetWidth ?? 0 : 0
    }, { flush: 'post' })

    watch(isMenuActive, val => {
      if (val) return

      isEditingInput.value = false
      disabledActions.value = ['save']
      viewMode.value = 'hour'
    })

    function isAllowedDate (day: string) {
      const date = adapter.parseISO(day)

      if (Array.isArray(props.allowedDates) && props.allowedDates.length) {
        return props.allowedDates.some(allowed => adapter.isSameDay(adapter.date(allowed), date))
      }

      return !isFunction(props.allowedDates) || props.allowedDates(date)
    }

    function clamp (value: string) {
      if (min.value && value < min.value) return min.value
      if (max.value && value > max.value) return max.value

      return value
    }

    function pickerAt (inputElement: HTMLInputElement): Picker {
      return (inputElement.selectionStart ?? 0) > split(inputElement.value).boundary ? 'time' : 'date'
    }

    function onInput (e: InputEvent) {
      const { value } = e.target as HTMLInputElement

      if (hour12.value && !e.isComposing) {
        period.value = readPeriod(value) ?? (/\d/.test(split(value).time) ? period.value : null)
      }

      onMaskInput(e)
    }

    function onKeydown (e: KeyboardEvent) {
      onInputKeydown(e)

      const inputElement = e.target as HTMLInputElement

      if (e.key === 'ArrowDown' && e.altKey) {
        e.preventDefault()
        menu.value = pickerAt(inputElement)
        return
      }

      if (e.key !== 'Enter') return

      if (!isMenuActive.value || !isFocused.value) {
        menu.value = pickerAt(inputElement)
      }

      if (props.updateOn.includes('enter') && !form.isReadonly.value) {
        onUserInput(inputElement)
      }
    }

    function onClick (e: MouseEvent) {
      if (form.isDisabled.value) return

      e.preventDefault()
      e.stopPropagation()

      const target = e.target as HTMLElement

      // a control placed inside the field, e.g. a button in append-inner, opens what it wants itself
      if (target.closest('.v-field button, .v-field a, .v-field [tabindex]:not(input)')) return

      if (isMenuActive.value && mobile.value) {
        isEditingInput.value = !form.isReadonly.value
      } else {
        menu.value = target instanceof HTMLInputElement ? pickerAt(target) : 'date'
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
      if (!isNullOrUndefined(value)) return

      model.value = null
    }

    function onBlur (e: FocusEvent) {
      if ((e.relatedTarget as HTMLElement | null)?.closest('[data-v-date]')) {
        return // first click on a day
      }

      if (props.updateOn.includes('blur') && !form.isReadonly.value) {
        onUserInput(e.target as HTMLInputElement)
      }

      reset()

      if (mobile.value && isEditingInput.value && !isFocused.value) {
        menu.value = false
        isEditingInput.value = false
      }

      closeWhenFocusLeaves(isMenuActive, vTextFieldRef.value?.$el, vMenuRef.value?.contentEl)
    }

    function onUserInput ({ value }: HTMLInputElement) {
      if (!value.trim()) {
        model.value = null
        return
      }

      const parsed = parse(value, props.defaultTime)

      if (
        !parsed ||
        !isAllowedDate(parsed.slice(0, 10)) ||
        !isAllowedHour.value(Number(parsed.slice(11, 13))) ||
        !isAllowedMinute.value(null, Number(parsed.slice(14, 16)))
      ) return

      model.value = clamp(parsed)
    }

    // a click on the clock in its last view is a finished value, the wheel and the first views are not
    let pressedView: VTimePickerViewMode | null = null

    function onTimePickerMousedown (e: MouseEvent) {
      const target = e.target as HTMLElement

      // the picker fields take focus themselves, anything else leaves it in the text field
      if (!target.closest('.v-time-picker-controls__time__field')) e.preventDefault()

      pressedView = target.closest('.v-time-picker-clock') ? viewMode.value : null
    }

    function onTimePickerClick () {
      const isLastView = pressedView === 'minute' && viewMode.value === pressedView

      pressedView = null

      if (isLastView && props.hideActions && model.value) menu.value = false
    }

    useRender(() => {
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const textFieldProps = VTextField.filterProps(omit(props, ['placeholder']))

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          class={['v-date-time-input', { 'v-date-time-input--rtl': isRtl.value }, props.class]}
          style={[{ '--v-date-time-input-hint-width': `${hintWidth.value}px` }, props.style]}
          modelValue={ text.value }
          inputmode={ inputmode.value }
          placeholder={ props.placeholder ?? placeholder.value }
          readonly={ isReadonly.value }
          aria-haspopup="dialog"
          onKeydown={ isInteractive.value ? onKeydown : undefined }
          onBeforeinput={ isInteractive.value ? onBeforeinput : undefined }
          onInput={ isInteractive.value ? onInput : undefined }
          focused={ isMenuActive.value || isFocused.value }
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
                { (showHint.value || showSegment.value) && (
                  <div class="v-date-time-input__overlay" aria-hidden="true">
                    { segments.value.map(({ name, text }) => (
                      <span
                        class={['v-date-time-input__segment', {
                          'v-date-time-input__segment--active': showSegment.value && name === picker.value,
                        }]}
                      >{ text }</span>
                    ))}
                    { showHint.value && (
                      <bdi ref={ hintRef } class="v-date-time-input__format-hint" dir="ltr">
                        { formatHint.value.split(/(\p{L}+)/u).map((part, i) => i % 2 ? <bdi>{ part }</bdi> : part) }
                      </bdi>
                    )}
                  </div>
                )}

                <VMenu
                  ref={ vMenuRef }
                  v-model={ isMenuActive.value }
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
                        const current: string | null = props.hideActions ? model.value : proxyModel.value
                        const day = current?.slice(0, 10)

                        function onUpdateModel (value: string) {
                          if (props.hideActions) {
                            model.value = value
                          } else {
                            proxyModel.value = value
                          }

                          emit('save', value)

                          disabledActions.value = []
                        }

                        // the first date of an empty field goes on to its time, a changed date is done
                        function onPickDate (date: unknown) {
                          onUpdateModel(clamp(`${toDay(date)}T${current?.slice(11) ?? props.defaultTime}`))

                          if (!current) {
                            menu.value = 'time'
                          } else if (props.hideActions) {
                            menu.value = false
                          }
                        }

                        function onPickTime (time: string | null) {
                          if (!time) return

                          onUpdateModel(clamp(`${day ?? toDay(adapter.date())}T${time}`))
                        }

                        const pickerActions = !props.hideActions
                          ? () => slots.actions?.({ save, cancel, isPristine }) ?? actions()
                          : undefined

                        return (
                          <VFadeTransition hideOnLeave>
                            { picker.value === 'date' ? (
                              <VDatePicker
                                key="date"
                                hideHeader
                                showAdjacentMonths
                                min={ min.value && adapter.parseISO(min.value.slice(0, 10)) }
                                max={ max.value && adapter.parseISO(max.value.slice(0, 10)) }
                                allowedDates={ props.allowedDates }
                                disabled={ form.isDisabled.value }
                                readonly={ form.isReadonly.value }
                                { ...props.datePickerProps }
                                modelValue={ day && adapter.parseISO(day) }
                                onUpdate:modelValue={ onPickDate }
                                onMousedown={ (e: MouseEvent) => e.preventDefault() }
                              >
                                {{ actions: pickerActions }}
                              </VDatePicker>
                            ) : (
                              <VTimePicker
                                key="time"
                                hideTitle
                                format={ hour12.value ? 'ampm' : '24hr' }
                                variant={ mobile.value ? 'dial' : 'input' }
                                min={ day && day === min.value?.slice(0, 10) ? min.value.slice(11) : undefined }
                                max={ day && day === max.value?.slice(0, 10) ? max.value.slice(11) : undefined }
                                allowedHours={ props.allowedHours }
                                allowedMinutes={ props.allowedMinutes }
                                disabled={ form.isDisabled.value }
                                readonly={ form.isReadonly.value }
                                { ...props.timePickerProps }
                                v-model:viewMode={ viewMode.value }
                                modelValue={ current?.slice(11) ?? null }
                                onUpdate:modelValue={ onPickTime }
                                onMousedown={ onTimePickerMousedown }
                                onClick={ onTimePickerClick }
                              >
                                {{ actions: pickerActions }}
                              </VTimePicker>
                            )}
                          </VFadeTransition>
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

export type VDateTimeInput = InstanceType<typeof VDateTimeInput>
