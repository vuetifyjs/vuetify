// Utilities
import kebabCase from 'lodash/kebabCase'
import languages from '@/data/i18n/languages.json'

export function layout (path, name, children) {
  const folder = kebabCase(name)

  return {
    path,
    component: () => import(
      /* webpackChunkName: "layout-[request]" */
      `@/layouts/${folder}/Index`
    ),
    props: true,
    children,
  }
}

export function trailingSlash (str) {
  return str.endsWith('/') ? str : str + '/'
}

// Matches allowed languages
export const languagePattern = languages.map(lang => lang.alternate || lang.locale).join('|')
export const languageRegexp = new RegExp('^(' + languagePattern + ')$')
// Matches any language identifier
export const genericLanguageRegexp = /[a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3}/

export const preferredLanguage = typeof document === 'undefined'
  ? 'en'
  : window.localStorage.getItem('currentLanguage') || navigator.languages.find(l => l.match(languageRegexp)) || 'en'

export function root (children) {
  return [
    layout(
      `/:lang(${languagePattern})`,
      'Root',
      children
    ),
    {
      path: `/:lang(${genericLanguageRegexp.source})/*`,
      redirect: to => trailingSlash(`/${preferredLanguage}/${to.params.pathMatch || ''}`),
    },
    {
      // The previous one doesn't match if there's no slash after the language code
      path: `/:lang(${genericLanguageRegexp.source})`,
      redirect: () => `/${preferredLanguage}/`,
    },
    redirect(to => trailingSlash(`/${preferredLanguage}${to.path}`)),
  ]
}

export function redirect (redirect) {
  return { path: '*', redirect }
}

export function route (path, name, file) {
  const folder = (file || `${kebabCase(name)}`).toLowerCase()

  return {
    component: () => import(`@/views/${folder}/Index.vue`),
    name,
    path,
  }
}
