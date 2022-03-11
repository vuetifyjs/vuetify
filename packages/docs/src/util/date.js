import { format, parseISO } from 'date-fns'

export function formatDate (date) {
  return format(parseISO(date.toISOString().slice(0, 10)), 'MMMM d')
}
