// Beautiful utils stolen directly from Vue.js

function cached<O> (fn: (i: string) => O): (i: string) => O {
  const cache: { [index: string]: O } = Object.create(null)
  return str => cache[str] || (cache[str] = fn(str))
}

const camelizeRE = /-(\w)/g
export const camelize = cached(
  (str: string): string =>
    str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
)

export const capitalize = cached(
  (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
)

export const pascalize = cached(
  (str: string): string =>
    str.charAt(0).toUpperCase() +
    str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : '')).slice(1)
)

const hyphenateRE = /([^-])([A-Z])/g
export const hyphenate = cached(
  (str: string): string => {
    return str
      .replace(hyphenateRE, '$1-$2')
      .replace(hyphenateRE, '$1-$2')
      .toLowerCase()
  }
)
