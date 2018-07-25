import { test } from '@/test'
import {
  deepEqual,
  getNestedValue,
  getPropertyFromItem,
  convertToUnit
} from '@/util/helpers'

test('helpers.js', () => {
  it('should pass comparison', () => {

    // Null
    expect(deepEqual(null, null)).toEqual(true)
    expect(deepEqual(null, undefined)).toEqual(false)
    expect(deepEqual(null, false)).toEqual(false)
    expect(deepEqual(null, 0)).toEqual(false)
    expect(deepEqual(null, '')).toEqual(false)
    expect(deepEqual(null, [])).toEqual(false)
    expect(deepEqual(null, {})).toEqual(false)

    // Undefined
    expect(deepEqual(undefined, undefined)).toEqual(true)
    expect(deepEqual(undefined, null)).toEqual(false)
    expect(deepEqual(undefined, false)).toEqual(false)
    expect(deepEqual(undefined, 0)).toEqual(false)
    expect(deepEqual(undefined, '')).toEqual(false)
    expect(deepEqual(undefined, [])).toEqual(false)
    expect(deepEqual(undefined, {})).toEqual(false)

    // Boolean
    expect(deepEqual(true, true)).toEqual(true)
    expect(deepEqual(true, false)).toEqual(false)
    expect(deepEqual(true, undefined)).toEqual(false)
    expect(deepEqual(true, null)).toEqual(false)
    expect(deepEqual(true, 0)).toEqual(false)
    expect(deepEqual(true, 1)).toEqual(false)
    expect(deepEqual(true, '')).toEqual(false)
    expect(deepEqual(true, 'abc')).toEqual(false)
    expect(deepEqual(true, [1, 2])).toEqual(false)
    expect(deepEqual(true, {x: 1})).toEqual(false)

    expect(deepEqual(false, false)).toEqual(true)
    expect(deepEqual(false, true)).toEqual(false)
    expect(deepEqual(false, undefined)).toEqual(false)
    expect(deepEqual(false, null)).toEqual(false)
    expect(deepEqual(false, 0)).toEqual(false)
    expect(deepEqual(false, 1)).toEqual(false)
    expect(deepEqual(false, '')).toEqual(false)
    expect(deepEqual(false, 'abc')).toEqual(false)
    expect(deepEqual(false, [1, 2])).toEqual(false)
    expect(deepEqual(false, {x: 1})).toEqual(false)

    // Number
    expect(deepEqual(5, 5)).toEqual(true)
    expect(deepEqual(8, 8.0)).toEqual(true)
    expect(deepEqual(8, '8')).toEqual(false)
    expect(deepEqual(-10, -10)).toEqual(true)

    expect(deepEqual(0, '')).toEqual(false)
    expect(deepEqual(0, false)).toEqual(false)
    expect(deepEqual(0, null)).toEqual(false)
    expect(deepEqual(0, undefined)).toEqual(false)

    // String
    expect(deepEqual('', '')).toEqual(true)
    expect(deepEqual('a', 'a')).toEqual(true)
    expect(deepEqual('a', 'b')).toEqual(false)
    expect(deepEqual('a', 'A')).toEqual(false)
    expect(deepEqual('abc', 'abc')).toEqual(true)
    expect(deepEqual('Abc', 'abc')).toEqual(false)
    expect(deepEqual(' ', '')).toEqual(false)

    // Array
    expect(deepEqual([], [])).toEqual(true)
    expect(deepEqual([1], [1.0])).toEqual(true)
    expect(deepEqual([1, '2'], [1, '2'])).toEqual(true)
    expect(deepEqual([1, {x: 1, y: 2}], [1, {x: 1, y: 2}])).toEqual(true)
    expect(deepEqual([1, {x: 1, y: null}], [1, {x: 1, y: false}])).toEqual(false)
    expect(deepEqual([1, [1, 2]], [1, [1, 2]])).toEqual(true)

    // Object
    expect(deepEqual({}, {})).toEqual(true)
    expect(deepEqual({x: 1}, {x: 1})).toEqual(true)
    expect(deepEqual({x: 1}, {})).toEqual(false)
    expect(deepEqual({x: {a: 1, b: 2}}, {x: {a: 1, b: 2}})).toEqual(true)

    // Date
    const currentDate = new Date
    const futureDate = new Date(1000)

    expect(deepEqual(currentDate, currentDate)).toEqual(true)
    expect(deepEqual({date: currentDate}, {date: currentDate})).toEqual(true)
    expect(deepEqual(currentDate, futureDate)).toEqual(false)
    expect(deepEqual({date: currentDate}, {date: futureDate})).toEqual(false)

    const circular = {}
    circular.me = circular

    expect(deepEqual({r: circular}, {r: circular})).toEqual(true)
    expect(deepEqual({r: circular, x: 1}, {r: circular, x: 2})).toEqual(false)
    expect(deepEqual({r: [circular]}, {r: [circular]})).toEqual(true)

  })

  it('should get nested value', () => {
    const obj = {
      a: {
        b: {
          c: 1,
          d: 2
        },
        e: [
          {f: 'f'},
          'e1'
        ]
      },
      g: null
    }

    expect(getNestedValue(obj, ['a', 'b', 'c'])).toEqual(1)
    expect(getNestedValue(obj, ['a', 'b', 'd'])).toEqual(2)
    expect(getNestedValue(obj, ['a', 'b'])).toEqual({c: 1, d: 2})
    expect(getNestedValue(obj, ['a', 'e', '0', 'f'])).toEqual('f')
    expect(getNestedValue(obj, ['a', 'e', 0, 'f'])).toEqual('f')
    expect(getNestedValue(obj, ['a', 'e', '1'])).toEqual('e1')
    expect(getNestedValue(obj, ['g'])).toEqual(null)
    expect(getNestedValue(obj, ['missing', 'key'])).toEqual(undefined)

    const arr = ['val', obj]

    expect(getNestedValue(arr, ['1', 'a', 'b', 'c'])).toEqual(1)
    expect(getNestedValue(arr, ['1', 'a', 'e', 0, 'f'])).toEqual('f')
    expect(getNestedValue(arr, [0])).toEqual('val')
    expect(getNestedValue(arr, [1])).toEqual(obj)

    expect(getNestedValue('str', [])).toEqual('str')
    expect(getNestedValue(5, [])).toEqual(5)
    expect(getNestedValue(null, [])).toEqual(null)

    expect(getNestedValue(null, ['a'])).toEqual(undefined)

  })

  it('should get property from items', () => {
    const obj = {
      a: {
        b: 1
      },
      c: [2, 3, {d: 'd'}],
      'x.y': 'comp',
      x: {
        y: 'nested'
      }
    }
    expect(getPropertyFromItem(obj, 'a.b')).toEqual(1)
    expect(getPropertyFromItem(obj, 'c.0')).toEqual(2)
    expect(getPropertyFromItem(obj, 'c.2.d')).toEqual('d')
    expect(getPropertyFromItem(obj, 'c.2.d.x', 'fallback')).toEqual('fallback')
    expect(getPropertyFromItem(obj, o => o.a.b + o.c[0])).toEqual(3)
    expect(getPropertyFromItem(obj, ['c', 2, 'd'])).toEqual('d')
    expect(getPropertyFromItem(obj, 'x.y')).toEqual('nested')
    expect(getPropertyFromItem(obj, ['x', 'y'])).toEqual('nested')
    expect(getPropertyFromItem(obj, ['x.y'])).toEqual('comp')
  })

  it('should return proper value in convertToUnit', () => {
    expect(convertToUnit(undefined)).toBe(undefined)
    expect(convertToUnit(null)).toBe(undefined)
    expect(convertToUnit('')).toBe(undefined)

    expect(convertToUnit(0)).toBe('0px')
    expect(convertToUnit(3)).toBe('3px')
    expect(convertToUnit(3.14)).toBe('3.14px')

    expect(convertToUnit(0, 'em')).toBe('0em')
    expect(convertToUnit(3, 'em')).toBe('3em')
    expect(convertToUnit(3.14, 'em')).toBe('3.14em')

    expect(convertToUnit('0vw')).toBe('0vw')
    expect(convertToUnit('3vw')).toBe('3vw')
    expect(convertToUnit('3.14vw')).toBe('3.14vw')

    expect(convertToUnit('foo')).toBe('foo')
  })
})
