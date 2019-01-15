import pad from './pad'

interface SubstrOptions {
  start?: number
  length: number
}

export type NativeLocaleFormatter = (date: string) => string

function createNativeLocaleFormatter (
  local: string | undefined,
  options: Intl.DateTimeFormatOptions
): NativeLocaleFormatter | undefined

function createNativeLocaleFormatter (
  local: string | undefined,
  options: Intl.DateTimeFormatOptions,
  substrOptions: SubstrOptions
): NativeLocaleFormatter

function createNativeLocaleFormatter (
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions,
  substrOptions: SubstrOptions = { start: 0, length: 0 }
): NativeLocaleFormatter | undefined {
  const makeIsoString = (dateString: string) => {
    const [year, month, date] = dateString.trim().split(' ')[0].split('-')
    return [year, pad(month || 1), pad(date || 1)].join('-')
  }

  try {
    const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options)
    return (dateString: string) => intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
  } catch (e) {
    return (substrOptions.start || substrOptions.length)
      ? (dateString: string) => makeIsoString(dateString).substr(substrOptions.start || 0, substrOptions.length)
      : undefined
  }
}

export default createNativeLocaleFormatter
