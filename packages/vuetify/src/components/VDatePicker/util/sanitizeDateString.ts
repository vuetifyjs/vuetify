// Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
// 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
import pad from './pad'

export default (dateString: string, type: 'date' | 'month' | 'year'): string => {
  const [year, month = 1, date = 1] = dateString.split('-')
  return `${year}-${pad(month)}-${pad(date)}`.substr(0, { date: 10, month: 7, year: 4 }[type])
}
