// Imports
import locales from '@/i18n/locales'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Regexp
const genericLocaleRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/
const fallbackLocale = genericLocaleRegexp.source
const languagePattern = locales.map(lang => lang.alternate || lang.locale).join('|')
const languageRegexp = new RegExp('^(' + languagePattern + ')$')

export function preferredLocale (locale = 'en') {
  if (!IN_BROWSER) return locale

  const languages = [].concat(window.localStorage.getItem('currentLocale') || [], navigator.languages || [])

  return languages.find(l => l.match(languageRegexp)) || locale
}

export function redirect (
  path = '*',
  rhandler,
  fallback = fallbackLocale,
) {
  if (typeof rhandler !== 'function') {
    rhandler = to => to.path
  }

  path = path.replace('%s', fallback)

  return {
    path,
    redirect: to => rpath(rhandler(to)),
  }
}

export function rpath (path = '') {
  const locale = preferredLocale()
  const [url, hash] = path.split('#')

  return [
    '',
    locale,
    ...url.split('/').filter(p => !!p && p !== locale),
    hash ? `#${hash}` : null,
  ].filter(v => v != null).join('/')
}

export function trailingSlash (str) {
  return str.endsWith('/') ? str : str + '/'
}
