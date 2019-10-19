// Utilities
import kebabCase from 'lodash/kebabCase'

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
    children,
  }
}

export function root (children) {
  return [
    layout(
      '/:lang([a-z]{2,3}|[a-z]{2,3}-[a-zA-Z]{4}|[a-z]{2,3}-[A-Z]{2,3})',
      'Root',
      children
    ),
  ]
}

export function redirect (redirect) {
  return { path: '*', redirect }
}

export function route (path, name, file) {
  const folder = (file || `${kebabCase(name)}`).toLowerCase()

  return {
    path,
    name,
    component: () => import(`@/views/${folder}/Index.vue`),
  }
}
