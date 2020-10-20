import Vue from 'vue/dist/vue.common.js'
import {
  deepEqual,
  getNestedValue,
  getPropertyFromItem,
  convertToUnit,
  getSlotType,
  arrayDiff,
  getObjectValueByPath,
  humanReadableFileSize,
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
    expect(deepEqual(true, { x: 1 })).toEqual(false)

    expect(deepEqual(false, false)).toEqual(true)
    expect(deepEqual(false, true)).toEqual(false)
    expect(deepEqual(false, undefined)).toEqual(false)
    expect(deepEqual(false, null)).toEqual(false)
    expect(deepEqual(false, 0)).toEqual(false)
    expect(deepEqual(false, 1)).toEqual(false)
    expect(deepEqual(false, '')).toEqual(false)
    expect(deepEqual(false, 'abc')).toEqual(false)
    expect(deepEqual(false, [1, 2])).toEqual(false)
    expect(deepEqual(false, { x: 1 })).toEqual(false)

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
    expect(deepEqual([1, { x: 1, y: 2 }], [1, { x: 1, y: 2 }])).toEqual(true)
    expect(deepEqual([1, { x: 1, y: null }], [1, { x: 1, y: false }])).toEqual(false)
    expect(deepEqual([1, [1, 2]], [1, [1, 2]])).toEqual(true)

    // Object
    expect(deepEqual({}, {})).toEqual(true)
    expect(deepEqual({ x: 1 }, { x: 1 })).toEqual(true)
    expect(deepEqual({ x: 1 }, {})).toEqual(false)
    expect(deepEqual({ x: { a: 1, b: 2 } }, { x: { a: 1, b: 2 } })).toEqual(true)

    // Date
    const currentDate = new Date()
    const futureDate = new Date(1000)

    expect(deepEqual(currentDate, currentDate)).toEqual(true)
    expect(deepEqual({ date: currentDate }, { date: currentDate })).toEqual(true)
    expect(deepEqual(currentDate, futureDate)).toEqual(false)
    expect(deepEqual({ date: currentDate }, { date: futureDate })).toEqual(false)

    const circular = {} // eslint-disable-line sonarjs/prefer-object-literal
    circular.me = circular

    expect(deepEqual({ r: circular }, { r: circular })).toEqual(true)
    expect(deepEqual({ r: circular, x: 1 }, { r: circular, x: 2 })).toEqual(false)
    expect(deepEqual({ r: [circular] }, { r: [circular] })).toEqual(true)
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

    expect(getObjectValueByPath(obj, 'a')).toEqual('foo')
    expect(getObjectValueByPath(obj, 'b.a')).toEqual('foobar')
    expect(getObjectValueByPath(obj, 'c.d')).toEqual('bar')
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

    expect(getNestedValue(obj, ['a', 'b', 'c'])).toEqual(1)
    expect(getNestedValue(obj, ['a', 'b', 'd'])).toEqual(2)
    expect(getNestedValue(obj, ['a', 'b'])).toEqual({ c: 1, d: 2 })
    expect(getNestedValue(obj, ['a', 'e', '0', 'f'])).toEqual('f')
    expect(getNestedValue(obj, ['a', 'e', 0, 'f'])).toEqual('f')
    expect(getNestedValue(obj, ['a', 'e', '1'])).toEqual('e1')
    expect(getNestedValue(obj, ['g'])).toBeNull()
    expect(getNestedValue(obj, ['missing', 'key'])).toBeUndefined()

    const arr = ['val', obj]

    expect(getNestedValue(arr, ['1', 'a', 'b', 'c'])).toEqual(1)
    expect(getNestedValue(arr, ['1', 'a', 'e', 0, 'f'])).toEqual('f')
    expect(getNestedValue(arr, [0])).toEqual('val')
    expect(getNestedValue(arr, [1])).toEqual(obj)

    expect(getNestedValue('str', [])).toEqual('str')
    expect(getNestedValue(5, [])).toEqual(5)
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
    expect(getPropertyFromItem(obj, 'a.b')).toEqual(1)
    expect(getPropertyFromItem(obj, 'c.0')).toEqual(2)
    expect(getPropertyFromItem(obj, 'c.2.d')).toEqual('d')
    expect(getPropertyFromItem(obj, 'c.2.d.x', 'fallback')).toEqual('fallback')
    expect(getPropertyFromItem(obj, o => o.a.b + o.c[0])).toEqual(3)
    expect(getPropertyFromItem(obj, ['c', 2, 'd'])).toEqual('d')
    expect(getPropertyFromItem(obj, 'x.y')).toEqual('comp')
    expect(getPropertyFromItem(obj, ['x', 'y'])).toEqual('nested')
    expect(getPropertyFromItem(obj, ['x.y'])).toEqual('comp')
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

  describe('getSlotType', () => {
    it('should detect old slots', () => {
      const vm = new Vue({
        components: {
          foo: { render: h => h('div') },
        },
        template: `<foo ref="foo"><template slot="bar">hello</template></foo>`,
      }).$mount()

      expect(getSlotType(vm.$refs.foo, 'bar')).toBe('normal')
    })

    it('should detect old scoped slots', () => {
      const vm = new Vue({
        components: {
          foo: { render: h => h('div') },
        },
        template: `<foo ref="foo"><template slot="bar" slot-scope="data">hello</template></foo>`,
      }).$mount()

      expect(getSlotType(vm.$refs.foo, 'bar')).toBe('scoped')
    })

    it('should detect bare v-slot', () => {
      const vm = new Vue({
        components: {
          foo: { render: h => h('div') },
        },
        template: `<foo ref="foo"><template #bar>hello</template></foo>`,
      }).$mount()

      expect(getSlotType(vm.$refs.foo, 'bar', true)).toBe('v-slot')
    })

    it('should detect bound v-slot', () => {
      const vm = new Vue({
        components: {
          foo: { render: h => h('div') },
        },
        template: `<foo ref="foo"><template #bar="data">hello</template></foo>`,
      }).$mount()

      expect(getSlotType(vm.$refs.foo, 'bar', true)).toBe('scoped')
    })

    it('should count bare v-slot as scoped', () => {
      const vm = new Vue({
        components: {
          foo: { render: h => h('div') },
        },
        template: `<foo ref="foo"><template #bar>hello</template></foo>`,
      }).$mount()

      expect(getSlotType(vm.$refs.foo, 'bar')).toBe('scoped')
    })
  })

  it('humanReadableFileSize should format file sizes with base 1024', () => {
    expect(humanReadableFileSize(0, true)).toBe('0 B')
    expect(humanReadableFileSize(512, true)).toBe('512 B')

    expect(humanReadableFileSize(1024, true)).toBe('1.0 KiB')
    expect(humanReadableFileSize(4096, true)).toBe('4.0 KiB')

    expect(humanReadableFileSize(1048576, true)).toBe('1.0 MiB')
    expect(humanReadableFileSize(2097152, true)).toBe('2.0 MiB')

    expect(humanReadableFileSize(1073741824, true)).toBe('1.0 GiB')
    expect(humanReadableFileSize(2147483648, true)).toBe('2.0 GiB')
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
    const getItems = () => [{ string: 'foo', number: 1 }, { string: 'bar', number: 2 }, { string: 'baz', number: 4 }, { string: 'fizzbuzz', number: 3 }]

    sortItems(items = getItems(), ['string'], [], 'en')
    expect(items).toStrictEqual([{ string: 'bar', number: 2 }, { string: 'baz', number: 4 }, { string: 'fizzbuzz', number: 3 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['string'], [true], 'en')
    expect(items).toStrictEqual([{ string: 'foo', number: 1 }, { string: 'fizzbuzz', number: 3 }, { string: 'baz', number: 4 }, { string: 'bar', number: 2 }])

    sortItems(items = getItems(), ['number'], [], 'en')
    expect(items).toStrictEqual([{ string: 'foo', number: 1 }, { string: 'bar', number: 2 }, { string: 'fizzbuzz', number: 3 }, { string: 'baz', number: 4 }])

    sortItems(items = getItems(), ['number'], [true], 'en')
    expect(items).toStrictEqual([{ string: 'baz', number: 4 }, { string: 'fizzbuzz', number: 3 }, { string: 'bar', number: 2 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['number'], [], 'en', { number: (a, b) => b - a })
    expect(items).toStrictEqual([{ string: 'baz', number: 4 }, { string: 'fizzbuzz', number: 3 }, { string: 'bar', number: 2 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['number'], [true], 'en', { number: (a, b) => b - a })
    expect(items).toStrictEqual([{ string: 'foo', number: 1 }, { string: 'bar', number: 2 }, { string: 'fizzbuzz', number: 3 }, { string: 'baz', number: 4 }])
  })

  it('should sort items with deep structure', () => {
    const items = [{ foo: { bar: { baz: 3 } } }, { foo: { bar: { baz: 1 } } }, { foo: { bar: { baz: 2 } } }]

    sortItems(items, ['foo.bar.baz'], [], 'en')
    expect(items).toStrictEqual([{ foo: { bar: { baz: 1 } } }, { foo: { bar: { baz: 2 } } }, { foo: { bar: { baz: 3 } } }])
  })

  it('should sort items by multiple columns', () => {
    let items
    const getItems = () => [{ string: 'foo', number: 1 }, { string: 'bar', number: 3 }, { string: 'baz', number: 2 }, { string: 'baz', number: 1 }]

    sortItems(items = getItems(), ['string', 'number'], [], 'en')
    expect(items).toStrictEqual([{ string: 'bar', number: 3 }, { string: 'baz', number: 1 }, { string: 'baz', number: 2 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['string', 'number'], [true, false], 'en')
    expect(items).toStrictEqual([{ string: 'foo', number: 1 }, { string: 'baz', number: 1 }, { string: 'baz', number: 2 }, { string: 'bar', number: 3 }])

    sortItems(items = getItems(), ['string', 'number'], [false, true], 'en')
    expect(items).toStrictEqual([{ string: 'bar', number: 3 }, { string: 'baz', number: 2 }, { string: 'baz', number: 1 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['string', 'number'], [true, true], 'en')
    expect(items).toStrictEqual([{ string: 'foo', number: 1 }, { string: 'baz', number: 2 }, { string: 'baz', number: 1 }, { string: 'bar', number: 3 }])

    sortItems(items = getItems(), ['number', 'string'], [], 'en')
    expect(items).toStrictEqual([{ string: 'baz', number: 1 }, { string: 'foo', number: 1 }, { string: 'baz', number: 2 }, { string: 'bar', number: 3 }])

    sortItems(items = getItems(), ['number', 'string'], [true, false], 'en')
    expect(items).toStrictEqual([{ string: 'bar', number: 3 }, { string: 'baz', number: 2 }, { string: 'baz', number: 1 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['number', 'string'], [false, true], 'en')
    expect(items).toStrictEqual([{ string: 'foo', number: 1 }, { string: 'baz', number: 1 }, { string: 'baz', number: 2 }, { string: 'bar', number: 3 }])

    sortItems(items = getItems(), ['number', 'string'], [true, true], 'en')
    expect(items).toStrictEqual([{ string: 'bar', number: 3 }, { string: 'baz', number: 2 }, { string: 'foo', number: 1 }, { string: 'baz', number: 1 }])

    sortItems(items = getItems(), ['string', 'number'], [], 'en', { number: (a, b) => b - a })
    expect(items).toStrictEqual([{ string: 'bar', number: 3 }, { string: 'baz', number: 2 }, { string: 'baz', number: 1 }, { string: 'foo', number: 1 }])

    sortItems(items = getItems(), ['number', 'string'], [], 'en', { number: (a, b) => b - a })
    expect(items).toStrictEqual([{ string: 'bar', number: 3 }, { string: 'baz', number: 2 }, { string: 'baz', number: 1 }, { string: 'foo', number: 1 }])
  })
})
