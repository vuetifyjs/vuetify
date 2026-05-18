// Styles
import './VDateRangePicker.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { makeVDatePickerProps, VDatePicker } from '@/components/VDatePicker/VDatePicker'
import { VSpacer } from '@/components/VGrid'
import { makeVPickerProps, VPicker } from '@/labs/VPicker/VPicker'

// Composables
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, nextTick, shallowRef, watch } from 'vue'
import { genericComponent, pick, propsFactory, useRender } from '@/util'

// Types
import type { VDatePickerControlsDefaultSlotProps } from '@/components/VDatePicker/VDatePickerControls'
import type { GenericProps } from '@/util'

export type VDateRangePickerSlots = {
  default: never
  footer: never
}

const datePickerForwardedKeys = [
  'min',
  'max',
  'allowedDates',
  'allowedMonths',
  'allowedYears',

  'weekdays',
  'firstDayOfWeek',
  'firstDayOfYear',
  'weekdayFormat',
  'weeksInMonth',
  'hideWeekdays',
  'showWeek',

  'color',
  'readonly',
  'disabled',
  'prevIcon',
  'nextIcon',
  'transition',
  'reverseTransition',
  'controlHeight',
] as const

export const makeVDateRangePickerProps = propsFactory({
  independentMonths: Boolean,
  modelValue: null,

  ...makeVPickerProps({ title: '$vuetify.datePicker.title' }),
  ...pick(makeVDatePickerProps(), datePickerForwardedKeys),
}, 'VDateRangePicker')

export const VDateRangePicker = genericComponent<new <
  T,
  TModel = T[],
