// Utilities
import { camelize, Fragment, isRef, ref } from 'vue'

// Types
import type { ComponentInternalInstance, ComponentPublicInstance, Ref, Slots, VNode, VNodeChild } from 'vue'

export function getNestedValue (obj: any, path: (string | number)[], fallback?: any): any {
  const last = path.length - 1

  if (last < 0) return obj === undefined ? fallback : obj

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback
    }
    obj = obj[path[i]]
  }

  if (obj == null) return fallback

  return obj[path[last]] === undefined ? fallback : obj[path[last]]
}

export function deepEqual (a: any, b: any): boolean {
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

  return props.every(p => deepEqual(a[p], b[p]))
}

export function getObjectValueByPath (obj: any, path: string, fallback?: any): any {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (obj == null || !path || typeof path !== 'string') return fallback
  if (obj[path] !== undefined) return obj[path]
  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot
  return getNestedValue(obj, path.split('.'), fallback)
}

type SelectItemKey = string | (string | number)[] | ((item: Dictionary<any>, fallback?: any) => any)

export function getPropertyFromItem (
  item: object,
  property: SelectItemKey,
  fallback?: any
): any {
  if (property == null) return item === undefined ? fallback : item

  if (item !== Object(item)) return fallback === undefined ? item : fallback

  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback)

  if (Array.isArray(property)) return getNestedValue(item, property, fallback)

  if (typeof property !== 'function') return fallback

  const value = property(item, fallback)

  return typeof value === 'undefined' ? fallback : value
}

export function createRange (length: number, start = 0): number[] {
  return Array.from({ length }, (v, k) => start + k)
}

export function getZIndex (el?: Element | null): number {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0

  const index = +window.getComputedStyle(el).getPropertyValue('z-index')

  if (!index) return getZIndex(el.parentNode as Element)
  return index
}

const tagsToReplace: Dictionary<string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
}

export function escapeHTML (str: string): string {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag)
}

export function filterObjectOnKeys<T, K extends keyof T> (obj: T, keys: K[]): { [N in K]: T[N] } {
  const filtered = {} as { [N in K]: T[N] }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key]
    }
  }

  return filtered
}

export function convertToUnit (str: number, unit?: string): string
export function convertToUnit (str: string | number | null | undefined, unit?: string): string | undefined
export function convertToUnit (str: string | number | null | undefined, unit = 'px'): string | undefined {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str!)) {
    return String(str)
  } else if (!isFinite(+str!)) {
    return undefined
  } else {
    return `${Number(str)}${unit}`
  }
}

export function isObject (obj: any): obj is object {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

export function isComponentInstance (obj: any): obj is ComponentPublicInstance {
  return obj?.$el
}

// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16,
})

export const keyValues = Object.freeze({
  enter: 'Enter',
  tab: 'Tab',
  delete: 'Delete',
  esc: 'Escape',
  space: 'Space',
  up: 'ArrowUp',
  down: 'ArrowDown',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  end: 'End',
  home: 'Home',
  del: 'Delete',
  backspace: 'Backspace',
  insert: 'Insert',
  pageup: 'PageUp',
  pagedown: 'PageDown',
  shift: 'Shift',
})

export function keys<O> (o: O) {
  return Object.keys(o) as (keyof O)[]
}

type MaybePick<
  T extends object,
  U extends Extract<keyof T, string>
> = Record<string, unknown> extends T ? Partial<Pick<T, U>> : Pick<T, U>

export function pick<
  T extends object,
  U extends Extract<keyof T, string>
> (obj: T, paths: U[]): [MaybePick<T, U>, Omit<T, U>] {
  const found = Object.create(null)
  const rest = Object.create(null)

  for (const key in obj) {
    if (paths.includes(key as U)) {
      found[key] = obj[key]
    } else {
      rest[key] = obj[key]
    }
  }

  return [found, rest]
}

/**
 * Returns the set difference of B and A, i.e. the set of elements in B but not in A
 */
export function arrayDiff (a: any[], b: any[]): any[] {
  const diff: any[] = []
  for (let i = 0; i < b.length; i++) {
    if (!a.includes(b[i])) diff.push(b[i])
  }
  return diff
}

interface ItemGroup<T> {
  name: string
  items: T[]
}

export function groupItems<T extends any = any> (
  items: T[],
  groupBy: string[],
  groupDesc: boolean[]
): ItemGroup<T>[] {
  const key = groupBy[0]
  const groups: ItemGroup<T>[] = []
  let current
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const val = getObjectValueByPath(item, key, null)
    if (current !== val) {
      current = val
      groups.push({
        name: val ?? '',
        items: [],
      })
    }
    groups[groups.length - 1].items.push(item)
  }
  return groups
}

export function wrapInArray<T> (v: T | T[] | null | undefined): T[] {
  return v == null
    ? []
    : Array.isArray(v)
      ? v : [v]
}

export function wrapInPromise<T> (v: any): Promise<T> {
  if (v instanceof Promise) return v
  if (typeof v === 'function') return new Promise(v)
  return Promise.resolve(v)
}

