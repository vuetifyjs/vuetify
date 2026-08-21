// Styles
import './VDateTimeInput.sass'

// Components
import { makeVConfirmEditProps, VConfirmEdit } from '@/components/VConfirmEdit/VConfirmEdit'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VDivider } from '@/components/VDivider/VDivider'
import { useInputIcon } from '@/components/VInput/InputIcon'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu/VMenu'
import { makeVTextFieldProps, VTextField } from '@/components/VTextField/VTextField'

// Composables
import { useCalendarRange } from '@/composables/calendar'
import { useDate } from '@/composables/date'
import { makeDateFormatProps, useDateFormat } from '@/composables/dateFormat'
import { makeFocusProps } from '@/composables/focus'
import { forwardRefs } from '@/composables/forwardRefs'
import { closeWhenFocusLeaves, useOpenOnFocus } from '@/composables/openOnFocus'
import { useProxiedModel } from '@/composables/proxiedModel'
import { createSegmentedEdit, dateTimeSegments, maskSegments } from '@/composables/segmentedMask'
import { makeTimeFormatProps, useTimeFormat, withPeriod } from '@/composables/timeFormat'

// Utilities
import { computed, nextTick, ref, shallowRef, toRef, watch } from 'vue'
import { genericComponent, omit, propsFactory, useRender } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type { VTextFieldSlots } from '@/components/VTextField/VTextField'

export type VDateTimeInputActionsSlot = {
  save: () => void
  cancel: () => void
  isPristine: boolean
}

export type VDateTimeInputSlots = Omit<VTextFieldSlots, 'default'> & {
  actions: VDateTimeInputActionsSlot
  default: never
}

export const makeVDateTimeInputProps = propsFactory({
  displayFormat: {
    type: [Function, String] as PropType<string | ((date: unknown) => any)>,
    default: undefined,
  },
  location: {
    type: String as PropType<VMenu['$props']['location']>,
    default: 'bottom start',
  },
  menu: Boolean,
  menuProps: Object as PropType<VMenu['$props']>,
  openOnFocus: Boolean,
  updateOn: {
    type: Array as PropType<('blur' | 'enter')[]>,
    default: () => ['blur', 'enter'],
  },
  datePickerProps: Object as PropType<VDatePicker['$props']>,
  timeInterval: {
    type: [Number, String],
    default: 30,
  },

  ...makeDateFormatProps(),
  ...makeTimeFormatProps({ format: '24hr' }),
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
    'multiple',
    'title',
  ]),
}, 'VDateTimeInput')

