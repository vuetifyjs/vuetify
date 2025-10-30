import { isPrimitive } from './helpers'

function updateRecursionCache (a: any, b: any, cache: WeakMap<any, any>, result: boolean) {
  if (!cache || isPrimitive(a) || isPrimitive(b)) return

  const visitedObject = cache.get(a)
  if (visitedObject) {
    visitedObject.set(b, result)
  } else {
    const newCacheItem = new WeakMap()
    newCacheItem.set(b, result)
    cache.set(a, newCacheItem)
  }
}

function findCachedComparison (a: any, b: any, cache: WeakMap<any, any>): boolean | null {
  if (!cache || isPrimitive(a) || isPrimitive(b)) return null

  const r1 = cache.get(a)?.get(b)
  if (typeof r1 === 'boolean') return r1
  const r2 = cache.get(b)?.get(a)
  if (typeof r2 === 'boolean') return r2
  return null
}

export function deepEqual (a: any, b: any, recursionCache = new WeakMap()): boolean {
  if (a === b) return true

  if (
    a instanceof Date &&
    b instanceof Date &&
    a.getTime() !== b.getTime()
  ) {
    // If the values are Date, compare them as timestamps
    return false
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false
  }

  const props = Object.keys(a)

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false
  }

  const cachedComparisonResult = findCachedComparison(a, b, recursionCache)
  if (cachedComparisonResult) {
    return cachedComparisonResult
  }

  updateRecursionCache(a, b, recursionCache, true)

  return props.every(p => deepEqual(a[p], b[p], recursionCache))
}
