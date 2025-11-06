// Utilities
import { computed, reactive, watch } from 'vue'
import {
  parseDate,
  parseTimestamp,
  validateTimestamp,
} from '../util/timestamp'

// Types
import type { CalendarTimestamp } from '../types'

export function useTimes (props: { now: string | undefined }) {
  const times = reactive({
    now: parseTimestamp('0000-00-00 00:00', true),
    today: parseTimestamp('0000-00-00', true),
  })

  const parsedNow = computed((): CalendarTimestamp | null => {
    return props.now && validateTimestamp(props.now) ? parseTimestamp(props.now, true) : null
  })

  function setPresent (): void {
    times.now.present = times.today.present = true
    times.now.past = times.today.past = false
    times.now.future = times.today.future = false
  }

  function getNow (): CalendarTimestamp {
    return parseDate(new Date())
  }

  function updateDay (now: CalendarTimestamp, target: CalendarTimestamp): void {
    if (now.date !== target.date) {
      target.year = now.year
      target.month = now.month
      target.day = now.day
      target.weekday = now.weekday
      target.date = now.date
    }
  }

  function updateTime (now: CalendarTimestamp, target: CalendarTimestamp): void {
    if (now.time !== target.time) {
      target.hour = now.hour
      target.minute = now.minute
      target.time = now.time
    }
  }

  function updateTimes (): void {
    const now: CalendarTimestamp = parsedNow.value || getNow()
    updateDay(now, times.now)
    updateTime(now, times.now)
    updateDay(now, times.today)
  }

  watch(parsedNow, updateTimes)

  updateTimes()
  setPresent()

  return {
    times,
    parsedNow,
    updateTimes,
    setPresent,
    getNow,
    updateDay,
    updateTime,
  }
}
