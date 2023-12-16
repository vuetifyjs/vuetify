// Styles
import './VDatePickerMonth.sass'

// Components
import { VBtn } from '@/components/VBtn'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Composables
import { makeCalendarProps, useCalendar } from '@/composables/calendar'
import { useDate } from '@/composables/date/date'

// Utilities
import { ref } from 'vue'
import { genericComponent, propsFactory } from '@/util'

export type VDatePickerMonthSlots = {
  day: {
    props: {
      onClick: () => void
    }
    item: any
    i: number
  }
}

export const makeVDatePickerMonthProps = propsFactory({
  color: String,
  hideWeekdays: Boolean,
  multiple: Boolean,
  showWeek: Boolean,

  ...makeCalendarProps(),
}, 'VDatePickerMonth')

export const VDatePickerMonth = genericComponent<VDatePickerMonthSlots>()({
  name: 'VDatePickerMonth',

  props: makeVDatePickerMonthProps(),

  emits: {
    'update:modelValue': (date: any) => true,
    'update:month': (date: any) => true,
    'update:year': (date: any) => true,
  },

  setup (props, { emit, slots }) {
    const daysRef = ref()

    const {
      daysInMonth,
      model,
      weekNumbers,
    } = useCalendar(props as any) // TODO: fix typing
    const adapter = useDate()

    function onClick (value: unknown) {
      if (props.multiple) {
        const index = model.value.findIndex(selection => adapter.isSameDay(selection, value))

        if (index === -1) {
          model.value = [...model.value, value]
        } else {
          const value = [...model.value]
          value.splice(index, 1)
          model.value = value
        }
      } else {
        model.value = [value]
      }
    }

    return () => (
      <div class="v-date-picker-month">
        { props.showWeek && (
          <div key="weeks" class="v-date-picker-month__weeks">
            { !props.hideWeekdays && (
              <div key="hide-week-days" class="v-date-picker-month__day">&nbsp;</div>
            )}
            { weekNumbers.value.map(week => (
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
        >
          { !props.hideWeekdays && adapter.getWeekdays().map(weekDay => (
            <div
              class={[
                'v-date-picker-month__day',
                'v-date-picker-month__weekday',
              ]}
            >{ weekDay }</div>
          ))}

          { daysInMonth.value.map((item, i) => {
            const slotProps = {
              props: {
                onClick: () => onClick(item.date),
              },
              item,
              i,
            } as const

            return (
              <div
                class={[
                  'v-date-picker-month__day',
                  {
                    'v-date-picker-month__day--adjacent': item.isAdjacent,
                    'v-date-picker-month__day--hide-adjacent': item.isHidden,
                    'v-date-picker-month__day--selected': item.isSelected,
                    'v-date-picker-month__day--week-end': item.isWeekEnd,
                    'v-date-picker-month__day--week-start': item.isWeekStart,
                  },
                ]}
                data-v-date={ !item.isDisabled ? item.isoDate : undefined }
              >

                { (props.showAdjacentMonths || !item.isAdjacent) && (
                  <VDefaultsProvider
                    defaults={{
                      VBtn: {
                        color: (item.isSelected || item.isToday) && !item.isDisabled
                          ? props.color
                          : undefined,
                        disabled: item.isDisabled,
                        icon: true,
                        ripple: false,
                        text: item.localized,
                        variant: item.isDisabled
                          ? 'text'
                          : item.isToday && !item.isSelected ? 'outlined' : 'flat',
                        onClick: () => onClick(item.date),
                      },
                    }}
                  >
                    { slots.day?.(slotProps) ?? (
                      <VBtn { ...slotProps.props } />
                    )}
                  </VDefaultsProvider>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
})

export type VDatePickerMonth = InstanceType<typeof VDatePickerMonth>
