// The surface of `@vuetify/v0` that core consumes, re-exported through `@/util`
// so call sites stay on the existing barrel. Grow this file as more of v0 is
// adopted into 4.x minors.

export {
  isArray,
  isBoolean,
  isElement,
  isFunction,
  isNaN,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isString,
  isSymbol,
  isThenable,
  isUndefined,
} from '@vuetify/v0/utilities'

// Kept under core's existing name — `range` shadows local variables in several
// components (VPagination, VRating, VSlider).
export { range as createRange } from '@vuetify/v0/utilities'
