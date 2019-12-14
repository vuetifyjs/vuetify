import { CalendarEventOverlapMode } from 'types'
import { getOverlapGroupHandler } from './common'

export const column: CalendarEventOverlapMode = (events, firstWeekday, overlapThreshold) => {
  const handler = getOverlapGroupHandler(firstWeekday)

  return (day, dayEvents, timed) => {
    const visuals = handler.getVisuals(day, dayEvents, timed)

    if (timed) {
      visuals.forEach(visual => {
        visual.left = visual.column * 100 / visual.columnCount
        visual.width = 100 / visual.columnCount
      })
    }

    return visuals
  }
}
