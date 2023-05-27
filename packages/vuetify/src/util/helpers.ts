// Utilities
import { camelize, capitalize, computed, Fragment, reactive, toRefs, watchEffect } from 'vue'

// Types
import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  ComputedGetter,
  InjectionKey,
  PropType,
  Ref,
  Slots,
  ToRefs,
  VNode,
  VNodeChild,
} from 'vue'

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

export type SelectItemKey =
  | boolean // Ignored
  | string // Lookup by key, can use dot notation for nested objects
  | (string | number)[] // Nested lookup by key, each array item is a key in the next level
  | ((item: Record<string, any>, fallback?: any) => any)

export function getPropertyFromItem (
  item: any,
  property: SelectItemKey,
  fallback?: any
): any {
  if (property == null) return item === undefined ? fallback : item

  if (item !== Object(item)) {
    if (typeof property !== 'function') return fallback

    const value = property(item, fallback)

    return typeof value === 'undefined' ? fallback : value
  }

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

export function refElement<T extends object | undefined> (obj: T): Exclude<T, ComponentPublicInstance> | HTMLElement {
  return obj && '$el' in obj
    ? obj.$el as HTMLElement
    : obj as HTMLElement
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

export const keyValues: Record<string, string> = Object.freeze({
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

export function keys<O extends {}> (o: O) {
  return Object.keys(o) as (keyof O)[]
}

export function has<T extends string> (obj: object, key: T[]): obj is Record<T, unknown> {
  return key.every(k => obj.hasOwnProperty(k))
}

type MaybePick<
  T extends object,
  U extends Extract<keyof T, string>
> = Record<string, unknown> extends T ? Partial<Pick<T, U>> : Pick<T, U>

// Array of keys
export function pick<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
> (obj: T, paths: U[], exclude?: E[]): [yes: MaybePick<T, Exclude<U, E>>, no: Omit<T, Exclude<U, E>>]
// Array of keys or RegExp to test keys against
export function pick<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
> (obj: T, paths: (U | RegExp)[], exclude?: E[]): [yes: Partial<T>, no: Partial<T>]
export function pick<
  T extends object,
  U extends Extract<keyof T, string>,
  E extends Extract<keyof T, string>
> (obj: T, paths: (U | RegExp)[], exclude?: E[]): [yes: Partial<T>, no: Partial<T>] {
  const found = Object.create(null)
  const rest = Object.create(null)

  for (const key in obj) {
    if (
      paths.some(path => path instanceof RegExp
        ? path.test(key)
        : path === key
      ) && !exclude?.some(path => path === key)
    ) {
      found[key] = obj[key]
    } else {
      rest[key] = obj[key]
    }
  }

  return [found, rest]
}

export function omit<
  T extends object,
  U extends Extract<keyof T, string>
> (obj: T, exclude: U[]): Omit<T, U> {
  const clone = { ...obj }

  exclude.forEach(prop => delete clone[prop])

  return clone
}

/**
 * Filter attributes that should be applied to
 * the root element of a an input component. Remaining
 * attributes should be passed to the <input> element inside.
 */
export function filterInputAttrs (attrs: Record<string, unknown>) {
  return pick(attrs, ['class', 'style', 'id', /^data-/])
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

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
export function wrapInArray<T> (
  v: T | null | undefined
): T extends readonly any[]
    ? IfAny<T, T[], T>
    : NonNullable<T>[] {
  return v == null
    ? []
    : Array.isArray(v)
      ? v as any : [v]
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

type Writable<T> = {
  -readonly [P in keyof T]: T[P]
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

export function getDecimals (value: number) {
  const trimmedStr = value.toString().trim()
  return trimmedStr.includes('.')
    ? (trimmedStr.length - trimmedStr.indexOf('.') - 1)
    : 0
}

export function padEnd (str: string, length: number, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length))
}

export function padStart (str: string, length: number, char = '0') {
  return char.repeat(Math.max(0, length - str.length)) + str
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
  arrayFn?: (a: unknown[], b: unknown[]) => unknown[],
) {
  const out: Record<string, any> = {}

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
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn)

      continue
    }

    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty)

      continue
    }

    out[key] = targetProperty
  }

  return out
}

