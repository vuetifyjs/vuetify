// Utilities
import kebabCase from 'lodash/kebabCase'
import languages from '@/data/i18n/languages.json'

export function getLanguageCookie () {
  return typeof document === 'undefined'
    ? undefined
    : new Map(
      document.cookie.split('; ').map(c => c.split('='))
    ).get('currentLanguage')
}

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

export function root (children) {
  return [
    layout(
      `/:lang`,
      'Root',
      children
    ),
    redirectLang(),
  ]
}

export function redirect (redirect) {
  return { path: '*', redirect }
}

export function redirectLang (path = '') {
  const languageRe = new RegExp(languages.map(l => l.locale).join('|'), 'gi')

  return redirect(to => {
    const langCookie = getLanguageCookie() || ''
    const lang = langCookie.match(languageRe) ? langCookie : 'en'
    path = path || to.path

    const redirectPath = `/${lang}`
    const trailingSlash = redirectPath.substr(-1) !== '/' ? '/' : ''

    return `${redirectPath}${trailingSlash}`
  })
}

export function route (path, name, file) {
  const folder = (file || `${kebabCase(name)}`).toLowerCase()

  return {
    component: () => import(`@/views/${folder}/Index.vue`),
    name,
    path,
  }
}
