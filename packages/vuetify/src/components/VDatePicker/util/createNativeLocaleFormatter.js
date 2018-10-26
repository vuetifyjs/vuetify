import pad from './pad'

export default (locale, options, { start, length } = { start: 0, length: 0 }) => {
  const makeIsoString = dateString => {
    const [year, month, date] = dateString.trim().split(' ')[0].split('-')
    return [year, pad(month || 1), pad(date || 1)].join('-')
  }

  try {
    const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options)
    return dateString => intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
  } catch (e) {
    return (start || length) ? dateString => makeIsoString(dateString).substr(start, length) : null
  }
}
