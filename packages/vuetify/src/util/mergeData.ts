/**
 * @copyright 2017 Alex Regan
 * @license MIT
 * @see https://github.com/alexsasharegan/vue-functional-data-merge
 */
/* eslint-disable max-statements */
import { VNodeData } from 'vue'
import { camelize, wrapInArray } from './helpers'

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

  // Allow for variadic argument length.
  while (i--) {
    // Iterate through the data properties and execute merge strategies
    // Object.keys eliminates need for hasOwnProperty call
    for (prop of Object.keys(arguments[i])) {
      switch (prop) {
        // Array merge strategy (array concatenation)
        case 'class':
        case 'directives':
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeClasses(mergeTarget[prop], arguments[i][prop])
          }
          break
        case 'style':
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeStyles(mergeTarget[prop], arguments[i][prop])
          }
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
          if (arguments[i][prop]) {
            mergeTarget[prop] = mergeListeners(mergeTarget[prop], arguments[i][prop])
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
          if (!arguments[i][prop]) {
            break
          }
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = {}
          }
          mergeTarget[prop] = { ...arguments[i][prop], ...mergeTarget[prop] }
          break
        // Reassignment strategy (no merge)
        default: // slot, key, ref, tag, show, keepAlive
          if (!mergeTarget[prop]) {
            mergeTarget[prop] = arguments[i][prop]
          }
      }
    }
  }

  return mergeTarget
}

export function mergeStyles (
  target: undefined | string | object[] | object,
  source: undefined | string | object[] | object
) {
  if (!target) return source
  if (!source) return target

  target = wrapInArray(typeof target === 'string' ? parseStyle(target) : target)

  return (target as object[]).concat(typeof source === 'string' ? parseStyle(source) : source)
}

export function mergeClasses (target: any, source: any) {
  if (!source) return target
  if (!target) return source

  return target ? wrapInArray(target).concat(source) : source
}

export function mergeListeners (
  target: { [key: string]: Function | Function[] } | undefined,
  source: { [key: string]: Function | Function[] } | undefined
) {
  if (!target) return source
  if (!source) return target

  let event: string

  for (event of Object.keys(source)) {
    // Concat function to array of functions if callback present.
    if (target[event]) {
      // Insert current iteration data in beginning of merged array.
      target[event] = wrapInArray(target[event])
      ;(target[event] as Function[]).push(...wrapInArray(source[event]))
    } else {
      // Straight assign.
      target[event] = source[event]
    }
  }

  return target
}
