import dateFns from 'date-fns'

const { format, parseISO } = dateFns

export function formatDate (date) {
  return format(parseISO(date.toISOString().substr(0, 10)), 'MMMM d')
}
