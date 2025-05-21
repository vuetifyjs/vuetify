// Composables
import { createHeaders } from '../composables/headers'
import { transformItems as _transformItems } from '../composables/items'
import { sortItems as _sortItems } from '../composables/sort'

// Utilities
import { mount } from '@vue/test-utils'

// Types
import type { SortItem } from '../composables/sort'
import type { DataTableCompareFunction, DataTableHeader, DataTableItem } from '@/components/VDataTable/types'

function transformItems (items: any[], headers?: DataTableHeader[]) {
  let _items: DataTableItem[]
  mount({
    setup () {
      const { columns } = createHeaders({ items, headers })
      _items = _transformItems({} as any, items, columns.value)
      return () => {}
    },
  })
  return _items!
}

function sortItems (items: any[], sortBy: SortItem[], sortFunctions?: Record<string, DataTableCompareFunction>) {
  return _sortItems(items, sortBy, 'en', {
    sortFunctions,
    transform: item => item.columns,
  })
}

describe('VDataTable - sorting', () => {
  it('should sort items by single column', () => {
    const items = transformItems([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 2 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
      { string: 'bar', number: 2 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'bar', number: 2 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'bar', number: 2 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 2 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
    ])
  })

  it('should sort items with deep structure', () => {
    const items = transformItems([
      { foo: { bar: { baz: 3 } } },
      { foo: { bar: { baz: 1 } } },
      { foo: { bar: { baz: 2 } } },
    ], [{ key: 'foo.bar.baz' }])

    expect(
      sortItems(items, [{ key: 'foo.bar.baz', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { foo: { bar: { baz: 1 } } },
      { foo: { bar: { baz: 2 } } },
      { foo: { bar: { baz: 3 } } },
    ])
  })

  it('should sort items by multiple columns', () => {
    const items = transformItems([
      { string: 'foo', number: 1 },
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'asc' }])
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
      sortItems(items, [{ key: 'string', order: 'desc' }, { key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'desc' }, { key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }, { key: 'string', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
      { string: 'baz', number: 2 },
      { string: 'bar', number: 3 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }, { key: 'string', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'foo', number: 1 },
      { string: 'baz', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'string', order: 'asc' }, { key: 'number', order: 'asc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }, { key: 'string', order: 'asc' }], { number: (a, b) => b - a })
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: 3 },
      { string: 'baz', number: 2 },
      { string: 'baz', number: 1 },
      { string: 'foo', number: 1 },
    ])
  })

  it('should sort items with nullable column', () => {
    const items = transformItems([
      { string: 'foo', number: 1 },
      { string: 'bar', number: null },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foobar', number: 5 },
      { string: 'barbaz', number: undefined },
      { string: 'foobarbuzz', number: '' },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'asc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'bar', number: null },
      { string: 'barbaz', number: undefined },
      { string: 'foobarbuzz', number: '' },
      { string: 'foo', number: 1 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'baz', number: 4 },
      { string: 'foobar', number: 5 },
    ])

    expect(
      sortItems(items, [{ key: 'number', order: 'desc' }])
        .map(i => i.raw)
    ).toStrictEqual([
      { string: 'foobar', number: 5 },
      { string: 'baz', number: 4 },
      { string: 'fizzbuzz', number: 3 },
      { string: 'foo', number: 1 },
      { string: 'bar', number: null },
      { string: 'barbaz', number: undefined },
      { string: 'foobarbuzz', number: '' },
    ])
  })
})
