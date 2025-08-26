// Styles
import './VCalendarCategory.sass'

// Components
import { VCalendarDaily } from './VCalendarDaily'

// Composables
import { makeCalendarBaseProps } from './mixins/calendar-base'
import { makeCalendarWithIntervalsProps } from './mixins/calendar-with-intervals'

// Utilities
import { computed, shallowRef } from 'vue'
import { getParsedCategories } from './util/parser'
import { convertToUnit, defineComponent, getPrefixedEventHandlers, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarCategory, CalendarCategoryTextFunction, CalendarTimestamp } from './types'

export const VCalendarCategory = defineComponent({
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
    const dailyRef = shallowRef<VCalendarDaily>()

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
      const events = getPrefixedEventHandlers(attrs, ':day-category', () => {
        return getCategoryScope(dailyRef.value?.getSlotScope(day) || day, scope.category)
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
      if (!dailyRef.value) return []

      const days: any[] = []
      dailyRef.value.days.forEach((d: CalendarTimestamp, j: number) => {
        const day = new Array(parsedCategories.value.length || 1)
        day.fill(d)
        days.push(...day.map((v: CalendarTimestamp, i: number) => genDay(v, j, i)))
      })
      return days
    }

    function genDay (day: CalendarTimestamp, index: number, categoryIndex: number) {
      if (!dailyRef.value) return null

      const category = parsedCategories.value[categoryIndex]
      const events = getPrefixedEventHandlers(attrs, ':time', e => {
        // TODO: shared composable instead of passing through template ref
        return dailyRef.value!.getSlotScope(dailyRef.value!.getTimestampAtEvent(e, day))
      })
      return (
        <div
          key={ day.date + '-' + categoryIndex }
          class={['v-calendar-daily__day', dailyRef.value.getRelativeClasses(day)]}
          { ...events }
        >
          { genDayIntervals(index, category) }
          { genDayBody(day, category) }
        </div>
      )
    }

    function genDayIntervals (index: number, category: CalendarCategory) {
      if (!dailyRef.value) return []
      return dailyRef.value.intervals[index].map((v: CalendarTimestamp) => genDayInterval(v, category))
    }

    function genDayInterval (interval: CalendarTimestamp, category: CalendarCategory) {
      if (!dailyRef.value) return null

      const height: string | undefined = convertToUnit(props.intervalHeight)
      const styler = props.intervalStyle || dailyRef.value.intervalStyleDefault

      return (
        <div
          key={ interval.time }
          class="v-calendar-daily__day-interval"
          style={[{ height }, styler({ ...interval, category })]}
        >
          { slots.interval?.(
            getCategoryScope(dailyRef.value.getSlotScope(interval), category)
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
      if (!dailyRef.value) return null

      const events = getPrefixedEventHandlers(attrs, ':time-category', e => {
        return getCategoryScope(
          dailyRef.value!.getSlotScope(dailyRef.value!.getTimestampAtEvent(e, day)),
          category
        )
      })

      return (
        <div class="v-calendar-category__column" { ...events }>
          { slots['day-body']?.(getCategoryScope(dailyRef.value.getSlotScope(day), category)) }
        </div>
      )
    }

    useRender(() => (
      <VCalendarDaily
        ref={ dailyRef }
        class={[
          'v-calendar-daily',
          'v-calendar-category',
        ]}
        { ...props }
      >
        {{
          ...slots,
          default: () => {
            // TODO: override rendering
          },
          'day-header': (scope: any) => genDayHeader(scope),
          'day-body': () => null,
        }}
      </VCalendarDaily>
    ))

    return {
      parsedCategories,
      getCategoryScope,
      genDayHeader,
      genDayHeaderCategory,
      genDayHeaderCategoryTitle,
      genDays,
      genDay,
      genDayIntervals,
      genDayInterval,
      genDayBody,
      genDayBodyCategory,
    }
  },
})

export type VCalendarCategory = InstanceType<typeof VCalendarCategory>
