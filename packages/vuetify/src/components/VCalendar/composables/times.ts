import { parseDate, parseTimestamp } from '@/composables/calendar/timestamp'
import type { CalendarTimestamp } from '@/composables/calendar/timestamp'
import { computed, watch } from 'vue'
import type { ComputedRef } from 'vue'

export function useTimes (props) {
  const times = {
    now: parseTimestamp('0000-00-00 00:00', true),
    today: parseTimestamp('0000-00-00', true),
  }

  // Computed
  const parsedNow: ComputedRef<CalendarTimestamp | null> = computed(() => props.now ? parseTimestamp(props.now, true) : null)

  // Methods
  const setPresent = (): void => {
    times.now.present = times.today.present = true
    times.now.past = times.today.past = false
    times.now.future = times.today.future = false
  }

  const getNow = (): CalendarTimestamp => {
    return parseDate(new Date())
  }

  const updateDay = (now: CalendarTimestamp, target: CalendarTimestamp): void => {
    if (now.date !== target.date) {
      target.year = now.year
      target.month = now.month
      target.day = now.day
      target.weekday = now.weekday
      target.date = now.date
    }
  }

  const updateTime = (now: CalendarTimestamp, target: CalendarTimestamp): void => {
    if (now.time !== target.time) {
      target.hour = now.hour
      target.minute = now.minute
      target.time = now.time
    }
  }

  const updateTimes = (): void => {
    const now: CalendarTimestamp = parsedNow.value || getNow()
    updateDay(now, times.now)
    updateTime(now, times.now)
    updateDay(now, times.today)
  }

  watch(parsedNow, () => updateTimes)

  updateTimes()
  setPresent()

  return { times, parsedNow, setPresent, getNow, updateDay, updateTime, updateTimes }
}
