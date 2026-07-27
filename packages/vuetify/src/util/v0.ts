// The surface of `@vuetify/v0` that core consumes, re-exported through `@/util`
// so call sites stay on the existing barrel. Grow this file as more of v0 is
// adopted into 4.x minors.

import { isObject as _isObject } from '@vuetify/v0/utilities'

export {
  isArray,
  isBoolean,
  isElement,
  isFunction,
  isNaN,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isThenable,
  isUndefined,
} from '@vuetify/v0/utilities'

// v0 narrows to `Record<string, unknown>`, which propagates `unknown` into every
// property access downstream. Core reads properties off narrowed objects all
// over, so re-widen the value type while keeping v0's implementation.
export function isObject (value: unknown): value is Record<string, any> {
  return _isObject(value)
}

// Kept under core's existing name — `range` shadows local variables in several
// components (VPagination, VRating, VSlider).
export { range as createRange } from '@vuetify/v0/utilities'
