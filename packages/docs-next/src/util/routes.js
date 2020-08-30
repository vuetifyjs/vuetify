// Imports
import locales from '@/i18n/locales'
import { kebabCase } from 'lodash'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Regexp
const genericLocaleRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/
const fallbackLocale = genericLocaleRegexp.source
const languagePattern = locales.map(lang => lang.alternate || lang.locale).join('|')

export function abort (code = 404) {
  return {
    name: 'FourOhFour',
    path: '*',
    component: () => error(code),
  }
}

export function error (code = 404) {
  return import(
    /* webpackChunkName: "error-[request]" */
    `@/views/errors/${code}.vue`
  )
}

export function layout (name = 'Default', children = [], path = '') {
  const dir = kebabCase(name)

  return {
    children,
    component: () => import(
      /* webpackChunkName: "layout-[request]" */
      `@/layouts/${dir}/${name}`
    ),
    path,
  }
}

export function locale (children) {
  return layout(
    'Locale',
    children,
    `/:locale(${languagePattern})`,
  )
}

export function preferredLocale (locale = 'en') {
  const languageRegexp = new RegExp('^(' + languagePattern + ')$')

  if (!IN_BROWSER) return locale

  const languages = navigator.languages.find(l => l.match(languageRegexp))

  return (
    window.localStorage.getItem('currentLanguage') ||
    languages ||
    locale
  )
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

  const route = [
    locale,
    ...path.split('/').filter(p => !!p && p !== locale),
  ]

  return `/${route.join('/')}/`
}

export function route (name, path = '', strict = true) {
  return {
    name,
    component: () => import(
      /* webpackChunkName: "views-[request]" */
      `@/views/${name}`
    ),
    path,
    pathToRegexpOptions: { strict },
  }
}
