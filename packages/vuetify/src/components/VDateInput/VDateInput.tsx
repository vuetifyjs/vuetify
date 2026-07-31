// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useCalendarRange } from '@/composables/calendar'
import { useDate } from '@/composables/date'
import { makeDateFormatProps, useDateFormat } from '@/composables/dateFormat'
import { makeDisplayProps, useDisplay } from '@/composables/display'
import { makeFocusProps } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'
import { genericComponent, omit, pick, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { VDatePickerSlots } from '@/components/VDatePicker/VDatePicker'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'
import type { GenericProps } from '@/util'

// Types
export type VDateInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VDateInputSlots = Omit<VTextFieldSlots, 'default'> &
  Pick<VDatePickerSlots, 'title' | 'header' | 'day' | 'month' | 'year'> & {
    actions: VDateInputActionsSlot
    default: never
  }

export const makeVDateInputProps = propsFactory({
  displayFormat: {
    type: [Function, String] as PropType<string | ((date: unknown) => any)>,
    default: undefined,
  },
  location: {
    type: String as PropType<StrategyProps['location']>,
    default: 'bottom start',
  },
  menu: Boolean,
  menuProps: Object as PropType<VMenu['$props']>,
  updateOn: {
    type: Array as PropType<('blur' | 'enter')[]>,
    default: () => ['blur', 'enter'],
  },
  pickerProps: Object as PropType<VDatePicker['$props']>,

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
  ...omit(makeVDatePickerProps({
    hideHeader: true,
    showAdjacentMonths: true,
  }), [
    'location',
    'rounded',
    'height',
    'minHeight',
    'maxHeight',
  ]),
}, 'VDateInput')

export const VDateInput = genericComponent<new <
  T,
  Multiple extends boolean | 'range' | number | (string & {}) = false,
  TModel = Multiple extends true | number | string
    ? T[]
    : T,
> (
  props: {
    modelValue?: TModel
    onSave?: (value: TModel) => void
    'onUpdate:modelValue'?: (value: TModel) => void
    multiple?: Multiple
  },
  slots: VDateInputSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDateInput',

  props: makeVDateInputProps(),

  emits: {
    save: (value: unknown) => true,
    cancel: () => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: unknown) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const { t } = useLocale()
    const adapter = useDate()
    const adapterLocale = computed(() => adapter.locale)
    const { isValid, maskDate, parseDate, formatDate, parserFormat } = useDateFormat(props, adapterLocale)
    const { mobile } = useDisplay(props)
    const { InputIcon } = useInputIcon(props)

    const { clampDate, isInAllowedRange } = useCalendarRange(props)

    const emptyModelValue = () => props.multiple ? [] : null

    const model = useProxiedModel(
      props,
      'modelValue',
      emptyModelValue(),
      val => Array.isArray(val) ? val.map(item => adapter.toJsDate(item)) : val ? adapter.toJsDate(val) : val,
      val => Array.isArray(val) ? val.map(item => adapter.date(item)) : val ? adapter.date(val) : val
    )

    const menu = useProxiedModel(props, 'menu')
    const isEditingInput = shallowRef(false)
    const isFocused = shallowRef(props.focused)
    const vTextFieldRef = ref<VTextField>()
    let edit: { value: string, start: number, end: number } | undefined
    const disabledActions = ref<typeof VConfirmEdit['props']['disabled']>(['save'])

    function format (date: unknown) {
      if (typeof props.displayFormat === 'function') {
        return props.displayFormat(date)
      }
      if (props.displayFormat) {
        return adapter.format(date, props.displayFormat ?? 'keyboardDate')
      }
      return formatDate(date)
    }

    const display = computed(() => {
      const value = wrapInArray(model.value)

      if (!value.length) return null

      if (props.multiple === true) {
        return t('$vuetify.datePicker.itemsSelected', value.length)
      }

      if (props.multiple === 'range') {
        const start = value[0]
        const end = value[value.length - 1]

        if (!adapter.isValid(start) || !adapter.isValid(end)) return ''

        return `${format(adapter.date(start))} - ${format(adapter.date(end))}`
      }

      return adapter.isValid(model.value) ? format(adapter.date(model.value)) : ''
    })

    const placeholder = computed(() => {
      if (props.placeholder) return props.placeholder

      if (props.multiple === 'range') return `${parserFormat.value} - ${parserFormat.value}`
      if (props.multiple) return `${parserFormat.value}, ...`

      return parserFormat.value
    })

    const inputmode = computed(() => {
      if (!mobile.value) return undefined
      if (isEditingInput.value) return 'text'

      return 'none'
    })

    const isInteractive = computed(() => !props.disabled && !props.readonly)

    const isReadonly = computed(() => {
      if (!props.updateOn.length) return true

      return !(mobile.value && isEditingInput.value) && props.readonly
    })

    watch(menu, val => {
      if (val) return

      isEditingInput.value = false
      disabledActions.value = ['save']
    })

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) {
        menu.value = true
      }

      if (props.updateOn.includes('enter') && !props.readonly) {
        onUserInput(e.target as HTMLInputElement)
      }
    }

    function onBeforeinput (e: InputEvent) {
      const el = e.target as HTMLInputElement

      edit = { value: el.value, start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0 }
    }

    // sections have a fixed width, so typing inside one overwrites instead of shifting
    function overtype (text: string, start: number, typed: string): [string, number] {
      const chars = [...text]
      const isDigit = (index: number) => /\d/.test(chars[index])
      let caret = start

      for (const char of typed) {
        while (caret < chars.length && !isDigit(caret)) caret++

        if (!/\d/.test(char)) {
          // a typed separator jumps to the next section
          while (caret < chars.length && isDigit(caret)) caret++
        } else if (caret < chars.length) {
          chars[caret++] = char
        }
      }

      while (caret < chars.length && !isDigit(caret)) caret++

      return [chars.join(''), caret]
    }

    function onInput (e: InputEvent) {
      if (e.isComposing || e.inputType?.startsWith('delete')) return

      const el = e.target as HTMLInputElement
      const previous = edit?.value ?? ''
      // a value the mask would rewrite has no sections to overwrite, e.g. after a backspace
      const isInside = !!edit && edit.start < previous.length &&
        edit.end - edit.start < previous.length &&
        maskDate(previous, props.multiple) === previous

      const [value, caret] = isInside
        ? overtype(previous, edit!.start, el.value.slice(edit!.start, el.value.length - previous.length + edit!.end))
        : [maskDate(el.value, props.multiple)]

      if (value === el.value) return

      el.value = value
      el.setSelectionRange(caret ?? value.length, caret ?? value.length)
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

    function onSave (value: string) {
      emit('save', value)
      menu.value = false
    }

    function onUpdateDisplayModel (value: unknown) {
      if (value != null) return

      model.value = emptyModelValue()
    }

    function onBlur (e: FocusEvent) {
      if ((e.relatedTarget as HTMLElement | null)?.closest('[data-v-date]')) {
        return // first click on a day
      }

      if (props.updateOn.includes('blur') && !props.readonly) {
        onUserInput(e.target as HTMLInputElement)
      }

      // When in mobile mode and editing is done (due to keyboard dismissal), close the menu
      if (mobile.value && isEditingInput.value && !isFocused.value) {
        menu.value = false
        isEditingInput.value = false
      }
    }

    function onUserInput ({ value }: HTMLInputElement) {
      if (!value.trim()) {
        model.value = emptyModelValue()
      } else if (!props.multiple) {
        if (isValid(value)) {
          model.value = clampDate(parseDate(value))
        }
      } else {
        const parts = value.trim().split(/\D+-\D+|[^\d\-/.]+/).filter(Boolean)
        if (parts.every(isValid)) {
          if (props.multiple === 'range') {
            const [start, stop] = parts
              .map(parseDate)
              .map(clampDate)
              .toSorted((a, b) => adapter.isAfter(a, b) ? 1 : -1)
            model.value = stop == null ? [start] : [start, adapter.endOfDay(stop)]
          } else {
            model.value = parts
              .map(parseDate)
              .filter(isInAllowedRange)
          }
        }
      }
    }

    useRender(() => {
      const hasPrepend = !!(props.prependIcon || slots.prepend)
      const confirmEditProps = VConfirmEdit.filterProps(props)
      const datePickerProps = {
        ...VDatePicker.filterProps(omit(props, [
          'active',
          'bgColor',
          'color',
          'location',
          'rounded',
          'maxWidth',
          'minWidth',
          'width',
        ])),
        ...props.pickerProps,
      }
      const datePickerSlots = pick(slots, ['title', 'header', 'day', 'month', 'year'])
      const textFieldProps = VTextField.filterProps(omit(props, ['placeholder']))

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          class={['v-date-input', props.class]}
          style={ props.style }
          modelValue={ display.value }
          inputmode={ inputmode.value }
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
                        function onUpdateModel (value: string) {
                          if (!props.hideActions) {
                            proxyModel.value = value
                          } else {
                            model.value = value

                            if (!props.multiple) {
                              menu.value = false
                            }
                          }

                          emit('save', value)

                          disabledActions.value = []
                        }

                        return (
                          <VDatePicker
                            { ...datePickerProps }
                            modelValue={ props.hideActions ? model.value : proxyModel.value }
                            onUpdate:modelValue={ value => onUpdateModel(value) }
                            onMousedown={ (e: MouseEvent) => e.preventDefault() }
                          >
                            {{
                              ...datePickerSlots,
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

export type VDateInput = InstanceType<typeof VDateInput>
