import { getWeek } from '@/components/VDatePicker/utils'
import DateIODateFnsAdapter from '@date-io/date-fns'
import type { DateAdapter } from './date-adapter'

export default class DateFnsAdapter extends DateIODateFnsAdapter implements DateAdapter<Date> {
  getWeek (date: Date) {
    return getWeek(date)
  }
}