type DataTableCompareFunction<T = any> = (a: T, b: T) => number
export function sortItems<T extends any, K extends keyof T> (
  items: T[],
  sortBy: string[],
  sortDesc: boolean[],
  locale: string,
  customSorters?: Record<K, DataTableCompareFunction<T[K]>>
): T[] {
  if (sortBy === null || !sortBy.length) return items
  const stringCollator = new Intl.Collator(locale, { sensitivity: 'accent', usage: 'sort' })

  return items.sort((a, b) => {
    for (let i = 0; i < sortBy.length; i++) {
      const sortKey = sortBy[i]

      let sortA = getObjectValueByPath(a, sortKey)
      let sortB = getObjectValueByPath(b, sortKey)

      if (sortDesc[i]) {
        [sortA, sortB] = [sortB, sortA]
      }

      if (customSorters?.[sortKey as K]) {
        const customResult = customSorters[sortKey as K](sortA, sortB)

        if (!customResult) continue

        return customResult
      }

      // Check if both cannot be evaluated
      if (sortA === null && sortB === null) {
        continue
      }

      // Dates should be compared numerically
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime()
      }

      [sortA, sortB] = [sortA, sortB].map(s => (s || '').toString().toLocaleLowerCase())

      if (sortA !== sortB) {
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB)
        return stringCollator.compare(sortA, sortB)
      }
    }

    return 0
  })
}

export function defaultFilter (value: any, search: string | null, item: any) {
  return value != null &&
    search != null &&
    typeof value !== 'boolean' &&
    value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
}

export function searchItems<T extends any = any> (items: T[], search: string): T[] {
  if (!search) return items
  search = search.toString().toLowerCase()
  if (search.trim() === '') return items

  return items.filter((item: any) => Object.keys(item).some(key => defaultFilter(getObjectValueByPath(item, key), search, item)))
}

export function debounce (fn: Function, delay: number) {
  let timeoutId = 0 as any
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any> (fn: T, limit: number) {
  let throttling = false
  return (...args: Parameters<T>): void | ReturnType<T> => {
    if (!throttling) {
      throttling = true
      setTimeout(() => throttling = false, limit)
      return fn(...args)
    }
  }
}

/**
 * Filters slots to only those starting with `prefix`, removing the prefix
 */
export function getPrefixedSlots (prefix: string, slots: Slots): Slots {
  return Object.keys(slots)
    .filter(k => k.startsWith(prefix))
    .reduce<Writable<Slots>>((obj, k) => {
      obj[k.replace(prefix, '')] = slots[k]
      return obj
    }, {})
}

export function clamp (value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

export function padEnd (str: string, length: number, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length))
}

export function chunk (str: string, size = 1) {
  const chunked: string[] = []
  let index = 0
  while (index < str.length) {
    chunked.push(str.substr(index, size))
    index += size
  }
  return chunked
}

export function humanReadableFileSize (bytes: number, base: 1000 | 1024 = 1000): string {
  if (bytes < base) {
    return `${bytes} B`
  }

  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G']
  let unit = -1
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base
    ++unit
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`
}

export function camelizeObjectKeys (obj: Record<string, any> | null | undefined) {
  if (!obj) return {}

  return Object.keys(obj).reduce((o: any, key: string) => {
    o[camelize(key)] = obj[key]
    return o
  }, {})
}

export function mergeDeep (
  source: Record<string, any> = {},
  target: Record<string, any> = {},
  out: Record<string, any> = {},
) {
  for (const key in source) {
    out[key] = source[key]
  }

  for (const key in target) {
    const sourceProperty = source[key]
    const targetProperty = target[key]

    // Only continue deep merging if
    // both properties are objects
    if (
      isObject(sourceProperty) &&
      isObject(targetProperty)
    ) {
      out[key] = mergeDeep(sourceProperty, targetProperty)

      continue
    }

    out[key] = targetProperty
  }

  return out
}

export function fillArray<T> (length: number, obj: T) {
  return Array(length).fill(obj)
}

export function getUid () {
  return getUid._uid++
}
getUid._uid = 0

export function flattenFragments (nodes: VNode[]): VNode[] {
  return nodes.map(node => {
    if (node.type === Fragment) {
      return flattenFragments(node.children as VNode[])
    } else {
      return node
    }
  }).flat()
}

export const randomHexColor = () => {
  const n = (Math.random() * 0xfffff * 1000000).toString(16)
  return '#' + n.slice(0, 6)
}

export const toKebabCase = (str: string) => str.replace(/([A-Z])/g, match => `-${match.toLowerCase()}`)

export type MaybeRef<T> = T | Ref<T>

export type ExtractMaybeRef<P> = P extends MaybeRef<infer T> ? T : P;

export function wrapInRef <T> (x: T) {
  return (isRef(x) ? x : ref(x)) as Ref<ExtractMaybeRef<T>>
}

export function findChildren (vnode?: VNodeChild): ComponentInternalInstance[] {
  if (!vnode || typeof vnode !== 'object') {
    return []
  }

  if (Array.isArray(vnode)) {
    return vnode
      .map(child => findChildren(child))
      .filter(v => v)
      .flat(1)
  } else if (Array.isArray(vnode.children)) {
    return vnode.children
      .map(child => findChildren(child))
      .filter(v => v)
      .flat(1)
  } else if (vnode.component) {
    return [vnode.component, ...findChildren(vnode.component?.subTree)]
      .filter(v => v)
      .flat(1)
  }

  return []
}
