// Components
import { VCalendarDaily } from './VCalendarDaily'

// Composables
import { makeCalendarBaseProps } from './composables/calendarBase'
import { makeCalendarWithIntervalsProps, useCalendarWithIntervals } from './composables/calendarWithIntervals'

// Utilities
import { computed } from 'vue'
import { getParsedCategories } from './util/parser'
import { convertToUnit, genericComponent, getPrefixedEventHandlers, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type {
  CalendarCategory,
  CalendarCategoryTextFunction,
  CalendarDayBodySlotScope,
  CalendarDayCategorySlotScope,
  CalendarTimestamp,
  DayHeaderSlotScope,
} from './types'
import type { GenericProps } from '@/util'

export const VCalendarCategory = genericComponent<new (
  props: {},
  slots: {
    'category': CalendarDayCategorySlotScope
    'day-body': CalendarDayBodySlotScope
    'day-header': DayHeaderSlotScope
    'interval': CalendarDayCategorySlotScope
  }
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VCalendarCategory',

  props: {
    categories: {
      type: [Array, String] as PropType<CalendarCategory[] | string>,
      default: '',
    },
    categoryText: [String, Function] as PropType<string | CalendarCategoryTextFunction>,
    categoryForInvalid: {
      type: String,
      default: '',
    },

    ...makeCalendarBaseProps(),
    ...makeCalendarWithIntervalsProps(),
  },

  setup (props, { slots, attrs }) {
    const base = useCalendarWithIntervals(props)

    const parsedCategories = computed((): CalendarCategory[] => {
      return getParsedCategories(props.categories, props.categoryText)
    })

    function getCategoryScope (scope: any, category: CalendarCategory) {
      const cat = typeof category === 'object' && category &&
          category.categoryName === props.categoryForInvalid ? null : category
      return {
        ...scope,
        category: cat,
      }
    }

    function genDayHeader (scope: CalendarTimestamp & { week: any, index: number }) {
      return (
        <div class="v-calendar-category__columns">
          { parsedCategories.value.map(category => {
            return genDayHeaderCategory(scope, getCategoryScope(scope, category))
          })}
        </div>
      )
    }

    function genDayHeaderCategory (day: CalendarTimestamp, scope: any) {
      const headerTitle = typeof scope.category === 'object' ? scope.category.categoryName : scope.category
      const events = getPrefixedEventHandlers(attrs, ':dayCategory', () => {
        return getCategoryScope(base.getSlotScope(day) || day, scope.category)
      })
      return (
        <div
          class="v-calendar-category__column-header"
          { ...events }
        >
          { slots.category?.(scope) ?? genDayHeaderCategoryTitle(headerTitle) }
          { slots['day-header']?.(scope) }
        </div>
      )
    }

    function genDayHeaderCategoryTitle (categoryName: string | null) {
      return (
        <div class="v-calendar-category__category">
          { categoryName === null ? props.categoryForInvalid : categoryName }
        </div>
      )
    }

    function genDays () {
      const days: any[] = []
      base.days.value.forEach((d: CalendarTimestamp, j: number) => {
        const day = new Array(parsedCategories.value.length || 1)
        day.fill(d)
        days.push(...day.map((v: CalendarTimestamp, i: number) => genDay(v, j, i)))
      })
      return days
    }

    function genDay (day: CalendarTimestamp, index: number, categoryIndex: number) {
      const category = parsedCategories.value[categoryIndex]
      const events = getPrefixedEventHandlers(attrs, ':time', e => {
        return base.getSlotScope(base.getTimestampAtEvent(e, day))
      })
      return (
        <div
          key={ day.date + '-' + categoryIndex }
          class={['v-calendar-daily__day', base.getRelativeClasses(day)]}
          { ...events }
        >
          { genDayIntervals(index, category) }
          { genDayBody(day, category) }
        </div>
      )
    }

    function genDayIntervals (index: number, category: CalendarCategory) {
      return base.intervals.value[index].map((v: CalendarTimestamp) => genDayInterval(v, category))
    }

    function genDayInterval (interval: CalendarTimestamp, category: CalendarCategory) {
      const height: string | undefined = convertToUnit(props.intervalHeight)
      const styler = props.intervalStyle || base.intervalStyleDefault

      return (
        <div
          key={ interval.time }
          class="v-calendar-daily__day-interval"
          style={[{ height }, styler({ ...interval, category })]}
        >
          { slots.interval?.(
            getCategoryScope(base.getSlotScope(interval), category)
          )}
        </div>
      )
    }

    function genDayBody (day: CalendarTimestamp, category: CalendarCategory) {
      return (
        <div class="v-calendar-category__columns">
          { genDayBodyCategory(day, category) }
        </div>
      )
    }

    function genDayBodyCategory (day: CalendarTimestamp, category: CalendarCategory) {
      const events = getPrefixedEventHandlers(attrs, ':timeCategory', e => {
        return getCategoryScope(
          base.getSlotScope(base.getTimestampAtEvent(e, day)),
          category
        )
      })

      return (
        <div class="v-calendar-category__column" { ...events }>
          { slots['day-body']?.(getCategoryScope(base.getSlotScope(day), category)) }
        </div>
      )
    }

    useRender(() => (
      <VCalendarDaily
        class={[
          'v-calendar-daily',
          'v-calendar-category',
        ]}
        { ...props }
      >
        {{
          ...slots,
          days: genDays,
          'day-header': genDayHeader,
        }}
      </VCalendarDaily>
    ))

    return {
      ...base,
      parsedCategories,
    }
  },
})

export type VCalendarCategory = InstanceType<typeof VCalendarCategory>
