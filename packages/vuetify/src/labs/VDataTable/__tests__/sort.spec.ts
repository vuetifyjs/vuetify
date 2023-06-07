// Composables
import { sortItems } from '../composables/sort'
import { transformItems } from '@/composables/list-items'

// Utilities
import { describe, expect, it } from '@jest/globals'

describe('VDataTable - sorting', () => {
  it('should sort items by single column', () => {
    const items = transformItems({} as any, [
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
      { string: 'bar', number: 2 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'bar', number: 2 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }], 'en', { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'bar', number: 2 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }], 'en', { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
    ])
  })

  it('should sort items with deep structure', () => {
    const items = transformItems({} as any, [{ foo: { bar: { baz: 3 } } }, { foo: { bar: { baz: 1 } } }, { foo: { bar: { baz: 2 } } }])

    expect(
      sortItems(items, [{ key: 'foo.bar.baz', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([{ foo: { bar: { baz: 1 } } }, { foo: { bar: { baz: 2 } } }, { foo: { bar: { baz: 3 } } }])
  })

  it('should sort items by multiple columns', () => {
    const items = transformItems({} as any, [
      { string: 'foo', number: 1 },
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'foo', number: 1 },
    ])

    // { string: 'foo', number: 1 },
    // { string: 'bar', number: 3 },
    // { string: 'baz', number: 2 },
    // { string: 'baz', number: 1 },

    // { string: 'bar', number: 3 },
    // { string: 'baz', number: 2 },
    // { string: 'baz', number: 1 },
    // { string: 'foo', number: 1 },

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }, { key: 'number', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'desc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }, { key: 'number', order: 'desc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }, { key: 'string', order: 'asc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'desc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }, { key: 'string', order: 'desc' }], 'en')
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'asc' }], 'en', { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'asc' }], 'en', { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])
  })
})
