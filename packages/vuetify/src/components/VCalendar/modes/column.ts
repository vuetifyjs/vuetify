import { CalendarEventOverlapMode } from 'types'
import { getOverlapGroupHandler } from './common'

const FULL_WIDTH = 100

export const column: CalendarEventOverlapMode = (events, firstWeekday, overlapThreshold) => {
  const handler = getOverlapGroupHandler(firstWeekday)

  return (day, dayEvents, timed) => {
    const visuals = handler.getVisuals(day, dayEvents, timed)

    if (timed) {
      visuals.forEach(visual => {
        visual.left = visual.column * FULL_WIDTH / visual.columnCount
        visual.width = FULL_WIDTH / visual.columnCount
      })
    }

    return visuals
  }
}
