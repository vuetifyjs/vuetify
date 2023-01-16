import {
  parseTimestamp,
  getDayIdentifier,
  getTimestampIdentifier,
  isTimedless,
  updateHasTime,
} from './timestamp'
import { CalendarTimestamp, CalendarEvent, CalendarEventParsed } from 'vuetify/types'

// 将原始时间解析成一个新对象，时间的年月日时分组合 成数字  例如202001011020 2020年一月一日十点二十分
export function parseEvent (
  input: CalendarEvent,
  index: number,
  startProperty: string,
  endProperty: string,
  timed = false,
  category: string | false = false,
): CalendarEventParsed {
  const startInput = input[startProperty]
  const endInput = input[endProperty]
  const startParsed: CalendarTimestamp = parseTimestamp(startInput, true)
  const endParsed: CalendarTimestamp = (endInput ? parseTimestamp(endInput, true) : startParsed)

  const start: CalendarTimestamp = isTimedless(startInput)
    ? updateHasTime(startParsed, timed) // 确定该事件与当前时间点的关系，是在前还是后
    : startParsed
  const end: CalendarTimestamp = isTimedless(endInput)
    ? updateHasTime(endParsed, timed)
    : endParsed

  const startIdentifier: number = getDayIdentifier(start)
  const startTimestampIdentifier: number = getTimestampIdentifier(start)
  const endIdentifier: number = getDayIdentifier(end)
  const endOffset: number = start.hasTime ? 0 : 2359
  const endTimestampIdentifier: number = getTimestampIdentifier(end) + endOffset
  const allDay = !start.hasTime
  return { input, start, startIdentifier, startTimestampIdentifier, end, endIdentifier, endTimestampIdentifier, allDay, index, category }
}

// 过滤该日的日历事件
export function isEventOn (event: CalendarEventParsed, dayIdentifier: number): boolean {
  // 根据日子（2022-12-03）这样的格式来判断是否相交
  // 排除法 事件的开始事件大于该日子 肯定无相交；
  //       事件的结束事件小于该日子 肯定无相交
  // 总结，事件的该日子 开始时间小于等于该日子  结束时间大于等于该日子  则肯定有段时间事件在该日子内
  return dayIdentifier >= event.startIdentifier && dayIdentifier <= event.endIdentifier
}

export function isEventHiddenOn (event: CalendarEventParsed, day: CalendarTimestamp): boolean {
  return event.end.time === '00:00' && event.end.date === day.date && event.start.date !== day.date
}

export function isEventStart (event: CalendarEventParsed, day: CalendarTimestamp, dayIdentifier: number, firstWeekday: number): boolean {
  return dayIdentifier === event.startIdentifier || (firstWeekday === day.weekday && isEventOn(event, dayIdentifier))
}
// 堆叠事件判断
export function isEventOverlapping (event: CalendarEventParsed, startIdentifier: number, endIdentifier: number): boolean {
  return startIdentifier <= event.endIdentifier && endIdentifier >= event.startIdentifier
}
