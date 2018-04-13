import { looseEqual, getNestedValue, getPropertyFromItem } from '@/util/helpers'

it('should pass comparison', () => {

  // Null
  expect(looseEqual(null, null)).toEqual(true)
  expect(looseEqual(null, undefined)).toEqual(false)
  expect(looseEqual(null, false)).toEqual(false)
  expect(looseEqual(null, 0)).toEqual(false)
  expect(looseEqual(null, '')).toEqual(false)
  expect(looseEqual(null, [])).toEqual(false)
  expect(looseEqual(null, {})).toEqual(false)

  // Undefined
  expect(looseEqual(undefined, undefined)).toEqual(true)
  expect(looseEqual(undefined, null)).toEqual(false)
  expect(looseEqual(undefined, false)).toEqual(false)
  expect(looseEqual(undefined, 0)).toEqual(false)
  expect(looseEqual(undefined, '')).toEqual(false)
  expect(looseEqual(undefined, [])).toEqual(false)
  expect(looseEqual(undefined, {})).toEqual(false)

  // Boolean
  expect(looseEqual(true, true)).toEqual(true)
  expect(looseEqual(true, false)).toEqual(false)
  expect(looseEqual(true, undefined)).toEqual(false)
  expect(looseEqual(true, null)).toEqual(false)
  expect(looseEqual(true, 0)).toEqual(false)
  expect(looseEqual(true, 1)).toEqual(false)
  expect(looseEqual(true, '')).toEqual(false)
  expect(looseEqual(true, 'abc')).toEqual(false)
  expect(looseEqual(true, [1, 2])).toEqual(false)
  expect(looseEqual(true, {x: 1})).toEqual(false)

  expect(looseEqual(false, false)).toEqual(true)
  expect(looseEqual(false, true)).toEqual(false)
  expect(looseEqual(false, undefined)).toEqual(false)
  expect(looseEqual(false, null)).toEqual(false)
  expect(looseEqual(false, 0)).toEqual(false)
  expect(looseEqual(false, 1)).toEqual(false)
  expect(looseEqual(false, '')).toEqual(false)
  expect(looseEqual(false, 'abc')).toEqual(false)
  expect(looseEqual(false, [1, 2])).toEqual(false)
  expect(looseEqual(false, {x: 1})).toEqual(false)

  // Number
  expect(looseEqual(5, 5)).toEqual(true)
  expect(looseEqual(8, 8.0)).toEqual(true)
  expect(looseEqual(8, '8')).toEqual(false)
  expect(looseEqual(-10, -10)).toEqual(true)

  expect(looseEqual(0, '')).toEqual(false)
  expect(looseEqual(0, false)).toEqual(false)
  expect(looseEqual(0, null)).toEqual(false)
  expect(looseEqual(0, undefined)).toEqual(false)

  // String
  expect(looseEqual('', '')).toEqual(true)
  expect(looseEqual('a', 'a')).toEqual(true)
  expect(looseEqual('a', 'b')).toEqual(false)
  expect(looseEqual('a', 'A')).toEqual(false)
  expect(looseEqual('abc', 'abc')).toEqual(true)
  expect(looseEqual('Abc', 'abc')).toEqual(false)
  expect(looseEqual(' ', '')).toEqual(false)

  // Array
  expect(looseEqual([], [])).toEqual(true)
  expect(looseEqual([1], [1.0])).toEqual(true)
  expect(looseEqual([1, '2'], [1, '2'])).toEqual(true)
  expect(looseEqual([1, {x: 1, y: 2}], [1, {x: 1, y: 2}])).toEqual(true)
  expect(looseEqual([1, {x: 1, y: null}], [1, {x: 1, y: false}])).toEqual(false)
  expect(looseEqual([1, [1, 2]], [1, [1, 2]])).toEqual(true)

  // Object
  expect(looseEqual({}, {})).toEqual(true)
  expect(looseEqual({x: 1}, {x: 1})).toEqual(true)
  expect(looseEqual({x: 1}, {})).toEqual(false)
  expect(looseEqual({x: {a: 1, b: 2}}, {x: {a: 1, b: 2}})).toEqual(true)

  const circular = {}
  circular.me = circular

  expect(looseEqual({r: circular}, {r: circular})).toEqual(true)
  expect(looseEqual({r: circular, x: 1}, {r: circular, x: 2})).toEqual(false)
  expect(looseEqual({r: [circular]}, {r: [circular]})).toEqual(true)

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