export const VDateTimeInput = genericComponent<VDateTimeInputSlots>()({
  name: 'VDateTimeInput',

  props: makeVDateTimeInputProps(),

  emits: {
    save: (value: unknown) => true,
    cancel: () => true,
    'update:focused': (val: boolean) => true,
    'update:modelValue': (val: unknown) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const adapterLocale = computed(() => adapter.locale)
    const { parseDate, formatDate, parserFormat, order, separator } = useDateFormat(props, adapterLocale)
    const timeFormat = useTimeFormat(toRef(() => ({
      useSeconds: props.useSeconds,
      format: props.format,
    })))
    const { InputIcon } = useInputIcon(props)
    const { clampDate } = useCalendarRange(props)

    const model = useProxiedModel(
      props,
      'modelValue',
      null,
      val => val ? adapter.toJsDate(val) : val,
      val => val ? adapter.date(val) : val,
    )

    const menu = useProxiedModel(props, 'menu')
    const isFocused = shallowRef(props.focused)
    const vTextFieldRef = ref<VTextField>()
    const vMenuRef = ref<VMenu>()
    const disabledActions = ref<typeof VConfirmEdit['props']['disabled']>(['save'])

    useOpenOnFocus(menu, isFocused, () => props.openOnFocus && !props.disabled)

    const segments = computed(() => dateTimeSegments(order.value, separator.value, {
      useSeconds: props.useSeconds,
      hour12: props.format === 'ampm',
    }))

    function timeFromModel (value: unknown) {
      if (!value || !adapter.isValid(value)) return null
      const hours = adapter.getHours(value)
      const minutes = adapter.getMinutes(value)
      const pad = (n: number) => String(n).padStart(2, '0')
      if (props.useSeconds) {
        const seconds = adapter.toJsDate(value).getSeconds()
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
      }
      return `${pad(hours)}:${pad(minutes)}`
    }

    function withTime (date: unknown, time: string | null) {
      if (!date || !adapter.isValid(date)) return null
      if (!time) return adapter.startOfDay(date)

      const [hours, minutes, seconds = '0'] = time.split(':')
      let next = adapter.setHours(date, Number(hours))
      next = adapter.setMinutes(next, Number(minutes))
      if (props.useSeconds) {
        const jsDate = adapter.toJsDate(next)
        jsDate.setSeconds(Number(seconds))
        return adapter.date(jsDate)
      }
      return next
    }

    const timeOptions = computed(() => {
      const step = Math.max(1, Math.min(720, Number(props.timeInterval) || 30))
      const pad = (n: number) => String(n).padStart(2, '0')
      const values: string[] = []
      for (let minutes = 0; minutes < 1440; minutes += step) {
        values.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`)
      }

      const current = timeFromModel(model.value)?.slice(0, 5)
      if (current && !values.includes(current)) {
        values.push(current)
        values.sort()
      }

      return values.map(value => ({ value, title: timeFormat.formatTime(value) }))
    })

    const timesRef = ref<{ $el: HTMLElement }>()

    watch(menu, async val => {
      if (!val) return
      await nextTick()
      const list = timesRef.value?.$el
      const active = list?.querySelector<HTMLElement>('.v-list-item--active')
      if (list && active) list.scrollTop = active.offsetTop - (list.clientHeight - active.clientHeight) / 2
    })

    function formatDisplay (value: unknown) {
      if (!value || !adapter.isValid(value)) return ''
      if (typeof props.displayFormat === 'function') return props.displayFormat(value)
      if (props.displayFormat) return adapter.format(value, props.displayFormat)
      return `${formatDate(value)} ${timeFormat.formatTime(timeFromModel(value))}`
    }

    const display = computed(() => formatDisplay(model.value))
    const placeholder = computed(() => (
      props.placeholder ?? `${parserFormat.value} ${timeFormat.parserFormat.value}`
    ))
    const isInteractive = computed(() => !props.disabled && !props.readonly)
    const isReadonly = computed(() => !props.updateOn.length || props.readonly)

    watch(menu, val => {
      if (!val) disabledActions.value = ['save']
    })

    function maskDateTime (input: string) {
      const text = input.trimStart()
      return withPeriod(
        maskSegments(segments.value, text.replace(/[^\d/.\- :]/g, '')),
        text,
        props.format === 'ampm',
      )
    }

    const { onBeforeinput, onInput } = createSegmentedEdit(maskDateTime)

    function parseDateTime (text: string) {
      const match = text.trim().match(/^(.+?)\s+(\d{1,2}:\d{1,2}(?::\d{1,2})?(?:\s*[ap]m?)?)$/i)
      if (!match) return null

      const date = parseDate(match[1])
      const time = timeFormat.parseTime(match[2])
      if (!date || !time) return null
      return clampDate(withTime(date, time))
    }

    function onKeydown (e: KeyboardEvent) {
      if (e.key !== 'Enter') return

      if (!menu.value || !isFocused.value) menu.value = true

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

    function onSave (value: unknown) {
      emit('save', value)
      menu.value = false
    }

    function onUpdateDisplayModel (value: unknown) {
      if (value != null) return
      model.value = null
    }

    function onBlur (e: FocusEvent) {
      if ((e.relatedTarget as HTMLElement | null)?.closest('[data-v-date], .v-date-time-input__picker')) {
        return
      }

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

      const parsed = parseDateTime(value)
      if (parsed) model.value = parsed
    }

    function commit (target: Ref<any>, value: unknown) {
      target.value = value
      emit('save', value)
      disabledActions.value = []
    }

    function onUpdateDate (target: Ref<any>, value: unknown) {
      commit(target, withTime(value, timeFromModel(target.value) ?? timeFormat.parseTime('00:00')))
    }

    function onUpdateTime (target: Ref<any>, value: string | null) {
      const date = target.value && adapter.isValid(target.value)
        ? target.value
        : adapter.startOfDay(clampDate(adapter.date()))
      commit(target, withTime(date, value))
    }

    function onSelectTime (target: Ref<any>, value: string) {
      onUpdateTime(target, value)
      if (props.hideActions) menu.value = false
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
        ...props.datePickerProps,
      }
      const textFieldProps = VTextField.filterProps(omit(props, ['placeholder']))

      return (
        <VTextField
          ref={ vTextFieldRef }
          { ...textFieldProps }
          class={['v-date-time-input', props.class]}
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
                        const active = props.hideActions ? model : proxyModel
                        const dateValue = active.value && adapter.isValid(active.value)
                          ? adapter.startOfDay(active.value)
                          : null
                        const timeValue = timeFromModel(active.value)

                        return (
                          <div class="v-date-time-input__picker" data-v-date>
                            <div class="v-date-time-input__body">
                              <VDatePicker
                                { ...datePickerProps }
                                modelValue={ dateValue }
                                onUpdate:modelValue={ value => onUpdateDate(active, value) }
                                onMousedown={ (e: MouseEvent) => e.preventDefault() }
                              />

                              <VDivider vertical />

                              <div class="v-date-time-input__times">
                                <VList
                                  ref={ timesRef }
                                  density="compact"
                                  onMousedown={ (e: MouseEvent) => e.preventDefault() }
                                  slim
                                >
                                  { timeOptions.value.map(option => (
                                    <VListItem
                                      key={ option.value }
                                      active={ option.value === timeValue?.slice(0, 5) }
                                      color={ props.color }
                                      disabled={ props.disabled || props.readonly }
                                      title={ option.title }
                                      onClick={ () => onSelectTime(active, option.value) }
                                    />
                                  ))}
                                </VList>
                              </div>
                            </div>

                            { !props.hideActions && (
                              <div class="v-date-time-input__actions">
                                { slots.actions?.({ save, cancel, isPristine }) ?? actions() }
                              </div>
                            )}
                          </div>
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
