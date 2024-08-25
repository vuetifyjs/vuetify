export function preventLoops<T> (path: T[] | Set<T> | Map<T, any>, itemToPush: T) {
  if (
    (Array.isArray(path) && path.includes(itemToPush)) ||
    (path instanceof Set && path.has(itemToPush)) ||
    (path instanceof Map && path.has(itemToPush))
  ) {
    throw new Error('[Vuetify] Could not resolve nested path because of duplicated identifiers')
  }
}
