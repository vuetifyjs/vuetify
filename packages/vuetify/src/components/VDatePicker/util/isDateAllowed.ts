export type AllowedDateFunction = (date: string) => boolean

export default function isDateAllowed (date: string, min: string, max: string, allowedFn: AllowedDateFunction | undefined) {
  return (!allowedFn || allowedFn(date)) &&
    (!min || date >= min) &&
    (!max || date <= max)
}
