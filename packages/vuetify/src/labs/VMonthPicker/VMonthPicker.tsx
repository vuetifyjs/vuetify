// Styles
import './VMonthPicker.sass'

// Components
import { VFadeTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VDatePickerHeader } from '@/components/VDatePicker/VDatePickerHeader'
import { VDatePickerYears } from '@/components/VDatePicker/VDatePickerYears'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useMonthPicker } from './month-picker'
import { useBackgroundColor } from '@/composables/color'
import { useDate } from '@/composables/date'
import { IconValue } from '@/composables/icons'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, shallowRef, toRef, watch } from 'vue'
import { chunkArray, createRange, genericComponent, omit, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export type VMonthPickerSlots = {
  header: never
  title: never
  actions: never
  month: {
    month: {
      text: string
      label: string
      value: number
    }
    i: number
    props: Record<string, unknown>
  }
}

export const makeVMonthPickerProps = propsFactory({
  disabled: Boolean,
  readonly: Boolean,
  selectedIcon: {
    type: IconValue,
    default: '$complete',
  },
  nextIcon: {
    type: IconValue,
    default: '$next',
  },
  prevIcon: {
    type: IconValue,
    default: '$prev',
  },
  modeIcon: {
    type: IconValue,
    default: '$subgroup',
  },
  modelValue: null,
  headerColor: String,
  min: String,
  max: String,
  multiple: [Boolean, String] as PropType<boolean | 'range'>,
  allowedMonths: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
  allowedYears: [Array, Function] as PropType<VDatePickerYears['$props']['allowedYears']>,
  monthsColumns: {
    type: [Number, String],
    default: 4,
  },
  yearsColumns: {
    type: [Number, String],
    default: 3,
  },
  transition: {
    type: String,
    default: 'picker-transition',
  },
  reverseTransition: {
    type: String,
    default: 'picker-reverse-transition',
  },

  ...omit(makeVPickerProps({ title: '$vuetify.monthPicker.title' }), ['landscape']),
}, 'VMonthPicker')

export const VMonthPicker = genericComponent<new <
  Multiple extends boolean | 'range' = false,
  TModel = Multiple extends true | 'range' ? string[] : string | null,
> (
  props: {
    modelValue?: TModel
    'onUpdate:modelValue'?: (value: TModel) => void
    multiple?: Multiple
  },
  slots: VMonthPickerSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VMonthPicker',

  props: makeVMonthPickerProps(),

  emits: {
    'update:modelValue': (value: any) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => wrapInArray(v),
      v => props.multiple ? v : v[0],
    )

    const adapter = useDate()
    const { t } = useLocale()

    const now = adapter.date()
    const currentYear = adapter.getYear(now)
    const currentMonth = adapter.getMonth(now)

    const isReverse = shallowRef(false)
    const transition = toRef(() => {
      return !isReverse.value ? props.transition : props.reverseTransition
    })

    const {
      year,
      disablePrevYear,
      disableNextYear,
      prevYear,
      nextYear,
      selectMonth,
      getMonthValue,
      range,
    } = useMonthPicker(props, model)

    const viewMode = shallowRef<'months' | 'years'>('months')

    function toggleViewMode () {
      viewMode.value = viewMode.value === 'years' ? 'months' : 'years'
    }

    function onUpdateYear (v: number) {
      year.value = v
      // Brief delay so the year-grid click feedback is visible before the view swaps
      setTimeout(() => { viewMode.value = 'months' }, 100)
    }

    const headerText = computed(() => {
      const values = model.value
      if (values.length === 0) {
        return props.multiple === 'range'
          ? t('$vuetify.monthPicker.range.title')
          : t('$vuetify.monthPicker.header')
      }
      if (props.multiple === 'range' && values.length === 2) {
        const startDate = adapter.parseISO(`${values[0]}-01`)
        const endDate = adapter.parseISO(`${values[1]}-01`)
        const start = `${adapter.format(startDate, 'monthShort')} ${adapter.format(startDate, 'year')}`
        const end = `${adapter.format(endDate, 'monthShort')} ${adapter.format(endDate, 'year')}`
        return `${start} – ${end}`
      }
      if (props.multiple && values.length > 1) {
        return t('$vuetify.monthPicker.itemsSelected', values.length)
      }
      const last = values[values.length - 1]
      return adapter.format(adapter.parseISO(`${last}-01`), 'monthAndYear')
    })

    const headerColor = toRef(() => props.headerColor ?? props.color)
    const { backgroundColorClasses: rangeColorClasses, backgroundColorStyles: rangeColorStyles } = useBackgroundColor(() => props.color)

    const headerTransition = toRef(() => `date-picker-header${isReverse.value ? '-reverse' : ''}-transition`)

    watch(year, (newVal, oldVal) => {
      isReverse.value = newVal < oldVal
    })

    const months = computed(() => {
      let date = adapter.startOfYear(adapter.date())
      date = adapter.setYear(date, year.value)

      return createRange(12).map(i => {
        const text = adapter.format(date, 'monthShort')
        const label = adapter.format(date, 'month')
        const isDisabled =
          !!(
            !isMonthAllowed(i) ||
            (props.min && adapter.isAfter(adapter.startOfMonth(adapter.date(props.min + '-01')), date)) ||
            (props.max && adapter.isAfter(date, adapter.startOfMonth(adapter.date(props.max + '-01'))))
          )
        date = adapter.getNextMonth(date)

        return {
          isCurrent: year.value === currentYear && i === currentMonth,
          isDisabled,
          text,
          label,
          value: i,
        }
      })
    })

    const isListView = computed(() => Number(props.monthsColumns) === 1)

    const monthRows = computed(() => {
      const cols = Number(props.monthsColumns) || 4
      return chunkArray(months.value, cols)
    })

    function isMonthAllowed (month: number) {
      if (Array.isArray(props.allowedMonths) && props.allowedMonths.length) {
        return props.allowedMonths.includes(month)
      }
      if (typeof props.allowedMonths === 'function') {
        return props.allowedMonths(month)
      }
      return true
    }

    useRender(() => {
      const pickerProps = VPicker.filterProps(props)

      return (
        <VPicker
          { ...pickerProps }
          class={[
            'v-month-picker',
            {
              'v-month-picker--list': isListView.value,
              'v-month-picker--years': viewMode.value === 'years',
            },
            props.class,
          ]}
          color={ headerColor.value }
          title={ t(props.title) }
          style={[
            {
              '--v-month-picker-months-columns': props.monthsColumns,
              '--v-month-picker-years-columns': props.yearsColumns,
            },
            props.style,
          ]}
        >
          {{
            header: () => (
              <VDatePickerHeader color={ headerColor.value } header={ headerText.value } transition={ headerTransition.value } />
            ),
            default: () => (
              <>
                <VDefaultsProvider defaults={{ VBtn: { variant: 'text' } }}>
                  <div class="v-month-picker__controls">
                    <VBtn
                      disabled={ props.disabled || viewMode.value === 'years' || disablePrevYear.value }
                      icon={ props.prevIcon }
                      aria-label={ t('$vuetify.monthPicker.ariaLabel.previousYear') }
                      onClick={ prevYear }
                    />
                    <VBtn
                      disabled={ props.disabled }
                      text={ year.value }
                      appendIcon={ props.modeIcon }
                      rounded
                      aria-label={ t('$vuetify.monthPicker.ariaLabel.selectYear') }
                      onClick={ toggleViewMode }
                    />
                    <VBtn
                      disabled={ props.disabled || viewMode.value === 'years' || disableNextYear.value }
                      icon={ props.nextIcon }
                      aria-label={ t('$vuetify.monthPicker.ariaLabel.nextYear') }
                      onClick={ nextYear }
                    />
                  </div>
                </VDefaultsProvider>

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'years' ? (
                    <VDatePickerYears
                      key="years"
                      color={ props.color }
                      modelValue={ year.value }
                      min={ props.min ? `${props.min}-01` : undefined }
                      max={ props.max ? `${props.max}-01` : undefined }
                      allowedYears={ props.allowedYears }
                      onUpdate:modelValue={ onUpdateYear }
                    />
                  ) : (
                    <div
                      key="months"
                      class="v-month-picker__months flex-grow-1"
                    >
                      <MaybeTransition name={ transition.value }>
                        <div
                          key={ year.value }
                          class="v-month-picker__months-content"
                          onMouseleave={ range.clearPreview }
                        >
                          { monthRows.value.map((row, rowIndex) => {
                            const cols = Number(props.monthsColumns) || 4
                            return (
                              <div class="v-month-picker__months-row">
                                { row.map((month, colIndex) => {
                                  const index = rowIndex * cols + colIndex
                                  const monthValue = getMonthValue(index)
                                  const rangeStart = range.isRangeStart(monthValue)
                                  const rangeEnd = range.isRangeEnd(monthValue)
                                  const rangeMiddle = range.isRangeMiddle(monthValue)
                                  const previewStart = range.isPreviewStart(monthValue)
                                  const previewEnd = range.isPreviewEnd(monthValue)
                                  const previewMiddle = range.isPreviewMiddle(monthValue)
                                  const previewed = range.isInPreviewRange(monthValue)
                                  const selected = range.isSelected(monthValue) && !rangeMiddle

                                  const variant = isListView.value
                                    ? (selected ? 'tonal' : 'text')
                                    : (selected ? 'flat' : (month.isCurrent ? 'outlined' : 'text'))

                                  const icon = isListView.value && selected ? props.selectedIcon : undefined

                                  const btnProps = {
                                    color: (selected || (month.isCurrent && !isListView.value))
                                      ? props.color
                                      : undefined,
                                    disabled: props.disabled || month.isDisabled,
                                    readonly: props.readonly,
                                    rounded: isListView.value ? 0 : true,
                                    text: isListView.value ? month.label : month.text,
                                    prependIcon: icon,
                                    variant,
                                    ripple: false,
                                    'aria-label': month.isCurrent
                                      ? t('$vuetify.monthPicker.ariaLabel.currentMonth', month.label)
                                      : month.label,
                                    'aria-current': month.isCurrent ? 'date' : undefined,
                                    'aria-selected': selected,
                                    onClick: () => selectMonth(index),
                                    onMouseenter: () => range.setPreview(monthValue),
                                    onFocus: () => range.setPreview(monthValue),
                                    onBlur: range.clearPreview,
                                  } as const

                                  const hasRangeBg = rangeStart || rangeEnd || rangeMiddle
                                  const hasPreviewBg = previewStart || previewEnd || previewMiddle

                                  return (
                                    <div
                                      class={[
                                        'v-month-picker__month',
                                        {
                                          'v-month-picker__month--current': month.isCurrent,
                                          'v-month-picker__month--selected': selected,
                                          'v-month-picker__month--range-start': rangeStart,
                                          'v-month-picker__month--range-end': rangeEnd,
                                          'v-month-picker__month--range-middle': rangeMiddle,
                                          'v-month-picker__month--preview-start': previewStart,
                                          'v-month-picker__month--preview-end': previewEnd,
                                          'v-month-picker__month--preview-middle': previewMiddle,
                                          'v-month-picker__month--previewed': previewed,
                                        },
                                      ]}
                                    >
                                      { (hasRangeBg || hasPreviewBg) && (
                                        <div
                                          key="range-background"
                                          class={[
                                            'v-month-picker__range-bg',
                                            hasRangeBg ? 'v-month-picker__range-bg--range' : 'v-month-picker__range-bg--preview',
                                            rangeColorClasses.value,
                                          ]}
                                          style={ rangeColorStyles.value }
                                        />
                                      )}
                                      { slots.month?.({
                                        month,
                                        i: index,
                                        props: btnProps,
                                      }) ?? (
                                        <VBtn
                                          { ...btnProps }
                                        />
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )
                          })}
                        </div>
                      </MaybeTransition>
                    </div>
                  )}
                </VFadeTransition>
              </>
            ),
            actions: slots.actions,
          }}
        </VPicker>
      )
    })

    return {}
  },
})

export type VMonthPicker = InstanceType<typeof VMonthPicker>
