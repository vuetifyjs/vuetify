// mirror of the type guards from `@vuetify/v0`
// temporary shim, to be replaced by a direct import in v5.0

export function isFunction (value: unknown): value is Function {
  return typeof value === 'function'
}

export function isString (value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber (value: unknown): value is number {
  return typeof value === 'number'
}

export function isBoolean (value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isSymbol (value: unknown): value is symbol {
  return typeof value === 'symbol'
}

export function isArray (value: unknown): value is unknown[] {
  return Array.isArray(value)
}

// Returns false for null and arrays, unlike a bare `typeof value === 'object'`
export function isObject (value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isNull (value: unknown): value is null {
  return value === null
}

export function isUndefined (value: unknown): value is undefined {
  return value === undefined
}

export function isNullOrUndefined (value: unknown): value is null | undefined {
  return value == null
}

export function isElement (value: unknown): value is Element {
  return typeof Element !== 'undefined' && value instanceof Element
}

export function isThenable (value: unknown): value is { then: Function } {
  return isObject(value) && 'then' in value && isFunction(value.then)
}

// Unlike the global isNaN, the argument is not coerced to a number first
export function isNaN (value: unknown): value is number {
  return isNumber(value) && Number.isNaN(value)
}
