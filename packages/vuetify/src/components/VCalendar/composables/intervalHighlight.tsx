// Composables
import { useTextColor } from '@/composables/color'

// Utilities
import { shallowRef } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { CalendarTimestamp } from '../types'

interface IntervalHighlightBase {
  intervals: { value: CalendarTimestamp[][] }
  getIntervalAtEvent: (e: Event) => number
}

export const makeIntervalHighlightProps = propsFactory({
  intervalHighlight: {
    type: [Boolean, String] as PropType<boolean | string>,
    default: false,
  },
}, 'interval-highlight')

export function useIntervalHighlight (
  props: { intervalHighlight: boolean | string },
  base: IntervalHighlightBase,
) {
  const hoveredTime = shallowRef<string | null>(null)

  // The underlay paints `background: currentColor`, so we only need a text color.
  const { textColorClasses, textColorStyles } = useTextColor(() =>
    typeof props.intervalHighlight === 'string' && props.intervalHighlight
      ? props.intervalHighlight
      : 'surface-variant'
  )

  // Day columns can overlay the intervals, so snap the cursor to an interval row.
  function getHoveredTimeFromEvent (e: MouseEvent): string | null {
    const index = Math.floor(base.getIntervalAtEvent(e))
    const intervals = base.intervals.value[0]
    if (!intervals || index < 0 || index >= intervals.length) return null
    return intervals[index].time
  }

  function onMousemove (e: MouseEvent) {
    if (!props.intervalHighlight) return
    hoveredTime.value = getHoveredTimeFromEvent(e)
  }

  function onMouseleave () {
    if (!props.intervalHighlight) return
    hoveredTime.value = null
  }

  function isHighlighted (interval: CalendarTimestamp): boolean {
    return !!props.intervalHighlight && hoveredTime.value === interval.time
  }

  function genUnderlay () {
    if (!props.intervalHighlight) return undefined
    return (
      <div
        class={['v-calendar-daily__day-interval__underlay', textColorClasses.value]}
        style={ textColorStyles.value }
      />
    )
  }

  return {
    hoveredTime,
    onMousemove,
    onMouseleave,
    isHighlighted,
    genUnderlay,
  }
}
