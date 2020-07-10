// Imports
import languages from '@/i18n/locales'
import { kebabCase } from 'lodash'
import { leadingSlash, trailingSlash } from '@/util/helpers'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Regexp
const genericLocaleRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/
const fallbackLocale = genericLocaleRegexp.source
const languagePattern = languages.map(lang => lang.alternate || lang.locale).join('|')

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

export function layout (layout = 'Default', children, path = '') {
  const dir = kebabCase(layout)

  return {
    children,
    component: () => import(
      /* webpackChunkName: "layout-[request]" */
      `@/layouts/${dir}/Index`
    ),
    path,
  }
}

export function locale (children = []) {
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
  if (typeof path === 'function') {
    rhandler = path
    path = '*'
  }

  path = path.replace('%s', fallback)

  return {
    path,
    redirect: to => {
      const locale = preferredLocale()
      const rpath = rhandler(to)
      const url = rpath !== ''
        ? leadingSlash(trailingSlash(rpath))
        : rpath

      return `/${locale}${url}`
    },
  }
}

export function route (name, component, path = '') {
  component = Object(component) === component
    ? component
    : { default: name }

  const components = {}

  for (const [key, value] of Object.entries(component)) {
    components[key] = () => import(
      /* webpackChunkName: "views-[request]" */
      `@/views/${value}`
    )
  }

  return {
    name,
    components,
    path,
  }
}
