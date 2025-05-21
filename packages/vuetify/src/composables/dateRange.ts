// Composables
import { useDate } from '@/composables/date/date'

export function useDateRange () {
  const adapter = useDate()

  function createRange (start: unknown, stop?: unknown) {
    const diff = adapter.getDiff(stop ?? start, start, 'days')
    const datesInRange = [start]

    for (let i = 1; i < diff; i++) {
      const nextDate = adapter.addDays(start, i)
      datesInRange.push(nextDate)
    }

    if (stop) {
      datesInRange.push(adapter.endOfDay(stop))
    }

    return datesInRange
  }

  return {
    createRange,
  }
}
