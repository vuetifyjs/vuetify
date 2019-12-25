/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */
/* eslint-disable max-statements */
import { VNodeData } from 'vue'
import { camelize } from './helpers'

const pattern = {
  styleList: /;(?![^(]*\))/g,
  styleProp: /:(.*)/,
} as const

function parseStyle (style: string) {
  const styleMap: Dictionary<any> = {}

  for (const s of style.split(pattern.styleList)) {
    let [key, val] = s.split(pattern.styleProp)
    key = key.trim()
    if (!key) {
      continue
    }
    // May be undefined if the `key: value` pair is incomplete.
    if (typeof val === 'string') {
      val = val.trim()
    }
    styleMap[camelize(key)] = val
  }

  return styleMap
}

/**
 * Intelligently merges data for createElement.
 * Merges arguments left to right, preferring the right argument.
 * Returns new VNodeData object.
 */
export default function mergeData (...vNodeData: VNodeData[]): VNodeData
export default function mergeData (): VNodeData {
  const mergeTarget: VNodeData & Dictionary<any> = {}
  let i: number = arguments.length
  let prop: string
  let event: string

  // Allow for variadic argument length.
  while (i--) {
    // Iterate through the data properties and execute merge strategies
    // Object.keys eliminates need for hasOwnProperty call
    for (prop of Object.keys(arguments[i])) {
      switch (prop) {
        // Array merge strategy (array concatenation)
        case 'class':
        case 'style':
        case 'directives':
          if (!Array.isArray(mergeTarget[prop])) {
            mergeTarget[prop] = []
          }

          if (prop === 'style') {
            let style: any[]
            if (Array.isArray(arguments[i].style)) {
              style = arguments[i].style
            } else {
              style = [arguments[i].style]
            }
            for (let j = 0; j < style.length; j++) {
              const s = style[j]
              if (typeof s === 'string') {
                style[j] = parseStyle(s)
              }
            }
            arguments[i].style = style
          }

          // Repackaging in an array allows Vue runtime
          // to merge class/style bindings regardless of type.
          mergeTarget[prop] = mergeTarget[prop].concat(arguments[i][prop])
          break
        // Space delimited string concatenation strategy
        case 'staticClass':
          if (!arguments[i][prop]) {
            break
          }
          if (mergeTarget[prop] === undefined) {
            mergeTarget[prop] = ''
          }
          if (mergeTarget[prop]) {
            // Not an empty string, so concatenate
            mergeTarget[prop] += ' '
          }
          mergeTarget[prop] += arguments[i][prop].trim()
          break
        // Object, the properties of which to merge via array merge strategy (array concatenation).
        // Callback merge strategy merges callbacks to the beginning of the array,
        // so that the last defined callback will be invoked first.
        // This is done since to mimic how Object.assign merging
        // uses the last given value to assign.
        case 'on':
        case 'nativeOn':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {}
          }
          const listeners = mergeTarget[prop]!
          for (event of Object.keys(arguments[i][prop] || {})) {
            // Concat function to array of functions if callback present.
            if (listeners[event]) {
              // Insert current iteration data in beginning of merged array.
              listeners[event] = Array<Function>().concat( // eslint-disable-line
                listeners[event],
                arguments[i][prop][event]
              )
            } else {
              // Straight assign.
              listeners[event] = arguments[i][prop][event]
            }
          }
          break
        // Object merge strategy
        case 'attrs':
        case 'props':
        case 'domProps':
        case 'scopedSlots':
        case 'staticStyle':
        case 'hook':
        case 'transition':
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {}
          }
          mergeTarget[prop] = { ...arguments[i][prop], ...mergeTarget[prop] }
          break
        // Reassignment strategy (no merge)
        case 'slot':
        case 'key':
        case 'ref':
        case 'tag':
        case 'show':
        case 'keepAlive':
        default:
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop]
          }
      }
    }
  }

  return mergeTarget
}
