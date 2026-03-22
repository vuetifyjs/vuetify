// Styles
import './VMonthPicker.sass'

// Components
import { VFadeTransition } from '@/components/transitions'
import { VBtn } from '@/components/VBtn'
import { VDatePickerHeader } from '@/components/VDatePicker/VDatePickerHeader'
import { VDatePickerYears } from '@/components/VDatePicker/VDatePickerYears'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useMonthPicker } from './useMonthPicker'
import { useDate } from '@/composables/date'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'
import { MaybeTransition } from '@/composables/transition'

// Utilities
import { computed, type Ref, shallowRef, toRef, watch } from 'vue'
import { chunkArray, createRange, genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

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
  modelValue: {
    type: null as any as PropType<string | string[] | null>,
    default: null,
  },
  min: String,
  max: String,
  multiple: [Boolean, String] as PropType<boolean | 'range'>,
  allowedMonths: [Array, Function] as PropType<number[] | ((date: number) => boolean)>,
  monthsColumns: {
    type: [Number, String],
    default: 4,
  },
  yearsColumns: {
    type: [Number, String],
    default: 4,
  },
  transition: {
    type: String,
    default: 'picker-transition',
  },
  reverseTransition: {
    type: String,
    default: 'picker-reverse-transition',
  },
  ...makeVPickerProps({
    title: 'Select month', // later: '$vuetify.monthPicker.title'
  }),
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
    'update:modelValue': (_value: any) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(
      props,
      'modelValue',
      undefined,
      v => (props.multiple ? wrapInArray(v) : v) as string | string[] | null,
      v => (props.multiple ? v : v) as string | string[] | null,
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
      viewMode,
      year,
      headerText,
      disablePrevYear,
      disableNextYear,
      prevYear,
      nextYear,
      toggleViewMode,
      setYear,
      selectMonth,
      isMonthSelected,
      isMonthRangeStart,
      isMonthRangeEnd,
      isMonthRangeMiddle,
      previewMonth,
      clearPreview,
      isMonthPreviewStart,
      isMonthPreviewEnd,
      isMonthPreviewMiddle,
      isMonthPreviewed,
    } = useMonthPicker(props, model as Ref<string | string[] | null>)

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
      return (
        <VPicker
          class="v-month-picker"
          color={ props.color }
          title={ props.title }
          style={{
            '--v-month-picker-months-columns': props.monthsColumns,
            '--v-month-picker-years-columns': props.yearsColumns,
          }}
        >
          {{
            header: () => (
              <VDatePickerHeader header={ headerText.value } transition={ headerTransition.value } />
            ),
            default: () => (
              <>
                <VDefaultsProvider defaults={{ VBtn: { variant: 'text' } }}>
                  <div class="v-month-picker__controls pa-3 pb-0 d-flex justify-space-between align-center flex-grow-1">
                    <VBtn
                      disabled={ disablePrevYear.value }
                      icon="$prev"
                      aria-label={ t('$vuetify.monthPicker.ariaLabel.previousYear') }
                      onClick={ prevYear }
                    />
                    <VBtn
                      rounded
                      aria-label={ t('$vuetify.monthPicker.ariaLabel.selectYear') }
                      onClick={ toggleViewMode }
                      text={ year.value }
                      v-slots={{
                        append: () => (
                          <VIcon
                            icon="$dropdown"
                            style={{
                              transition: 'transform .2s ease-in-out',
                              transform: `rotate(${viewMode.value === 'years' ? 180 : 0}deg)`,
                            }}
                          />
                        ),
                      }}
                    />
                    <VBtn
                      disabled={ disableNextYear.value }
                      icon="$next"
                      aria-label={ t('$vuetify.monthPicker.ariaLabel.nextYear') }
                      onClick={ nextYear }
                    />
                  </div>
                </VDefaultsProvider>

                <VFadeTransition hideOnLeave>
                  { viewMode.value === 'years' ? (
                    <VDatePickerYears
                      key="years"
                      class="flex-grow-1"
                      modelValue={ year.value }
                      min={ props.min }
                      max={ props.max }
                      onUpdate:modelValue={ setYear }
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
                          onMouseleave={ clearPreview }
                        >
                          { monthRows.value.map((row, rowIndex) => {
                            const cols = Number(props.monthsColumns) || 4
                            return (
                              <div class="v-month-picker__months-row">
                                { row.map((month, colIndex) => {
                                  const i = rowIndex * cols + colIndex
                                  const selected = isMonthSelected(i)
                                  const rangeStart = isMonthRangeStart(i)
                                  const rangeEnd = isMonthRangeEnd(i)
                                  const rangeMiddle = isMonthRangeMiddle(i)
                                  const previewStart = isMonthPreviewStart(i)
                                  const previewEnd = isMonthPreviewEnd(i)
                                  const previewMiddle = isMonthPreviewMiddle(i)
                                  const previewed = isMonthPreviewed(i)

                                  const btnProps = {
                                    active: selected && !rangeMiddle,
                                    color: (selected || month.isCurrent) ? props.color : undefined,
                                    disabled: month.isDisabled,
                                    rounded: true,
                                    text: month.text,
                                    variant: (selected && !rangeMiddle) ? 'flat' : month.isCurrent ? 'outlined' : 'text',
                                    'aria-label': month.isCurrent
                                      ? t('$vuetify.monthPicker.ariaLabel.currentMonth', month.label)
                                      : month.label,
                                    'aria-current': month.isCurrent ? 'date' : undefined,
                                    'aria-selected': selected,
                                    onClick: () => selectMonth(i),
                                    onMouseenter: () => previewMonth(i),
                                    onFocus: () => previewMonth(i),
                                    onBlur: clearPreview,
                                  } as const

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
                                      { slots.month?.({
                                        month,
                                        i,
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
