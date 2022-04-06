import { describe, expect, it } from '@jest/globals'

import {
  arrayDiff,
  convertToUnit,
  deepEqual,
  getNestedValue,
  getObjectValueByPath,
  getPropertyFromItem,
  humanReadableFileSize,
  mergeDeep,
  sortItems,
} from '../helpers'

describe('helpers', () => {
  it('should return set difference of arrays A and B', () => {
    expect(arrayDiff(['one', 'two'], ['one'])).toEqual([])
    expect(arrayDiff(['one'], ['one', 'two'])).toEqual(['two'])
    expect(arrayDiff([], [])).toEqual([])
    expect(arrayDiff([], ['one'])).toEqual(['one'])
    expect(arrayDiff(['one'], ['two'])).toEqual(['two'])
    expect(arrayDiff(['one', 'two'], ['one', 'three'])).toEqual(['three'])
  })

  it('should pass comparison', () => { // eslint-disable-line max-statements
    // Null
    expect(deepEqual(null, null)).toBe(true)
    expect(deepEqual(null, undefined)).toBe(false)
    expect(deepEqual(null, false)).toBe(false)
    expect(deepEqual(null, 0)).toBe(false)
    expect(deepEqual(null, '')).toBe(false)
    expect(deepEqual(null, [])).toBe(false)
    expect(deepEqual(null, {})).toBe(false)

    // Undefined
    expect(deepEqual(undefined, undefined)).toBe(true)
    expect(deepEqual(undefined, null)).toBe(false)
    expect(deepEqual(undefined, false)).toBe(false)
    expect(deepEqual(undefined, 0)).toBe(false)
    expect(deepEqual(undefined, '')).toBe(false)
    expect(deepEqual(undefined, [])).toBe(false)
    expect(deepEqual(undefined, {})).toBe(false)

    // Boolean
    expect(deepEqual(true, true)).toBe(true)
    expect(deepEqual(true, false)).toBe(false)
    expect(deepEqual(true, undefined)).toBe(false)
    expect(deepEqual(true, null)).toBe(false)
    expect(deepEqual(true, 0)).toBe(false)
    expect(deepEqual(true, 1)).toBe(false)
    expect(deepEqual(true, '')).toBe(false)
    expect(deepEqual(true, 'abc')).toBe(false)
    expect(deepEqual(true, [1, 2])).toBe(false)
    expect(deepEqual(true, { x: 1 })).toBe(false)

    expect(deepEqual(false, false)).toBe(true)
    expect(deepEqual(false, true)).toBe(false)
    expect(deepEqual(false, undefined)).toBe(false)
    expect(deepEqual(false, null)).toBe(false)
    expect(deepEqual(false, 0)).toBe(false)
    expect(deepEqual(false, 1)).toBe(false)
    expect(deepEqual(false, '')).toBe(false)
    expect(deepEqual(false, 'abc')).toBe(false)
    expect(deepEqual(false, [1, 2])).toBe(false)
    expect(deepEqual(false, { x: 1 })).toBe(false)

    // Number
    expect(deepEqual(5, 5)).toBe(true)
    expect(deepEqual(8, 8.0)).toBe(true)
    expect(deepEqual(8, '8')).toBe(false)
    expect(deepEqual(-10, -10)).toBe(true)

    expect(deepEqual(0, '')).toBe(false)
    expect(deepEqual(0, false)).toBe(false)
    expect(deepEqual(0, null)).toBe(false)
    expect(deepEqual(0, undefined)).toBe(false)

    // String
    expect(deepEqual('', '')).toBe(true)
    expect(deepEqual('a', 'a')).toBe(true)
    expect(deepEqual('a', 'b')).toBe(false)
    expect(deepEqual('a', 'A')).toBe(false)
    expect(deepEqual('abc', 'abc')).toBe(true)
    expect(deepEqual('Abc', 'abc')).toBe(false)
    expect(deepEqual(' ', '')).toBe(false)

    // Array
    expect(deepEqual([], [])).toBe(true)
    expect(deepEqual([1], [1.0])).toBe(true)
    expect(deepEqual([1, '2'], [1, '2'])).toBe(true)
    expect(deepEqual([1, { x: 1, y: 2 }], [1, { x: 1, y: 2 }])).toBe(true)
    expect(deepEqual([1, { x: 1, y: null }], [1, { x: 1, y: false }])).toBe(false)
    expect(deepEqual([1, [1, 2]], [1, [1, 2]])).toBe(true)

    // Object
    expect(deepEqual({}, {})).toBe(true)
    expect(deepEqual({ x: 1 }, { x: 1 })).toBe(true)
    expect(deepEqual({ x: 1 }, {})).toBe(false)
    expect(deepEqual({ x: { a: 1, b: 2 } }, { x: { a: 1, b: 2 } })).toBe(true)

    // Date
    const currentDate = new Date()
    const futureDate = new Date(1000)

    expect(deepEqual(currentDate, currentDate)).toBe(true)
    expect(deepEqual({ date: currentDate }, { date: currentDate })).toBe(true)
    expect(deepEqual(currentDate, futureDate)).toBe(false)
    expect(deepEqual({ date: currentDate }, { date: futureDate })).toBe(false)

    const circular = {
      me: null as any,
    }
    circular.me = circular

    expect(deepEqual({ r: circular }, { r: circular })).toBe(true)
    expect(deepEqual({ r: circular, x: 1 }, { r: circular, x: 2 })).toBe(false)
    expect(deepEqual({ r: [circular] }, { r: [circular] })).toBe(true)
  })

  it('should get value directly on object if not undefined', () => {
    const obj = {
      a: 'foo',
      'b.a': 'foobar',
      b: {
        a: 1,
      },
      'c.d': undefined,
      c: {
        d: 'bar',
      },
    }

    expect(getObjectValueByPath(obj, 'a')).toBe('foo')
    expect(getObjectValueByPath(obj, 'b.a')).toBe('foobar')
    expect(getObjectValueByPath(obj, 'c.d')).toBe('bar')
  })

  it('should get nested value', () => {
    const obj = {
      a: {
        b: {
          c: 1,
          d: 2,
        },
        e: [
          { f: 'f' },
          'e1',
        ],
      },
      g: null,
    }

    expect(getNestedValue(obj, ['a', 'b', 'c'])).toBe(1)
    expect(getNestedValue(obj, ['a', 'b', 'd'])).toBe(2)
    expect(getNestedValue(obj, ['a', 'b'])).toEqual({ c: 1, d: 2 })
    expect(getNestedValue(obj, ['a', 'e', '0', 'f'])).toBe('f')
    expect(getNestedValue(obj, ['a', 'e', 0, 'f'])).toBe('f')
    expect(getNestedValue(obj, ['a', 'e', '1'])).toBe('e1')
    expect(getNestedValue(obj, ['g'])).toBeNull()
    expect(getNestedValue(obj, ['missing', 'key'])).toBeUndefined()

    const arr = ['val', obj]

    expect(getNestedValue(arr, ['1', 'a', 'b', 'c'])).toBe(1)
    expect(getNestedValue(arr, ['1', 'a', 'e', 0, 'f'])).toBe('f')
    expect(getNestedValue(arr, [0])).toBe('val')
    expect(getNestedValue(arr, [1])).toEqual(obj)

    expect(getNestedValue('str', [])).toBe('str')
    expect(getNestedValue(5, [])).toBe(5)
    expect(getNestedValue(null, [])).toBeNull()

    expect(getNestedValue(null, ['a'])).toBeUndefined()
  })

  it('should get property from items', () => {
    const obj = {
      a: {
        b: 1,
      },
      c: [2, 3, { d: 'd' }],
      'x.y': 'comp',
      x: {
        y: 'nested',
      },
    }
    expect(getPropertyFromItem(obj, 'a.b')).toBe(1)
    expect(getPropertyFromItem(obj, 'c.0')).toBe(2)
    expect(getPropertyFromItem(obj, 'c.2.d')).toBe('d')
    expect(getPropertyFromItem(obj, 'c.2.d.x', 'fallback')).toBe('fallback')
    expect(getPropertyFromItem(obj, o => +o.a.b + +o.c[0])).toBe(3)
    expect(getPropertyFromItem(obj, ['c', 2, 'd'])).toBe('d')
    expect(getPropertyFromItem(obj, 'x.y')).toBe('comp')
    expect(getPropertyFromItem(obj, ['x', 'y'])).toBe('nested')
    expect(getPropertyFromItem(obj, ['x.y'])).toBe('comp')
  })

  it('should return proper value in convertToUnit', () => {
    expect(convertToUnit(undefined)).toBeUndefined()
    expect(convertToUnit(null)).toBeUndefined()
    expect(convertToUnit('')).toBeUndefined()

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

  it('humanReadableFileSize should format file sizes with base 1024', () => {
    expect(humanReadableFileSize(0, 1024)).toBe('0 B')
    expect(humanReadableFileSize(512, 1024)).toBe('512 B')

    expect(humanReadableFileSize(1024, 1024)).toBe('1.0 KiB')
    expect(humanReadableFileSize(4096, 1024)).toBe('4.0 KiB')

    expect(humanReadableFileSize(1048576, 1024)).toBe('1.0 MiB')
    expect(humanReadableFileSize(2097152, 1024)).toBe('2.0 MiB')

    expect(humanReadableFileSize(1073741824, 1024)).toBe('1.0 GiB')
    expect(humanReadableFileSize(2147483648, 1024)).toBe('2.0 GiB')
  })

  it('humanReadableFileSize should format file sizes with base 1000', () => {
    expect(humanReadableFileSize(0)).toBe('0 B')
    expect(humanReadableFileSize(512)).toBe('512 B')

    expect(humanReadableFileSize(1000)).toBe('1.0 kB')
    expect(humanReadableFileSize(4000)).toBe('4.0 kB')

    expect(humanReadableFileSize(1000000)).toBe('1.0 MB')
    expect(humanReadableFileSize(2000000)).toBe('2.0 MB')

    expect(humanReadableFileSize(1000000000)).toBe('1.0 GB')
    expect(humanReadableFileSize(2000000000)).toBe('2.0 GB')
  })

  it('should sort items by single column', () => {
    let items
    const getItems = () => [
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
    ]

    sortItems(items = getItems(), ['string'], [], 'en')
    expect(items).toStrictEqual([
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foo', number: 1 },
    ])

    sortItems(items = getItems(), ['string'], [true], 'en')
    expect(items).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
      { string: 'bar', number: 2 },
    ])

    sortItems(items = getItems(), ['number'], [], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'foo', number: 1 },
        { string: 'bar', number: 2 },
        { string: 'fizzbuzz', number: 3 },
        { string: 'baz', number: 4 },
      ])

    sortItems(items = getItems(), ['number'], [true], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'baz', number: 4 },
        { string: 'fizzbuzz', number: 3 },
        { string: 'bar', number: 2 },
        { string: 'foo', number: 1 },
      ])

    sortItems(items = getItems(), ['number'], [], 'en', { number: (a, b) => b - a })
    expect(items)
      .toStrictEqual([
        { string: 'baz', number: 4 },
        { string: 'fizzbuzz', number: 3 },
        { string: 'bar', number: 2 },
        { string: 'foo', number: 1 },
      ])

    sortItems(items = getItems(), ['number'], [true], 'en', { number: (a, b) => b - a })
    expect(items)
      .toStrictEqual([
        { string: 'foo', number: 1 },
        { string: 'bar', number: 2 },
        { string: 'fizzbuzz', number: 3 },
        { string: 'baz', number: 4 },
      ])
  })

  it('should sort items with deep structure', () => {
    const items = [{ foo: { bar: { baz: 3 } } }, { foo: { bar: { baz: 1 } } }, { foo: { bar: { baz: 2 } } }]

    sortItems(items, ['foo.bar.baz'], [], 'en')
    expect(items).toStrictEqual([{ foo: { bar: { baz: 1 } } }, { foo: { bar: { baz: 2 } } }, { foo: { bar: { baz: 3 } } }])
  })

  it('should sort items by multiple columns', () => {
    let items
    const getItems = () => [
      { string: 'foo', number: 1 },
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
    ]

    sortItems(items = getItems(), ['string', 'number'], [], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'bar', number: 3 },
        { string: 'baz', number: 1 },
        { string: 'baz', number: 2 },
        { string: 'foo', number: 1 },
      ])

    sortItems(items = getItems(), ['string', 'number'], [true, false], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'foo', number: 1 },
        { string: 'baz', number: 1 },
        { string: 'baz', number: 2 },
        { string: 'bar', number: 3 },
      ])

    sortItems(items = getItems(), ['string', 'number'], [false, true], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'bar', number: 3 },
        { string: 'baz', number: 2 },
        { string: 'baz', number: 1 },
        { string: 'foo', number: 1 },
      ])

    sortItems(items = getItems(), ['string', 'number'], [true, true], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'foo', number: 1 },
        { string: 'baz', number: 2 },
        { string: 'baz', number: 1 },
        { string: 'bar', number: 3 },
      ])

    sortItems(items = getItems(), ['number', 'string'], [], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'baz', number: 1 },
        { string: 'foo', number: 1 },
        { string: 'baz', number: 2 },
        { string: 'bar', number: 3 },
      ])

    sortItems(items = getItems(), ['number', 'string'], [true, false], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'bar', number: 3 },
        { string: 'baz', number: 2 },
        { string: 'baz', number: 1 },
        { string: 'foo', number: 1 },
      ])

    sortItems(items = getItems(), ['number', 'string'], [false, true], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'foo', number: 1 },
        { string: 'baz', number: 1 },
        { string: 'baz', number: 2 },
        { string: 'bar', number: 3 },
      ])

    sortItems(items = getItems(), ['number', 'string'], [true, true], 'en')
    expect(items)
      .toStrictEqual([
        { string: 'bar', number: 3 },
        { string: 'baz', number: 2 },
        { string: 'foo', number: 1 },
        { string: 'baz', number: 1 },
      ])

    sortItems(items = getItems(), ['string', 'number'], [], 'en', { number: (a, b) => b - a })
    expect(items)
      .toStrictEqual([
        { string: 'bar', number: 3 },
        { string: 'baz', number: 2 },
        { string: 'baz', number: 1 },
        { string: 'foo', number: 1 },
      ])

    sortItems(items = getItems(), ['number', 'string'], [], 'en', { number: (a, b) => b - a })
    expect(items)
      .toStrictEqual([
        { string: 'bar', number: 3 },
        { string: 'baz', number: 2 },
        { string: 'baz', number: 1 },
        { string: 'foo', number: 1 },
      ])
  })

  describe('mergeDeep', () => {
    it('should include all properties from both source and target', () => {
      expect(mergeDeep({ a: 'foo' }, { b: 'bar' })).toEqual({ a: 'foo', b: 'bar' })
    })

    it('should not mutate source object', () => {
      const source = { a: 'foo' }
      const target = { b: 'bar' }
      const result = mergeDeep(source, target)

      expect(result).not.toBe(source)
      expect(source).not.toHaveProperty('b')
    })

    it('should overwrite source properties', () => {
      expect(mergeDeep({ a: 'foo' }, { a: 'bar' })).toEqual({ a: 'bar' })
    })

    it('should recursively merge', () => {
      expect(mergeDeep({ a: { b: 'foo' } }, { c: { d: 'bar' } })).toEqual({ a: { b: 'foo' }, c: { d: 'bar' } })
    })

    it('should not recursively merge arrays', () => {
      expect(mergeDeep({ a: ['foo'] }, { a: ['bar'] })).toEqual({ a: ['bar'] })
    })

    it('should use arrayFn function if provided', () => {
      expect(mergeDeep({ a: ['foo'] }, { a: ['bar'] }, (a, b) => [...a, ...b])).toEqual({ a: ['foo', 'bar'] })
    })
  })
})
