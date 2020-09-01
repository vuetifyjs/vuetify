import locales from '@/i18n/locales'

export function localeLookup (name) {
  return locales.find(l => [l.alternate, l.locale].includes(name)).locale
}
