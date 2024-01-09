// Imports
import locales from '@/i18n/locales.json'
import generatedPages from 'virtual:generated-pages'
import redirects from '@/data/301.json'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Regexp
// const genericLocaleRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/
export const languagePattern = locales.filter(l => l.enabled).map(lang => lang.alternate || lang.locale).join('|')
export const disabledLanguagePattern = locales.filter(l => !l.enabled).map(lang => lang.alternate || lang.locale).join('|')
export const anyLanguagePattern = locales.map(lang => lang.alternate || lang.locale).join('|')

export function preferredLocale (locale = 'en') {
  if (!IN_BROWSER) return locale

  const languages = ([] as string[]).concat(window.localStorage.getItem('currentLocale') || [], navigator.languages || [])

  return languages.find(l => locales.some(locale => locale.enabled && l === (locale.alternate || locale.locale))) || locale
}

export function rpath (path = '') {
  const locale = preferredLocale()
  const [_url, hash] = path.split('#')
  const [url, query] = _url.split('?')

  return leadingSlash(trailingSlash([
    '',
    locale,
    ...url.split('/').filter(p => !!p && p !== locale),
  ].filter(v => v != null).join('/'))) + (hash ? `#${hash}` : '') + (query ? `?${query}` : '')
}

export function leadingSlash (str: string) {
  return str.startsWith('/') ? str : '/' + str
}

export function trailingSlash (str: string) {
  return str.endsWith('/') ? str : str + '/'
}

export const generatedRoutes = generatedPages.map(route => ({
  ...route,
  path: trailingSlash(route.path),
}))

export const redirectRoutes = IN_BROWSER ? Object.entries(redirects).flatMap(([from, to]) => [
  {
    path: `/${from}`,
    redirect: to,
  },
  {
    path: `/:locale(${anyLanguagePattern})/${from}`,
    redirect: to,
  },
]) : []