> (
  props: {
    modelValue?: TModel
    'onUpdate:modelValue'?: (value: TModel) => void
  },
  slots: VDateRangePickerSlots
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VDateRangePicker',

  props: makeVDateRangePickerProps(),

  emits: {
    'update:modelValue': (_value: any) => true,
  },

  setup (props, { slots }) {
    const adapter = useDate()

    const model = useProxiedModel(props, 'modelValue', [])

    const today = adapter.date()
    const leftMonth = shallowRef(adapter.getMonth(today))
    const leftYear = shallowRef(adapter.getYear(today))
    const rightMonth = shallowRef(0)
    const rightYear = shallowRef(0)

    function shiftMonth (month: number, year: number, delta: number) {
      const total = month + delta + year * 12

      return {
        month: ((total % 12) + 12) % 12,
        year: Math.floor(total / 12),
      }
    }

    function syncRightFromLeft () {
      const next = shiftMonth(leftMonth.value, leftYear.value, 1)

      rightMonth.value = next.month
      rightYear.value = next.year
    }

    function syncLeftFromRight () {
      const previous = shiftMonth(rightMonth.value, rightYear.value, -1)

      leftMonth.value = previous.month
      leftYear.value = previous.year
    }

    const leftIndex = computed(() => leftYear.value * 12 + leftMonth.value)
    const rightIndex = computed(() => rightYear.value * 12 + rightMonth.value)
    const leftNextDisabled = computed(() => leftIndex.value + 1 >= rightIndex.value)
    const rightPrevDisabled = computed(() => rightIndex.value - 1 <= leftIndex.value)

    const rootRef = shallowRef<{ $el?: HTMLElement }>()
    const previewValue = shallowRef<unknown>()

    function isMonthInView (date: unknown): boolean {
      const month = adapter.getMonth(date)
      const year = adapter.getYear(date)

      return (month === leftMonth.value && year === leftYear.value) ||
        (month === rightMonth.value && year === rightYear.value)
    }

    function navigateToSelection () {
      const dates = model.value as unknown[]
      if (!dates.length) return

      const first = adapter.date(dates[0])
      const last = adapter.date(dates[dates.length - 1])

      leftMonth.value = adapter.getMonth(first)
      leftYear.value = adapter.getYear(first)

      if (!props.independentMonths) {
        syncRightFromLeft()
        return
      }

      const firstIndex = leftIndex.value
      const lastIndex = adapter.getYear(last) * 12 + adapter.getMonth(last)
      const targetRightIndex = Math.max(lastIndex, firstIndex + 1)

      rightYear.value = Math.floor(targetRightIndex / 12)
      rightMonth.value = targetRightIndex - rightYear.value * 12
    }

    syncRightFromLeft()
    navigateToSelection()

    let syncing = false

    watch([leftMonth, leftYear], () => {
      if (syncing || props.independentMonths) return

      syncing = true
      syncRightFromLeft()
      syncing = false
    })

    watch([rightMonth, rightYear], () => {
      if (syncing || props.independentMonths) return

      syncing = true
      syncLeftFromRight()
      syncing = false
    })

    // Re-pair the panels when the user turns independent-months OFF after they have drifted apart.
    // If the range start happens to live in the right panel, preserve the right panel and shift
    // the left one back; otherwise default to right = left + 1.
    watch(() => props.independentMonths, (value, oldValue) => {
      if (value || !oldValue) return

      const start = (model.value as unknown[])[0]

      if (start != null) {
        const startIndex = adapter.getYear(start) * 12 + adapter.getMonth(start)

        if (startIndex === rightIndex.value) {
          syncing = true
          syncLeftFromRight()
          syncing = false
          return
        }
      }

      syncing = true
      syncRightFromLeft()
      syncing = false
    })

    watch(model, val => {
      const dates = val as unknown[]
      if (!dates.length) return

      const first = adapter.date(dates[0])
      const last = adapter.date(dates[dates.length - 1])
      if (isMonthInView(first) && isMonthInView(last)) return

      navigateToSelection()
    })

    function focusCell (iso: string) {
      rootRef.value?.$el?.querySelector<HTMLElement>(`[data-v-date="${iso}"]`)?.focus()
    }

    function onBoundaryNavigate ({ direction, targetIsoDate }: {
      direction: 'up' | 'down' | 'left' | 'right'
      targetIsoDate: string
    }) {
      // Inner boundary: the target already lives in the sibling panel — just focus it.
      if (rootRef.value?.$el?.querySelector(`[data-v-date="${targetIsoDate}"]`)) {
        focusCell(targetIsoDate)
        return
      }

      // Outer boundary: shift whichever panel needs to move to bring the target into view.
      const target = adapter.date(targetIsoDate)
      const targetMonth = adapter.getMonth(target)
      const targetYear = adapter.getYear(target)
      const targetIndex = targetYear * 12 + targetMonth

      if (targetIndex < leftIndex.value) {
        const wouldCollide = props.independentMonths && rightIndex.value <= targetIndex

        leftMonth.value = targetMonth
        leftYear.value = targetYear

        if (wouldCollide) {
          const next = shiftMonth(targetMonth, targetYear, 1)
          rightMonth.value = next.month
          rightYear.value = next.year
        }
      } else if (targetIndex > rightIndex.value) {
        const wouldCollide = props.independentMonths && leftIndex.value >= targetIndex

        rightMonth.value = targetMonth
        rightYear.value = targetYear

        if (wouldCollide) {
          const previous = shiftMonth(targetMonth, targetYear, -1)
          leftMonth.value = previous.month
          leftYear.value = previous.year
        }
      } else {
        // Target lives between the two panels — only possible with independent-months and a gap.
        // The arrow direction tells us which panel the user moved away from: a backward arrow came
        // from the right panel and should pull the right panel back to the target; a forward arrow
        // came from the left panel and should push the left panel forward.
        const goingBack = direction === 'left' || direction === 'up'

        if (goingBack) {
          rightMonth.value = targetMonth
          rightYear.value = targetYear
        } else {
          leftMonth.value = targetMonth
          leftYear.value = targetYear
        }
      }

      nextTick(() => focusCell(targetIsoDate))
    }

    useRender(() => {
      const pickerProps = VPicker.filterProps(props)
      const datePickerProps = pick(props, datePickerForwardedKeys)

      return (
        <VPicker
          ref={ rootRef }
          { ...pickerProps }
          class={['v-date-range-picker', props.class]}
          style={ props.style }
          hideHeader
          v-slots={{
            default: () => (
              <>
                <VDatePicker
                  { ...datePickerProps }
                  v-model={ model.value }
                  v-model:month={ leftMonth.value }
                  v-model:year={ leftYear.value }
                  class="v-date-range-picker__panel"
                  multiple="range"
                  noAutoNavigation
                  showAdjacentMonths={ false }
                  hideHeader
                  previewValue={ previewValue.value }
                  onUpdate:previewValue={ (value: unknown) => previewValue.value = value }
                  onBoundaryNavigate={ onBoundaryNavigate }
                  v-slots={{
                    controls: ({ monthYearText, prevMonth, nextMonth, disabled }: VDatePickerControlsDefaultSlotProps) => (
                      <>
                        <VBtn
                          density="comfortable"
                          disabled={ disabled.includes('prev-month') }
                          icon={ props.prevIcon }
                          variant="text"
                          onClick={ prevMonth }
                        />
                        <VSpacer />
                        <div>{ monthYearText }</div>
                        <VSpacer />
                        <VBtn
                          class={{ 'v-date-range-picker__nav-hidden': !props.independentMonths }}
                          density="comfortable"
                          disabled={ !props.independentMonths || leftNextDisabled.value || disabled.includes('next-month') }
                          icon={ props.nextIcon }
                          variant="text"
                          onClick={ nextMonth }
                        />
                      </>
                    ),
                  }}
                />

                <div class="v-date-range-picker__divider" role="separator" />

                <VDatePicker
                  { ...datePickerProps }
                  v-model={ model.value }
                  v-model:month={ rightMonth.value }
                  v-model:year={ rightYear.value }
                  class="v-date-range-picker__panel"
                  multiple="range"
                  noAutoNavigation
                  showAdjacentMonths={ false }
                  hideHeader
                  previewValue={ previewValue.value }
                  onUpdate:previewValue={ (value: unknown) => previewValue.value = value }
                  onBoundaryNavigate={ onBoundaryNavigate }
                  v-slots={{
                    controls: ({ monthYearText, prevMonth, nextMonth, disabled }: VDatePickerControlsDefaultSlotProps) => (
                      <>
                        <VBtn
                        class={{ 'v-date-range-picker__nav-hidden': !props.independentMonths }}
                          density="comfortable"
                          disabled={ !props.independentMonths || rightPrevDisabled.value || disabled.includes('prev-month') }
                          icon={ props.prevIcon }
                          variant="text"
                          onClick={ prevMonth }
                        />
                        <VSpacer />
                        <div>{ monthYearText }</div>
                        <VSpacer />
                        <VBtn
                          density="comfortable"
                          disabled={ disabled.includes('next-month') }
                          icon={ props.nextIcon }
                          variant="text"
                          onClick={ nextMonth }
                        />
                      </>
                    ),
                  }}
                />
              </>
            ),
            actions: slots.footer,
          }}
        />
      )
    })

    return {}
  },
})

export type VDateRangePicker = InstanceType<typeof VDateRangePicker>
