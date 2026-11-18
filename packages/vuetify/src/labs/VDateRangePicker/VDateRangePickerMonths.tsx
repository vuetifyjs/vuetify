// Components
import { makeVDatePickerMonthProps, VDatePickerMonth } from '@/components/VDatePicker/VDatePickerMonth'
import { VVirtualScroll } from '@/components/VVirtualScroll'

// Composables
import { useDateRangeMonths } from './dateRangePicker'
import { useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { genericComponent, noop, propsFactory, useRender } from '@/util'

export const VDateRangePickerMonths = genericComponent()({
  name: 'VDateRangePickerMonths',

  props: propsFactory({
    ...makeVDatePickerMonthProps(),
  }, 'VDateRangePickerMonths')(),

  emits: {
    'update:modelValue': (_value: unknown[]) => true,
    'update:month': (_value: number) => true,
    'update:year': (_value: number) => true,
    'update:previewValue': (_value: unknown) => true,
  },

  setup (props) {
    const adapter = useDate()
    const { model, weekdayLabels } = useCalendar(props)
    const preview = useProxiedModel(props, 'previewValue')
    const { months, virtualRef, setMonthRef, onBoundaryNavigate, onInteraction, onScroll } = useDateRangeMonths(props, model)

    function onUpdateModel (value: readonly unknown[]) {
      if (!props.readonly && !props.disabled) model.value = value
    }

    useRender(() => (
      <div class="v-date-range-picker__calendar">
        { !props.hideWeekdays && (
          <div
            key="weekdays"
            class="v-date-range-picker__weekdays"
            style={{ '--v-date-picker-days-in-week': props.weekdays.length }}
            aria-hidden="true"
          >
            { props.showWeek && (
              <div key="weeks" class="v-date-picker-month__weeks">
                <div class="v-date-picker-month__day">&nbsp;</div>
              </div>
            )}
            <div class="v-date-picker-month__days-row">
              { weekdayLabels.value.map(day => <div class="v-date-picker-month__day v-date-picker-month__weekday">{ day }</div>) }
            </div>
          </div>
        )}
        <VVirtualScroll
          ref={ virtualRef }
          class="v-date-range-picker__months"
          items={ months.value }
          itemKey="index"
          itemHeight={ 320 }
          onScrollPassive={ onScroll }
          onWheelPassive={ onInteraction }
          onTouchstartPassive={ onInteraction }
          onPointerdown={ onInteraction }
          onKeydownCapture={ onInteraction }
        >
          {{
            default: ({ item }) => (
              <div class="v-date-range-picker__month">
                <div class="v-date-range-picker__month-title">{ adapter.format(item.date, 'monthAndYear') }</div>
                <VDatePickerMonth
                  { ...VDatePickerMonth.filterProps(props) }
                  ref={ month => setMonthRef(item.index, month as VDatePickerMonth | null) }
                  modelValue={ model.value }
                  onUpdate:modelValue={ onUpdateModel }
                  month={ item.month }
                  year={ item.year }
                  onUpdate:month={ noop }
                  onUpdate:year={ noop }
                  multiple="range"
                  noAutoNavigation
                  hideWeekdays
                  showAdjacentMonths={ false }
                  transition=""
                  previewValue={ preview.value }
                  onUpdate:previewValue={ value => preview.value = value }
                  onBoundaryNavigate={ onBoundaryNavigate }
                />
              </div>
            ),
          }}
        </VVirtualScroll>
      </div>
    ))

    return {}
  },
})