export function fillArray<T> (length: number, obj: T) {
  return Array(length).fill(obj)
}

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

export function toKebabCase (str = '') {
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str)!
  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
  toKebabCase.cache.set(str, kebab)
  return kebab
}
toKebabCase.cache = new Map<string, string>()

export type MaybeRef<T> = T | Ref<T>

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

export function findChildrenWithProvide (
  key: InjectionKey<any> | symbol,
  vnode?: VNodeChild,
): ComponentInternalInstance[] {
  if (!vnode || typeof vnode !== 'object') return []

  if (Array.isArray(vnode)) {
    return vnode.map(child => findChildrenWithProvide(key, child)).flat(1)
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map(child => findChildrenWithProvide(key, child)).flat(1)
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key as symbol)) {
      return [vnode.component]
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1)
    }
  }

  return []
}

export class CircularBuffer<T = never> {
  readonly #arr: Array<T> = []
  #pointer = 0

  constructor (public readonly size: number) {}

  push (val: T) {
    this.#arr[this.#pointer] = val
    this.#pointer = (this.#pointer + 1) % this.size
  }

  values (): T[] {
    return this.#arr.slice(this.#pointer).concat(this.#arr.slice(0, this.#pointer))
  }
}

export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export function getEventCoordinates (e: MouseEvent | TouchEvent) {
  if ('touches' in e) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
  }

  return { clientX: e.clientX, clientY: e.clientY }
}

// Only allow a single return type
type NotAUnion<T> = [T] extends [infer U] ? _NotAUnion<U, U> : never
type _NotAUnion<T, U> = U extends any ? [T] extends [U] ? unknown : never : never

/**
 * Convert a computed ref to a record of refs.
 * The getter function must always return an object with the same keys.
 */
export function destructComputed<T extends object> (getter: ComputedGetter<T & NotAUnion<T>>): ToRefs<T>
export function destructComputed<T extends object> (getter: ComputedGetter<T>) {
  const refs = reactive({}) as T
  const base = computed(getter)
  watchEffect(() => {
    for (const key in base.value) {
      refs[key] = base.value[key]
    }
  }, { flush: 'sync' })
  return toRefs(refs)
}

/** Array.includes but value can be any type */
export function includes (arr: readonly any[], val: any) {
  return arr.includes(val)
}

const onRE = /^on[^a-z]/
export const isOn = (key: string) => onRE.test(key)

export type EventProp<T extends any[] = any[], F = (...args: T) => any> = F | F[]
export const EventProp = <T extends any[] = any[]>() => [Function, Array] as PropType<EventProp<T>>

export function hasEvent (props: Record<string, any>, name: string) {
  name = 'on' + capitalize(name)
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`])
}

export function callEvent<T extends any[]> (handler: EventProp<T> | undefined, ...args: T) {
  if (Array.isArray(handler)) {
    for (const h of handler) {
      h(...args)
    }
  } else if (typeof handler === 'function') {
    handler(...args)
  }
}

export function focusableChildren (el: Element) {
  const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', '[tabindex]']
    .map(s => `${s}:not([tabindex="-1"]):not([disabled])`)
    .join(', ')
  return [...el.querySelectorAll(targets)] as HTMLElement[]
}

export function focusChild (el: Element, location?: 'next' | 'prev' | 'first' | 'last') {
  const focusable = focusableChildren(el)
  const idx = focusable.indexOf(document.activeElement as HTMLElement)

  if (!location) {
    if (!el.contains(document.activeElement)) {
      focusable[0]?.focus()
    }
  } else if (location === 'first') {
    focusable[0]?.focus()
  } else if (location === 'last') {
    focusable.at(-1)?.focus()
  } else {
    let _el
    let idxx = idx
    const inc = location === 'next' ? 1 : -1
    do {
      idxx += inc
      _el = focusable[idxx]
    } while ((!_el || _el.offsetParent == null) && idxx < focusable.length && idxx >= 0)
    if (_el) _el.focus()
    else focusChild(el, location === 'next' ? 'first' : 'last')
  }
}

export function noop () {}
