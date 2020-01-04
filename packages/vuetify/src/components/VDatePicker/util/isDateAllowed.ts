import { DatePickerAllowedDatesFunction } from 'types'

export default function isDateAllowed (date: string, min: string, max: string, allowedFn: DatePickerAllowedDatesFunction | undefined) {
  return (!allowedFn || allowedFn(date)) &&
    (!min || date >= min.substr(0, 10)) &&
    (!max || date <= max)
}
