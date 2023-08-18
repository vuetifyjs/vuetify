// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'

// Composables
import { useDatePicker } from './composables'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, omit, propsFactory } from '@/util'

// Types
import { getWeek, toIso } from '../date/date'
import { dateEmits, makeDateProps } from '../VDateInput/composables'
import { useDate } from '@/labs/date'

export const makeVDatePickerMonthProps = propsFactory({
  color: String,
  showAdjacentMonths: Boolean,
  hideWeekdays: Boolean,
  showWeek: Boolean,
  hoverDate: null,
  multiple: Boolean,
  side: {
    type: String,
  },

  ...omit(makeDateProps(), ['inputMode', 'viewMode']),
}, 'VDatePickerMonth')

export const VDatePickerMonth = genericComponent()({
  name: 'VDatePickerMonth',

  props: makeVDatePickerMonthProps({ color: 'surface-variant' }),

  emits: {
    ...omit(dateEmits, ['update:inputMode', 'update:viewMode']),
    'update:hoverDate': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const adapter = useDate()
    const { isDragging, dragHandle, hasScrolled } = useDatePicker()

    const month = computed(() => props.displayDate)

    const findClosestDate = (date: any, dates: any[]) => {
      const { isSameDay, getDiff } = adapter
      const [startDate, endDate] = dates

      if (isSameDay(startDate, endDate)) {
        return getDiff(date, startDate, 'days') > 0 ? endDate : startDate
      }

      const distStart = Math.abs(getDiff(date, startDate))
      const distEnd = Math.abs(getDiff(date, endDate))

      return distStart < distEnd ? startDate : endDate
    }

    // const hoverRange = computed<[any, any] | null>(() => {
    //   if (!props.hoverDate) return null

    //   const closestDate = findClosestDate(props.hoverDate, props.modelValue)

    //   if (!closestDate) return null

    //   return adapter.isAfter(props.hoverDate, closestDate) ? [closestDate, props.hoverDate] : [props.hoverDate, closestDate]
    // })

    const weeksInMonth = computed(() => {
      const weeks = adapter.getWeekArray(month.value)

      const days = weeks.flat()

      // Make sure there's always 6 weeks in month (6 * 7 days)
      // But only do it if we're not hiding adjacent months?
      const daysInMonth = 6 * 7
      if (days.length < daysInMonth && props.showAdjacentMonths) {
        const lastDay = days[days.length - 1]

        let week = []
        for (let day = 1; day <= daysInMonth - days.length; day++) {
          week.push(adapter.addDays(lastDay, day))

          if (day % 7 === 0) {
            weeks.push(week)
            week = []
          }
        }
      }

      return weeks
    })

    const daysInMonth = computed(() => {
      const validDates = props.modelValue.filter(v => !!v)
      const isRange = validDates.length > 1

      const days = weeksInMonth.value.flat()
      const today = adapter.date()

      const startDate = validDates[0]
      const endDate = validDates[1]

      return days.map((date, index) => {
        const isStart = startDate && adapter.isSameDay(date, startDate)
        const isEnd = endDate && adapter.isSameDay(date, endDate)
        const isAdjacent = !adapter.isSameMonth(date, month.value)
        const isSame = validDates.length === 2 && adapter.isSameDay(startDate, endDate)

        return {
          date,
          isoDate: toIso(adapter, date),
          formatted: adapter.format(date, 'keyboardDate'),
          year: adapter.getYear(date),
          month: adapter.getMonth(date),
          isWeekStart: index % 7 === 0,
          isWeekEnd: index % 7 === 6,
          isSelected: isStart || isEnd,
          isStart,
          isEnd,
          isToday: adapter.isSameDay(date, today),
          isAdjacent,
          isHidden: isAdjacent && !props.showAdjacentMonths,
          inRange: isRange &&
            !isSame &&
            (isStart || isEnd || (validDates.length === 2 && adapter.isWithinRange(date, validDates as [any, any]))),
          // isHovered: props.hoverDate === date,
          // inHover: hoverRange.value && isWithinRange(date, hoverRange.value),
          isHovered: false,
          inHover: false,
          localized: adapter.format(date, 'dayOfMonth'),
        }
      })
    })

    const weeks = computed(() => {
      return weeksInMonth.value.map(week => {
        return getWeek(adapter, week[0])
      })
    })

    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'color')

    function selectDate (date: any) {
      let newModel = props.modelValue.slice()

      if (props.multiple) {
        if (isDragging.value && dragHandle.value != null) {
          const otherIndex = (dragHandle.value + 1) % 2
          const fn = otherIndex === 0 ? 'isBefore' : 'isAfter'
          if (adapter[fn](date, newModel[otherIndex])) {
            newModel[dragHandle.value] = newModel[otherIndex]
            newModel[otherIndex] = date
            dragHandle.value = otherIndex
          } else {
            newModel[dragHandle.value] = date
          }
        } else {
          if (newModel.find(d => adapter.isSameDay(d, date))) {
            newModel = newModel.filter(v => !adapter.isSameDay(v, date))
          } else if (newModel.length === 2) {
            let index: number | undefined
            if (!props.side || adapter.isSameMonth(newModel[0], newModel[1])) {
              const closest = findClosestDate(date, newModel)
              index = newModel.indexOf(closest)
            } else {
              index = props.side === 'start' ? 0 : props.side === 'end' ? 1 : undefined
            }

            newModel = newModel.map((v, i) => i === index ? date : v)
          } else {
            if (newModel[0] && adapter.isBefore(newModel[0], date)) {
              newModel = [newModel[0], date]
            } else {
              newModel = [date, newModel[0]]
            }
          }
        }
      } else {
        newModel = [date]
      }

      emit('update:modelValue', newModel.filter(v => !!v))
    }

    const daysRef = ref()

    function findElement (el: HTMLElement | null): any {
      if (!el || el === daysRef.value) return null

      if ('vDate' in el.dataset) {
        return adapter.date(el.dataset.vDate)
      }

      return findElement(el.parentElement)
    }

    function findDate (e: MouseEvent | TouchEvent) {
      const x = 'changedTouches' in e ? e.changedTouches[0]?.clientX : e.clientX
      const y = 'changedTouches' in e ? e.changedTouches[0]?.clientY : e.clientY
      const el = document.elementFromPoint(x, y) as HTMLElement

      return findElement(el)
    }

    let canDrag = false
    function handleMousedown (e: MouseEvent | TouchEvent) {
      hasScrolled.value = false

      const selected = findDate(e)

      if (!selected) return

      const modelIndex = props.modelValue.findIndex(d => adapter.isEqual(d, selected))

      if (modelIndex >= 0) {
        canDrag = true
        dragHandle.value = modelIndex

        window.addEventListener('touchmove', handleTouchmove, { passive: false })
        window.addEventListener('mousemove', handleTouchmove, { passive: false })

        e.preventDefault()
      }

      window.addEventListener('touchend', handleTouchend, { passive: false })
      window.addEventListener('mouseup', handleTouchend, { passive: false })
    }

    function handleTouchmove (e: MouseEvent | TouchEvent) {
      if (!canDrag) return

      e.preventDefault()

      isDragging.value = true

      const over = findDate(e)

      if (!over) return

      selectDate(over)
    }

    function handleTouchend (e: MouseEvent | TouchEvent) {
      if (e.cancelable) e.preventDefault()

      window.removeEventListener('touchmove', handleTouchmove)
      window.removeEventListener('mousemove', handleTouchmove)
      window.removeEventListener('touchend', handleTouchend)
      window.removeEventListener('mouseup', handleTouchend)

      const end = findDate(e)

      if (!end) return

      if (!hasScrolled.value) {
        selectDate(end)
      }

      isDragging.value = false
      dragHandle.value = null
      canDrag = false
    }

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div key="weeks" class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
              <div key="hide-week-days" class="v-date-picker-month__day">&nbsp;</div>
            )}
            { weeks.value.map(week => (
              <div
                class={[
                  'v-date-picker-month__day',
                  'v-date-picker-month__day--adjacent',
                ]}
              >{ week }</div>
            ))}
          </div>
        )}

        <div
          ref={ daysRef }
          class="v-date-picker-month__days"
          onMousedown={ handleMousedown }
          onTouchstart={ handleMousedown }
        >
          { !props.hideWeekdays && adapter.getWeekdays().map(weekDay => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__weekday',
              ]}
            >{ weekDay }</div>
          ))}

          { daysInMonth.value.map((item, index) => (
            <div
              class={[
                'v-date-picker-month__day',
                {
                  'v-date-picker-month__day--selected': item.isSelected,
                  'v-date-picker-month__day--start': item.isStart,
                  'v-date-picker-month__day--end': item.isEnd,
                  'v-date-picker-month__day--adjacent': item.isAdjacent,
                  'v-date-picker-month__day--hide-adjacent': item.isHidden,
                  'v-date-picker-month__day--week-start': item.isWeekStart,
                  'v-date-picker-month__day--week-end': item.isWeekEnd,
                  'v-date-picker-month__day--hovered': item.isHovered,
                },
              ]}
              data-v-date={ !item.isHidden ? item.isoDate : undefined }
            >
              { item.inRange && (
                <div
                  key="in-range"
                  class={[
                    'v-date-picker-month__day--range',
                    backgroundColorClasses.value,
                  ]}
                  style={ backgroundColorStyles.value }
                />
              )}

              { item.inHover && !item.isStart && !item.isEnd && !item.isHovered && !item.inRange && (
                <div
                  key="in-hover"
                  class="v-date-picker-month__day--hover"
                />
              )}

              { (props.showAdjacentMonths || !item.isAdjacent) && (
                <VBtn
                  icon
                  ripple={ false } /* ripple not working correctly since we preventDefault in touchend */
                  variant={ (item.isToday || item.isHovered) && !item.isSelected ? 'outlined' : 'flat' }
                  active={ item.isSelected }
                  color={ item.isSelected || item.isToday ? props.color : item.isHovered ? undefined : 'transparent' }
                >
                  { item.localized }
                </VBtn>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
